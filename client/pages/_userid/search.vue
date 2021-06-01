<template>
  <div>
    <section id="searchbar-section" class="px-10 pt-10">
      <div class="flex bg-select-leftbar text-white rounded">
          <button class="pr-1 pl-2 rounded-none rounded-l py-1.5">
              <div class="">
                  <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
              </div>
          </button>
          <input v-model="search" @change="updateSearch()" type="text" placeholder="Search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-transparent">
      </div>
    </section>
    <section id="artist-bestResult-section" v-if="bestArtistsList.length > 0" class="p-10 space-y-7">
      <div id="title">
        <span class="text-white text-4xl">
          Artists <span class="text-base">- Best Result</span>
        </span>
        <button v-if="maxArtist != bestArtistsList.length && bestArtistsList.length > 9" @click="maxArtist=bestArtistsList.length" class="text-gray-400 text-sm focus:outline-none">View More</button>
        <button v-if="maxArtist == bestArtistsList.length && bestArtistsList.length > 9" @click="maxArtist=9" class="text-gray-400 text-sm focus:outline-none">View Less</button>
      </div>
      <div id="content">
        <div>
          <transition-group name="object" class="grid grid-cols-4 ld:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-5">
            <ArtistCard 
              v-for="(artist) in bestArtistsList.slice(0, maxArtist)"
              :key="artist.id"
              :id="artist.id"
              :name="artist.name"
              :image="artist.image"/>
          </transition-group>
        </div>
      </div>
    </section>
    <section id="release-bestResult-section" v-if="filteredReleasesList && filteredReleasesList.length > 0" class="p-10 space-y-7">
      <div id="title">
        <span class="text-white text-4xl">
          Release <span class="text-base">- Best Result</span>
        </span>
        <button v-if="maxRelease != filteredReleasesList.length && filteredReleasesList.length > 9" @click="maxRelease=filteredReleasesList.length" class="text-gray-400 text-sm focus:outline-none">View More</button>
        <button v-if="maxRelease == filteredReleasesList.length && filteredReleasesList.length > 9" @click="maxRelease=9" class="text-gray-400 text-sm focus:outline-none">View Less</button>
      </div>
      <div id="content">
        <div>
          <transition-group name="object" class="grid grid-cols-4 ld:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-5">
            <ReleaseCard
              v-for="(release, index) in filteredReleasesList.slice(0, maxRelease)"
              :width="true"
              :release="release"
              :key="index"/>
          </transition-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {

    head() {
      return {
        title: 'Comeback - Search',
      }
    },

    data(){
      return {
        bestArtistsList:[],
        bestReleaseList:[],
        moreArtistList:[],
        moreReleaseList:[],
        maxArtist: 9,
        maxRelease: 9,
        search: '',
      }
    },

    async asyncData({ $axios }){
      let bestReleaseList = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=id:asc`)
      return {bestReleaseList}
    },

    methods:{
      updateSearch(){
          let that = this
          this.$fire.auth.onAuthStateChanged(async function (user) {
              if (user != null) {
                  await that.$router.push(`/${user.uid}/search?search=${that.search}`)
              }
          })
      },
      
      async getDataFromApi(){
        const {data: response}  = await this.$axios.get(`https://comeback-api.herokuapp.com/artists?name=${this.$route.query.search}&op=like&sortby=id`)
        this.bestArtistsList = response
      },

      checkReleaseArtist(release){
        let count = 0
        release.artists.forEach(element => {
          console.log(element.name)
          if(element.name.toLowerCase().includes((this.$route.query.search).toLowerCase())) {
            console.log("true")
            return true
          } else {
            count++
          }
        });

        if(count == release.artists.length){
          return false
        }
      },
      
    },
        
    computed: {
      filteredReleasesList() {
        if(this.$route.query.search){
          return this.bestReleaseList.filter(release => {
            for (let index = 0; index < release.artists.length; index++) {
              //if(release.artists[index].name.toLowerCase().includes((this.$route.query.search).toLowerCase())) return true
              if(release.artists[index].name.toLowerCase() == (this.$route.query.search).toLowerCase()) return true
            }
          })
        }
      }
    },

    watch:{
      '$route.query.search'() {
        this.getDataFromApi()
      }
    },

    mounted(){
      this.getDataFromApi()
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
