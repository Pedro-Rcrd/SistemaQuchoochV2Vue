<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'

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
const types = ref([{'id':'1', 'name': 'Carreras'}])
 

columns1.value = [{data:null, render:function(data, type, row, meta)
{return (meta.row +1)}},
{data:'nombreCarrera'}
]

columns2.value = [{data:null, render:function(data, type, row, meta)
{return (meta.row + 1)}},
{data: 'nombre'}]

buttons1.value=[
    {
        title:'Carreras', extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className: 'btn btn-success'
    },
    {
        title:'Carreras', extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className: 'btn btn-danger'
    },
    {
        title:'Carreras', extend: 'print',
        text: '<i class="fa-solid fa-print"></i> PRINT',
        className: 'btn btn-dark'
    },
    {
        title:'Carreras', extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPY',
        className: 'btn btn-secondary'
    }
]
//Fin del reporte--------------------

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
        getCarreras(1)
});


const carreras = ref([]);
const load = ref(false);
const rows = ref(0);
const currentPage = ref(1); // Página actual
const itemsPerPage = ref(10); // Número de elementos por página

const form = ref({
    nombreCarrera: ''
});
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);

const idCarrera = ref(0);



const getCarreras = async (page) => {
    try {
        const response = await axios.get('/api/Carrera/getall')
        carreras.value = response.data.carreras
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deleteCarrera = (id, name) => {
    confirmation(name, `/api/Carrera/delete/${id}`, '/careers', authStore.authToken);
};

const openModal = (op, codigoCarrera, nombreCarrera) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoCarrera;
    idCarrera.value = codigoCarrera;
    if (op == 1) {
        title.value = 'Crear '

    } else {
        title.value = 'Actualizar Carrera';
        form.value.nombreCarrera = nombreCarrera;
    }
}
const clear = () => {
    form.value.nombreCarrera = '';
}

const save = async () => {
    let res;
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Carrera/create', '');
        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getCarreras(1);
        }
    } else {
        res = await sendRequest('PUT', form.value, `/api/Carrera/update/${idCarrera.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getCarreras(1);
        }

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
            <h2>Lista de Cursos</h2>
            <div class="col-md-2">
                <div class="d-grid col-10">
                    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal"
                        @click="$event => openModal(1)">
                        <i class="fa-solid fa-circle-plus"></i> Agregar
                    </button>
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
                                <th>Carrera</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="c, i in carreras" :key="c.codigoCarrera">
                                <td>{{ (i + 1) }}</td>

                                <td>{{ c.nombreCarrera }}</td>
                                <td class="text-center">
                                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal"
                                        @click="$event => openModal(2, c.codigoCarrera, c.nombreCarrera)">
                                        <i class="fa-solid fa-edit"></i>

                                    </button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger btn-sm"
                                        @click="$event => deleteCarrera(c.codigoCarrera, c.nombreCarrera)">
                                        <i class="fa-solid fa-trash"></i>

                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Paginate :page-count="rows"
                :click-handler="getCarreras"
                :prev-text="Prev"
                :next-text="Next"
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
                        <input autofocus type="text" v-model="form.nombreCarrera" placeholder="Carrera" required
                            class="fomr-control" ref="nameInput">
                    </div>
                    <div class="d-grid col-10 mx-auto">
                        <button class="btn btn-dark">
                            <i class="fa-solid fa-save"></i> Registrar</button>
                    </div>
                </form>
                <div class="modal-footer">
                    <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">Cerrar</button>
                </div>

            </div>

        </Modal>
    </div>
</template>