<template>
  <NuxtLink :to="`/release/${release.id}`" class="texts flex flex-col text-white rounded">
    <div class="relative h-40 w-40">
        <div class="bg-gray-500 rounded-md">
          <img 
            :src="release.image" 
            alt="Artist Picture" 
            class="rounded-md object-cover aspect-square bg-gray-500 w-40 h-40"
          />
        </div>
        <div v-if="displayDate" class="absolute top-1 right-1 px-2 py-0.5 rounded text-white bg-gray-500 bg-opacity-80">
            <p class="text-center text-xs"> {{new Date(release.date).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'2-digit' })}} </p>
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

    props: {
      release: {
        type: Object,
        required: true
      },
      displayDate: {
        type: Boolean,
        default: false
      },
    },

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