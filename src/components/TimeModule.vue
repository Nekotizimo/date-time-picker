<template>
  <div class="cont" id="time-picker-cont">
    <time-picker 
      selectWidth="400px"
      :columns="4"
      :hoursInterval="1"
      :minutesInterval="1"
      :secondsInterval="1"
      :ampm="true">
    </time-picker>
  </div>
</template>

<script>
import TimePicker from './date-time-pickers/TimePicker';

export default {
  name: 'time-picker-mod',
  components: {
    'time-picker': TimePicker
  }
};
</script>
