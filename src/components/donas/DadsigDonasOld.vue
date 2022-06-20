<template>
  <div v-bind:id=dona_id class="contenedor-dona">
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
    </div>
    <svg class="svg-dona">
      <defs></defs>
      <g class="grupo-contenedor-de-dona"></g>
    </svg>
    <slot name="pie"></slot>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'DadsigDonas',
  props: {
    dona_id: String,
    datos: Array,
    ancho_tooltip: {
      type: Number,
      default: 195
    },
    radio_interno: {
      type:Number,
      default: .18
    },
    radio_externo: {
      type: Number,
      default: .32
    },
    radio_texto: {
      type: Number,
      default: .33
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
        return 280
      }
    },
    tooltip_activo: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    textoTooltip: {
      type: Function,
      default: function () {
        var txt = []
        this.datos.map((d) => {
          txt.push(`<p><span class="nomenclatura-tooltip" style="background: ${d.color}"></span>
						${d.nombre} | <b>${this.datos[d]["cantidad"].toLocaleString("en")}</b>
						</p>`)
        })
        return `<p>${this.tooltip_categoria}</p>
						${txt.reverse().join(" ")}`
      }
    },
  },
  watch: {
    datos: function(new_val,old_val) {
      this.configurandoDimensionesParaDona();
      if (new_val.length > old_val.length) {
        //Actualizamos paths
        this.segmentos = this.grupo_contenedor
            .selectAll("path")
            .data(this.datos_donas);

        this.segmentos = this.segmentos.enter()
            .append("path").style("cursor","pointer")
            .merge(this.segmentos);

        this.segmentos.exit().remove();

        //Actualizamos textos
        this.textos_porcentajes = this.grupo_contenedor
            .selectAll("text")
            .data(this.datos_donas);

        this.textos_porcentajes = this.textos_porcentajes.enter()
            .append("text")
            .merge(this.textos_porcentajes);

        this.textos_porcentajes.exit().remove();
      }
      else {
        this.segmentos.data(this.datos_donas)
            .exit()
            .remove();

        this.textos_porcentajes.data(this.datos_donas)
            .exit()
            .remove();
      }

      //Ajustes
      this.textos_porcentajes.style("fill-opacity", "1");

      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaDona();
      this.creandoDona();
      this.actualizandoDona();
    },
    margen() {
      setTimeout(()=> this.reescalandoPantalla()), 200
    }
  },

  // data: function () {
  //   return {
  //     es_notas_abiertas:false,
  //   }
  // },
  mounted() {
    this.svg = d3.select("div#"+this.dona_id+" svg.svg-dona");
    this.grupo_contenedor = this.svg.select("g.grupo-contenedor-de-dona");
    this.grupo_contenedor_tooltip = this.svg.select("g.grupo-contenedor-tooltip");

    this.configurandoDimensionesParaSVG();

    /*
     Creando la funcion y dimensiones para el pie:
     Es importante que el pie no tenga ninguna funcion sort y que las
     rebanadas hereden el orden de la base de datos para que los indices
     de las rebanadas coincidan con los indices de la nomenclatura
    */
    this.pie = d3.pie().sort(null);
    this.arc = d3.arc();
    this.arc_texto = d3.arc();

    this.configurandoDimensionesParaDona();
    this.creandoDona();
    this.actualizandoDona();

    this.tooltip = d3.select("div#" + this.dona_id)
        .select("div.tooltip");
    window.addEventListener("resize", this.reescalandoPantalla);
  },
  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla)
  },
  methods: {
    configurandoDimensionesParaSVG() {
      this.ancho = document.getElementById(this.dona_id).clientWidth;
      this.alto = this.ancho;
      this.svg.attr("width", this.ancho).attr("height", this.ancho);
      this.grupo_contenedor.attr("transform", `translate(${this.ancho * .5}, ${this.alto * .5})`);
      this.grupo_contenedor_tooltip.attr("transform", `translate(${this.ancho * .5}, ${this.alto * .5})`);
    },

    configurandoDimensionesParaDona() {
      this.pie.value((d) => d.cantidad);
      this.datos_donas = this.pie(this.datos);
      this.arc.innerRadius(this.ancho * this.radio_interno)
          .outerRadius(this.ancho * this.radio_externo);
      this.arc_texto.innerRadius(this.ancho * this.radio_texto)
          .outerRadius(this.ancho * this.radio_texto);
    },

    creandoDona() {
      this.grupo_contenedor.selectAll("g.grupo-dona").remove();
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
            .on("mousemove", (indice) => {
              this.mostrarTooltip(indice)
            })
            .on("mouseout", this.cerrarTooltip)
      }

    },
    actualizandoDona() {
      this.segmentos
          .attr('d', this.arc)
          .attr('fill', (d) => d.data.color)
          .attr("class", (d,i) => "rebanada-"+i)
          .attr("stroke-opacity", 0)
      // .on("click", (event,d) => this.clickButtonCategoria(d.index));

      this.textos_porcentajes
          .text((d) => (Math.round(1000 * d.data.cantidad / d3.sum(this.datos.map(d => d.cantidad))) / 10 ) +"%")
          .attr("class", (d,i) => "texto-"+i)
          .style("font-size", "20px")
          .style("fill", d => d.data.color)
          .style("font-weight", "700")
          .attr('transform', (d) => {
            let pos = this.arc_texto.centroid(d);
            return 'translate(' + pos + ')';
          })
          .style("fill-opacity", 1)
          //
          // Los siguientes dos estilos alinean el texto segun el angulo en el que se encuentre
          .style('text-anchor', (d) => {
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? 'start' : 'end');
          })
          .style('dominant-baseline', (d) => {
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
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
      this.tooltip
          .style("visibility", "hidden");
    },
    mostrarTooltip(indice) {
      this.tooltip.style("visibility", "visible");

      let pos = this.arc_texto.centroid(this.datos_donas[indice]);
      let angulo_medio = this.datos_donas[indice].startAngle + (this.datos_donas[indice].endAngle - this.datos_donas[indice].startAngle) / 2;


      this.tooltip
          .attr("x", angulo_medio > Math.PI ? pos[0] : pos[0] - this.ancho_tooltip)
          .attr("y", pos[1])
          .attr("width", this.ancho_tooltip)
          .attr("height", 30);

      let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
          .style("background", "rgba(0, 0, 0, .8)")
          .style("min-width", this.ancho_tooltip)
          .style("border-radius", "8px")
          .style("width", this.ancho_tooltip+"px")
          .attr("height", 70 )
          .style("padding", "0 3px 0 10px");

      contenido_tooltip.select("div.tooltip-cifras")
          .html(this.textoTooltip())

      this.tooltip
          .attr("height", contenido_tooltip.style("height"))
          .style("height", contenido_tooltip.style("height"))
          .attr("width", parseInt(contenido_tooltip.style("width")) + 13)
          .attr("y", angulo_medio < .5 * Math.PI || angulo_medio > 1.5 * Math.PI ? pos[1] : pos[1]-parseInt(contenido_tooltip.style("height")));
    },
  }
}
</script>

