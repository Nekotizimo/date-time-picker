<template>
  <div class="cont" id="time-picker-cont">
    <time-picker
      name="tp-1"
      buttonWidth="400px"
      :colors="{
        light: '#0fd81f', 
        mid: '#2dbd39', 
        dark: '#079713', 
        white: '#ffffff', 
        grey: '#c4c4c4', 
        black: '#050505'}"
      :columns="4"
      :hoursInterval="1"
      :minutesInterval="1"
      :secondsInterval="1"
      :ampm="true">
    </time-picker>
    <time-picker 
      name="tp-2"
      buttonWidth="600px"
      :colors="{
        light: '#9993ff', 
        mid: '#5449ff', 
        dark: '#0230f4', 
        white: '#f7f7f7', 
        grey: '#cccccc', 
        black: '#191919'}"
      :columns="2"
      :hoursInterval="1"
      :minutesInterval="1"
      :secondsInterval="0"
      :ampm="false">
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
