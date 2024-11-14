<template>
  <div class="row justify-content-center" v-if="authStore.moduloRegistro">
    <div class="row col-11">
      <h3>Registro de estudiante</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/students' }"> Estudiantes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Nuevo registro</a>
          </div>
        </div>
      </div>
      <div class="card border border-success">
        <div class="card-body">
          <form enctype="multipart/form-data" @submit.prevent="submitForm">
            <div class="row">
              <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
              </p>

              <h4>Información del estudiante</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Código<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-key"></i>
                  </span>
                  <input
                    autofocus
                    id="codigoBecario"
                    required
                    type="text"
                    class="form-control"
                    v-model="codigoBecario"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nombre<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-n"></i>
                  </span>
                  <input
                    autofocus
                    id="nombreEstudiante"
                    required
                    type="text"
                    v-model="nombreEstudiante"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Apellido<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-a"></i>
                  </span>
                  <input
                    autofocus
                    id="apellidoEstudiante"
                    required
                    type="text"
                    v-model="apellidoEstudiante"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fecha de nacimiento<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="fechaNacimiento"
                    required
                    type="date"
                    v-model="fechaNacimiento"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Género</label>
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="generoRadio"
                    id="inlineRadio1"
                    value="M"
                    v-model="genero"
                  />
                  <label class="form-check-label" for="inlineRadio1">Masculino</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="generoRadio"
                    id="inlineRadio2"
                    value="F"
                    v-model="genero"
                  />
                  <label class="form-check-label" for="inlineRadio2">Femenino</label>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput" class="form-label">Estado</label>
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="estadoRadio"
                    id="inlineRadio1"
                    value="A"
                    v-model="estado"
                  />
                  <label class="form-check-label" for="inlineRadio1">Activo</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="estadoRadio"
                    id="inlineRadio2"
                    value="I"
                    v-model="estado"
                  />
                  <label class="form-check-label" for="inlineRadio2">Inactivo</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Numero de teléfono</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="telefonoEstudiante"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Correo electrónico</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-at"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="email"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Residencia</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Comunidad/Cantón<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-home"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoComunidad"
                    v-model="codigoComunidad"
                    required
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona comunidad</option>
                    <template v-for="tipo in comunidades" :key="tipo.codigoComunidad">
                      <option :value="tipo.codigoComunidad">
                        {{ tipo.nombreComunidad }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Sector</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input
                    autofocus
                    type="number"
                    v-model="sector"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Número de casa</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-street-view"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="numeroCasa"
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
              <h4>Información académica</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nivel académico<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoNivelAcademico"
                    v-model="codigoNivelAcademico"
                    @change="opcionSeleccionada"
                    required
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona nivel academico</option>
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
                <label for="exampleFormControlInput1" class="form-label"
                  >Grado<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-stairs"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoGrado"
                    v-model="codigoGrado"
                    required
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona grado</option>
                    <template v-for="tipo in grados" :key="tipo.codigoGrado">
                      <option :value="tipo.codigoGrado">
                        {{ tipo.nombreGrado }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
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
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Establecimiento<span class="text-danger">*</span>
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
                    id="codigoGrado"
                    v-model="codigoEstablecimiento"
                    required
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
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Modalidad<span class="text-danger">*</span></label
                >
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
              <h4>Información familiar</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nombre del padre<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-person"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="nombrePadre"
                    class="form-control"
                    required
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Teléfono del padre</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="telefonoPadre"
                    class="form-control"
                    maxLength="8"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Oficio<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-business-time"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="oficioPadre"
                    class="form-control"
                    required
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nombre de la madre<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-person-dress"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="nombreMadre"
                    class="form-control"
                    required
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Teléfono de la madre</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="telefonoMadre"
                    class="form-control"
                    maxLength="8"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Oficio<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-business-time"></i>
                  </span>
                  <input
                    autofocus
                    type="text"
                    v-model="oficioMadre"
                    class="form-control"
                    required
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
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
                  >Fecha de registro<span class="text-danger">*</span></label
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
                    v-model="fechaRegistro"
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
const baseApiBackend = import.meta.env.VITE_BACKEND_API;
import Swal from "sweetalert2";
import Modal from "../../components/Modal.vue";

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

//#region MODALES
const title = ref("Nuevo Registro");
const mostrarAlertaSuccess = ref(false);
const mostrarAlertaDanger = ref(false);
const mostrarLoading = ref(false);

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
      if ((response.data.estatus = true)) {
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
      if ((response.data.estatus = true)) {
        mostrarAlertaSuccess.value = true;
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

const bloquearComponenteCarrera = ref(true);
const opcionSeleccionada = () => {
  if (codigoNivelAcademico.value >= 3) {
    bloquearComponenteCarrera.value = false;
  } else {
    bloquearComponenteCarrera.value = true;
  }

  carrerasFiltradas.value = carreras.value.filter(
    (carrera) => carrera.codigoNivelAcademico == codigoNivelAcademico.value
  );
};
//#endregion

const codigoNivelAcademico = ref(0);
const codigoBecario = ref("");
const codigoComunidad = ref(0);
const codigoGrado = ref(0);
const codigoCarrera = ref(0);
const codigoEstablecimiento = ref(0);
const codigoModalidadEstudio = ref(0);
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const fechaNacimiento = ref("");
const genero = ref("M");
const estado = ref("A");
const telefonoEstudiante = ref("");
const email = ref("");
const sector = ref(0);
const numeroCasa = ref("");
const descripcion = ref("");
const nombrePadre = ref("");
const telefonoPadre = ref("");
const oficioPadre = ref("");
const nombreMadre = ref("");
const telefonoMadre = ref("");
const oficioMadre = ref("");
const imagen = ref(null);
const fechaRegistro = ref("");

const deshabilitarComponentes = ref(false);

const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const comunidades = ref([]);

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

const carrerasFiltradas = ref([]);
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

const getComunidades = async () => {
  try {
    const response = await axios.get("/api/comunidad/selectAll");
    comunidades.value = response.data.filter(
      (comunidad) => comunidad.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de comunidades.`,
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

onMounted(async () => {
  getNivelesAcademicos();
  getGrados();
  getCarreras();
  getEstablecimientos();
  getComunidades();
  getModalidadesEstudios();
});

const handleFileChange = (event) => {
  imagen.value = event.target.files[0];
};

const submitForm = async () => {
  if (
    !codigoBecario.value ||
    !nombreEstudiante.value ||
    !apellidoEstudiante.value ||
    !fechaNacimiento.value ||
    !genero.value ||
    !estado.value ||
    !codigoComunidad.value ||
    !codigoNivelAcademico.value ||
    !codigoGrado.value ||
    !codigoEstablecimiento.value ||
    !nombrePadre.value ||
    !nombreMadre.value ||
    !oficioPadre.value ||
    !oficioMadre.value ||
    !imagen.value ||
    !fechaRegistro.value
  ) {
    return Swal.fire({
      icon: "warning",
      title: "Completa todos los campos antes de enviar",
      showConfirmButton: false, // Ocultar el botón "Aceptar"
      timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
    });
  }
  deshabilitarComponentes.value = true;

  const formData = new FormData();
  formData.append("CodigoBecario", codigoBecario.value);
  formData.append("CodigoComunidad", codigoComunidad.value);
  formData.append("CodigoNivelAcademico", codigoNivelAcademico.value);
  formData.append("CodigoGrado", codigoGrado.value);
  formData.append("CodigoCarrera", codigoCarrera.value);
  formData.append("CodigoEstablecimiento", codigoEstablecimiento.value);
  formData.append("CodigoModalidadEstudio", codigoModalidadEstudio.value);
  formData.append("NombreEstudiante", nombreEstudiante.value);
  formData.append("ApellidoEstudiante", apellidoEstudiante.value);
  formData.append("FechaNacimiento", fechaNacimiento.value);
  formData.append("Genero", genero.value);
  formData.append("Estado", estado.value);
  formData.append("TelefonoEstudiante", telefonoEstudiante.value);
  formData.append("Email", email.value);
  formData.append("Sector", sector.value);
  formData.append("numeroCasa", numeroCasa.value);
  formData.append("Descripcion", descripcion.value);
  formData.append("NombrePadre", nombrePadre.value);
  formData.append("TelefonoPadre", telefonoPadre.value);
  formData.append("OficioPadre", oficioPadre.value);
  formData.append("NombreMadre", nombreMadre.value);
  formData.append("TelefonoMadre", telefonoMadre.value);
  formData.append("OficioMadre", oficioMadre.value);
  formData.append("ImagenEstudiante", imagen.value);
  formData.append("FechaRegistro", fechaRegistro.value);

  try {
    if (!authStore.token) {
      return alert("No estás autorizado para realizar esta acción.");
    }

    const headers = {
      Authorization: `Bearer ${authStore.token}`,
    };

    const response = await fetch(`${baseApiBackend}/api/estudiante/create`, {
      method: "POST",
      body: formData,
      headers,
    });

    if (response.ok) {
      Swal.fire({
        title: "¡Creado!",
        text: `El estudiante se ha creado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      codigoNivelAcademico.value = 0;
      codigoBecario.value = "";
      codigoComunidad.value = 0;
      codigoGrado.value = 0;
      codigoCarrera.value = "";
      codigoEstablecimiento.value = 0;
      nombreEstudiante.value = "";
      apellidoEstudiante.value = "";
      fechaNacimiento.value = "";
      genero.value = "";
      estado.value = "";
      telefonoEstudiante.value = "";
      email.value = "";
      sector.value = "";
      numeroCasa.value = "";
      descripcion.value = "";
      nombrePadre.value = "";
      telefonoPadre.value = "";
      oficioPadre.value = "";
      nombreMadre.value = "";
      telefonoMadre.value = "";
      oficioMadre.value = "";
      imagen.value = null;
      fechaRegistro.value = "";
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un error al intentar crear el estudiante",
        showConfirmButton: false, // Ocultar el botón "Aceptar"
        timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
      });
    }

    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "¡Error!",
      text: "Hubo un error al intentar crear el estudiante",
      showConfirmButton: false, // Ocultar el botón "Aceptar"
      timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
    });
    deshabilitarComponentes.value = false;
  }
};
</script>

<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 25px;
}
</style>
