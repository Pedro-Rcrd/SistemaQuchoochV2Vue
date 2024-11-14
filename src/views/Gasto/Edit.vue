<template>
  <div class="row justify-content-center mt-1" v-if="authStore.moduloRegistro">
    <div class="row col-11">
      <h3>Actualizar de Gasto</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/expenses' }"> Gastos </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Actualizar registro</a>
          </div>
        </div>
      </div>
      <div class="card border border-success mt-3">
        <div class="card-body">
          <form enctype="multipart/form-data">
            <div class="row">
              <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
              </p>
              <h4>Información de la compra</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fecha de entrega<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="fehaRegistro"
                    required
                    type="date"
                    v-model="fechaEntrega"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Titulo<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-t"></i>
                  </span>
                  <input
                    autofocus
                    id="titulo"
                    required
                    type="text"
                    v-model="titulo"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput" class="form-label"
                  >Estado<span class="text-danger">*</span></label
                >
                <div class="d-flex flex-row">
                  <div class="form-check mr-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoRadio"
                      id="flexRadioDefault3"
                      value="A"
                      v-model="estado"
                    />
                    <label class="form-check-label" for="flexRadioDefault3">
                      Activo
                    </label>
                  </div>
                  <div class="form-check ps-5">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoRadio"
                      id="flexRadioDefault4"
                      value="F"
                      v-model="estado"
                    />
                    <label class="form-check-label" for="flexRadioDefault4">
                      Finalizado
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Tipo de pago<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-sack-dollar"></i>
                  </span>
                  <select
                    v-model="tipoPago"
                    class="form-control form-select"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="E">Efectivo</option>
                    <option value="C">Cheque</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Número del cheque<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="numeroCheque"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Monto otorgado<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input
                    autofocus
                    type="number"
                    v-model="monto"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Estudiante<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <input
                    class="form-control"
                    autofocus
                    id="codigoEstudiante"
                    required
                    v-model="busqueda"
                    @input="buscarEstudiantes"
                    type="text"
                    placeholder="Buscar estudiantes"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
                <ul class="list-group listaFiltro" v-if="mostrarLista">
                  <li
                    v-for="estudiante in visibilidad"
                    :key="estudiante.codigoEstudiante"
                    @click="seleccionarEstudiante(estudiante)"
                  >
                    {{ estudiante.nombreEstudiante }}
                    {{ estudiante.apellidoEstudiante }}
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Entregado a:</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-person"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="personaRecibe"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="exampleFormControlInput1" class="form-label"
                  >Descripción</label
                >
                <div class="input-group mb-3">
                  <input
                    autofocus
                    type="text"
                    v-model="descripcion"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Información de los productos</h4>
              <div class="col-md-8 mb-1 justify-content-center">
                <div class="table-container">
                  <table class="table table-scroll table-sm table-striped">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-center">Producto</th>
                        <th scope="col" class="text-center">Cantidad</th>
                        <th scope="col" class="text-center">Precio</th>
                        <th scope="col" class="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(producto, index) in listaProductos" :key="index">
                        <th scope="row" class="text-center">{{ index + 1 }}</th>
                        <td class="text-start">{{ producto.nombreProducto }}</td>
                        <td class="text-center">{{ producto.cantidad }}</td>
                        <td class="text-center">{{ producto.precio }}</td>
                        <td class="text-center">
                          <i
                            data-bs-toggle="modal"
                            data-bs-target="#modalProducto"
                            @click.prevent="
                              editarProducto(
                                producto.nombreProducto,
                                producto.cantidad,
                                producto.precio,
                                producto.codigoGastoDetalle
                              )
                            "
                            class="fa-solid fa-edit mr-1"
                          ></i>
                          <i
                            @click.prevent="
                              confirmarEliminarProducto(
                                producto.nombreProducto,
                                producto.codigoGastoDetalle
                              )
                            "
                            class="fa-solid fa-trash"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Producto<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-brands fa-shopify"></i>
                  </span>
                  <input
                    autofocus
                    id="titulo"
                    required
                    type="text"
                    v-model="nombreProducto"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <label for="exampleFormControlInput1" class="form-label">Cantidad</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input
                    autofocus
                    id="cantidad"
                    type="number"
                    class="form-control text-center fw-bold"
                    v-model="cantidadProducto"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Precio total</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-sack-dollar"></i>
                  </span>
                  <input
                    autofocus
                    id="precio"
                    type="number"
                    class="form-control text-center fw-bold"
                    v-model="precioProducto"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <label for="exampleFormControlInput1" class="form-label">Agregar</label>
                <div class="input-group">
                  <span class="input-group-text" @click.prevent="agregarProducto">
                    <i style="font-size: 24px" class="fa-solid fa-circle-plus"></i>
                  </span>
                </div>
              </div>
              <div class="alert alert-danger" role="alert" v-show="productoYaExiste">
                El producto seleccionado ya existe en la lista.
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 mb-1 justify-content-center">
                <div class="table-container">
                  <table class="table table-scroll table-sm table-striped">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-center">Producto</th>
                        <th scope="col" class="text-center">Cantidad</th>
                        <th scope="col" class="text-center">Precio</th>
                        <th scope="col" class="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(producto, index) in productos" :key="index">
                        <th scope="row" class="text-center">{{ index + 1 }}</th>
                        <td class="text-start">{{ producto.NombreProducto }}</td>
                        <td class="text-center">{{ producto.Cantidad }}</td>
                        <td class="text-center">{{ producto.Precio }}</td>
                        <td class="text-center">
                          <i
                            @click.prevent="eliminarProducto(index)"
                            class="fa-solid fa-trash text-red"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="row">
              <h4>Información del comprobante</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fecha de recibido</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="fechaRecibirComprobante"
                    type="date"
                    v-model="fechaRecibirComprobante"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Número del documento</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="numeroComprobante"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Imagen del cheque</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagen"
                    @change="handleFileChange"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Imagen del comprobante</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagenFicha"
                    @change="handleFileChangeFicha"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Imagen del estudiante</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagenCarta"
                    @change="handleFileChangeCarta"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <p v-if="deshabilitarComponentes">Cargando...</p>
              <div
                v-if="deshabilitarComponentes"
                class="spinner-border text-dark"
                role="status"
              ></div>

              <RouterLink
                :to="{ name: 'registermenu' }"
                type="button"
                class="btn btn-outline-primary"
              >
                Cancelar
              </RouterLink>
              <button
                type="submit"
                @click.prevent="submitForm"
                class="btn btn-primary text-light"
                :disabled="deshabilitarComponentes"
              >
                <i class="fa-solid fa-save"></i> Guardar registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <Modal :id="'modalProducto'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El producto fue actualizado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar actualizar el producto!
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
      <div class="text-center pb-3" v-show="mostrarLoading">
        <div class="card-body">
          <img
            style="max-width: 25px; max-height: 25px"
            src="/loading.gif"
            alt="img-fluid"
          />
        </div>
      </div>
      <div class="row col-11">
        <form @submit.prevent="save(1)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formActualizarProducto.nombreProducto"
              placeholder="Establecimiento"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="number"
              v-model="formActualizarProducto.cantidad"
              placeholder="Cantidad"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="number"
              v-model="formActualizarProducto.precio"
              placeholder="Precio"
              required
              class="form-control"
              ref="nameInput"
            />
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "../../components/Modal.vue";
const route = useRoute();
const parametro = route.params.codigoGasto;
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const codigoEstudiante = ref(0);
const fechaEntrega = ref("");
const titulo = ref("");
const estado = ref("A");
const tipoPago = ref("C");
const numeroCheque = ref(0);
const monto = ref(0.0);
const personaRecibe = ref("Estudiante");
const descripcion = ref("");
const fechaRecibirComprobante = ref("");
const numeroComprobante = ref("");
const imgCheque = ref(null);
const imgComprobante = ref(null);
const imgEstudiante = ref(null);

