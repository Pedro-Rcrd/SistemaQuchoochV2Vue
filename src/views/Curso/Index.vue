<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Lista de cursos</h2>
      <hr />
      <!--Menún de navegación-->
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/settingcard' }">
              Menú de mantenimiento
            </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Cursos</a>
          </div>
        </div>
      </div>
      <!--Fin de menu de navegación-->
      <!--Exportación-->
      <div class="text-light mb-3">
        <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
          <i class="fa-solid fa-file-excel"></i> Excel
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </button>
      </div>
      <!--Buscador-->
      <div class="row justify-content-between">
        <div class="col-6">
          <input
            class="form-control"
            autofocus
            id="codigoEstudiante"
            v-model="filtro"
            @input="buscarCurso"
            type="text"
            :placeholder="tipoBusqueda"
          />
        </div>
        <div class="col-2">
          <select
            v-model="tipoFiltro"
            class="form-select"
            aria-label="Default select example"
          >
            <option disabled selected>Filtrar por:</option>
            <option value="nombreCurso">Nombre del curso</option>
            <option value="nivelAcademico">Nivel académico</option>
            <option value="estatus">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLoscursos"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
          />
          <label class="form-check-label" for="flexCheckDefault"> Mostrar todo </label>
        </div>
        <div class="col-2">
          <div class="text-end">
            <button
              class="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              @click="($event) => openModal(1)"
            >
              <i class="fa-solid fa-circle-plus"></i> Nuevo
            </button>
          </div>
        </div>
      </div>
      <!--Tabla-->
      <v-card>
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <v-icon
              class="me-2"
              size="small"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              @click="
                ($event) =>
                  openModal(
                    2,
                    item.nombreCurso,
                    item.codigoCurso,
                    item.estatus,
                    item.codigoNivelAcademico
                  )
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
            </v-icon>
            <v-icon
              size="small"
              @click="($event) => confirmDelete(item.nombreCurso, item.codigoCurso)"
            >
              <i class="fa-solid fa-trash text-dark"></i>
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>

  <Modal :id="'modal'" :title="title">
    <div class="modal-body">
      <div class="row col-11">
        <form @submit.prevent="save">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="form.nombreCurso"
              placeholder="Curso"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-8">
              <select
                class="form-control form-select"
                id="codigoComunidad"
                v-model="form.codigoNivelAcademico"
              >
                <option value="" disabled selected>Selecciona el nivel académico</option>
                <template
                  v-for="tipo in nivelesAcademicos"
                  :key="tipo.codigoNivelAcademico"
                >
                  <option :value="tipo.codigoNivelAcademico">
                    {{ tipo.nombreNivelAcademico }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-8">
              <select
                class="form-control form-select"
                id="codigoComunidad"
                v-model="form.estatus"
                required
              >
                <option value="" disabled selected>Selecciona el estado</option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </select>
            </div>
          </div>

          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Swal from "sweetalert2";
import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

//Cambiar idioma
//#region cambiar idima vuetify
import { useLocale } from "vuetify";
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}
// Llama a la función para cambiar al idioma español
changeLocale("es");
//#endregion

onMounted(() => {
  getCursos();
  getNivelesAcademicos();
});

