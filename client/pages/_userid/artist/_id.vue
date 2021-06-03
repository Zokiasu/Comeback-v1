<template>
  <div id="body-artist-file" class="px-5 md:px-14 mb-10 space-y-5">
    <div id="tilte-artist" class="relative">
      <h1 class="text-white text-4xl mt-5 mb-2">{{this.artist.name}}</h1>
      <div id="divider" class="border-b border-gray-500"></div>
      <div id="button" class="my-5 md:my-0 md:absolute right-5 top-2">
          <button @click="editRelease" class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Follow</button>
          <NuxtLink :to="`/${userId}/edit/artist/${this.$route.params.id}`" class="text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 py-0.5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
      </div>
    </div>
    <section class="space-y-8">
      <section id="artist-info" class="grid grid-cols-1 lg:grid-cols-4 lg:gap-10 space-y-5 lg:space-y-0">
        <div class="h-full flex justify-center" :class="this.artist.type == 'GROUP' ? 'lg:col-span-2' : 'lg:col-span-1' ">
          <img id="artist-picture" class="object-cover" :class="this.artist.type == 'GROUP' ? ' max-w-xl' : 'lg:h-96 lg:w-72' " :src="this.artist.image ? this.artist.image : defaultImage" alt="Artist Picture"/>
        </div>
        <div class="space-y-5 lg:col-span-2">
          <div id="description" v-if="this.artist.description" :class="[ this.artist.description ? 'col-start-2 col-end-4' : '' ]">
            <h1 class="text-white text-xl">Description</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="text-white">
              <span class="mt-2 text-base"> {{this.artist.description}} </span>
            </div>
          </div>
          <div id="social-media" v-if="this.artist.styles">
            <h1 class="text-white text-xl">Styles</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="space-x-1"><span v-for="(style, index) in this.artist.styles" :key="index" class="bg-gray-500 text-white p-1 px-2 rounded">{{style}}</span></div>
          </div>
          <div id="social-media" v-if="this.artist.socials">
            <h1 class="text-white text-xl">Social Media</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div id="link-social" class="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">
              <LinkImg v-for="(media, index) in this.artist.socials" :key="index" :url="media" :name="media"/>
            </div>
          </div>
        </div>
      </section>
      <div id="streaming-section" v-if="this.artist.platforms">
        <h1 class="text-white text-xl">Streaming Platforms</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div id="link-streaming" class="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">
          <LinkImg v-for="(stream, index) in this.artist.platforms" :key="index" :url="stream" :name="stream"/>
        </div>
      </div>
      <div id="group-member" v-if="this.memberslist.length > 0">
        <h1 class="text-white text-xl">Members ({{this.memberslist.length}})</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5" id="link-social">
          <NuxtLink :to="`/${userId}/artist/${members.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(members, index) in this.memberslist" :key="index">
            <div class="mb-0.5">
              <img class="rounded-full h-10 md:h-20 w-10 md:w-20 object-cover mx-auto" :src="members.image" alt="">
            </div>
            <span class="w-full h-full text-center xl:text-xl"> {{members.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="subunit" v-if="this.subunitlist.length > 0">
        <h1 class="text-white text-xl">Subunit ({{this.subunitlist.length}})</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5">
          <NuxtLink :to="`/${userId}/artist/${member.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(member, index) in this.subunitlist" :key="index">
            <div class="mb-0.5">
              <img class="rounded md:w-36 object-cover mx-auto" :src="member.image" alt="">
            </div>
            <span class="w-full h-full text-center xl:text-xl"> {{member.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="group-member" v-if="this.artist.groups.length > 0">
        <h1 class="text-white text-xl">Part of the groups</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5">
          <NuxtLink :to="`/${userId}/artist/${group.id}`" class="rounded hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(group, index) in this.artist.groups" :key="index">
            <div class="mb-0.5">
              <img class="rounded md:w-36 object-cover mx-auto" :src="group.image" alt="">
            </div>
            <span class="text-center text-xs hover:underline"> {{group.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="player-section" v-if="this.videoId">
        <h1 class="text-white text-xl">Last Music Video</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="video" class="flex justify-center">
          <iframe width="560" height="315" :src="this.videoId" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div id="release-section" v-if="this.artist.releases.length > 0">
        <h1 class="text-white text-xl">Lastest Releases</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="release-list" class="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          <ArtistReleaseCard v-for="(release, index) in this.artist.releases" :key="index" :release="release" :imageDefault="artist.image"/>
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
      let memberslist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}/members`)
      return {artist,memberslist}
    },

    mounted(){
      this.artist.members.forEach(element => {
        if(element.type === "GROUP") {
          this.subunitlist.push(element)
        }
      });
    },
    
    computed: {
        userId(){
          return this.$route.params.userid
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

      async editRelease() {
        await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.$route.params.userid}`, {
          artists: [this.artist],
        }).then(response => {
          console.log(response)
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