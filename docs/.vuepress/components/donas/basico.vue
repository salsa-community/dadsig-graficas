<template>
  <div id="app">
    <DaiDonas
        ref="donas_basica"
        :dona_id="'donas_basica'"
        :datos="datos"
        :tooltip_activo="false"
        :variables="{'variable_categorica':'nombre','variable_numerica':'cantidad'}"/>
  </div>
</template>

<script>

import donas1 from "./donas_1.json"

export default {
  name: "donas-basico",

  data: function () {
    return {
      datos:donas1,
    }
  }
}
</script>

<style lang="scss">

</style>