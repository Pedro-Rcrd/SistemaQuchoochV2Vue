<template>
  <div class="row justify-content-center" v-if="authStore.moduloInforme">
    <div class="row col-12">
      <h2>Estudiantes</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de informes </router-link>
          </div>
          >
          <div class="col text-primary">
            <a class="text-dark" href="#">Estudiantes</a>
          </div>
        </div>
      </div>
      <p class="placeholder-glow" v-if="deshabilitarComponentes">
        <span class="placeholder col-12 text-success"></span>
      </p>
      <!--Exportación-->

      <div class="row">
        <div class="col-10">
          <div class="row">
            <div class="col-2">
              <input
                @change="ConsultarEstudiantesNuevamente"
                v-model="CheckboxMostrarTodo"
                type="checkbox"
                class="form-check-input"
                id="checkRegistro"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Mostrar todo
              </label>
            </div>
          </div>

          <div class="row mt-1">
            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label"
                >Fecha Inicio</label
              >
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  autofocus
                  id="fechaRegistro"
                  required
                  type="date"
                  v-model="formRangoFecha.fechaIncio"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label">Fecha Fin</label>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  autofocus
                  id="fechaRegistro"
                  required
                  type="date"
                  v-model="formRangoFecha.fechaFin"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label text-light"
                >.</label
              >
              <div class="input-group">
                <button @click="getEstudiantesPorRangoFecha" class="btn btn-primary">
                  <i class="fa-solid fa-magnifying-glass"></i> Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 text-end">
          <div class="text-light mb-3" v-if="authStore.exportarModInforme">
            <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
              <i class="fa-solid fa-file-excel"></i> Excel
            </button>

            <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
              <i class="fa-solid fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>
      </div>
      <!--Buscador-->
      <div class="row justify-content-between">
        <div class="col-8">
          <input
            class="form-control"
            autofocus
            id="codigoEstudiante"
            v-model="filtro"
            @input="buscarEstudiante"
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
            <option selected disabled>Filtrar por:</option>
            <option value="nombreEstudiante">Nombre</option>
            <option value="apellidoEstudiante">Apellido</option>
            <option value="codigoBecario">Código</option>
            <option value="establecimiento">Establecimiento</option>
            <option value="nivelAcademico">Nivel Académico</option>
            <option value="comunidad">Comunidad</option>
            <option value="genero">Género</option>
            <option value="estado">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLosEstudiantes"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
          />
          <label class="form-check-label" for="flexCheckDefault"> Mostrar A/I </label>
        </div>
      </div>
      <!--Tabla-->
      <v-card class="mt-2">
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <router-link :to="{ path: '/fichaInformativa/' + item.codigoEstudiante }">
              <v-icon size="small">
                <i class="fa-solid fa-file-export text-dark"></i>
              </v-icon>
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useImageStore } from "../../stores/imageStore";
import axios from "axios";
import Swal from "sweetalert2";
const imageStore = useImageStore();

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const deshabilitarComponentes = ref(false);
const CheckboxMostrarTodo = ref(true);
const ConsultarEstudiantesNuevamente = () => {
  if (CheckboxMostrarTodo.value) {
    getEstudiantes();
  }
};

const formRangoFecha = ref({
  fechaIncio: "",
  fechaFin: "",
});

onMounted(() => {
  getEstudiantes();
});

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

const headers = [
  { title: "#", key: "indice" },
  { title: "Código", key: "codigoBecario" },
  { title: "Nombre", key: "nombreEstudiante" },
  { title: "Apellido", key: "apellidoEstudiante" },
  { title: "Nivel Académico", key: "nivelAcademico" },
  { title: "Establecimiento", key: "establecimiento" },
  { title: "Comunidad", key: "comunidad" },
  { title: "Fecha de registro", key: "fechaRegistro" },
  { title: "Genero", key: "genero" },
  { title: "Estado", key: "estado" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET estudiantes
//#region GET estudiantes
const estudiantes = ref([]);
const estudiantesActivos = ref([]);
const estudiantesSeleccionados = ref([]);
const mostrarTodosLosEstudiantes = ref(false);
const getEstudiantes = async () => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.get(`/api/Estudiante/selectall`);
    estudiantes.value = response.data.map((expense) => ({
      ...expense,
      fechaNacimieto: formatFecha(expense.fechaNacimieto), // Formatea la fecha
      fechaRegistro: formatFecha(expense.fechaRegistro), // Formatea la fecha
    }));
    estudiantesActivos.value = estudiantes.value.filter(
      (estudiante) => estudiante.estado.trim().toUpperCase() === "A"
    );

    if (mostrarTodosLosEstudiantes.value) {
      estudiantesSeleccionados.value = estudiantes.value;
    } else {
      estudiantesSeleccionados.value = estudiantesActivos.value;
    }

    mapeoDeDato(estudiantesSeleccionados.value);

    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los estudiantes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    deshabilitarComponentes.value = false;
  }
};

