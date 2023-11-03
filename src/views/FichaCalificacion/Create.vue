<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9">
            <h3>Registro de Ficha de calificaciones</h3>
            <hr>
            <div class="col-md-4">
                <div class="d-grid col-10">
                    <router-link :to="{ path: 'cards' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-eye"></i> Lista de fichas
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="card border border-success mt-3">
                
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <h4>Información de la Ficha</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha Registro</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRegistro" v-model="fechaRegistro" required type="date"
                                        class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Ciclo escolar</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="nombreEstudiante" required type="date" class="form-control"
                                        v-model="cicloEscolar">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Establecimiento</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control" id="codigoEstablecimiento" v-model="codigoEstablecimiento">
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

                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nivel Academico</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control" id="tipocliente" v-model="codigoNA">
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
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control" id="codigoGrado" v-model="codigoGrado">
                                        <option value="" disabled selected>
                                            Selecciona el grado
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
                                <label for="exampleFormControlInput1" class="form-label">Estudiante</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                                        @input="buscarEstudiantes" type="text" placeholder="Buscar estudiantes">

                                </div>
                                <ul class="list-group listaFiltro" v-if="mostrarLista">
                                    <li v-for="estudiante in visibilidad" :key="estudiante.codigoEstudiante"
                                        @click="seleccionarEstudiante(estudiante)">
                                        {{ estudiante.nombreEstudiante }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="exampleFormControlInput1" class="form-label">Carrera</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control" id="codigoCarrera" v-model="codigoCarrera">
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
                            <h4>Información de los cursos</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Curso</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control" id="codigoCurso" v-model="codigoCurso">
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
                                <label for="exampleFormControlInput1" class="form-label">Nota</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus id="nombreEstudiante" type="number" class="form-control"
                                        v-model="notaInput">
                                </div>
                            </div>
                            <div class="col-md-4">

                                <div class="input-group mb-3 mt-4">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <button class="btn btn-dark" @click.prevent="agregarCurso">
                                        <i class="fa-solid fa-save"></i>Agregar</button>
                                </div>
                            </div>
                            <div class="alert alert-danger" role="alert" v-show="cursoYaExiste">
                                El curso seleccionado ya está en la lista.
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8 mb-1  justify-content-center">
                                <div class="table-container">
                                    <table class="table table-scroll">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="text-center">#</th>
                                                <th scope="col" class="text-center">Curso</th>
                                                <th scope="col" class="text-center">Nota</th>
                                                <th scope="col" class="text-center">x</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(cursoNota, index) in cursosNotas" :key="index">
                                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                                <td class="text-center">{{ cursoNota.curso }}</td>
                                                <td class="text-center">{{ cursoNota.nota }}</td>
                                                <td class="text-center">
                                                    <i @click.prevent="eliminarCurso(index)"
                                                        class="fa-solid fa-trash btn btn-danger"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
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
                                <label for="exampleFormControlInput1" class="form-label">Imagen de ficha</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenFicha" @change="handleFileChangeFicha"
                                        accept="image/*" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen de carta</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenCarta" @change="handleFileChangeCarta"
                                        accept="image/*" required>
                                </div>
                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'registermenu' }">
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
import { onMounted, ref, watch, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;



const fechaRegistro = ref('');
const cicloEscolar = ref(0);
const codigoEstablecimiento = ref(0);
const codigoNA = ref(0);
const codigoGrado = ref(0);
const codigoEstudiante = ref(0);
const codigoCarrera = ref(0);
const codigoCurso = ref(0);
const bloque = ref(1);
const nota = ref(0);
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);

//boton
const botonDeshabilitado = ref(false);
const cursoYaExiste = ref(false);

const cursosNotas = ref([]);

const busqueda = ref('');
const mostrarLista = ref(true);


const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const cursos = ref([]);

//ESTUDIANTE
const estudiantes = ref([]);
const visibilidad = ref([]);


