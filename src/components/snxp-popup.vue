<template>
  <div class="slxp-popup">
    <div class="popup-mask" @click="maskHandle"></div>
    <div class="popup-content" :style="{width: config.width ? config.width : '80%'}">
      <div class="popup-hd" :style="{
        textAlign: config.titlePosition ? config.titlePosition : 'left',
        backgroundColor: config.headBgColor ? config.headBgColor : '#139EA5',
        height: config.titleHeight ? config.titleHeight : '48px',
        lineHeight: config.titleLineHeight ? config.titleLineHeight : '48px'}">
        <strong class="popup-title">{{config.title}}</strong>
        <span class="popup-close" @click="maskHandle"></span>
      </div>
      <div class="popup-bd">
        <slot name="popup-data"></slot>
      </div>
      <div class="popup-ft" v-if="config.popupFoot">
        <span v-if="config.cancelBtn" class="popup-btn popup-btn-cancel" @click="onCancel">{{config.cancelVal ? config.cancelVal : '取消'}}</span>
        <span
          v-if="config.confirmBtn"
          class="popup-btn popup-btn-confirm"
          :class="{disabled:config.confirmDisabled}"
          @click="onConfirm"
        >{{config.confirmVal ? config.confirmVal : '确认'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "slxp-popup",
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          title: '',
          headBgColor: '#139EA5',
          titleHeight: '48px',
          titleLineHeight: '48px',
          width: '80%',
          titlePosition: 'left',
          popupFoot: false,
          confirmBtn: false,
          cancelBtn: false,
          confirmVal: "确认",
          cancelVal: "取消",
          confirmDisabled: false
        }
      }
    }
  },
  methods: {
    maskHandle() {
      this.$emit("close")
    },
    onConfirm() {
      if (!this.isDisabled) {
        this.$emit("onConfirm")
        this.$emit("close")
      }
    },
    onCancel() {
      this.$emit("onCancel")
      this.$emit("close")
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-mask {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.popup-content {
  text-align: left;
  position: absolute;
  z-index: 2000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.popup-hd {
  height: 48px;
  line-height: 48px;
  padding: 0 30px;
  position: relative;
}

.popup-title {
  font-weight: 400;
  font-size: 18px;
  color: #fff;
}

.popup-close {
  position: absolute;
  right: 0;
  width: 48px;
  height: 48px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  &:before, &:after {
    content: "";
    width: 20px;
    height: 5px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.popup-bd {
  min-height: 40px;
  font-size: 16px;
  word-wrap: break-word;
  word-break: break-all;
  color: #4a4a4a;
  border: 1px solid #eee;
  background-color: #fff;
}

.popup-ft {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: flex;
  border-top: 1px solid #D5D5D6;

  &:after {
    content: ' ';
  }
}

.popup-btn {
  display: block;
  flex: 1;
  color: #D5D5D6;
  text-decoration: none;
  &:active {
    background-color: #eee;
  }
  position: relative;

  &:first-child {
    border-right: 1px solid #D5D5D6;

    &:after {
      display: none;
    }
  }

  &.popup-cancel {
    color: #353535;
  }

  &.popup-confirm {
    background-color: #2c5fc3;
    color: #FFFFFF;
  }

  &.disabled {
    background-color: #d7d7d7;
    color: #a4a4a4;
  }
}
</style>
