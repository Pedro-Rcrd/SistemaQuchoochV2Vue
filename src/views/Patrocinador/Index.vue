<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { updateConfirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
    getPatrocinadores(1)
})

const patrocinadores = ref([]);

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idEstudiante = ref(0);
const rows = ref(0);

const load = ref(false)
const getPatrocinadores = async (page) => {
    try {
        const response = await axios.get(`/api/patrocinador/getall?pagina=${page}`)
        patrocinadores.value = response.data.patrocinadores;
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const cambioEstadoPatrocinador = (id, name) => {
    updateConfirmation(name, `/api/Patrocinador/updateEstado/${id}`, '/sponsors', authStore.authToken);
};




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
        <h2>Lista de Patrocinadores</h2>
        <div class="col-md-2">
            <div class="d-grid col-10">
                <router-link :to="{ path: 'createsponsor'}" >
                                
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
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Profesión</th>
                            <th>Pais</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="sp, i in patrocinadores" :key="sp.codigoPatrocinador">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ sp.nombrePatrocinador}}</td>
                            <td>{{ sp.apellidoPatrocinador}}</td>
                            <td>{{ sp.profesion}}</td>
                            <td>{{ sp.nombrePais}}</td>
                            <td>{{ sp.estado}}</td>
                            <td class="text-center">
                                <router-link :to="{ path: 'informationsponsor/' + sp.codigoPatrocinador }" class="btn btn-secondary active btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ path: 'editsponsor/' + sp.codigoPatrocinador }" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm"
                                    @click="$event => cambioEstadoPatrocinador(sp.codigoPatrocinador, sp.nombrePatrocinador)">
                                    <i class="fa-solid fa-trash"></i>

                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getPatrocinadores"
                :prev-text="Prev"
                :next-text="Next"
                :container-class="'pagination'">
                </Paginate>
            </div>
        </div>
    </div>
  
</div>
</template>