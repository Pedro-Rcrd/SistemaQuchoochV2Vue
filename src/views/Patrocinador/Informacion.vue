<template>
    <div class="row justify-content-center">
        <div class="row col-11">
            <h3>Información del patrocinador</h3>
            <hr>
            <div class="container text-center mb-4 ">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/registermenu' }">
                            Menú de registros
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/sponsors' }">
                            Patrocinadores
                        </router-link>
                    </div>>
                    <div class="col">
                        <a class="text-dark" href="#">Información</a>
                    </div>
                </div>
            </div>
            <div class="card border pt-3" id="exportarElemento">

                <div class="card-body " >
                    <div class="row">
                        <div class="col-5 p-0">
                            <div class="bg-light p-2">
                                <div class="row justify-content-between">
                                    <div class="col-10">
                                        <h5>Detalles del perfil</h5>
                                    </div>
                                    <div class="col-2 pl-5">
                                       <i @click="exportarPDF" style="font-size: 24px;" v-show="ocultarElementos" class="fas fa-circle-down"></i>
                                    </div>
                                </div>
                                <div class="pl-1">
                                    <img :src="fotoPerfil" class="img-thumbnail" alt="Foto de perfil"
                                        style="max-width: 255px; max-height: 255px;">
                                        <span v-show="ocultarElementos"><i @click="abrirImagenEnNuevaVentana" class="fas fa-plus"></i></span>
                                </div>

                                <div class="datos-personales">
                                    <p>{{ nombrePatrocinador }} {{ apellidoPatrocinador }}</p>

                                    <span>Fecha de nacimiento</span>
                                    <p><strong>{{ fechaNacimiento }}</strong></p>


                                    <span>País</span>
                                    <p><strong>{{ nombrePais }}</strong></p>

                                    <span>Estado</span>
                                    <p><strong>{{ estado }}</strong></p>

                                    <span>Fecha de registro</span>
                                    <p><strong>{{ fechaCreacion }}</strong></p>

                                </div>

                            </div>
                        </div>
                        <div class="col-7">
                            <div class="bg-light ml-2">
                                <div class="formacion-academica p-2">
                                    <h5>Formación académica</h5>

                                    <span>Profesión</span>
                                    <p><strong>{{ profesion }}</strong></p>

                                </div>
                            </div>
                        </div>
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
import Swal from 'sweetalert2';
import html2pdf from "html2pdf.js"

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

const parametro = route.params.codigoPatrocinador;
const ocultarElementos = ref(true);

//Variables para datos del patrocinador
const nombrePatrocinador = ref("");
const apellidoPatrocinador = ref("");
const profesion = ref("");
const nombrePais = ref("");
const fechaNacimiento = ref("");
const fechaCreacion = ref("");
const estado = ref("");
const fotoPerfil = ref("./../../public/fotoPerfilEstudiante.png");

//Fina campos de estudiante



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
        const response = await axios.get(`/api/patrocinador/ficha/${parametro}`);
        nombrePatrocinador.value = response.data.nombrePatrocinador;
        apellidoPatrocinador.value = response.data.apellidoPatrocinador;
        profesion.value = response.data.profesion;
        nombrePais.value = response.data.nombrePais;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimiento);
        estado.value = response.data.estado.trim().toUpperCase() == "A" ? "Activo" : "Inactivo";
        fotoPerfil.value = response.data.fotoPerfil;
        fechaCreacion.value = formatFecha(response.data.fechaCreacion);
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la ficha del patrocinador.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
};


onMounted(async () => {
    getPatrocinador();
});


const hola = () => {
    alert("Hola")
}

//#region Método del PDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

//const exportarPDF = () => {
//  descargarPDF(resultadoFiltrado.value);
//}

const descargarPDF = async () => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen
  // Función para cargar una imagen desde una URL
  const base64Img = await convertirImagenABase64(fotoPerfil.value);
  doc.addImage(base64Img, 'JPEG', 10, 10, 70, 70);
  // URL de la imagen alojada en Internet

  // Título del documento
  doc.setTextColor(255, 0, 0);
  doc.text("Reporte de Estudiantes", 10, 20);


  // Guardar el documento como un archivo PDF
  doc.save("ReporteEstudiantes.pdf");
}
//#endregion

const convertirImagenABase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); // Para manejar CORS si es necesario
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL); // Resolver la promesa con la URL en base64
    };

    img.onerror = (err) => {
      reject(err); // Rechazar la promesa si ocurre un error
    };
  });
};

const exportarPDF = async () => {
    ocultarElementos.value = false;
    var element = document.getElementById('exportarElemento');
    var opt = {
        margin: 0.5,
        filename: 'ficha.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
   await html2pdf().from(element).set(opt).save();
   ocultarElementos.value = true;
    
}


const abrirImagenEnNuevaVentana = () => {
      // Usa window.open para abrir una nueva ventana con el enlace base64
      const nuevaVentana = window.open();
      
      // Escribe el contenido HTML en la nueva ventana, incluyendo la imagen base64
      nuevaVentana.document.write(`
        <html>
          <head><title>Imagen de perfil</title></head>
          <body>
            <img style="max-width: 400px; max-height: 400px;" src="${fotoPerfil.value}" alt="Imagen Base64"/>
          </body>
        </html>
      `);
    }
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