<template>
  <div class="row justify-content-center" v-if="authStore.moduloRegistro">
    <div class="row col-12">
      <h2>Gastos</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Gastos</a>
          </div>
        </div>
      </div>
      <div class="text-light mb-3" v-if="authStore.exportarModRegistro">
        <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
          <i class="fa-solid fa-file-excel"></i> Excel
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </button>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">
          <input
            class="form-control"
            autofocus
            id="codigoFichaCalificacion"
            v-model="filtro"
            @input="buscarGastos"
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
            <option selected>Filtrar por:</option>
            <option value="estudiante">Nombre</option>
            <option value="apellidoEstudiante">Apellido</option>
            <option value="titulo">Título</option>
            <option value="tipoPago">Tipo de pago</option>
            <option value="numeroCheque">Número del cheque</option>
            <option value="estado">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLosGastos"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
          />
          <label class="form-check-label" for="flexCheckDefault"> Mostrar todo </label>
        </div>
        <div class="col-2">
          <div class="text-end">
            <router-link
              :to="{ path: '/createexpense' }"
              class="btn btn-primary mb-3"
              v-if="authStore.crearModRegistro"
            >
              <i class="fa-solid fa-circle-plus"></i> Nuevo
            </router-link>
          </div>
        </div>
      </div>
      <v-card>
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <router-link
              :to="{ path: '/informationexpense/' + item.codigoGasto }"
              class="me-2"
            >
              <v-icon size="small">
                <i class="fa-solid fa-eye text-dark"></i>
              </v-icon>
            </router-link>
            <router-link
              v-if="authStore.modificarModRegistro"
              :to="{ path: '/editexpense/' + item.codigoGasto }"
            >
              <v-icon size="small">
                <i class="fa-solid fa-edit text-dark"></i>
              </v-icon>
            </router-link>
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
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

onMounted(() => {
  getGastos();
});

//#region GET ficha de calificaciones
const gastos = ref([]);
const resultadoFiltrado = ref([]);
const gastosSeleccionados = ref();
const gastosActivos = ref();
const mostrarTodosLosGastos = ref(false);
const getGastos = async () => {
  try {
    const response = await axios.get(`/api/gasto/selectAll`);
    gastos.value = response.data.map((expense) => ({
      ...expense,
      fechaEntrega: formatFecha(expense.fechaEntrega), // Formatea la fecha
      tipoPago:
        expense.tipoPago === "C"
          ? "Cheque"
          : expense.tipoPago === "E"
          ? "Efectivo"
          : expense.tipoPago,
    }));

    gastosActivos.value = gastos.value.filter(
      (a) => a.estado.trim().toUpperCase() === "A"
    );

    if (mostrarTodosLosGastos.value) {
      gastosSeleccionados.value = gastos.value;
    } else {
      gastosSeleccionados.value = gastosActivos.value;
    }

    mapeoDeDato(gastosSeleccionados.value);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los gastos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((a, index) => ({
    indice: index + 1,
    codigoBecario: a.codigoBecario,
    codigoGasto: a.codigoGasto,
    nombreEstudiante: a.nombreEstudiante,
    apellidoEstudiante: a.apellidoEstudiante,
    fechaRegistro: a.fechaEntrega,
    titulo: a.titulo,
    tipoPago: a.tipoPago,
    numeroCheque: a.numeroCheque,
    monto: a.monto,
    estado: a.estado,
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

//#region DATOS de la tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreEstudiante" },
  { title: "Apellido", key: "apellidoEstudiante" },
  { title: "Gasto", key: "titulo" },
  { title: "Tipo de Pago", key: "tipoPago" },
  { title: "Número del Cheque", key: "numeroCheque" },
  { title: "Monto", key: "monto" },
  { title: "Fecha de registro", key: "fechaRegistro" },
  { title: "Estado", key: "estado" },
  { title: "Acción", key: "actions", sortable: false },
];
//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar estudiante");
const filtro = ref("");
const tipoFiltro = ref("estudiante");

//Metodo del filtro de datos en la tabla
const buscarGastos = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los establecimientos

  if (textoBusqueda !== "") {
    datosFiltrados = gastosSeleccionados.value.filter((a) => {
      const campoFiltro = a[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(gastosSeleccionados.value);
  }
};

//mostrar todos los gastos
watch(mostrarTodosLosGastos, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    gastosSeleccionados.value = gastosActivos.value;
  } else {
    //checkbox habilitado
    gastosSeleccionados.value = gastos.value;
  }
  mapeoDeDato(gastosSeleccionados.value);
});
//#endregion

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportarPDF = () => {
  descargarPDF(resultadoFiltrado.value);
};

const descargarPDF = async (datos) => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen
  // Función para cargar una imagen desde una URL

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, "JPEG", 0, 0, 442, 200);

  doc.addImage(imgData, "JPEG", 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("LISTADO DE GASTOS", 84, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headerPDF = [
    "#",
    "Código",
    "Nombre",
    "Apellido",
    "Titulo",
    "Tipo de Pago",
    "Número del Cheque",
    "Monto",
    "Fecha de Registro",
  ];

  // Datos de la tabla
  const data = datos.map((gasto, index) => [
    index + 1,
    gasto.codigoBecario,
    gasto.nombreEstudiante,
    gasto.apellidoEstudiante,
    gasto.titulo,
    gasto.tipoPago,
    gasto.numeroCheque,
    gasto.monto,
    gasto.fechaRegistro,
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
  doc.save("ReporteGastos.pdf");
};
//#endregion

//#region Metodo de EXCEL
//Metodo de exportar EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((gasto, index) => ({
    indice: index + 1,
    "Código Becario": gasto.codigoBecario,
    "Nombre del Estudiante": gasto.nombreEstudiante,
    "Apellido del Estudiante": gasto.apellidoEstudiante,
    Titulo: gasto.titulo,
    "Tipo de Pago": gasto.tipoPago,
    "Número del Cheque": gasto.numeroCheque,
    Monto: gasto.monto,
    "Fecha de Registro": gasto.fechaRegistro,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");
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
  link.download = "reporteGastos.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>
