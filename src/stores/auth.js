import axios from "axios";
import {defineStore} from 'pinia';
import {show_alerta} from '../functions';

export const useAuthStore = defineStore('auth',{
    state: () =>({authUser:null, authToken: null}),
    getters:{
        user:(state) => state.authUser,
        token:(state) => state.authToken
    },
    actions:{
        async login(form){
            await axios.post('/api/login/authenticate',form).then(
                (res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.status;
                    console.log(`que trae form ${form}`);
                    console.log(`que trae authToken ${this.authToken}`);
                    console.log(`que trae authUser ${this.authUser}`);
                    this.router.push('/');
                    
                }
            ).catch(
                (errors) => {
                    const respuestaError = errors.response.data.status;
                    if (respuestaError === false) {
                        const mensajeError = errors.response.data.message;
                        show_alerta(mensajeError, 'error', '');
                      } else {
                        show_alerta('Eror de credenciales', 'error', '');
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
        async logout(){
            this.authToken = null;
            this.authUser = null;
            this.router.push('/login');
        }
    },
      persist:true

});