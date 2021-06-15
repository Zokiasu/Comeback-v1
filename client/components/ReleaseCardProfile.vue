<template>
  <NuxtLink :to="`/release/${release.id}`" class="texts flex flex-col text-white rounded">
    <div class="relative h-40 w-40">
        <img class="rounded-md object-cover h-40 w-40" :src="release.image" alt="Artist Picture"/>
        <div v-if="validationDate" class="absolute top-0 right-0 text-white bg-gray-500 bg-opacity-80 p-2 rounded-bl rounded-tr">
            <p class="text-center"> {{new Date(release.date).toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}} </p>
        </div>
    </div>
    <div>
        <span class="font-semibold"> {{release.name}} </span>
        <div class="flex text-xs md:text-sm">
            <span>{{release.type}}</span>
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