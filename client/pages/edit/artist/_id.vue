<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-5 mb-2">Artist Edition</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>
    <div id="top" class="flex flex-col xl:flex-row xl:space-x-10 my-5">
        <div id="image-area" class="relative">
            <img class="w-80" :src="this.$store.state.artistList[this.$route.params.id].picture" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button class="px-5 py-1 bg-red-700 text-white rounded-xl">Upload</button>
            </div>
        </div>
        <div class="space-y-10 w-full">
            <div class="flex flex-col xl:flex-row xl:space-x-10 space-y-10 xl:space-y-0">
                <div id="artist-name">
                    <h1 class="text-white text-xl">Artist Name*</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <input class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
                </div>
                <div id="artist-name">
                    <h1 class="text-white text-xl">Artist Type</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <select v-model="artistType" id="artist-type-selector" class="w-full xl:w-96 focus:outline-none p-2 bg-gray-100 border focus:border-white transition-colors duration-500">
                        <option value="Solo">Soloist</option>
                        <option value="Group">Group</option>
                    </select>
                </div>
            </div>
            <div id="description">
                <h1 class="text-white text-xl">Description</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <textarea class="resize w-full xl:w-4/5 h-44 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500"></textarea>
            </div>
        </div>
        <div class="space-y-10">
        </div>
    </div>
    <div id="middle" class="flex flex-col xl:flex-row">
        <div id="social-media" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Social Media Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <input class="w-full xl:w-96 focus:outline-none p-2 text-black focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
            <button class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Streaming Platforms Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <input class="w-full xl:w-96 focus:outline-none p-2 text-black focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
            <button class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="artist-member" class="flex flex-col text-white">
            <h1 class="text-xl">Belong To The Group</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <input class="w-full xl:w-96 focus:outline-none p-2 text-black focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
            <button class="text-left focus:outline-none">Add more</button>
        </div>
    </div>
  </div>
</template>

<script>
    export default {

        data() {
            return {
                artistType:'',
                artist:{
                    img:'',
                    name:'',
                    description:'',
                    members:[],
                    website_link:'',
                    social_media:[],
                    streaming_platform:[],
                }
            }
        },

        methods:{
            
        },
    }
</script>

<style>
.textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    width: 100%;
}
</style>
