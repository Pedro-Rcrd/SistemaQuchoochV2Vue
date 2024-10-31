<template>
  <div class="row justify-content-center">
    <div class="row col-11">
      <h3>Información de la compra</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/purchasesmenu' }"> Menú de compras </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/purchases' }"> Compras </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Información</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
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
                  <h5>Detalles de la compra</h5>
                </div>
                <div class="col-1 text-end">
                  <i
                    @click="exportarPDF"
                    style="font-size: 24px"
                    class="fas fa-circle-down mr-1"
                    v-show="ocultarElementos"
                  ></i>
                  <i
                    @click="exportarPDFCompraAutorizada"
                    style="font-size: 24px"
                    class="fas fa-circle-check"
                    v-show="ocultarElementos"
                  ></i>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <p class="m-0">
                    Número de orden: <strong>{{ codigoOrdenCompra }}</strong>
                  </p>
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
                    Estado:
                    <strong>{{ estado === "A" ? "Activo" : "Finalizado" }}</strong>
                  </p>
                  <p>
                    fecha de entrega del comprobante:
                    <strong>{{ fechaRecibirComprobante }}</strong>
                  </p>
                </div>
              </div>
            </div>
            <!--encabezado-->
          </div>

          <div class="row justify-content-center text-center mt-3">
            <div class="row">
              <h4>
                <i
                  @click="exportarExcel"
                  v-show="ocultarElementos"
                  style="font-size: 20px"
                  class="fas fa-file-excel text-success"
                ></i>
                Información de los productos
              </h4>
            </div>

            <hr />
            <div class="col-md-10 mb-1">
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
        </div>
        <!--card body-->
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
                  <i
                    @click="exportarImagenesPDF"
                    style="font-size: 24px"
                    v-show="ocultarElementos"
                    class="fas fa-circle-down"
                  ></i>
                </div>
              </div>
              <div class="row p-1">
                <div class="card m-2 p-2" style="width: 18rem">
                  <img
                    style="max-width: 270px; max-height: 270px"
                    :src="imgEstudiante"
                    class="card-img-top"
                    alt="Imagen del estudiante"
                  />
                  <div class="card-body">
                    <div class="row text-end">
                      <div class="col-12 text-end">
                        <i
                          v-show="ocultarElementos"
                          @click="abrirImagenEnNuevaVentana(imgEstudiante)"
                          class="fas fa-circle-plus text-primary"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card m-2 p-2"
                  style="width: 18rem"
                  v-if="imgCheque && imgCheque.length > 60"
                >
                  <img
                    style="max-width: 270px; max-height: 270px"
                    :src="imgCheque"
                    class="card-img-top"
                    alt="Imagen de la ficha escolar"
                  />
                  <div class="card-body">
                    <div class="row text-end">
                      <div class="col-12 text-end">
                        <i
                          v-show="ocultarElementos"
                          @click="abrirImagenEnNuevaVentana(imgCheque)"
                          class="fas fa-circle-plus text-primary"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!--otra tarjeta-->
                <div
                  class="card m-2 p-2"
                  style="width: 18rem"
                  v-if="imgComprobante && imgComprobante.length > 60"
                >
                  <img
                    style="max-width: 270px; max-height: 270px"
                    :src="imgComprobante"
                    class="card-img-top"
                    alt="Imagen de la carta"
                  />
                  <div class="card-body">
                    <div class="row text-end">
                      <div class="col-12 text-end">
                        <i
                          v-show="ocultarElementos"
                          @click="abrirImagenEnNuevaVentana(imgComprobante)"
                          class="fas fa-circle-plus text-primary"
                        ></i>
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import { useImageStore } from "../../stores/imageStore";

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const ocultarElementos = ref(true);

//Datos del gasto
const codigoOrdenCompra = ref(0);
const idEstudiante = ref(0);
const codigoBecario = ref("");
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const fechaEntrega = ref("");
const titulo = ref("");
const estado = ref("A");
const monto = ref(0.0);
const personaRecibe = ref("Estudiante");
const descripcion = ref("");
const fechaRecibirComprobante = ref("");
const imgEstudiante = ref("./../../public/fotoPerfilEstudiante.png");
const proveedor = ref("");
//Fina campos de estudiante

