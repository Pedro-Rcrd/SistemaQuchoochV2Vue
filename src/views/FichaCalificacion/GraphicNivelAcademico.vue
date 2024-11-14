<template>
  <div class="row justify-content-center" v-if="authStore.moduloReporte">
    <div class="row col-11">
      <h3>Estudiantes por niveles académicos</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/graphicsmenu' }"> Menú de reportes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Estudiantes</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <p class="placeholder-glow" v-if="mostrarBarraLoading">
              <span class="placeholder col-12 text-success"></span>
            </p>
            <div class="row justify-content-center" v-show="ocultarElementos">
              <div class="col-md-6">
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-people-roof"></i>
                  </span>
                  <input
                    placeholder="Año"
                    v-model="anioIngresado"
                    autofocus
                    id="anio"
                    required
                    type="number"
                    class="form-control text-center fs-5 fw-bold"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <button
                  @click="buscarEstudiantesPorNivelAcademico"
                  class="btn btn-primary"
                >
                  <i class="fa-solid fa-magnifying-glass"></i> Buscar
                </button>
              </div>
            </div>

            <div class="col-12 p-0">
              <div class="bg-light p-2" v-show="mostraGraficas">
                <div class="row justify-content-between">
                  <div class="col-10">
                    <h5>
                      Gráfica de estudiantes por niveles académicos del año
                      {{ anioIngresado }}
                    </h5>
                  </div>
                  <div class="col-2 pl-5 text-end">
                    <i
                      @click="exportarPDF"
                      style="font-size: 24px"
                      v-show="ocultarElementos"
                      class="fas fa-circle-down"
                      v-if="authStore.exportarModReporte"
                    ></i>
                  </div>
                </div>

                <div class="row justify-content-center">
                  <div class="col-10">
                    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
                  </div>
                </div>

                <div class="row justify-content-center text-center mt-3">
                  <hr />
                  <div class="col-md-10 mb-1">
                    <div class="table-container">
                      <table class="table table-scroll table-sm table-striped">
                        <thead>
                          <tr>
                            <th scope="col" class="text-center">#</th>
                            <th scope="col" class="text-start">Nivel Académico</th>
                            <th scope="col" class="text-center">Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in cantidadEstudiantes" :key="index">
                            <th scope="row" class="text-center">{{ index + 1 }}</th>
                            <td class="text-start">{{ item.nivelAcademico }}</td>
                            <td class="text-center">{{ item.cantidad }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12 p-0">
              <div class="bg-light p-2" v-show="mostraGraficas">
                <div class="row justify-content-between">
                  <div class="col-10">
                    <h5>
                      Gráfica de estudiantes por niveles académicos del año
                      {{ anioIngresado - 1 }}
                    </h5>
                  </div>
                </div>

                <div class="row justify-content-center">
                  <div class="col-10">
                    <Line
                      v-if="loadedAnioAnterior"
                      :data="chartDataAnioAnterior"
                      :options="chartOptions"
                    />
                  </div>
                </div>

                <div class="row justify-content-center text-center mt-3">
                  <hr />
                  <div class="col-md-10 mb-1">
                    <div class="table-container">
                      <table class="table table-scroll table-sm table-striped">
                        <thead>
                          <tr>
                            <th scope="col" class="text-center">#</th>
                            <th scope="col" class="text-start">Nivel Académico</th>
                            <th scope="col" class="text-center">Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in cantidadEstudiantesAnioAnterior"
                            :key="index"
                          >
                            <th scope="row" class="text-center">{{ index + 1 }}</th>
                            <td class="text-start">{{ item.nivelAcademico }}</td>
                            <td class="text-center">{{ item.cantidad }}</td>
                          </tr>
                        </tbody>
                      </table>
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
//Gráfica
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const mostrarBarraLoading = ref(false);
const ocultarElementos = ref(true);
const mostraGraficas = ref(false);
const anioIngresado = ref(0);
const buscarEstudiantesPorNivelAcademico = async () => {
  if (!anioIngresado.value || anioIngresado.value == 0 || anioIngresado.value == "") {
    return Swal.fire({
      title: "Campo vacío",
      text: `Por favor, ingrese el año válido.`,
      icon: "warning",
    });
  }
  clear();

  getEstudiantesPorNivelAcademico();
  getEstudiantesPorNivelAcademicoAnioAnterior();
};

const clear = () => {
  tipos.value = [];
  cantidades.value = [];
  chartData.value = [];
  chartOptions.value = [];
  loaded.value = false;
  //----
  cantidadEstudiantesAnioAnterior.value = [];
  tiposAnioAnterior.value = [];
  cantidadesAnioAnterior.value = [];
  chartDataAnioAnterior.value = [];
  loadedAnioAnterior.value = false;
};

//#region gráfica
const tipos = ref([]);
const cantidades = ref([]);
const chartData = ref([]);
const chartOptions = ref([]);
const loaded = ref(false);
// Función para generar colores aleatorios (opcional)
const random = () => Math.floor(Math.random() * 256);
const cantidadEstudiantes = ref(0);

const getEstudiantesPorNivelAcademico = async () => {
  mostrarBarraLoading.value = true;
  const info = await axios.get(
    `/api/fichaCalificacion/estudiantesPorNivelAcademico/${anioIngresado.value}`
  );
  cantidadEstudiantes.value = info.data;
  info.data.map(
    (row) => (tipos.value.push(row.nivelAcademico), cantidades.value.push(row.cantidad))
  );

  chartOptions.value = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: "Niveles académicos" } },
      y: { title: { display: true, text: "Cantidad de estudiantes" } },
    },
  };

  chartData.value = {
    labels: tipos.value,
    datasets: [
      {
        label: "Estudiantes",
        data: cantidades.value,
        borderColor: `rgb(${random()}, ${random()}, ${random()})`,
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4, // Hace la línea más suave
      },
    ],
  };
  loaded.value = true;

  mostrarBarraLoading.value = false;
};

const cantidadEstudiantesAnioAnterior = ref([]);
const tiposAnioAnterior = ref([]);
const cantidadesAnioAnterior = ref([]);
const chartDataAnioAnterior = ref([]);
const loadedAnioAnterior = ref(false);
const getEstudiantesPorNivelAcademicoAnioAnterior = async () => {
  const info = await axios.get(
    `/api/fichaCalificacion/estudiantesPorNivelAcademico/${anioIngresado.value - 1}`
  );
  cantidadEstudiantesAnioAnterior.value = info.data;
  info.data.map(
    (row) => (
      tiposAnioAnterior.value.push(row.nivelAcademico),
      cantidadesAnioAnterior.value.push(row.cantidad)
    )
  );

  chartDataAnioAnterior.value = {
    labels: tiposAnioAnterior.value,
    datasets: [
      {
        label: "Estudiantes",
        data: cantidadesAnioAnterior.value,
        borderColor: `rgb(${random()}, ${random()}, ${random()})`,
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4, // Hace la línea más suave
      },
    ],
  };
  loadedAnioAnterior.value = true;
  mostraGraficas.value = true;
};
//#endregion

//onMounted(async () => {
//    getEstudiantesPorNivelAcademico();
//    getEstudiantesPorNivelAcademicoAnioAnterior();
//});

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.1,
    filename: "EstudiantesPorNivelAcademico.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 25px;
}

.marco {
  background-color: #768009;
}

.bordeMarco {
  border: 2px solid #768009;
}
</style>
