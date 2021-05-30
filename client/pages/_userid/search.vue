<template>
  <div>
    <section id="artist-section" class="p-10 space-y-7">
      <div id="title">
        <span class="text-white text-4xl">
          Artists
        </span>
        <button v-if="maxArtist != artistList.length" @click="maxArtist=artistList.length" class="text-gray-400 text-sm focus:outline-none">View More</button>
        <button v-if="maxArtist == artistList.length" @click="maxArtist=9" class="text-gray-400 text-sm focus:outline-none">View Less</button>
      </div>
      <div id="content">
        <div>
          <transition-group name="object" class="grid grid-cols-9 gap-5">
            <ArtistCard 
              v-for="(artist) in artistList.slice(0, maxArtist)"
              :key="artist.id"
              :id="artist.id"
              :name="artist.name"
              :image="artist.image"/>
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
        artistList:[],
        maxArtist: 9,
        maxRelease: 9,
      }
    },

    methods:{
      async getDataFromApi(){
        const {data: response}  = await this.$axios.get(`https://comeback-api.herokuapp.com/artists?name=${this.$route.query.search}&op=like&sortby=id`)
        this.artistList = response
      },
      
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
