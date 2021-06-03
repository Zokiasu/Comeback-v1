<template>
  <div id="test2" class="mt-5">
    <!--<select v-model="releaseDisplay" class="fixed top-5 right-5 z-10 bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5 focus:outline-none">
      <option class="bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5">My Comebacks</option>
      <option class="bg-gray-500 px-5 py-2 text-white text-xs md:text-base flex space-x-5">All Comebacks</option>
    </select>-->
    <CalendarDay
      v-for="(date, index) in this.releaseDateList"
      :key="index"
      :date="date"
      :width="width"/>
  </div>
</template>

<script>

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
          maxDate: 20,
        }
    },

    created(){
      this.updateDateList()
    },

    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      window.addEventListener('scroll', this.scroll);
      this.scroll()
    },

    methods: {
      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
        } else {
          this.width = false
        }
      },

      scroll(){
        console.log(window.scrollY)
        console.log(document.getElementById("test2").scrollY)
      },

      updateDateList(){
        for (let index = (this.maxDate-20); index < this.maxDate; index++) {
          var date = new Date()
          date.setDate(date.getDate() + index)
          this.releaseDateList.push(date.toISOString().slice(0, 10).replace('T', ''))
        }
      },
    }
  }
</script>