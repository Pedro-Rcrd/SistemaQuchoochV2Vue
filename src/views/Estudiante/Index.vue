<template>
  <div class="row justify-content-center">
    <div class="row col-12">
      <h2>Estudiantes</h2>
      <hr>
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }">
              Menú de registros
            </router-link>
          </div>>
          <div class="col text-primary">
            <a class="text-dark" href="#">Estudiantes</a>
          </div>
        </div>
      </div>
      <!--Exportación-->
      <div class="text-light mb-3" v-if="authStore.exportarModRegistro">
        <button type="button" class="btn btn-success btn-sm " @click="exportarExcel"><i
            class="fa-solid fa-file-excel"></i> Excel</button>

        <button type="button" class="btn btn-danger btn-sm" @click="exportarPDF"><i class="fa-solid fa-file-pdf"></i>
          PDF</button>
      </div>
      <!--Buscador-->
      <div class="row justify-content-between ">
        <div class="col-6">
          <input class="form-control" autofocus id="codigoEstudiante" v-model="filtro" @input="buscarEstudiante"
            type="text" :placeholder="tipoBusqueda">
        </div>
        <div class="col-2">
          <select v-model="tipoFiltro" class="form-select" aria-label="Default select example">
            <option selected disabled>Filtrar por:</option>
            <option value="nombreEstudiante">Nombre</option>
            <option value="apellidoEstudiante">Apellido</option>
            <option value="codigoBecario">Código</option>
            <option value="establecimiento">Establecimiento</option>
            <option value="nivelAcademico">Nivel Académico</option>
            <option value="carrera">Carrera</option>
            <option value="comunidad">Comunidad</option>
            <option value="genero">Género</option>
            <option value="estado">Estado</option>
          </select>
        </div>
        <div class="col-2">
          <input v-model="mostrarTodosLosEstudiantes" type="checkbox" class="form-check-input" id="checkRegistro">
          <label class="form-check-label" for="flexCheckDefault">
            Mostrar todo
          </label>
        </div>
        <div class="col-2">
          <div class="text-end">
            <router-link :to="{ path: '/createstudent' }" class="btn btn-primary mb-3"
              v-if="authStore.crearModRegistro">
              <i class="fa-solid fa-circle-plus"></i> Nuevo
            </router-link>
          </div>

        </div>
      </div>
      <!--Tabla-->
      <v-card>
        <v-data-table density="compact" :items="resultadoFiltrado" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small">
              <router-link :to="{ path: '/informationstudent/' + item.codigoEstudiante }">
                <i class="fa-solid fa-eye text-dark"></i>
              </router-link>
            </v-icon>
            <v-icon size="small" v-if="authStore.modificarModRegistro">
              <router-link :to="{ path: '/editstudent/' + item.codigoEstudiante }">
                <i class="fa-solid fa-edit text-dark"></i>
              </router-link>
            </v-icon>

          </template>
        </v-data-table>
      </v-card>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useImageStore } from '../../stores/imageStore'
import axios from 'axios'
import Swal from 'sweetalert2';

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

const imageStore = useImageStore();
const imagenFondoAsociacion = imageStore.ImagenFondoVerde;
const imagenLogoAsociacion = imageStore.ImagenLogoQuchooch;


onMounted(() => {
  getEstudiantes()
})

//Cambiar idioma
//#region cambiar idima vuetify
import { useLocale } from 'vuetify';
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}
// Llama a la función para cambiar al idioma español
changeLocale('es');
//#endregion

const headers = [
  { title: '#', key: 'indice' },
  { title: 'Código', key: 'codigoBecario' },
  { title: 'Nombre', key: 'nombreEstudiante' },
  { title: 'Apellido', key: 'apellidoEstudiante' },
  { title: 'Nivel Académico', key: 'nivelAcademico' },
  { title: 'Establecimiento', key: 'establecimiento' },
  { title: 'Comunidad', key: 'comunidad' },
  { title: 'Fecha de registro', key: 'fechaRegistro' },
  { title: 'Estado', key: 'estado' },
  { title: 'Acción', key: 'actions', sortable: false },
]



