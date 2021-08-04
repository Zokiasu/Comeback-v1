<template>
  <div class="px-10 py-5 pb-16 overflow-hidden space-y-10">
    <client-only>
      <section id="newAnnounce" class="section">
        <div class="flex space-x-5">
          <h2 class="text-2xl lg:text-4xl text-white py-5 flex">Last News Added<NuxtLink :to="`/news`" class="ml-2 mt-auto text-sm focus:outline-none">View More</NuxtLink></h2>
        </div>
        <transition-group name="object" class="grid grid-cols-1 gap-1 w-full justify-start overflow-x-scroll inner">
          <NewsCard class="news" v-for="(element) in newsList" :key="element.id" :element="element"/>
        </transition-group>
      </section>
      <section id="newArtist" class="section">
        <div>
          <h2 class="text-2xl lg:text-4xl text-white py-5 flex">Last Artist Added<NuxtLink :to="`/artist`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
        </div>
        <transition-group name="object" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 1.5xl:grid-cols-10 gap-5 w-full justify-start overflow-x-scroll inner">
          <ArtistCard class="artist" v-for="(artist) in newArtist" :key="artist.id" :artist="artist"/>
        </transition-group>
      </section>
      <section id="newRelease" class="section">
        <div>
          <h2 class="text-2xl lg:text-4xl text-white py-5 flex">Last Release Added<NuxtLink :to="`/release`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
        </div>
        <transition-group name="object" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 1.5xl:grid-cols-10 gap-5 w-full justify-start overflow-x-scroll inner">
          <ReleaseCard class="release" v-for="(release) in newRelease" :key="release.id" :release="release"/>
        </transition-group>
      </section>
      <!--<section id="artistRecommendation"></section>
      <section id="releaseRecommendation"></section>-->
    </client-only>
  </div>
</template>

<script>
  import 'animate.css'
  import ScrollReveal from 'scrollreveal'

  export default {
    data(){
      return {
        newArtist:[],
        newRelease:[],
        newsList:[],
      }
    },
    
    async asyncData({ $axios }){
      let newArtist = await $axios.$get(`https://comeback-api.herokuapp.com/artists?sortby=createdAt:desc&limit=10`)
      let newRelease = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=createdAt:desc&limit=10`)
      const newsList = await $axios.$get('https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5')
      return {newArtist,newRelease,newsList}
    },

    mounted(){
      ScrollReveal().reveal('.news', {interval: 150, distance: '200%', origin: 'right', opacity: null})
      ScrollReveal().reveal('.artist', {interval: 150, distance: '1000%', origin: 'bottom', opacity: null})
      ScrollReveal().reveal('.release', {interval: 150, distance: '1000%', origin: 'bottom', opacity: null})
    },
  }
</script>

<style lang="scss" scoped>
.inner::-webkit-scrollbar {
  display: none;
}

@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
body{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #F0AD4E;
}
label{
  position: relative;
  display: inline-block;
  background-color: #fff;
  padding: 5px 12px;
  transition: all 1s ease;
  border-radius: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  &::after{
    content: '';
    display: block;
    height: 2px;
    width: 80%;
    background-color: #F0AD4E;
    transition: all 1s ease 0.5s;
  }
  input{
    transition: width 1s ease, opacity 0.5s ease 0.5s;
    opacity: 1;
    width: 180px;
    height: 25px;
    border: 0;
    outline: none;
    color: darken(#F0AD4E, 25)
  }
  i{
    position: absolute;
    top: 11px;
    right: 11px;
    color: #333;
    cursor: pointer;
  }
  &[data-state=false]{
    border-radius: 30px;
    padding: 5px 5px;
     transition: all 1s ease;
    &::after{
      width: 0%;
      transition: all 0.3s ease;
    }
    i{
      pointer-events: none;
    }
    input{
      width: 28px;
      height: 25px;
      opacity:0;
      cursor: pointer;
      transition: opacity 0.5s ease, width 1s ease;
      -webkit-appearance:none
    } 
  }
}
</style>
