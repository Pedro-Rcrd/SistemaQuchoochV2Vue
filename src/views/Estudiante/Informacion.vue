<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center pb-2">
        <div class="col-md-9 ">
            <h3>Información del estudiante</h3>
            <hr>
            <div class="col-md-4">
                <div class="d-grid col-10">
                    <router-link :to="{ name: 'students' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-backward"></i> Regresar
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="card border mt-3">
                
                <div class="card-body">
                    <h5 class="text-success"><strong>Foto de perfil</strong></h5>
                    <img :src="fotoPerfil" class="img-thumbnail" alt="Descripción de la imagen" style="max-width: 300px; max-height: 300px;">
                    <br>
                    <br>
                    <h5><strong>Código: </strong>{{ codigoBecario }}</h5>
                    <h5><strong>Nombre Completo: </strong> {{ nombreEstudiante }} {{ apellidoEstudiante }}</h5>
                    <h5><strong>Fecha de nacimiento: </strong>{{ fechaNacimiento }}</h5>
                    <h5><strong>Género: </strong>{{ genero }}</h5>
                    <h5><strong>Número de teléfono: </strong>{{ telefonoEstudiante }}</h5>
                    <h5><strong>Correo electrónico: </strong>{{ email }}</h5>
                    <br>
                    <h5 class="text-success"><strong>Información de residencia</strong></h5>
                    <h5><strong>Comunidad: </strong>{{ comunidad }}</h5>
                    <h5><strong>Sector: </strong>{{ sector }}</h5>
                    <h5><strong>Número de casa: </strong>{{ numeroCasa }}</h5>
                    <h5><strong>Descripción: </strong>{{ descripcion}}</h5>

                    <br>
                    <h5 class="text-success"><strong>Información académicoa</strong></h5>
                    <h5><strong>Nivel académico: </strong>{{ nivelAcademico}}</h5>
                    <h5><strong>Grado: </strong>{{ grado}}</h5>
                    <h5><strong>Carrera: </strong>{{ carrera}}</h5>
                    <h5><strong>Establecimiento: </strong>{{ establecimiento}}</h5>

                    <br>
                    <h5 class="text-success"><strong>Información familiar</strong></h5>
                    <h5><strong>Nombre del padre: </strong>{{ nombrePadre}}</h5>
                    <h5><strong>Telefono del padre: </strong>{{ telefonoPadre}}</h5>
                    <h5><strong>Oficio del padre: </strong>{{ oficioPadre}}</h5>
                    <br>
                    <h5><strong>Nombre de la madre: </strong>{{ nombreMadre}}</h5>
                    <h5><strong>Telefono de la madre: </strong>{{ telefonoMadre}}</h5>
                    <h5><strong>Oficio de la madre: </strong>{{ oficioMadre}}</h5>

                    <br>
                    <br>
                    <h5><strong>Fecha de registro: </strong>{{ fechaRegistro }}</h5>
                   
                </div>
                <button @click="imprimirFicha" class="btn btn-primary">Imprimir Ficha</button>
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

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

//Método para imprimir 
const imprimirFicha = () => {
  window.print();
};

//Datos del estudiante
const codigoBecario = ref("");
const comunidad = ref("");
const nivelAcademico = ref("");
const grado = ref("");
const carrera = ref("");
const establecimiento = ref("");
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
const fotoPerfil = ref("");
const fechaRegistro = ref("");
const urlImagen = ref("");
//Fina campos de estudiante

const botonDeshabilitado = ref(false);










const parametro = route.params.codigoEstudiante;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getEstudiante = async () => {
    try {
        const response = await axios.get(`/api/estudiante/${parametro}`);
        codigoBecario.value = response.data.codigoBecario;
        comunidad.value = response.data.comunidad;
        nivelAcademico.value = response.data.nivelAcademico;
        grado.value = response.data.grado;
        carrera.value = response.data.carrera;
        establecimiento.value = response.data.establecimiento;
        nombreEstudiante.value = response.data.nombreEstudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimieto);
        genero.value = response.data.genero;
        estado.value = response.data.estado;
        telefonoEstudiante.value = response.data.telefonoEstudiante;
        email.value = response.data.email;
        sector.value = response.data.sector;
        numeroCasa.value = response.data.numeroCasa;
        descripcion.value = response.data.descripcion;
        nombrePadre.value = response.data.nombrePadre;
        telefonoPadre.value = response.data.telefonoPadre;
        oficioPadre.value = response.data.oficioPadre;
        nombreMadre.value = response.data.nombreMadre;
        telefonoMadre.value = response.data.telefonoMadre;
        oficioMadre.value = response.data.oficioMadre;
        fotoPerfil.value = response.data.fotoPerfil;
        fechaRegistro.value = formatFecha(response.data.fechaRegistro);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};



onMounted(async () => {

    getEstudiante();
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