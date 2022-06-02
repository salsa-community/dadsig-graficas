<template>
  <div>
    <DaiBarrasApiladas
      :barras_apiladas_id="'barras_cambio_base'"
      :datos="datos"
      :variables="variables"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical"
      titulo_eje_x="Eje horizontal"
			:margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
    >
      <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
					<p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>
      <template slot="pie">
        <div class="pie">
          <h3>Pie de gráfica</h3>
          <button @click="alternandoBase">Cambia la data</button>
        </div>
      </template>
    </DaiBarrasApiladas>
  </div>
</template>
<script>
import base_dummy_1 from "./base_dummy_1.json";
import base_dummy_2 from "./base_dummy_2.json";

export default {
  name: "BarrasBasico",
  data: function () {
    return {
      algo: true,
      datos: base_dummy_1,
      variables: [
        { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#721817" },
        { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#2B4162" },
        { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#0B6E4F" },
      ],
      base_seleccionada: 1,
    };
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = base_dummy_2;
				this.variables = [
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#231123" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#82204A" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#558C8C" },
					{ id: "cantidad_4", nombre_colores: "cantidad 4", color: "#E8DB7D" },
          { id: "cantidad_5", nombre_colores: "cantidad 5", color: "#DBC2CF" }
        ];
				
      } else {
        this.base_seleccionada = 1;
        this.datos = base_dummy_1;
        this.variables = [
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#721817" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#2B4162" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#0B6E4F" }
        ];
      }
    },
  },
};
</script>

<style lang="scss" >
$border-radius-tarjeta: 8px;

div#barras_cambio_base{
	border: solid 1px #000;
	border-radius: $border-radius-tarjeta;
div.encabezado{

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
	
}
div.pie{
	padding: 2px 15px;
		button{
				border: none;
				font-size: 14px;
				margin: 0px;
				padding: 5px 10px;
				&:hover  {
					background: #141414;
					color: #fff;
				}
			}
	
		border-radius: $border-radius-tarjeta;
		box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
		margin-bottom:10px;
	}

}

</style>