const notaInput = ref(0);
const agregarCurso = () => {
    if (notaInput.value !== 0 && notaInput.value !== "" && codigoCurso.value !== 0) {
        const codigoCursoExistente = cursosNotas.value.find(curso => curso.CodigoCurso === codigoCurso.value);
        if (!codigoCursoExistente) {
            cursosNotas.value.push({
                CodigoCurso: codigoCurso.value,
                curso: getNombreCurso(codigoCurso.value),
                nota: notaInput.value
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

//Para buscar texto
const buscarEstudiantes = () => {
    const textoBusqueda = busqueda.value.toLowerCase().trim();
    if (textoBusqueda !== '') {
        //return []; // Si la búsqueda está vacía, devuelve una lista vacía
        mostrarLista.value = true;
        visibilidad.value = estudiantes.value.filter(estudiante =>
            estudiante.nombreEstudiante.toLowerCase().includes(textoBusqueda));
    }
};


//nueva
const idEstudiante = ref(0);
const seleccionarEstudiante = (estudiante) => {
    idEstudiante.value = estudiante.codigoEstudiante;
    busqueda.value = estudiante.nombreEstudiante;
    mostrarLista.value = false; // Ocultar la lista después de seleccionar
    // Aquí puedes realizar cualquier otra lógica que necesites con el estudiante seleccionado
    console.log(`El id del estudiantes es: ${idEstudiante.value}`);
};



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
        establecimientos.value = response.data.establecimientos;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};
const getCursos = async () => {
    try {
        const response = await axios.get('/api/curso/getall');
        cursos.value = response.data.cursos;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

const getEstudiantes = async () => {
    try {
        const response = await axios.get('/api/estudiante/selectAll');
        estudiantes.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
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
    getNivelAcademico();
    getGrados();
    getCarreras();
    getEstablecimientos();
    getCursos();
    getEstudiantes();
});


//ENVIAR FORMULARIO
const submitForm = async () => {
    if (!codigoCarrera.value ||
        !fechaRegistro.value ||
        !codigoEstablecimiento.value ||
        !cursosNotas.value ||
        !idEstudiante.value ||
        !codigoNA.value ||
        !codigoGrado.value) {

        return Swal.fire({
            icon: 'warning',
            title: "Completa todos los campos antes de enviar",
            showConfirmButton: false, // Ocultar el botón "Aceptar"
            timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
        });
    }
    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoEstudiante', idEstudiante.value);
    formData.append('CodigoEstablecimiento', codigoEstablecimiento.value);
    formData.append('CodigoNivelAcademico', codigoNA.value);
    formData.append('CodigoGrado', codigoGrado.value)
    formData.append('CodigoCarrera', codigoCarrera.value)
    formData.append('CicloEscolar', cicloEscolar.value)
    formData.append('ImgEstudiante', imgEstudiante.value);
    formData.append('ImgFicha', imgFicha.value);
    formData.append('ImgCarta', imgCarta.value);
    formData.append('FechaRegistro', fechaRegistro.value);

    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

        const response = await fetch('http://localhost:5079/api/fichacalificacion/createficha', {
            method: 'POST',
            body: formData,
            headers,
        });


        if (response.ok) {

            const responseCursos = await axios.post('http://localhost:5079/api/fichacalificacion/createcurso', cursosNotas.value);

            if (responseCursos.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "Ficha de calificación creado satisfactoriamente",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                });

                //router.push({ name: 'cards' });
                idEstudiante.value = "";
                busqueda.value = "";
                codigoEstablecimiento.value = "";
                codigoNA.value = "";
                codigoGrado.value = "";
                codigoCarrera.value = "";
                cicloEscolar.value = "";
                imgEstudiante.value = "";
                imgFicha.value = "";
                imgCarta.value = "";
                fechaRegistro.value = "";
                cursosNotas.value = [];
                codigoCurso.value = "";
                botonDeshabilitado.value = false;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Hubo un error al guardar los cursos y notas",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                });

            }
        } else {
            Swal.fire({
                icon: 'error',
                title: "Hubo un error al crear ficha del estudiante.",
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
            });

        }
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        Swal.fire({
            icon: 'error',
            title: "Hubo un error al crear ficha del estudiante.",
            showConfirmButton: false, // Ocultar el botón "Aceptar"
            timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
        });
    }
};

//NUEVO METODO:
/* const cursoNotas = async () => {
    const cursosNotas2 = [
        { CodigoCurso: 1, Curso: "MATEMATICA", Nota: 23 },
        { CodigoCurso: 2, Curso: "FISICA", Nota: 54 },
        // Agrega más objetos según sea necesario
    ];

    try {
        const response = await axios.post('http://localhost:5079/api/fichacalificacion/createcurso', cursosNotas.value);

        if (response.status === 200) {
            console.log('Cursos y notas guardados con éxito');
        } else {
            console.error('Hubo un error al guardar los cursos y notas');
        }
    } catch (error) {
        console.error('Error al enviar cursos y notas:', error);
    }
};
 */
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
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
    padding: 10px;
    cursor: pointer;
}

.listaFiltro li:hover {
    background-color: #5434b5;
    color: #fff
}
</style>