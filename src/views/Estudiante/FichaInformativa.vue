<template>
  <div class="row justify-content-center">
    <div class="row col-11">
      <h3>Información del estudiante</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/reportmenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/exportreportstudents' }">
              Estudiantes
            </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Información</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
          <p class="placeholder-glow" v-if="mostrarBarraLoading">
            <span class="placeholder col-12 text-success"></span>
          </p>
          <div class="row">
            <div class="col-5 p-0">
              <div class="bg-light p-2">
                <div class="row justify-content-between">
                  <div class="col-10">
                    <h5>Detalles del perfil</h5>
                  </div>
                  <div class="col-2 pl-5">
                    <i
                      @click="descargarPDF"
                      style="font-size: 24px"
                      class="fas fa-circle-down"
                      v-show="!mostrarBarraLoading"
                    ></i>
                  </div>
                </div>
                <div class="pl-1">
                  <img
                    :src="fotoPerfil"
                    class="img-thumbnail"
                    alt="Foto de perfil"
                    style="max-width: 255px; max-height: 255px"
                  />
                  <span
                    ><i @click="abrirImagenEnNuevaVentana" class="fas fa-plus"></i
                  ></span>
                </div>

                <div class="datos-personales">
                  <p>{{ nombreEstudiante }} {{ apellidoEstudiante }}</p>

                  <span>Código</span>
                  <p>
                    <strong>{{ codigoBecario }}</strong>
                  </p>

                  <span>Teléfono</span>
                  <p>
                    <strong>{{ telefonoEstudiante }}</strong>
                  </p>

                  <span>Correo electrónico</span>
                  <p>
                    <strong>{{ email }}</strong>
                  </p>

                  <span>Dirección</span>
                  <p>
                    <strong
                      >{{ comunidad }}, sector {{ sector }}, número de casa
                      {{ numeroCasa }}, {{ descripcion }}</strong
                    >
                  </p>

                  <span>Fecha de nacimiento</span>
                  <p>
                    <strong>{{ fechaNacimiento }}</strong>
                  </p>

                  <span>Género</span>
                  <p>
                    <strong>{{ genero }}</strong>
                  </p>

                  <span>Estado</span>
                  <p>
                    <strong>{{ estado }}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="bg-light ml-2">
                <div class="formacion-academica p-2">
                  <h5>Formación académica</h5>

                  <span>Grado / año</span>
                  <p>
                    <strong>{{ grado }}</strong>
                  </p>

                  <span>Nivel académico</span>
                  <p>
                    <strong>{{ nivelAcademico }}</strong>
                  </p>

                  <span>Carrera</span>
                  <p>
                    <strong>{{ carrera }}</strong>
                  </p>

                  <span>Establecimiento</span>
                  <p>
                    <strong>{{ establecimiento }}</strong>
                  </p>
                </div>
              </div>
              <div class="bg-light ml-2 mt-5">
                <div class="Informacion-familiar ml-3">
                  <h5>Información familiar</h5>

                  <span>Nombre del padre</span>
                  <p>
                    <strong>{{ nombrePadre }}</strong>
                  </p>

                  <span>Teléfono</span>
                  <p>
                    <strong>{{ telefonoPadre }}</strong>
                  </p>

                  <span>Oficio</span>
                  <p>
                    <strong>{{ oficioPadre }}</strong>
                  </p>

                  <span>Nombre de la madre</span>
                  <p>
                    <strong>{{ nombreMadre }}</strong>
                  </p>

                  <span>Teléfono</span>
                  <p>
                    <strong>{{ telefonoMadre }}</strong>
                  </p>

                  <span>Oficio</span>
                  <p>
                    <strong>{{ oficioMadre }}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!--Patrocintadores-->
          <div class="row mt-3">
            <div class="p-0">
              <div class="p-2 text-center">
                <h5>Patrocinadores</h5>
                <hr />
                <div class="row">
                  <div class="col-12 text-center">
                    <!--Tabla-->
                    <table class="table table-striped table-sm text-start">
                      <thead>
                        <tr>
                          <th scope="col" class="text-center">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Apellido</th>
                          <th scope="col">País</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(patrocinador, index) in patrocinadores"
                          :key="patrocinador.id"
                        >
                          <td class="text-center">{{ index + 1 }}</td>
                          <td>{{ patrocinador.nombrePatrocinador }}</td>
                          <td>{{ patrocinador.apellidoPatrocinador }}</td>
                          <td>{{ patrocinador.pais }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";

import { useImageStore } from "../../stores/imageStore";
const imageStore = useImageStore();
const imagenLogoAsociacion = imageStore.ImagenLogoQuchoochVerde;
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const mostrarBarraLoading = ref(false);
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
};
const parametro = route.params.codigoEstudiante;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getEstudiante = async () => {
  try {
    mostrarBarraLoading.value = true;
    const response = await axios.get(`/api/estudiante/ficha/${parametro}`);
    codigoBecario.value = response.data.codigoBecario;
    comunidad.value = response.data.comunidad;
    nivelAcademico.value = response.data.nivelAcademico;
    grado.value = response.data.grado;
    carrera.value = response.data.carrera !== "" ? response.data.carrera : "No aplica";
    establecimiento.value = response.data.establecimiento;
    nombreEstudiante.value = response.data.nombreEstudiante;
    apellidoEstudiante.value = response.data.apellidoEstudiante;
    fechaNacimiento.value = formatFecha(response.data.fechaNacimieto);
    genero.value =
      response.data.genero.trim().toUpperCase() == "M" ? "Masculino" : "Femenino";
    estado.value =
      response.data.estado.trim().toUpperCase() == "A" ? "Activo" : "Inactivo";
    telefonoEstudiante.value =
      response.data.telefonoEstudiante !== null
        ? response.data.telefonoEstudiante
        : "0000-0000";
    email.value = response.data.email !== null ? response.data.email : "--";
    sector.value = response.data.sector !== null ? response.data.sector : "--";
    numeroCasa.value =
      response.data.numeroCasa !== null ? response.data.numeroCasa : "--";
    descripcion.value =
      response.data.descripcion !== null ? response.data.descripcion : "";
    nombrePadre.value = response.data.nombrePadre;
    telefonoPadre.value = response.data.telefonoPadre;
    oficioPadre.value = response.data.oficioPadre;
    nombreMadre.value = response.data.nombreMadre;
    telefonoMadre.value = response.data.telefonoMadre;
    oficioMadre.value = response.data.oficioMadre;
    fotoPerfil.value = response.data.fotoPerfil;
    fechaRegistro.value = formatFecha(response.data.fechaRegistro);

    mostrarBarraLoading.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la ficha del estudiante.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
    mostrarBarraLoading.value = false;
  }
};

