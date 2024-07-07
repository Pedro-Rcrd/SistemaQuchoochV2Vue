import axios from "axios";
import { defineStore } from 'pinia';
import { show_alerta } from '../functions';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: null, authToken: null, authUserName: null, authUserRol: null, authInvalidCredentiales: null,
    moduloRegistro: null, moduloCompra: null, moduloAsignacion: null, moduloInforme: null,
    moduloReporte: null, moduloMantenimiento: null,
    crearModRegistro: null, modificarModRegistro:null, visualizarModRegistro:null,exportarModRegistro:null,
    crearModCompra: null, modificarModCompra:null, visualizarModCompra:null,exportarModCompra:null,
    crearModAsignacion: null, modificarModAsignacion:null, visualizarModAsignacion:null,exportarModAsignacion:null,
    visualizarModInforme:null, exportarModInforme:null,
    visualizarModReporte:null, exportarModReporte:null

  }),
  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken,
    userName: (state) => state.authUserName,
    userRol: (state) => state.authUserRol,
    showInvalidCredentials: (state) => state.authInvalidCredentiales,
    //Accesos a modulos
    accesoModuloRegistro: (state) => state.moduloRegistro,

    accesoModuloCompra: (state) => state.moduloCompra,
    accesoModuloAsignacion: (state) => state.moduloAsignacion,
    accesoModuloInforme: (state) => state.moduloInforme,
    accesoModuloReporte: (state) => state.moduloReporte,
    //Acciones
    accesoModuloMantenimiento: (state) => state.moduloMantenimiento,
    accesoCrearModRegistro: (state) => state.crearModRegistro,
    accesoModificarModRegistro: (state) => state.modificarModRegistro,
    accesoVisualizarModRegistro: (state) => state.visualizarModRegistro,
    accesoExportarModRegistro: (state) => state.exportarModRegistro,
    //compra
    accesoCrearModCompra: (state) => state.crearModCompra,
    accesoModificarModCompra: (state) => state.modificarModCompra,
    accesoVisualizarModCompra: (state) => state.visualizarModCompra,
    accesoExportarModCompra: (state) => state.exportarModCompra,
    //asignación
    accesoCrearModAsignacion: (state) => state.crearModAsignacion,
    accesoModificarModAsignacion: (state) => state.modificarModAsignacion,
    accesoVisualizarModAsignacion: (state) => state.visualizarModAsignacion,
    accesoExportarModAsignacion: (state) => state.exportarModAsignacion,
    //Informe
    accesoVisualizarModInforme: (state) => state.visualizarModInforme,
    accesoExportarModInforme: (state) => state.exportarModInforme,
    //reporte
    accesoVisualizarModReporte: (state) => state.visualizarModReporte,
    accesoExportarModReporte: (state) => state.exportarModReporte,
  },
  actions: {
    async login(form) {
      this.authInvalidCredentiales = null;
      await axios.post('/api/login/authenticate', form).then(
        (res) => {
          this.authToken = res.data.token;
          this.authUser = res.data.status;
          this.authUserName = (res.data.nombreUsuario).split(" ", 1);
          this.authUserRol = res.data.codigoRol;
          this.authInvalidCredentiales = null;
          // this.router.push('/');
          //Método
          const permisos = res.data.permisos;
          this.moduloRegistro = permisos['1'] || null;
          this.moduloCompra = permisos['2'] || null;
          this.moduloAsignacion = permisos['3'] || null;
          this.moduloInforme = permisos['4'] || null;
          this.moduloReporte = permisos['5'] || null;
          this.moduloMantenimiento = permisos['6'] || null;

          if(this.moduloRegistro != null){
          this.crearModRegistro = this.moduloRegistro.includes(1); //Crear
          this.modificarModRegistro = this.moduloRegistro.includes(2); //Eliminar
          this.visualizarModRegistro = this.moduloRegistro.includes(4); //Ver
          this.exportarModRegistro = this.moduloRegistro.includes(5); //Exportar
          }
          if(this.moduloCompra != null){
            this.crearModCompra = this.moduloCompra.includes(1);
            this.modificarModCompra = this.moduloCompra.includes(2);
            this.visualizarModCompra = this.moduloCompra.includes(4);
            this.exportarModCompra = this.moduloCompra.includes(5)
          }
          if(this.moduloAsignacion != null){
            this.crearModAsignacion = this.moduloAsignacion.includes(1);
            this.modificarModAsignacion = this.moduloAsignacion.includes(2);
            this.visualizarModAsignacion = this.moduloAsignacion.includes(4);
            this.exportarModAsignacion = this.moduloAsignacion.includes(5);
          }
          if(this.moduloInforme != null){
            this.exportarModInforme = this.moduloInforme.includes(5);
          }
          if(this.moduloReporte != null){
            this.exportarModReporte = this.moduloReporte.includes(5);
          }

          
          
          // Recorre cada módulo y sus permisos
          //console.log(permisos);
          //for (const modulo in permisos) {
          //  if (permisos.hasOwnProperty(modulo)) {
          //    const codigoModulo = modulo;
          //    const codigoAcciones = permisos[modulo];
//
          //    console.log(`Módulo ${codigoModulo}:`);
          //    codigoAcciones.forEach(codigoAccion => {
          //      console.log(`  Código de Acción: ${codigoAccion}`);
          //    });
          //  }
          //}

          this.router.push('/');

        }
      ).catch(
        (errors) => {
          const respuestaError = errors.response.data.status;
          if (respuestaError === false) {
            const mensajeError = errors.response.data.message;
            this.authInvalidCredentiales = true;
          } else {
            this.authInvalidCredentiales = true;
          }
        }
      )
    },
    async register(form) {
      const token = this.authToken; // Obtén el token del estado

      if (!token) {
        // Manejar el caso en el que no haya token (usuario no autenticado)
        return;
      }

      // Agrega el token al encabezado de la solicitud
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('/api/usuario/create', form, config).then(
        (res) => {
          show_alerta(res.data.message, 'success', '');
          setTimeout(() => this.router.push('/users'), 2000);
          console.log(`Datos recibidos: ${form}`);
        }
      ).catch((errors) => {
        let desc = '';
        errors.response.data.status((e) => {
          desc = desc + ' ' + e;
        });
        show_alerta(desc, 'error', '');
      });
    },
    async logout() {
      this.authToken = null;
      this.authUser = null;
      this.authUserName = null;
      this.authUserRol = null;
      this.authInvalidCredentiales = null;
      this.router.push('/login');
    }
  },
  persist: true

});