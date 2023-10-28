<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { confirmation, sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'
import Paginate from 'vuejs-paginate-next'

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

onMounted(() => {
    getCompras(1)
})

const compras = ref([])

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idGasto = ref(0);
const rows = ref(0);

const load = ref(false)
const getCompras = async (page) => {
    try {
        const response = await axios.get(`/api/Compra/getall?pagina=${page}`)
        compras.value = response.data.compras.map(expense => ({
            ...expense,
            fechaCreacion: formatFecha(expense.fechaCreacion) // Formatea la fecha
        }))
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deleteCompra = (id, name) => {
    confirmation(name, `/api/Compra/delete/${id}`, '/purchases', authStore.authToken);
};


// Función para formatear la fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
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
            <h2>Lista de Compras</h2>
            <div class="col-md-2">
                <div class="d-grid col-10">
                    <router-link :to="{ path: 'createpurchase' }">

                        <button class="btn btn-dark">
                            <i class="fa-solid fa-circle-plus"></i> Agregar
                        </button>
                    </router-link>
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
                                <th>Nombre</th>
                                <th>Titulo</th>
                                <th>Proveedor</th>
                                <th>Total</th>
                                <th>Fecha de entrega</th>
                                <th>Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="cmp, i in compras" :key="cmp.codigoOrdenCompra">
                                <td>{{ (i + 1) }}</td>
                                <td>{{ cmp.estudiante }}</td>
                                <td>{{ cmp.titulo }}</td>
                                <td>{{ cmp.proveedor }}</td>
                                <td>{{ cmp.total }}</td>
                                <td>{{ cmp.fechaCreacion }}</td>
                                <td class="text-center align-middle">
                                    <P
                                        :class="{ 'bg-success text-white': cmp.estado === 'A', 'bg-danger text-white': cmp.estado === 'F' }">
                                        {{ cmp.estado === 'A' ? 'Activo' : cmp.estado === 'F' ? 'Finalizado' : cmp.estado }}
                                    </P>
                                </td>
                                <td class="text-center">
                                    <router-link :to="{ path: 'informationpurchase/' + cmp.codigoOrdenCompra }"
                                        class="btn btn-secondary active btn-sm">
                                        <i class="fa-solid fa-eye"></i>
                                    </router-link>
                                </td>
                                <td class="text-center">
                                    <router-link :to="{ path: 'editpurchase/' + cmp.codigoOrdenCompra }"
                                        class="btn btn-warning btn-sm">
                                        <i class="fa-solid fa-edit"></i>
                                    </router-link>
                                </td>

                            </tr>
                        </tbody>

                    </table>
                    <Paginate :page-count="rows" :click-handler="getCompras" :prev-text="Prev" :next-text="Next"
                        :container-class="'pagination'">
                    </Paginate>
                </div>
            </div>
        </div>

    </div>
</template>