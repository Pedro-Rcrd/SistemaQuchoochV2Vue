<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9">
            <h3>Actualizar datos de la Ficha de calificaciones</h3>
            <hr>
            <div class="card border border-success">
                <div class="card-header bg-success border border-success"></div>
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
                                    <input autofocus id="fechaRegistro" required type="date" v-model="fechaRegistro"
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
                                    <select class="form-control" id="codigoGrado" v-model="codigoEstablecimiento">
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
                                    <input autofocus id="nombreEstudiante" required type="number" class="form-control"
                                        v-model="notaInput">
                                </div>
                            </div>
                            <div class="col-md-4">

                                <div class="input-group mb-3 mt-4">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <button class="btn btn-dark" @click.prevent="asignarCurso">
                                        <i class="fa-solid fa-save"></i>Asignar nuevo curso</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <select v-model="bloqueSeleccionado" @change="handleSelectChange"
                                        class="form-control form-select">
                                        <option value="1">Bloque I</option>
                                        <option value="2">Bloque II</option>
                                        <option value="3">Bloque III</option>
                                        <option value="4">Bloque IV</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Curso</th>
                                            <th>Nota</th>
                                            <th>Bloque</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="lc, i in listaCursos" :key="lc.codigoCursoFichaCalificacion">
                                            <td>{{ (i + 1) }}</td>
                                            <td>{{ lc.curso }}</td>
                                            <td :class="{ 'text-danger': lc.nota < 60 }">{{ lc.nota }}</td>
                                            <td>{{ lc.bloque }}</td>
                                            <td>
                                                <button class="btn btn-warning" data-bs-toggle="modal"
                                                    data-bs-target="#modal"
                                                    @click.prevent="$event => openModal(2, lc.codigoCursoFichaCalificacion, lc.codigoCurso, lc.nota)">
                                                    <i class="fa-solid fa-edit"></i>

                                                </button>
                                            </td>
                                            <td>
                                                <button class="btn btn-danger"
                                                    @click.prevent="$event => deleteCursoNotas(lc.codigoCursoFichaCalificacion, lc.curso)">
                                                    <i class="fa-solid fa-trash"></i>

                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
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
                                        accept="image/*">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen de ficha</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenFicha" @change="handleFileChangeFicha"
                                        accept="image/*">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen de carta</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenCarta" @change="handleFileChangeCarta"
                                        accept="image/*">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">

                                <div class="input-group mb-3 mt-4">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <button class="btn btn-dark" @click.prevent="actualizarImgBloque">
                                        <i class="fa-solid fa-save"></i>Actualizar imágenes</button>
                                </div>
                            </div>

                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " @click.prevent="updateFicha"><i
                                    class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'cards' }">
                                <button type="button" class="btn btn-outline-primary">Cancelar</button>
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Modal :id="'modal'" :title="title">
        <div class="modal-body">
            <form @submit.prevent="save">
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-building"></i>
                    </span>
                    <select class="form-control" id="codigoCurso" v-model="form.CodigoCurso">
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

                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-n"></i>
                    </span>
                    <input autofocus id="notaCurso" ref="nameInput" required type="number" class="form-control"
                        v-model="form.Nota">
                </div>
                <div class="d-grid col-10 mx-auto">
                    <button class="btn btn-dark">
                        <i class="fa-solid fa-save"></i> Registrar</button>
                </div>
            </form>
            <div class="modal-footer">
                <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">Cerrar</button>
            </div>

        </div>

    </Modal>
</template>
<script setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { confirmation, sendRequest } from '../../functions'
import Modal from '../../components/Modal.vue'
import Swal from 'sweetalert2';
const baseBackend = import.meta.env.VITE_BAKENDAPI;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;



const fechaRegistro = ref("");
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

//VARIABLE PARA OBTENER EL CODIGO DEL FICHACALIFIACION DETALLE
const codigoFichaDetalle = ref(0);

const formFicha = ref({
    CodigoEstudiante: 3,
    CodigoEstablecimiento: 3,
    CodigoNivelAcademico: 2,
    CodigoGrado: 3,
    CodigoCarrera: 2,
    CicloEscolar: '2023-11-10',
    FechaRegistro: '2023-12-12'
});



//ARRAY QUE GUARDA LOS CURSOS
const cursosNotas = ref([]);

const busqueda = ref('');
const mostrarLista = ref(true);


const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const cursos = ref([]);

const listaCursos = ref([]);
//Inicio de funcinalidada de buscar estudiante
//ESTUDIANTE
const estudiantes = ref([]);
const visibilidad = ref([]);

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

const idEstudiante = ref(0);
const seleccionarEstudiante = (estudiante) => {
    idEstudiante.value = estudiante.codigoEstudiante;
    busqueda.value = estudiante.nombreEstudiante;
    mostrarLista.value = false; // Ocultar la lista después de seleccionar
    // Aquí puedes realizar cualquier otra lógica que necesites con el estudiante seleccionado
    console.log(`El id del estudiantes es: ${idEstudiante.value}`);
};



//Fin funcinalidad de buscar estudiante

//modal------------------
const form = ref({
    CodigoCursoFichaCalificacion: 0,
    CodigoCurso: 0,
    Nota: 0
});
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);

