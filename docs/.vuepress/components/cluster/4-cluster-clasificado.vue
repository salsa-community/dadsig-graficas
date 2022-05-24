<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['cluster-clasificado','sin-cluster']"/>
        </template>
        <DaiMapa>
            <DaiCapaXyz />
            <DaiCapaGeojson 
            id="sin-cluster"
            titulo="Capa sin cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            />
            <DaiCapaGeojsonCluster 
            id="cluster-clasificado"
            titulo="Capa con cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :reglas-estilo-capa="{
                clasificacion:'linear',
                columna:'features_count',
                propiedadObjetivo: 'proporcion',
                clases:4,
                proporciones:[4,8,12,16]
            }"
            :estilo-capa="{
                circle:{
                    fill:{color:'green'}
                }
            }"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>