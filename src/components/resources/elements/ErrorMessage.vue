<template>
    <b-alert variant="danger" dismissible show>
        {{message}}
    </b-alert>
</template>

<script>
//expects - message strings, and alert varient
export default {
  props: ['message'],
  name: 'ErrorMessage',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>