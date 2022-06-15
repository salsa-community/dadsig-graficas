<template>
  <div v-bind:id="dona_id" class="contenedor-dona">
    <slot name="encabezado"></slot>
    <div class="contenedor-tooltip-svg">
      <div class="tooltip">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <button class="boton-cerrar-tooltip" @click="cerrarTooltip">
              &times;
            </button>
          </div>
          <div class="tooltip-cifras"></div>
        </div>
      </div>
      <svg class="svg-dona">
        <g class="grupo-contenedor-dona"></g>
      </svg>
    </div>
    <slot name="pie"></slot>
  </div>
</template>

<script>

import * as d3 from "d3";

export default {
  name: "DaiDonas",
  props: {
    dona_id: String,
    datos: Array,
    colores: {
      type: Array,
      default: function () {
        return ["#253494", "#2c7fb8", "#41b6c4", "#7fcdbb", "#c7e9b4", "#ffffcc"]
      }
    },
    ancho_tooltip: {
      type: Number,
      default: 195
    },
    margen: {
      type: Object,
      default: function () {
        return {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}
      }
    },
    alto_vis: {
      type: Number,
      default: function () {
        return 250
      }
    },
    tooltip_activo: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.contenedor-dona {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
}

div.contenedor-tooltip-svg {
  position: relative;

  //.rotation-wrapper-outer {
  //  display:table;
  //
  //  .rotation-wrapper-inner {
  //    padding: 50% 0;
  //    height: 0;
  //
  //    .element-to-rotate {
  //      display: block;
  //      transform-origin: top left;
  //      margin-top: -50%;
  //      font-size: 12px;
  //      text-align: center;
  //      font-weight: 600;
  //    }
  //  }
  //}

  div.tooltip {
    font-size: 12px;
    position: absolute;
    z-index: 2;
    visibility: hidden;
  }

  div.tooltip::v-deep
  div.tooltip-cifras {
    padding-bottom: 5px;

    p {
      margin: 3px;

      span.nomenclatura-tooltip {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px rgba(255, 255, 255, .7);
        display: inline-block;
      }
    }
  }

  div.tooltip button.boton-cerrar-tooltip {
    background: #fff;
    border: none;
    font-size: 30px;
    line-height: .9;
    font-weight: 300;
    padding: 0 5px;
    border-radius: 5px;
    margin: 0 0 0 auto;
    @media (min-width: 768px) {
      display: none;
    }
    cursor: pointer;
  }
}

</style>