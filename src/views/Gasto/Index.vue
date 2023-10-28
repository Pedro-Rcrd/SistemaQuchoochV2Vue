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
    getGastos(1)
})

const gastos = ref([])

const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);
const idGasto = ref(0);
const rows = ref(0);

const load = ref(false)
const getGastos = async (page) => {
    try {
        const response = await axios.get(`/api/Gasto/getall?pagina=${page}`)
        gastos.value = response.data.gastos.map(expense => ({
            ...expense,
            fechaEntrega: formatFecha(expense.fechaEntrega) // Formatea la fecha
        }))
        rows.value = response.data.totalPaginas;
        load.value = true
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        // Puedes manejar el error de la solicitud aquí
    }
}

const deleteGasto = (id, name) => {
    confirmation(name, `/api/Gasto/delete/${id}`, '/expenses', authStore.authToken);
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
        <h2>Lista de gastos</h2>
        <div class="col-md-2">
            <div class="d-grid col-10">
                <router-link :to="{ path: 'createexpense'}" >
                                
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
                            <th>Tipo pago</th>
                            <th>Numero cheque</th>
                            <th>Monto</th>
                            <th>Fecha de entrega</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="gs, i in gastos" :key="gs.codigoGasto">
                            <td>{{ (i + 1) }}</td>
                            <td>{{ gs.estudiante}}</td>
                            <td>{{ gs.titulo}}</td>
                            <td> {{ gs.tipoPago === 'C' ? 'Cheque' : gs.tipoPago === 'E' ? 'Efectivo' : gs.tipoPago }}</td>
                            <td>{{ gs.numeroCheque}}</td>
                            <td>{{ gs.monto}}</td>
                            <td>{{ gs.fechaEntrega}}</td>
                            <td  class="text-center align-middle"><P :class="{'bg-success text-white': gs.estado === 'A', 'bg-danger text-white': gs.estado === 'F'}">
                                {{ gs.estado === 'A' ? 'Activo' : gs.estado === 'F' ? 'Finalizado' : gs.estado }}</P></td>
                                <td class="text-center">
                                <router-link :to="{ path: 'informationexpense/' + gs.codigoGasto }" class="btn btn-secondary active btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ path: 'editexpense/' + gs.codigoGasto }" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                            </td>
          
                        </tr>
                    </tbody>

                </table>
                <Paginate :page-count="rows"
                :click-handler="getGastos"
                :prev-text="Prev"
                :next-text="Next"
                :container-class="'pagination'">
                </Paginate>
            </div>
        </div>
    </div>

</div>
</template>