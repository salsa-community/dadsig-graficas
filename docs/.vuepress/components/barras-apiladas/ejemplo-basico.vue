<template>
    <div>

        <DaiBarrasApiladas
            :barras_apiladas_id="'barras_basicas'" 
            :datos="[
                {nombre_rectangulos:'Nombre de variable 1 ', cantidad_1:120,cantidad_2:40,cantidad_3:40},
                {nombre_rectangulos:'Nombre de variable 2 ', cantidad_1:100,cantidad_2:30,cantidad_3:40},
                {nombre_rectangulos:'Nombre de variable 3 ', cantidad_1:20,cantidad_2:130,cantidad_3:540},
                {nombre_rectangulos:'Nombre de variable 4 ', cantidad_1:20,cantidad_2:130,cantidad_3:40},
                {nombre_rectangulos:'Nombre de variable 5 ', cantidad_1:40,cantidad_2:130,cantidad_3:0},
            ]"

            :variables='[
                {"id":"cantidad_1","nombre_colores":"cantidad 1","color":"yellow"},
                {"id":"cantidad_2","nombre_colores":"cantidad 2","color":"magenta"},
                {"id":"cantidad_3","nombre_colores":"cantidad 3","color":"blue"},
            ]'
            :nombre_barra="'nombre_rectangulos'"
            :nombre_color="'nombre_colores'"
            :tooltip_activo="false"
            titulo_eje_y="Eje vertical"
            titulo_eje_x="Eje horizontal"
            :margen="{arriba:20,abajo:50,izquierda:30,derecha:20}"
        />
    </div>
</template>
<script>

import *  as d3 from "d3";

export default {
  
  data:function(){
    return {
      variables: [
        {"id":"cantidad_1","nombre":"Nombre variable 1","color":"#010"},
      ],
      edos:["YUC","AGS","BC","BCS","CAMP","CHIS","CHIH","CDMX","COAH","COL","DUR","GTO","GRO","HDGO","JAL","EDOMEX","MICH","MOR","NAY","NL","OAX","PUE","QRO","Q. ROO", "SLP","SIN","SON","TAB","TAMPS","TLAX","VER","ZAC"],
      datos_barras_apiladas_elaboradas:[
        {nombre_barra:'Nombre de variable 1 ', cantidad_1:120,cantidad_2:30,cantidad_3:30},
			],
      tipo_dato: "total"

    }
  },
  mounted(){
    this.nuevaBaseBarrasApiladas();
  },
  methods:{
    cambiarEstado(ne){
      this.$refs['barras1'].tipo_dato = ne
			this.tipo_dato = ne;
			if(ne == "porcentual"){
				this.cambiaBaseBarrasApiladasPorcentajes()
			}
			else{
				this.cambiaBaseBarrasApiladasAbsolutos()
			}
			setTimeout(
				()=>{ this.$refs['barras1'].eje_y.selectAll("text")
					.text((d) => (this.tipo_dato=="porcentual"? d + "%":d.toLocaleString("en")))
				},
				200)
			
    },
    nuevaBaseBarrasApiladas(){
      let color_1=`rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
      let color_2=`rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
      let color_3=`rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;

      this.variables=[{"id":"cantidad_1","nombre_color":"col 1","color":color_1},
        {"id":"cantidad_2","nombre_color":"col 2","color":color_2},
        {"id":"cantidad_3","nombre_color":"col 3","color":color_3}]
      let nuevos_datos=[];
        let tamanio=10+Math.floor(Math.random()*this.edos.length-9);
        for(var i = 0 ; i <tamanio;i++){
          nuevos_datos.push({
            nombre_barra:this.edos[i],
            cantidad_1:parseInt(10+Math.random()*2000),
            cantidad_2:parseInt(10+Math.random()*2000),
            cantidad_3:parseInt(10+Math.random()*2000),
          })
        }
        this.datos_barras_apiladas_elaboradas_absolutas=nuevos_datos
				this.datos_barras_apiladas_elaboradas = this.datos_barras_apiladas_elaboradas_absolutas
    },
		cambiaBaseBarrasApiladasAbsolutos(){
			this.datos_barras_apiladas_elaboradas = this.datos_barras_apiladas_elaboradas_absolutas

		},
		cambiaBaseBarrasApiladasPorcentajes(){
			let data_porcentual = this.datos_barras_apiladas_elaboradas_absolutas
				.map(d=> ({
					"nombre_barra":d.nombre_barra,
					"cantidad_1":d.cantidad_1 / d3.sum(this.variables.map(dd => d[dd.id])) * 100,
					"cantidad_2":d.cantidad_2 / d3.sum(this.variables.map(dd => d[dd.id])) * 100,
					"cantidad_3":d.cantidad_3 / d3.sum(this.variables.map(dd => d[dd.id])) * 100,
				}))
			this.datos_barras_apiladas_elaboradas =  data_porcentual
    },
		textoTooltipBarras(){
			let txts = []
			this.$refs['barras1'].variables.map((d)=>{
				txts.push(  `<p><span class="nomenclatura-tooltip" style="background: ${d.color}"></span> 
				${d["nombre_color"] +" modificacion de tooltip"} | <b>${this.$refs['barras1'].tooltip_data_seleccionada[d.id].toLocaleString("en")}</b> 
				${this.tipo_dato=="porcentual" ? "%" : ""}</p>` )
			})
					
			return `<h4 style="margin: 0;"> Ejemplo de tooltip modificable :D </h4>
						<p><b>Barra:</b>  ${this.$refs['barras1'].tooltip_categoria}</p>
						${txts.reverse().join(" ")}`
		}

  }
}
</script>

<style lang="scss">
$border-radius-tarjeta:10px;


div.contenedor-barras-apiladas-elaboradas {
		width: 100%;
		border: solid black 1px;
		border-radius: $border-radius-tarjeta;
		position: relative;
		
	}

div.encabezado{
	.titulo-proyecto {
		padding: 10px 10px 0px 10px;
		text-align: right;
		font-size: 12px;
		display: inherit;

	}
	.titulo-visualizacion {
		font-size: 16px;
		padding: 10px 10px 0;
		margin: 0;
	}
	.fecha-actualizacion {
    font-size: 10px;
    padding: 0 10px;
    margin: 5px 0;
  }
	p.instruccional {
		font-size: 12px;
		padding: 0 10px;
		margin: 5px 0;
	}
}
div.leyenda-barras-apiladas{
		div.contenedor-switch{
			display: inline-flex;
			margin: 10px  20px 0 0;
			box-shadow: 0px 3px 6px #00000029;
			button{
				border: none;

				font-size: 14px;
				margin: 0px;
				padding: 10px;
				&.button-right{
					border-radius:  0 3px 3px 0;
				}
				&.button-left{
					border-radius:  3px 0 0 3px;
				}
				&.activo {
					background: #FFFFFF;
					color: #141414;
				}
			}
		
	}
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		border-radius: $border-radius-tarjeta;
		box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
		margin-bottom:10px;
	}

div.nomenclatura{
	margin-top: 15px;
	display: flex;
	justify-content: space-around;
	width: 100%;
	div.checkbox{
		margin: 0;
		padding: 5px 10px;
		display: flex;
		.color{
			border-radius: 50%;
			width: 20px;
			min-width: 20px;
			height: 20px;
		}
		.nombre {
			font-size: 12px;
			line-height: 1.6;
			padding-left: 10px;
		}
	}
}
</style>
