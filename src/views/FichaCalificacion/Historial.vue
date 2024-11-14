<template>
  <div class="row justify-content-center" v-if="authStore.moduloInforme">
    <div class="row col-11">
      <h3>Historial de la ficha escolar</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de informes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Historial</a>
          </div>
        </div>
      </div>
      <div class="card border p-3" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <p class="placeholder-glow" v-if="mostrarBarraLoading">
              <span class="placeholder col-12 text-success"></span>
            </p>
            <div class="row">
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-user"></i>
                  </span>
                  <input
                    placeholder="Código Becario"
                    v-model="codigoBecarioIngresado"
                    autofocus
                    id="codigoBecario"
                    required
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <button @click="getFichasCalificaciones" class="btn btn-primary">
                  <i class="fa-solid fa-magnifying-glass"></i> Buscar
                </button>
              </div>
            </div>
            <div class="col-12 p-0">
              <div class="bg-light p-2 mt-3" v-for="item in fichasCalificaciones">
                <div class="row"></div>
                <div class="row">
                  <div class="col-12 text-end">
                    <router-link
                      :to="{ path: '/detalleHistorial/' + item.codigoFichaCalificacion }"
                    >
                      <i class="fa-solid fa-eye text-dark"></i>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-7">
                    <p class="m-0">
                      Establecimiento: <strong>{{ item.establecimiento }}</strong>
                    </p>
                    <p class="m-0">
                      Grado / año: <strong>{{ item.grado }}</strong>
                    </p>
                    <p class="m-0">
                      Nivel académico: <strong>{{ item.nivelAcademico }}</strong>
                    </p>
                    <p class="m-0" v-if="item.carrera">
                      Carrera: <strong>{{ item.carrera }}</strong>
                    </p>
                    <p>
                      Modalidad: <strong>{{ item.modalidadEstudio }}</strong>
                    </p>
                  </div>
                  <div class="col-5">
                    <p class="m-0">
                      <strong>{{ item.estudiante }} {{ item.apellidoEstudiante }}</strong>
                    </p>
                    <p class="m-0">
                      Código: <strong>{{ item.codigoBecario }}</strong>
                    </p>
                    <p class="m-0">
                      Ciclo escolar: <strong>{{ item.cicloEscolar }}</strong>
                    </p>
                    <p>
                      Estado:
                      <strong>{{ item.estatus === "A" ? "Activo" : "Inactivo" }}</strong>
                    </p>
                  </div>
                </div>
              </div>
              <!--encabezado-->
            </div>
          </div>

          <!--card body-->
        </div>
      </div>

      <!--Final-->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Paginate from "vuejs-paginate-next";
import { useRoute } from "vue-router";
import router from "@/router";
import Swal from "sweetalert2";
const route = useRoute();
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
const parametro = route.params.codigoFichaCalificacion;
onMounted(() => {
  //getCursosBloques()
});

const bgColorPromedioRojo = ref("#FF0000");
const bgColorPromedioAmarrillo = ref("#FFFF00");
const bgColorPromedioVerde = ref("#00FF00");

const obtenerColor = (codigoPromedio) => {
  if (codigoPromedio === 1) {
    return bgColorPromedioRojo.value;
  } else if (codigoPromedio === 2) {
    return bgColorPromedioAmarrillo.value;
  } else if (codigoPromedio === 3) {
    return bgColorPromedioVerde.value;
  }
  return "white"; // Color por defecto si no coincide
};

const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");
const grado = ref("");
const nivelAcademico = ref("");
const establecimiento = ref("");
const carrera = ref("");
const cicloEscolar = ref("");
const modalidadEstudio = ref("");

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  return year.toString();
};

//Bloque seleccionado
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);
const numeroDeBloque = ref(0);
const mostrarBarraLoading = ref(false);
const codigoBecarioIngresado = ref("");
const fichasCalificaciones = ref([]);
const getFichasCalificaciones = async () => {
  try {
    if (!codigoBecarioIngresado.value || codigoBecarioIngresado.value == "") {
      return Swal.fire({
        title: "Código Inválido",
        text: `Por favor, ingrese el codigo del becario.`,
        icon: "warning",
      });
    }
    mostrarBarraLoading.value = true;
    const response = await axios.get(
      `/api/FichaCalificacion/historial/${codigoBecarioIngresado.value}`
    );
    fichasCalificaciones.value = response.data.map((expense) => ({
      ...expense,
      cicloEscolar: formatFecha(expense.cicloEscolar), // Formatea la fecha
    }));
    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de fichas de calificaciones.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    mostrarBarraLoading.value = false;
  }
};

//#region Exportar en PDF
import html2pdf from "html2pdf.js";
const ocultarElementos = ref(true);

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.5,
    filename: "fichaEscolar.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

//Exportar Imagenes
const exportarImagenesPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("cajaImagenes");
  var opt = {
    margin: 0.5,
    filename: "imagenes.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "legal", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};
//#endregion

//#region Abrir imagen en nueva pestaña
const abrirImagenEnNuevaVentana = (urlImagen) => {
  // Usa window.open para abrir una nueva ventana con el enlace base64
  const nuevaVentana = window.open();

  // Escribe el contenido HTML en la nueva ventana, incluyendo la imagen base64
  nuevaVentana.document.write(`
          <html>
            <head><title>Imagen</title></head>
            <body>
              <img style="max-width: 400px; max-height: 400px;" src="${urlImagen}" alt="Imagen Base64"/>
            </body>
          </html>
        `);
};
//#endregion

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = listaDeTodosLosCursos.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    indice: index + 1,
    Nombre: a.curso,
    Nota: a.nota,
    Bloque: a.bloque,
    Promedio: a.promedio,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cursos");
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
  link.download = "Cursos.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 85px;
}

.cajaImagen {
  page-break-inside: avoid;
}
</style>
