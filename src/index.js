import {
    DaiBarras,
    DaiDonas,
    DaiSeriesTiempo,
    DaiDiagramaCajas
} from "./components"


export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiBarras)
    Vue.use(DaiDonas)
    Vue.use(DaiSeriesTiempo)
    Vue.use(DaiDiagramaCajas)


}

export {
    plugin as install,
    DaiBarras,
    DaiDonas,
    DaiSeriesTiempo,
    DaiDiagramaCajas
}