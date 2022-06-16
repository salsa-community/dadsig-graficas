import {
    DadsigBarras,
    DadsigDonas,
    DadsigLineas,
    DadsigCajasBigotes
} from "./components"


export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DadsigBarras)
    Vue.use(DadsigDonas)
    Vue.use(DadsigLineas)
    Vue.use(DadsigCajasBigotes)


}

export {
    plugin as install,
    DadsigBarras,
    DadsigDonas,
    DadsigLineas,
    DadsigCajasBigotes
}