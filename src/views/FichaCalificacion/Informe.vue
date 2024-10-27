<template>
    <div class="row justify-content-center">
        <div class="row col-12">
            <h2>Fichas de Calificaciones</h2>
            <hr>
            <div class="container text-center mb-4">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/reportmenu' }">
                            Menú de informes
                        </router-link>
                    </div> >
                    <div class="col">
                        <a class="text-dark" href="#">Fichas de calificaciones</a>
                    </div>
                </div>
            </div>
            <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
            </p>

            <div class="row">
                <div class="col-10">
                    <div class="row">
                        <div class="col-2">
                            <input @change="ConsultarFichasNuevamente" v-model="CheckboxMostrarTodo" type="checkbox"
                                class="form-check-input" id="checkRegistro">
                            <label class="form-check-label" for="flexCheckDefault">
                                Mostrar todo
                            </label>
                        </div>
                    </div>

                    <div class="row mt-1">

                        <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label">Fecha Inicio</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>
                                <input autofocus id="fechaRegistro" required type="date"
                                    v-model="formRangoFecha.fechaIncio" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label">Fecha Fin</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>
                                <input autofocus id="fechaRegistro" required type="date"
                                    v-model="formRangoFecha.fechaFin" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label text-light">.</label>
                            <div class="input-group">
                                <button @click="getFichasPorRangoFecha" class="btn btn-primary">Buscar</button>

                            </div>
                        </div>


                    </div>

                </div>
                <div class="col-2 text-end">
                    <div class="text-light mb-3" v-if="authStore.exportarModRegistro">
                        <button type="button" class="btn btn-success btn-sm " @click="exportarExcel"><i
                                class="fa-solid fa-file-excel"></i>
                            Excel</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF"><i
                                class="fa-solid fa-file-pdf"></i>
                            PDF</button>
                    </div>
                </div>
            </div>



            <div class="row justify-content-between ">
                <div class="col-8">
                    <input class="form-control" autofocus id="codigoFichaCalificacion" v-model="filtro"
                        @input="buscarfichasCalificaciones" type="text" :placeholder="tipoBusqueda">
                </div>
                <div class="col-2">
                    <select v-model="tipoFiltro" class="form-select" aria-label="Default select example">
                        <option selected disabled>Filtrar por:</option>
                        <option value="estudiante">Nombre</option>
                        <option value="apellidoEstudiante">Apellido</option>
                        <option value="establecimiento">Establecimiento</option>
                        <option value="nivelAcademico">Nivel Académico</option>
                        <option value="carrera">Carrera</option>
                        <option value="modalidadEstudio">Modalidad</option>
                        <option value="estatus">Estado</option>
                    </select>
                </div>
                <div class="col-2">
                    <input v-model="mostrarTodasLasfichasCalificaciones" type="checkbox" class="form-check-input"
                        id="checkRegistro">
                    <label class="form-check-label" for="flexCheckDefault">
                        Mostrar A/I
                    </label>
                </div>

            </div>
            <v-card>
                <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="me-2" size="small">
                            <router-link :to="{ path: '/informationcard/' + item.codigoFichaCalificacion }">
                                <i class="fa-solid fa-eye text-dark"></i>
                            </router-link>
                        </v-icon>
                     
                    </template>
                </v-data-table>
            </v-card>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useImageStore } from '../../stores/imageStore'
import axios from 'axios'
import Swal from 'sweetalert2';
const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;


const deshabilitarComponentes = ref(false);
const CheckboxMostrarTodo = ref(true);
const ConsultarFichasNuevamente = () => {
    if (CheckboxMostrarTodo.value) {
        getFichasCalificaciones();
    }
}

const formRangoFecha = ref({
    fechaIncio: "",
    fechaFin: ""
})


onMounted(() => {
    getFichasCalificaciones()
})

//GET fichasCalificaciones
//#region GET fichasCalificaciones
const fichasCalificaciones = ref([])
const fichasCalificacionesActivas = ref([]);
const fichasCalificacionesSeleccionadas = ref([]);
const mostrarTodasLasfichasCalificaciones = ref(false);

