<template>
  <div id="body-artist-file" class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <section id="tilte-artist" class="relative">
      <h1 class="text-white text-4xl mt-5 mb-2">{{artist.name}}</h1>
      <div id="divider" class="border-b border-gray-500"></div>
      <div id="button" class="my-5 2xl:my-0 2xl:absolute right-5 top-2 flex space-x-2">
        <button @click="liked ? unfollowArtist() : followArtist()" :class="liked ? 'bg-red-500 text-white border-red-500 hover:border-white hover:bg-transparent':'text-red-500 border-red-500'" class="flex space-x-0.5 px-2 border focus:outline-none rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
          <svg v-if="!liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ef4444"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>
          <svg v-if="liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667z"></path></g></g></svg>
          <!--<span class="mt-1">{{liked ? 'Unlike':'Like'}}</span>-->
        </button>
        <NuxtLink :to="`/edit/artist/${$route.params.id}`" class="py-1 text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
      </div>
    </section>

    <section class="py-5 space-y-5">
      
      <section id="artist-info" class="grid grid-cols-1 gap-5 2xl:grid-cols-3" :class="artist.type == 'GROUP' ? 'xl:grid-cols-2' : 'md:grid-cols-2' ">
        <div id="image" class="h-full w-full flex justify-center" :class="artist.type == 'GROUP' ? '' : '' ">
          <img id="artist-picture" class="my-auto" :class="artist.type == 'GROUP' ? '' : '' " :src="artist.image ? artist.image : defaultImage" alt="Artist Picture"/>
        </div>
        <div id="info" class="space-y-5 2xl:col-span-2">
          <div class="space-y-5">
            <div id="social-media" v-if="artist.styles">
              <h1 class="text-white text-xl">Styles</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full xl:w-96"></div>
              <div class="space-x-1"><span v-for="(style, index) in artist.styles" :key="index" class="bg-gray-500 text-white p-1 px-2 rounded">{{style.name}}</span></div>
            </div>
          </div>
          <div id="social-media" v-if="artist.socials">
            <h1 class="text-white text-xl">Social Media</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
            <div id="link-social" class="grid grid-cols-2 ms:grid-cols-3 gap-2 xl:flex xl:flex-row xl:space-x-5">
              <LinkImg v-for="(media, index) in artist.socials" :key="index" :url="media" :name="media"/>
            </div>
          </div>
          <div id="streaming-section" v-if="artist.platforms">
            <h1 class="text-white text-xl">Streaming Platforms</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
            <div id="link-streaming" class="grid grid-cols-2 ms:grid-cols-3 xl:grid-cols-none gap-2 xl:flex xl:flex-row xl:space-x-5">
              <LinkImg v-for="(stream, index) in artist.platforms" :key="index" :url="stream" :name="stream"/>
            </div>
          </div>
        </div>
      </section>
      <div id="description" v-if="artist.description" class="text-white">
        <h1 class="text-xl">Description</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-full xl:w-96"></div>
        <v-read-more-box bg-color="#1F1D1D">
          <button slot="readMore" class="focus:outline-none font-semibold">SHOW MORE</button>
          <button slot="readLess" class="focus:outline-none font-semibold">SHOW LESS</button>
          <p class="text-base whitespace-pre-line"> {{artist.description}} </p>
        </v-read-more-box>
      </div>

      <div id="member" v-if="memberslist.length > 0">
        <h1 class="text-white text-xl">Members ({{memberslist.length}})</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5" id="link-social">
          <NuxtLink :to="`/artist/${members.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(members, index) in memberslist" :key="index">
            <div class="mb-0.5">
              <img class="rounded-full h-10 2xl:h-20 w-10 2xl:w-20 object-cover mx-auto" :src="members.image" alt="">
            </div>
            <span class="w-full h-full text-center xl:text-xl"> {{members.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="group-member" v-if="artist.groups.length > 0">
        <h1 class="text-white text-xl">Part of the groups</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5">
          <NuxtLink :to="`/artist/${group.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(group, index) in artist.groups" :key="index">
            <div class="mb-0.5">
              <img class="rounded 2xl:w-36 object-cover mx-auto" :src="group.image" alt="">
            </div>
            <span class="text-center text-xs hover:underline"> {{group.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="subunit" v-if="subunitlist.length > 0">
        <h1 class="text-white text-xl">Subunit ({{subunitlist.length}})</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5">
          <NuxtLink :to="`/artist/${member.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(member, index) in subunitlist" :key="index">
            <div class="mb-0.5">
              <img class="rounded h-20 object-cover mx-auto" :src="member.image" alt="">
            </div>
            <span class="w-full h-full text-center xl:text-xl"> {{member.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="release-section" v-if="artist.releases.length > 0">
        <h1 class="text-white text-xl">Lastest Releases</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-full lg:w-96"></div>
        <div id="release-list" class="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          <ArtistReleaseCard v-for="(release, index) in artist.releases" :key="index" :release="release" :imageDefault="artist.image"/>
        </div>
      </div>      
    </section>
  </div>
</template>

<script>
  export default {
    name:"Artist",

    data() {
      return {
        videoId: null,
        liked:false,
        seeDescription:false,
        artist: [],
        memberslist: [],
        subunitlist: [],
      }
    },

    head() {
      return {
        title: this.artist.name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.artist.description
          }
        ]
      }
    },

    async asyncData({ $axios, params }){
      let artist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
      artist.releases?.sort(function(a,b){
          if(a.date?.toLowerCase() > b.date?.toLowerCase()) {return -1}
          if(a.date?.toLowerCase() < b.date?.toLowerCase()) {return 1}
          return 0;
      })
      let memberslist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}/members?sortby=name`)
      return {artist,memberslist}
    },

    async mounted(){
      this.artist.members.forEach(element => {
        if(element.type === "GROUP") {
          this.subunitlist.push(element)
        }
      });
      let that = this
      await this.$axios.get(`https://comeback-api.herokuapp.com/users/${this.userData.id}`).then(res => {
        res.data.artists.forEach(element => {
            if (element.id == that.artist.id) that.liked = true
        });
      })
    },
    
    computed: {
        userData(){
          let utmp = this.$store.state.dataUser
          return utmp
        },
        
        defaultImage(){
            return this.$store.state.imageArtistDefault
        },
    },

    methods:{
      getYoutubeId(url){
        let id = url.split("v=")[1]
        if(!id) {
          id = url.split(".be/")[1]
        }
        return id
      },

      async followArtist() {
        await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userData.id}`, {
          artists: [this.artist],
        }).then(response => {
          this.$toast.info('You have been following ' + this.artist.name, {duration:2000, position:'bottom-left'})
          this.liked = true
        }).catch(function (error) {
          console.log(error);
        });
      },

      async unfollowArtist() {
        await this.$axios.delete(`https://comeback-api.herokuapp.com/users/${this.userData.id}/artists/${this.artist.id}`, this.artist).then(response => {
          this.liked = false
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
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