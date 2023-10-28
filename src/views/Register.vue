<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const form = ref({codigoRol: 0 ,nombreUsuario: '',fechaCreacion: '', contrasenia: ''});
</script>

<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success">
                <div class="card-header bg-success border border-success text-white">LOGIN</div>
                <div class="card-body">
                    <form @submit.prevent="$event=> authStore.register(form)">
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
                            <button class="btn btn-dark">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

