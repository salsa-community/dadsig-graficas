import {
    DaiBarrasApiladas
} from "./components"


export default function plugin(Vue){
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiBarrasApiladas)

}

export {
    plugin as install,
    //componentes
    DaiBarrasApiladas


}