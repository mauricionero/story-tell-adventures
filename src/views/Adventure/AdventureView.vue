<template>
  <div>
    <h3>Adventure</h3>

    Título: <input type="text" v-model="adventureModel.data['title']" /><br />
    Summary: <input type="text" v-model="adventureModel.data['summary']" /><br />
    <button @click="submitModel">EnviaDado</button>

    <p v-if="errors"></p>
    <p v-if="success">{{success}}</p>
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
      adventureModel: new Adventure(),
      errors: [],
      success: null
    }
  },

  methods: {
    submitModel() {
      this.adventureModel.save()
        .then((res) => {
          this.errors = [];
          this.success = null;
          if(res){
            this.success = "Deu certo!"
            this.adventureModel = new Adventure();
          }else{
            console.log('erro ao salvar uniqueMessages:', this.adventureModel.uniqueMessages());
            console.log('erro ao salvar messagesByField:', this.adventureModel.messagesByField());
            console.log('erro ao salvar fullMessages:', this.adventureModel.fullMessages());
            this.errors = this.adventureModel.fullMessages();
            [
              "Title is not unique",
            ]
          }
        })
        .catch(err => {
          this.errors.push("Deu um erro!");
        })


      // console.log('this.adventureModel', this.adventureModel);
      // console.log('creating title...');
      // if (!this.adventureModel.save()) {
      //   console.log('erro ao salvar:', this.adventureModel.errors);
      // }

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