const getFichasCalificaciones = async () => {
    try {
        deshabilitarComponentes.value = true;
        const response = await axios.get(`/api/FichaCalificacion/selectall`)
        fichasCalificaciones.value = response.data.map(expense => ({
            ...expense,
            cicloEscolar: formatFecha(expense.cicloEscolar) // Formatea la fecha
        }))


        fichasCalificacionesActivas.value = fichasCalificaciones.value.filter(ficha => ficha.estatus.trim().toUpperCase() === "A");

        if (mostrarTodasLasfichasCalificaciones.value) {
            fichasCalificacionesSeleccionadas.value = fichasCalificaciones.value;
        } else {
            fichasCalificacionesSeleccionadas.value = fichasCalificacionesActivas.value;
        }

        mapeoDeDato(fichasCalificacionesSeleccionadas.value);
        deshabilitarComponentes.value = false;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la lista de fichas de calificaciones.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
        deshabilitarComponentes.value = false;
    }
}

const getFichasPorRangoFecha = async () => {
    try {

        if (!formRangoFecha.value.fechaIncio || !formRangoFecha.value.fechaFin) {
            return Swal.fire({
                title: '¡Campos vacíos!',
                text: `Por favor, complete los campos primero.`,
                icon: 'warning',
            });
        }

        if (formRangoFecha.value.fechaIncio >= formRangoFecha.value.fechaFin) {
            return Swal.fire({
                title: '¡Error!',
                text: `El rango de fechas es inválido.`,
                icon: 'error',
            });
        }

        deshabilitarComponentes.value = true;
        CheckboxMostrarTodo.value = false;
        const response = await axios.get('/api/FichaCalificacion/buscarPorRangoFecha', {
            params: {
                fechaInicio: formRangoFecha.value.fechaIncio,
                fechaFin: formRangoFecha.value.fechaFin
            }
        });
        fichasCalificaciones.value = response.data.map(expense => ({
            ...expense,
            cicloEscolar: formatFecha(expense.cicloEscolar) // Formatea la fecha
        }))


        fichasCalificacionesActivas.value = fichasCalificaciones.value.filter(ficha => ficha.estatus.trim().toUpperCase() === "A");

        if (mostrarTodasLasfichasCalificaciones.value) {
            fichasCalificacionesSeleccionadas.value = fichasCalificaciones.value;
        } else {
            fichasCalificacionesSeleccionadas.value = fichasCalificacionesActivas.value;
        }

        mapeoDeDato(fichasCalificacionesSeleccionadas.value);
        deshabilitarComponentes.value = false;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la lista de fichas de calificaciones.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });

        deshabilitarComponentes.value = false;
    }
}
//#endregion

const mapeoDeDato = (datos) => {
    resultadoFiltrado.value = datos.map((fichaCalificacion, index) => ({
        'indice': index + 1,
        'codigoBecario': fichaCalificacion.codigoBecario,
        'codigoFichaCalificacion': fichaCalificacion.codigoFichaCalificacion,
        'nombreEstudiante': fichaCalificacion.estudiante,
        'apellidoEstudiante': fichaCalificacion.apellidoEstudiante,
        'nivelAcademico': fichaCalificacion.nivelAcademico,
        'grado': fichaCalificacion.grado,
        'carrera': fichaCalificacion.carrera,
        'establecimiento': fichaCalificacion.establecimiento,
        'modalidadEstudio': fichaCalificacion.modalidadEstudio,
        'cicloEscolar': fichaCalificacion.cicloEscolar,
        'estatus': fichaCalificacion.estatus
    }));
}


// Función para formatear la fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    return year.toString();
}


//#region DATOS de la tabla
const headers = [
    { title: '#', key: 'indice' },
    { title: 'Nombre', key: 'nombreEstudiante' },
    { title: 'Apellido', key: 'apellidoEstudiante' },
    { title: 'Nivel Académico', key: 'nivelAcademico' },
    { title: 'Grado', key: 'grado' },
    { title: 'Carrera', key: 'carrera' },
    { title: 'Establecimiento', key: 'establecimiento' },
    { title: 'Modalidad', key: 'modalidadEstudio' },
    { title: 'Ciclo Escolar', key: 'cicloEscolar' },
    { title: 'Estado', key: 'estatus' },
    { title: 'Acción', key: 'actions', sortable: false },
]
//#endregion


//#region Método del FILTRO de datos
const tipoBusqueda = ref('Buscar estudiante')
const filtro = ref('');
const resultadoFiltrado = ref([]);
const tipoFiltro = ref('estudiante');

