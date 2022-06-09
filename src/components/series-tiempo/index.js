import DaiLineas from './DaiSeriesTiempo.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiLineas.name,DaiLineas);
}

export default plugin;


export { 
    plugin as install,
    DaiLineas
};