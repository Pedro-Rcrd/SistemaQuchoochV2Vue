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
        const response = await axios.get(`/api/patrocinador/getall?pagina=${page}&id=${idPatrocinador.value}`)
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


//Inicio método para buscar patrocinador

const idPatrocinador = ref(0);
const busqueda = ref('');
const mostrarLista = ref(true);
const visibilidad = ref([]);

const listaCompleta = () => {
    busqueda.value = "";
    idPatrocinador.value = 0;
    getPatrocinadores(1);
}


const buscarPatrocinador = () => {
    const textoBusqueda = busqueda.value.toLowerCase().trim();
    if (textoBusqueda !== '') {
        //return []; // Si la búsqueda está vacía, devuelve una lista vacía
        mostrarLista.value = true;
        visibilidad.value = patrocinadores.value.filter(patrocinador =>
            patrocinador.nombrePatrocinador.toLowerCase().includes(textoBusqueda));
    }
};


const seleccionarPatrocinador = (patrocinador) => {
    idPatrocinador.value = patrocinador.codigoPatrocinador;
    busqueda.value = patrocinador.nombrePatrocinador;
    mostrarLista.value = false; // Ocultar la lista después de seleccionar
    // Aquí puedes realizar cualquier otra lógica que necesites con el Patrocinador seleccionado
    console.log(`El id del patrocinadores es: ${idPatrocinador.value}`);
};

//Fin metodo para buscar Patrocinador



</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 85px;
}

.listaFiltro {
    position: absolute;
    z-index: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
    /* border: 1px solid #ccc; */
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
    padding: 10px;
    cursor: pointer;
}

.listaFiltro li:hover {
    background-color: #007bff;
    color: #fff
}
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">


        <div class="row mb-3">
            <h2>Lista de Patrocinadores</h2>
            <div class="col-md-2">
                <div class="d-grid col-10">
                    <router-link :to="{ path: 'createsponsor' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-circle-plus"></i> Agregar
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Patrocinador</label>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-n"></i>
                    </span>
                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                        @input="buscarPatrocinador" type="text" placeholder="Buscar patrocinador">
                    <div class="ms-1">
                        <button class="btn btn-primary ms-1" @click.prevent="getPatrocinadores(1)">
                            <i class="fa-solid fa-save"></i> Buscar</button>
                    </div>

                </div>
                <ul class="list-group listaFiltro" v-if="mostrarLista">
                    <li v-for="patrocinador in visibilidad" :key="patrocinador.codigoPatrocinador"
                        @click="seleccionarPatrocinador(patrocinador)">
                        {{ patrocinador.nombrePatrocinador }}
                    </li>
                </ul>
            </div>
            <div class="col-md-8 mt-5 ">
                <button class="btn btn-dark float-end" @click.prevent="listaCompleta">
                    <i class="fa-solid fa-check"></i> Mostar todo</button>
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
                                <td>{{ sp.nombrePatrocinador }}</td>
                                <td>{{ sp.apellidoPatrocinador }}</td>
                                <td>{{ sp.profesion }}</td>
                                <td>{{ sp.nombrePais }}</td>
                                <td  class="text-center align-middle"><P :class="{'bg-success text-white': sp.estado === 'A', 'bg-danger text-white': sp.estado === 'I'}">
                                {{ sp.estado === 'A' ? 'Activo' : sp.estado === 'I' ? 'Inactivo' : sp.estado }}</P></td>
                               
                                <td class="text-center">
                                    <router-link :to="{ path: 'informationsponsor/' + sp.codigoPatrocinador }"
                                        class="btn btn-secondary active btn-sm">
                                        <i class="fa-solid fa-eye"></i>
                                    </router-link>
                                </td>
                                <td class="text-center">
                                    <router-link :to="{ path: 'editsponsor/' + sp.codigoPatrocinador }"
                                        class="btn btn-warning btn-sm">
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
                    <Paginate :page-count="rows" :click-handler="getPatrocinadores" :prev-text="Prev" :next-text="Next"
                        :container-class="'pagination'">
                    </Paginate>
                </div>
            </div>
        </div>

    </div>
</template>