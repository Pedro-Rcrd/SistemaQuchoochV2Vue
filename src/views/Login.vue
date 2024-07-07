<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const form = ref({
    email: '',
    contrasenia: ''
});

const botonDeshabilitado = ref(false);

const submitForm = () => {
    // Validaciones
    const response = authStore.login(form.value);
    console.log("P");
};


</script>

<template>
    <div class="container">
        <div class="row justify-content-center" style="margin-top: 5rem">
            <div class="" style="max-width: 19.5rem;">
                <div class="card border">
                    <div class="mb-3">
                        <div class="row justify-content-center">
                            <img class="" style="width: 13rem;" src="../../public/logo_quchooch.png"
                                alt="Logotipo asociación quchooch">
                        </div>


                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitForm">
                            <div class="input-group mb-3">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-at"></i>
                                </span>
                                <input autofocus type="text" v-model="form.email" placeholder="Email"
                                    class="form-control" required>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-key"></i>
                                </span>
                                <input autofocus type="password" v-model="form.contrasenia" placeholder="Password"
                                    class="form-control" required>
                            </div>
                            <button :disabled="botonDeshabilitado" type="submit" class="quchooch-color col-12 btn">
                                <strong>Login</strong></button>
                        </form>
                        <div v-if="authStore.authInvalidCredentiales" class="alert alert-danger mt-3" role="alert">
                            ¡Credenciales Incorrectas! <i class="fa-solid fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style>
.quchooch-color {
    background-color: #919d0a;
    color: #fff;
    transition: background-color 0.3s, color 0.3s;
    /* transición suave */
}

.quchooch-color:hover {
    background-color: #768009;
    /* color de fondo al pasar el cursor */
    color: white;
    /* color de texto al pasar el cursor */
}
</style>