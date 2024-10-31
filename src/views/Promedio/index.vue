<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Rangos de promedios</h2>
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
            <a class="text-dark" href="#">Promedios</a>
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
                openModal(
                  1,
                  item.codigoPromedio,
                  item.descripcion,
                  item.valorMinimo,
                  item.valorMaximo
                )
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
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
          <div class="">
            <label for="exampleFormControlInput1" class="form-label">Descripción</label>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-n"></i>
              </span>
              <input
                autofocus
                id="numeroBloque"
                type="text"
                class="form-control"
                v-model="form.descripcion"
                disabled
                required
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"
                  >Valor mínimo</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-n"></i>
                  </span>
                  <input
                    autofocus
                    id="numeroBloque"
                    type="number"
                    class="form-control text-center fs-5 fw-bold border-1 border-primary"
                    v-model="form.valorMinimo"
                    :disabled="deshabilitarComponentes"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"
                  >Valor máximo</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-n"></i>
                  </span>
                  <input
                    autofocus
                    id="numeroBloque"
                    type="number"
                    class="form-control text-center fs-5 fw-bold border-1 border-primary"
                    v-model="form.valorMaximo"
                    :disabled="deshabilitarComponentes"
                    required
                  />
                </div>
              </div>
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
  getPromedios();
});

//Header de tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Descripción", key: "descripcion" },
  { title: "Valor mínimo", key: "valorMinimo" },
  { title: "Valor máximo", key: "valorMaximo" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET promedios
//#region GET promedios
const promedios = ref([]);
const resultadoFiltrado = ref([]);

const getPromedios = async () => {
  try {
    const response = await axios.get(`/api/promedio/selectAll`);
    promedios.value = response.data;
    // Filtra los promedios cuyo estatus es igual a "A", ignorando mayúsculas/minúsculas
    mapeoDeDato(promedios.value);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los promedios.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((promedio, index) => ({
    indice: index + 1,
    codigoPromedio: promedio.codigoPromedio,
    descripcion: promedio.descripcion,
    valorMinimo: promedio.valorMinimo,
    valorMaximo: promedio.valorMaximo,
  }));
};

//#endregion

//const promedios = ref([])
const form = ref({
  descripcion: "",
  valorMaximo: "",
  valorMinimo: "",
});

const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const codigoPromedioActualizar = ref("");
const close = ref([]);

const openModal = (op, codigoPromedio, descripcion, valorMinimo, valorMaximo) => {
  operation.value = op;
  codigoPromedioActualizar.value = codigoPromedio;
  if (op == 1) {
    title.value = "Actualizar Registro";
    form.value.descripcion = descripcion;
    form.value.valorMinimo = valorMinimo;
    form.value.valorMaximo = valorMaximo;
  } else {
    title.value = "Información";
  }
};

const save = async () => {
  //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
  if (operation.value == 1) {
    const response = await axios.put(
      `/api/promedio/update/${codigoPromedioActualizar.value}`,
      form.value
    );

    if (response.data.status == true) {
      Swal.fire({
        title: "¡Actualizado!",
        text: `El rango del promedio fue actualizado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      nextTick(() => close.value.click());
      getPromedios();
    }
  } else {
    Swal.fire({
      title: "¡Error!",
      text: `Ocurrió un error al intentar actualizaro el rango del promedio.`,
      icon: "error",
      timer: 2000,
    });
  }
};

//Habilitar/desabilitar campo nueva contraseña
const isDisabled = ref(true);

//Metodo del PDF
//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportarPDF = () => {
  descargarPDF(promedios.value);
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
  doc.text("RANGOS DE PROMEDIOS", 80, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Descripción", "Valor mínimo", "Valor máximo"];

  // Datos de la tabla
  const data = datos.map((promedio, index) => [
    index + 1,
    promedio.descripcion,
    promedio.valorMinimo,
    promedio.valorMaximo,
  ]);

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
  doc.save("Reportepromedios.pdf");
};
//#endregion

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Encabezados de las columnas
  // const encabezados = [
  //   'Índice',
  //   'Código Becario',
  //   'Nombre Estudiante',
  //   'Apellido Estudiante',
  //   'Nivel Académico',
  //   'Grado',
  //   'Carrera',
  //   'Establecimiento'
  // ];

  // Mapeo de datos con nombres de columnas
  const data = datos.map((promedio, index) => ({
    Indice: index + 1,
    Descripción: promedio.descripcion,
    "Valor mínimo": promedio.valorMinimo,
    "Valor máximo": promedio.valorMaximo,
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de promedios");
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
  link.download = "reportePromedios.xlsx";
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
