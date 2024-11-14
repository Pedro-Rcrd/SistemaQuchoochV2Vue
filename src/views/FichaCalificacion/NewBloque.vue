<template>
  <div class="row justify-content-center" v-if="authStore.moduloRegistro">
    <div class="row col-11">
      <h3>Registro de bloque</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/cards' }"> Fichas de calificaciones </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Nuevo Bloque</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="bg-light p-2">
                <div class="row">
                  <p class="placeholder-glow" v-if="mostrarBarraLoading">
                    <span class="placeholder col-12 text-success"></span>
                  </p>
                </div>
                <div class="row">
                  <div class="row justify-content-between">
                    <div class="col-11">
                      <h5>Detalles de la ficha escolar</h5>
                    </div>
                    <div class="col-1 text-end">
                      <i
                        @click="exportarPDF"
                        style="font-size: 24px"
                        class="fas fa-circle-down"
                        v-show="ocultarElementos"
                      ></i>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-7">
                      <p class="m-0">
                        Establecimiento: <strong>{{ establecimiento }}</strong>
                      </p>
                      <p class="m-0">
                        Grado / año: <strong>{{ grado }}</strong>
                      </p>
                      <p class="m-0">
                        Nivel académico: <strong>{{ nivelAcademico }}</strong>
                      </p>
                      <p class="m-0">
                        Carrera: <strong>{{ carrera }}</strong>
                      </p>
                      <p>
                        Modalidad: <strong>{{ modalidadEstudio }}</strong>
                      </p>
                    </div>
                    <div class="col-5">
                      <p class="m-0">
                        <strong>{{ nombreEstudiante }} {{ apellidoEstudiante }}</strong>
                      </p>
                      <p class="m-0">
                        Código: <strong>{{ codigoBecario }}</strong>
                      </p>
                      <p>
                        Ciclo escolar: <strong>{{ cicloEscolar }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-light row mt-3 p-2">
            <div
              class="card p-0 m-2"
              style="width: 19rem"
              v-for="item in informacionFichaCalificacion.bloques"
            >
              <div
                class="card-header"
                :style="{ backgroundColor: obtenerColor(item.codigoPromedio) }"
              >
                <div class="row justify-content-between">
                  <div class="col">Bloque: {{ item.bloque }}</div>
                  <div class="col text-end"></div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Promedio: {{ item.promedio }}</h5>

                <!--TABLA-->
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Curso</th>
                      <th scope="col">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(nota, curso, index) in item.materias" :key="index">
                      <th scope="row" class="text-center">{{ index + 1 }}</th>
                      <td>{{ curso }}</td>
                      <td>{{ nota }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--TABLA-->
              </div>
            </div>
          </div>

          <!--card body-->
        </div>
      </div>
      <!--fin card uno-->
      <div class="card border pt-3">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="bg-light p-2">
                <div class="row">
                  <form enctype="multipart/form-data" @submit.prevent="submitForm">
                    <div class="bg-light p-2 mt-3">
                      <div class="row">
                        <h4>Detalles del nuevo bloque</h4>
                        <div class="row">
                          <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label"
                              >Bloque</label
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
                                v-model="numeroDeBloque"
                                :disabled="deshabilitarComponentes"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8">
                            <table class="table table-striped table-sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Curso</th>
                                  <th class="text-center">Nota</th>
                                </tr>
                              </thead>
                              <tbody class="table-group-divider">
                                <tr
                                  v-for="(curso, i) in cursosDeFichaEscolar"
                                  :key="curso.codigoCurso"
                                >
                                  <td>{{ i + 1 }}</td>
                                  <td>{{ curso.nombreCurso }}</td>
                                  <td class="text-end">
                                    <input
                                      style="max-width: 100px"
                                      type="number"
                                      v-model="curso.nota"
                                      class="form-control d-inline-block text-center"
                                      @change="
                                        agregarNotasDeCursos(
                                          curso.codigoCurso,
                                          curso.nota
                                        )
                                      "
                                      :disabled="deshabilitarComponentes"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label"
                              >Curso</label
                            >
                            <span
                              ><i
                                data-bs-toggle="modal"
                                data-bs-target="#modalCurso"
                                style="font-size: 14px"
                                class="fas fa-circle-plus"
                                @click="noMostrarAlertas()"
                                :disabled="deshabilitarComponentes"
                              ></i
                            ></span>
                            <div class="input-group mb-3">
                              <span class="input-group-text">
                                <i class="fa-solid fa-building"></i>
                              </span>
                              <select
                                class="form-control form-select"
                                id="codigoCurso"
                                v-model="codigoCurso"
                                :disabled="deshabilitarComponentes"
                              >
                                <option value="" disabled selected>
                                  Selecciona curso
                                </option>
                                <template v-for="tipo in cursos" :key="tipo.codigoCurso">
                                  <option :value="tipo.codigoCurso">
                                    {{ tipo.nombreCurso }}
                                  </option>
                                </template>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label"
                              >Nota</label
                            >
                            <div class="input-group mb-3">
                              <span class="input-group-text">
                                <i class="fa-solid fa-n"></i>
                              </span>
                              <input
                                autofocus
                                id="notaCurso"
                                type="number"
                                class="form-control"
                                v-model="notaInput"
                                :disabled="deshabilitarComponentes"
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="exampleFormControlInput1" class="form-label"
                              >Agregar</label
                            >
                            <div class="input-group">
                              <span
                                class="input-group-text"
                                @click.prevent="agregarCurso"
                              >
                                <i
                                  style="font-size: 24px"
                                  class="fa-solid fa-circle-plus"
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div
                            class="alert alert-danger"
                            role="alert"
                            v-show="cursoYaExiste"
                          >
                            El curso seleccionado ya existe en la lista.
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-8 mb-1 justify-content-center">
                          <div class="table-container">
                            <table class="table table-scroll">
                              <thead>
                                <tr>
                                  <th scope="col" class="text-center">#</th>
                                  <th scope="col" class="text-center">Curso</th>
                                  <th scope="col" class="text-center">Nota</th>
                                  <th scope="col" class="text-center">Acción</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(cursoNota, index) in cursosNotas"
                                  :key="index"
                                >
                                  <th scope="row" class="text-center">{{ index + 1 }}</th>
                                  <td class="text-center">{{ cursoNota.curso }}</td>
                                  <td class="text-center">{{ cursoNota.nota }}</td>
                                  <td class="text-center">
                                    <i
                                      @click.prevent="eliminarCurso(index)"
                                      class="fa-solid fa-trash text-red"
                                      :disabled="deshabilitarComponentes"
                                    ></i>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Fotografía del estudiante</label
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
                            required
                            :disabled="deshabilitarComponentes"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Imagen de ficha</label
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
                          >Imagen de carta</label
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
                        :to="{ name: 'cards' }"
                        type="button"
                        class="btn btn-outline-primary"
                      >
                        Cancelar
                      </RouterLink>
                      <button
                        type="submit"
                        class="btn btn-primary text-light"
                        :disabled="botonDeshabilitado"
                      >
                        <i class="fa-solid fa-save"></i> Guardar registro
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <!--FONTO LIGHT-->
            </div>
          </div>
        </div>
      </div>

      <!--caja principal-->
    </div>
  </div>
  <Modal :id="'modalCurso'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El curso fue creado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar el curso!
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
        <form @submit.prevent="save()">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formCurso.nombreCurso"
              placeholder="Curso"
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
                id="codigoComunidad"
                v-model="formCurso.codigoNivelAcademico"
              >
                <option value="" disabled selected>Selecciona el nivel académico</option>
                <template
                  v-for="tipo in nivelesAcademicos"
                  :key="tipo.codigoNivelAcademico"
                >
                  <option :value="tipo.codigoNivelAcademico">
                    {{ tipo.nombreNivelAcademico }}
                  </option>
                </template>
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
import { ref, onMounted, nextTick } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import Paginate from "vuejs-paginate-next";
import { useRoute } from "vue-router";
import router from "@/router";
import Swal from "sweetalert2";
const route = useRoute();
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
const parametro = route.params.codigoFichaCalificacion;
onMounted(() => {
  //getCursosBloques()
  getInformacionFichaCalificacion();
  getCursos();
  getCursosDeFicha();
});

const cursosDeFichaEscolar = ref();
const getCursosDeFicha = async () => {
  try {
    const response = await axios.get(
      `/api/fichacalificacion/ObtenerCursosPorFicha/${parametro}`
    );
    const todosLosCursos = response.data.filter(
      (curso) => curso.estatus.trim().toUpperCase() === "A"
    );

    cursosDeFichaEscolar.value = todosLosCursos.map((curso) => ({
      ...curso, // Copia el contenido del curso
      nota: null, // Agrega la propiedad `nota` para cada curso
    }));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//#region Crear curso
const formCurso = ref({
  codigoNivelAcademico: 0,
  nombreCurso: "",
  estatus: "A",
});

//#endregion

const mostrarLoading = ref(false);
const mostrarAlertaSuccess = ref(false);
const mostrarAlertaDanger = ref(false);

const save = async () => {
  try {
    mostrarLoading.value = true;
    const response = await axios.post("/api/curso/create", formCurso.value);
    mostrarLoading.value = false;
    if ((response.data.estatus = true)) {
      mostrarAlertaSuccess.value = true;
      await getCursos();
    } else {
      mostrarAlertaDanger.value = true;
    }
  } catch {
    mostrarLoading.value = false;
    mostrarAlertaDanger.value = true;
  }
};

const noMostrarAlertas = () => {
  mostrarAlertaSuccess.value = false;
  mostrarAlertaDanger.value = false;
  mostrarLoading.value = false;
  formCurso.value.nombreCurso = "";
  formCurso.value.codigoNivelAcademico = "";
};

const bgColorPromedioRojo = ref("#FF0000");
const bgColorPromedioAmarrillo = ref("#FFFF00");
const bgColorPromedioVerde = ref("#00FF00");

const obtenerColor = (codigoPromedio) => {
  if (codigoPromedio === 1) {
    return bgColorPromedioRojo.value;
  } else if (codigoPromedio === 2) {
    return bgColorPromedioAmarrillo.value;
  } else if (codigoPromedio === 3) {
    return bgColorPromedioVerde.value;
  }
  return "white"; // Color por defecto si no coincide
};

const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");
const grado = ref("");
const nivelAcademico = ref("");
const establecimiento = ref("");
const carrera = ref("");
const cicloEscolar = ref("");
const modalidadEstudio = ref("");

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  return year.toString();
};

//Bloque seleccionado
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);
const numeroDeBloque = ref(0);

const informacionFichaCalificacion = ref([]);
const getInformacionFichaCalificacion = async () => {
  try {
    const response = await axios.get(
      `/api/fichaCalificacion/InformacionNuevoBloqueFicha/${parametro}`
    );
    informacionFichaCalificacion.value = response.data;
    nombreEstudiante.value = informacionFichaCalificacion.value.nombreEstudiante;
    apellidoEstudiante.value = informacionFichaCalificacion.value.apellidoEstudiante;
    codigoBecario.value = informacionFichaCalificacion.value.codigoBecario;
    establecimiento.value = informacionFichaCalificacion.value.establecimiento;
    nivelAcademico.value = informacionFichaCalificacion.value.nivelAcademico;
    grado.value = informacionFichaCalificacion.value.grado;
    carrera.value =
      informacionFichaCalificacion.value.carrera != ""
        ? informacionFichaCalificacion.value.carrera
        : "No aplica";
    cicloEscolar.value = formatFecha(informacionFichaCalificacion.value.cicloEscolar);
    numeroDeBloque.value = informacionFichaCalificacion.value.numeroBloque + 1;
    modalidadEstudio.value = informacionFichaCalificacion.value.modalidad;

    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la información de la ficha escolar.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    mostrarBarraLoading.value = false;
  }
};

const cursos = ref();
const getCursos = async () => {
  try {
    const response = await axios.get(`/api/fichacalificacion/ObtenerCursos/${parametro}`);
    cursos.value = response.data.filter((a) => a.estatus.trim().toUpperCase() === "A");
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//Alamacenando IMG del bloque
const handleFileChange = (event) => {
  imgEstudiante.value = event.target.files[0];
};

const handleFileChangeFicha = (event) => {
  imgFicha.value = event.target.files[0];
};

const handleFileChangeCarta = (event) => {
  imgCarta.value = event.target.files[0];
};

//METODO PARA GUARDAR NOTAS DE LOS CURSOS DEL NUEVO METODO
const notaDelCurso = ref(0);
const agregarNotasDeCursos = (codigoCurso, nota) => {
  const cursoIndex = cursosNotas.value.findIndex(
    (curso) => curso.codigoCurso === codigoCurso
  );
  if (codigoCurso !== 0 && nota !== "" && nota !== "") {
    // Si ya existe, actualiza la nota, de lo contrario, agrega un nuevo objeto
    if (cursoIndex !== -1) {
      cursosNotas.value[cursoIndex].nota = nota;
    } else {
      cursosNotas.value.push({
        codigoCurso: codigoCurso,
        curso: getNombreCurso(codigoCurso),
        nota: nota,
      });
      cursoYaExiste.value = false;
    }
  } else if (codigoCurso !== 0) {
    if (cursoIndex !== -1) {
      // Elimina el elemento en la posición `cursoIndex`
      cursosNotas.value.splice(cursoIndex, 1);
    }
  }
};

/*   const agregarNotasDeCursos = (curso, nota) => {
    // Manejar cambios en las notas aquí
    //console.log(`Nota del curso ${curso.curso} en ${bloque} modificada a ${curso.nota}`);

    cursoNotas.value.push({
        codigoCurso : curso,
        nota : nota
    });
    console.log(cursoNotas.value)

  }; */

//Método para guardar nuevo bloque y cursos
//ENVIAR FORMULARIO
const deshabilitarComponentes = ref(false);
const submitForm = async () => {
  if (
    !cursosNotas.value ||
    !imgEstudiante.value ||
    !numeroDeBloque.value ||
    numeroDeBloque.value == 0
  ) {
    return Swal.fire({
      title: "Advertencia",
      text: `Por favor, complete todos los campos.`,
      icon: "warning",
    });
  }

  deshabilitarComponentes.value = true;

  const formData = new FormData();
  formData.append("Bloque", numeroDeBloque.value);
  formData.append("ImgEstudiante", imgEstudiante.value);
  formData.append("ImgFicha", imgFicha.value);
  formData.append("ImgCarta", imgCarta.value);

  // Agregando cada curso en el array "cursosNotas"
  cursosNotas.value.forEach((curso, index) => {
    formData.append(`Cursos[${index}].CodigoCurso`, curso.codigoCurso);
    formData.append(`Cursos[${index}].Nota`, curso.nota);
  });
  try {
    if (!authStore.token) {
      return Swal.fire({
        title: "Error",
        text: `No estás autorizado para realizar esta acción.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });
    }

    const headers = {
      Authorization: `Bearer ${authStore.token}`,
    };

    const response = await fetch(
      `${baseApiBackend}/api/fichacalificacion/crearNuevoBloque/${parametro}`,
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    if (response.ok) {
      console.log(response.data);
      console.log(response);
      Swal.fire({
        title: "¡Creado!",
        text: `El nuevo bloque se ha creado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      getInformacionFichaCalificacion();
      getCursosDeFicha();

      imgEstudiante.value = "";
      imgFicha.value = "";
      imgCarta.value = "";
      cursosNotas.value = [];
      numeroDeBloque.value = 0;

      deshabilitarComponentes.value = false;
    } else {
      Swal.fire({
        title: "Error",
        text: `Hubo un error al intentar crear el nuevo bloque.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });

      deshabilitarComponentes.value = false;
    }
  } catch (error) {
    deshabilitarComponentes.value = false;
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar crear el nuevo bloque.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//#region Agregar cursos
const notaInput = ref(0);
const cursosNotas = ref([]);
const codigoCurso = ref("");
const cursoYaExiste = ref("");
const agregarCurso = () => {
  if (
    notaInput.value !== 0 &&
    notaInput.value !== "" &&
    codigoCurso.value !== 0 &&
    codigoCurso.value !== ""
  ) {
    const codigoCursoExistente = cursosNotas.value.find(
      (curso) => curso.codigoCurso === codigoCurso.value
    );
    if (!codigoCursoExistente) {
      cursosNotas.value.push({
        codigoCurso: codigoCurso.value,
        curso: getNombreCurso(codigoCurso.value),
        nota: notaInput.value,
      });
      notaInput.value = ""; // Limpiar el input después de agregar
      cursoYaExiste.value = false;
    } else {
      cursoYaExiste.value = true;
    }
  }
};

function getNombreCurso(codigo) {
  // Función para obtener el nombre del curso basado en el código
  const curso = cursos.value.find((curso) => curso.codigoCurso === codigo);
  return curso ? curso.nombreCurso : "";
}

const eliminarCurso = (index) => {
  cursosNotas.value.splice(index, 1);
};

//#endregion

//#region mostrar loading
const mostrarBarraLoading = ref(true);
//#endregion

//#region Exportar en PDF
import html2pdf from "html2pdf.js";
const ocultarElementos = ref(true);

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.5,
    filename: "fichaEscolar.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};
//#endregion
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 85px;
}
</style>