//GET estudiantes
//#region GET estudiantes
const estudiantes = ref([])
const estudiantesActivos = ref([]);
const estudiantesSeleccionados = ref([]);
const mostrarTodosLosEstudiantes = ref(false);
const getEstudiantes = async () => {
  try {
    const response = await axios.get(`/api/Estudiante/selectall`)
    estudiantes.value = response.data.map(expense => ({
      ...expense,
      fechaNacimieto: formatFecha(expense.fechaNacimieto), // Formatea la fecha
      fechaRegistro: formatFecha(expense.fechaRegistro) // Formatea la fecha
    }));
    estudiantesActivos.value = estudiantes.value.filter(estudiante => estudiante.estado.trim().toUpperCase() === "A");

    if (mostrarTodosLosEstudiantes.value) {
      estudiantesSeleccionados.value = estudiantes.value;
    } else {
      estudiantesSeleccionados.value = estudiantesActivos.value;
    }

    mapeoDeDato(estudiantesSeleccionados.value);

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Hubo un error al intentar obtener la lista de los estudiantes.`,
      icon: 'error',
      footer: 'Por favor, intente nuevamente más tarde.'
    });
  }
}
//#endregion

const mapeoDeDato = (datos) => {
  resultadoFiltrado.value = datos.map((estudiante, index) => ({
    'indice': index + 1,
    'codigoBecario': estudiante.codigoBecario,
    'codigoEstudiante': estudiante.codigoEstudiante,
    'nombreEstudiante': estudiante.nombreEstudiante,
    'apellidoEstudiante': estudiante.apellidoEstudiante,
    'nivelAcademico': estudiante.nivelAcademico,
    'grado': estudiante.grado,
    'establecimiento': estudiante.establecimiento,
    'comunidad': estudiante.comunidad,
    'fechaRegistro': estudiante.fechaRegistro,
    'estado': estudiante.estado
  }));
}

// Función para formatear la fecha
const formatFecha = (fecha) => {
  const date = new Date(fecha)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
//Fin consulta

//#region Método del FILTRO de datos
const tipoBusqueda = ref('Buscar estudiante')
const filtro = ref('');
const resultadoFiltrado = ref([]);
const tipoFiltro = ref('nombreEstudiante');

//Metodo del filtro de datos en la tabla
const buscarEstudiante = () => {
  const textoBusqueda = filtro.value.toLowerCase().trim();
  let datosFiltrados;// Por defecto, usa todos los establecimientos

  if (textoBusqueda !== '') {
    datosFiltrados = estudiantesSeleccionados.value.filter(estudiante => {
      const campoFiltro = estudiante[tipoFiltro.value]?.toLowerCase(); // Utiliza la propiedad basada en tipoFiltro
      return campoFiltro?.includes(textoBusqueda);
    });

    mapeoDeDato(datosFiltrados);
  }
  else {
    mapeoDeDato(estudiantesSeleccionados.value);
  }
}
watch(mostrarTodosLosEstudiantes, (newValue) => {
  if (!newValue) {
    //checkbox deshabilitado
    estudiantesSeleccionados.value = estudiantesActivos.value;
  } else {
    //checkbox habilitado
    estudiantesSeleccionados.value = estudiantes.value;
  }
  mapeoDeDato(estudiantesSeleccionados.value);
});
//#endregion
//Metodo del PDF
//#region Método del PDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const exportarPDF = () => {
  descargarPDF(resultadoFiltrado.value);
}

const descargarPDF = async (datos) => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();
  // Agregar imagen
  // Función para cargar una imagen desde una URL
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (err) {
        reject(err);
      };
      img.src = url;
    });
  }


  const logoAsociacion = imagenLogoAsociacion;
  const imgData = logoAsociacion;

  const imagenFondoQuchooch = imagenFondoAsociacion;
  doc.addImage(imagenFondoQuchooch, 'JPEG', 0, 0, 442, 200);

  doc.addImage(imgData, 'JPEG', 5, 1, 15, 15);

  // Configurar el color y la fuente para el texto
  doc.setTextColor(255, 255, 255); // Color blanco
  doc.setFont('times', 'bold');    // Fuente Times New Roman o equivalente
  doc.setFontSize(12);
  doc.text("NÓMINA DE ESTUDIANTES", 78, 7);
  doc.text("ASOCIACIÓN QUCHOOCH", 79, 14);

  // Encabezados de la tabla
  const headers2 = ['No.',
    'Código',
    'Nombre',
    'Apellido',
    'Nivel Académico',
    'Grado',
    'Establecimiento',
    'Comunidad'
  ];

  // Datos de la tabla
  const data = datos.map((estudiante, index) => [index + 1,
  estudiante.codigoBecario,
  estudiante.nombreEstudiante,
  estudiante.apellidoEstudiante,
  estudiante.nivelAcademico,
  estudiante.grado,
  estudiante.establecimiento,
  estudiante.comunidad
  ]);

  // Estilos para el encabezado de la tabla
  const headerStyles = {
    fillColor: '#909909', // Color de fondo
    textColor: '#FFFFFF', // Color del texto
    fontStyle: 'bold' // Estilo del texto
  };
  // Crear la tabla en el PDF
  doc.autoTable({
    head: [headers2],
    body: data,
    startY: 20, // Posición inicial en Y para la tabla
    headStyles: headerStyles // Aplicar estilos al encabezado
  });

  // Guardar el documento como un archivo PDF
  doc.save("ReporteEstudiantes.pdf");
}
//#endregion

//#region Metodo de EXCEL
//Metodo de exportar EXCEL
import * as XLSX from 'xlsx';

const exportarExcel = () => {
  const datos = resultadoFiltrado.value;

  // Encabezados de las columnas
  // const encabezados = [
  //   'Índice',
  //   'Código Becario',
  //   'Nombre Estudiante',
  //   'Apellido Estudiante',
  //   'Nivel Académico',
  //   'Grado',
  //   'Carrera',
  //   'Establecimiento'
  // ];

  // Mapeo de datos con nombres de columnas
  const data = datos.map((estudiante, index) => ({
    'Indice': index + 1,
    'Codigo Becario': estudiante.codigoBecario,
    'Nombre Estudiante': estudiante.nombreEstudiante,
    'Apellido Estudiante': estudiante.apellidoEstudiante,
    'Nivel Académico': estudiante.nivelAcademico,
    'Grado': estudiante.grado,
    'Establecimiento': estudiante.establecimiento,
    'Comunidad': estudiante.comunidad,
    'Fecha de registro': estudiante.fechaRegistro,
    'Estado' : estudiante.estado
  }));
  // Insertar encabezados al principio de los datos
  //data.unshift(encabezados);
  // Insertar encabezados después de la primera fila
  //data.splice(0, 0, encabezados);

  // Crear una nueva hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();
  // Convertir los datos a una hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de estudiantes');
  // Crear un archivo de datos binarios de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  // Convertir el archivo binario en un Blob
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // Crear una URL para el Blob
  const url = window.URL.createObjectURL(blob);
  // Crear un enlace invisible para descargar el archivo
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporteEstudiantes.xlsx';
  // Simular un clic en el enlace para iniciar la descarga
  link.click();
  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
};
//#endregion

</script>