<template>
  <div v-bind:id=caja_id class="contenedor-cajas">
    <div class="encabezado">
      <slot name="encabezado"></slot>
    </div>
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
      <div class="rotation-wrapper-outer">
        <div class="rotation-wrapper-inner">
          <div
              :style="{width: `${alto_vis - margen.arriba - margen.abajo}px`, transform: `rotate(-90deg)translateX(calc(-100% - ${.5 * margen.arriba}px))`}"
              class="element-to-rotate">
            <p style="padding:10px 0 5px 0" v-html="titulo_eje_y"></p>
          </div>
        </div>
      </div>
      <svg class="svg-cajas">
        <defs></defs>
        <g class="contenedor-fondo"></g>
        <g class="gupo-contenedor-de-cajas"></g>
      </svg>
      <div class="eje-x">
        <p :style="{padding: `${margen.abajo + 10}px ${margen.derecha}px 0 ${margen.izquierda}px `}"
           v-html="titulo_eje_x"></p>
      </div>
    </div>
    <slot name="pie"></slot>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'DaiDiagramaCajas',
  props: {
    caja_id: String,
    datos: Array,
    variables: Object,
    titulo_eje_y: String,
    titulo_eje_x: String,
    ancho_tooltip: {
      type: Number,
      default: 195
    },
    margen: {
      type: Object,
      default: function () {
        return {arriba: 30, abajo: 40, izquierda: 40, derecha: 20}
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
        return `
						<p>${this.tooltip_categoria}</p>
						<p>Bigote sup.: ${this.tooltip_data_seleccionada.max.toLocaleString("en")}</p>
						<p>3er cuartil: ${this.tooltip_data_seleccionada.q3.toLocaleString("en")}</p>
						<p>Promedio: ${this.tooltip_data_seleccionada.promedio.toLocaleString("en")}</p>
						<p>Mediana ${this.tooltip_data_seleccionada.median.toLocaleString("en")}</p>
						<p>1er cuartil: ${this.tooltip_data_seleccionada.q1.toLocaleString("en")}</p>
						<p>Bigote inf.: ${this.tooltip_data_seleccionada.min.toLocaleString("en")}</p>
					`
      }
    },

  },
  watch: {
    variables(nuevo_valor) {
      this.variables = nuevo_valor;
      this.grupos_cajas
          .style("fill", () => this.variables.color)
    },
    datos() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaCaja();
      this.creandoCajas();
      this.actualizandoCajas();
    },
    margen() {
      setTimeout(() => this.reescalandoPantalla(), 200)
    }
  },
  data() {
    return {
      orden_inicial: true,
      zoom_activo: "hidden",
      ancho_leyenda_y: 0
    }
  },
  mounted() {
    this.svg = d3.select("div#" + this.caja_id + " svg.svg-cajas");

    this.grupo_fondo = this.svg.select("g.contenedor-fondo");

    this.grupo_contenedor = this.svg.select("g.gupo-contenedor-de-cajas");

    this.eje_y = this.grupo_contenedor
        .append("g")
        .attr("class", "eje-y");

    this.eje_x = this.grupo_contenedor
        .append("g")
        .attr("class", "eje-x");

    this.configurandoDimensionesParaSVG();
    this.configurandoDimensionesParaCaja();
    this.creandoCajas();
    this.actualizandoCajas();

    this.tooltip = d3.select("div#" + this.caja_id)
        .select("div.tooltip");
    window.addEventListener("resize", this.reescalandoPantalla);
  },
  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla)
  },
  methods: {
    configurandoDimensionesParaSVG() {
      this.ancho_leyenda_y = document.querySelector("#" + this.caja_id + " .rotation-wrapper-outer .element-to-rotate")
          .clientHeight
      this.width = document.querySelector("#" + this.caja_id + " .contenedor-tooltip-svg").clientWidth - this.margen.izquierda - this.margen.derecha - this.ancho_leyenda_y;

      this.height = this.alto_vis - this.margen.arriba - this.margen.abajo;
      this.svg.attr("width", this.width + this.margen.izquierda + this.margen.derecha)
          .attr("height", this.height + this.margen.arriba + this.margen.abajo)
          .style("left", this.ancho_leyenda_y + "px");

      this.grupo_contenedor
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`);
      this.grupo_fondo.attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`);
    },
    configurandoDimensionesParaCaja() {
      this.escalaY = d3.scaleLinear()
          .domain(d3.extent(this.datos.map((d) => d[this.variables.variable_dist])))
          .range([this.height, 0]);
      var unicos = [...new Set(this.datos.map((d) => d[this.variables.grupos]))];


      this.escalaX = d3.scaleBand()
          .range([0, this.width])
          .domain(unicos)
          .padding(this.width < 768 ? 0.4 : .7);


      this.data_agrupada = d3.rollup(
          this.datos,
          (d) => {
            let q1 = d3.quantile(d.map((g) => g[this.variables.variable_dist]).sort(d3.ascending), .25)
            let median = d3.quantile(d.map((g) => g[this.variables.variable_dist]).sort(d3.ascending), .5)
            let q3 = d3.quantile(d.map((g) => g[this.variables.variable_dist]).sort(d3.ascending), .75)
            let interQuantileRange = q3 - q1
            let min = q1 - 1.5 * interQuantileRange
            let max = q3 + 1.5 * interQuantileRange
            let puntos = d.map((g) => g[this.variables.variable_dist])
            let promedio = d3.mean(d.map((g) => g[this.variables.variable_dist]))
            max = puntos.filter((g) => g <= max)
                .sort(d3.descending)[0]
            min = puntos.filter((g) => g >= min)
                .sort(d3.ascending)[0]

            return ({
              q1: q1,
              median: median,
              q3: q3,
              interQuantileRange: interQuantileRange,
              min: min,
              max: max,
              puntos: puntos,
              promedio: promedio
            })
          },
          (d) => d[this.variables.grupos]
      );

      this.eje_y.call(d3.axisLeft(this.escalaY));
      this.eje_x.attr("transform", `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.escalaX));
      this.eje_x.selectAll("text")
          .style("text-anchor", "middle")
          .style("dominant-baseline", "middle");
      this.eje_x.selectAll("line")
          .remove();
      this.eje_x.select("path").style("opacity", 0);
      this.eje_y.select("path").style("opacity", 0);

      this.eje_y.selectAll("line")
          .attr("x2", this.width)
          .style("stroke-dasharray", "3 2 ")
          .style("stroke", "gray");
    },
    creandoCajas() {
      this.grupo_contenedor.selectAll("g.grupo-caja").remove();
      this.grupos_cajas = this.grupo_contenedor
          .selectAll("myCaja")
          .data(this.data_agrupada)
          .enter()
          .append("g")
          .attr("class", "grupo-caja")
          .style("fill", () => {
            return this.variables.color
          })
          .style("stroke", () => {
            return this.variables.color
          });
      this.cajas_line_vertical = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_line_max = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_line_min = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_rect_q1 = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_rect_q3 = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_rect = this.grupos_cajas
          .append("rect")
          .datum((d) => d[1]);
      this.cajas_line_media = this.grupos_cajas
          .append("line")
          .datum((d) => d[1]);
      this.cajas_punto_promedio = this.grupos_cajas
          .append("circle")
          .datum((d) => d[1]);
      this.cajas_circle_atipicos = this.grupos_cajas
          .selectAll("atipicos")
          .data((d) => d[1].puntos.filter((dd) => dd < d[1].min || d[1].max < dd))
          .enter()
          .append("circle")
          .attr("class", "atipicos")
    },
    actualizandoCajas() {
      // Estilo a cada elemento de grupo-caja
      this.cajas_line_vertical
          .attr("x1", .5 * this.escalaX.bandwidth())
          .attr("y1", (d) => this.escalaY(d.min))
          .attr("x2", .5 * this.escalaX.bandwidth())
          .attr("y2", (d) => this.escalaY(d.max))
          .style("stroke-width", "1px")
          .style("stroke-dasharray", "5 2");

      this.cajas_rect_q3
          .attr("x1", 0)
          .attr("y1", (d) => this.escalaY(d.q3))
          .attr("y2", (d) => this.escalaY(d.q3))
          .attr("x2", this.escalaX.bandwidth())
          .style("stroke-width", "1px");
      this.cajas_rect_q1
          .attr("x1", 0)
          .attr("y1", (d) => this.escalaY(d.q1))
          .attr("y2", (d) => this.escalaY(d.q1))
          .attr("x2", this.escalaX.bandwidth())
          .style("stroke-width", "1px");

      this.cajas_rect
          .attr("x", 0)
          .attr("y", (d) => this.escalaY(d.q3))
          .attr("height", (d) => this.escalaY(d.q1) - this.escalaY(d.q3))
          .attr("width", this.escalaX.bandwidth())
          .style("fill-opacity", .25)
          .style("stroke-width", "0");
      this.cajas_line_min
          .attr("x1", 0)
          .attr("y1", (d) => this.escalaY(d.min))
          .attr("x2", this.escalaX.bandwidth())
          .attr("y2", (d) => this.escalaY(d.min))
          .style("stroke-width", "1px");

      this.cajas_line_max
          .attr("x1", 0)
          .attr("y1", (d) => this.escalaY(d.max))
          .attr("x2", this.escalaX.bandwidth())
          .attr("y2", (d) => this.escalaY(d.max))
          .style("stroke-width", "1px");

      this.cajas_line_media
          .attr("x1", 0)
          .attr("y1", (d) => this.escalaY(d.median))
          .attr("x2", this.escalaX.bandwidth())
          .attr("y2", (d) => this.escalaY(d.median))
          .style("stroke-width", "4px")
          .style("stroke", this.variables.color);

      this.cajas_punto_promedio
          .attr("cx", this.escalaX.bandwidth() * .5)
          .attr("cy", (d) => this.escalaY(d.promedio))
          .attr("r", 4)
          .style("stroke", "#fff")
          .style("stroke-width", "1px")
          .style("fill-opacity", 1)

      this.cajas_circle_atipicos
          .attr("cx", this.escalaX.bandwidth() * .5)
          .attr("cy", (d) => this.escalaY(d))
          .attr("r", 2)
          .style("stroke-opacity", ".4")
          .style("stroke-width", "1px")
          .style("fill-opacity", .25)


      this.grupos_cajas
          .attr("transform", (d) => `translate(${this.escalaX(d[0])} ,0)`)
      if (this.tooltip_activo) {
        this.svg.on('mousemove', (evento) => {
          this.mostrarTooltip((evento))
        })
            .on('mouseout', () => {
              this.cerrarTooltip()
            });
      }
    },
    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaCaja();
      this.creandoCajas()
      this.actualizandoCajas();
    },

    // Esto aún no
    cerrarTooltip() {
      this.tooltip.style('visibility', 'hidden')
    },
    mostrarTooltip(evento) {

      this.tooltip_bandas = this.escalaX.step();
      this.tooltip_indice = parseInt(((evento.layerX - this.margen.izquierda - this.margen.derecha) / this.tooltip_bandas));
      this.tooltip_categoria = this.escalaX.domain()[this.tooltip_indice];

      this.tooltip_data_seleccionada = this.data_agrupada.get(this.tooltip_categoria)
      this.tooltip.style("visibility", "visible")

      this.tooltip
          .style("left", evento.layerX < .6 * this.width ? (evento.layerX + 10 + this.ancho_leyenda_y) + "px" : (evento.layerX - this.ancho_tooltip - 20 + this.ancho_leyenda_y) + "px")
          .style("top", evento.layerY + "px")
          .attr("width", this.ancho_tooltip)
          .attr("height", 30)

      let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
          .style("background", "rgba(0, 0, 0,.8)")
          .style("min-width", this.ancho_tooltip + "px")
          .style("border-radius", "8px")
          .style("width", this.ancho_tooltip + "px")
          .attr("height", 70)
          .style("padding", "0 3px 0 10px");

      this.svg.select("button.boton-cerrar-tooltip")
          .on("click", this.cerrarTooltip)

      contenido_tooltip
          .select("div.tooltip-cifras")
          .html(this.textoTooltip())

      this.tooltip
          .style("height", contenido_tooltip.style("height"))
          .style("width", contenido_tooltip.style("width"))
          .style("top", evento.layerY + "px")

    },

  }
}
</script>

<style lang="scss" scoped>
// propuesta grid con caja de mayor información
.grid-cajas {
  display: grid;
  grid-template-areas:
			"encabezado encabezado"
      "vis vis"
			"pie pie";
  grid-template-columns: 1fr;

  .encabezado {
    grid-area: encabezado;

  }

  div.contenedor-tooltip-svg {
    grid-area: vis;
  }

  .pie {
    width: 100%;

    grid-area: pie;
  }

  @media (min-width: 770px) {
    grid-template-areas:
        "encabezado vis"
        "pie pie";
    grid-template-columns: 1fr 2fr;
    .encabezado {
      border-right: 1px solid #6F7271;
    }
  }
}

$border-radius-tarjeta: 10px;
svg.svg-cajas {
  position: absolute;
  top: 0;
}

svg.svg-cajas ::v-deep text {
  font-family: "Montserrat";
}

div.contenedor-tooltip-svg {
  width: 100%;
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
    background: none;
    border: none;
    padding: 0;
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

.contenedor-cajas div.tooltip {
  visibility: hidden;
  color: #fff;
  font-size: 12px;
  position: absolute;

  div.contenedor-boton-cerrar {
    height: auto;
    display: flex;
    width: 100%;
    padding-top: 5px;
  }

  .tooltip-variable {
    flex: auto;
    padding-top: 5px
  }

  button.boton-cerrar-tooltip {
    background: none;
    border: none;
    padding: 0;
    max-width: 30px;
    flex: auto;
    @media (min-width: 768px) {
      display: none;
    }
    cursor: pointer;

    img {
      width: 23px;
      height: 30px;
      float: right;
    }
  }
}

</style>
