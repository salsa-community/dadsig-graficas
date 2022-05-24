<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <dai-leyenda-mapa
                :para="['estados_c']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_c" 
                titulo="Estados con titulo"
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'categorias',
                    columna : 'estados_grado_marg',
                    acomodoCategorias:['Muy bajo','Bajo','Categoria gris que no esta en datos','Medio','Alto','Muy alto'],
                    propiedadObjetivo: 'relleno',
                    colores: ['red','black', 'gray','yellow','green','orange']
                }"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>