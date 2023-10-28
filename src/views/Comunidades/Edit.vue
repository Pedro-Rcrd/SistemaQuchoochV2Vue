<script setup>
import { ref, onMounted } from 'vue'
import { sendRequest } from '../../functions'
import { useAuthStore } from '../../stores/auth'
import { useRoute} from 'vue-router'
 
const route = useRoute();

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}` // Agrega espacio después de 'Bearer'

const form = ref({codigoComunidad: 0, nombreComunidad: ''});
const parametro = route.params.codigoComunidad
console.log(`Aqui que onda ${parametro}`)

//const codigoComunidad = ref(this.$route.params.codigoComunidad);
onMounted( () => {getComunidad ()});
const getComunidad = () =>{
    axios.get(`/api/Comunidad/${parametro}`).then(
        response => (form.value.codigoComunidad = response.data.codigoComunidad, form.value.nombreComunidad = response.data.nombreComunidad)
    );
}
const nameInput = ref('');
const save = () =>{
    sendRequest('PUT',form.value,`/api/Comunidad/${parametro}`, '/users');
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
                                <i class="fa-solid fa-building"></i> 
                            </span>
                            <input autofocus type="text" v-model="form.nombreComunidad" placeholder="Comunidad" required class="fomr-control">
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