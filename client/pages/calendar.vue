<template>
  <div class="mt-5">
    <!--<div class="w-full flex justify-end">
      <t-select v-model="userPreference" id="artists-type-selector" class="w-40"
      :options="[
          { value: true, text: 'My Comeback' },
          { value: false, text: 'All Comeback' },
      ]" ></t-select>
    </div>-->
    <CalendarDay
      class=" z-0"
      v-for="(date, index) in this.releaseDateList"
      :key="index"
      :date="date"
      :userPreference="userPreference"
      :userArtistFollow="userData.artists"
      :width="width"/>
    <InfiniteScroll class="text-white w-full flex justify-center" :enough="enough" @load-more="updateDateList(startDate, false)" />
    <div v-if="this.releaseDateList.length < 1" class="px-5">
      <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">Nothing is planned</span>
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
          width:false,
          releaseDateList:[],
          maxDateListDisplay: -1,
          enough: false,
          userPreference:false,
          startDate: new Date(),
        }
    },

    async mounted() {
      this.handleResize();
      this.updateDateList(this.startDate)
    },
    
    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
    },

    methods: {
      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
        } else {
          this.width = false
        }
      },

      async updateDateList(start, resetList){
        
        if(resetList) { 
          this.releaseDateList = []
          this.maxDateListDisplay = 0
          this.enough = false
        }
        const {data: response} = await this.$axios.get('https://comeback-api.herokuapp.com/releases?sortby=date:desc&limit=1')
        
        console.log('Start Date', start)
        console.log('End Date',new Date(response[0].date))
        console.log('Max Display', this.maxDateListDisplay)

        if(!this.enough) {
          this.maxDateListDisplay = this.maxDateListDisplay + 10
          for (let index = (this.maxDateListDisplay) - 10; index < this.maxDateListDisplay; index++) {
            let date = new Date(start)
            date.setDate(date.getDate() + index)
            this.releaseDateList.push(date.toISOString().slice(0, 10).replace('T', ''))
          }
        }
        
        console.log('Actual Date', this.releaseDateList[this.releaseDateList.length-1])
        console.log('Max Date', new Date(response[0].date).toISOString().slice(0, 10).replace('T', ''))
        console.log('test', moment(new Date(this.releaseDateList[this.releaseDateList.length-1])).isAfter(new Date(response[0].date)) || this.releaseDateList[this.releaseDateList.length-1] == new Date(response[0].date).toISOString().slice(0, 10).replace('T', ''))

        if(moment(new Date(this.releaseDateList[this.releaseDateList.length-1])).isAfter(new Date(response[0].date)) || this.releaseDateList[this.releaseDateList.length-1] == new Date(response[0].date).toISOString().slice(0, 10).replace('T', '')) {
          this.enough = true
        }

      },
    },
  }
</script>