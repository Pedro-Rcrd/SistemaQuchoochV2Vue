<template>
  <div class="row justify-content-center" v-if="authStore.moduloAsignacion">
    <div class="row col-11">
      <h3>Asignar patrocinador</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/assignmenu' }"> Menú de asignación </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/studentssponsors' }"> Estudiantes </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Nueva asignación</a>
          </div>
        </div>
      </div>
      <div class="card border pt-3" id="exportarElemento">
        <div class="card-body">
          <div class="row">
            <p class="placeholder-glow" v-if="deshabilitarComponentes">
              <span class="placeholder col-12 text-success"></span>
            </p>

            <div class="bg-light p-2">
              <div class="row">
                <p class="placeholder-glow" v-if="mostrarBarraLoading">
                  <span class="placeholder col-12 text-success"></span>
                </p>
              </div>

              <div class="row justify-content-between">
                <div class="col-11">
                  <h5>Detalles del estudiante</h5>
                </div>
                <div class="col-1 text-end">
                  <i
                    @click="exportarPDF"
                    style="font-size: 24px"
                    class="fas fa-circle-down"
                    v-show="ocultarElementos"
                  ></i>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <p class="m-0">Nombre: <strong>Pedro Ricardo Lopez</strong></p>
                  <p class="m-0">Código: <strong>AQ012</strong></p>
                </div>
              </div>
            </div>
            <!--encabezado-->
          </div>

          <div class="row justify-content-center text-center mt-3">
            <h5>
              <i
                @click="exportarExcel"
                v-show="ocultarElementos"
                style="font-size: 17px"
                class="fas fa-file-excel text-success"
              >
              </i>
              Patrocinadores
            </h5>
            <hr />
            <div class="col-md-10 mb-1">
              <div class="table-container">
                <table class="table table-scroll table-sm table-striped">
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col" class="text-start">Nombre</th>
                      <th scope="col" class="text-start">Apellido</th>
                      <th scope="col" class="text-start">Pais</th>
                      <th scope="col" class="text-center" v-show="ocultarElementos">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(patrocinador, index) in patrocinadoresAsignados"
                      :key="index"
                    >
                      <th scope="row">{{ index + 1 }}</th>
                      <td class="text-start">{{ patrocinador.nombrePatrocinador }}</td>
                      <td class="text-start">{{ patrocinador.apellidoPatrocinador }}</td>
                      <td class="text-start">{{ patrocinador.pais }}</td>
                      <td
                        class="text-center"
                        v-show="ocultarElementos"
                        @click="
                          confirmDelete(
                            patrocinador.nombrePatrocinador,
                            patrocinador.codigoEstudiantePatrocinador
                          )
                        "
                      >
                        <i class="fas fa-trash"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!--Nuevo patrocinador-->
          <div class="" v-show="ocultarElementos">
            <div class="row mt-3">
              <h5>Asignar nuevos patrocinadores</h5>
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Patrocinador</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-n"></i>
                  </span>
                  <input
                    class="form-control"
                    autofocus
                    id="codigoEstudiante"
                    required
                    v-model="busqueda"
                    @input="buscarPatrocinador"
                    type="text"
                    placeholder="Buscar patrocinador"
                  />
                </div>
                <ul class="list-group listaFiltro" v-if="mostrarLista">
                  <li
                    v-for="patrocinador in visibilidad"
                    :key="patrocinador.codigoPatrocinador"
                    @click="seleccionarPatrocinador(patrocinador)"
                  >
                    {{ patrocinador.nombrePatrocinador }}
                    {{ patrocinador.apellidoPatrocinador }}
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Agregar</label>
                <div class="input-group">
                  <span class="input-group-text" @click.prevent="agregarPatrocinador">
                    <i style="font-size: 24px" class="fa-solid fa-circle-plus"></i>
                  </span>
                </div>
              </div>
              <div class="alert alert-danger" role="alert" v-show="patrocinadorYaExiste">
                El patrocinador seleccionado ya existe en la lista.
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 mb-1 justify-content-center">
                <div class="table-container">
                  <table class="table table-scroll">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-start">Nombre</th>
                        <th scope="col" class="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(patrocinador, index) in listaNuevosPatrocinadores"
                        :key="index"
                      >
                        <th scope="row" class="text-center">{{ index + 1 }}</th>
                        <td class="text-start">{{ patrocinador.nombrePatrocinador }}</td>
                        <td class="text-center">
                          <i
                            @click.prevent="eliminarPatrocinador(index)"
                            class="fa-solid fa-trash text-red"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <p v-if="deshabilitarComponentes">Cargando...</p>
              <div
                v-if="deshabilitarComponentes"
                class="spinner-border text-dark"
                role="status"
              ></div>

              <RouterLink
                :to="{ name: 'studentssponsors' }"
                type="button"
                class="btn btn-outline-primary"
              >
                Cancelar
              </RouterLink>
              <button
                type="submit"
                @click.prevent="save"
                class="btn btn-primary text-light"
                :disabled="deshabilitarComponentes"
              >
                <i class="fa-solid fa-save"></i> Guardar cambios
              </button>
            </div>
          </div>
          <!--sección agregar nuevos patrocinadores-->
        </div>
        <!--card body-->
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

