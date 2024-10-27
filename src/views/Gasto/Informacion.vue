<template>
    <div class="row justify-content-center">
        <div class="row col-11">
            <h3>Información del gasto</h3>
            <hr>
            <div class="container text-center mb-4 ">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/registermenu' }">
                            Menú de registros
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/expenses' }">
                            Gastos
                        </router-link>
                    </div>>
                    <div class="col">
                        <a class="text-dark" href="#">Información</a>
                    </div>
                </div>
            </div>
            <div class="card border pt-3" id="exportarElemento">

                <div class="card-body ">
                    <div class="row">
                        <p class="placeholder-glow" v-if="deshabilitarComponentes">
                            <span class="placeholder col-12 text-success"></span>
                        </p>

                        <div class="bg-light p-2">
                            <div class="row">
                                <p class="placeholder-glow" v-if="mostrarBarraLoading">
                                    <span class="placeholder col-12 text-success"></span>
                                </p>
                            </div>

                            <div class="row justify-content-between">
                                <div class="col-11">
                                    <h5>Detalles del gasto</h5>
                                </div>
                                <div class="col-1 text-end">
                                    <i @click="exportarPDF" style="font-size: 24px" class="fas fa-circle-down"
                                        v-show="ocultarElementos"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <p class="m-0">
                                        Título: <strong>{{ titulo }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Descripción: <strong>{{ descripcion }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Monto: <strong>{{ monto }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Tipo de pago: <strong>{{ tipoPago === 'F' ? 'Efectivo' : 'Cheque' }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Número del cheque: <strong>{{ numeroCheque }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Fecha de entrega: <strong>{{ fechaEntrega }}</strong>
                                    </p>
                                    <p>
                                        Persona quién recibió: <strong>{{ personaRecibe }}</strong>
                                    </p>
                                </div>
                                <div class="col-5">
                                    <p class="m-0">
                                        <strong>{{ nombreEstudiante }} {{ apellidoEstudiante }}</strong>
                                    </p>
                                    <p class="m-0">
                                        Código: <strong>{{ codigoBecario }}</strong>
                                    </p>

                                    <p class="m-0">
                                        Estado: <strong>{{ estado === 'A' ? 'Activo' : 'Finalizado' }}</strong>
                                    </p>
                                    <p>
                                        fecha de entrega del comprobante: <strong>{{ fechaRecibirComprobante }}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!--encabezado-->

                    </div>

                    <div class="row justify-content-center text-center mt-3">
                        <h4><i @click="exportarExcel" v-show="ocultarElementos" style="font-size: 20px;" class="fas fa-file-excel text-success"></i> Información de los productos</h4>
                        <hr>
                        <div class="col-md-10 mb-1  ">
                            <div class="table-container">
                                <table class="table table-scroll table-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="text-center">#</th>
                                            <th scope="col" class="text-center">Producto</th>
                                            <th scope="col" class="text-center">Cantidad</th>
                                            <th scope="col" class="text-center">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(producto, index) in listaProductos" :key="index">
                                            <th scope="row" class="text-center">{{ index + 1 }}</th>
                                            <td class="text-start">{{ producto.nombreProducto }}</td>
                                            <td class="text-center">{{ producto.cantidad }}</td>
                                            <td class="text-center">{{ producto.precio }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div> <!--card body-->



            </div>
            <!--otro parte-->
            <div class="card border pt-2" id="cajaImagenes">
                <div class="card-body">
                    <div class="row">
                        <div class="bg-light">
                            <div class="row justify-content-between pt-2">
                                <div class="col-11">
                                    <h5>Sección de fotografías</h5>
                                </div>
                                <div class="col-1 text-end">
                                    <i @click="exportarImagenesPDF" style="font-size: 24px;" v-show="ocultarElementos"
                                        class="fas fa-circle-down"></i>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="card m-2 p-2" style="width: 18rem">
                                    <img style="max-width: 270px; max-height: 270px;" :src="imgEstudiante"
                                        class="card-img-top" alt="Imagen del estudiante" />
                                    <div class="card-body ">
                                        <div class="row text-end">
                                            <div class="col-12 text-end">
                                                <i v-show="ocultarElementos"
                                                    @click="abrirImagenEnNuevaVentana(imgEstudiante)"
                                                    class="fas fa-circle-plus text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card m-2 p-2" style="width: 18rem"
                                    v-if="imgCheque && imgCheque.length > 60">
                                    <img style="max-width: 270px; max-height: 270px;"  :src="imgCheque"
                                        class="card-img-top" alt="Imagen de la ficha escolar" />
                                    <div class="card-body">
                                        <div class="row text-end">
                                            <div class="col-12 text-end">
                                                <i v-show="ocultarElementos"
                                                    @click="abrirImagenEnNuevaVentana(imgCheque)"
                                                    class="fas fa-circle-plus text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--otra tarjeta-->
                                <div class="card m-2 p-2" style="width: 18rem"
                                    v-if="imgComprobante && imgComprobante.length > 60">
                                    <img style="max-width: 270px; max-height: 270px;"  :src="imgComprobante"
                                        class="card-img-top" alt="Imagen de la carta" />
                                    <div class="card-body">
                                        <div class="row text-end">
                                            <div class="col-12 text-end">
                                                <i v-show="ocultarElementos"
                                                    @click="abrirImagenEnNuevaVentana(imgComprobante)"
                                                    class="fas fa-circle-plus text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
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
import html2pdf from "html2pdf.js"

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

const ocultarElementos = ref(true);

//Datos del gasto
const idEstudiante = ref(0);
const codigoBecario = ref("");
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const fechaEntrega = ref("")
const titulo = ref("");
const estado = ref("A");
const tipoPago = ref("C");
const numeroCheque = ref(0);
const monto = ref(0.00);
const personaRecibe = ref("Estudiante");
const descripcion = ref("");
const fechaRecibirComprobante = ref("");
const numeroComprobante = ref("");
const imgCheque = ref(null);
const imgComprobante = ref(null);
const imgEstudiante = ref("./../../public/fotoPerfilEstudiante.png");
const fechaRegistro = ref("");
//Fina campos de estudiante

const parametro = route.params.codigoGasto;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}
const deshabilitarComponentes = ref(false);
const getGasto = async () => {
    try {
        deshabilitarComponentes.value = true;
        const response = await axios.get(`/api/gasto/ficha/${parametro}`);
        idEstudiante.value = response.data.codigoEstudiante;
        codigoBecario.value = response.data.codigoBecario;
        nombreEstudiante.value = response.data.nombreEstudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        fechaEntrega.value = formatFecha(response.data.fechaEntrega);
        titulo.value = response.data.titulo;
        estado.value = response.data.estado;
        tipoPago.value = response.data.tipoPago;
        numeroCheque.value = response.data.numeroCheque;
        monto.value = response.data.monto;
        personaRecibe.value = response.data.personaRecibe;
        descripcion.value = response.data.descripcion;
        fechaRecibirComprobante.value = response.data.fechaRecibirComprobante != null ? formatFecha(response.data.fechaRecibirComprobante) : "";
        numeroComprobante.value = response.data.numeroComprobante;
        imgEstudiante.value = response.data.imgEstudiante;
        imgCheque.value = response.data.imgCheque;
        imgComprobante.value = response.data.imgComprobante;

        deshabilitarComponentes.value = false;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la información del gasto.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });

        deshabilitarComponentes.value = false;
    }
};
const listaProductos = ref();
const getListaProductos = async () => {
    try {
        const response = await axios.get(`/api/gasto/listaProductos/${parametro}`);
        listaProductos.value = response.data;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la lista de productos.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
};



onMounted(async () => {
    getListaProductos();
    getGasto();

});




//#region Método del PDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

//const exportarPDF = () => {
//  descargarPDF(resultadoFiltrado.value);
//}

const descargarPDF = async () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    // Agregar imagen
    // Función para cargar una imagen desde una URL
    const base64Img = await convertirImagenABase64(imgEstudiante.value);
    doc.addImage(base64Img, 'JPEG', 10, 10, 70, 70);
    // URL de la imagen alojada en Internet

    // Título del documento
    doc.setTextColor(255, 0, 0);
    doc.text("Reporte de Estudiantes", 10, 20);


    // Guardar el documento como un archivo PDF
    doc.save("ReporteEstudiantes.pdf");
}
//#endregion

const convertirImagenABase64 = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous'); // Para manejar CORS si es necesario
        img.src = url;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL); // Resolver la promesa con la URL en base64
        };

        img.onerror = (err) => {
            reject(err); // Rechazar la promesa si ocurre un error
        };
    });
};

