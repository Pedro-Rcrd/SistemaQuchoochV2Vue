<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Paginate from 'vuejs-paginate-next'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

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
{ data: 'titulo' },
{ data: 'codigoBecario' },
{ data: 'estudiante' },
{ data: 'fechaCreacion' },
{ data: 'total' },
{ data: 'personaRecibe' },
{ data: 'descripcion' },


]

columns2.value = [{
    data: null, render: function (data, type, row, meta) { return (meta.row + 1) }
},
{ data: 'nombre' }]

buttons1.value = [
    {
        title: 'Compras', extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className: 'btn btn-success'
    },
    {
        title: 'Compras', extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className: 'btn btn-danger'
    },
    {
        title: 'Compras', extend: 'print',
        text: '<i class="fa-solid fa-print"></i> PRINT',
        className: 'btn btn-dark'
    },
    {
        title: 'Compras', extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPY',
        className: 'btn btn-secondary'
    }
]
//Fin del reporte--------------------


onMounted(() => {
    getCompras(1)
})

const compras = ref([])

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idGasto = ref(0);
const rows = ref(0);

const load = ref(false)
const getCompras = async (page) => {
    try {
        const response = await axios.get(`/api/Compra/getall?pagina=${page}`)
        compras.value = response.data.compras.map(expense => ({
            ...expense,
            fechaCreacion: formatFecha(expense.fechaCreacion) // Formatea la fecha
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
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
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
            <h2>Lista de compras</h2>
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
                    <DataTable :data="compras" :columns="columns1" class="table table-striped"
                        :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons1 }">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titulo</th>
                                <th>Código</th>
                                <th>Estudiante</th>
                                <th>Fecha de creación</th>
                                <th>total</th>
                                <th>Persona que recibió</th>
                                <th>Decripción</th>
        
                                

                            </tr>
                        </thead>

                    </DataTable>
                </div>

            </div>
        </div>

      
    </div>
</template>