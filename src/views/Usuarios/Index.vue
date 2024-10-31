<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Paginate from "vuejs-paginate-next";
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
  getUsuarios();
  getRol();
});

//Header de tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreUsuario" },
  { title: "Email", key: "email" },
  { title: "Rol", key: "nombreRol" },
  { title: "Fecha de creación", key: "fechaCreacion" },
  { title: "Estado", key: "estatus" },
  { title: "Acción", key: "actions", sortable: false },
];

//GET usuarios
//#region GET usuarios
const usuarios = ref([]);
const usuariosActivos = ref([]);
const usuariosSeleccionados = ref([]);
const getUsuarios = async () => {
  try {
    const response = await axios.get(`/api/Usuario/selectAll`);
    usuarios.value = response.data.map((expense) => ({
      ...expense,
      fechaCreacion: formatFecha(expense.fechaCreacion), // Formatea la fecha
    }));
    // Filtra los usuarios cuyo estatus es igual a "A", ignorando mayúsculas/minúsculas
    usuariosActivos.value = usuarios.value.filter(
      (usuario) => usuario.estatus.trim().toUpperCase() === "A"
    );

    usuariosSeleccionados.value = usuariosActivos.value;

    resultadoFiltrado.value = usuariosSeleccionados.value.map((usuario, index) => ({
      indice: index + 1,
      codigoUsuario: usuario.codigoUsuario,
      nombreRol: usuario.nombreRol,
      codigoRol: usuario.codigoRol,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      fechaCreacion: usuario.fechaCreacion,
      estatus: usuario.estatus,
    }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    // Puedes manejar el error de la solicitud aquí
  }
};
//#endregion

//#region Método del FILTRO de datos
const tipoBusqueda = ref("Buscar usuario");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreUsuario");
const mostrarTodosLosUsuarios = ref(false);

//Metodo del filtro de datos en la tabla
const buscarEstudiantes = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los usuarios

  if (textoBusqueda !== "") {
    datosFiltrados = usuariosSeleccionados.value.filter((usuario) => {
      const campoFiltro = usuario[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    resultadoFiltrado.value = datosFiltrados.map((usuario, index) => ({
      indice: index + 1,
      codigoUsuario: usuario.codigoUsuario,
      nombreRol: usuario.nombreRol,
      codigoRol: usuario.codigoRol,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      fechaCreacion: usuario.fechaCreacion,
      estatus: usuario.estatus,
    }));
  } else {
    resultadoFiltrado.value = usuariosSeleccionados.value.map((usuario, index) => ({
      indice: index + 1,
      codigoUsuario: usuario.codigoUsuario,
      nombreRol: usuario.nombreRol,
      codigoRol: usuario.codigoRol,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      fechaCreacion: usuario.fechaCreacion,
      estatus: usuario.estatus,
    }));
  }
};
watch(mostrarTodosLosUsuarios, (newValue) => {
  if (!newValue) {
    console.log("Opcion de mostrar todo DESHABILITADO");
    usuariosSeleccionados.value = usuariosActivos.value;
  } else {
    console.log("Opciona de mostrar todo HABILITADO");
    usuariosSeleccionados.value = usuarios.value;
  }
  resultadoFiltrado.value = usuariosSeleccionados.value.map((usuario, index) => ({
    indice: index + 1,
    codigoUsuario: usuario.codigoUsuario,
    nombreRol: usuario.nombreRol,
    codigoRol: usuario.codigoRol,
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    fechaCreacion: usuario.fechaCreacion,
    estatus: usuario.estatus,
  }));
});
//#endregion

//const usuarios = ref([])
const form = ref({
  codigoRol: 0,
  nombreUsuario: "",
  email: "",
  fechaCreacion: "",
  contrasenia: "",
  contraseniaNueva: "",
  estatus: "A",
});

const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const id = ref("");
const close = ref([]);

const deleteUsuario = (id, name) => {
  confirmation(name, `/api/Usuario/delete/${id}`, "/users", authStore.authToken);
};

//Formatear FECHA
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const FichaUsuario = ref([]);
const openModal = (
  op,
  codigoUsuario,
  codigoRol,
  nombreUsuario,
  email,
  fechaCreacion,
  estatus
) => {
  clear();
  setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
  operation.value = op;
  id.value = codigoUsuario;
  if (op == 1) {
    title.value = "Crear Registro";
  } else if (op == 2) {
    title.value = "Actualizar Registro";
    form.value.codigoRol = codigoRol;
    form.value.nombreUsuario = nombreUsuario;
    form.value.email = email;
    form.value.fechaCreacion = fechaCreacion;
    form.value.contrasenia = "";
    form.value.estatus = estatus;
  } else {
    getFichaUsuario(codigoUsuario);

    title.value = "Información";
    form.value.codigoRol = codigoRol;
    form.value.nombreUsuario = nombreUsuario;
    form.value.email = email;
    form.value.fechaCreacion = fechaCreacion;
    form.value.contrasenia = "";
  }
};

const getFichaUsuario = async (codigoUsuario) => {
  try {
    const response = await axios.get(`/api/Usuario/userInformation/${codigoUsuario}`);
    FichaUsuario.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la ficha del usuario.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const clear = () => {
  form.value.codigoRol = "";
  form.value.nombreUsuario = "";
  form.value.fechaCreacion = "";
  form.value.contrasenia = "";
  form.value.contraseniaNueva = "";
};

const save = async () => {
  let res;
  //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
  if (operation.value == 1) {
    res = await sendRequest("POST", form.value, "/api/Usuario/create", "");

    if (res == true) {
      clear();
      nextTick(() => nameInput.value.focus());
      getUsuarios();
    }
  } else {
    /*         for (let i = 0; i < form.value.length; i++) {
                    console.log(form.value[i]);
                }
                console.log("llegó aquí") */

    res = await sendRequest("PUT", form.value, `/api/Usuario/update/${id.value}`, "");

    if (res == true) {
      nextTick(() => close.value.click());
      getUsuarios();
    }
  }
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
  doc.text("LISTADO DE USUARIOS", 82, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Email", "Rol", "Fecha de creación", "Estado"];

  // Datos de la tabla
  const data = datos.map((usuario, index) => [
    index + 1,
    usuario.nombreUsuario,
    usuario.email,
    usuario.nombreRol,
    usuario.fechaCreacion,
    usuario.estatus,
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
  doc.save("ReporteUsuarios.pdf");
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
  const data = datos.map((usuario, index) => ({
    indice: index + 1,
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    nombreRol: usuario.nombreRol,
    fechaCreacion: usuario.fechaCreacion,
    Estado: usuario.estatus,
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de usuarios");
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
  link.download = "reporteUsuarios.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion

//#region GET estudiantes
const roles = ref([]);
const getRol = async () => {
  try {
    const response = await axios.get(`/api/Rol/selectall`);
    roles.value = response.data.filter((rol) => rol.estatus.trim().toUpperCase() === "A");
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    // Puedes manejar el error de la solicitud aquí
  }
};
//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 85px;
}
</style>

<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Lista de Usuarios</h2>
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
            <a class="text-dark" href="#">Usuarios</a>
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
            id="codigoEstudiante"
            v-model="filtro"
            @input="buscarEstudiantes"
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
            <option value="nombreUsuario">Nombre del usuario</option>
            <option value="email">Email</option>
            <option value="nombreRol">Rol</option>
            <option value="estatus">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLosUsuarios"
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
              data-bs-target="#MostrarInformacionUsuario"
              @click="
                ($event) =>
                  openModal(
                    3,
                    item.codigoUsuario,
                    item.codigoRol,
                    item.nombreUsuario,
                    item.email,
                    item.fechaCreacion,
                    item.estatus
                  )
              "
            >
              <i class="fa-solid fa-eye text-dark"></i>
            </v-icon>
            <v-icon
              class="me-2"
              size="small"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              @click="
                ($event) =>
                  openModal(
                    2,
                    item.codigoUsuario,
                    item.codigoRol,
                    item.nombreUsuario,
                    item.email,
                    item.fechaCreacion,
                    item.estatus
                  )
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
            </v-icon>
            <v-icon
              size="small"
              @click="($event) => deleteUsuario(item.codigoUsuario, item.nombreUsuario)"
            >
              <i class="fa-solid fa-trash text-dark"></i>
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <Modal :id="'MostrarInformacionUsuario'" :title="title">
      <div class="modal-body">
        <div class="text-center">
          <h5>
            <strong>{{ form.nombreUsuario }}</strong>
          </h5>
          <h5>{{ FichaUsuario.rol }}</h5>
        </div>
        <hr />

        <div>
          <!--Tabla-->
          <table class="table table-striped table-sm">
            <thead>
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">Módulo</th>
                <th scope="col">Permisos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(modulo, index) in FichaUsuario.modulos" :key="modulo.id">
                <td>{{ index + 1 }}</td>
                <td>{{ modulo.nombreModulo }}</td>
                <td>
                  <span
                    v-for="(permiso, idx) in modulo.permisos"
                    :key="idx"
                    class="permiso"
                  >
                    {{ permiso }}<span v-if="idx < modulo.permisos.length - 1">, </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>

    <Modal :id="'modal'" :title="title">
      <div class="modal-body">
        <form @submit.prevent="save">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="form.nombreUsuario"
              placeholder="Usuario"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-5">
              <select
                class="form-control form-select"
                id="codigoComunidad"
                v-model="form.codigoRol"
              >
                <option value="" disabled selected>Selecciona el rol</option>
                <template v-for="tipo in roles" :key="tipo.codigoRol">
                  <option :value="tipo.codigoRol">
                    {{ tipo.nombreRol }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-at"></i>
            </span>
            <div class="d-grid col-5">
              <input
                autofocus
                type="email"
                v-model="form.email"
                placeholder="Correo electrónico"
                required
                class="form-control"
                ref="nameInput"
              />
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="form.contrasenia"
              placeholder="Contraseña"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3" v-show="operation == 2">
            <span class="input-group-text">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input
              autofocus
              type="text"
              :disabled="isDisabled"
              v-model="form.contraseniaNueva"
              placeholder="Nueva contraseña"
              class="form-control"
              ref="nameInput"
            />
            <div class="">
              <input type="checkbox" v-model="isDisabled" />
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-5">
              <input
                autofocus
                type="date"
                v-model="form.fechaCreacion"
                placeholder="Fecha de creación"
                required
                class="form-control"
                ref="nameInput"
              />
            </div>
          </div>
          <div class="col-12">
            <select
              v-model="form.estatus"
              class="form-select"
              aria-label="Default select example"
              :disabled="desactivarCheckbox"
            >
              <option selected disabled>Estado</option>
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
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
    </Modal>
  </div>
</template>
