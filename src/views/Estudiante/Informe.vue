<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
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
{ data: 'codigoBecario' },
{ data: 'nombreEstudiante' },
{ data: 'apellidoEstudiante' },
{ data: 'fechaNacimieto' },
{ data: 'telefonoEstudiante' },
{ data: 'email' },
{ data: 'nivelAcademico' },
{ data: 'establecimiento' },


]

columns2.value = [{
    data: null, render: function (data, type, row, meta) { return (meta.row + 1) }
},
{ data: 'nombre' }]

buttons1.value = [
    {
        title: 'Estudiantes', extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className: 'btn btn-success'
    },
    {
        title: 'Estudiantes', extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className: 'btn btn-danger'
    },
    {
        title: 'Estudiantes', extend: 'print',
        text: '<i class="fa-solid fa-print"></i> PRINT',
        className: 'btn btn-dark'
    },
    {
        title: 'Estudiantes', extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPY',
        className: 'btn btn-secondary'
    }
]
//Fin del reporte--------------------


onMounted(() => {
    getEstudiante()
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
const getEstudiante = async () => {
    try {
        const response = await axios.get(`/api/Estudiante/selectall`)
        estudiantes.value = response.data.map(expense => ({
            ...expense,
            fechaNacimieto: formatFecha(expense.fechaNacimieto) // Formatea la fecha
        }));
        //rows.value = response.data.totalPaginas;
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
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">


        <div class="row">
            <h2>Lista de estudiantes</h2>
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
                    <DataTable :data="estudiantes" :columns="columns1" class="table table-striped"
                        :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip', buttons: buttons1 }">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de nacimiento</th>
                               
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Nivel académico</th>
                                <th>Establecimiento</th>
                                

                            </tr>
                        </thead>

                    </DataTable>
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