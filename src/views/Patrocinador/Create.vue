<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Registro de Patrocinador</h3>
            <hr>
            <div class="container text-center mb-4">
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
                    <div class="col text-primary">
                        <a href="#">Nuevo registro</a>
                    </div>
                </div>
            </div>
            <div class="card border border-success">
                
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <h4>Información del patrocinador</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput" class="form-label">Estado</label>
                                <div class="d-flex flex-row">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault3" value="A" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Activo
                                        </label>
                                    </div>
                                    <div class="form-check ps-5">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault4" value="F" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault4">
                                            Finalizado
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus type="text" v-model="nombrePatrocinador" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <input autofocus type="text" v-model="apellidoPatrocinador" class="form-control">
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
                                    <input autofocus id="fechaRecibirComprobante" required type="date"
                                        v-model="fechaNacimiento" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Profesión</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <input autofocus type="text" v-model="profesion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Información de residencia</h4>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Pais</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoPais"
                                        v-model="codigoPais">
                                        <option value="" disabled selected>
                                            Selecciona pais
                                        </option>
                                        <template v-for="tipo in paises" :key="tipo.codigoPais">
                                            <option :value="tipo.codigoPais">
                                                {{ tipo.nombre }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Fotografía</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagen" @change="handleFileChange"
                                        accept="image/*" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de registro</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRecibirComprobante" required type="date"
                                        v-model="fechaCreacion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'registermenu' }">
                                <button type="button" class="btn btn-outline-primary">Cancelar</button>
                            </RouterLink>
                        </div>


                    </form>
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
const baseBackend = import.meta.env.VITE_BAKENDAPI;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;


const codigoPais = ref(0);
const nombrePatrocinador = ref("");
const apellidoPatrocinador = ref("")
const profesion = ref("");
const estado = ref("A");
const fechaNacimiento = ref("Estudiante");
const fechaCreacion = ref("");
const imgPatrocinador = ref(null);


//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
    imgPatrocinador.value = event.target.files[0];
};


 const paises = ref([]);

const getPaises = async () => {
    try {
        const response = await axios.get('/api/pais/getall');
        paises.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};



const botonDeshabilitado = ref(false);



onMounted(async () => {
    getPaises();
});


const submitForm = async () => {
    if (!nombrePatrocinador.value || !apellidoPatrocinador.value ||
         !codigoPais.value || !fechaCreacion.value) {
        return Swal.fire({
                    icon: 'warning',
                    title: "Completa todos los campos antes de enviar",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
                });
    }
    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoPais', codigoPais.value);
    formData.append('NombrePatrocinador', nombrePatrocinador.value);
    formData.append('ApellidoPatrocinador', apellidoPatrocinador.value);
    formData.append('Profesion', profesion.value);
    formData.append('Estado', estado.value);
    formData.append('FechaNacimiento', fechaNacimiento.value);
    formData.append('FechaCreacion', fechaCreacion.value);
    formData.append('ImgPatrocinador', imgPatrocinador.value);

    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

        const response = await fetch(`${baseBackend}/api/patrocinador/create`, {
            method: 'POST',
            body: formData,
            headers,
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success', // Ícono de éxito
                title: 'Patrocinador registrado exitosamente.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });

            botonDeshabilitado.value = false;
        

        } else {
            Swal.fire({
                icon: 'error', // Ícono de éxito
                title: 'Hubo un error al registrar patrocinador.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });
            botonDeshabilitado.value = false;
        }
    } catch (error) {
        Swal.fire({
                icon: 'error', // Ícono de éxito
                title: 'Hubo un error al registrar patrocinador.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });
            botonDeshabilitado.value = false;
    }
};
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
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
    padding: 10px;
    cursor: pointer;
}

.listaFiltro li:hover {
    background-color: #5434b5;
    color: #fff
}
</style>