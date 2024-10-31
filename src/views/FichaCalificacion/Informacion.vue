<template>
  <div class="row justify-content-center">
    <div class="row col-11">
      <h3>Información de la ficha escolar</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/cards' }"> Fichas de calificaciones </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Información</a>
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
                  <div class="col-11">
                    <h5>Detalles de la ficha escolar</h5>
                  </div>
                  <div class="col-1 text-end">
                    <i @click="exportarExcel" style="font-size: 24px" class="fas fa-file-excel mr-1 text-success"
                      v-show="ocultarElementos"></i>
                    <i @click="exportarPDF" style="font-size: 24px" class="fas fa-circle-down"
                      v-show="ocultarElementos"></i>
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
            </div>
          </div>

          <div class="bg-light row mt-3 p-2">
            <div class="card p-0 m-2" style="width: 19rem" v-for="item in informacionFichaCalificacion.bloques">
              <div class="card-header" :style="{ backgroundColor: obtenerColor(item.codigoPromedio) }">
                <div class="row justify-content-between">
                  <div class="col">Bloque: {{ item.bloque }}</div>
                  <div class="col text-end"></div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Promedio: {{ item.promedio }}</h5>

                <!--TABLA-->
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Curso</th>
                      <th scope="col">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(nota, curso, index) in item.materias" :key="index">
                      <th scope="row" class="text-center">{{ index + 1 }}</th>
                      <td>{{ curso }}</td>
                      <td>{{ nota }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--TABLA-->
              </div>
            </div>
          </div>
          <div class="row bg-light mt-3 p-2">
            <div class="row justify-content-center">
            <div class="col-10 ">
              <Bar v-if="loaded" :data="chartData" :options="chartOptions"></Bar>
            </div>
             
            </div>
          </div>
          <!--card body-->
        </div>
      </div>
      <!--Otra tarjeta-->
      <div class="card border p-3" id="cajaImagenes">
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
                  <div class="col-11">
                    <h5>Sección de fotografías <i v-show="ocultarElementos" @click="getImagenesFicha"
                        class="fas fa-eye"></i></h5>
                  </div>
                  <div class="col-1 text-end">
                    <i @click="exportarImagenesPDF" style="font-size: 24px;" v-show="ocultarElementos"
                      class="fas fa-circle-down"></i>
                  </div>
                </div>

                <!--Bloque de fotografías-->
                <div class="row " v-for="item in imagenesFichaEscolar" v-if="imagenesFichaEscolar">
                  <div class="card m-2 p-2" style="width: 10rem">
                    <img style="max-width: 150px; max-height: 150px;" :src="item.imgEstudiante" class="card-img-top"
                      alt="Imagen del estudiante" />
                    <div class="card-body ">
                      <div class="row text-end">
                        <div class="col-12 text-end">
                          <i v-show="ocultarElementos" @click="abrirImagenEnNuevaVentana(item.imgEstudiante)"
                            class="fas fa-circle-plus text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card m-2 p-2" style="width: 10rem"
                    v-if="item.imgFichaCalificacion && item.imgFichaCalificacion.length > 60">
                    <img style="max-width: 150px; max-height: 150px;" :src="item.imgFichaCalificacion"
                      class="card-img-top" alt="Imagen de la ficha escolar" />
                    <div class="card-body">
                      <div class="row text-end">
                        <div class="col-12 text-end">
                          <i v-show="ocultarElementos" @click="abrirImagenEnNuevaVentana(item.imgFichaCalificacion)"
                            class="fas fa-circle-plus text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--otra tarjeta-->
                  <div class="card m-2 p-2" style="width: 10rem" v-if="item.imgCarta && item.imgCarta.length > 60">
                    <img style="max-width: 150px; max-height: 150px;" :src="item.imgCarta" class="card-img-top"
                      alt="Imagen de la carta" />
                    <div class="card-body">
                      <div class="row text-end">
                        <div class="col-12 text-end">
                          <i v-show="ocultarElementos" @click="abrirImagenEnNuevaVentana(item.imgCarta)"
                            class="fas fa-circle-plus text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
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
//grafica
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
  LinearScale, ArcElement
} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
  ArcElement);

