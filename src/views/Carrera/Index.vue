<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Lista de carreras</h2>
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
            <a class="text-dark" href="#">Carreras</a>
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
            @input="buscarCarrera"
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
            <option value="nombreCarrera">Nombre de la carrera</option>
            <option value="nivelAcademico">Nivel académico</option>
            <option value="estatus">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodasLasCarreras"
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
                    item.nombreCarrera,
                    item.codigoCarrera,
                    item.estatus,
                    item.codigoNivelAcademico
                  )
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
            </v-icon>
            <v-icon
              size="small"
              @click="($event) => confirmDelete(item.nombreCarrera, item.codigoCarrera)"
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
              v-model="form.nombreCarrera"
              placeholder="Carrera"
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
  getCarreras();
  getNivelesAcademicos();
});

//Header de tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreCarrera" },
  { title: "Nivel académico", key: "nivelAcademico" },
  { title: "Estado", key: "estatus" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET carreras
//#region GET carreras
const carreras = ref([]);
const carrerasActivas = ref([]);
const carrerasSeleccionadas = ref([]);
const getCarreras = async () => {
  try {
    const response = await axios.get(`/api/Carrera/selectAll`);
    carreras.value = response.data;
    // Filtra los carreras cuyo estatus es igual a "A", ignorando mayúsculas/minúsculas
    carrerasActivas.value = carreras.value.filter(
      (carrera) => carrera.estatus.trim().toUpperCase() === "A"
    );

    if (mostrarTodasLasCarreras.value) {
      carrerasSeleccionadas.value = carreras.value;
    } else {
      carrerasSeleccionadas.value = carrerasActivas.value;
    }

    mapeoDeDato(carrerasSeleccionadas.value);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de carreras.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((carrera, index) => ({
    indice: index + 1,
    codigoCarrera: carrera.codigoCarrera,
    codigoNivelAcademico: carrera.codigoNivelAcademico,
    nombreCarrera: carrera.nombreCarrera,
    nivelAcademico: carrera.nivelAcademico,
    estatus: carrera.estatus,
  }));
  console.log(resultadoFiltrado.value);
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
const tipoBusqueda = ref("Buscar carrera");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreCarrera");
const mostrarTodasLasCarreras = ref(false);

//Metodo del filtro de datos en la tabla
const buscarCarrera = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los Carreras

  if (textoBusqueda !== "") {
    datosFiltrados = carrerasSeleccionadas.value.filter((carrera) => {
      const campoFiltro = carrera[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(carrerasSeleccionadas.value);
  }
};
watch(mostrarTodasLasCarreras, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    carrerasSeleccionadas.value = carrerasActivas.value;
  } else {
    //checkbox habilitado
    carrerasSeleccionadas.value = carreras.value;
  }
  mapeoDeDato(carrerasSeleccionadas.value);
});
//#endregion

//const carreras = ref([])
const form = ref({
  codigoNivelAcademico: 0,
  nombreCarrera: "",
  estatus: "",
});

const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const codigoCarreraActualizar = ref("");
const close = ref([]);
//
//const deleteCarrera = (nombreCarrera, codigoCarrera) => {
//    confirmation(nombreCarrera, `/api/Carrera/delete/${codigoCarrera}`, 'careers', authStore.authToken);
//};

// Método que muestra la confirmación antes de eliminar
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
      deleteCarrera(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteCarrera = async (nombreCarrera, codigoCarrera) => {
  try {
    //await sendRequest('DELETE', form.value, `/api/Carrera/delete/${codigoCarrera}`, '');
    const response = await axios.delete(`/api/Carrera/delete/${codigoCarrera}`);
    Swal.fire({
      title: "Eliminado!",
      text: `La carrera ${nombreCarrera} ha sido eliminada.`,
      icon: "success",
    });
    getCarreras();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar la carrera ${nombreCarrera}.`,
      icon: "error",
      footer: error.message || "Por favor, intente nuevamente más tarde.",
    });
  }
};

const openModal = (op, nombreCarrera, codigoCarrera, estatus, codigoNivelAcademico) => {
  clear();
  setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
  operation.value = op;
  codigoCarreraActualizar.value = codigoCarrera;
  if (op == 1) {
    title.value = "Crear Registro";
  } else if (op == 2) {
    title.value = "Actualizar Registro";
    (form.value.nombreCarrera = nombreCarrera),
      (form.value.codigoNivelAcademico = codigoNivelAcademico),
      (form.value.estatus = estatus);
  } else {
    title.value = "Información";
    (form.value.nombreCarrera = nombreCarrera),
      (form.value.codigoNivelAcademico = codigoNivelAcademico),
      (form.value.estatus = estatus);
  }
};

const clear = () => {
  form.value.nombreCarrera = "";
  form.value.codigoNivelAcademico = "";
  form.value.estatus = "";
};

const save = async () => {
  let res;
  //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
  if (operation.value == 1) {
    res = await sendRequest("POST", form.value, "/api/Carrera/create", "");

    if (res == true) {
      clear();
      nextTick(() => close.value.click());
      getCarreras();
    }
  } else {
    res = await sendRequest(
      "PUT",
      form.value,
      `/api/Carrera/update/${codigoCarreraActualizar.value}`,
      ""
    );

    if (res == true) {
      nextTick(() => close.value.click());
      getCarreras();
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
  doc.text("LISTADO DE CARRERAS", 81, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Nivel Académico", "Estado"];

  // Datos de la tabla
  const data = datos.map((carrera, index) => [
    index + 1,
    carrera.nombreCarrera,
    carrera.nivelAcademico,
    carrera.estatus,
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
  doc.save("ReporteCarreras.pdf");
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
  //   'Carrera',
  //   'Establecimiento'
  // ];

  // Mapeo de datos con nombres de columnas
  const data = datos.map((carrera, index) => ({
    indice: index + 1,
    nombreCarrera: carrera.nombreCarrera,
    nivelAcademico: carrera.nivelAcademico,
    Estado: carrera.estatus,
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de Carreras");
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
  link.download = "reporteCarreras.xlsx";
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
