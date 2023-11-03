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
    getListaEstudiantes();
})

const estudiantes = ref([])
const form = ref({
    CodigoComunidad: 0,
    CodigoNivelAcademico: 0,
    CodigoGrado: 0,
    CodigoCarrera: 0,
    CodigoEstablecimiento: 0,
    nombreEstudiante: '',
    apellidoEstudiante: '',
    fechaNacimieto: '',
    genero: '',
    estado: '',
    telefonoEstudiante: '',
    email: '',
    sector: 0,
    numeroCasa: '',
    descripcion: '',
    nombrePadre: '',
    telefonoPadre: '',
    oficioPadre: '',
    nombreMadre: '',
    telefonoMadre: '',
    oficioMadre: '',
    fotoPerfil: '',
    fechaRegistro: ''
});

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idEstudiante = ref(0);
const rows = ref(0);

const load = ref(false)
const listaCompleta = () => {
    busqueda.value = "";
    idEstudiante.value = 0;
    getEstudiante(1);
}
const getEstudiante = async (page) => {
    try {
        const response = await axios.get(`/api/Estudiante/getall?pagina=${page}&id=${idEstudiante.value}`)
        estudiantes.value = response.data.estudiantes;
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

const deleteEstudiante = (id, name) => {
    confirmation(name, `/api/Estudiante/delete/${id}`, '/students', authStore.authToken);
};

const openModal = (op, codigoNivelAcademico, nombreNivelAcademico) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoNivelAcademico;
    if (op == 1) {
        title.value = 'Crear Registro'

    } else {
        title.value = 'Actualizar Registro';
        form.value.nombreNivelAcademico = nombreNivelAcademico;
        idNivelAcademico.value = codigoNivelAcademico;
    }
}
const clear = () => {
    form.value.nombreNivelAcademico = '';

}

const save = async () => {
    let res;
    //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Estudiante/create', '');

        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getEstudiante(1);
        }
    } else {
        /*         for (let i = 0; i < form.value.length; i++) {
                    console.log(form.value[i]);
                }
                console.log("llegó aquí") */
        res = await sendRequest('PUT', form.value, `/api/Estudiante/update/${idEstudiante.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getEstudiante(1);
        }

    }
}
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


        <div class="row">
            <h2>Lista de estudiantes</h2>

            <div class="col-md-2 mb-3">
                <div class="d-grid col-10">
                    <router-link :to="{ path: 'createstudent' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-circle-plus"></i> Agregar
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 primeroDiv">
                <label for="exampleFormControlInput1" class="form-label">Buscar estudiante</label>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-n"></i>
                    </span>
                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                        @input="buscarEstudiantes" type="text" placeholder="Buscar estudiantes">
                    <div class="ms-1">

                        <button class="btn btn-primary" @click.prevent="getEstudiante(1)">
                            <i class="fa-solid fa-save"></i> consultar</button>

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
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Padre</th>
                                <th>Madre</th>

                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="es, i in estudiantes" :key="es.codigoEstudiante">
                                <td>{{ (i + 1) }}</td>
                                <td>{{ es.nombreEstudiante }}</td>
                                <td>{{ es.apellidoEstudiante }}</td>
                                <td>{{ es.telefonoEstudiante }}</td>
                                <td>{{ es.email }}</td>
                                <td>{{ es.nombrePadre }}</td>
                                <td>{{ es.nombreMadre }}</td>

                                <td class="text-center">
                                    <router-link :to="{ path: 'informationstudent/' + es.codigoEstudiante }"
                                        class="btn btn-secondary active btn-sm">
                                        <i class="fa-solid fa-eye"></i>
                                    </router-link>
                                </td>

                                <td class="text-center">
                                    <router-link :to="{ path: 'editstudent/' + es.codigoEstudiante }"
                                        class="btn btn-warning btn-sm">
                                        <i class="fa-solid fa-edit"></i>
                                    </router-link>
                                </td>

                            </tr>
                        </tbody>

                    </table>
                    <Paginate :page-count="rows" :click-handler="getEstudiante" :prev-text="Prev" :next-text="Next"
                        :container-class="'pagination'">
                    </Paginate>
                </div>
            </div>
        </div>
        <Modal :id="'modal'" :title="title">
            <div class="modal-body">
                <form @submit.prevent="save">

                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="form.nombreNivelAcademico" placeholder="Nivel Academico"
                            required class="fomr-control" ref="nameInput">
                    </div>

                    <div class="d-grid col-10 mx-auto">
                        <button class="btn btn-dark">
                            <i class="fa-solid fa-save"></i> Registrar</button>
                    </div>
                </form>


            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </Modal>
    </div>
</template>