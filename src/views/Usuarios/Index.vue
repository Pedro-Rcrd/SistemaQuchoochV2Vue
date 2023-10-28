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
    getUsuarios(1)
})

const usuarios = ref([])
const form = ref({
    codigoRol: 0,
    nombreUsuario: '',
    fechaCreacion: '',
    contrasenia: ''

});

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const rows = ref(0);

const load = ref(false)
const getUsuarios = async (page) => {
    try {
        const response = await axios.get(`/api/Usuario/getall?pagina=${page}`)
        usuarios.value = response.data.usuarios.map(user => ({
            ...user,
            fechaCreacion: formatFecha(user.fechaCreacion) // Formatea la fecha
        }))
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
    }
}


const deleteUsuario = (id, name) => {
    confirmation(name, `/api/Usuario/delete/${id}`, '/users', authStore.authToken);
};

//Formatear FECHA
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const openModal = (op, codigoUsuario, codigoRol, nombreUsuario, contrasenia, fechaCreacion) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
    operation.value = op;
    id.value = codigoUsuario;
    if (op == 1) {
        title.value = 'Crear Registro'

    } else {
        title.value = 'Actualizar Registro';
        form.value.codigoRol = codigoRol;
        form.value.nombreUsuario = nombreUsuario;
        form.value.fechaCreacion = fechaCreacion;
        form.value.contrasenia = contrasenia;
    }
}
const clear = () => {
    form.value.codigoRol = '';
    form.value.nombreUsuario = '';
    form.value.fechaCreacion = '';
    form.value.contrasenia = '';

}

const save = async () => {
    let res;
    //console.log(`que esta en form ${form.value.nombreNivelAcademico}`)
    if (operation.value == 1) {
        res = await sendRequest('POST', form.value, '/api/Usuario/create', '');

        if (res == true) {
            clear();
            nextTick(() => nameInput.value.focus());
            getUsuarios(1);
        }
    } else {
        /*         for (let i = 0; i < form.value.length; i++) {
                    console.log(form.value[i]);
                }
                console.log("llegó aquí") */
        res = await sendRequest('PUT', form.value, `/api/Usuario/update/${id.value}`, '');

        if (res == true) {
            nextTick(() => close.value.click());
            getUsuarios(1);
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
            <h2>Lista de Usuarios</h2>
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
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Fehca de creación</th>

                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="na, i in usuarios" :key="na.codigoUsuario">
                                <td>{{ (i + 1) }}</td>
                                <td>{{ na.nombreUsuario }}</td>
                                <td>{{ na.nombreRol }}</td>
                                <td>{{ na.fechaCreacion }}</td>
                                <td class="text-center">
                                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal"
                                        @click="$event => openModal(2, na.codigoUsuario, na.codigoRol, na.nombreUsuario, na.contrasenia, na.fechaCreacion,)">
                                        <i class="fa-solid fa-edit"></i>

                                    </button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger btn-sm"
                                        @click="$event => deleteUsuario(na.codigoUsuario, na.nombreUsuario)">
                                        <i class="fa-solid fa-trash"></i>

                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <Paginate :page-count="rows" :click-handler="getUsuarios" :prev-text="Prev" :next-text="Next"
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
                        <input autofocus type="text" v-model="form.nombreUsuario" placeholder="Usuario" required
                            class="fomr-control" ref="nameInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <div class="d-grid col-5">
                            <select v-model="form.codigoRol" class="form-control form-select">
                            <option value="1">Administrador</option>
                            <option value="2">Secretaria</option>
                        </select>
                        </div>
                       

                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <input autofocus type="text" v-model="form.contrasenia" placeholder="Contraseña" required
                            class="fomr-control" ref="nameInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="fa-solid fa-building"></i>
                        </span>
                        <div class="d-grid col-5 ">
                            <input autofocus type="date" v-model="form.fechaCreacion" placeholder="Fecha de creación"
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