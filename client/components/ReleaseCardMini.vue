<template>
  <NuxtLink :to="`/release/${release.id}`" style="background-color: #3B3B3B" class="texts text-white flex rounded relative overflow-hidden">
    <img class="w-20 h-20 rounded-l object-cover" :src="release.image" alt="Artist Picture"/>
    <div class="pl-2 truncate w-full">
        <div class="flex justify-between truncate w-full">
            <p class="font-semibold truncate">{{release.name}}</p>
            <span v-if="validationDate" class="text-center font-semibold text-sm text-white bg-gray-500 py-1 px-2 shadow-2xl">{{new Date(release.date).toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}}</span>
        </div>
        <div class="flex text-sm">
            <span> {{release.type}} </span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span class="truncate"><span v-for="(artist, index) in release.artists" :key="index">{{artist.name}}<span v-if="release.artists.length > 1 && index != release.artists.length-1">, </span></span></span>
        </div>
    </div>
  </NuxtLink>
</template>

<script>
  import moment from 'moment-timezone'
  export default {
    props: ['release'],

    data(){
        return {
          width:false,
        }
    },

    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },

      validationDate(){
        return this.checkDate()
      },
    },

    mounted() {
      this.handleResize();
        
    },

    methods :{
      checkDate(){
        return moment(new Date(this.release.date)).isAfter(new Date())
      },

      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
          this.$nuxt.refresh()
        } else {
          this.width = false
          this.$nuxt.refresh()
        }
      },
    }
  }
</script>

<style>
.texts {
  font-family:
    'Sarala'
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  letter-spacing: 1px;
}
</style>