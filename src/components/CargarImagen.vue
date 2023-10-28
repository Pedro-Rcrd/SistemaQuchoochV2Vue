<template>
  <div class="row mt-5">
    <div class="col-md-9 offset-md-1">
      <div class="card border border-success">
        <div class="card-header bg-success border border-success"></div>
        <div class="card-body">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="row">
              <h4>Información del estudiante</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Código</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-key"></i>
                  </span>
                  <input autofocus id="codigoBecario" required type="text" class="form-control" v-model="codigoBecario">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-n"></i>
                  </span>
                  <input autofocus id="nombreEstudiante" required type="text" v-model="nombreEstudiante"
                    class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-a"></i>
                  </span>
                  <input autofocus id="apellidoEstudiante" required type="text" v-model="apellidoEstudiante"
                    class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Fecha de nacimiento</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input autofocus id="fechaNacimiento" required type="date" v-model="fechaNacimiento"
                    class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Género</label>
                <div class="input-group mb-3">
                  <div class="d-flex flex-row">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="generoRadio" id="flexRadioDefault1" value="M"
                        v-model="genero">
                      <label class="form-check-label" for="flexRadioDefault1">
                        Masculino
                      </label>
                    </div>
                    <div class="form-check ps-5">
                      <input class="form-check-input" type="radio" name="generoRadio" id="flexRadioDefault2" value="F"
                        v-model="genero">
                      <label class="form-check-label" for="flexRadioDefault2">
                        Femenino
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput" class="form-label">Estado</label>
                <div class="d-flex flex-row">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="estadoRadio" id="flexRadioDefault3" value="A"
                      v-model="estado">
                    <label class="form-check-label" for="flexRadioDefault3">
                      Activo
                    </label>
                  </div>
                  <div class="form-check ps-5">
                    <input class="form-check-input" type="radio" name="estadoRadio" id="flexRadioDefault4" value="I"
                      v-model="estado">
                    <label class="form-check-label" for="flexRadioDefault4">
                      Inactivo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Numero de teléfono</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input autofocus type="text" v-model="telefonoEstudiante" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Correo electrónico</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-at"></i>
                  </span>
                  <input autofocus type="text" v-model="email" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Residencia</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Comunidad/Cantón</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-home"></i>
                  </span>
                  <input autofocus type="text" v-model="codigoComunidad" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Sector</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-hashtag"></i>
                  </span>
                  <input autofocus type="number" v-model="sector" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Número de casa</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-street-view"></i>
                  </span>
                  <input autofocus type="text" v-model="numerocasa" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                <div class="input-group mb-3">
                  <input autofocus type="text" v-model="descripcion" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Información académica</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Nivel académico</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <input autofocus type="number" v-model="codigoNivelAcademico" class="form-control">
                </div>
              </div>
              {{ codigoNivelAcademico }}
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Grado</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-stairs"></i>
                  </span>
                  <input autofocus type="number" v-model="codigoGrado" class="form-control">
                </div>
              </div>
              {{ codigoGrado }}
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Carrera</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-book "></i>
                  </span>
                  <input type="number" id="codigoCarrera" v-model="codigoCarrera" required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="exampleFormControlInput1" class="form-label">Establecimiento</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-school"></i>
                  </span>
                  <input type="number" id="nombreEstudiante" v-model="codigoEstablecimiento" required>
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Información familiar</h4>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Nombre del padre</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </span>
                  <input autofocus type="text" v-model="nombrePadre" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Teléfono del padre</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input autofocus type="text" v-model="telefonoPadre" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-business-time"></i>
                  </span>
                  <input autofocus type="text" v-model="oficioPadre" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Nombre de la madre</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </span>
                  <input autofocus type="text" v-model="nombreMadre" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Teléfono de la madre</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <input autofocus type="text" v-model="telefonoMadre" class="form-control">
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Oficio</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-business-time"></i>
                  </span>
                  <input autofocus type="text" v-model="oficioMadre" class="form-control">
                </div>
              </div>

            </div>
            <div class="col-md-8">
              <label for="exampleFormControlInput1" class="form-label">Fotografía del estudiante</label>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-image"></i>
                </span>
                <input class="form-control" type="file" id="imagen" @change="handleFileChange" accept="image/*" required>
              </div>
            </div>

            <div class="d-grid col-10 mx-auto">
              <button class="btn btn-dark">
                <i class="fa-solid fa-save"></i>Actualizar</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth'
import { useRoute } from 'vue-router'
import SelectInput from '../../components/SelectInput.vue'
import SelectGrado from '../../components/SelectGrado.vue'
import SelectCarrera from '../../components/SelectCarrera.vue'
import SelectEstablecimiento from '../../components/SelectEstablecimiento.vue'
const route = useRoute()
const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

