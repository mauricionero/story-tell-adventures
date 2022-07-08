<template>
  <div>
    <h3>Adventure</h3>

    <input type="text" v-model="adventure">
    <button v-on:click="submitModel">EnviaDado</button>
    <ExcerptView />
  </div>
</template>

<script>
import ExcerptView from "@/views/Excerpt/ExcerptView.vue";
export default {
    name: "AdventureView",
    components: {
      ExcerptView
    },
    data(){
      return{
        adventure: "",
      }
    },
    methods: {
      submitModel(){
        localStorage.setItem('adventure', this.adventure);
      }
    }
}
</script>

<style>

</style>