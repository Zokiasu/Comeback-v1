<template>
  <div class="mt-5 md:mt-0">
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
          maxDisplay:3,
          width:false,
          releaseDateList:[],
        }
    },

    created(){
      for (let index = -1; index < 10; index++) {
        var date = new Date
        date.setDate(date.getDate() + index)
        this.releaseDateList.push(date.toISOString().slice(0, 10).replace('T', ''))
      }
    },

    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },

    methods: {
      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
        } else {
          this.width = false
        }
      },
    }
  }
</script>