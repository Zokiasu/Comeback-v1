<template>
  <div class="px-10 py-5 pb-16 overflow-hidden space-y-10">
    <section id="newAnnounce" class="section">
      <div class="flex w-full justify-start space-x-5">
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Coming Soon</h2>
      </div>
      <transition-group name="object" class="flex flex-wrap w-full justify-center inner">
        <NewsCard class="Card news my-1.5 md:m-2" v-for="(element) in newsList" :key="element.id" :element="element"/>
      </transition-group>
    </section>
    <section id="newRelease" class="section">
      <div>
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Last Release Added<NuxtLink :to="`/release`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
      </div>
      <transition-group name="object" class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
        <ReleaseCard class="release md:mr-5 md:mb-5 justify-self-center" v-for="(release) in newRelease" :key="release.id" :release="release"/>
      </transition-group>
    </section>
    <section id="newArtist" class="section">
      <div>
        <h2 class="text-xl sm:text-2xl lg:text-4xl text-white py-5 flex">Last Artist Added<NuxtLink :to="`/artist`" class="ml-2 mt-auto text-sm  focus:outline-none">View More</NuxtLink></h2>
      </div>
      <transition-group name="object" class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
        <ArtistCard class="artist md:mr-5 lg:mr-3.5 md:mb-5" v-for="(artist) in newArtist" :key="artist.id" :artist="artist"/>
      </transition-group>
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
      ScrollReveal().reveal('.news', {interval: 200, distance: '1000%', origin: 'right', opacity: null})
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

.Card {
    cursor: pointer;
    font-size: 1em;
    transition-property: background-color, box-shadow, transform;
    transition-timing-property: ease-out;
    transition-duration: 0.3s;
}

.Card:hover{
    box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.4);
    transform: translateY(-10px);
    transition-duration: 0.3s;
}

.Card:active {
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.4);
    transform: translateY(0) scale(0.975);
}
</style>
