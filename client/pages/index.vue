<template>
  <div class="px-10 py-5 pb-16 overflow-hidden space-y-10">
    <section id="newAnnounce" class="section" v-if="newsList.length > 1">
      <div class="flex w-full justify-start space-x-5 smooth">
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Next Comeback</h2>
      </div>
      <div class="flex flex-wrap w-full justify-center inner">
        <NewsCard class="Card my-1.5 md:m-2" v-for="(element) in newsList" :key="element.id" :element="element"/>
      </div>
    </section>
    <section id="newRelease" class="section" v-if="newRelease.length > 1">
      <div>
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Last Release Added<NuxtLink :to="`/release`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
      </div>
      <div class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
        <ReleaseCard class="release md:mr-5 md:mb-5 justify-self-center" v-for="(release) in newRelease" :key="release.id" :release="release"/>
      </div>
    </section>
    <section id="newArtist" class="section" v-if="newArtist.length > 1">
      <div>
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Last Artist Added<NuxtLink :to="`/artist`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
      </div>
      <div class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
        <ArtistCard class="artist md:mr-5 lg:mr-3.5 md:mb-5" v-for="(artist) in newArtist" :key="artist.id" :artist="artist"/>
      </div>
    </section>
  </div>
</template>

<script>
  import ScrollReveal from 'scrollreveal'

  export default {

    head() {
        return {
            title: "Comeback - Track every next album, single, EP releases.",
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Find your favorite artists and track all their comeback in one place.',
                }
            ]
        }
    },

    data(){
      return {
        newArtist:[],
        newRelease:[],
        newsList:[],
      }
    },
    
    async asyncData({ $axios }){
      let newArtist = await $axios.$get(`https://comeback-api.herokuapp.com/artists?sortby=createdAt:desc&limit=9`)
      let newRelease = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=createdAt:desc&limit=9`)
      let newsList = []
      let dateToGet = new Date()
      dateToGet.setDate((dateToGet.getDate())-1)
      let tmpNews = await $axios.$get(`https://comeback-api.herokuapp.com/calendar/infos?date_sup=${dateToGet}`)
      Object.keys(tmpNews).map(function(key, index) {
        for(let [key2, value2] of Object.entries(tmpNews[key])) {
            value2.forEach(element => {
              newsList.push(element)
            });
        }
      })

      return {newArtist,newRelease,newsList}
    },

    mounted(){
      ScrollReveal().reveal('.section', {interval: 300, distance: '1000%', origin: 'bottom', opacity: null})
    },
  }
</script>

<style lang="scss" scoped>
.inner::-webkit-scrollbar {
  display: none;
}
</style>
