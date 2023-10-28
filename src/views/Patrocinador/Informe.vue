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
{ data: 'nombrePatrocinador' },
{ data: 'apellidoPatrocinador' },
{ data: 'profesion' },
{ data: 'fechaNacimiento' },
{ data: 'nombrePais' }

]

columns2.value = [{
    data: null, render: function (data, type, row, meta) { return (meta.row + 1) }
},
{ data: 'nombre' }]

buttons1.value = [
    {
        title: 'Patrocinadores', extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className: 'btn btn-success'
    },
    {
        tiFichas: 'Patrocinadores', extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className: 'btn btn-danger'
    },
    {
        title: 'Patrocinadores', extend: 'print',
        text: '<i class="fa-solid fa-print"></i> PRINT',
        className: 'btn btn-dark'
    },
    {
        title: 'Patrocinadores', extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPY',
        className: 'btn btn-secondary'
    }
]
//Fin del reporte--------------------


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
        patrocinadores.value = response.data.patrocinadores.map(expense => ({
            ...expense,
            fechaNacimiento: formatFecha(expense.fechaNacimiento) // Formatea la fecha
        }));
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

// Función para formatear la fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
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
            <h2>Lista de patrocinadores</h2>
            <div class="col-md-4">
                <div class="d-grid col-10">
                    <router-link :to="{ name: 'reportmenu' }">

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
                    <DataTable :data="patrocinadores" :columns="columns1" class="table table-striped"
                        :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons1 }">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Profesion</th>
                                <th>Fecha de nacimiento</th>
                                <th>Pais</th>
                                
        
                            </tr>
                        </thead>

                    </DataTable>
                </div>

            </div>
        </div>
  
</div>
</template>