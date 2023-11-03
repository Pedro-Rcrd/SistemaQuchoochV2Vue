<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9 ">
            <h3>Actualizar datos del Gasto</h3>
            <hr>
            <div class="card border border-success">
               
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <h4>Información del desemboloso</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de entrega</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaNacimiento" required type="date" v-model="fechaEntrega"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Titulo</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-t"></i>
                                    </span>
                                    <input autofocus id="titulo" required type="text" v-model="titulo" class="form-control">
                                </div>
                            </div>
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
                                <label for="exampleFormControlInput1" class="form-label">Tipo de pago</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select v-model="tipoPago" class="form-control form-select">
                                        <option value="E">Efectivo</option>
                                        <option value="C">Cheque</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Número del cheque</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-hashtag"></i>
                                    </span>
                                    <input autofocus type="text" v-model="numeroCheque" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Monto otorgado</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-hashtag"></i>
                                    </span>
                                    <input autofocus type="number" v-model="monto" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Estudiante</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input class="form-control" autofocus id="codigoEstudiante" required v-model="busqueda"
                                        @input="buscarEstudiantes" type="text" placeholder="Buscar estudiantes">

                                </div>
                                <ul class="list-group listaFiltro" v-if="mostrarLista">
                                    <li v-for="estudiante in visibilidad" :key="estudiante.codigoEstudiante"
                                        @click="seleccionarEstudiante(estudiante)">
                                        {{ estudiante.nombreEstudiante }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Entregado a:</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus type="text" v-model="personaRecibe" class="form-control">
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
                            <h4>Información del comprobante</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de recibido</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRecibirComprobante" required type="date"
                                        v-model="fechaRecibirComprobante" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Número del documento</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-hashtag"></i>
                                    </span>
                                    <input autofocus type="text" v-model="numeroComprobante" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen del cheque</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagen" @change="handleFileChange"
                                        accept="image/*" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen de ficha</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenFicha" @change="handleFileChangeFicha"
                                        accept="image/*" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Imagen de carta</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                    <input class="form-control" type="file" id="imagenCarta" @change="handleFileChangeCarta"
                                        accept="image/*" required>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'expenses' }">
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
import { sendRequest } from '../../functions'
const baseBackend = import.meta.env.VITE_BAKENDAPI;

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;


const codigoEstudiante = ref(0);
const fechaEntrega = ref("")
const titulo = ref("");
const estado = ref("A");
const tipoPago = ref("C");
const numeroCheque = ref(0);
const monto = ref(0.00);
const personaRecibe = ref("Estudiante");
const descripcion = ref("");
const fechaRecibirComprobante = ref("");
const numeroComprobante = ref("");
const imgCheque = ref(null);
const imgComprobante = ref(null);
const imgEstudiante = ref(null);

const urlCheque = ref("");
const urlComprobante = ref("");
const urlEstudiante = ref("");


//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
    imgCheque.value = event.target.files[0];
};

const handleFileChangeFicha = (event) => {
    imgComprobante.value = event.target.files[0];
};

const handleFileChangeCarta = (event) => {
    imgEstudiante.value = event.target.files[0];
};


const botonDeshabilitado = ref(false);

const estudiantes = ref([]);

//Inicio método para buscar estudiante
const idEstudiante = ref(0);
const busqueda = ref('');
const mostrarLista = ref(true);
const visibilidad = ref([]);

const buscarEstudiantes = () => {
    const textoBusqueda = busqueda.value.toLowerCase().trim();
    if (textoBusqueda !== '') {
        //return []; // Si la búsqueda está vacía, devuelve una lista vacía
        mostrarLista.value = true;
        visibilidad.value = estudiantes.value.filter(estudiante =>
            estudiante.nombreEstudiante.toLowerCase().includes(textoBusqueda));
    }
};


const seleccionarEstudiante = (estudiante) => {
    idEstudiante.value = estudiante.codigoEstudiante;
    busqueda.value = estudiante.nombreEstudiante;
    mostrarLista.value = false; // Ocultar la lista después de seleccionar
    // Aquí puedes realizar cualquier otra lógica que necesites con el estudiante seleccionado
    console.log(`El id del estudiantes es: ${idEstudiante.value}`);
};

//Fin metodo para buscar estudiante

const getEstudiantes = async () => {
    try {
        const response = await axios.get('/api/estudiante/selectAll');
        estudiantes.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};





const parametro = route.params.codigoGasto;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

//GET DE ESTUDIANTE
const getGasto = async () => {
    try {
        const response = await axios.get(`/api/gasto/getgastoupdate/${parametro}`);
       idEstudiante.value = response.data.codigoEstudiante;
       busqueda.value = response.data.nombreEstudiante
       fechaEntrega.value = formatFecha(response.data.fechaEntrega);
       titulo.value = response.data.titulo;
       estado.value = response.data.estado;
       tipoPago.value = response.data.tipoPago;
       console.log(`Tipo pago: ${tipoPago.value}`)
       numeroCheque.value = response.data.numeroCheque;
       monto.value = response.data.monto;
       personaRecibe.value = response.data.personaRecibe;
       descripcion.value = response.data.descripcion;
       fechaRecibirComprobante.value = formatFecha(response.data.fechaRecibirComprobante);
       numeroComprobante.value = response.data.numeroComprobante;
       imgCheque.value = null;
       imgComprobante.value = null;
       imgEstudiante.value = null;
       urlCheque .value = response.data.imgCheque;
       urlComprobante.value = response.data.imgComprobante;
       urlEstudiante.value = response.data.imgEstudiante;

    
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};


onMounted(async () => {
    getGasto();
    getEstudiantes();
});


const submitForm = async () => {
    if (!titulo.value || !monto.value) {
        return alert('Completa todos los campos antes de enviar.');
    }
    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoEstudiante', idEstudiante.value);
    formData.append('FechaEntrega', fechaEntrega.value);
    formData.append('Titulo', titulo.value);
    formData.append('Estado', estado.value);
    formData.append('TipoPago', tipoPago.value);
    formData.append('NumeroCheque', numeroCheque.value);
    formData.append('Monto', monto.value);
    formData.append('PersonaRecibe', personaRecibe.value);
    formData.append('Descripcion', descripcion.value);
    formData.append('FechaRecibirComprobante', fechaRecibirComprobante.value);
    formData.append('NumeroComprobante', numeroComprobante.value);
    formData.append('ImgCheque', imgCheque.value);
    formData.append('ImgComprobante', imgComprobante.value);
    formData.append('ImgEstudiante', imgEstudiante.value);

    const form = ref({
        CodigoEstudiante: idEstudiante.value,
        FechaEntrega: fechaEntrega.value,
        Titulo: titulo.value,
        Estado: estado.value,
        TipoPago: tipoPago.value,
        NumeroCheque: numeroCheque.value,
        Monto: monto.value,
        PersonaRecibe: personaRecibe.value,
        Descripcion: descripcion.value,
        FechaRecibirComprobante: fechaRecibirComprobante.value,
        NumeroComprobante: numeroComprobante.value,
        ImgCheque: urlCheque.value,
        ImgComprobante: urlComprobante.value,
        ImgEstudiante: urlEstudiante.value
    });

    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };
        const response = await fetch(`${baseBackend}/api/Gasto/updateimg/${parametro}`, {
            method: 'PUT',
            body: formData,
            headers,
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success', // Ícono de éxito
                title: 'Gasto registrado exitosamente.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });

            botonDeshabilitado.value = false;

        } else {
            alert('Hubo un error al crear el estudiante.');
        }
    
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
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