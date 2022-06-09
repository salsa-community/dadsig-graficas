import {
    DaiBarrasApiladas,
    DaiSeriesTiempo,
    DaiDiagramaCajas
} from "./components"


export default function plugin(Vue){
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiBarrasApiladas)
    Vue.use(DaiSeriesTiempo)
    Vue.use(DaiDiagramaCajas)


}

export {
    plugin as install,
    //componentes
    DaiBarrasApiladas,
    DaiSeriesTiempo,
    DaiDiagramaCajas


}