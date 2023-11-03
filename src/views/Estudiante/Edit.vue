<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9 ">
            <h3>Editar información del estudiante</h3>
            <hr>
            <div class="card border border-success">
                <div class="card-header bg-success border border-success"></div>
                <div class="card-body">
                    <form enctype="multipart/form-data">
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
                                    <input autofocus id="nombreEstudiante" required type="text" v-model="nombreEstudiante"
                                        class="form-control">
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
                                <div class="input-group mb-3">
                                    <div class="d-flex flex-row">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="generoRadio"
                                                id="flexRadioDefault1" value="M" v-model="genero">
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Masculino
                                            </label>
                                        </div>
                                        <div class="form-check ps-5">
                                            <input class="form-check-input" type="radio" name="generoRadio"
                                                id="flexRadioDefault2" value="F" v-model="genero">
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                Femenino
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput" class="form-label">Estado</label>
                                <div class="d-flex flex-row">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault3" value="A" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Activo
                                        </label>
                                    </div>
                                    <div class="form-check ps-5">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault4" value="I" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault4">
                                            Inactivo
                                        </label>
                                    </div>
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
                                    <select class="form-control form-select" id="codigoComunidad" v-model="codigoComunidad">
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
                                    <input autofocus type="text" v-model="numerocasa" class="form-control">
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
                                    <select class="form-control form-select" id="codigoNivelAcademico" v-model="codigoNA">
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
                                    <select class="form-control form-select" id="codigoGrado" v-model="codigoGrado">
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
                                        <option value="" disabled selected>
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
                            <div class="col-md-12">
                                <label for="exampleFormControlInput1" class="form-label">Establecimiento</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-school"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoGrado"
                                        v-model="codigoEstablecimiento">
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
                        </div>
                        <div class="row">
                            <h4>Información familiar</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre del padre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <input autofocus type="text" v-model="nombrePadre" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Teléfono del padre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <input autofocus type="text" v-model="telefonoPadre" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-business-time"></i>
                                    </span>
                                    <input autofocus type="text" v-model="oficioPadre" class="form-control">
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
                                    <input autofocus type="text" v-model="nombreMadre" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Teléfono de la madre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <input autofocus type="text" v-model="telefonoMadre" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-business-time"></i>
                                    </span>
                                    <input autofocus type="text" v-model="oficioMadre" class="form-control">
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Fotografía del estudiante</label>
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
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'students' }">
                                <button type="button" class="btn btn-outline-primary">Cancelar</button>
                            </RouterLink>
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
import { sendRequest } from '../../functions'
import Swal from 'sweetalert2';
const baseBackend = import.meta.env.VITE_BAKENDAPI;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
const codigoNA = ref(0);
const codigoBecario = ref("");
const codigoComunidad = ref(0);
const codigoGrado = ref(0);
const codigoCarrera = ref(0);
const codigoEstablecimiento = ref(0);
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const fechaNacimiento = ref("");
const genero = ref("M");
const estado = ref("A");
const telefonoEstudiante = ref("");
const email = ref("");
const sector = ref(0);
const numerocasa = ref("");
const descripcion = ref("");
const nombrePadre = ref("");
const telefonoPadre = ref("");
const oficioPadre = ref("");
const nombreMadre = ref("");
const telefonoMadre = ref("");
const oficioMadre = ref("");
const imagen = ref(null);
const fechaRegistro = ref("");
const urlImagen = ref("");

const botonDeshabilitado = ref(false);

const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const comunidades = ref([]);
const idEstudiante = ref(0);

