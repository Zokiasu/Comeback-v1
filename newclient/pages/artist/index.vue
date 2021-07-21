<template>
  <div>
    <section id="searchbar" class=" flex w-full justify-start p-5">
      <div id="search-icon" class="bg-select-leftbar pr-1 pl-2 rounded-none rounded-l py-1.5">
        <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
      </div>
      <input @change="updateDateList(true)" id="search-input" type="text" placeholder="Search" v-model="search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-select-leftbar text-white placeholder-white">
    </section>
    <section v-if="filteredList.length > 0" id="artist-list" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 1.5xl:grid-cols-10 gap-5 w-full justify-center my-10">
      <ArtistCard 
        class="animate__animated animate__fadeIn"
        v-for="artist in filteredList"
        :key="artist.id"
        :artist="artist"/>
    </section>
    <!--<InfiniteScroll class="text-white w-full flex justify-center" :enough="enough" @load-more="updateDateList(false)"/>-->
    <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    <!--<div v-if="!enough" class="p-5">
      <button @click="updateDateList(false)" class="w-full text-white font-semibold bg-gray-500 bg-opacity-50 focus:outline-none">More</button>
    </div>-->
    <div v-if="filteredList.length < 1" class="px-5">
      <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No artists found.</span>
    </div>
  </div>
</template>

<script>
  import 'animate.css'
  export default {
    name:"ArtistPage",

    head() {
      return {
        title: 'Comeback - Artists',
      }
    },

    data(){
      return {
        width: true,
        search: '',
        artists: [],
        maxArtist: 0,
        enough: false,
      }
    },
        
    computed: {
      filteredList() {
        return this.artists
      },

      widthActual(){
        if(window.innerWidth > 768) {
          return true
        } else {
          return false
        }
      },
    },

    methods:{
      async fetchData() {
        let artTmp = []
        const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/artists/fulllimited?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxArtist}`);
        artTmp = artTmp.concat(response)
        this.artists = [...new Set(artTmp)]
      },
      infiniteScroll($state) {
        let artTmp = []
        setTimeout(() => {
          artTmp = artTmp.concat(this.artists)
          this.$axios.get(`https://comeback-api.herokuapp.com/artists/fulllimited?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxArtist}`).then(response => {
            if(response.data.length > 0) {
              artTmp = artTmp.concat(response.data)
              this.artists = [...new Set(artTmp)]
              this.maxArtist = this.maxArtist + 20
              $state.loaded();
            } else {
              this.enough = true
              $state.complete();
            }
          })
          .catch(err => {
            console.log(err);
          });
        }, 500);
      },

      async updateDateList(reset) {
        let artTmp = []
        if(reset) {
          this.maxArtist = 0
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/artists/fulllimited?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxArtist}`)
          if(response.length > 0) {
            artTmp = artTmp.concat(response)
            this.artists = [...new Set(artTmp)] //Remove all double entry
            if(response.length < 20) {
              this.enough = true
            } else {
              this.maxArtist = this.maxArtist + 20
            }
          } else {
            this.enough = true
          }
        }
      },
    },
  }
</script>
