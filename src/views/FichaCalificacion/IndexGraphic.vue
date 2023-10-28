<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
    getFichasCalificaciones(1)
})

const fichasCalificaciones = ref([])
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idEstudiante = ref(0);
const rows = ref(0);

const load = ref(false)
const getFichasCalificaciones = async (page) => {
    try {
        const response = await axios.get(`/api/fichacalificacion/getall?pagina=${page}`)
        fichasCalificaciones.value = response.data.fichasCalificaciones.map(expense => ({
            ...expense,
            cicloEscolar: formatFecha(expense.cicloEscolar) // Formatea la fecha
        }))
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}



// Función para formatear la fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    return year.toString();
}

</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 85px;
}

.marco {
    background-color: #09801d;
 
    }
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">

    
    <div class="row">
        <h2>Lista de Fichas de Calificaciones</h2>
        <div class="col-md-2">
            <div class="d-grid col-10">
                <router-link :to="{ path: 'createcard'}" >
                                
                <button class="btn btn-dark">
                    <i class="fa-solid fa-circle-plus"></i> Agregar
                </button>
            </router-link>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-12">
            <div class="card border border-white text-center" v-if="!load">
                <div class="card-body">
                    <img src="/loading.gif" alt="img-fluid">
                </div>
            </div>
            <div class="table-responsive" v-else>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Estudiante</th>
                            <th>Establecimiento</th>
                            <th>Nivel Academico</th>
                            <th>Grado</th>
                            <th>Carrera</th>
                            <th>Ciclo Escolar</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="fc, i in fichasCalificaciones" :key="fc.codigoFichaCalificacion">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ fc.estudiante}}</td>
                            <td>{{ fc.establecimiento}}</td>
                            <td>{{ fc.nivelAcademico}}</td>
                            <td>{{ fc.grado}}</td>
                            <td>{{ fc.carrera}}</td>
                            <td>{{ fc.cicloEscolar}}</td>
                            <td class="text-center">
                                <router-link :to="{ path: 'graphiccard/' + fc.codigoFichaCalificacion }" class="btn btn-secondary active btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getFichasCalificaciones"
                :prev-text="Prev"
                :next-text="Next"
                :container-class="'pagination'">
                </Paginate>
            </div>
        </div>
    </div>
</div>
</template>