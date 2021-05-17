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
      <div id="artist-info" class="xl:grid xl:grid-cols-6 xl:gap-5">
        <img id="artist-picture" class="w-80 4xl:w-96 mx-15" :src="this.artist.image ? this.artist.image : this.$store.state.imageArtistDefault" alt="Artist Picture"/>
        <div id="description" v-if="this.artist.description" :class="[ this.artist.description ? 'col-start-2 col-end-4' : '' ]">
          <h1 class="text-white text-xl">Description</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div class="text-white">
            <span class="mt-2 text-base"> {{this.artist.description}} </span>
          </div>
        </div>
        <div id="social-media" v-if="this.artist.socials" :class="[ this.artist.description ? 'col-start-4 col-end-6 xl:px-5' : '' ]">
          <h1 class="text-white text-xl">Social Media</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div id="link-social" class="grid grid-cols-2 gap-3">
            <LinkImg v-for="(media, index) in this.artist.socials" :key="index" :url="media" :name="media"/>
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
      <div id="player-section" v-if="this.videoId">
        <h1 class="text-white text-xl">Last Music Video</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="video" class="flex justify-center">
          <PlayerYoutube :videoid="'HL1UzIK-flA'"/>
        </div>
      </div>
      <div id="release-section" v-if="this.artist.socials">
        <h1 class="text-white text-xl">Lastest Releases</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="release-list" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
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
        videoId: 'HL1UzIK-flA',
        artist: null,
      }
    },

    async asyncData({ $axios, params }){
      const artist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
      return {artist}
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