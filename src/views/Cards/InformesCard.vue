<script setup>
import { ref, onMounted, nextTick } from "vue";
import { confirmation, sendRequest } from "../../functions";
import { useAuthStore } from "../../stores/auth";
import axios from "axios";
import Paginate from "vuejs-paginate-next";

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
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
  <div class="row justify-content-center" v-if="authStore.moduloInforme">
    <div class="row col-10">
      <h2>Menú de Informes</h2>
      <hr />

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/graduacion.png"
              alt="Card image cap"
            />
          </div>
        </div>

        <h5 class="card-title text-color-card">Estudiantes</h5>
        <RouterLink
          :to="{ name: 'exportreportstudents' }"
          class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/fichanuevo.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Fichas de calificaciones</h5>
        <RouterLink :to="{ name: 'exportreportcard' }" class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/fichanuevo.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Historial de Fichas</h5>
        <RouterLink :to="{ name: 'historial' }" class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/fichanuevo.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Evaluación de rendimiento</h5>
        <RouterLink :to="{ name: 'promediosGenerales' }" class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/patrocinadores.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Patrocinadores</h5>
        <RouterLink
          :to="{ name: 'exportreportsponsor' }"
          class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>

      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/gastos.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Gastos</h5>
        <RouterLink
          :to="{ name: 'exportreportexpeses' }"
          class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>
      <div class="card me-4 mb-3" style="width: 18rem; height: 15.3rem">
        <div class="row align-items-center" style="margin-top: -4px">
          <div class="divimg mt-1 contenedor-card" style="width: 18rem">
            <img
              class="card-img-top"
              style="height: 10rem"
              src="../../../public/compras.png"
              alt="Card image cap"
            />
          </div>
        </div>
        <h5 class="card-title text-color-card">Compras</h5>
        <RouterLink
          :to="{ name: 'exportreportpurchases' }"
          class="no-underline btn bg-boton"
          >Ver</RouterLink
        >
      </div>
    </div>
  </div>
</template>
