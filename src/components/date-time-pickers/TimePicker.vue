<template>
  <div class="tdp-time-picker" :style="{width: selectWidth}" >
    <div class="tp-button-select-cont">
      <button class="tp-button-select" :class="status" @click="toggleOpened()">
        <span class="tp-button-select-text">{{ text }}</span>
        <span class="tp-button-select-value">{{ value }}</span>
      </button>
      
      <transition name="tp-panel">
        <div class="tp-panel" :class="status" :style="{width: panelWidth}" v-show="status.opened">
          <div class="tp-panel-value">
            <h3>{{ value }}</h3>
          </div>
          <div class="tp-panel-labels">
            <div v-if="hoursInterval"><h5>hr</h5></div>
            <div v-if="minutesInterval"><h5>min</h5></div>
            <div v-if="secondsInterval"><h5>sec</h5></div>
            <div v-if="ampm"></div>
          </div>
          <div class="tp-panel-numbers">
            <div v-if="hoursInterval" ref="tp-hours-cont">
              <fieldset v-if="ampm" class="tp-hours" @change="changeHour($event)">
                <template v-for="(hour, i) in hours12" v-if="i % hoursInterval === 0">
                  <input :id="hour + '-hr-num'" type="radio" name="hour" :key="i * 2" 
                    :checked="hour == hourSelected">
                  <label :for="hour + '-hr-num'" :key="i * 2 + 1">{{ hour }}</label>
                </template>
              </fieldset>
              <fieldset v-if="!ampm" class="tp-hours" @change="changeHour($event)">
                <template v-for="(hour, i) in hours24" v-if="i % hoursInterval === 0">
                  <input :id="hour + '-hr-num'" type="radio" name="hour" :key="i * 2" 
                    :checked="hour == hourSelected">
                  <label :for="hour + '-hr-num'" :key="i * 2 + 1">{{ hour }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="minutesInterval" ref="tp-minutes-cont">
              <fieldset class="tp-minutes" @change="changeMinute($event)">
                <template v-for="(minute, i) in minutes" v-if="i % minutesInterval === 0">
                  <input :id="minute + '-min-num'" type="radio" name="minute" :key="i * 2"
                    :checked="minute == minuteSelected">
                  <label :for="minute + '-min-num'" :key="i * 2 + 1">{{ minute }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="secondsInterval" ref="tp-seconds-cont">
              <fieldset class="tp-seconds" @change="changeSecond($event)">
                <template v-for="(second, i) in seconds" v-if="i % secondsInterval === 0">
                  <input :id="second + '-sec-num'" type="radio" name="second" :key="i * 2"
                    :checked="second == secondSelected">
                  <label :for="second + '-sec-num'" :key="i * 2 + 1">{{ second }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="ampm" ref="tp-ampm-cont">
              <fieldset class="tp-ampm" @change="changeAmpm($event)">
                <input id="am-num" type="radio" name="ampm" :checked="ampmSelected">
                <label for="am-num">am</label>
                <input id="pm-num" type="radio" name="ampm" :checked="ampmSelected">
                <label for="pm-num">pm</label>
              </fieldset>
            </div>         
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectWidth: { type: String },
    columns: { type: Number },
    hoursInterval: { type: Number },
    minutesInterval: { type: Number },
    secondsInterval: { type: Number },
    ampm: { type: Boolean }
  },
  data() {
    return {
      text: 'Select time: ',
      init: false,
      status: {
        opened: false
      },
      hours24: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23'
      ],
      hours12: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      minutes: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59'
      ],
      seconds: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59'
      ],
      hourSelected: '00',
      minuteSelected: '00',
      secondSelected: '00',
      ampmSelected: 'am'
    };
  },
  computed: {
    value() {
      var value = '';
      if (this.hoursInterval) {
        value += this.hourSelected;
      }
      if (this.minutesInterval) {
        value += ':' + this.minuteSelected;
      }
      if (this.secondsInterval) {
        value += ':' + this.secondSelected;
      }
      if (this.ampm) {
        value += this.ampmSelected;
      }
      return value;
    },
    panelWidth() {
      return 4.5 * this.columns + 'em';
    }
  },
  created() {
    this.initValues();
  },
  methods: {
    initValues() {
      var d = new Date();
      var hr = Math.round(d.getHours() / this.hoursInterval) * this.hoursInterval;
      var min = Math.round(d.getMinutes() / this.minutesInterval) * this.minutesInterval;
      var sec = Math.round(d.getSeconds() / this.secondsInterval) * this.secondsInterval;
      if (this.ampm) {
        var ampmhr = hr > 12 ? hr - 12 : hr;
        if (hr == 0) {
          ampmhr = 12;
        }
        this.hourSelected = ampmhr < 10 ? '0' + ampmhr : ampmhr;
      } else {
        this.hourSelected = hr < 10 ? '0' + hr : hr;
      }
      this.minuteSelected = min < 10 ? '0' + min : min;
      this.secondSelected = sec < 10 ? '0' + sec : sec;
      if (hr < 12) {
        this.ampmSelected = 'am';
      } else {
        this.ampmSelected = 'pm';
      }
    },
    toggleOpened() {
      this.status.opened = !this.status.opened;
      this.$refs['tp-hours-cont'].scrollTop = 22.5 * (this.hourSelected / this.hoursInterval - 2);
      this.$refs['tp-minutes-cont'].scrollTop = 22.5 * (this.minuteSelected / this.minutesInterval - 2);
      this.$refs['tp-seconds-cont'].scrollTop = 22.5 * (this.secondSelected / this.secondsInterval - 2);
    },
    changeHour(event) {
      this.hourSelected = event.srcElement.id.charAt(0) + event.srcElement.id.charAt(1);
    },
    changeMinute(event) {
      this.minuteSelected = event.srcElement.id.charAt(0) + event.srcElement.id.charAt(1);
    },
    changeSecond(event) {
      this.secondSelected = event.srcElement.id.charAt(0) + event.srcElement.id.charAt(1);
    },
    changeAmpm(event) {
      this.ampmSelected = event.srcElement.id.charAt(0) + event.srcElement.id.charAt(1);
    }
  }
};
</script>

