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
</style>
