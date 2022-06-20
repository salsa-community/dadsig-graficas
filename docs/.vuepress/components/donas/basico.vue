<template>
  <div id="app">
    <DadsigDonas
        ref="donas-basica"
        :dona_id="'dona'"
        :datos="datos"
        :tooltip_activo="false"
    />
  </div>
</template>

<script>

import donasejemplo from "./donas_1_old.json"

export default {
  name: 'donas-basico',
  data: function () {
    return {
      datos: donasejemplo,
    }
  },
  // data: function () {
  //   return {
  //     datos:[
  //       {nombre:'Nombre de variable 1', cantidad:100, color:'#000'},
  //       {nombre:'Nombre de variable 2', cantidad:120, color:'#191919'},
  //       {nombre:'Nombre de variable 3', cantidad:60, color:'#333'},
  //       {nombre:'Nombre de variable 4', cantidad:50, color:'#4c4c4c'},
  //       {nombre:'Nombre de variable 6', cantidad:40, color:'#7b7b7b'},
  //       {nombre:'Nombre de variable 5', cantidad:40, color:'#ccc'}
  //     ],
  //   }
  // },
  // methods: {
  //   cambiaBase: function () {
  //     let nuevos_datos = [];
  //     let tamanio = 1 + Math.floor(Math.random()*6);
  //     for(var i = 0 ; i < tamanio; i++) {
  //       nuevos_datos.push({
  //         nombre: "Nombre de variable " + i,
  //         cantidad: parseInt(10+Math.random()*2000),
  //         color: `rgba(${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)})`
  //       })
  //     }
  //     this.datos = nuevos_datos;
  //     console.log(this.datos)
  //   }
  // }
}
</script>

<style lang="scss">
//body {
//  font-family: "Montserrat", Arial, Helvetica, sans-serif;
//  margin: 20px;
//}
//.boton-base {
//  background-color: var(--color-acento-fondo);
//  border: none;
//  border-radius: 3px;
//  color: var(--color-acento-texto);
//  cursor: pointer;
//  font-family: "Montserrat", Arial, Helvetica, sans-serif;
//  margin-bottom: 20px;
//  padding: 10px 20px;
//  transition: background-color .33s ease-in-out, color .3s ease-in-out;
//  &:hover,
//  &:focus {
//    background-color: var(--color-acento-fondo-hover);
//    color: var(--color-acento-texto-hover);
//  }
//}
</style>