const exportarPDF = async () => {
    ocultarElementos.value = false;
    var element = document.getElementById('exportarElemento');
    var opt = {
        margin: 0.5,
        filename: 'ficha.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    await html2pdf().from(element).set(opt).save();
    ocultarElementos.value = true;
}

//Exportar Imagenes
const exportarImagenesPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("cajaImagenes");
  var opt = {
    margin: 0.5,
    filename: "imagenes.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

const abrirImagenEnNuevaVentana = (urlImagen) => {
    // Usa window.open para abrir una nueva ventana con el enlace base64
    const nuevaVentana = window.open();

    // Escribe el contenido HTML en la nueva ventana, incluyendo la imagen base64
    nuevaVentana.document.write(`
        <html>
          <head><title>Imagen</title></head>
          <body>
            <img style="max-width: 400px; max-height: 400px;" src="${urlImagen}" alt="Imagen Base64"/>
          </body>
        </html>
      `);
}

//#region Metodo de EXCEL
import * as XLSX from 'xlsx';

const exportarExcel = () => {
    const datos = listaProductos.value;

    // Mapeo de datos con nombres de columnas
    const data = datos.map((a, index) => ({
            'indice': index + 1,
            'Nombre': a.nombreProducto,
            'Cantidad': a.cantidad,
            'Precio': a.precio,
        }));

    // Crear una nueva hoja de cálculo de Excel
    const workbook = XLSX.utils.book_new();
    // Convertir los datos a una hoja de cálculo de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
    // Crear un archivo de datos binarios de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Convertir el archivo binario en un Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Crear una URL para el Blob
    const url = window.URL.createObjectURL(blob);
    // Crear un enlace invisible para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Productos.xlsx';
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
    // Liberar la URL del Blob
    window.URL.revokeObjectURL(url);
};
//#endregion
</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 25px;
}

.marco {
    background-color: #768009;

}

.bordeMarco {
    border: 2px solid #768009;
}
</style>