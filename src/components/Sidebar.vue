<script setup>
import { useAuthStore } from "../stores/auth";
import { ref, watch } from "vue";
const authStore = useAuthStore();

const drawer = ref(null);
const data = () => ({
  items: [{ title: "Cerrar Sesión" }],
});
//Cuando se elige esta opción se cierra sesion
const handleItemClick = (item) => {
  if (item.title === "Cerrar Sesión") {
    authStore.logout();
  }
};
</script>
<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      :width="140"
      class="bg-orange-lighten-5"
      v-if="authStore.user"
    >
      <v-list-item
        prepend-avatar="../../public/logo_quchooch.png"
        title=""
        :subtitle="authStore.userName"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="" title="" value="inicio">
          <RouterLink :to="{ name: 'home' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center justify-content-center">
                <img src="../../public/inicio.png" alt="Vue" width="30" height="30" />
                <span class="mt-1 text-color-sidebar">Inicio</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="registro"
          v-if="authStore.moduloRegistro"
        >
          <RouterLink :to="{ name: 'registermenu' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center justify-content-center">
                <img
                  src="../../public/menuRegistro.png"
                  alt="Vue"
                  width="30"
                  height="30"
                />
                <span class="mt-1 text-color-sidebar">Registros</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="compras"
          v-if="authStore.moduloCompra"
        >
          <RouterLink :to="{ name: 'purchasesmenu' }" class="no-underline">
            <a
              href="#"
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center">
                <img src="../../public/compras.png" alt="Vue" width="30" height="30" />
                <span class="mt-1 text-color-sidebar">Compras</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="asignacion"
          v-if="authStore.moduloAsignacion"
        >
          <RouterLink :to="{ name: 'assignmenu' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center">
                <img
                  src="../../public/asignarPatrocinador.png"
                  alt="Vue"
                  width="30"
                  height="30"
                />
                <span class="mt-1 text-color-sidebar">Asignación</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="reporte"
          v-if="authStore.moduloInforme"
        >
          <RouterLink :to="{ name: 'reportmenu' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center">
                <img src="../../public/informe.png" alt="Vue" width="30" height="30" />
                <span class="mt-1 text-color-sidebar">Informes</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="graficas"
          v-if="authStore.moduloReporte"
        >
          <RouterLink :to="{ name: 'graphicsmenu' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center">
                <img src="../../public/analitica.png" alt="Vue" width="30" height="30" />
                <span class="mt-1 text-color-sidebar">Reportes</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
        <v-list-item
          prepend-icon=""
          title=""
          value="mantenimiento"
          v-if="authStore.moduloMantenimiento"
        >
          <RouterLink :to="{ name: 'settingcard' }" class="no-underline">
            <a
              class="nav-link border-bottom"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              <div class="d-flex flex-column align-items-center">
                <img src="../../public/ajustes.png" alt="Vue" width="30" height="30" />
                <span class="mt-1 text-color-sidebar">Mantenimiento</span>
              </div>
            </a>
          </RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-toolbar app class="bg-lime-darken-3">
        <v-btn
          @click.stop="drawer = !drawer"
          density="compact"
          icon=""
          size="x-large"
          v-if="authStore.user"
          ><i class="fa-solid fa-bars"></i
        ></v-btn>
        <v-toolbar-title> QUCHOOCH </v-toolbar-title>

        <v-menu v-if="authStore.user">
          <template v-slot:activator="{ props }">
            <v-btn density="compact" icon="" size="x-large" v-bind="props">
              <i class="fa-solid fa-user"></i>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in data().items"
              :key="index"
              :value="index"
              @click.prevent="($event) => handleItemClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <slot> </slot>
    </v-main>
  </v-layout>
</template>

<style scoped>
.navbar-quchooch {
  background-color: #768009;
}

.sidebar-quchooch {
  background-color: rgba(128, 128, 9, 0.13);
}

.no-underline {
  text-decoration: none;
}

.text-color-sidebar {
  color: #0f5132;
}

.navbar-fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.sidebar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  /* Ajusta este valor según tus necesidades */
  margin-top: 50px;
}

/*HOVER*/
li a:hover {
  background-color: rgba(128, 128, 9, 0.393);
  /* Cambiar el color de fondo del enlace al pasar el ratón por encima */
}

li a:hover span.text-color-sidebar {
  color: #fff;
  /* Cambiar el color del texto dentro del span al pasar el ratón por encima */
}
</style>
