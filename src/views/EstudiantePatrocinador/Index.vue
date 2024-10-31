<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Estudiantes</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/assignmenu' }"> Menú de asignación </router-link>
          </div>
          >
          <div class="col text-primary">
            <a class="text-dark" href="#">Estudiantes</a>
          </div>
        </div>
      </div>
      <!--Exportación-->
      <div class="text-light mb-3" v-if="authStore.exportarModAsignacion">
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
          <label class="form-check-label" for="flexCheckDefault"> Mostrar todo </label>
        </div>
        <div class="col-2">
          <div class="text-end">
            <router-link
              :to="{ path: '/createstudent' }"
              class="btn btn-primary mb-3"
              v-if="authStore.crearModAsignacion"
            >
              <i class="fa-solid fa-circle-plus"></i> Nuevo
            </router-link>
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
              data-bs-target="#MostrarInformacion"
              @click="
                openModal(
                  1,
                  item.codigoBecario,
                  item.nombreEstudiante,
                  item.apellidoEstudiante,
                  item.codigoEstudiante
                )
              "
            >
              <i class="fa-solid fa-eye text-dark"></i>
            </v-icon>
            <v-icon size="small" v-if="authStore.crearModAsignacion">
              <router-link :to="{ path: '/assignsponsor/' + item.codigoEstudiante }">
                <i class="fa-solid fa-circle-plus text-dark"></i>
              </router-link>
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>

  <Modal :id="'MostrarInformacion'" :title="title">
    <div class="modal-body" id="contenidoModal">
      <div class="text-center">
        <h5>
          <strong>{{ nombreEstudiante }} {{ apellidoEstudiante }}</strong>
        </h5>
        <h5>{{ codigoBecario }}</h5>
      </div>
      <hr />

      <div>
        <div class="row text-center">
          <h5 class="m-0">Patrocinadores</h5>
          <span v-show="ocultarElementos"
            ><i
              @click="exportarPatrocinadoresAsigandosExcel"
              class="fas fa-file-excel text-success"
            ></i>
            <i
              @click="exportarPatrocinadoresAsignadosPDF"
              class="fas fa-file-pdf text-danger"
            ></i
          ></span>
        </div>

        <!--Tabla-->
        <table class="table table-striped table-sm">
          <thead>
            <tr class="text-start">
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(patrocinador, index) in patrocinadores" :key="patrocinador.id">
              <td>{{ index + 1 }}</td>
              <td>{{ patrocinador.nombrePatrocinador }}</td>
              <td>{{ patrocinador.apellidoPatrocinador }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "../../components/Modal.vue";

import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

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
  { title: "Genero", key: "genero" },
  { title: "Estado", key: "estado" },
  { title: "Acción", key: "actions", sortable: false },
];

//#region datos del modal
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");
const codigoEstudianteSeleccionado = ref("");
const title = ref("");

const openModal = (op, codigoDeBecario, nombre, apellido, codigoEstudiante) => {
  if (op == 1) {
    title.value = "Información";
    codigoBecario.value = codigoDeBecario;
    nombreEstudiante.value = nombre;
    apellidoEstudiante.value = apellido;
    getPatrocinadores(codigoEstudiante);
  }
};
//#endregion

//GET estudiantes
//#region GET estudiantes
const estudiantes = ref([]);
const estudiantesActivos = ref([]);
const estudiantesSeleccionados = ref([]);
const mostrarTodosLosEstudiantes = ref(false);
const getEstudiantes = async () => {
  try {
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
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los estudiantes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
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
    genero: estudiante.genero,
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

const patrocinadores = ref("");
const getPatrocinadores = async (codigoEstudiante) => {
  try {
    const response = await axios.get(
      `/api/estudiantePatrocinador/listaPatrocinadores/${codigoEstudiante}`
    );
    patrocinadores.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los patrocinadores.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};
//#endregion

import html2pdf from "html2pdf.js";
const ocultarElementos = ref(true);
const exportarPatrocinadoresAsignadosPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("contenidoModal");
  var opt = {
    margin: 0.5,
    filename: "patrocinadoresAsignados.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarPatrocinadoresAsigandosExcel = () => {
  const datos = patrocinadores.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    indice: index + 1,
    Estudiante: a.estudiante,
    "Nombre del patrocinador": a.nombrePatrocinador,
    "Apellido del patrocinador": a.apellidoPatrocinador,
    Pais: a.pais,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patrocinadores");
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
  link.download = "Patrocinadores Asignados.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
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

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 442, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("ESTUDIANTES", 92, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Código", "Nombre", "Apellido", "Genero", "Estado"];

  // Datos de la tabla
  const data = datos.map((estudiante, index) => [
    index + 1,
    estudiante.codigoBecario,
    estudiante.nombreEstudiante,
    estudiante.apellidoEstudiante,
    estudiante.genero,
    estudiante.estado,
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

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((estudiante, index) => ({
    Indice: index + 1,
    "Codigo Becario": estudiante.codigoBecario,
    "Nombre Estudiante": estudiante.nombreEstudiante,
    "Apellido Estudiante": estudiante.apellidoEstudiante,
    Género: estudiante.genero,
    Estado: estudiante.estado,
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