//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
  imgCheque.value = event.target.files[0];
};

const handleFileChangeFicha = (event) => {
  imgComprobante.value = event.target.files[0];
};

const handleFileChangeCarta = (event) => {
  imgEstudiante.value = event.target.files[0];
};

//#region Loading
const deshabilitarComponentes = ref(false);
//#endregion

const estudiantes = ref([]);

//Inicio método para buscar estudiante
const idEstudiante = ref(0);
const busqueda = ref("");
const mostrarLista = ref(true);
const visibilidad = ref([]);

//Para buscar texto
const buscarEstudiantes = () => {
  const textoBusqueda = busqueda.value.toLowerCase().trim();
  if (textoBusqueda !== "") {
    //return []; // Si la búsqueda está vacía, devuelve una lista vacía
    mostrarLista.value = true;
    visibilidad.value = estudiantes.value.filter((estudiante) =>
      (
        estudiante.nombreEstudiante.toLowerCase() +
        " " +
        estudiante.apellidoEstudiante.toLowerCase()
      ).includes(textoBusqueda.toLowerCase())
    );
  }
};

const seleccionarEstudiante = (estudiante) => {
  idEstudiante.value = estudiante.codigoEstudiante;
  busqueda.value = estudiante.nombreEstudiante + " " + estudiante.apellidoEstudiante;
  mostrarLista.value = false; // Ocultar la lista después de seleccionar
};

