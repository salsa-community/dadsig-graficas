<template>
    <div>
        <DadsigDiagramaProcesos
            :datos="datos"
        />
    </div>
</template>
<script>

</script>
<script>
import procesos from "./procesos.json"

export default {
    name:"ejemplo-basico-diagrama-procesos",
    data(){
        return {
            datos:procesos
        }
    }
}
</script>
