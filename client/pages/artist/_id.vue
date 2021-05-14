<template>
  <div>
    <div id="body-artist-file" class="px-5 md:px-10 mb-10 space-y-5">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-4xl mt-5 mb-2">{{this.$store.state.artistList[this.$route.params.id].name}}</h1>
        <div id="divider" class="border-b border-gray-500 mr-40"></div>
        <div id="button" class="my-5 md:my-0 md:absolute right-5 top-2">
            <button class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Follow</button>
            <NuxtLink :to="`/edit/artist/${this.$route.params.id}`" class="text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 py-0.5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
        </div>
      </div>
      <div id="artist-info" class="xl:grid xl:grid-cols-6 xl:gap-5">
        <img id="artist-picture" class="w-80 4xl:w-96 mx-15" :src="this.$store.state.artistList[this.$route.params.id].picture" alt="Artist Picture"/>
        <div id="description" v-if="description" :class="[ description ? 'col-start-2 col-end-4' : '' ]">
          <h1 class="text-white text-xl">Description</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div class="text-white">
            <span class="mt-2 text-base"> {{this.$store.state.loremipsum}} </span>
          </div>
        </div>
        <div id="social-media" :class="[ description ? 'col-start-4 col-end-6 xl:px-5' : '' ]">
          <h1 class="text-white text-xl">Social Media</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div id="link-social" class="grid grid-cols-2 gap-3">
            <LinkImg v-for="(media, index) in socialMedia" :key="index" :url="media.url" :name="media.name"/>
          </div>
        </div>
      </div>
      <div id="streaming-section">
        <h1 class="text-white text-xl">Streaming Platforms</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
        <div id="link-streaming" class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-10 gap-2">
          <LinkImg v-for="(stream, index) in streamingPlatforms" :key="index" :url="stream.url" :name="stream.name"/>
        </div>
      </div>
      <div id="player-section">
        <h1 class="text-white text-xl">Last Music Video</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="video" class="flex justify-center">
          <PlayerYoutube :videoid="'HL1UzIK-flA'"/>
        </div>
      </div>
      <div id="release-section">
        <h1 class="text-white text-xl">Lastest Releases</h1>
        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
        <div id="release-list" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
          <ArtistReleaseCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueYoutube from 'vue-youtube'

  Vue.use(VueYoutube)

  export default {

    data() {
      return {
        videoId: 'HL1UzIK-flA',
        description: true,
        playerVars: {
          autoplay: 0
        },
        socialMedia:[
          {
            url:"https://www.facebook.com/rihanna",
            name:"Facebook",
          },
          {
            url:"https://twitter.com/rihanna",
            name:"Twitter",
          },
          {
            url:"https://www.instagram.com/badgalriri/?hl=fr",
            name:"Instagram",
          },
        ],
        streamingPlatforms:[
          {
            url:"https://music.youtube.com/channel/UCvWtix2TtWGe9kffqnwdaMw",
            name:"Youtube Music",
          },
          {
            url:"https://music.apple.com/fr/artist/rihanna/63346553",
            name:"Apple Music",
          },
          {
            url:"https://music.amazon.fr/artists/B0025OJXRA/rihanna",
            name:"Amazon Music",
          },
          {
            url:"https://open.spotify.com/artist/5pKCCKE2ajJHZ9KAiaK11H",
            name:"Spotify",
          },
          {
            url:"https://soundcloud.com/RIHANNA",
            name:"Soundcloud",
          },
        ],
      }
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
