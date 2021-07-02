<template>
  <div class="p-10 overflow-hidden space-y-20">
    <section id="newArtist">
      <div>
        <h2 class="text-4xl text-white py-5">Last Artist Added</h2>
      </div>
      <transition-group name="object" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 1.5xl:grid-cols-10 gap-5 w-full justify-start overflow-x-scroll inner">
        <ArtistCard v-for="(artist) in newArtist" :key="artist.id" :artist="artist"/>
      </transition-group>
    </section>
    <section id="newRelease">
      <div>
        <h2 class="text-4xl text-white py-5">Last Release Added</h2>
      </div>
      <transition-group name="object" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 1.5xl:grid-cols-10 gap-5 w-full justify-start overflow-x-scroll inner">
        <ReleaseCard 
          v-for="(release) in newRelease"
          :key="release.id"
          :release="release"/>
      </transition-group>
    </section>
    <!--<section id="artistRecommendation"></section>
    <section id="releaseRecommendation"></section>-->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        newArtist:[],
        newRelease:[],
      }
    },
    
    async asyncData({ $axios }){
      let newArtist = await $axios.$get(`https://comeback-api.herokuapp.com/artists?sortby=createdAt:desc&limit=10`)
      let newRelease = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=createdAt:desc&limit=10`)
      return {newArtist,newRelease}
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
