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
    getPais(1)
})

const paises = ref([])
const form = ref({
    nombrePais: ''
});

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idPais = ref(0);
const rows = ref(0);

const load = ref(false)
const getPais = async (page) => {
    try {
        const response = await axios.get(`/api/pais?pagina=${page}`)
        paises.value = response.data.paises;
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deletePais = (id, name) => {
    confirmation(name, `/api/pais/delete/${id}`, '/countries', authStore.authToken);
};

const openModal = (op, codigoPais, nombre) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoPais;
    if (op == 1) {
        title.value = 'Crear Registro'

    } else {
        title.value = 'Actualizar Registro';
        form.value.nombre = nombre;
        idPais.value = codigoPais;
    }
}
const clear = () => {
    form.value.nombre = '';

}

const save = async () => {
    let res;
    //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/pais/create', '');

        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getPais(1);
        }
    } else {
/*         for (let i = 0; i < form.value.length; i++) {
            console.log(form.value[i]);
        }
        console.log("llegó aquí") */
        res = await sendRequest('PUT', form.value, `/api/Pais/update/${idPais.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getPais(1);
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
            <h2>Lista de Paises</h2>
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
                            <th>Pais</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="ps, i in paises" :key="ps.codigoPais">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ ps.nombre }}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal"
                                    @click="$event => openModal(2, ps.codigoPais, ps.nombre)">
                                    <i class="fa-solid fa-edit"></i>

                                </button>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm"
                                    @click="$event => deletePais(ps.codigoPais, ps.nombre)">
                                    <i class="fa-solid fa-trash"></i>

                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getPais"
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
                    <input autofocus type="text" v-model="form.nombre" placeholder="Pais" required
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