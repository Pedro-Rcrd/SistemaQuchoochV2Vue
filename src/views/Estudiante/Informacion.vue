<template>
    <div class="row justify-content-center">
        <div class="row col-11">
            <h3>Información del estudiante</h3>
            <hr>
            <div class="container text-center mb-4 ">
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
                                    <p>{{ nombreEstudiante }} {{ apellidoEstudiante }}</p>


                                    <span>Código</span>
                                    <p><strong>{{ codigoBecario }}</strong></p>

                                    <span>Teléfono</span>
                                    <p><strong>{{ telefonoEstudiante }}</strong></p>

                                    <span>Correo electrónico</span>
                                    <p><strong>{{ email }}</strong></p>

                                    <span>Dirección</span>
                                    <p><strong>Comunidad {{ comunidad }}, sector {{ sector }}, número de casa {{
                                            numeroCasa }}, {{ descripcion }}</strong></p>

                                    <span>Fecha de nacimiento</span>
                                    <p><strong>{{ fechaNacimiento }}</strong></p>

                                    <span>Género</span>
                                    <p><strong>{{ genero }}</strong></p>

                                    <span>Estado</span>
                                    <p><strong>{{ estado }}</strong></p>

                                </div>

                            </div>
                        </div>
                        <div class="col-7">
                            <div class="bg-light ml-2">
                                <div class="formacion-academica p-2">
                                    <h5>Formación académica</h5>

                                    <span>Nivel académico</span>
                                    <p><strong>{{ grado }} {{ nivelAcademico }}</strong></p>


                                    <span>Carrera</span>
                                    <p><strong>{{ carrera }}</strong>
                                    </p>

                                    <span>Establecimiento</span>
                                    <p><strong>{{ establecimiento }}</strong></p>

                                </div>
                            </div>
                            <div class="bg-light ml-2 mt-5">
                                <div class="Informacion-familiar ml-3">
                                    <h5>Información familiar</h5>

                                    <span>Nombre del padre</span>
                                    <p><strong>{{ nombrePadre }}</strong></p>

                                    <span>Teléfono</span>
                                    <p><strong>{{ telefonoPadre }}</strong></p>

                                    <span>Oficio</span>
                                    <p><strong>{{ oficioPadre }}</strong></p>

                                    <span>Nombre de la madre</span>
                                    <p><strong>{{ nombreMadre }}</strong></p>

                                    <span>Teléfono</span>
                                    <p><strong>{{ telefonoMadre }}</strong></p>

                                    <span>Oficio</span>
                                    <p><strong>{{ oficioMadre }}</strong></p>
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

const ocultarElementos = ref(true);

//Datos del estudiante
const codigoBecario = ref("");
const comunidad = ref("");
const nivelAcademico = ref("");
const grado = ref("");
const carrera = ref("");
const establecimiento = ref("");
const modalidadEstudio = ref("");
const nombreEstudiante = ref("");
const apellidoEstudiante = ref("");
const fechaNacimiento = ref("");
const genero = ref("M");
const estado = ref("");
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
const fotoPerfil = ref("./../../public/fotoPerfilEstudiante.png");
const fechaRegistro = ref("");
//Fina campos de estudiante

const formatearNivelAcademico = (grado, nivelAcademico, modalidad) => {
    const textoNivelAcademico = nivelAcademico.trim().toUpperCase();
    if (nivelAcademico === 4 || textoNivelAcademico === "UNIVERSITARIO") {
        return grado + modalidad;
    }
    return grado;
}
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
        const response = await axios.get(`/api/estudiante/ficha/${parametro}`);
        codigoBecario.value = response.data.codigoBecario;
        comunidad.value = response.data.comunidad;
        nivelAcademico.value = response.data.nivelAcademico;
        grado.value = formatearNivelAcademico(response.data.grado, response.data.nivelAcademico);
        carrera.value = response.data.carrera !== null || response.data.carrera.trim().toUpperCase() !== "Null" ? response.data.carrera : "No aplica";
        establecimiento.value = response.data.establecimiento;
        nombreEstudiante.value = response.data.nombreEstudiante;
        apellidoEstudiante.value = response.data.apellidoEstudiante;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimieto);
        genero.value = response.data.genero.trim().toUpperCase() == "M" ? "Masculino" : "Femenino";
        estado.value = response.data.estado.trim().toUpperCase() == "A" ? "Activo" : "Inactivo";
        telefonoEstudiante.value = response.data.telefonoEstudiante !== null ? response.data.telefonoEstudiante : "0000-0000";
        email.value = response.data.email !== null ? response.data.email : "--";
        sector.value = response.data.sector !== null ? response.data.sector : "--";
        numeroCasa.value = response.data.numeroCasa !== null ? response.data.numeroCasa : "--";
        descripcion.value = response.data.descripcion !== null ? response.data.descripcion : "";
        nombrePadre.value = response.data.nombrePadre;
        telefonoPadre.value = response.data.telefonoPadre;
        oficioPadre.value = response.data.oficioPadre;
        nombreMadre.value = response.data.nombreMadre;
        telefonoMadre.value = response.data.telefonoMadre;
        oficioMadre.value = response.data.oficioMadre;
        fotoPerfil.value = response.data.fotoPerfil;
        fechaRegistro.value = formatFecha(response.data.fechaRegistro);
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la ficha del estudiante.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
};



onMounted(async () => {

    getEstudiante();
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