<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <Menu
          @type="chooseComponent"
        />
        <div class="col py-3">
            <component :is="dynamicComponent" />
        </div>
    </div>
</div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import AdventureView from '@/views/Adventure/AdventureView.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    Menu,
    AdventureView
    // HelloWorld
  },
  data(){
    return{
      componentUsed: "AdventureView"
    }
  },
  computed: {
    dynamicComponent() {  
       return this.componentUsed;
    }
  },
  methods: {
    chooseComponent(viewName){
      this.componentUsed = `${viewName}View`;
    }
  }
}
</script>
