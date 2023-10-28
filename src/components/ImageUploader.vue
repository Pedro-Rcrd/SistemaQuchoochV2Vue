<template>
    <div>
      <input type="file" @change="handleFileChange" accept="image/*" />
      <button @click="uploadImage">Cargar Imagen</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        selectedFile: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadImage() {
        if (!this.selectedFile) {
          return alert('Selecciona una imagen primero.');
        }
  
        // Crear un objeto FormData para enviar la imagen al servidor
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        try {
          const response = await fetch('http://localhost:5079/api/upload/Becarios', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            alert('Imagen cargada con éxito.');
            // Puedes manejar la respuesta del servidor aquí si es necesario
          } else {
            alert('Hubo un error al cargar la imagen.');
          }
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
      },
    },
  };
  </script>
  