const getEstudiantesPorRangoFecha = async () => {
  try {
    if (!formRangoFecha.value.fechaIncio || !formRangoFecha.value.fechaFin) {
      return Swal.fire({
        title: "¡Campos vacíos!",
        text: `Por favor, complete los campos primero.`,
        icon: "warning",
      });
    }

    if (formRangoFecha.value.fechaIncio >= formRangoFecha.value.fechaFin) {
      return Swal.fire({
        title: "¡Error!",
        text: `El rango de fechas es inválido.`,
        icon: "error",
      });
    }

    deshabilitarComponentes.value = true;

    CheckboxMostrarTodo.value = false;
    const response = await axios.get("/api/Estudiante/buscarPorRangoFecha", {
      params: {
        fechaInicio: formRangoFecha.value.fechaIncio,
        fechaFin: formRangoFecha.value.fechaFin,
      },
    });
    estudiantes.value = response.data.map((expense) => ({
      ...expense,
      fechaNacimieto: formatFecha(expense.fechaNacimieto), // Formatea la fecha
      fechaRegistro: formatFecha(expense.fechaRegistro), // Formatea la fecha
    }));
    estudiantesActivos.value = estudiantes.value.filter(
      (estudiante) => estudiante.estado.trim().toUpperCase() === "A"
    );

    if (mostrarTodosLosEstudiantes.value) {
      estudiantesSeleccionados.value = estudiantes.value;
    } else {
      estudiantesSeleccionados.value = estudiantesActivos.value;
    }

    mapeoDeDato(estudiantesSeleccionados.value);
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los estudiantes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    deshabilitarComponentes.value = false;
  }
};
//#endregion

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((estudiante, index) => ({
    indice: index + 1,
    codigoBecario: estudiante.codigoBecario,
    codigoEstudiante: estudiante.codigoEstudiante,
    nombreEstudiante: estudiante.nombreEstudiante,
    apellidoEstudiante: estudiante.apellidoEstudiante,
    nivelAcademico: estudiante.nivelAcademico,
    establecimiento: estudiante.establecimiento,
    comunidad: estudiante.comunidad,
    fechaRegistro: estudiante.fechaRegistro,
    genero: estudiante.genero,
    fechaNacimiento: estudiante.fechaNacimieto,
    estado: estudiante.estado,
  }));
};

// Función para formatear la fecha
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
//Fin consulta

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar estudiante");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreEstudiante");

//Metodo del filtro de datos en la tabla
const buscarEstudiante = () => {
  console.log("Buscando...");
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los establecimientos

  if (textoBusqueda !== "") {
    datosFiltrados = estudiantesSeleccionados.value.filter((estudiante) => {
      const campoFiltro = estudiante[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(estudiantesSeleccionados.value);
  }
};
watch(mostrarTodosLosEstudiantes, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    estudiantesSeleccionados.value = estudiantesActivos.value;
  } else {
    //checkbox habilitado
    estudiantesSeleccionados.value = estudiantes.value;
  }
  mapeoDeDato(estudiantesSeleccionados.value);
});
//#endregion
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
  // Función para cargar una imagen desde una URL
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (err) {
        reject(err);
      };
      img.src = url;
    });
  }
  // URL de la imagen alojada en Internet

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 442, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("NÓMINA DE ESTUDIANTES", 78, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = [
    "No.",
    "Código",
    "Nombre",
    "Apellido",
    "Nivel Académico",
    "Carrera",
    "Establecimiento",
  ];

  // Datos de la tabla
  const data = datos.map((estudiante, index) => [
    index + 1,
    estudiante.codigoBecario,
    estudiante.nombreEstudiante,
    estudiante.apellidoEstudiante,
    estudiante.nivelAcademico,
    estudiante.carrera,
    estudiante.establecimiento,
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
  doc.save("ReporteEstudiantes.pdf");
};
//#endregion

//#region Metodo de EXCEL
//Metodo de exportar EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((estudiante, index) => ({
    Indice: index + 1,
    "Codigo Becario": estudiante.codigoBecario,
    "Nombre Estudiante": estudiante.nombreEstudiante,
    "Apellido Estudiante": estudiante.apellidoEstudiante,
    "Nivel Académico": estudiante.nivelAcademico,
    Establecimiento: estudiante.establecimiento,
    Comunidad: estudiante.comunidad,
    Género: estudiante.genero,
    "Fecha de Nacimiento": estudiante.fechaNacimieto,
    Estado: estudiante.estado,
    "Fecha de Registro": estudiante.fechaRegistro,
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de estudiantes");
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
  link.download = "reporteEstudiantes.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>
