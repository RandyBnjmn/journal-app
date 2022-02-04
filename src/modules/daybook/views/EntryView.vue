<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span  class="text-success fs-3 fw-bold">{{}}</span>
      <span class="mx-1 fs-3">dsfds</span>
      <span class="mx-2 fs-4">dsfs</span>

    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>

      <button class="btn btn-primary">
        Subir foto
        <i class="fa fa-upload"></i>
      </button>
    </div>

    <hr>

    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="Que sucedio hoy" v-model="entry.text">

      </textarea>
    </div>
    <FabButton icon="fa-save"/>

    <img src="https://via.placeholder.com/300" alt="img">


  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'
export default {
  
  data(){
    return{
      entry:null,
    }
  },
  components:{
    FabButton: defineAsyncComponent(()=> import('../components/Fab.vue'))
  },
  props:{
    id:{
      type: String,
      required:true
    }
  }, 
  computed:{
    ...mapGetters('journal', ['getEntriesById'])
  },
  methods:{
    loadEntry(){
      const entry = this.getEntriesById(this.id)
      if(!entry) this.$router.push({name:'no-entry'})
      else this.entry = entry
      
    }

  },

  created(){ 
    
    this.loadEntry()
  }
  
}
</script>

<style lang="scss" scoped>

  textarea{
    font-size: 20px;
    border:none;
    height: 100%;

    &:focus{
      outline: none;
    }
    
  }

  img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2) ;
  }
</style>