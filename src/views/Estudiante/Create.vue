<template>
    <div class="row justify-content-center">
        <div class="row col-11">
            <h3>Registro de estudiante</h3>
            <hr>
            <div class="container text-center mb-4">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/registermenu' }">
                            Menú de registros
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/students' }">
                            Estudiantes
                        </router-link>
                    </div>>
                    <div class="col">
                        <a class="text-dark" href="#">Nuevo registro</a>
                    </div>
                </div>
            </div>
            <div class="card border border-success">

                <div class="card-body">
                    <form enctype="multipart/form-data" @submit.prevent="submitForm">
                        <div class="row">
                            <h4>Información del estudiante</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Código</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-key"></i>
                                    </span>
                                    <input autofocus id="codigoBecario" required type="text" class="form-control"
                                        v-model="codigoBecario">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus id="nombreEstudiante" required type="text"
                                        v-model="nombreEstudiante" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <input autofocus id="apellidoEstudiante" required type="text"
                                        v-model="apellidoEstudiante" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de nacimiento</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaNacimiento" required type="date" v-model="fechaNacimiento"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Género</label>
                                <br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="generoRadio" id="inlineRadio1"
                                        value="M" v-model="genero">
                                    <label class="form-check-label" for="inlineRadio1">Masculino</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="generoRadio" id="inlineRadio2"
                                        value="F" v-model="genero">
                                    <label class="form-check-label" for="inlineRadio2">Femenino</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput" class="form-label">Estado</label>
                                <br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="estadoRadio" id="inlineRadio1"
                                        value="A" v-model="estado">
                                    <label class="form-check-label" for="inlineRadio1">Activo</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="estadoRadio" id="inlineRadio2"
                                        value="I" v-model="estado">
                                    <label class="form-check-label" for="inlineRadio2">Inactivo</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Numero de teléfono</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <input autofocus type="text" v-model="telefonoEstudiante" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Correo electrónico</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-at"></i>
                                    </span>
                                    <input autofocus type="text" v-model="email" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Residencia</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Comunidad/Cantón</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-home"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoComunidad"
                                        v-model="codigoComunidad" required>
                                        <option value="" disabled selected>
                                            Selecciona establecimiento
                                        </option>
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
                                    <input autofocus type="number" v-model="sector" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Número de casa</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-street-view"></i>
                                    </span>
                                    <input autofocus type="text" v-model="numeroCasa" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                                <div class="input-group mb-3">
                                    <input autofocus type="text" v-model="descripcion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Información académica</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nivel académico</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoNivelAcademico"
                                        v-model="codigoNivelAcademico" required>
                                        <option value="" disabled selected>
                                            Selecciona tipo nivel academico
                                        </option>
                                        <template v-for="tipo in nivelesAcademicos" :key="tipo.codigoNivelAcademico">
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
                                    <select class="form-control form-select" id="codigoGrado" v-model="codigoGrado" required>
                                        <option value="" disabled selected>
                                            Selecciona grado
                                        </option>
                                        <template v-for="tipo in grados" :key="tipo.codigoGrado">
                                            <option :value="tipo.codigoGrado">
                                                {{ tipo.nombreGrado }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Carrera</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-book "></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoCarrera" v-model="codigoCarrera">
                                        <option value="" selected>
                                            Selecciona carrera
                                        </option>
                                        <template v-for="tipo in carreras" :key="tipo.codigoCarrera">
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
                                <label for="exampleFormControlInput1" class="form-label">Establecimiento</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-school"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoGrado"
                                        v-model="codigoEstablecimiento" required>
                                        <option value="" disabled selected>
                                            Selecciona establecimiento
                                        </option>
                                        <template v-for="tipo in establecimientos" :key="tipo.codigoEstablecimiento">
                                            <option :value="tipo.codigoEstablecimiento">
                                                {{ tipo.nombreEstablecimiento }}
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
                                    <select class="form-control form-select" id="codigoModalidad"
                                        v-model="codigoModalidadEstudio" required>
                                        <option value="" disabled selected>
                                            Selecciona modalidad
                                        </option>
                                        <template v-for="tipo in modalidadesEstudios" :key="tipo.codigoModalidadEstudio">
                                            <option :value="tipo.codigoModalidadEstudio">
                                                {{ tipo.nombreModalidadEstudio}}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Información familiar</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre del padre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <input autofocus type="text" v-model="nombrePadre" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Teléfono del padre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <input autofocus type="text" v-model="telefonoPadre" class="form-control" maxLength="8">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-business-time"></i>
                                    </span>
                                    <input autofocus type="text" v-model="oficioPadre" class="form-control" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre de la madre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <input autofocus type="text" v-model="nombreMadre" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Teléfono de la madre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <input autofocus type="text" v-model="telefonoMadre" class="form-control" maxLength="8">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-business-time"></i>
                                    </span>
                                    <input autofocus type="text" v-model="oficioMadre" class="form-control" required>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Fotografía del
                                    estudiante</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagen" @change="handleFileChange"
                                        accept="image/*" required>
                                </div>

                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de registro</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRegistro" required type="date" v-model="fechaRegistro"
                                        class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <RouterLink :to="{ name: 'registermenu' }" type="button" class="btn btn-outline-primary ">
                                Cancelar
                            </RouterLink>
                            <button type="submit" class="btn btn-primary text-light" :disabled="botonDeshabilitado"
                            ><i class="fa-solid fa-save"></i> Guardar registro</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
const baseApiBackend = import.meta.env.VITE_BACKEND_API;
import Swal from 'sweetalert2';

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

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

const botonDeshabilitado = ref(false);

const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const comunidades = ref([]);

const getNivelesAcademicos = async () => {
    try {
        const response = await axios.get('/api/nivelAcademico/selectAll');
        nivelesAcademicos.value = response.data.filter(nivelAcademico =>
        nivelAcademico.estatus.trim().toUpperCase() === "A"
        );
    } catch (error) {
      Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de niveles académicos.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
    });
    }
};

