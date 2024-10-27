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
                    <div class="col">
                        <a class="text-dark" href="#">Editar registro</a>
                    </div>
                </div>
            </div>
            <div class="card border border-success">

                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <p class="placeholder-glow" v-if="deshabilitarComponentes">
                                <span class="placeholder col-12 text-success"></span>
                            </p>
                            <h4>Información del patrocinador</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput" class="form-label">Estado<span
                                        class="text-danger">*</span></label>
                                <div class="d-flex flex-row">
                                    <div class="form-check mr-3">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault3" value="A" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Activo
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="estadoRadio"
                                            id="flexRadioDefault4" value="I" v-model="estado">
                                        <label class="form-check-label" for="flexRadioDefault4">
                                            Inactivo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Nombre<span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus type="text" v-model="nombrePatrocinador" class="form-control"
                                        :disabled="deshabilitarComponentes">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Apellido<span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
                                    </span>
                                    <input autofocus type="text" v-model="apellidoPatrocinador" class="form-control"
                                        :disabled="deshabilitarComponentes">
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
                                    <input autofocus id="fechaRecibirComprobante" type="date" v-model="fechaNacimiento"
                                        class="form-control" :disabled="deshabilitarComponentes">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Profesión<span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <input autofocus type="text" v-model="profesion" class="form-control"
                                        :disabled="deshabilitarComponentes">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Información de residencia</h4>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Pais<span
                                        class="text-danger">*</span> <i data-bs-toggle="modal"
                                        data-bs-target="#modalPais" style="font-size: 14px;" class="fas fa-circle-plus"
                                        @click="noMostrarAlertas()"></i></label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoPais" v-model="codigoPais"
                                        :disabled="deshabilitarComponentes">
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
                                        accept="image/*" :disabled="deshabilitarComponentes">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de registro<span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRecibirComprobante" required type="date"
                                        v-model="fechaCreacion" class="form-control"
                                        :disabled="deshabilitarComponentes">
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <p v-if="deshabilitarComponentes">Cargando...</p>
                            <div v-if="deshabilitarComponentes" class="spinner-border text-dark" role="status"></div>

                            <RouterLink :to="{ name: 'registermenu' }" type="button" class="btn btn-outline-primary">
                                Cancelar
                            </RouterLink>
                            <button type="submit" @click.prevent="submitForm" class="btn btn-primary text-light"
                                :disabled="deshabilitarComponentes"><i class="fa-solid fa-save"></i> Guardar
                                registro</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Modal para pais-->
    <Modal :id="'modalPais'" :title="title">
        <div class="modal-body">
            <div class="alert alert-success text-center" role="alert" v-show="mostrarAlertaSuccess">
                ¡El pais fue creado correctamente!
            </div>
            <div class="alert alert-danger text-center" role="alert" v-show="mostrarAlertaDanger">
                ¡Hubo un error al intentar guardar el pais!
                <p> Por favor, intente nuevamente más tarde.</p>
            </div>
            <div class="text-center pb-3" v-show="mostrarLoading">
                <div class="card-body">
                    <img style="max-width: 25px; max-height: 25px;" src="/loading.gif" alt="img-fluid">
                </div>
            </div>
            <div class="row col-11">
                <form @submit.prevent="save(1)">
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="formPais.nombre" placeholder="Pais" required
                            class="form-control" ref="nameInput">
                    </div>
                    <div class="d-grid col-6 mx-auto">
                        <button class="btn btn-dark">
                            <i class="fa-solid fa-save"></i> Registrar</button>
                    </div>
                </form>
                <div class="modal-footer">
                    <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal.vue'
const baseApiBackend = import.meta.env.VITE_BACKEND_API;
const route = useRoute();
const parametro = route.params.codigoPatrocinador;
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;


const codigoPais = ref(0);
const nombrePatrocinador = ref("");
const apellidoPatrocinador = ref("")
const profesion = ref("");
const estado = ref("A");
const fechaNacimiento = ref("");
const fechaCreacion = ref("");
const imgPatrocinador = ref(null);


//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
    imgPatrocinador.value = event.target.files[0];
};


const paises = ref([]);

const getPaises = async () => {
    try {
        const response = await axios.get('/api/pais/selectAll');
        paises.value = response.data.filter(a => a.estatus.trim().toUpperCase() === "A");
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener la lista de los paises.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
};
const getPatrocinador = async () => {
    try {
        const response = await axios.get(`/api/patrocinador/${parametro}`);
        codigoPais.value = response.data.codigoPais;
        nombrePatrocinador.value = response.data.nombrePatrocinador;
        apellidoPatrocinador.value = response.data.apellidoPatrocinador;
        profesion.value = response.data.profesion;
        estado.value = response.data.estado;
        fechaNacimiento.value = formatFecha(response.data.fechaNacimiento);
        fechaCreacion.value = formatFecha(response.data.fechaCreacion);
        imgPatrocinador.value = null;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar obtener los datos del patrocinador.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
    }
};

const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

onMounted(async () => {
    getPaises();
    getPatrocinador();
});


//#region Alertas
const title = ref("Nuevo Registro");
const mostrarAlertaSuccess = ref(false);
const mostrarAlertaDanger = ref(false);
const mostrarLoading = ref(false);

const noMostrarAlertas = () => {
    mostrarAlertaSuccess.value = false
    mostrarAlertaDanger.value = false
    mostrarLoading.value = false
    formPais.value.nombre = "";
}
//#endregion

//#region modal de pais
const formPais = ref({
    nombre: "",
    estatus: "A"
})
//#endregion

//#region  metodo save de modales
const save = async (opcion) => {
    if (opcion == 1) {
        try {
            mostrarLoading.value = true;
            const response = await axios.post('/api/pais/create', formPais.value);
            mostrarLoading.value = false;
            if (response.data.status = true) {
                mostrarAlertaSuccess.value = true;
                getPaises();
            } else {
                mostrarAlertaDanger.value = true;
            }
        } catch {
            noMostrarAlertas();
        }
    }

}

//#endregion

const deshabilitarComponentes = ref(false);
const submitForm = async () => {
    if (!nombrePatrocinador.value || !apellidoPatrocinador.value ||
        !codigoPais.value || !fechaCreacion.value || !profesion.value || !estado.value) {
        return Swal.fire({
            title: 'Campos vacíos',
            text: `Por favor, complete los campos obligatorios.`,
            icon: 'warning',
        });
    }
    deshabilitarComponentes.value = true;


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

        const response = await fetch(`${baseApiBackend}/api/patrocinador/update/${parametro}`, {
            method: 'PUT',
            body: formData,
            headers,
        });

        if (response.ok) {
            Swal.fire({
                title: '¡Actualizado!',
                text: `El patrocinador se ha actualizado correctamente.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            deshabilitarComponentes.value = false;


        } else {
            Swal.fire({
                title: 'Error',
                text: `Hubo un error al intentar actualizar los datos del patrocinador.`,
                icon: 'error',
                footer: 'Por favor, intente nuevamente más tarde.'
            });

            deshabilitarComponentes.value = false;
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: `Hubo un error al intentar actualizar los datos del patrocinador.`,
            icon: 'error',
            footer: 'Por favor, intente nuevamente más tarde.'
        });
        deshabilitarComponentes.value = false;
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