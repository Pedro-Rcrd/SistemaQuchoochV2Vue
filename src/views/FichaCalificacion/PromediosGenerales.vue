<template>
  <div class="row justify-content-center" v-if="authStore.moduloInforme">
    <div class="row col-12">
      <h2>Evaluación de Rendimiento</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de informes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Evaluación de rendimiento</a>
          </div>
        </div>
      </div>
      <p class="placeholder-glow" v-if="mostrarBarraLoading">
        <span class="placeholder col-12 text-success"></span>
      </p>
      <div class="text-light mb-3" v-if="authStore.exportarModInforme">
        <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
          <i class="fa-solid fa-file-excel"></i> Excel
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </button>
      </div>
      <div class="row justify-content-center">
        <div class="col-6">
          <input
            class="form-control text-center fs-5 fw-bold"
            autofocus
            id="codigoFichaCalificacion"
            v-model="cantidadParaMostrar"
            type="number"
            placeholder="Cantidad"
          />
        </div>

        <div class="col-2">
          <div class="">
            <button @click="getPromediosGenerales" class="btn btn-primary mb-3">
              <i class="fa-solid fa-magnifying-glass"></i> Buscar
            </button>
          </div>
        </div>
      </div>
      <!--Inicio tabla-->
      <div class="row justify-content-center text-center mt-3">
        <div class="col-md-10 mb-1">
          <div class="row justify-content-between">
            <div class="col-10">
              <input
                class="form-control"
                autofocus
                id="codigoFichaCalificacion"
                v-model="filtro"
                @input="buscarPromediosEstudiantes"
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
                <option value="nivelAcademico">Nivel Académico</option>
                <option value="grado">Grado</option>
              </select>
            </div>
          </div>
          <v-card class="text-start">
            <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
              <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small">
                  <router-link :to="{ path: '/informationcard/' }">
                    <i class="fa-solid fa-eye text-dark"></i>
                  </router-link>
                </v-icon>
                <v-icon size="small" class="me-2">
                  <router-link :to="{ path: '/editcard/' }">
                    <i class="fa-solid fa-edit text-dark"></i>
                  </router-link>
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>

      <!--fin tabla-->
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useImageStore } from "../../stores/imageStore";
import axios from "axios";
import Swal from "sweetalert2";
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const cantidadParaMostrar = ref(10);

const mostrarBarraLoading = ref(false);

onMounted(() => {
  getPromediosGenerales();
});

//GET promediosEstudiantes
//#region GET promediosEstudiantes
const promediosEstudiantes = ref([]);
const promediosEstudiantesActivas = ref([]);
const promediosEstudiantesSeleccionadas = ref([]);
const mostrarTodasLaspromediosEstudiantes = ref(false);
const getPromediosGenerales = async () => {
  try {
    if (
      cantidadParaMostrar.value == 0 ||
      !cantidadParaMostrar.value ||
      cantidadParaMostrar.value == ""
    ) {
      return Swal.fire({
        title: "¡Campos vacíos!",
        text: `Por favor, complete el campo de la cantidad de registros.`,
        icon: "warning",
      });
    }
    mostrarBarraLoading.value = true;
    const response = await axios.get(
      `/api/FichaCalificacion/promediosGenerales/${cantidadParaMostrar.value}`
    );
    promediosEstudiantes.value = response.data;
    mapeoDeDato(promediosEstudiantes.value);

    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los promedios.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    mostrarBarraLoading.value = false;
  }
};
//#endregion

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((a, index) => ({
    indice: index + 1,
    nombreEstudiante: a.nombreEstudiante,
    nivelAcademico: a.nivelAcademico,
    grado: a.grado,
    promedioGeneral: a.promedioGeneral,
  }));
};

//#region DATOS de la tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreEstudiante" },
  { title: "Apellido", key: "nivelAcademico" },
  { title: "Ciclo Escolar", key: "grado" },
  { title: "Promedio", key: "promedioGeneral" },
];
//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar estudiante");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreEstudiante");

//Metodo del filtro de datos en la tabla
const buscarPromediosEstudiantes = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los establecimientos

  if (textoBusqueda !== "") {
    datosFiltrados = promediosEstudiantes.value.filter((a) => {
      const campoFiltro = a[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(promediosEstudiantes.value);
  }
};

//#endregion

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

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 445, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("EVALUACIÓN DE RENDIMIENTOS", 71, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headerPDF = ["#", "Nombre", "Nivel Académico", "Grado", "Promedio"];

  // Datos de la tabla
  const data = datos.map((a, index) => [
    index + 1,
    a.nombreEstudiante,
    a.nivelAcademico,
    a.grado,
    a.promedioGeneral,
  ]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: "#909909", // Color de fondo
    textColor: "#FFFFFF", // Color del texto
    fontStyle: "bold", // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headerPDF],
    body: data,
    startY: 20, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("ReporteFichasDeCalificaciones.pdf");
};
//#endregion

//#region Metodo de EXCEL
//Metodo de exportar EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    indice: index + 1,
    Nombre: a.nombreEstudiante,
    "Nivel Académico": a.nivelAcademico,
    Grado: a.grado,
    Promedio: a.promedioGeneral,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Promedios");
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
  link.download = "reporteEvaluacionRendimiento.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>
