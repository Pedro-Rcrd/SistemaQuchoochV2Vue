<script setup>
import {RouterView } from 'vue-router'
import Nav from './components/Navbar.vue'
import MainLayout from './Layouts/MainLayout.vue'


</script>

<template>
<MainLayout>
  <div class="container-fluid mt-3">
    <RouterView />
  </div>
</MainLayout>
 
</template>

<style scoped></style>