const openModal = (op, codigoCursoFichaCalificacion, codigoCurso, notaCurso) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoCurso;
    if (op == 1) {
        title.value = 'Crear '

    } else {
        title.value = 'Actualizar Curso';
        form.value.CodigoCursoFichaCalificacion = codigoCursoFichaCalificacion;
        form.value.CodigoCurso = codigoCurso;
        form.value.Nota = notaCurso;
    }
}
const clear = () => {
    form.value.CodigoCurso = '';
    form.value.NotaCurso = '';
}
const save = async () => {
    let res;
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Curso/create', '');
        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            //getNivelAcademico(1);
        }
    } else {
        //console.log(`Se llegó a la actualización del cursoNOTA: ${form.value.CodigoCursoFichaCalificacion}`)
        res = await sendRequest('PUT', form.value, `/api/fichacalificacion/updatecursonota/${form.value.CodigoCursoFichaCalificacion}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getListaCursos();
        }

    }
}
//fin modal----------------------

const cambiarColorEstudiante = (estudiante, estado) => {
    estudiante.hover = estado;
};



//DATOS COMPUTADOS
/* const estudiantesFiltrados = computed(() => {
    return buscarEstudiantes();
});

watch(busqueda, () => {
    // Llama a la función de búsqueda cuando cambie el valor de busqueda
    estudiantesFiltrados.value = buscarEstudiantes();
});
 */

//INFORMACIÓN DE FICHA
const parametro = route.params.codigoFichaCalificacion;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getFicha = async () => {
    try {
        const response = await axios.get(`/api/fichacalificacion/getfichaupdate/${parametro}`);
        idEstudiante.value = response.data.codigoEstudiante;
        busqueda.value = response.data.nombreEstudiante;
        codigoEstablecimiento.value = response.data.codigoEstablecimiento;
        codigoNA.value = response.data.codigoNivelAcademico;
        codigoGrado.value = response.data.codigoGrado;
        codigoCarrera.value = response.data.codigoCarrera;
        cicloEscolar.value = formatFecha(response.data.cicloEscolar);
        fechaRegistro.value = formatFecha(response.data.fechaRegistro)

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Bloque seleccionado
const bloqueSeleccionado = ref(1);

//Metodo para llamar al litas de cursos según el bloque
const handleSelectChange = async () => {
    try {
        // Llama a getListaCursos con el valor seleccionado
        await getListaCursos();
    } catch (error) {
        console.error('Error al obtener cursos:', error);
    }
};

//Obtener todos los cursos

const getListaCursos = async () => {
    try {
        const response = await axios.get(`/api/fichacalificacion/obtenerBloques/${parametro}/${bloqueSeleccionado.value}`);
        listaCursos.value = response.data;
        //codigoFichaDetalle.value = response.data.codigoCursoFichaCalificacion;
        const primerCurso = listaCursos.value[0]; // Accede al primer objeto en el array
        codigoFichaDetalle.value = primerCurso.codigoFichaCalificacionDetalle; // Accede al valor 'bloque' del primer curso
        console.log(codigoFichaDetalle.value);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//ELIMINAR CURSO DEL BLOQUE
const deleteCursoNotas = (id, name) => {
    confirmation(name, `/api/FichaCalificacion/deletecursonota/${id}`, `/editcard/${parametro}`, authStore.authToken);
};

//GURADAR CAMBIOS DE FICHA
const updateFicha = async () => {
    const formInput = ref({
        CodigoEstudiante: idEstudiante.value,
        CodigoEstablecimiento: codigoEstablecimiento.value,
        CodigoNivelAcademico: codigoNA.value,
        CodigoGrado: codigoGrado.value,
        CodigoCarrera: codigoCarrera.value,
        CicloEscolar: cicloEscolar.value,
        FechaRegistro: fechaRegistro.value
    });
    let res;
    res = await sendRequest('PUT', formInput.value, `/api/fichacalificacion/update/${parametro}`, '/cards');
    if (res == true) {
        nextTick(() => close.value.click());
    }
}

const asignarCurso = async () => {
    const asignarNuevoCurso = ref({
        CodigoFichaCalificacionDetalle: codigoFichaDetalle.value,
        CodigoCurso: codigoCurso.value,
        Nota: notaInput.value
    });
    let res;
    res = await sendRequest('POST', asignarNuevoCurso.value, `/api/fichacalificacion/asignarcurso`, '');
    if (res == true) {
        nextTick(() => close.value.click());
        getListaCursos();
    }
}


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
    getFicha();
    getListaCursos();
});


//ACTUALIZAR IMGANES DEL BLOQUE
const actualizarImgBloque = async () => {
    const formData = new FormData();
    formData.append('CodigoFichaCalificacion', parametro);
    formData.append('Bloque', bloqueSeleccionado.value);
    formData.append('ImgEstudiante', imgEstudiante.value);
    formData.append('ImgFicha', imgFicha.value);
    formData.append('ImgCarta', imgCarta.value);

    try {

        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

        const response = await fetch(`${baseBackend}/api/fichacalificacion/updatefichadetalleimg/${codigoFichaDetalle.value}`, {
            method: 'PUT',
            body: formData,
            headers,
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success', // Ícono de éxito
                title: 'Imágenes actualizadas exitosamente.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });

            //botonDeshabilitado.value = false;

        } else {
            alert('Hubo un error al crear el estudiante.');
        }

    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
    }

}




//ENVIAR FORMULARIO
const submitForm = async () => {
  
    try {
        let res;
       
        res = await sendRequest('PUT', formFicha.value, `/api/fichacalificacion/update/${parametro}`, '/cards');
        if (res == true) {
            nextTick(() => close.value.click());
            getListaCursos();
        }

    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
    }
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