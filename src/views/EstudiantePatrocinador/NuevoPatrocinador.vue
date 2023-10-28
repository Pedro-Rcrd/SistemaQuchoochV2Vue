<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9 ">
            <h3>Asignación de Patrocinadores</h3>
            <hr>
            <div class="card border border-success">
                <div class="card-header bg-success border border-success"></div>
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <h4>Estudiante: {{ estudiante }}</h4>                   
                        </div>  
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Patrocinador</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                                        @input="buscarPatrocinador" type="text" placeholder="Buscar patrocinador">

                                </div>
                                <ul class="list-group listaFiltro" v-if="mostrarLista">
                                    <li v-for="patrocinador in visibilidad" :key="patrocinador.codigoPatrocinador"
                                        @click="seleccionarPatrocinador(patrocinador)">
                                        {{ patrocinador.nombrePatrocinador }}
                                    </li>
                                </ul>
                            </div>               
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Asignar</button>
                            <RouterLink :to="{ name: 'studentssponsors' }">
                                <button type="button" class="btn btn-outline-primary">Cancelar</button>
                            </RouterLink>
                        </div>

                    </form>
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
                            <th>Patrocinadores</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="lp, i in listaPatrocinadores" :key="lp.codigoEstudiantePatrocinador">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ lp.nombrePatrocinador}}</td> 
                            <td class="d-flex justify-content-center align-items-center">
                                <button class="btn btn-danger btn-sm"
                                @click="$event => deletePatrocinador(lp.codigoEstudiantePatrocinador, lp.nombrePatrocinador)">
                                <i class="fa-solid fa-trash"></i>

                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getEstudiantePatrocinadores"
                :prev-text="Prev"
                :next-text="Next"
                :container-class="'pagination'">
                </Paginate>
            </div>
        </div>
    </div>
            
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { sendRequest, confirmation } from '../../functions'

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;


const estudiante = ref("");


const load = ref(false)


const botonDeshabilitado = ref(false);

const patrocinadores = ref([]);
const listaPatrocinadores = ref([]);

//Inicio método para buscar estudiante
const idPatrocinador = ref(0);
const busqueda = ref('');
const mostrarLista = ref(true);
const visibilidad = ref([]);

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

const getPatrocinadores = async () => {
    try {
        const response = await axios.get('/api/Patrocinador/selectAll');
        patrocinadores.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Estudiantes patrocinadores
const getEstudiantePatrocinadores = async () => {
    try {
        const response = await axios.get(`/api/estudiantepatrocinador/getall/${parametro}`);
        listaPatrocinadores.value = response.data.estudiantePatrocinadores;
        const primerRegistro = response.data.estudiantePatrocinadores[0];
        estudiante.value  = primerRegistro.nombreEstudiante;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Eliminar patrocinador
const deletePatrocinador = (id, name) => {
    confirmation(name, `/api/estudiantepatrocinador/delete/${id}`, `/assignsponsor/${parametro}`, authStore.authToken);
};





const parametro = route.params.codigoEstudiante;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

onMounted(async () => {
    getPatrocinadores();
    getEstudiantePatrocinadores();
});


const submitForm = async () => {
  /*   if (!titulo.value || !monto.value) {
        return alert('Completa todos los campos antes de enviar.');
    } */
    botonDeshabilitado.value = true;

   

    const form = ref({
        CodigoEstudiante: parametro,
        CodigoPatrocinador: idPatrocinador.value,

      
    });

    try {
            console.log(`El parametro ${parametro}`)
            let res;

            res = await sendRequest('POST', form.value, `/api/estudiantepatrocinador/create`, `/assignsponsor/${parametro}`);
        
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
    }
};
</script>
  
<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 25px;
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
    background-color: #5434b5;
    color: #fff
}
</style>