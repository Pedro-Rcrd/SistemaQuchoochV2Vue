<template>
    <div class="row justify-content-center">
        <div class="row col-12">
            <h2>Patrocinadores</h2>
            <hr>
            <div class="container text-center mb-4">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/registermenu' }">
                            Menú de registros
                        </router-link>
                    </div> >
                    <div class="col">
                        <a class="text-dark" href="#">Patrocinadores</a>
                    </div>
                </div>
            </div>
            <div class="text-light mb-3" v-if="authStore.exportarModRegistro">
                <button type="button" class="btn btn-success btn-sm " @click="exportarExcel"><i
                        class="fa-solid fa-file-excel"></i> Excel</button>
                <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF"><i
                        class="fa-solid fa-file-pdf"></i>
                    PDF</button>
            </div>
            <div class="row justify-content-between ">
                <div class="col-6">
                    <input class="form-control" autofocus id="codigoPatrocinador" v-model="filtro"
                        @input="buscarPatrocinadores" type="text" :placeholder="tipoBusqueda">
                </div>
                <div class="col-2">
                    <select v-model="tipoFiltro" class="form-select" aria-label="Patrocinadores">
                        <option selected>Filtrar por:</option>
                        <option value="nombrePatrocinador">Nombre</option>
                        <option value="apellidoPatrocinador">Apellido</option>
                        <option value="nombrePais">País</option>
                        <option value="profesion">Profesion</option>
                    </select>
                </div>
                <div class="col-2">
                    <input v-model="mostrarTodosLosPatrocinadores" type="checkbox" class="form-check-input"
                        id="checkRegistro">
                    <label class="form-check-label" for="flexCheckDefault">
                        Mostrar todo
                    </label>
                </div>
                <div class="col-2">
                    <div class="text-end">
                        <router-link :to="{ path: '/createsponsor' }" class="btn btn-primary mb-3" v-if="authStore.crearModRegistro">
                            <i class="fa-solid fa-circle-plus"></i> Nuevo
                        </router-link>
                    </div>

                </div>
            </div>
            <v-card>
                <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="me-2" size="small">
                            <router-link :to="{ path: '/informationSponsor/' + item.codigoPatrocinador }">
                                <i class="fa-solid fa-eye text-dark"></i>
                            </router-link>
                        </v-icon>
                        <v-icon size="small" v-if="authStore.modificarModRegistro">
                            <router-link :to="{ path: '/editsponsor/' + item.codigoPatrocinador }">
                                <i class="fa-solid fa-edit text-dark"></i>
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
import axios from 'axios'
import Swal from 'sweetalert2';
import { useImageStore } from '../../stores/imageStore'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;


onMounted(() => {
    getPatrocinadores()
})

//#region Datos de la tabla

const headers = [
    { title: '#', key: 'indice' },
    { title: 'Nombre', key: 'nombrePatrocinador' },
    { title: 'Apellido', key: 'apellidoPatrocinador' },
    { title: 'Pais', key: 'nombrePais' },
    { title: 'Profesion', key: 'profesion' },
    { title: 'Fecha de registro', key: 'fechaRegistro' },
    { title: 'Estado', key: 'estatus' },
    { title: 'Acción', key: 'actions', sortable: false },
]

//#endregion

