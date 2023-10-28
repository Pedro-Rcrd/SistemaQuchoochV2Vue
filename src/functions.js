import Swal from 'sweetalert2';
import { nextTick } from '@vue/runtime-core';
import { useAuthStore } from '@/stores/auth'

export function show_alerta(msj, icon, focus) {
  if (focus !== '') {
    nextTick(() => focus.value.focus());
  }
  Swal.fire({
    title: msj, icon: icon, buttonsStyling: true
  });
}

//Método para actualizar estado
export function updateConfirmation(name, url, redirect, token) {
  const alert = Swal.mixin({ buttonsStyling: true });
  alert
    .fire({
      title: `¿Estás seguro de actualizar ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, Actualizar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        const data = {}; // Aquí puedes agregar los datos que deseas enviar con la solicitud PUT
        sendRequest('PUT', data, url, redirect, token);
      }
    });
}

export function confirmation(name, url, redirect, token) {
  const alert = Swal.mixin({ buttonsStyling: true });
  alert
    .fire({
      title: `¿Estás seguro de eliminar ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        sendRequest('DELETE', {}, url, redirect, token); // Pasa el token como argumento
      }
    });
}

export async function sendRequest(method, params, url, redirect = '', token = '') {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      data: params,
      headers: headers, // Incluye las cabeceras en la solicitud
    });
    if ((response.status === 200) | (response.status === 201) | (response.status === 204)) {
      show_alerta('Resultado satisfactorio', 'success', '');

      setTimeout(() => (redirect !== '' ? (window.location.href = redirect) : ''), 1000);
    }

    return response.data.status;
  } catch (errors) {
    let desc = '';
    //resMensaje = errors.response.data.message;
    show_alerta('Función error', 'error', '');

    console.error('Error en sendRequest:', errors);
    throw errors;
  }
}


/*
export function confirmation(name, url, redirect) {
    const alert = Swal.mixin({ buttonsStyling: true });
    alert.fire({
        title: '¿Estas seguro de eliminar ' + name + '?',
        icon: 'question', showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'

    }).then((result) => {
        if (result.isConfirmed) {
            sendRequest('DELETE', {}, url, redirect);
        }
    });
}

export async function sendRequest(method, params, url, redirect = '') {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = `Bearer${authStore.authToken}`;
    let res;
    console.log(`Que hay en parameters ${params.codigoComunidad}`)
    await axios({
        method: method, url: url, data: params
    }).then(
        response => {
            res = response.data.status,
                show_alerta('Satisfactorio', 'success', ''),
                console.log(`Aquí que viene${res}`)
            window.location.href = redirect
            seTimeout(
                () => (redirect !== '') ? window.location.href = redirect : redirect,
                2000)
            console.log(`Que viene aquí en redirect ${redirect}`)
        }).catch((errors) => {
            let desc = '';
            res = errors.response.data.status;
            resMensaje = errors.response.data.message;
            show_alerta('function error', 'error', '')
        })
    return res
} */