<template>
  <div class="entry-list-container">
      <div class="px-2 pt-2">
          <input type="text" class=" form-control" placeholder="Buscar entrada" v-model="term">
      </div>
      <div class="d-flex mt-2 flex-column justify-content-center">
          <button class="btn btn-primary mx-4 " @click="$router.push({name:'entry', params: {id: 'new'} })"> <i class="fa fa-plus-circle"></i> Nueva entrada</button>

      </div>
      <div class="entry-scrollarea">
          <Entry v-for="item in entriesByTerm" :key="item.id" :entry="item"/>
      </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters} from 'vuex'
export default {

    data(){
        return{
            term:''
        }
    },
    components:{
        Entry: defineAsyncComponent(()=>import('./Entry.vue'))
    },
    computed:{
        ...mapGetters('journal',['getEntriesByTerm']),
        entriesByTerm(){
            return this.getEntriesByTerm(this.term)
        }
    }
}
</script>

<style lang="scss" scoped>



.entry-list-container{

    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);

}

.entry-scrollarea{
    height: calc(100vh - 110px);
    overflow: scroll;
}

</style>