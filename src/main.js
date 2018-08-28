import Vue from 'vue';
import TimePickerMod from './components/TimeModule.vue';

Vue.config.productionTip = false;
Vue.config.devtools = false;

require('../src/css/styles.css');

new Vue({
  render: h => h(TimePickerMod)
}).$mount('#time-picker');
