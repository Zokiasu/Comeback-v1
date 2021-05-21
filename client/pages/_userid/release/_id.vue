<template>
    <div>
        <div class="h-96 relative">
            <img class="h-full relative w-full object-cover object-center " :src="this.release.image ? this.release.image : this.$store.state.imageReleaseDefault" alt="Artist Picture"/>
            <div class="gradient w-full h-32 font-bold text-white absolute bottom-0"></div>
            <div class="absolute bottom-5 px-5 md:flex md:justify-between text-white text-2xl w-full">
                <span><span v-for="(artist, index) in this.release.artists" :key="index"><NuxtLink :to="`/_userid/artist/${artist.id}`" class="hover:underline">{{artist.name}}</NuxtLink><span v-if="index < release.artists.length-1">, </span></span> • {{this.release.name}}</span>
                <span>{{(new Date(this.release.date)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} • {{this.release.type.charAt(0).toUpperCase() + this.release.type.slice(1).toLowerCase() }}</span>
            </div>
        </div>
        <div class="relative px-5 py-5">
            <div id="button" class="my-5 md:my-0 md:absolute right-5 top-5">
                <button class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Follow</button>
                <NuxtLink :to="`/_userid/edit/release/${this.release.id}`" class="text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 py-0.5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
            </div>
            <div v-if="this.release.platforms && this.release.platforms.length > 0" id="tilte-artist" class="mb-10">
                <h1 class="text-white text-xl">Streaming Platforms</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10">
                    <LinkImg v-for="(platforms, index) in this.release.platforms" :key="index" :url="platforms" :name="platforms"/>
                </div>
            </div>
            <div v-if="this.release.musics && this.release.musics.length > 0" id="tracklist" class="mb-10">
                <h1 class="text-white text-xl">Tracklist</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="grid grid-cols-2 gap-3 text-gray-300 md:w-1/2">
                    <div v-for="(title, index) in this.release.musics" :key="index"><span> {{title.name}} </span></div>
                </div>
            </div>
            <div v-if="this.videoId.length > 0" id="player-section" class="mb-10">
                <h1 class="text-white text-xl">Music Video</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
                <div id="video" class="flex justify-center">
                    <iframe v-for="(clip, index) in this.videoId" :key="index" width="560" height="315" :src="clip" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                release: null,
                videoId: [],
            }
        },

        async asyncData({ $axios, params }){
            const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
            console.log(release)
            return {release}
        },

        mounted(){
            for (let index = 0; index < this.release.musics?.length; index++) {
                let x = this.getYoutubeId(this.release.musics[index].clip)
                if(x != null) this.videoId.push(x)
            }
            console.log(this.videoId)
        },

        methods:{
            getYoutubeId(url){
                let id, fullId
                if(this.release.type === "ALBUM") {
                    if(url?.includes("list=")) {

                        id = url.split("list=")[1]
                        fullId = "https://www.youtube.com/embed/videoseries?list=" + id

                    } else if(url?.includes("v=")) {

                        id = url.split("v=")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    } else if(url?.includes(".be/")) {

                        id = url.split(".be/")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    }
                } else {
                    if(url?.includes("v=")) {

                        id = url.split("v=")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    } else if(url?.includes(".be/")) {

                        id = url.split(".be/")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    }
                }
                return fullId
            },
        },
    }
</script>

<style>
.gradient{
    background: rgb(0,0,0);
    background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#1f1d1d",GradientType=1);
}

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
