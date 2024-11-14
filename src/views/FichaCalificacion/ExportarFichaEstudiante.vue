<template>
  <div class="row justify-content-center">
    <div class="row col-11">
      <h3>Información de la ficha escolar</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de informes </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/exportreportcard' }">
              Fichas de calificaciones
            </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Exportación</a>
          </div>
        </div>
      </div>
      <div class="card border p-0" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="bg-light p-2">
                <div class="row">
                  <p class="placeholder-glow" v-if="mostrarBarraLoading">
                    <span class="placeholder col-12 text-success"></span>
                  </p>
                </div>

                <div class="row justify-content-between">
                  <div class="col-10">
                    <h5>Detalles de la ficha escolar</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <p class="m-0">
                      Establecimiento: <strong>{{ establecimiento }}</strong>
                    </p>
                    <p class="m-0">
                      Grado / año: <strong>{{ grado }}</strong>
                    </p>
                    <p class="m-0">
                      Nivel académico: <strong>{{ nivelAcademico }}</strong>
                    </p>
                    <p class="m-0">
                      Carrera: <strong>{{ carrera }}</strong>
                    </p>
                    <p>
                      Modalidad: <strong>{{ modalidadEstudio }}</strong>
                    </p>
                  </div>
                  <div class="col-5">
                    <p class="m-0">
                      <strong>{{ nombreEstudiante }} {{ apellidoEstudiante }}</strong>
                    </p>
                    <p class="m-0">
                      Código: <strong>{{ codigoBecario }}</strong>
                    </p>
                    <p>
                      Ciclo escolar: <strong>{{ cicloEscolar }}</strong>
                    </p>
                  </div>
                </div>
              </div>
              <!--encabezado-->
              <div class="bg-light p-2 mt-3">
                <div class="row">
                  <div class="row">
                    <div class="col-md-4">
                      <label for="exampleFormControlInput1" class="form-label"
                        >Bloque<span class="text-danger">*</span></label
                      >
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <i class="fa-solid fa-building"></i>
                        </span>
                        <select
                          class="form-control form-select"
                          id="codigoCurso"
                          v-model="codigoFichaCalificacionDetalle"
                          :disabled="deshabilitarComponentes"
                        >
                          <option value="" disabled selected>Selecciona bloque</option>
                          <template
                            v-for="tipo in listaBloques"
                            :key="tipo.codigoFichaCalificacionDetalle"
                          >
                            <option :value="tipo.codigoFichaCalificacionDetalle">
                              {{ tipo.bloque }}
                            </option>
                          </template>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label for="exampleFormControlInput1" class="form-label"
                        >Formato<span class="text-danger">*</span></label
                      >
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <i class="fa-solid fa-file-pdf"></i>
                        </span>
                        <select
                          v-model="tipoFormatoExportacion"
                          class="form-control form-select"
                          :disabled="deshabilitarComponentes"
                        >
                          <option value="1">Inglés</option>
                          <option value="2">Español</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label for="exampleFormControlInput1" class="form-label text-light"
                        >.</label
                      >
                      <div class="input-group">
                        <button
                          @click="formatoExportacion"
                          class="btn btn-primary"
                          :disabled="mostrarBarraLoading"
                        >
                          Exportar PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenLogoAsociacion = imageStore.ImagenLogoQuchoochVerde;
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;

const route = useRoute();
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
const parametro = route.params.codigoFichaCalificacion;
onMounted(() => {
  //getBloquesBloques()
  getInformacionFichaCalificacion();
  getBloques();
});

const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");
const grado = ref("");
const nivelAcademico = ref("");
const establecimiento = ref("");
const carrera = ref("");
const cicloEscolar = ref("");
const modalidadEstudio = ref("");
const promedioNotas = ref(0);

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  return year.toString();
};

const getInformacionFichaCalificacion = async () => {
  try {
    const response = await axios.get(
      `/api/fichaCalificacion/encabezadoFicha/${parametro}`
    );
    nombreEstudiante.value = response.data.estudiante;
    apellidoEstudiante.value = response.data.apellidoEstudiante;
    codigoBecario.value = response.data.codigoBecario;
    establecimiento.value = response.data.establecimiento;
    nivelAcademico.value = response.data.nivelAcademico;
    grado.value = response.data.grado;
    carrera.value = response.data.carrera != "" ? response.data.carrera : "No aplica";
    cicloEscolar.value = formatFecha(response.data.cicloEscolar);
    modalidadEstudio.value = response.data.modalidadEstudio;

    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la información de la ficha escolar.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    mostrarBarraLoading.value = false;
  }
};

