<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'
import { Bar, Pie } from 'vue-chartjs'
import {
    Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
    LinearScale, ArcElement
} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
    ArcElement);

import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

const anio = ref(0);

const nivelesAcademicos = ref([]);
const cantidades = ref([]);
const chartData = ref([]);
const chartOptions = ref([]);
const colors = ref([]);
const loaded = ref(false);
const random = () => {
    return Math.floor(Math.random() * 256);
}



const save = async () => {
    const info = await axios.get(`/api/fichacalificacion/totalregistronivelacademico/${anio.value}`);
    nivelesAcademicos.value = [];
    cantidades.value = [];
    colors.value = [];
    info.data.map((row) => (
        nivelesAcademicos.value.push(row.nivelAcademico),
        cantidades.value.push(row.cantidad),
        colors.value.push("rgb(" + random() + ", " + random() + "," + random() + ")")

    ));
    console.log(colors.value);
    chartOptions.value = { response: true }
    chartData.value = {
        labels: nivelesAcademicos.value,
        datasets: [
            { label: 'Niveles académicos', data: cantidades.value, backgroundColor: colors.value }
        ]
    };
    loaded.value = true;
}
</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 85px;
}
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9 ">
            <div class="row">
                <h2>Gráfica de estudiantes por nivel academico</h2>
                <hr>
                <form @submit.prevent="save">
                    <div class="col-md-4">

                    </div>

                    <div class="col-md-5">
                       
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-n"></i>
                            </span>
                            <input autofocus placeholder="Ciclo escolar" id="anio" type="number" class="form-control " v-model="anio">
                            <div class="ms-1">
                                <button class="btn btn-primary">
                                <i class="fa-solid fa-save"></i> consultar</button>

                            </div>
                            
                        </div>
                    </div>

                   
                </form>
                <br>

                <Bar v-if="loaded" :data="chartData" :options="chartOptions"></Bar>



            </div>

        </div>

    </div>
</template>