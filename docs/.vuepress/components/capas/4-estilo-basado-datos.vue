<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :permitir-colapso="false">
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna:'pob18ymas',
                    colores:'Reds',
                    clases:4
                }"
                />
                <dai-capa-geojson 
                id="estados_centroides"
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="[
                    {
                        clasificacion:'categorias',
                        columna : 'estados_grado_marg',
                        acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
                        propiedadObjetivo: 'relleno',
                        colores:'GnBu'
                    },
                    {
                        clasificacion:'cortes-naturales',
                        columna:'estados_pob18ymas_rural',
                        propiedadObjetivo:'proporcion',
                        proporciones:[8,12,15,20],
                        clases:4,
                        tituloVariable:'Cantidad de problación'
                    }
                ]"
                />
                
            </dai-mapa>
            <template v-slot:header>
                <dai-leyenda-mapa
                titulo="Poblacion mayor de 18 años"
                :para="['estados_poligonos']"
                />
                <dai-leyenda-mapa
                titulo="Grado de marginación, poblacion  rural"
                para="estados_centroides"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

