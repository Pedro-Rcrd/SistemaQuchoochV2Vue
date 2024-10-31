<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Compras</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de informes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Compras</a>
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
              <input
                @change="ConsultarComprasNuevamente"
                v-model="CheckboxMostrarTodo"
                type="checkbox"
                class="form-check-input"
                id="checkRegistro"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Mostrar todo
              </label>
            </div>
          </div>

          <div class="row mt-1">
            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label"
                >Fecha Inicio</label
              >
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  autofocus
                  id="fechaRegistro"
                  required
                  type="date"
                  v-model="formRangoFecha.fechaIncio"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label">Fecha Fin</label>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  autofocus
                  id="fechaRegistro"
                  required
                  type="date"
                  v-model="formRangoFecha.fechaFin"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-4">
              <label for="exampleFormControlInput1" class="form-label text-light"
                >.</label
              >
              <div class="input-group">
                <button @click="getComprasPorRangoFecha" class="btn btn-primary">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 text-end">
          <div class="text-light mb-3" v-if="authStore.exportarModCompra">
            <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
              <i class="fa-solid fa-file-excel"></i> Excel
            </button>
            <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
              <i class="fa-solid fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-8">
          <input
            class="form-control"
            autofocus
            id="codigoFichaCalificacion"
            v-model="filtro"
            @input="buscarCompras"
            type="text"
            :placeholder="tipoBusqueda"
          />
        </div>
        <div class="col-2">
          <select
            v-model="tipoFiltro"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected disabled>Filtrar por:</option>
            <option value="estudiante">Nombre</option>
            <option value="apellidoEstudiante">Apelllido</option>
            <option value="titulo">Título</option>
            <option value="proveedor">Proveedor</option>
            <option value="estado">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodasLasCompras"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
          />
          <label class="form-check-label" for="flexCheckDefault"> Mostrar A/F </label>
        </div>
      </div>
      <v-card>
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small">
              <router-link :to="{ path: '/informationpurchase/' + item.codigoCompra }">
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
import { ref, onMounted, nextTick, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useImageStore } from "../../stores/imageStore";
import axios from "axios";
import Swal from "sweetalert2";
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const deshabilitarComponentes = ref(false);
const CheckboxMostrarTodo = ref(true);
const ConsultarComprasNuevamente = () => {
  if (CheckboxMostrarTodo.value) {
    getCompras();
  }
};

const formRangoFecha = ref({
  fechaIncio: "",
  fechaFin: "",
});

onMounted(() => {
  getCompras();
});

//#region DATOS de la tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreEstudiante" },
  { title: "Apellido", key: "apellidoEstudiante" },
  { title: "Título", key: "titulo" },
  { title: "Total", key: "total" },
  { title: "Proveedor", key: "proveedor" },
  { title: "Número de orden", key: "codigoCompra" },
  { title: "Fecha de registro", key: "fechaRegistro" },
  { title: "Estado", key: "estado" },
  { title: "Acción", key: "actions", sortable: false },
];
//#endregion

//#region GET ficha de calificaciones
const compras = ref([]);
const resultadoFiltrado = ref([]);
const comprasSeleccionadas = ref();
const comprasActivas = ref();
const mostrarTodasLasCompras = ref(false);
const getCompras = async () => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.get(`/api/Compra/selectAll`);
    compras.value = response.data.map((expense) => ({
      ...expense,
      fechaCreacion: formatFecha(expense.fechaCreacion), // Formatea la fecha
      fechaEntrega: formatFecha(expense.fechaEntrega), // Formatea la fecha
    }));
    comprasActivas.value = compras.value.filter(
      (a) => a.estado.trim().toUpperCase() === "A"
    );

    if (mostrarTodasLasCompras.value) {
      comprasSeleccionadas.value = gastos.value;
    } else {
      comprasSeleccionadas.value = comprasActivas.value;
    }

    mapeoDeDato(comprasSeleccionadas.value);
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de las compras.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    deshabilitarComponentes.value = false;
  }
};

