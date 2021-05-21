<template>
  <div>
    <div class="m-10 flex w-full justify-center">
      <button class="bg-gray-400 pr-1 pl-2 rounded-none rounded-l py-1.5">
        <div class="">
        <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
        </div>
      </button>
      <input type="text" placeholder="Search" v-model="search" class="w-1/2 pl-2 focus:outline-none rounded-r rounded-none bg-gray-400 text-white placeholder-white">
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 px-10 gap-y-10 w-full justify-center my-10">
      <ArtistCard 
        v-for="(artist, index) in this.artists"
        :key="index"
        :id="artist.id"
        :name="artist.name"
        :image="artist.image"/>
    </div>
  </div>
</template>

<script>
  export default {
    name:"ArtistList",

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

    methods:{
      
    },
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
