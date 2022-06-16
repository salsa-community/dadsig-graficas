import DadsigCajasBigotes from './DadsigCajasBigotes.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigCajasBigotes.name,DadsigCajasBigotes);
}

export default plugin;


export { 
    plugin as install,
    DadsigCajasBigotes
};