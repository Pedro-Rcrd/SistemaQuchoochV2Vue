<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Lista de grados</h2>
      <hr />
      <!--Menún de navegación-->
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/settingcard' }">
              Menú de mantenimiento
            </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Grados</a>
          </div>
        </div>
      </div>
      <!--Fin de menu de navegación-->
      <!--Exportación-->
      <div class="text-light mb-3">
        <button type="button" class="btn btn-success btn-sm" @click="exportarExcel">
          <i class="fa-solid fa-file-excel"></i> Excel
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </button>
      </div>
      <!--Buscador-->
      <div class="row justify-content-between">
        <div class="col-6">
          <input
            class="form-control"
            autofocus
            id="codigoGrado"
            v-model="filtro"
            @input="buscarComunidad"
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
            <option disabled selected>Filtrar por:</option>
            <option value="nombreGrado">Nombre</option>
            <option value="estatus">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLosGrados"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
          />
          <label class="form-check-label" for="flexCheckDefault"> Mostrar todo </label>
        </div>
        <div class="col-2">
          <div class="text-end">
            <button
              class="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              @click="($event) => openModal(1)"
            >
              <i class="fa-solid fa-circle-plus"></i> Nuevo
            </button>
          </div>
        </div>
      </div>
      <!--Tabla-->
      <v-card>
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <v-icon
              class="me-2"
              size="small"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              @click="
                ($event) => openModal(2, item.codigoGrado, item.nombreGrado, item.estatus)
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
            </v-icon>
            <v-icon
              size="small"
              @click="($event) => confirmDelete(item.nombreGrado, item.codigoGrado)"
            >
              <i class="fa-solid fa-trash text-dark"></i>
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>

  <Modal :id="'modal'" :title="title">
    <div class="modal-body">
      <div class="row col-11">
        <form @submit.prevent="save">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="form.nombreGrado"
              placeholder="Grado"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-8">
              <select
                class="form-control form-select"
                id="codigoGrado"
                v-model="form.estatus"
              >
                <option value="" disabled selected>Selecciona el estado</option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </select>
            </div>
          </div>

          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Swal from "sweetalert2";

import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

//Cambiar idioma
//#region cambiar idima vuetify
import { useLocale } from "vuetify";
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}
// Llama a la función para cambiar al idioma español
changeLocale("es");
//#endregion

onMounted(() => {
  getGrados();
});

//Header de tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreGrado" },
  { title: "Estado", key: "estatus" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET grados
//#region GET grados
const grados = ref([]);
const gradosActivos = ref([]);
const gradosSeleccionados = ref([]);
const getGrados = async () => {
  try {
    const response = await axios.get(`/api/Grado/selectAll`);
    grados.value = response.data;
    // Filtra los grados cuyo estatus es igual a "A", ignorando mayúsculas/minúsculas
    gradosActivos.value = grados.value.filter(
      (grado) => grado.estatus.trim().toUpperCase() === "A"
    );

    if (mostrarTodosLosGrados.value) {
      gradosSeleccionados.value = grados.value;
    } else {
      gradosSeleccionados.value = gradosActivos.value;
    }

    mapeoDeDato(gradosSeleccionados.value);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de grados.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((grado, index) => ({
    indice: index + 1,
    codigoGrado: grado.codigoGrado,
    nombreGrado: grado.nombreGrado,
    estatus: grado.estatus,
  }));
};

//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar grado");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreGrado");
const mostrarTodosLosGrados = ref(false);

//Metodo del filtro de datos en la tabla
const buscarComunidad = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los grados

  if (textoBusqueda !== "") {
    datosFiltrados = gradosSeleccionados.value.filter((grado) => {
      const campoFiltro = grado[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  } else {
    mapeoDeDato(gradosSeleccionados.value);
  }
};
watch(mostrarTodosLosGrados, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    gradosSeleccionados.value = gradosActivos.value;
  } else {
    //checkbox habilitado
    gradosSeleccionados.value = grados.value;
  }
  mapeoDeDato(gradosSeleccionados.value);
});
//#endregion

//const grados = ref([])
const form = ref({
  nombreGrado: "",
  estatus: "A",
});

const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const codigoGradoActualizar = ref("");
const close = ref([]);

//const  deleteCarrera = (nombreGrado, codigoGrado) => {
//    confirmation(nombreGrado, `/api/Comunidad/delete/${codigoGrado}`, '', authStore.authToken);
//    console.log("¿Se esta ejecutando otro codigo?")
//    getGrados();
//};
// Método que muestra la confirmación antes de eliminar
const confirmDelete = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deleteGrado(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteGrado = async (nombreGrado, codigoGrado) => {
  try {
    const response = await axios.delete(`/api/Grado/delete/${codigoGrado}`);
    Swal.fire({
      title: "Eliminado!",
      text: `El grado ${nombreGrado} ha sido eliminado.`,
      icon: "success",
    });
    getGrados();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar el grado ${nombreGrado}.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const openModal = (op, codigoGrado, nombreGrado, estatus) => {
  clear();
  operation.value = op;
  codigoGradoActualizar.value = codigoGrado;
  if (op == 1) {
    title.value = "Crear Registro";
  } else if (op == 2) {
    title.value = "Actualizar Registro";
    form.value.nombreGrado = nombreGrado;
    form.value.estatus = estatus;
  } else {
    title.value = "Información";
  }
};

const clear = () => {
  form.value.nombreGrado = "";
  form.value.estatus = "A";
};

const save = async () => {
  //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
  if (operation.value == 1) {
    const res = await axios.post("/api/Grado/create", form.value);
    if (res.data.status == true) {
      Swal.fire({
        title: "¡Creado!",
        text: `El grado fue creado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: `Ocurrió un error al intentar crear el grado.`,
        icon: "error",
        timer: 2000,
      });
    }

    clear();
  } else {
    const res = await axios.put(
      `/api/Grado/update/${codigoGradoActualizar.value}`,
      form.value
    );
    if (res.data.status == true) {
      Swal.fire({
        title: "¡Actualizado!",
        text: `El grado fue actualizado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: `Ocurrió un error al intentar actualizar el grado.`,
        icon: "error",
        timer: 2000,
      });
    }
    nextTick(() => close.value.click());
  }
  getGrados();
};

//Habilitar/desabilitar campo nueva contraseña
const isDisabled = ref(true);

//Metodo del PDF
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
  doc.text("LISTADO DE GRADOS", 83, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Estado"];

  // Datos de la tabla
  const data = datos.map((grado, index) => [index + 1, grado.nombreGrado, grado.estatus]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: "#909909", // Color de fondo
    textColor: "#FFFFFF", // Color del texto
    fontStyle: "bold", // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headers2],
    body: data,
    startY: 20, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("ReporteGrados.pdf");
};
//#endregion

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((grado, index) => ({
    Indice: index + 1,
    Nombre: grado.nombreGrado,
    Estado: grado.estatus,
  }));
  // Insertar encabezados al principio de los datos
  //data.unshift(encabezados);
  // Insertar encabezados después de la primera fila
  //data.splice(0, 0, encabezados);

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de grados");
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
  link.download = "reporteGrados.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion

//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 85px;
}
</style>