const getComprasPorRangoFecha = async () => {
  try {
    if (!formRangoFecha.value.fechaIncio || !formRangoFecha.value.fechaFin) {
      return Swal.fire({
        title: "¡Campos vacíos!",
        text: `Por favor, complete los campos de fechas.`,
        icon: "warning",
      });
    }

    if (formRangoFecha.value.fechaIncio >= formRangoFecha.value.fechaFin) {
      return Swal.fire({
        title: "¡Error!",
        text: `El rango de fechas es inválido.`,
        icon: "error",
      });
    }

    deshabilitarComponentes.value = true;
    CheckboxMostrarTodo.value = false;
    const response = await axios.get("/api/Compra/buscarPorRangoFecha", {
      params: {
        fechaInicio: formRangoFecha.value.fechaIncio,
        fechaFin: formRangoFecha.value.fechaFin,
      },
    });

    compras.value = response.data.map((expense) => ({
      ...expense,
      fechaCreacion: formatFecha(expense.fechaCreacion), // Formatea la fecha
      fechaEntrega: formatFecha(expense.fechaEntrega), // Formatea la fecha
    }));
    comprasActivas.value = compras.value.filter(
      (a) => a.estado.trim().toUpperCase() === "A"
    );

    if (mostrarTodasLasCompras.value) {
      comprasSeleccionadas.value = gastos.value;
    } else {
      comprasSeleccionadas.value = comprasActivas.value;
    }

    mapeoDeDato(comprasSeleccionadas.value);

    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de las compras.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    deshabilitarComponentes.value = false;
  }
};

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((compra, index) => ({
    indice: index + 1,
    codigoCompra: compra.codigoOrdenCompra,
    codigoBecario: compra.codigoBecario,
    nombreEstudiante: compra.estudiante,
    apellidoEstudiante: compra.apellidoEstudiante,
    titulo: compra.titulo,
    total: compra.total,
    proveedor: compra.proveedor,
    descripcion: compra.descripcion,
    fechaRegistro: compra.fechaCreacion,
    fechaEntrega: compra.fechaEntrega,
    estado: compra.estado,
  }));
};

// Función para formatear la fecha
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar estudiante");
const filtro = ref("");
const tipoFiltro = ref("estudiante");

//Metodo del filtro de datos en la tabla
const buscarCompras = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los establecimientos

  if (textoBusqueda !== "") {
    datosFiltrados = comprasSeleccionadas.value.filter((a) => {
      const campoFiltro = a[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(comprasSeleccionadas.value);
  }
};

//mostrar todos los gastos
watch(mostrarTodasLasCompras, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    comprasSeleccionadas.value = comprasActivas.value;
  } else {
    //checkbox habilitado
    comprasSeleccionadas.value = compras.value;
  }
  mapeoDeDato(comprasSeleccionadas.value);
});
//#endregion

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportarPDF = () => {
  descargarPDF(resultadoFiltrado.value);
  console.log(resultadoFiltrado.value);
};

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
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 442, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("LISTADO DE COMPRAS", 82, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headerPDF = [
    "#",
    "Código",
    "Nombre",
    "Apellido",
    "Titulo",
    "Total",
    "Proveedor",
    "Número de orden",
    "Fecha de Registro",
  ];

  // Datos de la tabla
  const data = datos.map((compra, index) => [
    index + 1,
    compra.codigoBecario,
    compra.nombreEstudiante,
    compra.apellidoEstudiante,
    compra.titulo,
    compra.total,
    compra.proveedor,
    compra.codigoCompra,
    compra.fechaRegistro,
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
    startY: 20, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("ReporteCompras.pdf");
};
//#endregion

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((compra, index) => ({
    indice: index + 1,
    "Código Becario": compra.codigoBecario,
    Nombre: compra.nombreEstudiante,
    Apellido: compra.apellidoEstudiante,
    Título: compra.titulo,
    Total: compra.total,
    Proveedor: compra.proveedor,
    Descripcion: compra.descripcion,
    "Número de orden": compra.codigoCompra,
    "Fecha de Registro": compra.fechaRegistro,
    "Fecha de Entrega del Comprobante": compra.fechaEntrega,
    Estado: compra.estado,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");
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
  link.download = "reporteCompras.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>
