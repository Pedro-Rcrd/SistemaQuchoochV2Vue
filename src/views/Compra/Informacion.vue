<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Información de la Compra</h3>
            <hr>
            <div class="row row-cols-auto mb-4">
                    <div class="col">
                        <router-link :to="{ path: '/purchasesmenu' }">
                            Menú de compras
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/purchases' }">
                            Compras
                        </router-link>
                    </div>>
                    <div class="col text-primary">
                        <a href="#">Información</a>
                    </div>
                </div>
            <div class="card border">

                <div class="card-body">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-danger " :disabled="botonDeshabilitado"
                            @click.prevent="exportarPDF"><i class="fa-solid fa-file-pdf"></i> Descargar PDF</button>

                    </div>
                    <div class="inf" id="exportarElemento">

                        <h5><strong>Titulo: </strong>{{ titulo }}</h5>
                        <h5><strong>Estado: </strong>{{ estado === 'A' ? 'Activo' : estado === 'F' ? 'Finalizado' : estado
                        }}</h5>
                        <h5><strong>Nombre completo: </strong> {{ nombreEstudiante }} {{ apellidoEstudiante }}</h5>
                        <h5><strong>Código del estudiante: </strong>{{ codigoBecario }}</h5>
                        <h5><strong>Fecha de creación: </strong>{{ fechaCreacion }}</h5>

                        <h5><strong>Total: </strong>{{ total }}</h5>
                        <h5><strong>Descripción: </strong>{{ descripcion }}</h5>
                        <h5><strong>Proveedor: </strong>{{ proveedor }}</h5>
                        <h5><strong>Persona quién recibió: </strong>{{ personaRecibe }}</h5>
                        <br>
                        <h5><strong>Fecha de entrega: </strong>{{ fechaEntrega }}</h5>
                    </div>
                    <br>
                    <br>

                    <div class="row">
                        <h4 class="text-success"><strong>Fotografía</strong></h4>

                        <img :src="imgEstudiante" class="img-thumbnail me-1" alt="Fotografía del estudiante"
                            :style="{ 'max-width': isImagenGrandeEstudiante ? '600px' : '250px', 'max-height': isImagenGrandeEstudiante ? '600px' : '250px' }"
                            @click="toggleImagenGrandeEstudiante">
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

//Método para hacer grandes las imágenes
//Incion de hacer grande la IMAGEN
const isImagenGrandeEstudiante = ref(false);
const toggleImagenGrandeEstudiante = () => {
    isImagenGrandeEstudiante.value = !isImagenGrandeEstudiante.value;
};


//Fin de hacer grande la IMAGEN

//Datos del patrocinador
const estado = ref("");
const titulo = ref("");
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const codigoBecario = ref("");
const proveedor = ref("");
const fechaEntrega = ref("");
const total = ref(0);
const descripcion = ref("");
const personaRecibe = ref("");
const fechaCreacion = ref("");
const imgEstudiante = ref("");




//Fina campos del patrocinador

const botonDeshabilitado = ref(false);

const parametro = route.params.codigoOrdenCompra;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getCompra = async () => {
    try {
        const response = await axios.get(`/api/compra/${parametro}`);
        nombreEstudiante.value = response.data.estudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        codigoBecario.value = response.data.codigoBecario;
        proveedor.value = response.data.proveedor;
        fechaCreacion.value = formatFecha(response.data.fechaCreacion);
        titulo.value = response.data.titulo;
        estado.value = response.data.estado;
        total.value = response.data.total;
        personaRecibe.value = response.data.personaRecibe;
        descripcion.value = response.data.descripcion;
        fechaEntrega.value = formatFecha(response.data.fechaEntrega);
        imgEstudiante.value = response.data.imgEstudiante;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};



onMounted(async () => {

    getCompra();
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