<template>
  <div class="tdp-time-picker" :style="{width: buttonWidth}">
    <div class="tp-button-cont">
      <button class="tp-button" :class="classes" 
        @click="toggleOpened()" @mouseover="buttonHovered = true" @mouseout="buttonHovered = false" 
        ref="tp-button" :style="buttonStyles">
        <span class="tp-button-text">{{ text }}</span>
        <span class="tp-button-value">{{ value }}</span>
      </button>
      <transition name="tp-panel">
        <div class="tp-panel" ref="tp-panel" :class="classes" :style="panelStyles" v-show="classes.opened" v-on-clickaway="close">
          <div class="tp-panel-value" :style="panelValueStyles">
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
              <fieldset v-if="ampm" class="tp-hours">
                <template v-for="(hour, i) in hours12" v-if="i % hoursInterval === 0">
                  <input :id="name + '-' + hour + '-hr-num'" type="radio" name="hour" :key="i * 2" 
                    :checked="hour == selectedHour" :value="hour" v-model="selectedHour">
                  <label :for="name + '-' + hour + '-hr-num'" :key="i * 2 + 1" @mouseover="hoveredHour = hour" 
                    @mouseout="hoveredHour = ''" :style="hourNumbersStyles(hour)">{{ hour }}</label>
                </template>
              </fieldset>
              <fieldset v-if="!ampm" class="tp-hours">
                <template v-for="(hour, i) in hours24" v-if="i % hoursInterval === 0">
                  <input :id="name + '-' + hour + '-hr-num'" type="radio" name="hour" :key="i * 2" 
                    :checked="hour == selectedHour" :value="hour" v-model="selectedHour">
                  <label :for="name + '-' + hour + '-hr-num'" :key="i * 2 + 1" @mouseover="hoveredHour = hour"
                    @mouseout="hoveredHour = ''" :style="hourNumbersStyles(hour)">{{ hour }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="minutesInterval" ref="tp-minutes-cont">
              <fieldset class="tp-minutes">
                <template v-for="(minute, i) in minutes" v-if="i % minutesInterval === 0">
                  <input :id="name + '-' + minute + '-min-num'" type="radio" name="minute" :key="i * 2"
                    :checked="minute == selectedMinute" :value="minute" v-model="selectedMinute">
                  <label :for="name + '-' + minute + '-min-num'" :key="i * 2 + 1" @mouseover="hoveredMinute = minute"
                    @mouseout="hoveredMinute = ''" :style="minuteNumbersStyles(minute)">{{ minute }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="secondsInterval" ref="tp-seconds-cont">
              <fieldset class="tp-seconds">
                <template v-for="(second, i) in seconds" v-if="i % secondsInterval === 0">
                  <input :id="name + '-' + second + '-sec-num'" type="radio" name="second" :key="i * 2"
                    :checked="second == selectedSecond" :value="second" v-model="selectedSecond">
                  <label :for="name + '-' + second + '-sec-num'" :key="i * 2 + 1" @mouseover="hoveredSecond = second" 
                    @mouseout="hoveredMinute = ''" :style="secondNumbersStyles(second)">{{ second }}</label>
                </template>
              </fieldset>
            </div>
            <div v-if="ampm" ref="tp-ampm-cont">
              <fieldset class="tp-ampm">
                <input :id="name + '-' + 'am-num'" type="radio" name="ampm" value="am" v-model="selectedAmpm">
                <label :for="name + '-' + 'am-num'" @mouseover="hoveredAmpm = 'am'" @mouseout="hoveredAmpm = ''"
                  :style="ampmNumbersStyles('am')">am</label>
                <input :id="name + '-' + 'pm-num'" type="radio" name="ampm" value="pm" v-model="selectedAmpm">
                <label :for="name + '-' + 'pm-num'" @mouseover="hoveredAmpm = 'pm'" @mouseout="hoveredAmpm = ''" 
                  :style="ampmNumbersStyles('pm')">pm</label>
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
    name: { type: String },
    buttonWidth: { type: String },
    colors: { type: Object },
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
      classes: {
        opened: false,
        up: false,
        down: true
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
      selectedHour: '00',
      selectedMinute: '00',
      selectedSecond: '00',
      selectedAmpm: 'am',
      hoveredHour: '00',
      hoveredMinute: '00',
      hoveredSecond: '00',
      hoveredAmpm: 'am',
      buttonHovered: false
    };
  },
  computed: {
    value() {
      var value = '';
      if (this.hoursInterval) {
        value += this.selectedHour;
      }
      if (this.minutesInterval) {
        value += ':' + this.selectedMinute;
      }
      if (this.secondsInterval) {
        value += ':' + this.selectedSecond;
      }
      if (this.ampm) {
        value += this.selectedAmpm;
      }
      return value;
    },
    panelWidth() {
      return 4.5 * this.columns + 'em';
    },
    buttonStyles() {
      if (this.buttonHovered) {
        return {
          border: '1px solid ' + this.colors.mid,
          backgroundColor: this.colors.white
        };
      } else if (this.classes.opened) {
        return {
          border: '1px solid ' + this.colors.light,
          backgroundColor: this.colors.white
        };
      } else {
        return {
          border: '1px solid ' + this.colors.grey,
          backgroundColor: this.colors.white
        };
      }
    },
    panelStyles() {
      return {
        width: this.panelWidth,
        border: '1px solid ' + this.colors.grey,
        backgroundColor: this.colors.white
      };
    },
    panelValueStyles() {
      return {
        color: this.colors.white,
        backgroundColor: this.colors.mid
      };
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
        this.selectedHour = ampmhr < 10 ? '0' + ampmhr : ampmhr;
      } else {
        this.selectedHour = hr < 10 ? '0' + hr : hr;
      }
      this.selectedMinute = min < 10 ? '0' + min : min;
      this.selectedSecond = sec < 10 ? '0' + sec : sec;
      if (hr < 12) {
        this.selectedAmpm = 'am';
      } else {
        this.selectedAmpm = 'pm';
      }
    },
    toggleOpened() {
      if (!this.classes.opened) {
        if (this.buttonPos().y <= this.$windowHeight / 2) {
          this.classes.up = false;
          this.classes.down = true;
        } else {
          this.classes.up = true;
          this.classes.down = false;
        }
      }
      setTimeout(
        function() {
          if (this.hoursInterval != 0) {
            this.$refs['tp-hours-cont'].scrollTop =
              19 * (this.selectedHour / this.hoursInterval - (this.ampm ? 3 : 2));
          }
          if (this.minutesInterval != 0) {
            this.$refs['tp-minutes-cont'].scrollTop = 19 * (this.selectedMinute / this.minutesInterval - 2);
          }
          if (this.secondsInterval != 0) {
            this.$refs['tp-seconds-cont'].scrollTop = 19 * (this.selectedSecond / this.secondsInterval - 2);
          }
        }.bind(this),
        2
      );
      this.classes.opened = true;
    },
    close() {
      if (window.getComputedStyle(this.$refs['tp-panel']).getPropertyValue('display') != 'none') {
        this.classes.opened = false;
      }
    },
    buttonPos() {
      if (this.$refs['tp-button'] === undefined) {
        return {
          x: 0,
          y: 0
        };
      }
      var rect = this.$refs['tp-button'].getBoundingClientRect();
      return {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2
      };
    },
    hourNumbersStyles(hour) {
      if (hour == this.selectedHour) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.dark
        };
      } else if (hour == this.hoveredHour) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.mid
        };
      } else {
        return {
          color: this.colors.black,
          backgroundColor: this.colors.white
        };
      }
    },
    minuteNumbersStyles(minute) {
      if (minute == this.selectedMinute) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.dark
        };
      } else if (minute == this.hoveredMinute) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.mid
        };
      } else {
        return {
          color: this.colors.black,
          backgroundColor: this.colors.white
        };
      }
    },
    secondNumbersStyles(second) {
      if (second == this.selectedSecond) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.dark
        };
      } else if (second == this.hoveredSecond) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.mid
        };
      } else {
        return {
          color: this.colors.black,
          backgroundColor: this.colors.white
        };
      }
    },
    ampmNumbersStyles(ampm) {
      if (ampm == this.selectedAmpm) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.dark
        };
      } else if (ampm == this.hoveredAmpm) {
        return {
          color: this.colors.white,
          backgroundColor: this.colors.mid
        };
      } else {
        return {
          color: this.colors.black,
          backgroundColor: this.colors.white
        };
      }
    }
  }
};
</script>

<style scoped>
.tdp-time-picker {
  margin: auto;
}

.tp-button-cont {
  overflow: visible;
  height: 3rem;
  padding: 1em;
}

.tp-button {
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
  text-align: left;
  transition: border-color 0.1s ease-in-out;
}

span {
  display: block;
  line-height: 1.5em;
  margin: 0.1rem 0.3rem;
}

.tp-button-text {
  font-size: 70%;
}

.tp-panel {
  display: none;
  position: relative;
  height: 12em;
  margin: 0.5em 0px;
  border-radius: 0.5em;
  overflow: hidden;
}

.tp-panel.up {
  transform: translateY(-16.5em);
}

.tp-panel-enter-active,
.tp-panel-leave-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.tp-panel-leave-to.down,
.tp-panel-enter.down {
  transform: translateY(-3.5em);
  opacity: 0;
}

.tp-panel-leave-to.up,
.tp-panel-enter.up {
  transform: translateY(-13em);
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

h3 {
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
</style>
