<template>
  <div class="mt-5">
    <!--<select v-model="releaseDisplay" class="fixed top-5 right-5 z-10 bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5 focus:outline-none">
      <option class="bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5">My Comebacks</option>
      <option class="bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5">All Comebacks</option>
    </select>-->
    <CalendarDay
      v-for="(date, index) in this.releaseDateList"
      :key="index"
      :date="date"
      :userArtistFollow="userData.artists"
      :width="width"/>
    <InfiniteScroll class="text-white w-full flex justify-center" :enough="enough" @load-more="updateDateList()" />
    <div v-if="this.releaseDateList.length < 1" class="px-5">
      <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No comeback planned</span>
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
          releaseDisplay:'My Comebacks',
          width:false,
          releaseDateList:[],
          maxDate: 0,
          enough: false,
          startDate: new Date(),
        }
    },

    async mounted() {
      this.handleResize();
      this.updateDateList()
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

      async updateDateList(){
        const {data: response} = await this.$axios.get('https://comeback-api.herokuapp.com/releases?sortby=date:desc&limit=1')
        let mostFutureRelease = false
        if(response.length < 1 ) {
          this.enough = true
        } else if(this.releaseDateList.length > 0) {
          mostFutureRelease = moment(new Date(this.releaseDateList[this.releaseDateList.length-1])).isAfter(new Date(response[0].date))
          if(this.releaseDateList.length == 1) {
            this.enough = true
          }
        } else {
          mostFutureRelease = false
        }

        if(!mostFutureRelease && !this.enough) {
          this.maxDate = this.maxDate + 30
          for (let index = (this.maxDate-30); index < this.maxDate; index++) {
            var date = new Date(this.startDate)
            date.setDate(date.getDate() + index)
            this.releaseDateList.push(date.toISOString().slice(0, 10).replace('T', ''))
          }
        } else {
          this.enough = true
        }
      },
    },
  }
</script>