export default {
  setup() {
    const nivelesAcademicos = ref([]);
    const grados = ref([]);
    const carreras = ref([]);
    const establecimientos = ref([]);

    //METODOS DE CONSULTA
    const getNivelAcademico = async () => {
      try {
        const response = await axios.get('/api/nivelacademico/getall')
        nivelesAcademicos.value = response.data.nivelesAcademicos;
        console.log("Aqui que viene", response)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
      }
    }

    const getGrados = async () => {
      try {
        const response = await axios.get('/api/grado/getall')
        grados.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
      }
    }

    const getCarreras = async () => {
      try {
        const response = await axios.get('/api/carrera/getall')
        carreras.value = response.data.carreras;
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
      }
    }

    //Establecimientos
    const getEstablecimientos = async () => {
      try {
        const response = await axios.get('/api/establecimiento/getall')
        establecimientos.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
      }
    }


    // Ejecuta los métodos después de que el componente se monte
    onMounted(async () => {
      getNivelAcademico();
      getGrados();
      getCarreras();
      getEstablecimientos();
    });

    // Resto del código del componente...
  },

  data() {
    return {
      codigoBecario: '',
      codigoComunidad: 0,
      codigoNivelAcademico: 0,
      codigoGrado: '',
      codigoCarrera: 0,
      codigoEstablecimiento: 0,
      nombreEstudiante: '',
      apellidoEstudiante: '',
      fechaNacimiento: '1999-10-10',
      genero: 'M',
      estado: 'A',
      telefonoEstudiante: '',
      email: 'pedro@gmail',
      sector: 2,
      numerocasa: 'k56',
      descripcion: 'desc del estudiante',
      nombrePadre: 'Gregorio',
      telefonoPadre: '5489',
      oficioPadre: 'Albañil',
      nombreMadre: 'Andrea',
      telefonoMadre: '248967',
      oficioMadre: 'Ama de acasa',
      imagen: null,
      fechaRegistro: '2023-02-12'
    };
  },
  methods: {
    handleFileChange(event) {
      this.imagen = event.target.files[0];
    },
    async submitForm() {
      if (!this.nombreEstudiante || !this.codigoGrado || !this.imagen) {
        return alert('Completa todos los campos antes de enviar.');
      }

      const formData = new FormData();
      formData.append('CodigoBecario', this.codigoBecario);
      formData.append('CodigoComunidad', this.codigoComunidad);
      formData.append('CodigoNivelAcademico', this.codigoNivelAcademico);
      formData.append('CodigoGrado', this.codigoGrado);
      formData.append('CodigoCarrera', this.codigoCarrera);
      formData.append('CodigoEstablecimiento', this.codigoEstablecimiento);
      formData.append('NombreEstudiante', this.nombreEstudiante);
      formData.append('ApellidoEstudiante', this.apellidoEstudiante);
      formData.append('FechaNacimieto', this.fechaNacimiento);
      formData.append('Genero', this.genero);
      formData.append('Estado', this.estado);
      formData.append('TelefonoEstudiante', this.telefonoEstudiante);
      formData.append('Email', this.email);
      formData.append('Sector', this.sector);
      formData.append('NumeroCasa', this.numerocasa);
      formData.append('Descripcion', this.descripcion);
      formData.append('NombrePadre', this.nombrePadre);
      formData.append('TelefonoPadre', this.telefonoPadre);
      formData.append('OficioPadre', this.oficioPadre);
      formData.append('NombreMadre', this.nombreMadre);
      formData.append('TelefonoMadre', this.telefonoMadre);
      formData.append('OficioMadre', this.oficioMadre);
      formData.append('ImagenEstudiante', this.imagen);
      formData.append('FechaRegistro', this.fechaRegistro);

      try {
        const authStore = useAuthStore(); // Accede a tu tienda de autenticación
        const token = authStore.token; // Obtén el token de la tienda de autenticación

        if (!token) {
          // Maneja el caso en el que no haya token (usuario no autenticado)
          return alert('No estás autorizado para realizar esta acción.');
        }

        // Agrega el token al encabezado de la solicitud
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch('http://localhost:5079/api/estudiantes', {
          method: 'POST',
          body: formData,
          headers,
        });
        for (const [key, value] of formData.entries()) {
          console.log(`Clave: ${key}, Valor: ${value.toString()}`);
        }

        if (response.ok) {
          alert('Estudiante creado exitosamente.');
          // Puedes manejar la respuesta del servidor aquí si es necesario
        } else {
          alert('Hubo un error al crear el estudiante.');
        }
      } catch (error) {
        console.error('Error al crear el estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
      }
    },
  },
};
</script>
