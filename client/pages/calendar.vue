<template>
  <div>
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

    data(){
        return {
          releaseDisplay:'My Comebacks',
          maxDisplay:3,
          width:false,
          releaseDateList:[],
        }
    },

    created(){
      for (let index = -1; index < 30; index++) {
        var date = new Date
        date.setDate(date.getDate() + index)
        this.releaseDateList.push(date.toISOString().slice(0, 10).replace('T', ''))
      }

      console.log(process.env.FIREBASE_API_KEY)
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.Button {
  border: none;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.4);
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1em;
  transition-property: background-color, box-shadow, transform;
  transition-timing-property: ease-out;
  transition-duration: 0.3s;
}

.Button:hover,
.Button:focus{
  box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.4);
  transform: translateY(-2px);
}

.Button:active {
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.4);
  transform: translateY(0) scale(0.975);
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