const parametro = route.params.codigoOrdenCompra;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const deshabilitarComponentes = ref(false);
const getCompra = async () => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.get(`/api/compra/ficha/${parametro}`);
    codigoOrdenCompra.value = response.data.codigoOrdenCompra;
    idEstudiante.value = response.data.codigoEstudiante;
    nombreEstudiante.value = response.data.estudiante;
    apellidoEstudiante.value = response.data.apellidoEstudiante;
    codigoBecario.value = response.data.codigoBecario;
    fechaEntrega.value = formatFecha(response.data.fechaCreacion);
    titulo.value = response.data.titulo;
    estado.value = response.data.estado;
    proveedor.value = response.data.proveedor;
    personaRecibe.value = response.data.personaRecibe;
    fechaRecibirComprobante.value =
      response.data.fechaEntrega !== null ? formatFecha(response.data.fechaEntrega) : "";
    monto.value = response.data.total;
    imgEstudiante.value = response.data.imgEstudiante;
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la información de la compra.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    deshabilitarComponentes.value = false;
  }
};
const listaProductos = ref("");
const getListaProductos = async () => {
  try {
    const response = await axios.get(`/api/compra/listaProductos/${parametro}`);
    listaProductos.value = response.data.filter(
      (a) => a.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los productos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

onMounted(async () => {
  getListaProductos();
  getCompra();
});

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportarPDFCompraAutorizada = () => {
  descargarPDF(listaProductos.value);
};

const descargarPDF = async (datos) => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen
  // Función para cargar una imagen desde una URL

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 447, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("ORDEN DE COMPRA", 85, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  //Información encabezado
  doc.setTextColor(0, 0, 0); // Negro
  doc.setFont("times", "normal"); // Sin negrita
  doc.setFontSize(12); // Ajustar tamaño si es necesario
  doc.text(`Número de orden: ${codigoOrdenCompra.value}`, 15, 23);
  doc.text(`Fecha: ${fechaEntrega.value}`, 15, 28);
  doc.text(`Código: ${codigoBecario.value}`, 15, 33);
  doc.text(`Nombre (s): ${nombreEstudiante.value}`, 15, 38);
  doc.text(`Apellidos: ${apellidoEstudiante.value}`, 15, 43);
  doc.text(`Proveedor: ${proveedor.value}`, 15, 48);

  // Encabezados de la tabla
  const headerPDF = ["#", "Producto", "Cantidad", "Precio"];

  // Datos de la tabla
  const data = datos.map((compra, index) => [
    index + 1,
    compra.nombreProducto,
    compra.cantidad,
    compra.precio,
  ]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: "#909909", // Color de fondo
    textColor: "#FFFFFF", // Color del texto
    fontStyle: "bold", // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headerPDF],
    body: data,
    startY: 55, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  const finalY = doc.autoTable.previous.finalY + 10; //Obtener la ultima posicion de la tabla
  doc.setTextColor(0, 0, 0); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);

  agregarTextoConLinea(doc, "AUTORIZADO", 90, finalY);

  // Guardar el documento como un archivo PDF
  doc.save("ReporteCompras.pdf");
};

// Función para agregar texto con una línea debajo
const agregarTextoConLinea = (doc, texto, x, y) => {
  doc.text(texto, x, y);
  const textoAncho = doc.getTextWidth(texto); // Ancho del texto
  doc.line(x, y + 1, x + textoAncho, y + 1); // Línea debajo del texto
};

//#endregion

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.5,
    filename: "Informacion.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

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
};

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = listaProductos.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    indice: index + 1,
    Nombre: a.nombreProducto,
    Cantidad: a.cantidad,
    Precio: a.precio,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
  // Crear un archivo de datos binarios de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  // Convertir el archivo binario en un Blob
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  // Crear una URL para el Blob
  const url = window.URL.createObjectURL(blob);
  // Crear un enlace invisible para descargar el archivo
  const link = document.createElement("a");
  link.href = url;
  link.download = "Productos.xlsx";
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
