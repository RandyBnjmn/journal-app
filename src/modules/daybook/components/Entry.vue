<template>
  <div class=" entry-container mb-3 pointer p-2" @click="$router.push({name:'entry', params:{id:entry.id}})">

      <div class="entry-title">
          <span class="text-success fs-5 fw-bold">{{day}}</span>
          <span class="mx-1 fs-5">{{month}}</span>
          <span class="mx-2 fs-5">{{year}}</span>
      </div>

      <div class="entry-description">
          {{sortText}}
      </div>
  </div>
</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

    import getDayMonthYear from '../helper/getDayMonthYear'
export default {
    

    props:{
        
        entry:{
            type:Object,
            required:true
        }

    },

    computed:{
        sortText(){
            return this.entry.text.length > 120 ? this.entry.text.substring(0,120)+'...' : this.entry.text
        },
        day(){
            const {day} = getDayMonthYear(entry.date)
            return day
        },
        month(){
            const {month} = getDayMonthYear(entry.date)
        },
        year(){
            const yearDay = getDayMonthYear(entry.date)
        },
    },
  


}
</script>

<style lang="scss" scoped>
.entry-container {
    
    border-bottom: 1px solid #2c3e50;
    transition:  all ease-in;

    &:hover{
        background-color:  lighten($color: grey, $amount: 45);
        transition:  all ease-in;
    }

    .entry-description{
        font-size: 12px;
    }

    
}
</style>