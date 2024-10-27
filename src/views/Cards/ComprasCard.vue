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

.contenedor-card {
    background-color: rgba(128, 128, 9, 0.067);
}

.bg-boton {
        background-color: #768009;
        color: #fff;
        transition: background-color 0.3s; 
    }
    .bg-boton:hover {
    background-color: #5c6e00; /* Color más oscuro al pasar el mouse por encima */
}

.text-color-card {
    color: #157347;
}
</style>

<template>
    <div class="row justify-content-center">
      
            <div class="row col-10">
            <h2>Menú de Compras</h2> <hr>

                <div class="card me-4 mb-3 " style="width: 18rem; height: 15.3rem;">
                    <div class=" row align-items-center " style="margin-top: -4px;">
                        <div class="divimg  mt-1 contenedor-card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/compra.png"
                            alt="Card image cap">
                    </div>

                    </div>
             
                    <h5 class="card-title text-color-card">Compras</h5>
                    <RouterLink :to="{ name: 'createpurchase'}" class="no-underline btn bg-boton" v-if="authStore.crearModCompra">Nuevo registro</RouterLink>
                </div>
                <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                    <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/informe.png"
                            alt="Card image cap">

                    </div>
                </div>
                    <h5 class="card-title text-color-card">Lista de compras</h5>
                    <RouterLink :to="{ name: 'purchases' }" class="no-underline btn bg-boton">Ver</RouterLink>
                </div>
            </div>
    </div>
</template>