//#region Patrocinadores
const patrocinadores = ref("");
const getPatrocinadores = async () => {
  try {
    const response = await axios.get(
      `/api/estudiantePatrocinador/listaPatrocinadores/${parametro}`
    );
    patrocinadores.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los patrocinadores.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};
//#endregion

onMounted(async () => {
  getEstudiante();
  getPatrocinadores();
});

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

//const exportarPDF = () => {
//  descargarPDF(resultadoFiltrado.value);
//}

const descargarPDF = async () => {
  mostrarBarraLoading.value = true;
  // Crear un nuevo documento PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter", // Tamaño carta (8.5 x 11 pulgadas)
  });

  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  doc.addImage(imgData, "JPEG", 41, 11, 15, 15);

  // Configurar el color y la fuente para el texto
  //doc.setTextColor(144, 153, 9); // Color blanco
  doc.setTextColor(128, 128, 0); // Color blanco
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(16);
  doc.text("ASOCIACIÓN QUCHOOCH", 73, 19);
  doc.setFontSize(10);
  doc.text(`"Cultivando Esperanza en el Altiplano Indígena de Guatemala"`, 57, 23);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 30, 410, 45);

  doc.setTextColor(0, 0, 0); // Color blanco
  doc.setFont("times", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(18);
  //doc.text(`TARJETA DE CALIFICACIONES DEL ESTUDIANTE ${cicloEscolar.value}`, 21, 40);
  doc.text(`FICHA INFORMATIVA DEL BENEFICIARIO`, 43, 40);

  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 42, 410, 45);

  //Agregando imagenes
  doc.addImage(fotoPerfil.value, "JPEG", 10, 52, 80, 90);
  //tos del estudainte
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text(`${nombreEstudiante.value} ${apellidoEstudiante.value}`, 100, 55);

  doc.setFont("helvetica", "normal");
  doc.text(`Código`, 100, 65);
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.text(`${codigoBecario.value}`, 100, 71);

  doc.setFont("helvetica", "normal");
  doc.text(`Teléfono`, 100, 81);
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.text(`${telefonoEstudiante.value}`, 100, 87);

  doc.setFont("helvetica", "normal");
  doc.text(`Correo electrónico`, 100, 97);
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.text(`${email.value}`, 100, 103);

  doc.setFont("helvetica", "normal");
  doc.text(`Dirección`, 100, 113);
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.text(`${comunidad.value}`, 100, 119);

  doc.setFont("helvetica", "normal");
  doc.text(`Fecha de nacimiento`, 100, 129);
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.text(`${fechaNacimiento.value}`, 100, 135);

  doc.setFont("helvetica", "normal");
  doc.text(`Estado`, 100, 145);
  doc.setFont("helvetica", "bold");
  doc.text(`${estado.value}`, 100, 151);
  //Barra
  doc.addImage(imagenFondoAsociacion, "JPEG", 10, 155, 410, 1);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Información Académica`, 11, 163);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Nivel académico`, 11, 173);
  doc.setFont("helvetica", "bold");
  doc.text(`${nivelAcademico.value}`, 11, 179);

  doc.setFont("helvetica", "normal");
  doc.text(`Grado / Año`, 11, 189);
  doc.setFont("helvetica", "bold");
  doc.text(`${grado.value}`, 11, 195);

  doc.setFont("helvetica", "normal");
  doc.text(`Carrera`, 11, 205);
  doc.setFont("helvetica", "bold");
  doc.text(`${carrera.value}`, 11, 211);

  doc.setFont("helvetica", "normal");
  doc.text(`Establecimiento`, 11, 221);
  doc.setFont("helvetica", "bold");
  doc.text(`${establecimiento.value}`, 11, 227);

  //Información Familiar
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Información Familiar`, 100, 163);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre del padre`, 100, 173);
  doc.setFont("helvetica", "bold");
  doc.text(`${nombrePadre.value}`, 100, 179);

  doc.setFont("helvetica", "normal");
  doc.text(`Nombre de la madre`, 100, 189);
  doc.setFont("helvetica", "bold");
  doc.text(`${nombreMadre.value}`, 100, 195);

  //Nueva página
  doc.addPage();
  doc.setTextColor(128, 128, 0); // Color blanco
  doc.setFont("helvetica", "bold"); // Fuente Times New Roman o equivalente
  doc.setFontSize(16);
  doc.text(`PATROCINADOR (ES)`, 75, 19);
  //doc.addImage(imagenFondoAsociacion, "JPEG", 10, 199, 410, 1);

  // Encabezados de la tabla
  const headers2 = ["No.", "Nombre", "Apellido", "País"];

  // Datos de la tabla
  const data = patrocinadores.value.map((patrocinador, index) => [
    index + 1,
    patrocinador.nombrePatrocinador,
    patrocinador.apellidoPatrocinador,
    patrocinador.pais,
  ]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: "#909909", // Color de fondo
    textColor: "#FFFFFF", // Color del texto
    fontStyle: "bold", // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headers2],
    body: data,
    startY: 25, // Posición inicial en Y para la tabla
    headStyles: headerStyles, // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("Ficha Informativa del beneficiario.pdf");

  mostrarBarraLoading.value = false;
};

const exportarPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("exportarElemento");
  var opt = {
    margin: 0.5,
    filename: "ficha.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

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
};
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
