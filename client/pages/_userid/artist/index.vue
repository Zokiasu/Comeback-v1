<template>
  <div>
    <section id="searchbar" class=" flex w-full justify-start p-5">
      <div id="search-icon" class="bg-select-leftbar pr-1 pl-2 rounded-none rounded-l py-1.5">
        <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
      </div>
      <input id="search-input" type="text" placeholder="Search" v-model="search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-select-leftbar text-white placeholder-white">
    </section>
    <section id="artist-list" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-y-10 w-full justify-center my-10">
      <ArtistCard 
        v-for="artist in filteredList"
        :key="artist.id"
        :id="artist.id"
        :name="artist.name"
        :image="artist.image"/>
    </section>
  </div>
</template>

<script>
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
        artists: null,
      }
    },

    async asyncData({ $axios }){
      const artists = await $axios.$get('https://comeback-api.herokuapp.com/artists?sortby=name:asc')
      return {artists}
    },
        
    computed: {
      filteredList() {
        return this.artists.filter(artist => {
          if(this.search != '' || this.search != ' ') {
            return (artist.name.toLowerCase().includes(this.search.toLowerCase()))
          }
          return true
        })
      },

      widthActual(){
        if(window.innerWidth > 768) {
          console.log('A ', window.innerWidth)
          return true
        } else {
          console.log('B ', window.innerWidth)
          return false
        }
      },
    },
  }
</script>
