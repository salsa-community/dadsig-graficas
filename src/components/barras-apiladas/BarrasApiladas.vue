
<template>
	<div class="contenedor-barras-apiladas" v-bind:id=barras_apiladas_id>
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
            <div class="rotation-wrapper-outer">
                <div class="rotation-wrapper-inner">
                    <div class="element-to-rotate" :style="{width: `${alto_vis - margen.arriba - margen.abajo}px`,
                    transform: `rotate(-90deg)translateX(calc(-100% - ${.5 * margen.arriba}px))`}">
                        <p style="padding:10px 0 5px 0" v-html="titulo_eje_y"></p>
                    </div>
                </div>    
            </div>
			<svg class="svg-barras-apiladas">
				<defs></defs>
				<g class="grupo-contenedor-de-barras"></g>
			</svg>
            <div class="eje-x">
                <p  v-html="titulo_eje_x" :style="{
                    padding: `${margen.abajo +10 }px ${margen.derecha}px 0 ${margen.izquierda + ancho_leyenda_y}px `
                }"></p>      
            </div>
		</div>
		<slot name="pie"></slot>
	</div>
</template>

<script>
	import * as d3 from "d3";

	export default {
		name: 'DaiBarrasApiladas2',
		props: {
			
			barras_apiladas_id: String,
			datos: Array,
			variables: {
				type: Array,
				default: function() {return []}
			},
			nombre_barra: String,
			nombre_color: String,
			titulo_eje_y: String,
			titulo_eje_x: String,			
			ancho_tooltip:{
				type:Number,
				default:195
			},
			margen: {
				type: Object,
				default: function(){return {arriba:20,abajo:50,izquierda:60,derecha:20}}
			},
			alto_vis: {
				type: Number,
				default: function(){return 180}
			},
			
			tooltip_activo: {
				type: Boolean,
				default: function() {return true}
			},
			espaciado_barras:{
				type: Number,
				default: function() {return .3}
			},
			textoTooltip: {
				type: Function, 
				default: function(){
					var txt = []
					this.variables.map((d)=>{
						txt.push(  `<p><span class="nomenclatura-tooltip" style="background: ${d.color}"></span> 
						${d[this.nombre_color]} | <b>${this.tooltip_data_seleccionada[d.id].toLocaleString("en")}</b> 
						</p>` )
					})

					return `<p>${this.tooltip_categoria}</p> 
						${txt.reverse().join(" ")}`
				}
			}
		},
		watch:{
			variables(nuevo_valor){
				this.variables=nuevo_valor;
				this.barras_apiladas
					.style("fill",(d,i) => this.variables[i].color )
			},
			datos(new_val,old_val){
				this.datos=new_val;
				this.configurandoDimensionesParaBarras();
				if(new_val.length>old_val.length){
					//Actualizamos paths
					this.barras_apiladas =this.grupo_contenedor
						.selectAll("g.grupos-barras")
						.data(this.data_apilada)
					this.barras_apiladas=this.barras_apiladas.enter()
						.append("g").style("cursor","pointer")
						.merge(this.barras_apiladas)
					this.barras_apiladas.exit().remove();
				}
				else{
					this.barras_apiladas.data(this.data_apilada)
						.exit()
						.remove()
				}
				this.barras_apiladas
					.attr("class",d=> d.key+ " grupos-barras")
					.style("fill",(d,i) => this.variables[i].color )
				this.barras_individuales.remove()
				this.barras_individuales=this.barras_apiladas
					.selectAll("rect")
					.data((d)=>d)
					.enter()
					.append("rect")
				// Ajustes
				this.reestablecerVista();
				this.actualizandoBarras();
			},
			margen(){
				setTimeout(()=>this.reescalandoPantalla(),100)
			}
			
		},
		
		data(){
			return{
				notas_open:false,
				orden_inicial:true,
				zoom_activo:"hidden",
				width:200,
                ancho_leyenda_y:0
			}
		},
		mounted(){
			this.svg = d3.select("div#"+this.barras_apiladas_id+" svg.svg-barras-apiladas")
            
			this.grupo_contenedor = this.svg.select("g.grupo-contenedor-de-barras");

			this.eje_y = this.grupo_contenedor
				.append("g")
				.attr("class","eje-y");
				
			this.eje_x = this.grupo_contenedor
				.append("g")
				.attr("class","eje-x");

			this.configurandoDimensionesParaSVG();
			this.configurandoDimensionesParaBarras();
			this.creandoBarras();
			this.actualizandoBarras();

			this.tooltip = d3.select("div#"+this.barras_apiladas_id)
				.select("div.tooltip");
			window.addEventListener("resize", this.reescalandoPantalla);
		},
		methods:{
			configurandoDimensionesParaSVG(){
                 this.ancho_leyenda_y = document.querySelector("#"+this.barras_apiladas_id +" .rotation-wrapper-outer .element-to-rotate")
                    .clientHeight
				this.width = document.getElementById(this.barras_apiladas_id).clientWidth - this.margen.izquierda - this.margen.derecha - this.ancho_leyenda_y;

				this.height = this.alto_vis - this.margen.arriba - this.margen.abajo;
				this.svg.attr("width",this.width + this.margen.izquierda + this.margen.derecha)
					.attr("height",this.height + this.margen.arriba + this.margen.abajo)
                    .style("left", this.ancho_leyenda_y +"px");

				this.grupo_contenedor
					.attr("transform",`translate(${this.margen.izquierda},${this.margen.arriba})`)
			},

			configurandoDimensionesParaBarras(){
				this.data_apilada=d3.stack()
					.keys(this.variables.map(d=>d.id))(this.datos)
				for(let i = 0 ; i<this.variables.length; i++){
					this.data_apilada[i].forEach(dd=>dd.data=Object.assign({},dd.data,{"key":this.data_apilada[i].key}));
				}
				this.escalaY=d3.scaleLinear()
					.domain([0,d3.max(this.datos.map(d=>d3.sum(this.variables.map(dd=>d[dd.id]))))])
					.range([this.height, 0])
				this.escalaX=d3.scaleBand()
					.domain(this.datos.map(d=>d[this.nombre_barra]))
					.range([0,this.width])
					.padding(this.espaciado_barras)
				
				this.eje_y
                    .call(d3.axisLeft(this.escalaY).ticks(4));
				this.eje_x.transition().duration(100).call(d3.axisBottom(this.escalaX).ticks(4))
					.attr("transform","translate(0,"+this.height+")")
				this.eje_x.select("path").remove();
				
			},
			creandoBarras(){
				this.grupo_contenedor.selectAll("g.grupos-barras").remove()
				this.barras_apiladas = this.grupo_contenedor
					.selectAll("grects")
					.data(this.data_apilada)
					.enter()
					.append("g")
					.attr("class",d=> d.key+ " grupos-barras")
					.style("fill",(d,i) => this.variables[i].color )

				this.barras_individuales = this.barras_apiladas
					.selectAll("rect")
					.data((d)=>d)
					.enter()
					.append("rect")
			},
			actualizandoBarras(){
				this.barras_individuales
					.attr("y",d=>this.escalaY(d[1]))
					.attr("x",d=>this.escalaX(d.data[this.nombre_barra]))
					.attr("width",this.escalaX.bandwidth)
					.attr("height",d=> -this.escalaY(d[1]) + this.escalaY(d[0]))
					
				this.eje_y.selectAll("line")
					.attr("x2",this.width)
					.style("stroke-dasharray","3 2")
					.style("stroke","#707070")
				
				this.eje_y.select("path").style("opacity",0)

				this.eje_x.selectAll("line").remove()
				if(this.tooltip_activo){
					this.svg.on("mousemove", (evento) => {
							this.mostrarTooltip(evento)
						})
					.on('mouseout', () => {
								this.cerrarTooltip()
						})
				}
			},
			alternandoBarras(){
				this.orden_inicial=!this.orden_inicial
				if(this.orden_inicial){
					this.barras_individuales
						.transition()
						.delay((d,i)=>i*15)
						.duration(500)
						.attr("y",d=>this.escalaY(d[1]))
				}
				else{
					this.barras_individuales
						.transition()
						.duration(500)
						.delay((d,i)=>i*15)
						.attr("y",d=>d.data.key==this.variables[0].id?this.escalaY(d.data[this.variables[1].id]):this.escalaY(0))
				}
			},
			reescalandoPantalla(){
				this.configurandoDimensionesParaSVG()
				this.configurandoDimensionesParaBarras();
				this.actualizandoBarras()
			},
			mostrarTooltip(evento){
				this.tooltip_bandas = this.escalaX.step();
				this.tooltip_indice = parseInt(((evento.layerX - this.margen.izquierda - this.margen.derecha) / this.tooltip_bandas));
				this.tooltip_categoria = this.escalaX.domain()[this.tooltip_indice];
				this.tooltip_data_seleccionada = this.data_apilada[0].filter(dd=>(dd.data[this.nombre_barra] == this.tooltip_categoria))[0].data;

				this.tooltip.style("visibility","visible")
				this.tooltip
					.style("left",evento.layerX<.6*this.width ? (evento.layerX +10 +this.ancho_leyenda_y)+"px":(evento.layerX-this.ancho_tooltip -20 +this.ancho_leyenda_y )+"px" )
					.style("top",evento.layerY+"px")
					.attr("width",this.ancho_tooltip)
					.attr("height",30 )
				
				let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
					.style("background","rgba(0, 0, 0,.8)")
					.style("min-width",this.ancho_tooltip +"px")
					.style("border-radius","8px")
					.style("width",this.ancho_tooltip+"px")
					.attr("height",70 )
					.style("padding","0 3px 0 10px");
				
				this.svg.select("button.boton-cerrar-tooltip")
					.on("click",this.cerrarTooltip)
				
				contenido_tooltip
					.select("div.tooltip-cifras")
					.html(this.textoTooltip())
				
				this.tooltip
					.style("height",contenido_tooltip.style("height"))
					.style("width",contenido_tooltip.style("width") )
					.style("top",evento.layerY+"px")	
				// Colores a barras
				
				this.barras_individuales
					.style("fill","#767676")
				this.barras_individuales
					.filter(d => d.data[this.nombre_barra] == this.tooltip_categoria)
					.style("fill","")
			},
			cerrarTooltip() {
				this.tooltip.style('visibility', 'hidden')
				this.barras_individuales
					.style("fill","")
			},
			reestablecerVista(){
				this.tooltip.style("visibility","hidden");
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$border-radius-tarjeta:10px;
    svg.svg-barras-apiladas{
        position:absolute;
        top:0;
    }
	svg.svg-barras-apiladas::v-deep text{
		font-family: "Montserrat";

	}
	div.contenedor-tooltip-svg{
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
        div.eje-x{
            position: relative;
            width: 100%;
            text-align: center;
            font-size: 12px;
            text-align: center;
            font-weight: 600;
        }
        

		div.tooltip {
            color:#fff;
            font-size: 12px;
            position: absolute;
            z-index: 2;
			visibility: hidden;
        }
        div.tooltip::v-deep 
            div.tooltip-cifras{
                padding-bottom:5px;
                p{
                    margin: 3px;
                    span.nomenclatura-tooltip{
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        border: solid 1px rgba(255, 255, 255, .7 );
                        display: inline-block;
                    }
                }

		}
        div.tooltip div.contenedor-boton-cerrar{
            height: auto;
            display: flex;
            width: 100%;
            padding-top:5px;
            font-weight: 600;
        }
        div.tooltip button.boton-cerrar-tooltip{
            background: #fff;
            border:none;
			font-size: 30px;
			line-height: .9;
			font-weight: 300;
            padding: 0 5px;
			border-radius: 5px;
			margin: 0 0 0 auto;
            @media (min-width: 768px) {
                display: none;	
            }
            cursor:pointer;
            img{
                width:30px;
                height: 30px;
                float:right;
            }
        }
}
</style>
