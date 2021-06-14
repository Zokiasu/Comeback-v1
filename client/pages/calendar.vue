<template>
  <div class="mt-5">
    <div v-if="width" class="w-full flex justify-end px-10">
      <div>
        <t-select v-model="userPreference" id="artists-type-selector"
        :options="[
            { value: true, text: 'My Comeback' },
            { value: false, text: 'All Comeback' },
        ]" ></t-select>
      </div>
    </div>
    <div v-for="(date, index) in dateList" :key="index" class="justify-center texts text-white mx-10">
      <div class="sticky top-0 bg-mainbg z-50 col-start-1 col-end-7 border-b-2 border-red-700 pb-2">
          <h1 class="font-semibold text-4xl"> {{new Date(index).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric', year: 'numeric' })}} </h1>
      </div>
      <div class="flex flex-col space-y-2	py-5 justify-center texts text-white" >
        <ReleaseCard
          v-for="release in date.releases"
          :width="width"
          :release="release"
          :key="release.id"/>
      </div>
      <!--<div class="grid gap-3 py-5 justify-center texts text-white" :class="width ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-x-5 gap-y-10' : 'grid-cols-1 gap-3'">
        <ReleaseCard
          v-for="release in date.releases"
          :width="width"
          :release="release"
          :key="release.id"/>
      </div>-->
    </div>
  </div>
</template>

<script>
  import moment from 'moment-timezone'

  export default {

    scrollToTop: true,

    head() {
      return {
        title: 'Comeback - Calendar',
      }
    },

    data(){
        return {
          userPreference:false,
          width:false,
          enough: false,
          dateList:[],
          startDate: new Date()
        }
    },

    created(){
      this.getCalendar();
    },

    mounted() {
      this.handleResize();
    },
    
    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
    },

    methods: {
      async getCalendar(){
        this.startDate.setDate(this.startDate.getDate()-30)
        if(this.userPreference){
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}`)
          this.dateList = response
        } else {
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}`)
          this.dateList = response
          this.dateList.sort(function(a,b){
            if(a > b) {return -1}
            if(a < b) {return 1}
            return 0;
          })
        }
      },

      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
        } else {
          this.width = false
        }
      },
    },
  }
</script>