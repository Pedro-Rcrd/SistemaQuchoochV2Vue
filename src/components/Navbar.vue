<script setup>
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Quchooch</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user">
        <li class="nav-item">
          <RouterLink to="/communities" class="nav-link">Comunidades</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/users" class="nav-link">Usuarios</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/usergraphs" class="nav-link">Graficas de usuarios</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/userreports" class="nav-link">Reportes</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/register" class="nav-link">Registrar usuario</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user">
        <li class="nav-item px-lg-5">
            <button @click.prevent="$event =>authStore.logout()" class="btn btn-success">Salir</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

