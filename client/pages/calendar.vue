<template>
  <div id="test" class="mt-5">
    <div v-if="width" class="w-full flex justify-end px-10">
      <div>
        <t-select v-model="userPreference" id="artists-type-selector" class="focus:outline-none text-xs"
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
      <transition-group name="object" class="flex flex-col space-y-2	py-5 justify-center texts text-white">
        <ReleaseCard
          v-for="release in date.releases"
          :width="width"
          :release="release"
          :key="release.id"/>
      </transition-group>
    </div>
    <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
  </div>
</template>

<script>
  import moment from 'moment-timezone'

  export default {
    loading: false,
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
          dateList: null,
          startDate: new Date(),
          endDate: new Date(),
          gapDate: 5,
        }
    },

    created(){
      this.startDate.setDate(this.startDate.getDate()-5)
      this.endDate.setDate((this.startDate.getDate()) + this.gapDate)
      //this.getCalendar();
    },

    mounted() {
      this.handleResize();
      window.scrollTo(0,document.getElementById("test").scrollHeight);
        
    },

    watch: {
      userPreference: {
        immediate: true,
        handler(userPreference) {
          if (process.client) {
            this.fetchData()
          }
        }
      }
    },
    
    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
    },

    methods: {
      async fetchData() {
          console.log("fetchData")
          if(this.userPreference == 'true'){
            console.log("true")
            this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
              console.log(response)
              if(response.data) {
                this.dateList = response.data
                console.log(this.dateList)
                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
              }
            })
            .catch(err => {
              console.log(err);
            });
          } else {
            console.log("false")
            this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
              console.log(response)
              //if (JSON.stringify(this.dateList) == JSON.stringify(response.data)) console.log("Hello")
              if(response.data) {
                this.dateList = response.data
                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
              }
            })
            .catch(err => {
              console.log(err);
            });
          }
      },
      infiniteScroll($state) {
        setTimeout(() => {
          if(this.userPreference == 'true'){
            this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
              if(response.data) {
                this.dateList = response.data
                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                $state.loaded();
              } else {
                $state.complete();
              }
            })
            .catch(err => {
              console.log(err);
            });
          } else {
            this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
              //if (JSON.stringify(this.dateList) == JSON.stringify(response.data)) console.log("Hello")
              if(response.data) {
                this.dateList = response.data
                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                $state.loaded();
              } else {
                $state.complete();
              }
            })
            .catch(err => {
              console.log(err);
            });
          }
        }, 500);
      },

      async getCalendar(){
        console.log("getCalendar")
        this.dateList = {}
        /*if(this.userPreference == 'true'){
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`)
          this.dateList = response
        } else {
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`)
          this.dateList = response
        }*/
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

<style scoped>
  .object-enter-active,
  .object-leave-active {
    transition-duration: 0.4s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .object-enter {
    opacity: 0;
    transform: translate(0, -2em);
  }

  .object-leave-active {
    opacity: 0;
    transform: translate(0, -2em);
  }
</style>