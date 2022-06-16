import DadsigLineas from './DadsigLineas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigLineas.name,DadsigLineas);
}

export default plugin;


export { 
    plugin as install,
    DadsigLineas
};