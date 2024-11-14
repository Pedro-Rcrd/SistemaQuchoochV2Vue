<template>
  <div class="row justify-content-center" v-if="authStore.moduloReporte">
    <div class="row col-11">
      <h3>Becarios por años</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/graphicsmenu' }"> Menú de reportes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Compras y gastos</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="bg-light p-2">
                <div class="row justify-content-between">
                  <div class="col-10">
                    <h5>Gráfica de compras y gastos activos</h5>
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
                    <Bar v-if="loaded" :data="chartData" :options="chartOptions"></Bar>
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
                            <th scope="col" class="text-center">Registro</th>
                            <th scope="col" class="text-center">Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in gastosYCompras" :key="index">
                            <th scope="row" class="text-center">{{ index + 1 }}</th>
                            <td class="text-center">{{ item.bloque }}</td>
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
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const ocultarElementos = ref(true);

//#region gráfica
const tipos = ref([]);
const cantidades = ref([]);
const chartData = ref([]);
const chartOptions = ref([]);
const colors = ref([]);
const loaded = ref(false);
const random = () => {
  return Math.floor(Math.random() * 256);
};
const gastosYCompras = ref([]);

const getGastosYCompras = async () => {
  const info = await axios.get("/api/gasto/gastos&compras");
  gastosYCompras.value = info.data;
  info.data.map(
    (row) => (
      tipos.value.push(row.bloque),
      cantidades.value.push(row.cantidad),
      colors.value.push("rgb(" + random() + ", " + random() + "," + random() + ")")
    )
  );
  chartOptions.value = { response: true };
  chartData.value = {
    labels: tipos.value,
    datasets: [
      { label: "Gastos y Compras", data: cantidades.value, backgroundColor: colors },
    ],
  };
  loaded.value = true;
};
//#endregion

onMounted(async () => {
  getGastosYCompras();
});

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.1,
    filename: "ReporteCompras.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
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
