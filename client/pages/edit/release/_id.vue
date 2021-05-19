<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-5 mb-2">New Comeback</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="editRelease" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="body-area" class="xl:space-y-24 rounded bg-gray-500 bg-opacity-20 p-10 mt-10">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 my-5 justify-between">
        
        <div id="image-area" class="relative">
            <img class="w-80" :src="release.image" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button class="px-5 py-1 bg-red-700 text-white rounded">Upload</button>
            </div>
        </div>

        <div class="flex flex-col space-y-5">
          <div id="artist-type">
              <h1 class="text-white text-xl">Release Type*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <t-select @change="newObjectToApi(`type`,release.type)" v-model="release.type" id="artist-type-selector" :options="[
                { value: 'SINGLE', text: 'Single' },
                { value: 'ALBUM', text: 'Album' },
                { value: 'EP', text: 'EP'}
              ]" ></t-select>
          </div>

          <div id="release-name">
              <h1 class="text-white text-xl">Release Name*</h1>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <t-input @change="newObjectToApi(`name`,release.name)" autocomplete="false" type="text" v-model="release.name" placeholder="Release Name" name="release-name" />
          </div>
        </div>

        <div id="release-date">
            <h1 class="text-white text-xl">Release Date*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <t-datepicker @change="newObjectToApi(`date`,release.date)"
              v-model="release.date"
              placeholder="Release Date"
              initial-view="month" clearable timepicker amPm>
            </t-datepicker>
        </div>
      </div>
      <div id="middle" class="flex flex-col xl:flex-row justify-between">
        <div id="artists" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Artists*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <multiselect @change="newObjectToApi(`artists`, release.artists)" v-model="release.artists" tag-placeholder="Add this as new artist" placeholder="Search or add a artist" label="name" track-by="id" 
            :options="release.artists" :multiple="true" :taggable="true" @tag="addArtist"></multiselect>

        </div>
        <div id="tracklist" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Tracklist*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <t-input @change="newObjectToApi(`musics`, release.musics)" v-for="(music, index) in this.release.musics" :key="index" type="text" v-model="music.name" placeholder="Track name"/>
            <button @click="addMusic()" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Streaming Platforms Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Add Link'" @updateinput="updateList(release.platforms, $event, index, 'platforms')"/>
            <button @click="addStreamingLink" class="text-left focus:outline-none">Add more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
        return {
            release:{},
            sendToApi:{},
            optionArtist:[],
        }
    },

    async asyncData({ $axios, params }){
      const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
      release["newArtists"] = []
      return {release}
    },

    mounted(){
      this.optionArtist = this.release.artists.concat(this.release.newArtists)
    },

    methods:{

      async editRelease() {
          const {data: response} = await this.$axios.put(`https://comeback-api.herokuapp.com/releases/${this.$route.params.id}`, this.sendToApi)
          console.log(response)
      },

      addArtist (newTag) {
        const tag = {
          name: newTag,
          image: null,
          website: null,
          description: null,
          socials: null,
          platforms: null,
        }
        this.release.newArtists.push(tag)
      },

      addMusic(){
        this.release.musics.push({
          name: null,
          clip: null,
          platforms: null,
        })
      },

      addStreamingLink(){
        if(this.release.platforms == null) {
          this.release.platforms = [""]
        } else {
          this.release.platforms.push("")
        }
        console.log(this.release.platforms)
      },

      updateList(list, newElem, index, key){
        list[index] = newElem
        this.newObjectToApi(key, list)
        console.log(this.sendToApi)
      },

      newObjectToApi(key, value){
        this.sendToApi[key] = value
      },
    },
  }
</script>
