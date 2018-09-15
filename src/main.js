import Vue from 'vue';
import TimePickerMod from './components/TimeModule.vue';
import { mixin as clickaway } from 'vue-clickaway';

Vue.config.productionTip = false;
Vue.config.devtools = false;

require('../src/css/styles.css');

Vue.prototype.$windowWidth = window.innerWidth;
Vue.prototype.$windowHeight = window.innerHeight;

Vue.mixin(clickaway);

window.addEventListener('resize', function() {
  Vue.prototype.$windowWidth = window.innerWidth;
  Vue.prototype.$windowHeight = window.innerHeight;
});

new Vue({
  render: h => h(TimePickerMod)
}).$mount('#time-picker');
