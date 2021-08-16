<template>
  <NuxtLink :to="`/release/${release.id}`" class="texts flex flex-col text-white rounded">
    <div class="relative w-32 h-32 lg:h-40 lg:w-40">
        <div>
          <img class="rounded-md object-cover w-32 h-32 lg:h-36 lg:w-36" :src="release.image" alt="Artist Picture"/>
        </div>
        <div v-if="validationDate" class="absolute top-0 right-0 text-white bg-gray-500 bg-opacity-80 p-2 rounded-bl rounded-tr">
            <p class="text-center"> {{new Date(release.date).toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}} </p>
        </div>
    </div>
    <div class="w-32 lg:w-40">
      <div class="flex text-xs md:text-sm">
        <span class="truncate"><span class="font-semibold">{{release.name}}</span></span>
      </div>
      <div class="flex text-xs md:text-sm">
          <span> {{release.type}} </span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span class="truncate"><span v-for="(artist, index) in release.artists" :key="index">{{artist.name}}<span v-if="release.artists.length > 1 && index != release.artists.length-1">, </span></span></span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
  import moment from 'moment-timezone'
  export default {
    name: "releaseCard",

    props: ['release'],

    computed: {
      validationDate(){
        return this.checkDate()
      },
    },

    methods :{
      checkDate(){
        return moment(new Date(this.release.date)).isAfter(new Date())
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