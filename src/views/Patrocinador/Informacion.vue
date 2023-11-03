<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center pb-2">
        <div class="col-md-9 ">
            <h3>Información del Patrocinador</h3>
            <hr>
            <div class="col-md-4">
                <div class="d-grid col-10">
                    <router-link :to="{ name: 'sponsors' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-backward"></i> Regresar
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="card border ">
                <div class="card-body">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-danger " :disabled="botonDeshabilitado"
                            @click.prevent="exportarPDF"><i class="fa-solid fa-file-pdf"></i> Descargar PDF</button>

                    </div>
                    <h5 class="text-success"><strong>Foto de perfil</strong></h5>
                    <img :src="fotoPerfil" class="img-thumbnail" alt="Foto de perfil del patrocinador"
                        style="max-width: 300px; max-height: 300px;">
                    <br>
                    <br>
                    <div class="inf" id="exportarElemento">
                        <h5><strong>Estado: </strong>{{ estado === 'A' ? 'Activo' : estado === 'I' ? 'Inactivo' : estado }}</h5>
                        <h5><strong>Nombre Completo: </strong> {{ nombrePatrocinador }} {{ apellidoPatrocinador }}</h5>
                        <h5><strong>Fecha de nacimiento: </strong>{{ fechaNacimiento }}</h5>
                        <h5><strong>Profeión: </strong>{{ profesion }}</h5>
                        <h5><strong>Pais: </strong>{{ nombrePais }}</h5>
                        <br>
                        <br>
                        <h5><strong>Fecha de creación: </strong>{{ fechaCreacion }}</h5>
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



//Inicio metodo para imprimir
const exportarPDF = () => {
    var element = document.getElementById('exportarElemento');
    var opt = {
        margin: 0.5,
        filename: 'archivo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
}
//Fin metodo para imprimir

//Datos del patrocinador
const nombrePais = ref("");
const nombrePatrocinador = ref("");
const apellidoPatrocinador = ref("");
const profesion = ref("");
const estado = ref("");
const fechaNacimiento = ref("");
const fechaCreacion = ref("");
const fotoPerfil = ref("");

//Fina campos del patrocinador

const botonDeshabilitado = ref(false);

const parametro = route.params.codigoPatrocinador;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getPatrocinador = async () => {
    try {
        const response = await axios.get(`/api/patrocinador/infpatrocinador/${parametro}`);
        nombrePais.value = response.data.nombrePais;
        nombrePatrocinador.value = response.data.nombrePatrocinador;
        apellidoPatrocinador.value = response.data.apellidoPatrocinador;
        profesion.value = response.data.profesion;
        estado.value = response.data.estado;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimiento);
        fechaCreacion.value = formatFecha(response.data.fechaCreacion);
        fotoPerfil.value = response.data.fotoPerfil;

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};



onMounted(async () => {

    getPatrocinador();
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