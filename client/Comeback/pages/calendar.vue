<template>
  <div>
    <button class="fixed top-5 right-5 z-10 bg-gray-500 px-5 py-2 text-white flex space-x-5"><span>My Releases</span><img class="w-4 h-4 mt-1" src="../assets/image/arrow-down.png"/></button>
    <CalendarDay class=""
      v-for="(date, index) in this.releaseDateList"
      :key="index"
      :date="date"
      :width="width"/>
  </div>
</template>

<script>
  import CalendarDay from '../components/CalendarDay.vue';

  export default {
    components: { 
      CalendarDay,
    },

    data(){
        return {
            width: true,
            releaseDateList:['May 8, 12:30:00 GMT+07:00', 'May 18, 12:30:00 GMT+07:00', 'May 28, 12:30:00 GMT+07:00', 'June 8, 12:30:00 GMT+07:00', 'June 12, 12:30:00 GMT+07:00', 'June 30, 12:30:00 GMT+07:00', 'July 8, 12:30:00 GMT+07:00'],
        }
    },

    /*created(){
      const options = { day:'numeric', month: 'long' };
      const options2 = { year:'numeric' };
      console.log((new Date('August 19, 2021, 12:30:00 GMT+02:00')).toLocaleDateString('en-US', options))
      console.log((new Date('August 19, 2021, 12:30:00 GMT+02:00')).toLocaleDateString('en-US', options2))
      console.log((new Date('August 19, 2021, 12:30:00 GMT+02:00')).toTimeString())

    },*/

    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        console.log(this.$store.state.artistList[0].name)
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
