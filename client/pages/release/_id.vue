<template>
    <div>
        <div class="h-96 relative">
            <img class="h-full relative w-full object-cover object-center " :src="this.$store.state.releaseList[this.$route.params.id].releasePicture" alt="Artist Picture"/>
            <div class="gradient w-full h-32 font-bold text-white absolute bottom-0"></div>
            <div class="absolute bottom-5 px-5 md:flex md:justify-between text-white text-2xl w-full">
                <span>{{this.$store.state.releaseList[this.$route.params.id].releaseArtist}} • {{this.$store.state.releaseList[this.$route.params.id].releaseName}}</span>
                <span>{{(this.$store.state.releaseList[this.$route.params.id].releaseDate).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} • {{this.$store.state.releaseList[this.$route.params.id].releaseType}}</span>
            </div>
        </div>
        <div class="relative px-5 py-5">
            <div id="button" class="my-5 md:my-0 md:absolute right-5 top-5">
                <button class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Follow</button>
                <button class="text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</button>
            </div>
            <div id="tilte-artist" class="mb-10">
                <h1 class="text-white text-xl">Streaming Platforms</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10">
                    <LinkImg :url="'https://music.youtube.com/channel/UCIMmuidNJdncfMEelOU08Fg'" :name="'Youtube Music'"/>
                    <LinkImg :url="'https://music.youtube.com/channel/UCIMmuidNJdncfMEelOU08Fg'" :name="'Youtube Music'"/>
                    <LinkImg :url="'https://music.youtube.com/channel/UCIMmuidNJdncfMEelOU08Fg'" :name="'Youtube Music'"/>
                    <LinkImg :url="'https://music.youtube.com/channel/UCIMmuidNJdncfMEelOU08Fg'" :name="'Youtube Music'"/>
                </div>
            </div>
            <div id="tracklist" class="mb-10">
                <h1 class="text-white text-xl">Tracklist</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="grid grid-cols-2 gap-3 text-gray-300 md:w-1/2">
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                    <span>Track</span>
                </div>
            </div>
            <div id="player-section" class="mb-10">
                <h1 class="text-white text-xl">Music Video</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
                <div id="video" class="flex justify-center">
                    <PlayerYoutube :videoid="'HL1UzIK-flA'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                
            }
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
