<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Información de Estudiante - Patrocinador</h3>
            <hr>
            <div class="row row-cols-auto mb-4">
                <div class="col">
                    <router-link :to="{ path: '/assignmenu' }">
                        Menú de asignación
                    </router-link>
                </div> >
                <div class="col">
                    <router-link :to="{ path: '/studentssponsors' }">
                        Estudiantes
                    </router-link>
                </div>>
                <div class="col text-primary">
                    <a href="#">Información</a>
                </div>
            </div>
            <div class="card border">
                <div class="card-body">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-danger " :disabled="botonDeshabilitado"
                            @click.prevent="exportarPDF"><i class="fa-solid fa-file-pdf"></i> Descargar PDF</button>

                    </div>
                    <div class="inf" id="exportarElemento">
                        <div class="card border mt-3">
                            <h5><strong>Nombre del estudiante: </strong> {{ estudiante }} {{ apellidoEstudiante }}</h5>
                            <h5><strong>Código del estudiante: </strong> {{ codigoBecario }}</h5>
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

                                            </tr>
                                        </thead>
                                        <tbody class="table-group-divider">
                                            <tr v-for="lp, i in listaPatrocinadores" :key="lp.codigoEstudiantePatrocinador">
                                                <td>{{ (i + 1) }}</td>
                                                <td>{{ lp.nombrePatrocinador }}</td>

                                            </tr>
                                        </tbody>

                                    </table>
                                    <Paginate :page-count="rows" :click-handler="getEstudiantePatrocinadores"
                                        :prev-text="Prev" :next-text="Next" :container-class="'pagination'">
                                    </Paginate>
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
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { sendRequest, confirmation } from '../../functions'
import html2pdf from "html2pdf.js"

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

//Para imprimir
const exportarPDF = () => {
    var element = document.getElementById('exportarElemento');
    var opt = {
        margin: 0.5,
        filename: 'archivo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
}
const estudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");


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
        estudiante.value = primerRegistro.nombreEstudiante;
        apellidoEstudiante.value = primerRegistro.apellidoEstudiante;
        codigoBecario.value = primerRegistro.codigoBecario;
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