<style scoped lang="scss">
$margen: 10px;
$radio: 10px;
.contenedor-dona {
  background: var(--color-fondo);
  border: solid var(--color-bordes) 1px;
  border-radius: $radio;
  color: var(--color-texto);
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  max-width: 450px;
  width: calc(100% - 20px);
}

svg.svg-dona ::v-deep foreignObject {
  color: #fff;
  font-size: 12px;
}
svg.svg-dona ::v-deep div.contenedor-boton-cerrar {
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-top: 5px;
}
svg.svg-dona ::v-deep button.boton-cerrar-tooltip {
  background: none;
  border: none;
  padding: 0 0 0 5px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
}

div.contenedor-tooltip-svg {
  position: relative;

  .rotation-wrapper-outer {
    display: table;

    .rotation-wrapper-inner {
      padding: 50% 0;
      height: 0;

      .element-to-rotate {
        display: block;
        transform-origin: top left;
        //transform: rotate(-90deg) translate(-100%);
        margin-top: -50%;
        font-size: 12px;
        text-align: center;
        font-weight: 600;
      }
    }
  }

  div.eje-x {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
  }


  div.tooltip {
    color: #fff;
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

  div.tooltip div.contenedor-boton-cerrar {
    height: auto;
    display: flex;
    width: 100%;
    padding-top: 5px;
    font-weight: 600;
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

    img {
      width: 30px;
      height: 30px;
      float: right;
    }
  }
}
</style>
