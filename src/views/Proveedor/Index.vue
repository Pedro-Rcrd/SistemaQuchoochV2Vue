<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Modal from '../../components/Modal.vue'
import Paginate from 'vuejs-paginate-next'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
    getProveedores(1)
})

const proveedores = ref([])
const form = ref({
    nombreProveedor: '',
    nombreEncargado: '',
    telefono: '',
    descripcion: ''

});

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const rows = ref(0);

const load = ref(false)
const getProveedores = async (page) => {
    try {
        const response = await axios.get(`/api/Proveedor/getall?pagina=${page}`)
        proveedores.value = response.data.proveedores;
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener proveedores:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deleteProveedor = (id, name) => {
    confirmation(name, `/api/Proveedor/delete/${id}`, '/suppliers', authStore.authToken);
};

const openModal = (op, codigoProveedor, nombreProveedor, nombreEncargado, telefono, descripcion) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoProveedor;
    if (op == 1) {
        title.value = 'Crear Registro'

    } else {
        title.value = 'Actualizar Registro';
        form.value.nombreProveedor = nombreProveedor;
        form.value.nombreEncargado = nombreEncargado;
        form.value.telefono = telefono;
        form.value.descripcion = descripcion;
    }
}
const clear = () => {
    form.value.nombreProveedor = '';
    form.value.nombreEncargado = '';
    form.value.telefono = '';
    form.value.descripcion = '';

}

const save = async () => {
    let res;
    //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Proveedor/create', '');

        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getProveedores(1);
        }
    } else {
        /*         for (let i = 0; i < form.value.length; i++) {
                    console.log(form.value[i]);
                }
                console.log("llegó aquí") */
        res = await sendRequest('PUT', form.value, `/api/Proveedor/update/${id.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getProveedores(1);
        }

    }
}
</script>

<style scoped>
.contenedor-primario {
    margin-top: 60px;
    margin-left: 85px;
}
</style>

<template>
    <div class="row contenedor-primario d-flex justify-content-center align-items-center">
        <div class="row">
            <h2>Lista de Proveedores</h2>
            <div class="col-md-2">
                <div class="d-grid col-10">
                    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal"
                        @click="$event => openModal(1)">
                        <i class="fa-solid fa-circle-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card border border-white text-center" v-if="!load">
                    <div class="card-body">
                        <img src="/loading.gif" alt="img-fluid">
                    </div>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Proveedor</th>
                                <th>Encargado</th>
                                <th>Teléfojo</th>
                                <th>Descripción</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="na, i in proveedores" :key="na.codigoProveedor">
                                <td>{{ (i + 1) }}</td>
                                <td>{{ na.nombreProveedor }}</td>
                                <td>{{ na.nombreEncargado }}</td>
                                <td>{{ na.telefono }}</td>
                                <td>{{ na.descripcion }}</td>
                                <td class="text-center">
                                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal"
                                        @click="$event => openModal(2, na.codigoProveedor, na.nombreProveedor, na.nombreEncargado, na.telefono, na.descripcion)">
                                        <i class="fa-solid fa-edit"></i>

                                    </button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger btn-sm"
                                        @click="$event => deleteProveedor(na.codigoProveedor, na.nombreProveedor)">
                                        <i class="fa-solid fa-trash"></i>

                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <Paginate :page-count="rows" :click-handler="getProveedores" :prev-text="Prev" :next-text="Next"
                        :container-class="'pagination'">
                    </Paginate>
                </div>
            </div>
        </div>
        <Modal :id="'modal'" :title="title">
            <div class="modal-body">
                <form @submit.prevent="save">

                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="form.nombreProveedor" placeholder="Proveedor"
                            required class="fomr-control" ref="nameInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="form.nombreEncargado" placeholder="Encargado"
                            required class="fomr-control" ref="nameInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="form.telefono" placeholder="Telefono"
                            required class="fomr-control" ref="nameInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <div class="d-grid col-8 ">
                            <input autofocus type="text" v-model="form.descripcion" placeholder="Descripción"
                            required class="fomr-control" ref="nameInput">

                        </div>
                        
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

        </Modal>
    </div>
</template>