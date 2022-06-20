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
