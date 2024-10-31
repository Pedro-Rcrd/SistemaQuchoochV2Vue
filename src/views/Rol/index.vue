<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Roles</h2>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/settingcard' }">
              Menú de mantenimientos
            </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Roles</a>
          </div>
        </div>
      </div>
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
            @input="buscarRol"
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
            <option value="nombreRol">Nombre del rol</option>
            <option value="estatus">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input
            v-model="mostrarTodosLosRoles"
            type="checkbox"
            class="form-check-input"
            id="checkRegistro"
            :disabled="desactivarCheckbox"
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
                ($event) => openModal(3, item.codigoRol, item.nombreRol, item.estatus)
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
                ($event) => openModal(2, item.codigoRol, item.nombreRol, item.estatus)
              "
            >
              <i class="fa-solid fa-edit text-dark"></i>
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
  <!--Modal-->
  <Modal :id="'modal'" :title="title">
    <div class="modal-body">
      <form @submit.prevent="save">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-n"></i>
              </span>
              <input
                placeholder="Nombre del rol"
                autofocus
                id="nombreEstudiante"
                required
                type="text"
                v-model="form.nombreRol"
                class="form-control"
                :disabled="desactivarCheckbox"
              />
            </div>
            <div class="col-12">
              <select
                v-model="form.estatus"
                class="form-select"
                aria-label="Default select example"
                :disabled="desactivarCheckbox"
              >
                <option selected>Estado</option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <!--Permisos-->
        <div class="container">
          <div class="row">
            <div class="col-4">
              <p>Módulos</p>
            </div>
            <div class="col-2">
              <p>Acceso</p>
            </div>
            <div class="col-2">
              <p>Crear</p>
            </div>
            <div class="col-2">
              <p>Editar</p>
            </div>
            <div class="col-2">
              <p>Exportar</p>
            </div>
          </div>
          <!--modulo registro-->
          <div class="row">
            <div class="col-4">
              <p>Registro</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloRegistro, disabledModuloRegistro, 1, 4)
                  "
                  v-model="disabledModuloRegistro"
                  type="checkbox"
                  class="form-check-input"
                  id="checkRegistro"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloRegistro, crearRegistro, 1, 1)"
                  v-model="crearRegistro"
                  :disabled="!disabledModuloRegistro || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloRegistro, modificarRegistro, 1, 2)
                  "
                  v-model="modificarRegistro"
                  :disabled="!disabledModuloRegistro || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloRegistro, exportarRegistro, 1, 5)"
                  v-model="exportarRegistro"
                  :disabled="!disabledModuloRegistro || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
          </div>
          <!--modulo compra-->
          <div class="row">
            <div class="col-4">
              <p>Compra</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloCompra, disabledModuloCompra, 2, 4)
                  "
                  v-model="disabledModuloCompra"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloCompra, crearCompra, 2, 1)"
                  v-model="crearCompra"
                  type="checkbox"
                  :disabled="!disabledModuloCompra || desactivarCheckbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloCompra, modificarCompra, 2, 2)"
                  v-model="modificarCompra"
                  type="checkbox"
                  :disabled="!disabledModuloCompra || desactivarCheckbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloCompra, exportarCompra, 2, 5)"
                  v-model="exportarCompra"
                  type="checkbox"
                  :disabled="!disabledModuloCompra || desactivarCheckbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
          </div>
          <!--modulo asingacion-->
          <div class="row">
            <div class="col-4">
              <p>Asignación</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(
                      disabledModuloAsignacion,
                      disabledModuloAsignacion,
                      3,
                      4
                    )
                  "
                  v-model="disabledModuloAsignacion"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloAsignacion, crearAsignacion, 3, 1)
                  "
                  v-model="crearAsignacion"
                  :disabled="!disabledModuloAsignacion || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloAsignacion, modificarAsignacion, 3, 2)
                  "
                  v-model="modificarAsignacion"
                  :disabled="!disabledModuloAsignacion || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloAsignacion, exportarAsignacion, 3, 5)
                  "
                  v-model="exportarAsignacion"
                  :disabled="!disabledModuloAsignacion || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
          </div>
          <!--modulo informes-->
          <div class="row">
            <div class="col-4">
              <p>Informes</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloInforme, disabledModuloInforme, 4, 4)
                  "
                  v-model="disabledModuloInforme"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
            <div class="col-2"></div>
            <div class="col-2"></div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloInforme, exportarInforme, 4, 5)"
                  v-model="exportarInforme"
                  :disabled="!disabledModuloInforme || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
          </div>
          <!--modulo Reporte-->
          <div class="row">
            <div class="col-4">
              <p>Reporte</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="
                    agregarPermiso(disabledModuloReporte, disabledModuloReporte, 5, 4)
                  "
                  v-model="disabledModuloReporte"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
            <div class="col-2"></div>
            <div class="col-2"></div>

            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(disabledModuloReporte, exportarReporte, 5, 5)"
                  v-model="exportarReporte"
                  :disabled="!disabledModuloReporte || desactivarCheckbox"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
          </div>
          <!--modulo mantenimiento-->
          <div class="row">
            <div class="col-4">
              <p>Mantenimiento</p>
            </div>
            <div class="col-2">
              <div class="form-check">
                <input
                  @change="agregarPermiso(accesoMantenimiento, accesoMantenimiento, 6, 4)"
                  v-model="accesoMantenimiento"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  :disabled="desactivarCheckbox"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="d-grid col-6 mx-auto">
          <button class="btn btn-dark" v-show="operation == 1 || operation == 2">
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
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { confirmation, sendRequest } from "../../functions";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Swal from "sweetalert2";