<style scoped>
.tdp-time-picker {
  margin: auto;
}

.tp-button-select-cont {
  overflow: visible;
  height: 3em;
  padding: 1em;
}

.tp-button-select {
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  line-height: 100%;
  height: 100%;
  overflow: visible;
  border-radius: 0.5em;
  outline: none;
  border: 1px solid #c4c4c4;
  text-align: left;
  transition: border-color 0.1s ease-in-out;
}

.tp-button-select:hover,
.tp-button-select.opened:hover {
  border-color: #2dbd39;
}

.tp-button-select.opened {
  border-color: #47d653;
}

span {
  display: block;
  line-height: 1.5em;
  margin: 0.1rem 0.3rem;
}

.tp-button-select-text {
  font-size: 70%;
}

.tp-panel {
  display: none;
  position: relative;
  height: 12em;
  margin: 0.6em 0px;
  background-color: #ffffff;
  border-radius: 0.5em;
  border: 1px solid #c4c4c4;
  overflow: hidden;
}

.tp-panel-enter-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.tp-panel-leave-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.tp-panel-leave-to,
.tp-panel-enter {
  transform: translateY(-50px);
  opacity: 0;
}

.tp-panel-enter-active,
.tp-panel.opened,
.tp-panel-leave-active {
  display: block;
}

.tp-panel.opened {
  display: block;
}

.tp-panel-value {
  background-color: #2dbd39;
}

h3 {
  color: #f8f8f8;
  margin: 0px;
  line-height: 2em;
}

.tp-panel-numbers,
.tp-panel-labels {
  display: flex;
  flex-flow: row nowrap;
}

.tp-panel-numbers > div,
.tp-panel-labels > div {
  flex: 1 1 50px;
}

.tp-panel-numbers > div {
  height: 8.28em;
  overflow: scroll;
}

h5 {
  margin: 0px;
  line-height: 1.8em;
}

fieldset {
  padding: 0px;
  margin: 0px;
  border: none;
}

input {
  display: none;
}

label {
  display: block;
  cursor: pointer;
  transition: background-color 0.1s;
}

label:hover {
  background-color: #0fd81f;
  color: #f8f8f8;
}

input:checked + label {
  background-color: #079713;
  color: #f8f8f8;
}
</style>
