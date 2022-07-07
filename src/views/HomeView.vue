<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <Menu />
        <div class="col py-3">
            Components toggle...
        </div>
    </div>
</div>
</template>

<script>
import Menu from '@/components/Menu.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    Menu
    // HelloWorld
  }
}
</script>