import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
//#region cambiar idima vuetify
import { useLocale } from "vuetify";
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}
// Llama a la función para cambiar al idioma español
changeLocale("es");
//#endregion

//Tabla
const headers = [
  { title: "#", key: "indice" },
  { title: "Nombre", key: "nombreRol" },
  { title: "Estado", key: "estatus" },
  { title: "Acción", key: "actions", sortable: false },
];
onMounted(() => {
  getRol();
});

//#region GET estudiantes
const roles = ref([]);
const getRol = async () => {
  try {
    const response = await axios.get(`/api/Rol/selectall`);
    roles.value = response.data;
    rolesActivos.value = roles.value.filter(
      (rol) => rol.estatus.trim().toUpperCase() === "A"
    );

    rolesSeleccionados.value = rolesActivos.value;

    resultadoFiltrado.value = rolesSeleccionados.value.map((rol, index) => ({
      indice: index + 1,
      codigoRol: rol.codigoRol,
      nombreRol: rol.nombreRol,
      estatus: rol.estatus,
    }));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de roles.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};
//#endregion
const permisosRol = ref();
const getPermisosRol = async (codigoRol) => {
  try {
    const response = await axios.get(`/api/Rol/permisosRol/${codigoRol}`);
    const permisosRol = response.data;

    // Recorre los niveles y sus elementos
    //Método
    //const permisos = res.data.permisos;
    const var_moduloRegistro = permisosRol["1"] || null;
    const var_moduloCompra = permisosRol["2"] || null;
    const var_moduloAsignacion = permisosRol["3"] || null;
    const var_moduloInforme = permisosRol["4"] || null;
    const var_moduloReporte = permisosRol["5"] || null;
    const var_moduloMantenimiento = permisosRol["6"] || null;

    if (var_moduloRegistro != null) {
      disabledModuloRegistro.value = true;
      crearRegistro.value = var_moduloRegistro.includes(1); //Crear
      modificarRegistro.value = var_moduloRegistro.includes(2); //modificar
      exportarRegistro.value = var_moduloRegistro.includes(5); //exportar
    }
    if (var_moduloCompra != null) {
      disabledModuloCompra.value = true;
      crearCompra.value = var_moduloCompra.includes(1); //Crear
      modificarCompra.value = var_moduloCompra.includes(2); //modificar
      exportarCompra.value = var_moduloCompra.includes(5); //exportar
    }
    if (var_moduloAsignacion != null) {
      disabledModuloAsignacion.value = true;
      crearAsignacion.value = var_moduloAsignacion.includes(1); //Crear
      modificarAsignacion.value = var_moduloAsignacion.includes(2); //modificar
      exportarAsignacion.value = var_moduloAsignacion.includes(5); //exportar
    }
    if (var_moduloInforme != null) {
      disabledModuloInforme.value = true;
      exportarInforme.value = var_moduloInforme.includes(5); //exportar
    }
    if (var_moduloReporte != null) {
      disabledModuloReporte.value = true;
      exportarReporte.value = var_moduloReporte.includes(5); //exportar
    }

    if (var_moduloMantenimiento != null) {
      accesoMantenimiento.value = true;
    }
    form.value.permisos = [];
    for (const modulo in permisosRol) {
      //console.log(`Nivel: ${nivel}`);
      for (const accion of permisosRol[modulo]) {
        //console.log(`Acción: ${accion}`);
        agregarPermiso(modulo, accion, modulo, accion);
      }
    }
    console.log("datos guardados");
    console.log(form.value.permisos);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    // Puedes manejar el error de la solicitud aquí
  }
};

//#region Método del FILTRO de datos
const rolesSeleccionados = ref();
const rolesActivos = ref();
const tipoBusqueda = ref("Buscar rol");
const filtro = ref("");
const resultadoFiltrado = ref([]);
const tipoFiltro = ref("nombreRol");

//Metodo del filtro de datos en la tabla
const buscarRol = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados; // Por defecto, usa todos los usuarios

  if (textoBusqueda !== "") {
    datosFiltrados = rolesSeleccionados.value.filter((rol) => {
      const campoFiltro = rol[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });
    resultadoFiltrado.value = datosFiltrados.map((rol, index) => ({
      indice: index + 1,
      codigoRol: rol.codigoRol,
      nombreRol: rol.nombreRol,
      estatus: rol.estatus,
    }));
  } else {
    console.log("Rellenando informacion");
    resultadoFiltrado.value = rolesSeleccionados.value.map((rol, index) => ({
      indice: index + 1,
      codigoRol: rol.codigoRol,
      nombreRol: rol.nombreRol,
      estatus: rol.estatus,
    }));
  }
};
//#endregion
const desactivarCheckbox = ref(false);
const desactivarTodosLosCheckboxes = (valor) => {
  desactivarCheckbox.value = valor;
};

//#region Modal
const title = ref("");
const nameInput = ref("");
const operation = ref(1);
const id = ref("");
const close = ref([]);
const codigoRolToUpdate = ref(0);
const openModal = (op, codigoRol, nombreRol, estatus) => {
  clearCheckboxes();
  clear();
  setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
  operation.value = op;

  if (op == 1) {
    title.value = "Crear Registro";
    desactivarTodosLosCheckboxes(false);
  } else if (op == 2) {
    title.value = "Actualizar Registro";
    form.value.nombreRol = nombreRol;
    form.value.estatus = estatus;
    codigoRolToUpdate.value = codigoRol;
    getPermisosRol(codigoRol);
    console.log(form.value);
    desactivarTodosLosCheckboxes(false);
  } else {
    form.value.nombreRol = nombreRol;
    form.value.estatus = estatus;
    getPermisosRol(codigoRol);
    title.value = "Información";
    desactivarTodosLosCheckboxes(true);
  }
};
//#endregion

//#region habilitar checkbox
const disabledModuloRegistro = ref(false);
const disabledModuloCompra = ref(false);
const disabledModuloAsignacion = ref(false);
const disabledModuloInforme = ref(false);
const disabledModuloReporte = ref(false);

const crearRegistro = ref(false);
const modificarRegistro = ref(false);
const exportarRegistro = ref(false);
const isDisabled = () => {
  crearRegistro.value = false;
  modificarRegistro.value = false;
  exportarRegistro.value = false;
};
const crearCompra = ref(false);
const modificarCompra = ref(false);
const exportarCompra = ref(false);
const isDisabledCompra = () => {
  crearCompra.value = false;
  modificarCompra.value = false;
  exportarCompra.value = false;
};
const crearAsignacion = ref(false);
const modificarAsignacion = ref(false);
const exportarAsignacion = ref(false);

const isDisabledAsignacion = () => {
  crearAsignacion.value = false;
  modificarAsignacion.value = false;
  exportarAsignacion.value = false;
};

const exportarInforme = ref(false);
const isDisabledInforme = () => {
  exportarInforme.value = false;
};

const exportarReporte = ref(false);
const isDisabledReporte = () => {
  exportarReporte.value = false;
};

const accesoMantenimiento = ref(false);

//#endregion

//#region CRUD rol

const form = ref({
  nombreRol: "", // Asignar el nombre del rol
  estatus: "",
  permisos: [],
});

const agregarPermiso = (modulo, accion, codigoModulo, codigoAccion) => {
  if (modulo && accion) {
    const var_codigoModulo = parseInt(codigoModulo);
    form.value.permisos.push({
      codigoModulo: var_codigoModulo,
      codigoAccion: codigoAccion,
    });
    console.log("Se insertó nuevo registro");
  } else {
    console.log("Se eliminó");
    eliminarPermiso(codigoModulo, codigoAccion);
  }
  console.log("Datos en permisos");
  console.log(form.value);
};
// Método para eliminar un permiso utilizando dos campos: codigoModulo y codigoAccion
const eliminarPermiso = (codigoModulo, codigoAccion) => {
  console.log("Modulo: ", codigoModulo);
  console.log("Accion: ", codigoAccion);
  // Encontrar el índice del permiso a eliminar
  const index = form.value.permisos.findIndex(
    (permiso) =>
      permiso.codigoModulo === codigoModulo && permiso.codigoAccion === codigoAccion
  );

  // Verificar si se encontró el permiso (findIndex retorna -1 si no lo encuentra)
  if (index !== -1) {
    form.value.permisos.splice(index, 1); // Eliminar el permiso del array
  }
};

const eliminarPorCodigoModulo = (codigoModulo) => {
  form.value.permisos = form.value.permisos.filter(
    (permiso) => permiso.codigoModulo !== codigoModulo
  );
};

const save = async () => {
  let res;
  if (operation.value == 1) {
    console.log("datos que se envia: ");
    console.log(form.value);
    res = await sendRequest("POST", form.value, "/api/Rol/create", "");
    getRol();
    if (res == true) {
      clear();
      nextTick(() => nameInput.value.focus());
      getRol();
    }
  } else {
    res = await sendRequest(
      "PUT",
      form.value,
      `/api/Rol/update/${codigoRolToUpdate.value}`,
      ""
    );

    if (res == true) {
      nextTick(() => close.value.click());
      getRol();
    }
  }
};

const clear = () => {
  form.value.nombreRol = "";
};
//#endregion

const mostrarTodosLosRoles = ref(false);
watch(mostrarTodosLosRoles, (newValue) => {
  if (!newValue) {
    console.log("Opcion de mostrar todo DESHABILITADO");
    rolesSeleccionados.value = rolesActivos.value;
    console.log(rolesSeleccionados.value);
  } else {
    console.log("Opciona de mostrar todo HABILITADO");
    rolesSeleccionados.value = roles.value;
    console.log(rolesSeleccionados.value);
  }
  resultadoFiltrado.value = rolesSeleccionados.value.map((rol, index) => ({
    indice: index + 1,
    codigoRol: rol.codigoRol,
    nombreRol: rol.nombreRol,
    estatus: rol.estatus,
  }));
});

// Watch para observar cambios en `disabledModuloRegistro`
watch(disabledModuloRegistro, (newValue) => {
  if (!newValue) {
    isDisabled();
    eliminarPorCodigoModulo(1);
  }
});
watch(disabledModuloCompra, (newValue) => {
  if (!newValue) {
    isDisabledCompra();
    eliminarPorCodigoModulo(2);
  }
});
watch(disabledModuloAsignacion, (newValue) => {
  if (!newValue) {
    isDisabledAsignacion();
    eliminarPorCodigoModulo(3);
  }
});
watch(disabledModuloInforme, (newValue) => {
  if (!newValue) {
    isDisabledInforme();
    eliminarPorCodigoModulo(4);
  }
});
watch(disabledModuloReporte, (newValue) => {
  if (!newValue) {
    isDisabledReporte();
    eliminarPorCodigoModulo(5);
  }
});

const clearCheckboxes = () => {
  isDisabled();
  isDisabledCompra();
  isDisabledAsignacion();
  isDisabledInforme();
  isDisabledReporte();
  accesoMantenimiento.value = false;

  disabledModuloRegistro.value = false;
  disabledModuloCompra.value = false;
  disabledModuloAsignacion.value = false;
  disabledModuloInforme.value = false;
  disabledModuloReporte.value = false;
};

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
  doc.text("LISTADO DE ROLES", 84, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Estado"];

  // Datos de la tabla
  const data = datos.map((rol, index) => [index + 1, rol.nombreRol, rol.estatus]);

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
  doc.save("ReporteRoles.pdf");
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
  const data = datos.map((rol, index) => ({
    indice: index + 1,
    nombreRol: rol.nombreRol,
    estatus: rol.estatus,
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de roles");
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
  link.download = "reporteRoles.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
</script>
