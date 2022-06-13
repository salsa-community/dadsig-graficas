<template>
  <div>
    <DaiBarras
        :barras_id="'verticales_simples'"
        :datos="[{categoria: 'Variable A', cantidad: 120},
                 {categoria: 'Variable B', cantidad: 150},
                 {categoria: 'Variable C', cantidad: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :tooltip_activo="true"
        :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"/>
  </div>
</template>

<script>
export default {
  name: "verticales-simples",
};
</script>