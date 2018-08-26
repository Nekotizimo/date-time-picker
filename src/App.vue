<template>
  <div id="app">
    <time-picker select-width="400px"></time-picker>
  </div>
</template>

<script>
import TimePicker from './components/Time.vue';

export default {
  name: 'app',
  components: {
    'time-picker': TimePicker
  }
};
</script>
