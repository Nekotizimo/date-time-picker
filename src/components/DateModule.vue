<template>
  <div class="cont" id="date-picker-cont">
    <date-picker
      buttonWidth="400px">
    </date-picker>
  </div>
</template>

<script>
import DatePicker from './date-time-pickers/DatePicker.vue';

export default {
  name: 'date-picker-mod',
  components: {
    'date-picker': DatePicker
  },
  data() {
    return {
      date: ''
    };
  }
};
</script>