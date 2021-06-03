<template>
  <div v-if="this.releaseList.length != 0" class="justify-center texts text-white mx-10">
    <div class="col-start-1 col-end-7 border-b-2 border-red-700 pb-2">
        <h1 class="font-semibold text-4xl"> {{new Date(date).toLocaleDateString('en-US', {  month: 'long', day: 'numeric' })}} </h1>
    </div>
    <div v-if="this.releaseList.length != 0" class="grid gap-3 py-5 justify-center texts text-white" :class="width ? 'grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-x-5 gap-y-10' : 'grid-cols-1 gap-3'">
        <ReleaseCard
          v-for="(release, index) in this.releaseList"
          :width="width"
          :release="release"
          :key="index"/>
    </div>
    <div v-if="this.releaseList.length == 0" style="background-color: #6B728033" class="w-full rounded-sm p-3 my-5 mr-10">
      <span>No Releases Scheduled</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['date', 'width'],

    data(){
      return {
        releaseList:[],
      }
    },

    mounted(){
      this.findDay(this.date)
    },

    methods: {
      async findDay(day){
        const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/releases?date=${day}`)
        this.releaseList = response
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