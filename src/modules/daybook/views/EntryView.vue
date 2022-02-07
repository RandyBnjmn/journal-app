<template>
  <template v-if="entry">

    <div class="entry-title d-flex justify-content-between p-2">

      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4">{{year}}</span>
      </div>

      <div>
        <input v-show="false" type="file" @change="onSelectedImage" ref="imageSelector">

        <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>

    </div>
    
      <hr />

      <div class="d-flex flex-column px-3 h-75">
        <textarea class="form-control" placeholder="¿Qué sucedio hoy?" v-model="entry.text"> </textarea>
      </div>
      <FabButton icon="fa-save" @on:click="saveEntry"  />
      
      <!-- <img src="https://via.placeholder.com/300" alt="img" /> -->
      <img v-if="localImage" :src="localImage"/>
  </template>
</template>

<script>

import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from "../helper/getDayMonthYear";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      entry: null,
      localImage:null,
      file:null
    };
  },

  components: {
    FabButton: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("journal", ["getEntriesById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date)
      return day
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },
  methods: {
    ...mapActions('journal',['updateEntries', 'loadEntries', 'createEntries', 'deleteEntry']),
    loadEntry() {
      let entry;

      if(this.id === 'new'){
        entry = {
          text: '',
          date: new Date().getTime()
        }

      }else{
        entry = this.getEntriesById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      
      this.entry = entry;
      
    },

    async saveEntry(){
      new Swal({
        title:'Espere por favor',
        allowOutsideClick:false
      })

      Swal.showLoading()


      if(this.entry.id){
        
        await this.updateEntries(this.entry)

      }else{
        const id = await this.createEntries(this.entry)
        this.$router.push({name:'entry', params:{id}})
        
      }
      Swal.fire('Guardado', 'Entrada guardada con exito', 'success')

      
    },
    async onDeleteEntry(){

      const result = await Swal.fire({

        title:"Esta seguro", 
        text:'Una vez borrado no hay vuelta atras',
        showDenyButton:true,
        confirmButtonText:'Si, estoy seguro'

      })

      const {isConfirmed} = result

      if( isConfirmed){
        new Swal({
          title:'Espere por favor',
          allowOutsideClick:false
        })

        Swal.showLoading()

        await this.deleteEntry(this.id)
        this.$router.push({name:'no-entry'})

        Swal.fire('Eliminado', '','success')

      }

    },
     onSelectedImage(event){
       const file = event.target.files[0]

       if(!file){
         this.localImage = null
         this.file = null
         return

       }

        const fr = new FileReader()

        fr.onload = () => this.localImage = fr.result

        fr.readAsDataURL( file )
        this.file = file

       console.log(event)
     }, 
     onSelectImage(){
       this.$refs.imageSelector.click()

     }
  },
  watch:{
    id(){
      this.loadEntry()
    }
  },

  created() {
    this.loadEntry();
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
