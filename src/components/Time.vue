<template>
  <div class="tdp-time-picker">
    <button class="tdp-button-select" :class="status" :style="styles" @click="toggleOpened()">
      <span class="tdp-button-select-text">{{ text }}</span>
      <span class="tdp-button-select-value">{{ value }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['selectWidth'],
  data() {
    return {
      text: 'Select time: ',
      init: false,
      status: {
        opened: false
      },
      styles: {
        width: this.selectWidth
      }
    };
  },
  computed: {
    value() {
      if(!this.init) {
        var d = new Date();
        return (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + 
          (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + 
          (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
      }
    }
  },
  methods: {
    toggleOpened() {
      this.status.opened = !this.status.opened;
    }
  }
};
</script>

<style scoped>
.tdp-button-select {
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  line-height: 3em;
  margin: 1em;
  border-radius: 0.5em;
  outline: none;
  border: 1px solid #c4c4c4;
  text-align: left;
  transition: 0.1s ease-in-out;
}

.tdp-button-select:active, .tdp-button-select.opened:active {
  border-color: #2dbd39;
}

.tdp-button-select.opened {
  border-color: #47d653;
}

span {
  display: block;
  line-height: 1.5em;
  margin: 0.1rem 0.3rem;
}

.tdp-button-select-text {
  font-size: 70%;
}
</style>

