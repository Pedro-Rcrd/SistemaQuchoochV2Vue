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
        getEstablecimientos(1)
});


const establecimientos = ref([]);
const load = ref(false);
const rows = ref(0);
const currentPage = ref(1); // Página actual
const itemsPerPage = ref(10); // Número de elementos por página

const form = ref({
    nombreEstablecimiento: ''
});
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);

const idCarrera = ref(0);



const getEstablecimientos = async (page) => {
    try {
        const response = await axios.get('/api/Establecimiento/getall')
        establecimientos.value = response.data.establecimientos
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deleteEstablecimiento = (id, name) => {
    confirmation(name, `/api/Establecimiento/delete/${id}`, '/establishments', authStore.authToken);
};

const openModal = (op, codigoEstablecimiento, nombreEstablecimiento) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoEstablecimiento;
    if (op == 1) {
        title.value = 'Crear '

    } else {
        title.value = 'Actualizar Carrera';
        form.value.nombreEstablecimiento = nombreEstablecimiento;
    }
}
const clear = () => {
    form.value.nombreEstablecimiento = '';
}

const save = async () => {
    let res;
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Establecimiento/create', '');
        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getEstablecimientos(1);
        }
    } else {
        res = await sendRequest('PUT', form.value, `/api/Establecimiento/update/${id.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getEstablecimientos(1);
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
            <h2>Lista de Establecimientos</h2>
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
                                <th>Carrera</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="c, i in establecimientos" :key="c.codigoEstablecimiento">
                                <td>{{ (i + 1) }}</td>

                                <td>{{ c.nombreEstablecimiento }}</td>
                                <td class="text-center">
                                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal"
                                        @click="$event => openModal(2, c.codigoEstablecimiento, c.nombreEstablecimiento)">
                                        <i class="fa-solid fa-edit"></i>

                                    </button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger btn-sm"
                                        @click="$event => deleteEstablecimiento(c.codigoEstablecimiento, c.nombreEstablecimiento)">
                                        <i class="fa-solid fa-trash"></i>

                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Paginate :page-count="rows"
                :click-handler="getEstablecimientos"
                :prev-text="Prev"
                :next-text="Next"
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
                        <input autofocus type="text" v-model="form.nombreEstablecimiento" placeholder="Establecimiento" required
                            class="fomr-control" ref="nameInput">
                    </div>
                    <div class="d-grid col-10 mx-auto">
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