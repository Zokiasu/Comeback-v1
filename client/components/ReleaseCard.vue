<template>
  <!--<NuxtLink :to="`/release/${release.id}`" v-if="width" class="texts flex flex-col text-white rounded">
    <div class="relative h-40 w-40">
        <img class="rounded-md object-cover h-40 w-40" :src="release.image" alt="Artist Picture"/>
        <div v-if="validationDate" class="absolute top-0 right-0 text-white bg-gray-500 bg-opacity-80 p-2 rounded-bl rounded-tr">
            <p class="text-center"> {{new Date(release.date).toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}} </p>
        </div>
    </div>
    <div>
        <span class="font-semibold"> {{release.name}} </span>
        <div class="flex text-xs md:text-sm">
            <span> {{release.type}} </span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span class="truncate"><span v-for="(artist, index) in release.artists" :key="index">{{artist.name}}<span v-if="release.artists.length > 1 && index != release.artists.length-1">, </span></span></span>
        </div>
    </div>
  </NuxtLink>-->

  <NuxtLink :to="`/release/${release.id}`" style="background-color: #3B3B3B" class="texts text-white flex rounded relative overflow-hidden">
    <img class="w-20 h-full rounded-l object-cover" :src="release.image" alt="Artist Picture"/>
    <div class="pl-2 py-2 truncate">
        <div class="flex justify-between truncate">
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
    props: ['release', 'width'],

    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },

      validationDate(){
        return this.checkDate()
      },
    },

    updated(){
      this.width = this.width
    },

    methods :{
      checkDate(){
        return moment(new Date(this.release.date)).isAfter(new Date())
      }
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