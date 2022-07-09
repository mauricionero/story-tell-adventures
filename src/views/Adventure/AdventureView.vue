<template>
  <div>
    <h3>Adventure</h3>

    Título: <input type="text" v-model="title" /><br />
    Summary: <input type="text" v-model="summary" /><br />
    <button v-on:click="submitModel">EnviaDado</button>
    <ExcerptView />
  </div>
</template>

<script>
import ExcerptView from "@/views/Excerpt/ExcerptView.vue";
import Adventure from "@/Model/Adventure";

export default {
  name: 'AdventureView',
  components: {
    ExcerptView
  },

  data() {
    return{
      title: '',
      summary: '',
      adventureModel: new Adventure()
    }
  },

  methods: {
    submitModel() {
      console.log('this.title', this.title);
      console.log('this.summary', this.summary);
      this.adventureModel.data['title'] = this.title;
      this.adventureModel.data['summary'] = this.summary;
      this.adventureModel.save();
    }
  }
}
</script>

<style>

</style>