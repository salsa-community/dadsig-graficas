import DaiDonas from './DaiDonas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiDonas.name,DaiDonas);
}

export default plugin;


export {
    plugin as install,
    DaiDonas
};