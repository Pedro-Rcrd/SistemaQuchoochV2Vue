<template>
  <div class="row justify-content-center mt-1">
    <div class="col-md-11">
      <h3>Registro de Ficha de calificaciones</h3>
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
            <a class="text-dark" href="#">Nuevo registro</a>
          </div>
        </div>
      </div>
      <div class="card border border-success">
        <div class="card-body">
          <form enctype="multipart/form-data">
            <div class="row">
              <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
              </p>
              <h4>Información de la Ficha</h4>
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Estudiante</label
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
                    placeholder="Buscar estudiante"
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
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Ciclo escolar</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="cicloEscolar"
                    required
                    type="date"
                    class="form-control"
                    v-model="cicloEscolar"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Establecimiento
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#modalEstablecimiento"
                    style="font-size: 14px"
                    class="fas fa-circle-plus"
                    @click="noMostrarAlertas()"
                  ></i
                ></label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-school"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoEstablecimiento"
                    v-model="codigoEstablecimiento"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona establecimiento</option>
                    <template
                      v-for="tipo in establecimientos"
                      :key="tipo.codigoEstablecimiento"
                    >
                      <option :value="tipo.codigoEstablecimiento">
                        {{ tipo.nombreEstablecimiento }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nivel Academico</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="tipocliente"
                    v-model="codigoNivelAcademico"
                    @change="opcionSeleccionada"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>
                      Selecciona tipo nivel academico
                    </option>
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
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Grado</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-stairs"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoGrado"
                    v-model="codigoGrado"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona el grado</option>
                    <template v-for="tipo in grados" :key="tipo.codigoGrado">
                      <option :value="tipo.codigoGrado">
                        {{ tipo.nombreGrado }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-chart-line"></i>
                  </span>
                  <input
                    autofocus
                    id="nombreEstudiante"
                    type="number"
                    class="form-control"
                    v-model="bloque"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Carrera
                  <span
                    ><i
                      data-bs-toggle="modal"
                      data-bs-target="#modalCarrera"
                      style="font-size: 14px"
                      class="fas fa-circle-plus"
                      @click="noMostrarAlertas()"
                      :disabled="deshabilitarComponentes"
                    ></i></span
                ></label>

                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-book"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoCarrera"
                    v-model="codigoCarrera"
                    :disabled="bloquearComponenteCarrera"
                  >
                    <option value="" selected>Selecciona carrera</option>
                    <template v-for="tipo in carrerasFiltradas" :key="tipo.codigoCarrera">
                      <option :value="tipo.codigoCarrera">
                        {{ tipo.nombreCarrera }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Modalidad</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-home"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoModalidad"
                    v-model="codigoModalidadEstudio"
                    required
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona modalidad</option>
                    <template
                      v-for="tipo in modalidadesEstudios"
                      :key="tipo.codigoModalidadEstudio"
                    >
                      <option :value="tipo.codigoModalidadEstudio">
                        {{ tipo.nombreModalidadEstudio }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Información de los cursos</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Curso
                  <span
                    ><i
                      data-bs-toggle="modal"
                      data-bs-target="#modalCurso"
                      style="font-size: 14px"
                      class="fas fa-circle-plus"
                      @click="noMostrarAlertas()"
                      :disabled="deshabilitarComponentes"
                    ></i></span
                ></label>

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
                    <option value="" disabled selected>Selecciona curso</option>
                    <template v-for="tipo in cursosFiltrados" :key="tipo.codigoCurso">
                      <option :value="tipo.codigoCurso">
                        {{ tipo.nombreCurso }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Nota</label>
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
                <label for="exampleFormControlInput1" class="form-label">Agregar</label>
                <div class="input-group">
                  <span class="input-group-text" @click.prevent="agregarCurso">
                    <i style="font-size: 24px" class="fa-solid fa-circle-plus"></i>
                  </span>
                </div>
              </div>
              <div class="alert alert-danger" role="alert" v-show="cursoYaExiste">
                El curso seleccionado ya existe en la lista.
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
                      <tr v-for="(cursoNota, index) in cursosNotas" :key="index">
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
                    required
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
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fecha de registro</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="fechaRegistro"
                    v-model="fechaRegistro"
                    required
                    type="date"
                    class="form-control"
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

  <!--Modal para establecimientos-->
  <Modal :id="'modalEstablecimiento'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El establecimiento fue creado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar el establecimiento!
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
              v-model="formEstablecimiento.nombreEstablecimiento"
              placeholder="Establecimiento"
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
  <Modal :id="'modalCarrera'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡La carrera fue creada correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar la carrera!
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
        <form @submit.prevent="save(2)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formCarrera.nombreCarrera"
              placeholder="Carrera"
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
                v-model="formCarrera.codigoNivelAcademico"
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
        <form @submit.prevent="save(3)">
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
import { onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import Modal from "../../components/Modal.vue";
import Datepicker from "vue3-datepicker";
const baseApiBackend = import.meta.env.VITE_BACKEND_API;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

//Disable
const title = ref("Nuevo Registro");
const mostrarAlertaSuccess = ref(false);
const mostrarAlertaDanger = ref(false);
const mostrarLoading = ref(false);

const deshabilitarComponentes = ref(false);
const cursoYaExiste = ref(false);

const noMostrarAlertas = () => {
  mostrarAlertaSuccess.value = false;
  mostrarAlertaDanger.value = false;
  mostrarLoading.value = false;
  formCarrera.value.nombreCarrera = "";
  formCarrera.value.codigoNivelAcademico = "";
  formCurso.value.nombreCurso = "";
  formCurso.value.codigoNivelAcademico = "";
  formEstablecimiento.value.nombreEstablecimiento = "";
};

const formEstablecimiento = ref({
  nombreEstablecimiento: "",
  estatus: "A",
});
const formCarrera = ref({
  codigoNivelAcademico: 0,
  nombreCarrera: "",
  estatus: "A",
});

const formCurso = ref({
  codigoNivelAcademico: 0,
  nombreCurso: "",
  estatus: "A",
});
const save = async (opcion) => {
  if (opcion == 1) {
    try {
      mostrarLoading.value = true;
      const response = await axios.post(
        "/api/establecimiento/create",
        formEstablecimiento.value
      );
      mostrarLoading.value = false;
      if ((response.data.status = true)) {
        mostrarAlertaSuccess.value = true;
        await getEstablecimientos();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  } else if (opcion == 2) {
    try {
      mostrarLoading.value = true;
      const response = await axios.post("/api/carrera/create", formCarrera.value);
      mostrarLoading.value = false;
      if ((response.data.status = true)) {
        mostrarAlertaSuccess.value = true;
        await getCarreras();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  } else {
    try {
      mostrarLoading.value = true;
      const response = await axios.post("/api/curso/create", formCurso.value);
      mostrarLoading.value = false;
      if ((response.data.status = true)) {
        mostrarAlertaSuccess.value = true;
        await getCursos();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  }
};

const fechaRegistro = ref("");
const cicloEscolar = ref(0);
const codigoEstablecimiento = ref("");
const codigoNivelAcademico = ref("");
const codigoModalidadEstudio = ref("");
const codigoGrado = ref("");
const codigoEstudiante = ref(0);
const codigoCarrera = ref("");
const codigoCurso = ref(0);
const bloque = ref(1);
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);
const estatusFicha = ref("A");

//boton

const cursosNotas = ref([]);

const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const cursos = ref([]);

//ESTUDIANTE
const estudiantes = ref([]);
const visibilidad = ref([]);
const busqueda = ref("");
const mostrarLista = ref(true);

const notaInput = ref(0);
const agregarCurso = () => {
  if (notaInput.value !== 0 && notaInput.value !== "" && codigoCurso.value !== 0) {
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

//nueva
const idEstudiante = ref(0);
const seleccionarEstudiante = (estudiante) => {
  idEstudiante.value = estudiante.codigoEstudiante;
  busqueda.value = estudiante.nombreEstudiante + " " + estudiante.apellidoEstudiante;
  mostrarLista.value = false; // Ocultar la lista después de seleccionar
};

const getNivelesAcademicos = async () => {
  try {
    const response = await axios.get("/api/nivelAcademico/selectAll");
    nivelesAcademicos.value = response.data.filter(
      (nivelAcademico) => nivelAcademico.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de niveles académicos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getGrados = async () => {
  try {
    const response = await axios.get("/api/grado/selectAll");
    grados.value = response.data.filter(
      (grado) => grado.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de grados académicos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const carrerasFiltradas = ref("");
const getCarreras = async () => {
  try {
    const response = await axios.get("/api/carrera/selectAll");
    carreras.value = response.data.filter(
      (carrera) => carrera.estatus.trim().toUpperCase() === "A"
    );
    carrerasFiltradas.value = carreras.value;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de carreras.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getEstablecimientos = async () => {
  try {
    const response = await axios.get("/api/establecimiento/selectAll");
    establecimientos.value = response.data.filter(
      (establecimiento) => establecimiento.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de establecimientos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const cursosFiltrados = ref("");
const getCursos = async () => {
  try {
    const response = await axios.get("/api/curso/selectAll");
    cursos.value = response.data.filter(
      (curso) => curso.estatus.trim().toUpperCase() === "A"
    );
    cursosFiltrados.value = cursos.value;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

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

const modalidadesEstudios = ref();
const getModalidadesEstudios = async () => {
  try {
    const response = await axios.get("/api/modalidadEstudio/selectAll");
    modalidadesEstudios.value = response.data.filter(
      (modalidad) => modalidad.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de modalidades de estudios.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const handleFileChange = (event) => {
  imgEstudiante.value = event.target.files[0];
};

const handleFileChangeFicha = (event) => {
  imgFicha.value = event.target.files[0];
};

const handleFileChangeCarta = (event) => {
  imgCarta.value = event.target.files[0];
};

onMounted(async () => {
  getNivelesAcademicos();
  getGrados();
  getCarreras();
  getEstablecimientos();
  getCursos();
  getEstudiantes();
  getModalidadesEstudios();
});

//ENVIAR FORMULARIO
const submitForm = async () => {
  if (
    !fechaRegistro.value ||
    !codigoEstablecimiento.value ||
    !cursosNotas.value ||
    !idEstudiante.value ||
    !codigoNivelAcademico.value ||
    !codigoGrado.value ||
    !codigoModalidadEstudio.value
  ) {
    return Swal.fire({
      title: "Campos vacíos",
      text: `Por favor, complete los campos obligatorios.`,
      icon: "warning",
    });
  }
  deshabilitarComponentes.value = true;

  const formData = new FormData();
  formData.append("CodigoEstudiante", idEstudiante.value);
  formData.append("CodigoEstablecimiento", codigoEstablecimiento.value);
  formData.append("CodigoNivelAcademico", codigoNivelAcademico.value);
  formData.append("CodigoGrado", codigoGrado.value);
  formData.append("CodigoCarrera", codigoCarrera.value);
  formData.append("CodigoModalidadEstudio", codigoModalidadEstudio.value);
  formData.append("CicloEscolar", cicloEscolar.value);
  formData.append("ImgEstudiante", imgEstudiante.value);
  formData.append("ImgFicha", imgFicha.value);
  formData.append("ImgCarta", imgCarta.value);
  formData.append("FechaRegistro", fechaRegistro.value);
  formData.append("Bloque", bloque.value);
  formData.append("Estatus", estatusFicha.value);

  // Agregando cada curso en el array "cursosNotas"
  cursosNotas.value.forEach((curso, index) => {
    formData.append(`Cursos[${index}].CodigoCurso`, curso.codigoCurso);
    formData.append(`Cursos[${index}].Nota`, curso.nota);
  });
  try {
    if (!authStore.token) {
      return alert("No estás autorizado para realizar esta acción.");
    }

    const headers = {
      Authorization: `Bearer ${authStore.token}`,
    };

    const response = await fetch(`${baseApiBackend}/api/fichacalificacion/createficha`, {
      method: "POST",
      body: formData,
      headers,
    });

    if (response.ok) {
      Swal.fire({
        title: "¡Creado!",
        text: `La ficha de calificaciones se ha creado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      idEstudiante.value = "";
      busqueda.value = "";
      codigoEstablecimiento.value = "";
      codigoNivelAcademico.value = "";
      codigoGrado.value = "";
      codigoCarrera.value = "";
      cicloEscolar.value = "";
      imgEstudiante.value = "";
      imgFicha.value = "";
      imgCarta.value = "";
      fechaRegistro.value = "";
      cursosNotas.value = [];
      codigoCurso.value = "";

      deshabilitarComponentes.value = false;
    } else {
      Swal.fire({
        title: "Error",
        text: `Hubo un error al intentar crear la ficha de calificaciones.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });

      deshabilitarComponentes.value = false;
    }
  } catch (error) {
    deshabilitarComponentes.value = false;
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar crear la ficha de calificación.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//watch(codigoNivelAcademico, (newValue) => {
//  if (!newValue) {
//    //checkbox deshabilitado
//    alert("Nivel Academico sin valor...")
//  } else {
//    //checkbox habilitado
//    alert("Cambio de valor de nivel academico...")
//  }
//  mapeoDeDato(estudiantesSeleccionados.value);
//});

const bloquearComponenteCarrera = ref(true);
const opcionSeleccionada = () => {
  if (codigoNivelAcademico.value >= 3) {
    bloquearComponenteCarrera.value = false;
  } else {
    bloquearComponenteCarrera.value = true;
  }

  cursosFiltrados.value = cursos.value.filter(
    (curso) => curso.codigoNivelAcademico == codigoNivelAcademico.value
  );
  carrerasFiltradas.value = carreras.value.filter(
    (carrera) => carrera.codigoNivelAcademico == codigoNivelAcademico.value
  );
};
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
