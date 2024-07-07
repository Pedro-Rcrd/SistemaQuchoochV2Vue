<script setup>
import {RouterView } from 'vue-router'
import Nav from './components/Navbar.vue'
import MainLayout from './Layouts/MainLayout.vue'
import { useAuthStore } from './stores/auth';
import { ref, watch, onMounted, onUnmounted } from 'vue';
const showAlert = ref(null);
const timeOut = ref(10); // Tiempo en segundos
const authStore = useAuthStore();
const resetTimer = () => {
  timeOut.value = 50; // Reinicia el tiempo de cuenta regresiva
};

const handleUserActivity = () => {
  resetTimer();
  showAlert.value = false;
};

const startTracking = () => {
  countdown();
  window.addEventListener('mousemove', handleUserActivity);
  window.addEventListener('keypress', handleUserActivity);
};

const countdown = () => {
  const interval = setInterval(() => {
    if (timeOut.value > 0) {
      timeOut.value--;
      if(timeOut.value > 0 && timeOut.value < 50) {
        showAlert.value = true;
      }
    } else {
      clearInterval(interval);
      authStore.logout();
      stopTracking();
    }
  }, 1000);
}

const stopTracking = () => {
  window.removeEventListener('mousemove', handleUserActivity);
  window.removeEventListener('keypress', handleUserActivity);
};

watch(() => authStore.authToken, () => {
  if(authStore.authToken != null){
    //alert("Se inició la Sesión")
    timeOut.value = 50;
    startTracking();
    
  }else{
    //alert("Se cerró sesión");
    stopTracking();
    timeOut.value = 0;
  }
});

onMounted(() => {
  if(authStore.authToken != null){
    startTracking();
  }
});

onUnmounted(() => {
  stopTracking();
});

</script>

<template>
<MainLayout>
  <div>
    <RouterView/>
    <div v-if="authStore.authToken && showAlert" class="alert alert-danger" role="alert">
      La sesión se cierra en: {{ timeOut }}
    </div>
  </div>
</MainLayout>
</template>

<style scoped>
.alert {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