const listaBloques = ref();
const getBloques = async () => {
  try {
    const response = await axios.get(`/api/fichacalificacion/listaBloques/${parametro}`);
    listaBloques.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

// mostrar loading
const mostrarBarraLoading = ref(true);
const codigoFichaCalificacionDetalle = ref(0);

//Bloque seleccionado
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);

const getImagenesFicha = async () => {
  try {
    const response = await axios.get(
      `/api/fichaCalificacion/imagenesPorBloque/${parametro}/${codigoFichaCalificacionDetalle.value}`
    );
    imgEstudiante.value = response.data.imgEstudiante;
    imgFicha.value = response.data.imgFicha;
    imgCarta.value = response.data.imgCarta;
    promedioNotas.value = response.data.promedio;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener las imagenes de la ficha escolar.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//#region Formato exportación
const tipoFormatoExportacion = ref(1);
const formatoExportacion = async () => {
  try {
    if (
      codigoFichaCalificacionDetalle.value == 0 ||
      !codigoFichaCalificacionDetalle.value ||
      codigoFichaCalificacionDetalle.value == " "
    ) {
      return Swal.fire({
        title: "Bloque Inválido",
        text: `Por favor, seleccione un bloque válido.`,
        icon: "warning",
      });
    }
    mostrarBarraLoading.value = true;

    if (
      tipoFormatoExportacion.value == 0 ||
      !tipoFormatoExportacion.value ||
      tipoFormatoExportacion.value == " "
    ) {
      return Swal.fire({
        title: "Formato Inválido",
        text: `Por favor, seleccione un formato válido.`,
        icon: "warning",
      });
    }
    await getImagenesFicha();

    if (tipoFormatoExportacion.value == 1) {
      //Formato Inglés
      await descargarFormatoInglesPDF();
    } else {
      //Formato Español
      await descargarFormatoEspañolPDF();
    }
    mostrarBarraLoading.value = false;
  } catch {
    mostrarBarraLoading.value = false;
  }
};
//#endregion

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const descargarFormatoInglesPDF = async () => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter", // Tamaño carta (8.5 x 11 pulgadas)
  });

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  doc.addImage(imgData, "JPEG", 60, 11, 15, 15);

  // Configurar el color y la fuente para el texto
  //doc.setTextColor(144, 153, 9); // Color blanco
  doc.setTextColor(128, 128, 0); // Color blanco
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(16);
  doc.text("ALDEA MAYA", 90, 19);
  doc.setFontSize(10);
  doc.text(`"Fostering Hope in Guatemala Highlands"`, 75, 23);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 30, 410, 45);

  doc.setTextColor(0, 0, 0); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(18);
  doc.text(`STUDENT REPORT CARD ${cicloEscolar.value}`, 63, 40);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 42, 410, 45);
  //Datos del estudainte
  doc.setFont("helvetica", "normal"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text(`Code: ${codigoBecario.value}`, 12, 57);
  doc.text(`Name: ${nombreEstudiante.value}`, 62, 57);
  doc.text(`Lastname: ${apellidoEstudiante.value}`, 112, 57);
  doc.text(`Average: ${promedioNotas.value}`, 178, 57);
  //Agregando imagenes
  doc.addImage(imgEstudiante.value, "JPEG", 43, 66, 130, 160);

  //Nueva pagina
  if (imgFicha.value && imgFicha.value.length > 30) {
    doc.addPage();
    doc.addImage(imgFicha.value, "JPEG", 43, 35, 130, 160);
  }

  //Tercera pagina
  if (imgCarta.value && imgCarta.value.length > 30) {
    doc.addPage();
    doc.addImage(imgCarta.value, "JPEG", 43, 35, 130, 160);
  }

  // Guardar el documento como un archivo PDF
  doc.save("REPORT CARDS ALDEA MAYA.pdf");
};

const descargarFormatoEspañolPDF = async () => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter", // Tamaño carta (8.5 x 11 pulgadas)
  });

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  doc.addImage(imgData, "JPEG", 41, 11, 15, 15);

  // Configurar el color y la fuente para el texto
  //doc.setTextColor(144, 153, 9); // Color blanco
  doc.setTextColor(128, 128, 0); // Color blanco
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(16);
  doc.text("ASOCIACIÓN QUCHOOCH", 73, 19);
  doc.setFontSize(10);
  doc.text(`"Cultivando Esperanza en el Altiplano Indígena de Guatemala"`, 57, 23);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 30, 410, 45);

  doc.setTextColor(0, 0, 0); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(18);
  doc.text(`TARJETA DE CALIFICACIONES DEL ESTUDIANTE ${cicloEscolar.value}`, 21, 40);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 42, 410, 45);
  //Datos del estudainte
  doc.setFont("helvetica", "normal"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text(`Código: ${codigoBecario.value}`, 12, 57);
  doc.text(`Nombre: ${nombreEstudiante.value}`, 47, 57);
  doc.text(`Apellidos: ${apellidoEstudiante.value}`, 118, 57);
  doc.text(`Promedio: ${promedioNotas.value}`, 178, 57);
  //Agregando imagenes
  doc.addImage(imgEstudiante.value, "JPEG", 43, 66, 130, 160);

  //Nueva pagina
  if (imgFicha.value && imgFicha.value.length > 30) {
    doc.addPage();
    doc.addImage(imgFicha.value, "JPEG", 43, 35, 130, 160);
  }

  //Tercera pagina
  if (imgCarta.value && imgCarta.value.length > 30) {
    doc.addPage();
    doc.addImage(imgCarta.value, "JPEG", 43, 35, 130, 160);
  }

  // Guardar el documento como un archivo PDF
  doc.save("TARJETA DE CALIFICACIONES.pdf");
};
//#endregion

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
