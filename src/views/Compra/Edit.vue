<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="col-md-9 ">
            <h3>Editar datos de la Compra</h3>
            <hr>
            <div class="card border border-success">
                
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <h4>Información de la orden</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de entrega</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaNacimiento" required type="date" v-model="fechaCreacion"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Titulo</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
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
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Proveedor</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoProveedor" v-model="codigoProveedor">
                                        <option value="" disabled selected>
                                            Selecciona proveedor
                                        </option>
                                        <template v-for="tipo in proveedores" :key="tipo.codigoProveedor">
                                            <option :value="tipo.codigoProveedor">
                                                {{ tipo.nombreProveedor }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Estudiante</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-a"></i>
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
                                        <i class="fa-solid fa-hashtag"></i>
                                    </span>
                                    <input autofocus type="text" v-model="personaCreacion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                                <div class="input-group mb-3">
                                    <textarea autofocus v-model="descripcion" class="form-control"
                                        style="height: 200px;"> </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <h4>Información de entrega</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de entrega</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRecibirComprobante"  type="date"
                                        v-model="fechaEntrega" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Total</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-at"></i>
                                    </span>
                                    <input autofocus type="number" v-model="total" class="form-control">
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
                                        accept="image/*" >
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'purchases' }">
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
const codigoProveedor = ref(0);
const fechaCreacion = ref("")
const titulo = ref("");
const estado = ref("A");
const personaCreacion = ref("Estudiante");
const descripcion = ref("");
const fechaEntrega = ref("");
const total = ref(0.00);
const imgEstudiante = ref(null);

const urlImagen = ref(null);


//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
    imgEstudiante.value = event.target.files[0];
};

const parametro = route.params.codigoOrdenCompra;
//FORMATEAR FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}


//Inicio método para buscar estudiante
 const estudiantes = ref([]);
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

const getEstudiantes = async () => {
    try {
        const response = await axios.get('/api/estudiante/selectAll');
        estudiantes.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//Fin metodo para buscar estudiante


//VARIALBLE APRA OBTENER PROVEEDORES
const proveedores = ref([]);

const botonDeshabilitado = ref(false);

const getProveedores = async () => {
    try {
        const response = await axios.get('api/proveedor/getall');
        proveedores.value = response.data.proveedores;
        console.log(proveedores.value);
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
    }
};
const getCompra = async () => {
    try {
        const response = await axios.get(`api/compra/getcompraupdate/${parametro}`);
        idEstudiante.value = response.data.codigoEstudiante;
        busqueda.value = response.data.nombreEstudiante;
        codigoProveedor.value = response.data.codigoProveedor;
        fechaCreacion.value = formatFecha(response.data.fechaCreacion);
        titulo.value = response.data.titulo;
        estado.value = response.data.estado;
        personaCreacion.value = response.data.personaCreacion;
        descripcion.value = response.data.descripcion;
        fechaEntrega.value = formatFecha(response.data.fechaEntrega);
        total.value = response.data.total;
        imgEstudiante.value = null;
        urlImagen.value = response.data.imgEstudiante;
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
    }
};


onMounted(async () => {
    getProveedores();
    getCompra();
    getEstudiantes();
});


const submitForm = async () => {
    if (!titulo.value) {
        return alert('Completa todos los campos antes de enviar.');
    }
    botonDeshabilitado.value = true;

    const formData = new FormData();
    formData.append('CodigoEstudiante', idEstudiante.value);
    formData.append('CodigoProveedor', codigoProveedor.value);
    formData.append('FechaCreacion', fechaCreacion.value);
    formData.append('Titulo', titulo.value);
    formData.append('Estado', estado.value);
    formData.append('PersonaCreacion', personaCreacion.value);
    formData.append('Descripcion', descripcion.value);
    formData.append('FechaEntrega', fechaEntrega.value);
    formData.append('Total', total.value);
    formData.append('ImgEstudiante', imgEstudiante.value);


    //UPDATE SIN IMAGEN
    const form = ref({
        CodigoEstudiante: idEstudiante.value,
        CodigoProveedor: codigoProveedor.value,
        FechaCreacion: fechaCreacion.value,
        Titulo: titulo.value,
        Estado: estado.value,
        PersonaCreacion: personaCreacion.value,
        Descripcion: descripcion.value,
        FechaEntrega: fechaEntrega.value,
        Total: total.value,
        ImgEstudiante: urlImagen.value
    })



    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

            const response = await fetch(`${baseBackend}/api/compra/updateimg/${parametro}`, {
                method: 'PUT',
                body: formData,
                headers,
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success', // Ícono de éxito
                    title: 'Compra registrado exitosamente.',
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
                });

                botonDeshabilitado.value = false;


            } else {
                Swal.fire({
                    icon: 'error', // Ícono de éxito
                    title: 'No se pudo registrar el gasto Gasto.',
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
                });
            }
        
    } catch (error) {
        Swal.fire({
                    icon: 'error', // Ícono de éxito
                    title: 'No se pudo registrar el gasto Gasto.',
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
                });
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