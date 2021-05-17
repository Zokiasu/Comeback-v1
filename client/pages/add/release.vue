<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-5 mb-2">New Comeback</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="creates()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="body-area" class="xl:space-y-24">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-10 my-5">
        <div id="image-area" class="relative">
            <img class="w-80" :src="release.image" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button class="px-5 py-1 bg-red-700 text-white rounded">Upload</button>
            </div>
        </div>
        <div class="flex flex-col justify-between space-y-5">
          <div id="artist-name">
              <h1 class="text-white text-xl">Release Type*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <select v-model="release.type" id="artist-type-selector" class="w-full xl:w-96 focus:outline-none p-2 bg-gray-100 border focus:border-white transition-colors duration-500">
                  <option value="SINGLE">Single</option>
                  <option value="ALBUM">Album</option>
                  <option value="EP">EP</option>
              </select>
          </div>
          <div id="artist-name">
              <h1 class="text-white text-xl">Release Name*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <input v-model="release.name" placeholder="Release Name" class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
          </div>
          <div id="artist-name">
              <h1 class="text-white text-xl">Release Date*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <input type="date" v-model="release.date" placeholder="Release Date" class="w-full xl:w-96 focus:outline-none p-2 focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500">
          </div>
        </div>
      </div>
      <div id="middle" class="flex flex-col xl:flex-row">
        <div id="social-media" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Artists*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.artists" :key="index" :elem="elem" @updateinput="updateList(release.artists, $event, index)"/>
            <button @click="newInput(release.artists)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="tracklist" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Tracklist*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.musics" :key="index" :elem="elem" @updateinput="updateList(release.musics, $event, index)"/>
            <button @click="newInput(release.musics)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white">
            <h1 class="text-xl">Streaming Platforms Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" @updateinput="updateList(release.platforms, $event, index)"/>
            <button @click="newInput(release.platforms)" class="text-left focus:outline-none">Add more</button>
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
              name: '',
              type:'SINGLE',
              image:'https://cdn.icon-icons.com/icons2/390/PNG/512/compact-disc_38539.png',
              date: Date,
              platforms: ['New'],
              artists:['New'],
              musics:['New'],
            }
        }
    },

    methods:{
      updateList(list, newElem, index){
        list[index] = newElem
      },

      newInput(listToUpdate){
        listToUpdate.push('New')
      },

      async creates() {
          if (this.release.name === '' || this.release.date === '' || (this.release.artists.length === 1 && this.release.artists[0] === 'New') || (this.release.musics.length === 1 && this.release.musics[0] === 'New')) {
              console.log("Failed")
              return
          }

          if(this.release.platforms.length === 1) {
            if (this.release.platforms[0] === 'New') {
              this.release.platforms = null
            }
          }

          const {data: response} = await this.$axios.post('https://comeback-api.herokuapp.com/releases', {
            "name": this.release.name,
            "type": this.release.type,
            "image": this.release.image,
            "date": this.release.date,
            "platforms": this.release.platforms,
            "artists": this.release.artists,
            "musics": this.release.musics,
          })

          console.log(response)
      },
    },
  }
</script>

<style>

</style>
