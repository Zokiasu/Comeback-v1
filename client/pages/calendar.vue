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
    <div class="justify-center texts text-white mx-10 animate__fadeInDown space-y-5 mb-10">
      <div class="sticky top-0 bg-mainbg z-50 col-start-1 col-end-7 border-b-2 border-red-700 pb-2 animate__fadeInDown">
          <h1 class="font-semibold text-4xl">Last News</h1>
      </div>
      <NewsCard v-for="(element, index) in newsList" :key="index" :element="element" class="mb-10"/>
    </div>
    <div v-for="(date, index) in dateList" :key="index" class="justify-center texts text-white mx-10 animate__fadeInDown">
      <div class="sticky top-0 bg-mainbg z-50 col-start-1 col-end-7 border-b-2 border-red-700 pb-2 animate__fadeInDown">
          <h1 class="font-semibold text-4xl"> {{new Date(index).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric', year: 'numeric' })}} </h1>
      </div>
      <transition-group v-if="width" name="object" class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5 py-5 justify-center texts text-white animate__fadeInDown">
        <ReleaseCard
          v-for="release in date.releases"
          :release="release"
          :key="release.id"/>
      </transition-group>
      <transition-group v-else name="object" class="grid grid-cols-1 gap-5 py-5 justify-center texts text-white animate__fadeInDown">
        <ReleaseCardMini
          v-for="release in date.releases"
          :release="release"
          :key="release.id"/>
      </transition-group>
    </div>
    <InfiniteLoading v-if="stopInfiniteScroll" spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    <div v-if="Object.entries(dateList).length < 1" class="px-5 mt-5">
      <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Release Scheduled.</span>
    </div>
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
          stopInfiniteScroll: true,
          width:false,
          enough: false,
          dateList: {},
          startDate: new Date(),
          endDate: new Date(),
          lastReleaseDate: new Date(),
          gapDate: 30,
          newsList:[],
        }
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
      },
    },
    
    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
    },

    async asyncData({ $axios }){
        const newsList = await $axios.$get('https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5')
        return {newsList}
    },

    methods: {
      async fetchData() {
        this.startDate = new Date()
        this.endDate = new Date()
        this.startDate.setDate(this.startDate.getDate()-2)
        this.endDate.setDate((this.startDate.getDate()) + this.gapDate)
        if(this.userPreference == "true"){
          this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
            this.dateList = {}
            for(let [key, value] of Object.entries(response.data)) {
              this.dateList[key] = value
            }
            this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
            this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
            if(Object.entries(response.data).length !== 0) {
              this.dateList = {}
              for(let [key, value] of Object.entries(response.data)) {
                this.dateList[key] = value
              }
              this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
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
          let tmp = this.dateList != null ? this.dateList : {}
          if(this.userPreference == 'true'){
            this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
              if(Object.entries(response.data).length !== 0) {
                this.dateList = {}
                for(let [key, value] of Object.entries(response.data)) {
                  tmp[key] = value
                }
                this.dateList = tmp
                this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
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
              if(Object.entries(response.data).length !== 0) {
                this.dateList = {}
                for(let [key, value] of Object.entries(response.data)) {
                  tmp[key] = value
                }
                this.dateList = tmp
                this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
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

      handleResize() {
        if(window.innerWidth > 768) {
          this.width = true
          this.$nuxt.refresh()
        } else {
          this.width = false
          this.$nuxt.refresh()
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