//Header de tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreCurso" },
  { title: "Nivel académico", key: "nivelAcademico" },
  { title: "Estado", key: "estatus" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET cursos
//#region GET cursos
const cursos = ref([]);
const cursosActivos = ref([]);
const cursosSeleccionados = ref([]);
const getCursos = async () => {
  try {
    const response = await axios.get(`/api/Curso/selectAll`);
    cursos.value = response.data;
    // Filtra los cursos cuyo estatus es igual a "A", ignorando mayúsculas/minúsculas
    cursosActivos.value = cursos.value.filter(
      (curso) => curso.estatus.trim().toUpperCase() === "A"
    );

    if (mostrarTodosLoscursos.value) {
      cursosSeleccionados.value = cursos.value;
    } else {
      cursosSeleccionados.value = cursosActivos.value;
    }

    mapeoDeDato(cursosSeleccionados.value);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};
const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((curso, index) => ({
    indice: index + 1,
    codigoCurso: curso.codigoCurso,
    codigoNivelAcademico: curso.codigoNivelAcademico,
    nombreCurso: curso.nombreCurso,
    nivelAcademico: curso.nivelAcademico,
    estatus: curso.estatus,
  }));
};

//#endregion

//#region GET niveles academicos
const nivelesAcademicos = ref([]);

const getNivelesAcademicos = async () => {
  try {
    const response = await axios.get(`/api/NivelAcademico/selectAll`);
    nivelesAcademicos.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de niveles académicos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};
//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar curso");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreCurso");
const mostrarTodosLoscursos = ref(false);

//Metodo del filtro de datos en la tabla
const buscarCurso = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los cursos

  if (textoBusqueda !== "") {
    datosFiltrados = cursosSeleccionados.value.filter((curso) => {
      const campoFiltro = curso[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(cursosSeleccionados.value);
  }
};
watch(mostrarTodosLoscursos, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    cursosSeleccionados.value = cursosActivos.value;
  } else {
    //checkbox habilitado
    cursosSeleccionados.value = cursos.value;
  }
  mapeoDeDato(cursosSeleccionados.value);
});
//#endregion

//const cursos = ref([])
const form = ref({
  codigoNivelAcademico: 0,
  nombreCurso: "",
  estatus: "",
});

const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const codigoCursoActualizar = ref("");
const close = ref([]);
//
//const deleteCurso = (nombreCurso, codigoCurso) => {
//    confirmation(nombreCurso, `/api/Curso/delete/${codigoCurso}`, '', authStore.authToken);
//};
//
const confirmDelete = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deleteCurso(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteCurso = async (nombre, codigo) => {
  try {
    const response = await axios.delete(`/api/Curso/delete/${codigo}`);
    Swal.fire({
      title: "Eliminado!",
      text: `El curso ${nombre} ha sido eliminada.`,
      icon: "success",
    });
    getCursos();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar el curso ${nombre}.`,
      icon: "error",
      footer: error.message || "Por favor, intente nuevamente más tarde.",
    });
  }
};

const openModal = (op, nombreCurso, codigoCurso, estatus, codigoNivelAcademico) => {
  clear();
  setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
  operation.value = op;
  codigoCursoActualizar.value = codigoCurso;
  if (op == 1) {
    title.value = "Crear Registro";
  } else if (op == 2) {
    title.value = "Actualizar Registro";
    (form.value.nombreCurso = nombreCurso),
      (form.value.codigoNivelAcademico = codigoNivelAcademico),
      (form.value.estatus = estatus);
  } else {
    title.value = "Información";
  }
};

const clear = () => {
  form.value.nombreCurso = "";
  form.value.codigoNivelAcademico = "";
  form.value.estatus = "";
};

const save = async () => {
  let res;
  //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
  if (operation.value == 1) {
    res = await sendRequest("POST", form.value, "/api/Curso/create", "");

    if (res == true) {
      clear();
      nextTick(() => close.value.click());
      getCursos();
    }
  } else {
    res = await sendRequest(
      "PUT",
      form.value,
      `/api/Curso/update/${codigoCursoActualizar.value}`,
      ""
    );

    if (res == true) {
      nextTick(() => close.value.click());
      getCursos();
    }
  }
};

//Habilitar/desabilitar campo nueva contraseña
const isDisabled = ref(true);

//Metodo del PDF
//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportarPDF = () => {
  descargarPDF(resultadoFiltrado.value);
};

const descargarPDF = async (datos) => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 442, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("LISTADO DE CURSOS", 82, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Nivel Académico", "Estado"];

  // Datos de la tabla
  const data = datos.map((curso, index) => [
    index + 1,
    curso.nombreCurso,
    curso.nivelAcademico,
    curso.estatus,
  ]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: "#909909", // Color de fondo
    textColor: "#FFFFFF", // Color del texto
    fontStyle: "bold", // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headers2],
    body: data,
    startY: 20, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("Reportecursos.pdf");
};
//#endregion

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Encabezados de las columnas
  // const encabezados = [
  //   'Índice',
  //   'Código Becario',
  //   'Nombre Estudiante',
  //   'Apellido Estudiante',
  //   'Nivel Académico',
  //   'Grado',
  //   'curso',
  //   'Establecimiento'
  // ];

  // Mapeo de datos con nombres de columnas
  const data = datos.map((curso, index) => ({
    indice: index + 1,
    Nombre: curso.nombreCurso,
    "Nivel academico": curso.nivelAcademico,
    Estado: curso.estatus,
  }));
  // Insertar encabezados al principio de los datos
  //data.unshift(encabezados);
  // Insertar encabezados después de la primera fila
  //data.splice(0, 0, encabezados);

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de cursos");
  // Crear un archivo de datos binarios de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  // Convertir el archivo binario en un Blob
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  // Crear una URL para el Blob
  const url = window.URL.createObjectURL(blob);
  // Crear un enlace invisible para descargar el archivo
  const link = document.createElement("a");
  link.href = url;
  link.download = "reportecursos.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion

//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 85px;
}
</style>
