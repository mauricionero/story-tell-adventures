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
      console.log('Adventure.all()', Adventure.all());

      this.adventureModel.data['title'] = this.title;
      this.adventureModel.data['summary'] = this.summary;
      if (!this.adventureModel.save()) {
        console.log('erro ao salvar:', this.adventureModel.errors);
      }
    }
  }
}
</script>

<style>

</style>