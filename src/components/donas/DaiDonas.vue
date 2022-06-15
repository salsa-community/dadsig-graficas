<template>
  <div :id="dona_id" class="contenedor-dona">
    <svg class="svg-dona">

    </svg>
  </div>
</template>

<script>

import * as d3 from "d3";

export default {
  name: "DaiDonas",
  props: {
    dona_id: String,
    datos: Array,
  }
}
</script>

<style scoped>

</style>