const getNivelAcademico = async () => {
    try {
        const response = await axios.get('/api/nivelacademico/getall');
        nivelesAcademicos.value = response.data.nivelesAcademicos;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

const getGrados = async () => {
    try {
        const response = await axios.get('/api/grado/getall');
        grados.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

const getCarreras = async () => {
    try {
        const response = await axios.get('/api/carrera/getall');
        carreras.value = response.data.carreras;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

const getEstablecimientos = async () => {
    try {
        const response = await axios.get('/api/establecimiento/getall');
        establecimientos.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

const getComunidades = async () => {
    try {
        const response = await axios.get('/api/comunidad/getall');
        comunidades.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};
const parametro = route.params.codigoEstudiante;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getEstudiantes = async () => {
    try {
        const response = await axios.get(`/api/estudiante/getbyid/${parametro}`);
        nombreEstudiante.value = response.data.nombreEstudiante;
        codigoNA.value = response.data.codigoNivelAcademico;
        codigoBecario.value = response.data.codigoBecario;
        codigoComunidad.value = response.data.codigoComunidad;
        codigoGrado.value = response.data.codigoGrado;
        codigoCarrera.value = response.data.codigoCarrera;
        codigoEstablecimiento.value = response.data.codigoEstablecimiento;
        nombreEstudiante.value = response.data.nombreEstudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimieto);
        genero.value = response.data.genero;
        estado.value = response.data.estado;
        telefonoEstudiante.value = response.data.telefonoEstudiante;
        email.value = response.data.email;
        sector.value = response.data.sector;
        numerocasa.value = response.data.numeroCasa;
        descripcion.value = response.data.descripcion;
        nombrePadre.value = response.data.nombrePadre;
        telefonoPadre.value = response.data.telefonoPadre;
        oficioPadre.value = response.data.oficioPadre;
        nombreMadre.value = response.data.nombreMadre;
        telefonoMadre.value = response.data.telefonoMadre;
        oficioMadre.value = response.data.oficioMadre;
        imagen.value = null;
        fechaRegistro.value = formatFecha(response.data.fechaRegistro);
        urlImagen.value = response.data.fotoPerfil;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};



onMounted(async () => {
    getNivelAcademico();
    getGrados();
    getCarreras();
    getEstablecimientos();
    getComunidades();
    getEstudiantes();
});


const handleFileChange = (event) => {
    imagen.value = event.target.files[0];
};

const submitForm = async () => {
    if (!nombreEstudiante.value || !codigoGrado.value) {
        return alert('Completa todos los campos antes de enviar.');
    }


    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoBecario', codigoBecario.value);
    formData.append('CodigoComunidad', codigoComunidad.value);
    formData.append('CodigoNivelAcademico', codigoNA.value);
    formData.append('CodigoGrado', codigoGrado.value);
    formData.append('CodigoCarrera', codigoCarrera.value);
    formData.append('CodigoEstablecimiento', codigoEstablecimiento.value);
    formData.append('NombreEstudiante', nombreEstudiante.value);
    formData.append('ApellidoEstudiante', apellidoEstudiante.value);
    formData.append('FechaNacimieto', fechaNacimiento.value);
    formData.append('Genero', genero.value);
    formData.append('Estado', estado.value);
    formData.append('TelefonoEstudiante', telefonoEstudiante.value);
    formData.append('Email', email.value);
    formData.append('Sector', sector.value);
    formData.append('NumeroCasa', numerocasa.value);
    formData.append('Descripcion', descripcion.value);
    formData.append('NombrePadre', nombrePadre.value);
    formData.append('TelefonoPadre', telefonoPadre.value);
    formData.append('OficioPadre', oficioPadre.value);
    formData.append('NombreMadre', nombreMadre.value);
    formData.append('TelefonoMadre', telefonoMadre.value);
    formData.append('OficioMadre', oficioMadre.value);
    formData.append('ImagenEstudiante', imagen.value);
    formData.append('FechaRegistro', fechaRegistro.value);

    const form = ref({
        CodigoComunidad: codigoComunidad.value,
        CodigoNivelAcademico: codigoNA.value,
        CodigoGrado: codigoGrado.value,
        CodigoCarrera: codigoCarrera.value,
        CodigoEstablecimiento: codigoEstablecimiento.value,
        NombreEstudiante: nombreEstudiante.value,
        ApellidoEstudiante: apellidoEstudiante.value,
        FechaNacimieto: fechaNacimiento.value,
        Genero: genero.value,
        Estado: estado.value,
        TelefonoEstudiante: telefonoEstudiante.value,
        Email: email.value,
        Sector: sector.value,
        NumeroCasa: numerocasa.value,
        Descripcion: descripcion.value,
        NombrePadre: nombrePadre.value,
        TelefonoPadre: telefonoPadre.value,
        OficioPadre: oficioPadre.value,
        NombreMadre: nombreMadre.value,
        TelefonoMadre: telefonoMadre.value,
        OficioMadre: oficioMadre.value,
        FotoPerfil: urlImagen.value,
        FechaRegistro: fechaRegistro.value,
        CodigoBecario: codigoBecario.value
    });


    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };



        if (imagen.value == null) {
            console.log("Primera opción sin imagenes")
            console.log(form.value.NombreEstudiante);
            console.log(`El parametro ${parametro}`)
            let res;

            res = await sendRequest('PUT', form.value, `/api/Estudiante/update/${parametro}`, '/students');
        } else {

            const response = await fetch(`${baseBackend}/api/estudiantes/updateimage/${parametro}`, {
                method: 'PUT',
                body: formData,
                headers,
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success', // Ícono de éxito
                    title: 'Estudiante creado exitosamente.',
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
                });

            } else {
                Swal.fire({
                    icon: 'error', // Ícono de éxito
                    title: 'Hubo un error al registrar estudiante.',
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
                });
            }

        }




    } catch (error) {
        Swal.fire({
            icon: 'error', // Ícono de éxito
            title: 'Hubo un error al registrar estudiante.',
            showConfirmButton: false, // Ocultar el botón "Aceptar"
            timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
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