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
      this.adventureModel.data['title'] = this.title;
      this.adventureModel.data['summary'] = this.summary;
      console.log('this.adventureModel', this.adventureModel);
      console.log('creating title...');
      if (!this.adventureModel.save()) {
        console.log('erro ao salvar:', this.adventureModel.errors);
      }

      // console.log('this.title', this.title);
      // console.log('this.summary', this.summary);
      // Adventure.all().forEach(function(adventure) {
      //   console.log('adventure', adventure);
      //   console.log("adventure.data['title']", adventure.data['title']);
      // });

      // let itemFound = Adventure.findBy('title', 'teste');
      // console.log('itemFound (teste)', itemFound);
      // itemFound = Adventure.findBy('title', 'asdfasdf');
      // console.log('itemFound (asdfasdf)', itemFound);
    }
  }
}
</script>

<style>

</style>