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
    getEstudiante(1)
})

const estudiantes = ref([])

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idEstudiante = ref(0);
const rows = ref(0);

const load = ref(false)
const getEstudiante = async (page) => {
    try {
        const response = await axios.get(`/api/Estudiante/getall?pagina=${page}`)
        estudiantes.value = response.data.estudiantes;
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
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

    
    <div class="row">
        <h2>Lista de estudiantes</h2>
        <div class="col-md-2">
            <div class="d-grid col-10">
                <router-link :to="{ path: 'createstudent'}" >
                                
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
                            <th>Código Becario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="es, i in estudiantes" :key="es.codigoEstudiante">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ es.codigoBecario}}</td>
                            <td>{{ es.nombreEstudiante}}</td>
                            <td>{{ es.apellidoEstudiante}}</td>
                            <td class="text-center">
                                <router-link :to="{ path: 'informationstudentsponsor/' + es.codigoEstudiante }" class="btn btn-secondary active btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ path: 'assignsponsor/' + es.codigoEstudiante }" class="btn btn-success btn-sm">
                                    <i class="fa-solid fa-user-plus"></i>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getEstudiante"
                :prev-text="Prev"
                :next-text="Next"
                :container-class="'pagination'">
                </Paginate>
            </div>
        </div>
    </div>
</div>
</template>