//#region  GET patrocinadores
const patrocinadores = ref([]);
const resultadoFiltrado = ref([]);
const patrocinadoresSeleccionados = ref();
const patrocinadoresActivos = ref();
const mostrarTodosLosPatrocinadores = ref(false);
const getPatrocinadores = async () => {
    try {
        const response = await axios.get(`/api/patrocinador/selectAll`)
        patrocinadores.value = response.data.map(expense => ({
            ...expense,
            fechaRegistro: formatFecha(expense.fechaCreacion) // Formatea la fecha
        }));
        patrocinadoresActivos.value = patrocinadores.value.filter(a => a.estado.trim().toUpperCase() === "A");

        if (mostrarTodosLosPatrocinadores.value) {
            patrocinadoresSeleccionados.value = patrocinadores.value;
        } else {
            patrocinadoresSeleccionados.value = patrocinadoresActivos.value;
        }

        mapeoDeDato(patrocinadoresSeleccionados.value);

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la lista de los patrocinadores.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
}

const mapeoDeDato = (datos) => {
    resultadoFiltrado.value = datos.map((patrocinador, index) => ({
            'indice': index + 1,
            'codigoPatrocinador': patrocinador.codigoPatrocinador,
            'nombrePatrocinador': patrocinador.nombrePatrocinador,
            'apellidoPatrocinador': patrocinador.apellidoPatrocinador,
            'nombrePais': patrocinador.nombrePais,
            'profesion': patrocinador.profesion,
            'fechaRegistro': patrocinador.fechaRegistro,
            'estatus': patrocinador.estado
        }));
}



// Función para formatear la fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}
//#endregion
//#region Método del FILTRO de datos
const tipoBusqueda = ref('Buscar patrocinador')
const filtro = ref('');
const tipoFiltro = ref('nombrePatrocinador');

//Metodo del filtro de datos en la tabla
const buscarPatrocinadores = () => {
    const textoBusqueda = filtro.value.toLowerCase().trim();
    let datosFiltrados;// Por defecto, usa todos los establecimientos

    if (textoBusqueda !== '') {
        datosFiltrados = patrocinadoresSeleccionados.value.filter(patrocinador => {
            const campoFiltro = patrocinador[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
            return campoFiltro?.includes(textoBusqueda);
        });

        mapeoDeDato(datosFiltrados);
    }
    else {
        mapeoDeDato(patrocinadoresSeleccionados.value);
    }
}

watch(mostrarTodosLosPatrocinadores, (newValue) => {
    if (!newValue) {
        //checkbox deshabilitado
        patrocinadoresSeleccionados.value = patrocinadoresActivos.value;
    } else {
        //checkbox habilitado
        patrocinadoresSeleccionados.value = patrocinadores.value;
    }
    mapeoDeDato(patrocinadoresSeleccionados.value);
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
  
     
    const logoAsociacion = imagenLogoAsociacion;
    const imgData = logoAsociacion;

    const imagenFondoQuchooch = imagenFondoAsociacion;
    doc.addImage(imagenFondoQuchooch, 'JPEG', 0, 0, 442, 200);

    doc.addImage(imgData, 'JPEG', 5, 1, 15, 15);

    // Configurar el color y la fuente para el texto
    doc.setTextColor(255, 255, 255); // Color blanco
    doc.setFont('times', 'bold');    // Fuente Times New Roman o equivalente
    doc.setFontSize(12);
    doc.text("PATROCINADORES", 87, 7);
    doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

    // Encabezados de la tabla
    const headerPDF = ['#',
        'Nombre',
        'Apellido',
        'Pais',
        'Profesion',
        'fecha de registro',
        'Estado'
    ];

    // Datos de la tabla
    const data = datos.map((patrocinador, index) => [
        index + 1,
        patrocinador.nombrePatrocinador,
        patrocinador.apellidoPatrocinador,
        patrocinador.nombrePais,
        patrocinador.profesion,
        patrocinador.fechaRegistro,
        patrocinador.estatus
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
    doc.save("ReportePatrocinadores.pdf");
}
//#endregion

//#region Metodo de EXCEL
import * as XLSX from 'xlsx';

const exportarExcel = () => {
    const datos = resultadoFiltrado.value;

    // Mapeo de datos con nombres de columnas
    const data = datos.map((patrocinador, index) => ({
            'indice': index + 1,
            'codigoPatrocinador': patrocinador.codigoPatrocinador,
            'nombrePatrocinador': patrocinador.nombrePatrocinador,
            'apellidoPatrocinador': patrocinador.apellidoPatrocinador,
            'nombrePais': patrocinador.nombrePais,
            'profesion': patrocinador.profesion,
            'fechaRegistro': patrocinador.fechaRegistro,
            'estatus': patrocinador.estatus
        }));

    // Crear una nueva hoja de cálculo de Excel
    const workbook = XLSX.utils.book_new();
    // Convertir los datos a una hoja de cálculo de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'patrocinadores');
    // Crear un archivo de datos binarios de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Convertir el archivo binario en un Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Crear una URL para el Blob
    const url = window.URL.createObjectURL(blob);
    // Crear un enlace invisible para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reportePatrocinadores.xlsx';
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
    // Liberar la URL del Blob
    window.URL.revokeObjectURL(url);
};
//#endregion

</script>