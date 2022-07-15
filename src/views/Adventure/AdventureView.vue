<template>
  <div>
    <h3>Adventure</h3>
    <ExcerptView />

    <button type="button" class="btn btn-primary" @click="toggleModal()">
      Launch demo modal
    </button>

    <ModalComponent
      v-if="modalActive"
      :title="'Cadastro de Aventura'"
      @close="toggleModal"
    >
      <label for="">
        <p>Título:</p>
        <input type="text" v-model="adventureModel.data['title']" /><br />
      </label>
      <label for="">
        <p>Resumo:</p>
        <input type="text" v-model="adventureModel.data['summary']" /><br />
      </label>
      <button type="button" class="btn btn-primary" @click="submitModel">EnviaDado</button>
    </ModalComponent>    
  </div>
</template>

<script>
import ExcerptView from "@/views/Excerpt/ExcerptView.vue";
import Adventure from "@/Model/Adventure";
import ModalComponent from "@/components/ModalComponent/ModalComponent.vue";

export default {
  name: 'AdventureView',
  components: {
    ExcerptView,
    ModalComponent
  },

  data() {
    return{
      title: '',
      summary: '',
      adventureModel: new Adventure(),
      errors: [],
      modalActive: false
    }
  },

  methods: {
    submitModel() {
      this.adventureModel.save()
        .then((res) => {
          this.errors = [];
          if(res){
            this.adventureModel = new Adventure();
            this.$notify({
              title: "Uhuu",
              text: "Oba, gravou!",
              type: "success"
            });
          }else{
            this.errors = this.adventureModel.fullMessages();
            
            this.errors.forEach((err) => {
              this.$notify({
                title: "Oops, deu um erro!",
                text: err,
                type: "error"
              });
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: "Oops, deu um erro!",
            text: err,
            type: "error"
          });
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
    },
    toggleModal(){
      this.modalActive = !this.modalActive;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./Adventure.scss";
</style>