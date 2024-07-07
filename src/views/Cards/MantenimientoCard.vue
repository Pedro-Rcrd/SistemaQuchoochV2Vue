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
    background-color: #5c6e00;
    /* Color más oscuro al pasar el mouse por encima */
}

.text-color-card {
    color: #157347;
}
</style>

<template>
    <div class="row justify-content-center">

        <div class="row col-10">
            <h2>Menú de Mantenimientos</h2>
            <hr>

            <div class="card me-4 mb-3 " style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/escuela.png"
                            alt="Card image cap">
                    </div>

                </div>

                <h5 class="card-title text-color-card">Carreras</h5>
                <RouterLink :to="{ name: 'careers' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>
            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/comunidad.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Comunidades</h5>
                <RouterLink :to="{ name: 'communities' }" class="no-underline btn bg-boton">Ver</RouterLink>
            </div>

            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/escuela.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Cursos</h5>
                <RouterLink :to="{ name: 'courses' }" class="no-underline btn bg-boton">Ver</RouterLink>
            </div>


            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top " style="height: 10rem;" src="../../../public/colegio.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Establecimientos</h5>
                <RouterLink :to="{ name: 'establishments' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>

            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/niveles.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Niveles Académicos</h5>
                <RouterLink :to="{ name: 'academicLevels' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>
            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;" >
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/paises.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Paises</h5>
                <RouterLink :to="{ name: 'countries' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>
            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/escuela.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Proveedores</h5>
                <RouterLink :to="{ name: 'suppliers' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>
            <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem;" v-if="authStore.authUserRol == 1">
                <div class=" row align-items-center " style="margin-top: -4px;">
                    <div class="divimg  mt-1 contenedor-card " style="width: 18rem;">
                        <img class="card-img-top" style="height: 10rem;" src="../../../public/usuarios.png"
                            alt="Card image cap">

                    </div>
                </div>
                <h5 class="card-title text-color-card">Usuarios</h5>
                <RouterLink :to="{ name: 'users' }" class="no-underline btn bg-boton">Ver
                </RouterLink>
            </div>
        </div>
    </div>
</template>