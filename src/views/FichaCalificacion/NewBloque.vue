<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'
import { useRoute } from 'vue-router';
import router from '@/router';
import Swal from 'sweetalert2';
const route = useRoute();
const baseBackend = import.meta.env.VITE_BAKENDAPI;

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
    getCursosBloques()
})

const cursosBloques = ref([]);
const bloqueI = ref([]);
const bloqueII = ref([]);
const bloqueIII = ref([]);
const bloqueIV = ref([]);

//Bloque seleccionado
const bloqueSeleccionado = ref(2);
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);


const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idEstudiante = ref(0);
const rows = ref(0);

const load = ref(false)

const parametro = route.params.codigoFichaCalificacion;
const getCursosBloques = async () => {
    try {
        const response = await axios.get(`/api/fichacalificacion/obtenerNotasCursos/${parametro}`)
        bloqueI.value = response.data.cursosBloqueI || [];
        bloqueII.value = response.data.cursosBloqueII || [];
        bloqueIII.value = response.data.cursosBloqueIII || [];
        bloqueIV.value = response.data.cursosBloqueIV || [];

        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

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
const cursoNotas = ref([]);
const handleNotaChange = (codigoCurso, nota) => {
    // Buscar si ya existe un objeto con el mismo código de curso
    const cursoIndex = cursoNotas.value.findIndex(curso => curso.codigoCurso === codigoCurso);

    // Si ya existe, actualiza la nota, de lo contrario, agrega un nuevo objeto
    if (cursoIndex !== -1) {
        cursoNotas.value[cursoIndex].nota = nota;
    } else {
        cursoNotas.value.push({
            codigoCurso: codigoCurso,
            nota: nota
        });
    }

    console.log(cursoNotas.value);
};

/*   const handleNotaChange = (curso, nota) => {
    // Manejar cambios en las notas aquí
    //console.log(`Nota del curso ${curso.curso} en ${bloque} modificada a ${curso.nota}`);

    cursoNotas.value.push({
        codigoCurso : curso,
        nota : nota
    });
    console.log(cursoNotas.value)

  }; */




//Método para guardar nuevo bloque y cursos
const submitForm = async () => {
    if (!imgFicha.value || !imgEstudiante ||
        !cursoNotas.value) {
        return Swal.fire({
                    icon: 'warning',
                    title: "Completa todos los campos antes de enviar",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
                });
    }

    const formData = new FormData();
    formData.append('CodigoFichaCalificacion', parametro)
    formData.append('Bloque', bloqueSeleccionado.value)
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

        const response = await fetch(`${baseBackend}/api/fichacalificacion/createnuevobloque`, {
            method: 'POST',
            body: formData,
            headers,
        });
        if (response.status === 400) {
            const errorMessage = await response.text(); // Obtiene el mensaje de error como texto
            //console.log(errorMessage);
            Swal.fire({
                icon: 'warning', // Ícono de éxito
                title: errorMessage,
                showConfirmButton: true, // Ocultar el botón "Aceptar"
                timer: 2000 // Tiempo en milisegundos antes de que se cierre automáticamente
            });
        } else if (response.ok) {

            const responseCursos = await axios.post(`${baseBackend}/api/fichacalificacion/createcursosnuevobloque`, cursoNotas.value);

            if (responseCursos.status === 200) {
                 Swal.fire({
                    icon: 'success',
                    title: "Bloque creado satisfactoriamente",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                }); 

                //router.push({ name: `newblock` });
                getCursosBloques();
                
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Hubo un error al guardar los cursos",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                }); 
            }
        } else {
            Swal.fire({
                    icon: 'error',
                    title: "Hubo un error al guardar el bloque",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                }); 
        }
    } catch (error) {
        Swal.fire({
                    icon: 'error',
                    title: "Hubo un error al guardar el bloque",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
                });
    }
};

</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 85px;
}
</style>

<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Nuevo bloque del ciclo</h3>
            <hr>
            <div class="container text-center mb-4">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/registermenu' }">
                            Menú de registros
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/cards' }">
                            Fichas de calificaciones
                        </router-link>
                    </div>>
                    <div class="col text-primary">
                        <a href="#">Información</a>
                    </div>
                </div>
            </div>
            <div class="card border border-success">
            
                <div class="card-body">
                    
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <div class="card border border-white text-center" v-if="!load">
                                <div class="card-body">
                                    <img src="/loading.gif" alt="img-fluid">
                                </div>
                            </div>
                            <div class="table-responsive" v-else>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Curso</th>
                                            <th>Bloque I</th>
                                            <th>Bloque II</th>
                                            <th>Bloque III</th>
                                            <th>Bloque IV</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="(curso, i) in bloqueI" :key="curso.codigoCursoFichaCalificacion">
                                            <td>{{ (i + 1) }}</td>
                                            <td>{{ curso.curso }}</td>
                                            <td :class="{ 'text-danger': curso.nota > 0 && curso.nota < 60 }">{{ curso.nota
                                            }}</td>
                                            <td :class="{ 'text-danger': bloqueII[i].nota > 0 && bloqueII[i].nota < 60 }">{{
                                                bloqueII[i].nota }}
                                            </td>
                                            <td :class="{ 'text-danger': bloqueIII[i].nota > 0 && bloqueIII[i].nota < 60 }">
                                                {{ bloqueIII[i].nota }}
                                            </td>
                                            <td :class="{ 'text-danger': bloqueIV[i].nota > 0 && bloqueIV[i].nota < 60 }">
                                                {{ bloqueIV[i].nota }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <form enctype="multipart/form-data">
                            <div class="row">

                                <div class="col-md-4">
                                    <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">
                                            <i class="fa-solid fa-phone"></i>
                                        </span>
                                        <select v-model="bloqueSeleccionado" @change="handleSelectChange"
                                            class="form-control form-select">
                                            <option value="2">Bloque II</option>
                                            <option value="3">Bloque III</option>
                                            <option value="4">Bloque IV</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Curso</th>
                                                    <th>Nota</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-group-divider">
                                                <tr v-for="(curso, i) in bloqueI" :key="curso.codigoCursoFichaCalificacion">
                                                    <td>{{ (i + 1) }}</td>
                                                    <td>{{ curso.curso }}</td>
                                                    <td>
                                                        <input type="number" v-model="curso.bloque"
                                                            @change="handleNotaChange(curso.codigoCurso, curso.bloque, i)">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
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
                                    <label for="exampleFormControlInput1" class="form-label">Imagen de ficha</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">
                                            <i class="fa-solid fa-image"></i>
                                        </span>
                                        <input class="form-control" type="file" id="imagenFicha"
                                            @change="handleFileChangeFicha" accept="image/*" required>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="exampleFormControlInput1" class="form-label">Imagen de carta</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">
                                            <i class="fa-solid fa-image"></i>
                                        </span>
                                        <input class="form-control" type="file" id="imagenCarta"
                                            @change="handleFileChangeCarta" accept="image/*" required>
                                    </div>
                                </div>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'cards' }">
                                <button type="button" class="btn btn-outline-primary">Cancelar</button>
                            </RouterLink>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  