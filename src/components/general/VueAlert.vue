<template>
  <transition name="fade">
    <div class='vue-alert alert' :class="alertClass" v-if="!hidden">
        <slot></slot>
        <i class="fa fa-close alert-close" v-if="withCloseBtn" @click="hide()"></i>
    </div>
  </transition>

</template>

<script>
  export default {
    name: 'vue-alert',
    computed: {
      alertClass () {
        return {
          'with-close': this.withCloseBtn,
          'alert-success': this.type === 'success',
          'alert-danger': this.type === 'danger',
          'alert-warning': this.type === 'warning',
          'alert-info': this.type === 'info'
        }
      }
    },
    props: {
      type: {
        type: String,
        default: 'success'
      },
      withCloseBtn: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        hidden: true
      }
    },
    methods: {
      hide () {
        this.hidden = true
      }
    }
  }
</script>