<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <NuxtLink :to="`/_userid/release/${this.$route.params.id}`" class="absolute left-1 top-1 flex hover:bg-white hover:bg-opacity-10 rounded py-1 px-2"><img class="w-8 h-8 mr-1" src="~/assets/image/arrow_back.png" alt=""></NuxtLink>
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-10 mb-2">Edit Release</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="editRelease()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="body-area" class="rounded bg-gray-500 bg-opacity-20 mt-10 p-20">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 mb-5 xl:mb-20">
        <div id="image-area" class="relative h-full">
            <img class="w-80" :src="this.release.image ? this.release.image : this.$store.state.imageArtistDefault" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button 
                    class="px-5 py-1 bg-red-700 text-white rounded"
                    @click="launchImageFile"
                    :disabled="isUploadingImage"
                    type="button">
                    {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
                </button>
                <input
                    ref="imageFile"
                    @change.prevent="uploadImageFile($event.target.files)"
                    type="file"
                    accept="image/png, image/jpeg"
                    class="hidden">
            </div>
        </div>
        <div class="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
          <div class="flex flex-col space-y-10 w-full">
            <div id="release-name">
                <h1 class="text-white text-xl">Release Name*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-input @change="newObjectToApi('name', release.name)" autocomplete="false" type="text" v-model="release.name" placeholder="Release Name" name="release-name" />
            </div>
            <div id="artists" class="flex flex-col text-white mb-5 xl:mb-0">
                <h1 class="text-xl">Artists*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <multiselect
                  v-model="release.artists" 
                  tag-placeholder="Add this as new artist" 
                  placeholder="Search or add a artist" 
                  label="name" 
                  track-by="id" 
                  :options="artistList" 
                  :multiple="true" 
                  :taggable="true"
                  @input="newObjectToApi('artists', release.artists)" 
                  @tag="addArtist">
                </multiselect>
            </div>
          </div>
          <div class="flex flex-col space-y-10 w-full">
            <div id="artist-name">
                <h1 class="text-white text-xl">Release Type*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-select @change="newObjectToApi('type', release.type)" v-model="release.type" id="artist-type-selector" :options="[
                  { value: 'SINGLE', text: 'Single' },
                  { value: 'ALBUM', text: 'Album' },
                  { value: 'EP', text: 'EP'}
                ]" ></t-select>
            </div>
            <div id="release-date">
                <h1 class="text-white text-xl">Release Date*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-datepicker
                  v-model="release.date"
                  @change="newObjectToApi('date', release.date)"
                  placeholder="Release Date"
                  initial-view="month" dateFormat='Y-m-d' clearable timepicker amPm>
                </t-datepicker>
            </div>
          </div>
        </div>
      </div>
      
      <div id="streaming-platform" class="flex flex-col w-full text-white mb-10">
          <h1 class="text-xl">Streaming Platforms Link</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Streaming Platforms'" @updateinput="updateList(release.platforms, $event, index, 'platforms')"/>
          <button @click="addStreamingLink()" class="text-left focus:outline-none">Add more</button>
      </div>

      <div id="middle" class="flex flex-col xl:flex-row">
        <div id="tracklist" class="flex flex-col w-full text-white mb-5 xl:mb-0">
            <h1 class="text-xl">Tracklist*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="mb-1 py-3 space-y-1 w-3/4" v-for="(music, index) in this.release.musics" :key="index">
              <span>Track {{index+1}}</span>
              <t-input @change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.name" placeholder="Track Name"/>
              <t-input @change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.clip" placeholder="Track Clip"/>
            </div>
            <button @click="addMusic()" class="text-left focus:outline-none">Add more</button>
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
            artistList:[],
            updateRelease:false,
            updateMusic:false,
            sendToApiMusics:[],
            isUploadingImage: false,
        }
    },

    async asyncData({ $axios, params }){
      const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
      const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')

      release["newArtists"] = []

      return {release, artistList}
    },

    methods:{

      async editRelease() {
        if(this.updateRelease) {
          await this.$axios.put(`https://comeback-api.herokuapp.com/releases/${this.$route.params.id}`, this.sendToApi).then(response => {
            if(!this.updateMusic) {
              this.$router.push({ path: `/_userid/release/${this.$route.params.id}`})
            }
          }).catch(function (error) {
            console.log(error);
          });
        }

        if(this.updateMusic){
          this.sendToApiMusics.forEach(async element => {
            await this.$axios.put(`https://comeback-api.herokuapp.com/musics/${element.id}`, element).then(response => {

              this.$router.push({ path: `/_userid/release/${this.$route.params.id}`})
              
            }).catch(function (error) {
              console.log(error);
            });
          });
        }

        //this.$router.push({ path: `/_userid/release/${this.$route.params.id}`})
      },

      addArtist (newTag) {
        const tag = {
          name: newTag,
          image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
          type: 'SOLO',
          website: null,
          description: null,
          socials: null,
          platforms: null,
        }
        this.artistList.push(tag)
        this.release.artists.push(tag)
        this.release.newArtists.push(tag)
      },

      addMusic(){
        this.release.musics.push({
          id: null,
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
      },

      updateList(list, newElem, index, key){
        list[index] = newElem
        this.newObjectToApi(key, list)
      },

      newObjectToApi(key, value){
        this.sendToApi[key] = value
        this.updateRelease = true
      },

      newObjectToApiMusic(value, index){
        if(value[index].id) {
          this.sendToApiMusics.push(value[index])
          this.updateMusic = true
        } else {
          this.newObjectToApi("music", value)
        }
      },

      launchImageFile () {
          this.$refs.imageFile.click()
      },

      uploadImageFile (files) {
          if (!files.length) {
              return
          }
          let file = files[0]

          if (!file.type.match('image.*')) {
              alert('Please upload an image.')
              return
          }

          let metadata = {
              contentType: file.type
          }

          this.isUploadingImage = true
          let imageRef = this.$fire.storage.ref(`images/${Date.now()}`)

          let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
              return snapshot.ref.getDownloadURL().then((url) => {
                  return url
              })
          }).catch((error) => {
              console.error('Error uploading image', error)
          })
          uploadTask.then((url) => {
              this.newObjectToApi("image", url)
              this.release.image = url
              this.isUploadingImage = false
          })
      },
    },
  }
</script>
