<template>
  <div class="modal-mask">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="close" @click="emitCustomEvent()">
            <p>X</p>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="exit-modal" @click="emitCustomEvent()"></div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: ["title"],
  emits: ["close"],
  methods: {
    emitCustomEvent() {
      this.$emit("close", false);
    },
  } 
}
</script>

<style lang="scss" scoped>
    @import "./ModalComponent.scss";
</style>
