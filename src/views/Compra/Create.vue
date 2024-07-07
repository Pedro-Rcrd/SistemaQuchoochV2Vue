<template>
    <div class="row justify-content-center mt-1">
        <div class="row col-11">
            <h3>Registro de Compra</h3>
            <hr>
            <div class="container text-center mb-4">
                <div class="row row-cols-auto">
                    <div class="col">
                        <router-link :to="{ path: '/purchasesmenu' }">
                            Menú de compras
                        </router-link>
                    </div> >
                    <div class="col">
                        <router-link :to="{ path: '/purchases' }">
                            Compras
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
                            <div class="col-md-8">
                                <label for="exampleFormControlInput1" class="form-label">Proveedor</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <select class="form-control form-select" id="codigoProveedor"
                                        v-model="codigoProveedor">
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
                                    <input autofocus type="text" v-model="personaCreacion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <!--Productos-->
                        <div class="row">
                            <h4>Información de los productos</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Producto</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-building"></i>
                                    </span>
                                    <input autofocus type="text"  class="form-control" placeholder="Producto"
                                    v-model="nombreProducto">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label for="Cantidad" class="form-label">Cantidad</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-n"></i>
                                    </span>
                                    <input autofocus id="cantidad" type="number" class="form-control"
                                    v-model="cantidadProducto">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label for="Precio" class="form-label">Precio Total</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-p"></i>
                                    </span>
                                    <input autofocus id="cantidad" type="number" class="form-control"
                                    v-model="precioProducto">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="Precio" class="form-label">Agrega nuevo producto</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-plus"></i>
                                    </span>
                                    <button class="btn btn-primary" @click.prevent="agregarProducto" >Agregar</button>
                                </div>
                            </div>
                            <div class="alert alert-danger" role="alert" v-show="productoYaExiste">
                                El producto seleccionado ya está en la lista.
                            </div>
                        </div>
                        <!--Mostar lista de productos de la compra-->
                        <div class="row">
                            <div class="col-md-8 mb-1  justify-content-center">
                                <div class="table-container table-responsive">
                                    <table class="table table-scroll table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="text-center">#</th>
                                                <th scope="col" class="text-center">Producto</th>
                                                <th scope="col" class="text-center">Cantidad</th>
                                                <th scope="col" class="text-center">Precio Total</th>
                                                <th scope="col" class="text-center">Accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(producto, index) in productos" :key="index">
                                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                                <td class="text-center">{{ producto.nombreProducto }}</td>
                                                <td class="text-center">{{ producto.cantidadProducto }}</td>
                                                <td class="text-center">{{ producto.precioProducto }}</td>
                                                <td class="text-center">
                                                    <i @click.prevent="eliminarProducto(index)"
                                                        class="fa-solid fa-trash text-danger"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!--Información de la compra-->
                        <div class="row">
                            <h4>Información de entrega</h4>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Fecha de entrega</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>
                                    <input autofocus id="fechaRecibirComprobante" required type="date"
                                        v-model="fechaEntrega" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleFormControlInput1" class="form-label">Total</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-hashtag"></i>
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
                                        accept="image/*" required>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary " :disabled="botonDeshabilitado"
                                @click.prevent="submitForm"><i class="fa-solid fa-save"></i> Guardar registro</button>
                            <RouterLink :to="{ name: 'purchasesmenu' }">
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

//#region Método de creación de productos
const productos = ref([]);
const nombreProducto = ref("");
const cantidadProducto = ref(0);
const precioProducto = ref(0);
const productoYaExiste = ref(false);

const cursoYaExiste = ref(false); //Alerta

const agregarProducto = () => {
    if (nombreProducto.value !== "" && cantidadProducto.value > 0 && precioProducto.value > 0) {
        const existeProducto = productos.value.find(a => a.nombreProducto.toUpperCase() === nombreProducto.value.toUpperCase());
        if (!existeProducto) {
            productos.value.push({
                nombreProducto: nombreProducto.value,
                cantidadProducto: cantidadProducto.value,
                precioProducto: precioProducto.value
            });
            nombreProducto.value = ""; // Limpiar el input después de agregar
            cantidadProducto.value = "";
            precioProducto.value = "";
            productoYaExiste.value = false;

        } else {
            productoYaExiste.value = true;
        }
    }else{
        alert("Complete todos los campos para guardar un producto")
    }
};

//Eliminar producto en el array
const eliminarProducto = (index) => {
    productos.value.splice(index, 1);
};
//#endregion


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


//PARA CARGAR IMAGENES
const handleFileChange = (event) => {
    imgEstudiante.value = event.target.files[0];
};

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
    // Aquí puedes realizar cualquier otr   a lógica que necesites con el estudiante seleccionado
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


onMounted(async () => {
    getProveedores();
    getEstudiantes();
});


const submitForm = async () => {
    if (!titulo.value || !codigoProveedor.value ||
        !idEstudiante.value || !descripcion.value) {
        return Swal.fire({
                    icon: 'warning',
                    title: "Completa todos los campos antes de enviar",
                    showConfirmButton: false, // Ocultar el botón "Aceptar"
                    timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
                });
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



    try {
        if (!authStore.token) {
            return alert('No estás autorizado para realizar esta acción.');
        }

        const headers = {
            Authorization: `Bearer ${authStore.token}`,
        };

        const response = await fetch(`${baseBackend}/api/compra/create`, {
            method: 'POST',
            body: formData,
            headers,
        });

        for (const [key, value] of formData.entries()) {
            console.log(`Clave: ${key}, Valor: ${value.toString()}`);
        }

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
                title: 'No se pudo registrar la compra.',
                showConfirmButton: false, // Ocultar el botón "Aceptar"
                timer: 1500 // Tiempo en milisegundos antes de que se cierre automáticamente
            });
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