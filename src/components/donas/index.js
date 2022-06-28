import DadsigDonas from './DadsigDonas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigDonas.name,DadsigDonas);
}

export default plugin;


export {
    plugin as install,
    DadsigDonas
};