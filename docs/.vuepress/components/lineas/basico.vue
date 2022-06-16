<template>
  <div>
    <DadsigLineas
        ref="lineas1"
        :conversionTemporal="conversionTemporal"
        :datos="datos"
        :linea_id="'lineas1'"
        :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
        :nombre_columna_horizontal="'fecha'"
        :titulo_eje_x="'Eje horizontal (temporal)'"
        :titulo_eje_y="'Eje vertical (numérico)'"
        :tooltip_activo="false"
        :variables="edos_seleccionados"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import data_edos from "./data_edos.json"

export default {
  name: "basico",

  data: function () {
    return {
      datos: data_edos,
      conversionTemporal: d3.timeParse('%d-%m-%Y'),
      edos_seleccionados: [
        {
          "cve": "31",
          "nombre": "Yucatán",
          "color": '#2c7fb8'
        },
      ],
      checkeados: [],
    }
  },
  mounted: function () {
    this.datos2 = this.datos;
  },
}
</script>

<style lang="scss">
$border-radius-tarjeta: 10px;

body {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  margin: 20px;
}

.boton-base {
  background-color: var(--color-acento-fondo);
  border: none;
  border-radius: 3px;
  color: var(--color-acento-texto);
  cursor: pointer;
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  padding: 10px 20px;
  transition: background-color .33s ease-in-out, color .3s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-acento-fondo-hover);
    color: var(--color-acento-texto-hover);
  }
}

div#lineas1 {
  div.contenedor-tooltip-svg {

    div.tooltip::v-deep {
      div.tooltip-cuerpo {
        font-size: 12px;

        p {
          margin: 0;
        }

        ul.tooltip-lineas {
          margin: 0;
          padding: 5px 0 0 0;

          li {
            list-style: none;
            margin: 0 0 5px 0;
            font-size: 12px;

            &::before {
              background: transparent;
            }

            span.span-tooltip-color {
              transform: translateY(2px);
              width: 12px;
              height: 12px;
              border: solid 1px rgba(255, 255, 255, .7);
              display: inline-block;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}

div.contenedor-lineas-elaboradas {
  width: 100%;
  border: solid black 1px;
  border-radius: $border-radius-tarjeta;
  position: relative;

}

</style>
