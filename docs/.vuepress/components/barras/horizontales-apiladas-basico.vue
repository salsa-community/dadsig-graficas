<template>
  <div>
    <DadsigBarras
      :barras_id="'horizontales-apiladas-basico'"
      :datos="[
        {
          nombre_rectangulos: 'Variable A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'Variable B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc'},
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4'},
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#7fcdbb'},
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (numérico)"
      titulo_eje_x="Eje horizontal (categórico)"
      orientacion="horizontal"
      :tooltip_activo="false"
    />
  </div>
</template>

<script>
export default {
  name: "horizontales-apiladas-basico",
};
</script>