//Metodo del filtro de datos en la tabla
const buscarfichasCalificaciones = () => {
    const textoBusqueda = filtro.value.toLowerCase().trim();
    let datosFiltrados;// Por defecto, usa todos los establecimientos

    if (textoBusqueda !== '') {
        datosFiltrados = fichasCalificacionesSeleccionadas.value.filter(ficha => {
            const campoFiltro = ficha[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
            return campoFiltro?.includes(textoBusqueda);
        });

        mapeoDeDato(datosFiltrados);
    }
    else {
        mapeoDeDato(fichasCalificacionesSeleccionadas.value);
    }
}
watch(mostrarTodasLasfichasCalificaciones, (newValue) => {
    if (!newValue) {
        //checkbox deshabilitado
        fichasCalificacionesSeleccionadas.value = fichasCalificacionesActivas.value;
    } else {
        //checkbox habilitado
        fichasCalificacionesSeleccionadas.value = fichasCalificaciones.value;
    }
    mapeoDeDato(fichasCalificacionesSeleccionadas.value);
});
//#endregion

//#region Método del PDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const exportarPDF = () => {
    descargarPDF(resultadoFiltrado.value);
}

const descargarPDF = async (datos) => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    // Agregar imagen
    // Función para cargar una imagen desde una URL
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            };
            img.src = url;
        });
    }
    // URL de la imagen alojada en Internet


    const logoAsociacion = imagenLogoAsociacion;
    const imgData = logoAsociacion;

    const imagenFondoQuchooch = imagenFondoAsociacion;
    doc.addImage(imagenFondoQuchooch, 'JPEG', 0, 0, 442, 200);

    doc.addImage(imgData, 'JPEG', 5, 1, 15, 15);

    // Configurar el color y la fuente para el texto
    doc.setTextColor(255, 255, 255); // Color blanco
    doc.setFont('times', 'bold');    // Fuente Times New Roman o equivalente
    doc.setFontSize(12);
    doc.text("FICHAS DE CALIFICACIONES", 76, 7);
    doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);



    // Encabezados de la tabla
    const headerPDF = ['#',
        'Nombre',
        'Apellido',
        'Nivel Académico',
        'Grado',
        'Carrera',
        'Establecimiento',
        'Modalidad',
        'Ciclo Escolar'
    ];

    // Datos de la tabla
    const data = datos.map((fichaCalificacion, index) => [index + 1,
    fichaCalificacion.nombreEstudiante,
    fichaCalificacion.apellidoEstudiante,
    fichaCalificacion.nivelAcademico,
    fichaCalificacion.grado,
    fichaCalificacion.carrera,
    fichaCalificacion.establecimiento,
    fichaCalificacion.modalidadEstudio,
    fichaCalificacion.cicloEscolar
    ]);

    // Estilos para el encabezado de la tabla
    const headerStyles = {
        fillColor: '#909909', // Color de fondo
        textColor: '#FFFFFF', // Color del texto
        fontStyle: 'bold' // Estilo del texto
    };
    // Crear la tabla en el PDF
    doc.autoTable({
        head: [headerPDF],
        body: data,
        startY: 20, // Posición inicial en Y para la tabla
        headStyles: headerStyles // Aplicar estilos al encabezado
    });

    // Guardar el documento como un archivo PDF
    doc.save("ReporteFichasDeCalificaciones.pdf");
}
//#endregion

//#region Metodo de EXCEL
//Metodo de exportar EXCEL
import * as XLSX from 'xlsx';

const exportarExcel = () => {
    const datos = resultadoFiltrado.value;

    // Mapeo de datos con nombres de columnas
    const data = datos.map((fichaCalificacion, index) => ({
        'indice': index + 1,
        'codigo Becario': fichaCalificacion.codigoBecario,
        'Nombre': fichaCalificacion.nombreEstudiante,
        'Apellido': fichaCalificacion.apellidoEstudiante,
        'Nivel Académico': fichaCalificacion.nivelAcademico,
        'Grado': fichaCalificacion.grado,
        'Carrera': fichaCalificacion.carrera,
        'Establecimiento': fichaCalificacion.establecimiento,
        'Modalidad': fichaCalificacion.modalidadEstudio,
        'Ciclo Escolar': fichaCalificacion.cicloEscolar
    }));

    // Crear una nueva hoja de cálculo de Excel
    const workbook = XLSX.utils.book_new();
    // Convertir los datos a una hoja de cálculo de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ficha de calificaciones');
    // Crear un archivo de datos binarios de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Convertir el archivo binario en un Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Crear una URL para el Blob
    const url = window.URL.createObjectURL(blob);
    // Crear un enlace invisible para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporteFichasDeCalificaciones.xlsx';
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
    // Liberar la URL del Blob
    window.URL.revokeObjectURL(url);
};
//#endregion


</script>
