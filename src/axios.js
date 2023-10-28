import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

const instance = axios.create({
  // Otras configuraciones de Axios si las tienes
});

export default instance;