const getGrados = async () => {
    try {
        const response = await axios.get('/api/grado/selectAll');
        grados.value = response.data.filter(grado => grado.estatus.trim().toUpperCase() === "A");
    } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de grados académicos.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
    });
    }
};

const getCarreras = async () => {
    try {
        const response = await axios.get('/api/carrera/selectAll');
        carreras.value = response.data.filter(carrera => carrera.estatus.trim().toUpperCase() === "A");
    } catch (error) {
        Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de carreras.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
    });
    }
};

const getEstablecimientos = async () => {
    try {
        const response = await axios.get('/api/establecimiento/selectAll');
        establecimientos.value = response.data.filter(establecimiento => establecimiento.estatus.trim().toUpperCase() === "A");
    } catch (error) {
      Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de establecimientos.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
    });
    }
};

const getComunidades = async () => {
    try {
        const response = await axios.get('/api/comunidad/selectAll');
        comunidades.value = response.data.filter(comunidad => comunidad.estatus.trim().toUpperCase() === "A");
    } catch (error) {
        Swal.fire({
        title: 'Error',
        text: `Hubo un error al intentar obtener la lista de comunidades.`,
        icon: 'error',
        footer: 'Por favor, intente nuevamente más tarde.'
    });
    }
};
const modalidadesEstudios = ref();
const getModalidadesEstudios = async () => {
    try {
        const response = await axios.get('/api/modalidadEstudio/selectAll');
        modalidadesEstudios.value = response.data.filter(modalidad =>
        modalidad.estatus.trim().toUpperCase() === "A"
        );
    } catch (error) {
      Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de modalidades de estudios.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
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
    if (!codigoBecario.value || !nombreEstudiante.value || !apellidoEstudiante.value ||
        !fechaNacimiento.value || !genero.value || !estado.value || !codigoComunidad.value ||
        !codigoNivelAcademico.value || !codigoGrado.value ||
        !codigoEstablecimiento.value || !nombrePadre.value || !nombreMadre.value || !oficioPadre.value || !oficioMadre.value || !imagen.value || !fechaRegistro.value) {
        return Swal.fire({
            icon: 'warning',
            title: "Completa todos los campos antes de enviar",
            showConfirmButton: false, // Ocultar el botón "Aceptar"
            timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
        });
    }
    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoBecario', codigoBecario.value);
    formData.append('CodigoComunidad', codigoComunidad.value);
    formData.append('CodigoNivelAcademico', codigoNivelAcademico.value);
    formData.append('CodigoGrado', codigoGrado.value);
    formData.append('CodigoCarrera', codigoCarrera.value);
    formData.append('CodigoEstablecimiento', codigoEstablecimiento.value);
    formData.append('CodigoModalidadEstudio', codigoModalidadEstudio.value);
    formData.append('NombreEstudiante', nombreEstudiante.value);
    formData.append('ApellidoEstudiante', apellidoEstudiante.value);
    formData.append('FechaNacimiento', fechaNacimiento.value);
    formData.append('Genero', genero.value);
    formData.append('Estado', estado.value);
    formData.append('TelefonoEstudiante', telefonoEstudiante.value);
    formData.append('Email', email.value);
    formData.append('Sector', sector.value);
    formData.append('numeroCasa', numeroCasa.value);
    formData.append('Descripcion', descripcion.value);
    formData.append('NombrePadre', nombrePadre.value);
    formData.append('TelefonoPadre', telefonoPadre.value);
    formData.append('OficioPadre', oficioPadre.value);
    formData.append('NombreMadre', nombreMadre.value);
    formData.append('TelefonoMadre', telefonoMadre.value);
    formData.append('OficioMadre', oficioMadre.value);
    formData.append('ImagenEstudiante', imagen.value);
    formData.append('FechaRegistro', fechaRegistro.value);

    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

        const response = await fetch(`${baseApiBackend}/api/estudiante/create`, {
            method: 'POST',
            body: formData,
            headers,
        });


        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: "Estudiante creado exitosamente",
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
            });

            codigoNivelAcademico.value = (0);
            codigoBecario.value = ("");
            codigoComunidad.value = (0);
            codigoGrado.value = (0);
            codigoCarrera.value = ("");
            codigoEstablecimiento.value = (0);
            nombreEstudiante.value = '';
            apellidoEstudiante.value = '';
            fechaNacimiento.value = '';
            genero.value = '';
            estado.value = '';
            telefonoEstudiante.value = '';
            email.value = '';
            sector.value = '';
            numeroCasa.value = '';
            descripcion.value = '';
            nombrePadre.value = '';
            telefonoPadre.value = '';
            oficioPadre.value = '';
            nombreMadre.value = '';
            telefonoMadre.value = '';
            oficioMadre.value = '';
            imagen.value = null;
            fechaRegistro.value = '';
            botonDeshabilitado.value = false;
        } else {
            Swal.fire({
                icon: 'error',
                title: "Hubo un error al crear el estudiante",
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: "Hubo un error al crear el estudiante",
            showConfirmButton: false,
            timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
        });
    }
};
</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 25px;
}
</style>