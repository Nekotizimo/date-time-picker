<template>
  <div class="tdp-date-picker" :style="{width: buttonWidth}">
    <div class="dp-button-cont">
      <button class="dp-button" ref="dp-button" :class="classes" 
        @click="toggleOpened()" @mouseover="buttonHovered = true" @mouseout="buttonHovered = false" :style="buttonStyles">
        <span class="dp-button-text">{{ text }}</span>
        <span class="dp-button-value">{{ value.string }}</span>
      </button>
      <transition name="dp-panel">
        <div class="dp-panel" ref="dp-panel" :class="classes" :style="panelStyles" 
          v-show="classes.opened" v-on-clickaway="close">
          <div class="dp-panel-value" :style="panelValueStyles">
            <h3>{{ value.string }}</h3>
          </div>
          <div class="dp-panel-calendar">
            <h4 class="dp-calendar-month" :style="{color: this.colors.black}">{{ months[month - 1] }}</h4>
            <ul class="dp-calendar-names" :style="{color: this.colors.grey}"><li v-for="(day, i) in days" :key="i">{{ day }}</li></ul>
            <ul class="dp-calendar-days" :style="{color: this.colors.black}"></ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Select date: ' },
    buttonWidth: { type: String, default: '100%' },
    colors: {
      type: Object,
      default() {
        return {
          light: '#0fd81f',
          mid: '#2dbd39',
          dark: '#079713',
          white: '#ffffff',
          grey: '#c4c4c4',
          black: '#050505'
        };
      }
    }
  },
  data() {
    return {
      classes: {
        opened: false,
        up: false,
        down: true
      },
      buttonHovered: false,
      month: 9,
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
  },
  computed: {
    value() {
      return {
        string: 'placeholder'
      };
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
  methods: {
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
      this.classes.opened = !this.classes.opened;
    },
    close() {
      if (window.getComputedStyle(this.$refs['dp-panel']).getPropertyValue('display') != 'none') {
        this.classes.opened = false;
      }
    },
    buttonPos() {
      if (this.$refs['dp-button'] === undefined) {
        return {
          x: 0,
          y: 0
        };
      }
      var rect = this.$refs['dp-button'].getBoundingClientRect();
      return {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2
      };
    }
  }
};
</script>

<style scoped>
.tdp-date-picker {
  margin: auto;
}

.dp-button-cont {
  overflow: visible;
  height: 3rem;
  padding: 0.5em;
}

.dp-button {
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

.dp-button-text {
  font-size: 70%;
}

.dp-panel {
  display: none;
  position: relative;
  width: 21em;
  height: 15em;
  margin: 0.5em 0px;
  border-radius: 0.5em;
  background-color: white;
  overflow: hidden;
}

.dp-panel.up {
  transform: translateY(-16.5em);
}

.dp-panel-enter-active,
.dp-panel-leave-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.dp-panel-leave-to.down,
.dp-panel-enter.down {
  transform: translateY(-3.5em);
  opacity: 0;
}

.dp-panel-leave-to.up,
.dp-panel-enter.up {
  transform: translateY(-13em);
  opacity: 0;
}

.dp-panel-enter-active,
.dp-panel.opened,
.dp-panel-leave-active {
  display: block;
}

.dp-panel.opened {
  display: block;
}

h3 {
  margin: 0px;
  line-height: 2em;
}

h4 {
  margin: 0.2em;
  font-weight: normal;
}

.dp-calendar-names {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 1.4em;
  padding: 0px;
  margin: 0.1em;
}

.dp-calendar-names > li {
  list-style-type: none;
  flex: 1 1 40px;
  height: 1em;
  margin: auto 0px;
  font-size: 80%;
}
</style>