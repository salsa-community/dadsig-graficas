import DaiBarrasApiladas from './BarrasApiladas.vue'
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiBarrasApiladas.name,DaiBarrasApiladas)
}

export default plugin;


export { 
    plugin as install,
    DaiBarrasApiladas
}