//fin grafica

const route = useRoute();
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
const parametro = route.params.codigoFichaCalificacion;
onMounted(() => {
  //getCursosBloques()
  getPromedioCursos();
  getInformacionFichaCalificacion();
  getListaDeTodosLosCursos();
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

const informacionFichaCalificacion = ref([]);
const getInformacionFichaCalificacion = async () => {
  try {
    const response = await axios.get(
      `/api/fichaCalificacion/InformacionNuevoBloqueFicha/${parametro}`
    );
    informacionFichaCalificacion.value = response.data;
    nombreEstudiante.value = informacionFichaCalificacion.value.nombreEstudiante;
    apellidoEstudiante.value = informacionFichaCalificacion.value.apellidoEstudiante;
    codigoBecario.value = informacionFichaCalificacion.value.codigoBecario;
    establecimiento.value = informacionFichaCalificacion.value.establecimiento;
    nivelAcademico.value = informacionFichaCalificacion.value.nivelAcademico;
    grado.value = informacionFichaCalificacion.value.grado;
    carrera.value =
      informacionFichaCalificacion.value.carrera != ""
        ? informacionFichaCalificacion.value.carrera
        : "No aplica";
    cicloEscolar.value = formatFecha(informacionFichaCalificacion.value.cicloEscolar);
    numeroDeBloque.value = informacionFichaCalificacion.value.numeroBloque + 1;
    modalidadEstudio.value = informacionFichaCalificacion.value.modalidad;

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


// mostrar loading
const mostrarBarraLoading = ref(true);


const imagenesFichaEscolar = ref();
const getImagenesFicha = async () => {
  try {
    mostrarBarraLoading.value = true;
    const response = await axios.get(
      `/api/fichaCalificacion/ObtenerImagenesFicha/${parametro}`
    );
    imagenesFichaEscolar.value = response.data;
    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener las imagenes de la ficha escolar.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    mostrarBarraLoading.value = false;
  }
};

const listaDeTodosLosCursos = ref();
const getListaDeTodosLosCursos = async () => {
  try {
    mostrarBarraLoading.value = true;
    const response = await axios.get(
      `/api/fichaCalificacion/cursos/${parametro}`
    );
    listaDeTodosLosCursos.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de todos los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

  }
};

//#region Gráfica de promedios
const tipos = ref([]);
const cantidades = ref([]);
const chartData = ref([]);
const chartOptions = ref([]);
const colors = ref([]);
const loaded = ref(false);
const random = () => {
  return Math.floor(Math.random() * 256);
}

const getPromedioCursos = async () => {
  const info = await axios.get(`/api/fichacalificacion/promedioPorCurso/${parametro}`);
  info.data.map((row) => (
    tipos.value.push(row.curso),
    cantidades.value.push(row.promedioGeneral),
    colors.value.push("rgb(" + random() + ", " + random() + "," + random() + ")")
  ));
  chartOptions.value = { response: true }
  chartData.value = {
    labels: tipos.value,
    datasets: [
      { label: 'Promedio de los cursos', data: cantidades.value, backgroundColor: colors }
    ]
  };
  loaded.value = true;
}
//#endregion



//#region Exportar en PDF
import html2pdf from "html2pdf.js";
const ocultarElementos = ref(true);

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.1,
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
    margin: 0.0,
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
}
//#endregion

//#region Metodo de EXCEL
import * as XLSX from 'xlsx';

const exportarExcel = () => {
  const datos = listaDeTodosLosCursos.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    'indice': index + 1,
    'Nombre': a.curso,
    'Nota': a.nota,
    'Bloque': a.bloque,
    'Promedio': a.promedio
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cursos');
  // Crear un archivo de datos binarios de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  // Convertir el archivo binario en un Blob
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // Crear una URL para el Blob
  const url = window.URL.createObjectURL(blob);
  // Crear un enlace invisible para descargar el archivo
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Cursos.xlsx';
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
