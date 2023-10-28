<script setup>
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
</script>
<template >
    <div style="width: 100vw; height: 100vh; overflow-y: auto; ">
        <div class="Contenedor-principal d-flex" style="height: 100%;">
            <div class="d-flex flex-column flex-shrink-0 sidebar-quchooch sidebar-fixed"
                style="width: 7rem; height: 100%; overflow-y: auto; " v-if="authStore.user">
                <a class="d-block link-dark text-decoration-none pt-4" title="" data-bs-toggle="tooltip"
                    data-bs-placement="right" data-bs-original-title="Icon-only">
                    <div class="d-flex align-items-center justify-content-center">
                        <img src="../../public/logo_quchooch.png" alt="Imagen" width="70" height="70">
                    </div>
                </a>
                <ul class="d-block p-3 link-dark d-flex flex-column text-decoration-none align-items-center" style="list-style-type: none; height: 100%;">
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'home' }" class="no-underline">
                            <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip"
                                data-bs-placement="right" data-bs-original-title="Dashboard">
                                <div class="d-flex flex-column align-items-center justify-content-center">
                                    <img src="../../public/inicio.png" alt="Vue" width="30" height="30">
                                    <span class="mt-1 text-color-sidebar">Inicio</span>
                                </div>
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'registermenu' }" class="no-underline">
                            <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip"
                                data-bs-placement="right" data-bs-original-title="Dashboard">
                                <div class="d-flex flex-column align-items-center justify-content-center">
                                    <img src="../../public/menuRegistro.png" alt="Vue" width="30" height="30">
                                    <span class="mt-1 text-color-sidebar">Registros</span>
                                </div>
                            </a>
                        </RouterLink>
                    </li>

                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'purchasesmenu' }" class="no-underline">
                            <a href="#" class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip"
                                data-bs-placement="right" data-bs-original-title="Dashboard">
                                <div class="d-flex flex-column align-items-center">
                                    <img src="../../public/compras.png" alt="Vue" width="30" height="30">
                                    <span class="mt-1 text-color-sidebar">Compras</span>
                                </div>
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'assignmenu' }" class="no-underline">
                        <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right"
                            data-bs-original-title="Dashboard">
                            <div class="d-flex flex-column align-items-center">
                                <img src="../../public/asignarPatrocinador.png" alt="Vue" width="30" height="30">
                                <span class="mt-1 text-color-sidebar">Asignación</span>
                            </div>
                        </a>
                    </RouterLink>
                    </li>
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'reportmenu' }" class="no-underline">
                            <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip"
                                data-bs-placement="right" data-bs-original-title="Dashboard">
                                <div class="d-flex flex-column align-items-center">
                                    <img src="../../public/informe.png" alt="Vue" width="30" height="30">
                                    <span class="mt-1 text-color-sidebar">Informes</span>
                                </div>
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'graphicsmenu' }" class="no-underline">
                            <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip"
                                data-bs-placement="right" data-bs-original-title="Dashboard">
                                <div class="d-flex flex-column align-items-center">
                                    <img src="../../public/analitica.png" alt="Vue" width="30" height="30">
                                    <span class="mt-1 text-color-sidebar">Reportes</span>
                                </div>
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item" style="width: 7rem;">
                        <RouterLink :to="{ name: 'settingcard' }" class="no-underline">
                        <a class="nav-link py-1 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right"
                            data-bs-original-title="Dashboard">
                            <div class="d-flex flex-column align-items-center">
                                <img src="../../public/ajustes.png" alt="Vue" width="30" height="30">
                                <span class="mt-1 text-color-sidebar">Mantenimiento</span>
                            </div>
                        </a>
                    </RouterLink>
                    </li>
                </ul>
            </div>
            <!-- Contenido principal -->
            <div class="contendor-cuerpo flex-grow-1">
                <nav class="navbar navbar-expand-lg navbar-quchooch navbar-fixed-top" v-if="authStore.user">
                    <div class="container-fluid">
                        <a class="navbar-brand" style="color: #fff;">QUCHOOCH</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                            <form class="d-flex">
                                <div class="btn-group" v-if="authStore.user">
                                    <button type="button" class="btn btn-success dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-user"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><button class="dropdown-item" type="button"
                                                @click.prevent="$event => authStore.logout()">Cerrar Sesión</button></li>
                                        
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <div>
                    <slot></slot>

                </div>
                <!-- Otro contenido -->

            </div>

        </div>
    </div>
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
    color: #0F5132;
}
.navbar-fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; /* Ajusta este valor según tus necesidades */
}

.sidebar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1; /* Ajusta este valor según tus necesidades */
  margin-top: 50px;
}

/*HOVER*/ 
li a:hover {
    background-color: rgba(128, 128, 9, 0.393);/* Cambiar el color de fondo del enlace al pasar el ratón por encima */
}
li a:hover span.text-color-sidebar {
    color: #fff; /* Cambiar el color del texto dentro del span al pasar el ratón por encima */
}

</style>