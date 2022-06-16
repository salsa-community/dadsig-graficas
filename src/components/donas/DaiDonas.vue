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
    variables: Object,
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
    },
    radio_interno: {
      type: Number,
      default: 0.18
    },
    radio_externo: {
      type: Number,
      default: 0.32,
    },
    radio_texto: {
      type: Number,
      default: 0.33
    }
  },

  watch: {
    variables() {
      this.configurandoDimensionesParaDona();
      this.actualizandoDona();
    },
    datos() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaDona();
      this.actualizandoDona();
    },
    margen() {
      setTimeout(() => this.reescalandoPantalla(), 200)
    }

  },
  // data() {
  //   return {
  //
  //   }
  // },

  mounted: function () {
    this.svg = d3.select("#" + this.dona_id + "svg.svg-dona");
    this.grupo_contenedor = this.svg.select("g.grupo-contenedor-dona");

    this.configurandoDimensionesParaSVG();

    this.pie = d3.pie().sort(null);
    this.arc = d3.arc();
    this.arc_texto = d3.arc();

    this.configurandoDimensionesParaDona();
    this.creandoDona();
    this.actualizandoDona();

    this.tooltip = d3.select("div#" + this.dona_id)
        .select("div.tooltip");

    window.addEventListener("resize", this.reescalandoPantalla)
  },

  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla)
  },

  methods: {
    configurandoDimensionesParaSVG() {
      this.ancho = document.querySelector("#" + this.dona_id + " .contenedor-tooltip-svg").clientWidth - this.margen.izquierda - this.margen.derecha;
      this.alto = this.alto_vis - this.margen.arriba - this.margen.abajo;
      this.svg.attr("width", this.ancho + this.margen.izquierda + this.margen.derecha)
          .attr("height", this.alto + this.margen.arriba + this.margen.abajo)
          .style("left")

      this.grupo_contenedor.attr("transform", `translate(${this.margen.izquierda}, ${this.margen.arriba}`);
    },

    configurandoDimensionesParaDona() {
      this.pie.value((d) => d.variables.variable_numerica);
      this.datos_donas = this.pie(this.datos);
      this.arc.innerRadius(this.ancho * this.radio_interno).outerRadius(this.ancho * this.radio_externo);
      this.arc_texto.innerRadius(this.ancho * this.radio_texto).outerRadius(this.ancho * this.radio_texto);

    },

    creandoDona() {
      this.segmentos = this.grupo_contenedor
          .selectAll("paths")
          .data(this.datos_donas)
          .enter()
          .append('path')
          .style("cursor", "pointer");

      this.textos_porcentajes = this.grupo_contenedor
          .selectAll('allLabels')
          .data(this.datos_donas)
          .enter()
          .append("text");

      if (this.tooltip_activo) {
        this.svg
            .on("mousemove", (evento) => {
              this.mostrarTooltip(evento)
            })
            .on("mouseout", this.cerrarTooltip())
      }
    },

    actualizandoDona() {
      this.segmentos
          .attr('d', this.arc)
          .attr('fill', (d) => d.colores)
          .attr("class", (d, i) => "rebanada-" + i)
          .attr("stroke-opacity", 0)

      this.textos_porcentajes
          .text((d) => (Math.round(1000 * d.data.variable_numerica / d3.sum(this.datos.map(d => d.data.variable_numerica))) / 10) + "%")
          .attr("class", (d, i) => "texto-" + i)
          .style("font-size", "20px")
          .style("fill", d => d.colores)
          .style("font-weight", "700")
          .attr('transform', (d) => {
            var pos = this.arc_texto.centroid(d);
            return 'translate(' + pos + ')';
          })
          .style("fill-opacity", 1)

          // Alinear el texto según el ángulo en el que se encuentre

          .style('text-anchor', (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? 'start' : 'end');
          })
          .style('dominant-baseline', (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < .5 * Math.PI || midangle > 1.5 * Math.PI ? 'auto' : 'hanging');
          });
    },

    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaDona();
      this.creandoDona();
      this.actualizandoDona();
    },
    cerrarTooltip() {
      this.tooltip.style('visibility', 'hidden')
    },
    mostrarTooltip(evento) {

      this.tooltip.style('visibility', 'visible');

      let posicion = this.arc_texto.centroid(this.datos_donas[indice]);
      let angulo_medio = this.datos_donas[indice].startAngle + (this.datos_donas[indice].endAngle - this.datos_donas[indice].startAngle) / 2;

      this.tooltip
      .attr("x", angulo_medio > Math.PI ? posicion[0] : posicion[0] - this.ancho_tooltip)
      .attr("y", posicion[1])
      .attr("width", this.ancho_tooltip)
      .attr("height", 30);

      let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("min-width", this.ancho_tooltip)
      .style("border-radius", "8px")
      .style("width", this.ancho_tooltip + "px")
      .attr("height", 70)
      .style("padding", "0 3px 0 10px");





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