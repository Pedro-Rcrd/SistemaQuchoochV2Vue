<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Información de la ficha de calificaciones</h3>
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
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-danger " :disabled="botonDeshabilitado"
                            @click.prevent="exportarPDF"><i class="fa-solid fa-file-pdf"></i> Descargar PDF</button>

                    </div>
                    <div class="inf" id="exportarElemento">
                        <h4 class="text-success"><strong>Información de la ficha</strong></h4>

                        <h4><strong>Código: </strong>{{ codigoBecario }}</h4>
                        <h4><strong>Nombre Completo: </strong> {{ nombreEstudiante }} {{ apellidoEstudiante }}</h4>
                        <h4><strong>Establecimiento: </strong>{{ establecimiento }}</h4>
                        <h4><strong>Nivel académico: </strong>{{ nivelAcademico }}</h4>
                        <h4><strong>Grado: </strong>{{ grado }}</h4>
                        <h4><strong>Carrera: </strong>{{ carrera }}</h4>
                        <h4><strong>Ciclo escolar: </strong>{{ cicloEscolar }}</h4>

                        <br>

                        <div class="col-md-12">
                            <h4 class="text-success"><strong>Ficha de calificaciones</strong></h4>
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
                    </div>
                    <br>
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
                        <h4 class="text-success"><strong>Fotografías</strong></h4>

                        <img :src="imgEstudiante" class="img-thumbnail me-1" alt="Fotografía del estudiante"
                            :style="{ 'max-width': isImagenGrande ? '600px' : '235px', 'max-height': isImagenGrande ? '600px' : '235px' }"
                            @click="toggleImagenGrande">

                        <img :src="imgFicha" class="img-thumbnail me-1" alt="Fotografía del estudiante"
                            :style="{ 'max-width': isImagenGrandeFicha ? '600px' : '235px', 'max-height': isImagenGrandeFicha ? '600px' : '235px' }"
                            @click="toggleImagenGrandeFicha">

                        <img :src="imgCarta" class="img-thumbnail me-1" alt="Fotografía del estudiante"
                            :style="{ 'max-width': isImagenGrandeCarta ? '600px' : '235px', 'max-height': isImagenGrandeCarta ? '600px' : '235px' }"
                            @click="toggleImagenGrandeCarta">

                    </div>
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
import html2pdf from "html2pdf.js"

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

//Método para imprimir 
const imprimirFicha = () => {
    window.print();
};

//Inicio metodo para imprimir
const exportarPDF = () => {
    var element = document.getElementById('exportarElemento');
    var opt = {
        margin: 0.5,
        filename: 'formato.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
}
//Fin metodo para imprimir

//Datos del ficha encabezado
const codigoBecario = ref("");
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const establecimiento = ref("");
const nivelAcademico = ref("");
const grado = ref("");
const carrera = ref("");
const cicloEscolar = ref("");
//Fin campos de ficha

//Datos de bloques de fichas
const bloqueI = ref([]);
const bloqueII = ref([]);
const bloqueIII = ref([]);
const bloqueIV = ref([]);
const rows = ref(0);
const load = ref(false)

//Fotografía de los bloques
const bloqueSeleccionado = ref(1);

//Campos de bloques
const imgEstudiante = ref("");
const imgFicha = ref("");
const imgCarta = ref("");

const handleSelectChange = async () => {
    try {
        // Llama a getListaCursos con el valor seleccionado
        await getImgBloque();
    } catch (error) {
        console.error('Error al obtener cursos:', error);
    }
};
//Fina datos de bloques

//Incion de hacer grande la IMAGEN
const isImagenGrande = ref(false);
const toggleImagenGrande = () => {
    isImagenGrande.value = !isImagenGrande.value;
};

//Ficha
const isImagenGrandeFicha = ref(false);
const toggleImagenGrandeFicha = () => {
    isImagenGrandeFicha.value = !isImagenGrandeFicha.value;
};

//Carta
const isImagenGrandeCarta = ref(false);
const toggleImagenGrandeCarta = () => {
    isImagenGrandeCarta.value = !isImagenGrandeCarta.value;
};

//Fin de hacer grande la IMAGEN

const botonDeshabilitado = ref(false);



const parametro = route.params.codigoFichaCalificacion;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    return year.toString();
}


const getFicha = async () => {
    try {
        const response = await axios.get(`/api/fichacalificacion/infoficha/${parametro}`);
        codigoBecario.value = response.data.codigoBecario;
        nombreEstudiante.value = response.data.estudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        establecimiento.value = response.data.establecimiento;
        nivelAcademico.value = response.data.nivelAcademico;
        grado.value = response.data.grado;
        carrera.value = response.data.carrera;
        cicloEscolar.value = formatFecha(response.data.cicloEscolar);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Obtener lo bloque es los cursos
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
const getImgBloque = async () => {
    try {
        const response = await axios.get(`/api/fichacalificacion/bloque/${parametro}/${bloqueSeleccionado.value}`);
        imgEstudiante.value = response.data.imgEstudiante,
            imgFicha.value = response.data.imgFichaCalificacion,
            imgCarta.value = response.data.imgCarta

        if (response.ok) {
            alert("Si hay bloque");
        } else {

        }


    } catch (error) {
        if (error.response && error.response.status === 404) {
            Swal.fire({
                icon: 'error', // Ícono de éxito
                title: 'Aún no se ha registrado el bloque.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });
        } else {
            console.error('Error al obtener usuarios:', error);
        }
    }
};



onMounted(async () => {

    getFicha();
    getCursosBloques();
    getImgBloque();
});




</script>
  
<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 25px;
}

.marco {
    background-color: #768009;

}

.bordeMarco {
    border: 2px solid #768009;
}
</style>