const route = useRoute();
const parametro = route.params.codigoEstudiante;
const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

const ocultarElementos = ref(true);

//Datos del gasto

//FORMATEAR FECHA
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const deshabilitarComponentes = ref(false);

const patrocinadoresAsignados = ref("");
const getPatrocinadoresAsignados = async () => {
  try {
    const response = await axios.get(
      `/api/estudiantePatrocinador/listaPatrocinadores/${parametro}`
    );
    patrocinadoresAsignados.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los patrocinadores.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const patrocinadores = ref();
const getPatrocinadores = async () => {
  try {
    const response = await axios.get(`/api/patrocinador/selectAll`);
    patrocinadores.value = response.data.filter(
      (a) => a.estado.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los patrocinadores.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const busqueda = ref("");
const mostrarLista = ref(true);
const visibilidad = ref([]);

const buscarPatrocinador = () => {
  const textoBusqueda = busqueda.value.toLowerCase().trim();
  if (textoBusqueda !== "") {
    //return []; // Si la búsqueda está vacía, devuelve una lista vacía
    mostrarLista.value = true;
    visibilidad.value = patrocinadores.value.filter((patrocinador) =>
      (
        patrocinador.nombrePatrocinador.toLowerCase() +
        " " +
        patrocinador.apellidoPatrocinador.toLowerCase()
      ).includes(textoBusqueda.toLowerCase())
    );
  }
};

//nueva
const codigoPatrocinadorSeleccionado = ref(0);
const seleccionarPatrocinador = (patrocinador) => {
  codigoPatrocinadorSeleccionado.value = patrocinador.codigoPatrocinador;
  busqueda.value =
    patrocinador.nombrePatrocinador + " " + patrocinador.apellidoPatrocinador;
  mostrarLista.value = false; // Ocultar la lista después de seleccionar
};

//Agregar nuevo patrocinador
const listaNuevosPatrocinadores = ref([]);
const patrocinadorYaExiste = ref(false);
const agregarPatrocinador = () => {
  if (
    codigoPatrocinadorSeleccionado.value !== 0 &&
    codigoPatrocinadorSeleccionado.value !== ""
  ) {
    const codigoPatrocinadorExistente = listaNuevosPatrocinadores.value.find(
      (a) => a.codigoPatrocinador === codigoPatrocinadorSeleccionado.value
    );
    if (!codigoPatrocinadorExistente) {
      listaNuevosPatrocinadores.value.push({
        codigoPatrocinador: codigoPatrocinadorSeleccionado.value,
        codigoEstudiante: parametro,
        nombrePatrocinador: getNombrePatrocinador(codigoPatrocinadorSeleccionado.value),
      });
      codigoPatrocinadorSeleccionado.value = ""; // Limpiar el input después de agregar
      busqueda.value = "";
      patrocinadorYaExiste.value = false;
    } else {
      patrocinadorYaExiste.value = true;
    }

    console.log(listaNuevosPatrocinadores.value);
  }
};

function getNombrePatrocinador(codigo) {
  // Función para obtener el nombre del curso basado en el código
  const nombre = patrocinadores.value.find((a) => a.codigoPatrocinador === codigo);
  return nombre ? nombre.nombrePatrocinador + " " + nombre.apellidoPatrocinador : "";
}

const eliminarPatrocinador = (index) => {
  listaNuevosPatrocinadores.value.splice(index, 1);
};

const save = async () => {
  try {
    if (
      (listaNuevosPatrocinadores.value !== null, listaNuevosPatrocinadores.value != "")
    ) {
      deshabilitarComponentes.value = true;
      const response = await axios.post(
        "/api/estudiantePatrocinador/create",
        listaNuevosPatrocinadores.value
      );
      if ((response.data.status = true)) {
        getPatrocinadoresAsignados();
        Swal.fire({
          title: "¡Asignados!",
          text: `Los patrocinadores fueron asignados correctamente.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Ocurrió un error al intentar asignar los nuevos patrocinadores.`,
          icon: "error",
          footer: "Por favor, intente nuevamente más tarde.",
        });
      }
      deshabilitarComponentes.value = false;
      listaNuevosPatrocinadores.value = [];
    }
  } catch {
    deshabilitarComponentes.value = false;
    Swal.fire({
      title: "Error",
      text: `Ocurrió un error al intentar asignar los nuevos patrocinadores.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//Eliminar patrocinador
//Eliminar curso
const confirmDelete = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar a ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deletePatrocinador(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deletePatrocinador = async (nombre, codigo) => {
  try {
    const response = await axios.delete(`/api/estudiantePatrocinador/Delete/${codigo}`);
    if (response.data.status == true) {
      Swal.fire({
        title: "Eliminado!",
        text: `El patrocinador ${nombre} ha sido eliminado.`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: `Ocurrió un error al intentar eliminar el patrocinador ${nombre}.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });
    }
    getPatrocinadoresAsignados();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Ocurrió un error al intentar eliminar el patrocinador ${nombre}.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

onMounted(async () => {
  getPatrocinadoresAsignados();
  getPatrocinadores();
});

//#region Método del PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

//const exportarPDF = () => {
//  descargarPDF(resultadoFiltrado.value);
//}

const descargarPDF = async () => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen
  // Función para cargar una imagen desde una URL
  const base64Img = await convertirImagenABase64(imgEstudiante.value);
  doc.addImage(base64Img, "JPEG", 10, 10, 70, 70);
  // URL de la imagen alojada en Internet

  // Título del documento
  doc.setTextColor(255, 0, 0);
  doc.text("Reporte de Estudiantes", 10, 20);

  // Guardar el documento como un archivo PDF
  doc.save("ReporteEstudiantes.pdf");
};
//#endregion

const convertirImagenABase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous"); // Para manejar CORS si es necesario
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/jpeg");
      resolve(dataURL); // Resolver la promesa con la URL en base64
    };

    img.onerror = (err) => {
      reject(err); // Rechazar la promesa si ocurre un error
    };
  });
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

//Exportar Imagenes
const exportarImagenesPDF = async () => {
  ocultarElementos.value = false;
  var element = document.getElementById("cajaImagenes");
  var opt = {
    margin: 0.5,
    filename: "imagenes.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  await html2pdf().from(element).set(opt).save();
  ocultarElementos.value = true;
};

const abrirImagenEnNuevaVentana = (urlImagen) => {
  // Usa window.open para abrir una nueva ventana con el enlace base64
  const nuevaVentana = window.open();

  // Escribe el contenido HTML en la nueva ventana, incluyendo la imagen base64
  nuevaVentana.document.write(`
        <html>
          <head><title>Imagen</title></head>
          <body>
            <img style="max-width: 400px; max-height: 400px;" src="${urlImagen}" alt="Imagen Base64"/>
          </body>
        </html>
      `);
};

//#region Metodo de EXCEL
import * as XLSX from "xlsx";

const exportarExcel = () => {
  const datos = patrocinadoresAsignados.value;

  // Mapeo de datos con nombres de columnas
  const data = datos.map((a, index) => ({
    indice: index + 1,
    Estudiante: a.estudiante,
    "Nombre del patrocinador": a.nombrePatrocinador,
    "Apellido del patrocinador": a.apellidoPatrocinador,
    Pais: a.pais,
  }));

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patrocinadores");
  // Crear un archivo de datos binarios de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  // Convertir el archivo binario en un Blob
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  // Crear una URL para el Blob
  const url = window.URL.createObjectURL(blob);
  // Crear un enlace invisible para descargar el archivo
  const link = document.createElement("a");
  link.href = url;
  link.download = "Patrocinadores Asignados.xlsx";
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion
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
  border: 1px solid #454545;
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
  padding: 7px;
  cursor: pointer;
}

.listaFiltro li:hover {
  background-color: #808080;
  color: #fff;
}
</style>
