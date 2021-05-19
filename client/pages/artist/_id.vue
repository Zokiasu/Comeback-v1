<template>
  <div>
    <div id="body-artist-file" class="px-5 md:px-10 mb-10 space-y-5">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-4xl mt-5 mb-2">{{this.artist.name}}</h1>
        <div id="divider" class="border-b border-gray-500 mr-40"></div>
        <div id="button" class="my-5 md:my-0 md:absolute right-5 top-2">
            <button class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Follow</button>
            <NuxtLink :to="`/edit/artist/${this.$route.params.id}`" class="text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 py-0.5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
        </div>
      </div>
      <div id="artist-info" class="xl:grid xl:grid-cols-6 xl:gap-5 space-y-5 xl:space-y-0">
        <img id="artist-picture" class="mx-15" :src="this.artist.image ? this.artist.image : this.$store.state.imageArtistDefault" alt="Artist Picture"/>
        <div id="description" v-if="this.artist.description" :class="[ this.artist.description ? 'col-start-2 col-end-4' : '' ]">
          <h1 class="text-white text-xl">Description</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div class="text-white">
            <span class="mt-2 text-base"> {{this.artist.description}} </span>
          </div>
        </div>
        <div class="space-y-5" :class="[ this.artist.description ? 'col-start-4 col-end-6 xl:px-5' : '' ]">
          <div id="social-media" v-if="this.artist.socials">
            <h1 class="text-white text-xl">Social Media</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div id="link-social" class="grid grid-cols-2 gap-3">
              <LinkImg v-for="(media, index) in this.artist.socials" :key="index" :url="media" :name="media"/>
            </div>
          </div>
          <div id="group-member" v-if="this.artist.groups.length > 0">
            <h1 class="text-white text-xl">Part of the groups</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="text-white grid grid-cols-2 lg:grid-cols-4" id="link-social">
              <NuxtLink :to="`/artist/${group.id}`" class="rounded bg-gray-500 hover:bg-red-900 pt-3 px-3 bg-opacity-20 flex flex-col" v-for="(group, index) in this.artist.groups" :key="index">
                <img class="w-36 mx-auto my-auto rounded mb-1" :src="group.image" alt="">
                <span class="w-full h-full text-center text-xl"> {{group.name}} </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div id="streaming-section" v-if="this.artist.platforms">
        <h1 class="text-white text-xl">Streaming Platforms</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div id="link-streaming" class="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">
          <LinkImg v-for="(stream, index) in this.artist.platforms" :key="index" :url="stream" :name="stream"/>
        </div>
      </div>
      <div id="group-member" v-if="this.artist.members.length > 0">
        <h1 class="text-white text-xl">Members</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5" id="link-social">
          <NuxtLink :to="`/artist/${member.id}`" class="rounded bg-gray-500 hover:bg-red-900 p-3 bg-opacity-20 flex flex-col" v-for="(member, index) in this.artist.members" :key="index">
            <div>
              <img class="rounded-full h-10 md:h-14 w-10 md:w-14 object-cover mx-auto" :src="member.image" alt="">
            </div>
            <span class="w-full h-full text-center xl:text-xl"> {{member.name}} </span>
          </NuxtLink>
        </div>
      </div>
      <div id="player-section" v-if="this.videoId">
        <h1 class="text-white text-xl">Last Music Video</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="video" class="flex justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/q2WvTaqe9zU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div id="release-section" v-if="this.artist.releases.length > 0">
        <h1 class="text-white text-xl">Lastest Releases</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="release-list" class="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          <ArtistReleaseCard v-for="(release, index) in this.artist.releases" :key="index" :release="release" :imageDefault="artist.image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:"Artist",

    data() {
      return {
        videoId: null,
        artist: null,
      }
    },

    async asyncData({ $axios, params }){
      const artist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
      console.log(artist.releases)
      return {artist}
    },

    methods:{
      getYoutubeId(url){
        let id = url.split("v=")[1]
        if(!id) {
          id = url.split(".be/")[1]
        }
        return id
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