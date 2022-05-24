<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            Los clusteres son capas (casi siempre de tipo punto), que a medida que el zoom avanza se van desagregando
            <DaiLeyendaMapa :para="['cluster-basico','sin-cluster']"/>
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
            id="cluster-basico"
            titulo="Capa con cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'red'},
                    stroke:{color:'black',width:1},
                    radius:6
                }
            }"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>