//Fin metodo para buscar estudiante
const getEstudiantes = async () => {
  try {
    const response = await axios.get("/api/estudiante/selectAll");
    estudiantes.value = response.data.filter(
      (estudiante) => estudiante.estado.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de estudiantes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const listaProductos = ref();
const getListaProductos = async () => {
  try {
    const response = await axios.get(`/api/gasto/listaProductos/${parametro}`);
    listaProductos.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de productos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getGasto = async () => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.get(`/api/gasto/${parametro}`);
    idEstudiante.value = response.data.codigoEstudiante;
    busqueda.value =
      response.data.nombreEstudiante + " " + response.data.apellidoEstudiante;
    fechaEntrega.value = formatFecha(response.data.fechaEntrega);
    titulo.value = response.data.titulo;
    estado.value = response.data.estado;
    tipoPago.value = response.data.tipoPago;
    numeroCheque.value = response.data.numeroCheque;
    monto.value = response.data.monto;
    personaRecibe.value = response.data.personaRecibe;
    descripcion.value = response.data.descripcion;
    fechaRecibirComprobante.value =
      response.data.fechaRecibirComprobante != null
        ? formatFecha(response.data.fechaRecibirComprobante)
        : "";
    numeroComprobante.value = response.data.numeroComprobante;
    imgCheque.value = null;
    imgComprobante.value = null;
    imgEstudiante.value = null;

    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la información del gasto.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });

    deshabilitarComponentes.value = false;
  }
};

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

onMounted(async () => {
  getEstudiantes();
  getGasto();
  getListaProductos();
});

//#region Asignar nuevo producto
const formProducto = ref({
  codigoGasto: 0,
  nombreProducto: "",
  cantidad: 0,
  precio: 0,
  estatus: "A",
});

//#region Asignar nuevo producto
const nombreProducto = ref("");
const cantidadProducto = ref(0);
const precioProducto = ref(0);
const productos = ref([]);
const productoYaExiste = ref(false);
const agregarProducto = () => {
  if (
    nombreProducto.value !== "" &&
    cantidadProducto.value !== 0 &&
    cantidadProducto.value !== "" &&
    precioProducto.value !== ""
  ) {
    const productoExistente = productos.value.find(
      (a) => a.NombreProducto === nombreProducto.value
    );
    if (!productoExistente) {
      productos.value.push({
        NombreProducto: nombreProducto.value,
        Cantidad: cantidadProducto.value,
        Precio: precioProducto.value,
      });

      productoYaExiste.value = false;
    } else {
      productoYaExiste.value = true;
    }
    //limpiar campos
    nombreProducto.value = "";
    cantidadProducto.value = 0;
    precioProducto.value = 0;
  }
};

const eliminarProducto = (index) => {
  productos.value.splice(index, 1);
};

//#endregion

//Eliminar bloque
const confirmarEliminarProducto = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar el producto: ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deleteProducto(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteProducto = async (nombre, codigo) => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.delete(`/api/gasto/deleteProducto/${codigo}`);
    Swal.fire({
      title: "Eliminado!",
      text: `El producto ${nombre} ha sido eliminado.`,
      icon: "success",
    });
    getListaProductos();
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar el producto ${nombre}.`,
      icon: "error",
      footer: error.message || "Por favor, intente nuevamente más tarde.",
    });
    deshabilitarComponentes.value = false;
  }
};

//#endregion
//#region  editar producto
const mostrarLoading = ref(false);
const mostrarAlertaDanger = ref(false);
const mostrarAlertaSuccess = ref(false);
const codigoProductoActualizar = ref(0);
const noMostrarAlertas = () => {
  mostrarAlertaSuccess.value = false;
  mostrarAlertaDanger.value = false;
  mostrarLoading.value = false;
};
const formActualizarProducto = ref({
  nombreProducto: "",
  cantidad: 0,
  precio: 0,
});

const editarProducto = (nombre, cantidad, precio, codigoProducto) => {
  formActualizarProducto.value.nombreProducto = nombre;
  formActualizarProducto.value.cantidad = cantidad;
  formActualizarProducto.value.precio = precio;
  codigoProductoActualizar.value = codigoProducto;
  noMostrarAlertas();
};

const save = async (opcion) => {
  if (
    formActualizarProducto.value.nombreProducto &&
    formActualizarProducto.value.cantidad &&
    formActualizarProducto.value.precio !== ""
  ) {
    if (opcion == 1) {
      try {
        mostrarLoading.value = true;
        const response = await axios.put(
          `/api/gasto/actualizarProducto/${codigoProductoActualizar.value}`,
          formActualizarProducto.value
        );
        mostrarLoading.value = false;
        if ((response.data.estatus = true)) {
          mostrarAlertaSuccess.value = true;
          getListaProductos();
        } else {
          mostrarAlertaDanger.value = true;
        }
      } catch {
        mostrarLoading.value = false;
        mostrarAlertaDanger.value = true;
      }
    }
  }
};
//#endregion

//#region  POST
const submitForm = async () => {
  if (!titulo.value || !monto.value || !idEstudiante.value || !tipoPago.value) {
    return Swal.fire({
      title: "Campos vacíos",
      text: `Por favor, complete los campos obligatorios.`,
      icon: "warning",
    });
  }
  deshabilitarComponentes.value = true;
  const formData = new FormData();
  formData.append("CodigoEstudiante", idEstudiante.value);
  formData.append("FechaEntrega", fechaEntrega.value);
  formData.append("Titulo", titulo.value);
  formData.append("Estado", estado.value);
  formData.append("TipoPago", tipoPago.value);
  formData.append("NumeroCheque", numeroCheque.value);
  formData.append("Monto", monto.value);
  formData.append("PersonaRecibe", personaRecibe.value);
  formData.append("Descripcion", descripcion.value);
  formData.append("FechaRecibirComprobante", fechaRecibirComprobante.value);
  formData.append("NumeroComprobante", numeroComprobante.value);
  formData.append("ImgCheque", imgCheque.value);
  formData.append("ImgComprobante", imgComprobante.value);
  formData.append("ImgEstudiante", imgEstudiante.value);

  productos.value.forEach((producto, index) => {
    formData.append(`Productos[${index}].NombreProducto`, producto.NombreProducto);
    formData.append(`Productos[${index}].Cantidad`, producto.Cantidad);
    formData.append(`Productos[${index}].Precio`, producto.Precio);
  });

  try {
    if (!authStore.token) {
      return alert("No estás autorizado para realizar esta acción.");
    }

    const headers = {
      Authorization: `Bearer ${authStore.token}`,
    };

    const response = await fetch(`${baseApiBackend}/api/Gasto/update/${parametro}`, {
      method: "PUT",
      body: formData,
      headers,
    });

    if (response.ok) {
      Swal.fire({
        title: "¡Actualizado!",
        text: `El gasto se ha actualizado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      productos.value = [];
      imgEstudiante.value = null;
    } else {
      Swal.fire({
        title: "¡Error!",
        text: `Hubo un error al intentar actualizar los datos del gasto.`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    getListaProductos();
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "¡Error!",
      text: `Hubo un error al intentar actualizar los datos del gasto.`,
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    });
    deshabilitarComponentes.value = false;
  }
  deshabilitarComponentes.value = false;
};
//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 25px;
}

.listaFiltro {
  position: absolute;
  z-index: 1;
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* border: 1px solid #ccc; */
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #454545;
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
  padding: 7px;
  cursor: pointer;
}

.listaFiltro li:hover {
  background-color: #808080;
  color: #fff;
}
</style>
