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

//Inicio de reporte----------------------
import DataTable from 'datatables.net-vue3'
import 'datatables.net-dt/css/jquery.dataTables.css'
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import JsZip from 'jszip';
import pdfmake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfmake.vfs;
window.JSZip = JsZip;
DataTable.use(ButtonsHtml5);

const columns1 = ref([]);
const columns2 = ref([]);
const buttons1 = ref([]);
const buttons2 = ref([]);
const report = ref('1');
const types = ref([{ 'id': '1', 'name': 'Estudiantes' }])


columns1.value = [{
    data: null, render: function (data, type, row, meta) { return (meta.row + 1) }
},
{ data: 'estudiante' },
{ data: 'apellidoEstudiante' },
{ data: 'establecimiento' },
{ data: 'nivelAcademico' },
{ data: 'grado' },
{ data: 'carrera' },
{ data: 'cicloEscolar' },


]

columns2.value = [{
    data: null, render: function (data, type, row, meta) { return (meta.row + 1) }
},
{ data: 'nombre' }]

buttons1.value = [
    {
        title: 'Fichas de calificaciones', extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className: 'btn btn-success'
    },
    {
        tiFichas: 'Ficha de calificaciones', extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className: 'btn btn-danger'
    },
    {
        title: 'Fichas de calificaciones', extend: 'print',
        text: '<i class="fa-solid fa-print"></i> PRINT',
        className: 'btn btn-dark'
    },
    {
        title: 'Fichas de calificaciones', extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPY',
        className: 'btn btn-secondary'
    }
]
//Fin del reporte--------------------


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
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="row">
            <h2>Lista de fichas de calificaciones</h2>
            <div class="col-md-4">
                <div class="d-grid col-10">
                    <router-link :to="{ name: 'cards' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-backward"></i> Regresar
                        </button>
                    </router-link>
                </div>
            </div>

        </div>
        <div class="row mt-3">
            <div class="col-md-12">

                <div class="table-responsive">
                    <DataTable :data="fichasCalificaciones" :columns="columns1" class="table table-striped"
                        :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons1 }">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Establecimiento</th>
                                <th>Nivel académico</th>
                                <th>Grado</th>
                                <th>Carrera</th>
                                <th>Ciclo escolar</th>
        
                            </tr>
                        </thead>

                    </DataTable>
                </div>

            </div>
        </div>
    
</div>
</template>