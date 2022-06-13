<template>
  <div>
    <DaiBarras
        :barras_id="'verticales_simples'"
        :datos="[{categoria: 'Variable A', metrica: 120},
                 {categoria: 'Variable B', metrica: 150},
                 {categoria: 'Variable C', metrica: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :tooltip_activo="true"
        :variables="[{id:'metrica', nombre_colores:'metrica', color: '#7fcdbb'}]"/>
  </div>
</template>

<script>
export default {
  name: "verticales-simples",
};
</script>