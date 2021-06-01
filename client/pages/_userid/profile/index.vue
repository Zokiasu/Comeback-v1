<template>
  <div>
      <div id="top" class="flex mb-10 relative text-white" >
        <img class="h-80 w-full object-cover absolute border-b border-gray-500" :src="user.avatar ? user.avatar : require(`~/assets/image/profile.png`)" alt="Profile Picture"/>

        <div id="profile-picture" class="z-10 flex flex-col justify-center mt-72 md:mt-44 ml-5">
            <img class="h-20 md:h-40 w-20 md:w-40 rounded-full object-cover border border-gray-500" :src="user.avatar ? user.avatar : require(`~/assets/image/profile.png`)" alt="Profile Picture"/>
            <span class="font-semibold md:text-2xl text-center">{{user.username}}</span>
        </div>
        <div id="general" class="z-10 flex flex-col px-3 justify-end md:pb-10">
            <nav>
                <ul class="flex space-x-5 list-none text-lg md:text-2xl">
                    <li>
                        <div @click="changetab('artist')" class="cursor-pointer" :class="actualtab == 'artist' ? 'border-red-700 border-b-2' : ''">
                            <span>Artist</span>
                        </div>
                    </li>
                    <li>
                        <div @click="changetab('music')" class="cursor-pointer" :class="actualtab == 'music' ? 'border-red-700 border-b-2' : ''">
                            <span>Music</span>
                        </div>
                    </li>
                    <!--<li>
                        <div @click="changetab('stat')" class="cursor-pointer" :class="actualtab == 'stat' ? 'border-red-700 border-b-2' : ''">
                            <span>Stat</span>
                        </div>
                    </li>-->
                </ul>
            </nav>
        </div>
      </div>
      <div id="middle" class="mx-5 xl:mx-20">
        <div id="artist-following" v-if="actualtab == 'artist'">
            <h1 class="text-white text-xl">Artist Followed</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="grid grid-cols-2 md:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-y-5 mt-10 my-5 w-full justify-center">
                <ArtistCard 
                    v-for="(artist, index) in user.artists"
                    :key="index"
                    :artist="artist"
                    :index="index"/>
            </div>
        </div>
        <div id="music-following" v-if="actualtab == 'music'">
            <h1 class="text-white text-xl">Releases Followed</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="grid grid-cols-2 md:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-10 gap-3 py-5 justify-center texts text-white">
                <ReleaseCard
                    v-for="(release, index) in this.releaseList"
                    :width="true"
                    :release="release"
                    :key="index"/>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {

    head() {
      return {
        title: 'Comeback - Profile',
      }
    },

    data(){
        return {
            img: 'https://foot44.fff.fr/wp-content/uploads/sites/35/2019/10/Silhouette-Homme.jpg',
            actualtab:'artist',
            artists: [],
            releaseList:[],
            width:false,
            user:{},
        }
    },

    async asyncData({ $axios, params }){
      let user = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.userid}`)
      return {user}
    },

    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    methods:{
        changetab(newtab){
            this.actualtab = newtab
        },
        
        handleResize() {
            if(window.innerWidth > 768) {
            this.width = true
            this.test = true
            } else {
            this.width = false
            this.test = false
            }
        },
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
