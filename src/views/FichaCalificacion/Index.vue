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
    getListaEstudiantes();
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
        const response = await axios.get(`/api/fichacalificacion/getall?pagina=${page}&id=${idEstudiante.value}`)
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


//Inicio bloque de buscar estudiante
const listaEstudiantes = ref([]);
const visibilidad = ref([]);
const busqueda = ref('');
const mostrarLista = ref(true);
//Consulta
const listaCompleta = () => {
    busqueda.value = "";
    idEstudiante.value = 0;
    getFichasCalificaciones(1);
}

const getListaEstudiantes = async () => {
    try {
        const response = await axios.get('/api/estudiante/selectAll');
        listaEstudiantes.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Para buscar texto
const buscarEstudiantes = () => {
    const textoBusqueda = busqueda.value.toLowerCase().trim();
    if (textoBusqueda !== '') {
        //return []; // Si la búsqueda está vacía, devuelve una lista vacía
        mostrarLista.value = true;
        visibilidad.value = listaEstudiantes.value.filter(estudiante =>
            estudiante.nombreEstudiante.toLowerCase().includes(textoBusqueda));
    }
};

const seleccionarEstudiante = (estudiante) => {
    idEstudiante.value = estudiante.codigoEstudiante;
    busqueda.value = estudiante.nombreEstudiante;
    mostrarLista.value = false; // Ocultar la lista después de seleccionar
    // Aquí puedes realizar cualquier otra lógica que necesites con el estudiante seleccionado
    console.log(`El id del estudiantes es: ${idEstudiante.value}`);
};


//Fin bloque de buscar estuadiante




const deleteFichaCalificacion = (id, name) => {
    confirmation(name, `/api/FichaCalificacion/delete/${id}`, '/cards', authStore.authToken);
};

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
    <div class="row">
            <div class="col-md-4 ">
                <label for="exampleFormControlInput1" class="form-label">Buscar estudiante</label>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-n"></i>
                    </span>
                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                        @input="buscarEstudiantes" type="text" placeholder="Buscar estudiantes">
                    <div class="ms-1">

                        <button class="btn btn-primary" @click.prevent="getFichasCalificaciones(1)">
                            <i class="fa-solid fa-save"></i> Buscar</button>

                    </div>
                </div>
               
                <ul class="list-group listaFiltro" v-if="mostrarLista">
                    <li v-for="estudiante in visibilidad" :key="estudiante.codigoEstudiante"
                        @click="seleccionarEstudiante(estudiante)">
                        {{ estudiante.nombreEstudiante }}
                    </li>
                </ul>
                
                
            </div >
            <div class="col-md-8 mt-5 ">
                        <button class="btn btn-dark float-end" @click.prevent="listaCompleta">
                            <i class="fa-solid fa-check"></i> Mostar todo</button>
                    </div>
        </div>
    <div class="row mt-1">
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
                                <router-link :to="{ path: 'informationcard/' + fc.codigoFichaCalificacion }" class="btn btn-secondary active btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ path: 'editcard/' + fc.codigoFichaCalificacion }" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ path: 'newblock/' + fc.codigoFichaCalificacion }" class="btn btn-success btn-sm">
                                    <i class="fa-solid fa-circle-plus"></i>
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