<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-5 mb-2">New Comeback</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="sendToApiS" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="body-area" class="xl:space-y-24">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-10 my-5">
        <div id="image-area" class="relative">
            <img class="w-80" :src="release.img" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button class="px-5 py-1 bg-red-700 text-white rounded">Upload</button>
            </div>
        </div>
        <div class="flex flex-col justify-between space-y-5 xl:space-y-0">
          <div id="artist-name">
              <h1 class="text-white text-xl">Release Type*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <select @change="newObjectToApi('type', release.releaseType)" v-model="release.releaseType" id="artist-type-selector" class="w-full xl:w-96 focus:outline-none p-2 bg-gray-100 border focus:border-white transition-colors duration-500">
                  <option value="Single">Single</option>
                  <option value="Album">Album</option>
                  <option value="EP">EP</option>
              </select>
          </div>
          <div id="artist-name">
              <h1 class="text-white text-xl">Release Name*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <input @change="newObjectToApi('name', release.name)" v-model="release.name" placeholder="Release Name" class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
          </div>
          <div id="artist-name">
              <h1 class="text-white text-xl">Main Artist*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <input @change="newObjectToApi('artist', release.artist)" v-model="release.artist" placeholder="Artist Name" class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
          </div>
        </div>
        <div id="artist-name">
            <h1 class="text-white text-xl">Release Date*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <input @change="newObjectToApi('date', release.date)" v-model="release.date" class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
        </div>
      </div>
      <div id="middle" class="flex flex-col xl:flex-row">
        <div id="social-media" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Featuring Artist</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.featuringArtist" :key="index" :elem="elem" @updateinput="updateList(release.featuringArtist, $event, index)"/>
            <button @click="newInput(featuringArtist)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="tracklist" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Tracklist</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.tracklist" :key="index" :elem="elem" @updateinput="updateList(release.tracklist, $event, index)"/>
            <button @click="newInput(release.tracklist)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white">
            <h1 class="text-xl">Streaming Platforms Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.streamingPlatform" :key="index" :elem="elem" @updateinput="updateList(release.streamingPlatform, $event, index)"/>
            <button @click="newInput(release.streamingPlatform)" class="text-left focus:outline-none">Add more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            release:{
              releaseType:'Single',
              name: '',
              artist: '',
              img:'https://cdn.icon-icons.com/icons2/390/PNG/512/compact-disc_38539.png',
              date: '',
              featuringArtist:['New'],
              tracklist:['New'],
              streamingPlatform:['New'],
            },

            sendToApi:{
              userId:'Hello',
            },
        }
    },

    created(){
      this.sendToApi.userId = "0"
      this.release.name = "Anti"
      this.release.artist = "Rihanna"
      this.release.img = "https://images-na.ssl-images-amazon.com/images/I/61IeCixjIZL._SL1002_.jpg"
      this.release.date = new Date('January 28 2016, 12:00:00 GMT+02:00')
    },

    methods:{
      updateList(list, newElem, index){
        list[index] = newElem
        this.newObjectToApi(list, list)
      },

      newInput(listToUpdate){
        listToUpdate.push('New')
      },

      newObjectToApi(key, value){
        this.sendToApi[key] = value
        console.log(this.sendToApi)
      },

      sendToApiS(){
        console.log(this.sendToApi)
      }
    },
  }
</script>

<style>

</style>
