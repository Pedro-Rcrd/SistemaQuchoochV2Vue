<script setup>
import { ref, onMounted } from 'vue'
import { sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import { useRoute } from 'vue-router'

const route = useRoute()

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

const form = ref({
  codigoRol: 0,
  codigoUsuario: 1,
  nombreUsuario: '',
  fechaCreacion: '',
  contrasenia: ''
})

const parametro = route.params.codigoUsuario

onMounted(() => {
  getUser()
})

const getUser = () => {
  axios.get(`/api/Usuario/${parametro}`).then(
    response => {
      form.value.codigoUsuario = response.data.codigoUsuario
      form.value.codigoRol = 1
      form.value.nombreUsuario = response.data.nombreUsuario
      form.value.fechaCreacion = formatFecha(response.data.fechaCreacion) // Aplica el formateo
      form.value.contrasenia = response.data.contrasenia
    }
  )
}

const nameInput = ref('')

const formatFecha = (fecha) => {
  const date = new Date(fecha)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const save = () => {
  sendRequest('PUT', form.value, `/api/Usuario/update/${parametro}`, '/users')
}
</script>

<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success">
                <div class="card-header bg-success border border-success"></div>
                <div class="card-body">
                    <form @submit.prevent="save">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-at"></i> 
                            </span>
                            <input autofocus type="number" v-model="form.codigoRol" placeholder="Rol" class="fomr-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-user"></i> 
                            </span>
                            <input autofocus type="text" v-model="form.nombreUsuario" placeholder="Usuario" class="fomr-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-key"></i> 
                            </span>
                            <input autofocus type="password" v-model="form.contrasenia" placeholder="Contraseña" class="fomr-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-data"></i> 
                            </span>
                            <input autofocus type="date" v-model="form.fechaCreacion" placeholder="FechaCreación" class="fomr-control">
                        </div>
 
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-dark">
                                <i class="fa-solid fa-save"></i>Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>