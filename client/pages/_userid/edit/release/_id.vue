<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <section id="title-area">
      <NuxtLink :to="`/${userId}/release/${this.$route.params.id}`" class="absolute left-1 top-1 flex hover:bg-white hover:bg-opacity-10 rounded py-1 px-2"><img class="w-8 h-8 mr-1" src="~/assets/image/arrow_back.png" alt=""></NuxtLink>
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-10 mb-2">Edit Release</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="editRelease()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </section>

    <section id="body-area" class="rounded bg-gray-500 bg-opacity-20 mt-10 p-5 lg:p-20">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 mb-5 xl:mb-20">
        <div class="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
          <div class="flex flex-col space-y-10 w-full justify-center">
            <div id="image-area" class="relative h-full flex justify-center">
                <img class="h-80 object-cover" :src="this.release.image ? this.release.image : defaultImage" alt="">
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
            <div id="release-name">
                <h1 class="text-white text-xl">Release Name*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-input @change="newObjectToApi('name', release.name)" autocomplete="false" type="text" v-model="release.name" placeholder="Release Name" name="release-name" />
            </div>
            <div id="artist-name">
                <h1 class="text-white text-xl">Release Type*</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-select @change="newObjectToApi('type', release.type)" v-model="release.type" id="artist-type-selector" :options="[
                  { value: 'SINGLE', text: 'Single' },
                  { value: 'ALBUM', text: 'Album' },
                  { value: 'EP', text: 'EP'}
                ]" ></t-select>
            </div>
          </div>
          <div id="datepicker" class="flex flex-col space-y-10 w-full xl:p-10">
            <div id="release-date">
              <h2 class="text-white text-xl">Release Date*</h2>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <div>
                <v-date-picker
                    mode="dateTime"
                    v-model="dates"
                    :timezone="timezone"
                    color="red"
                    is-expanded/>
                <div class="w-full mt-4">
                    <div class="flex justify-between w-full">
                    <span class="text-sm font-bold text-white">-11:00</span>
                    <span class="text-sm font-bold text-white">UTC</span>
                    <span class="text-sm font-bold text-white">+11:00</span>
                    </div>
                    <input
                    class="w-full"
                    type="range"
                    min="0"
                    :max="timezones.length - 1"
                    v-model="timezoneIndex"
                    />
                    <div class="flex">
                      <span class="font-semibold text-gray-400 mr-2">Timezone:</span>
                      <span class="text-white">{{ timezone }}</span>
                    </div>
                    <div class="flex">
                      <span class="font-semibold text-gray-400 mr-2">Namezone:</span>
                      <span class="text-white">{{ namezone }}</span>
                    </div>
                    <div class="flex">
                      <span class="font-semibold text-gray-400 mr-2">GMT Zone:</span>
                      <span class="text-white">GMT{{ gmtzone }}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="artists" class="flex flex-col text-white mb-10">
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
        
      <div id="release-style" class="flex flex-col text-white mb-5 xl:mb-10">
          <h1 class="text-xl">Styles</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <multiselect
              v-model="release.styles" 
              tag-placeholder="Add this as new style" 
              placeholder="Search or add a style"
              :options="styleList" 
              :multiple="true" 
              :taggable="true"
              @tag="addStyle">
          </multiselect>
      </div>
      
      <div id="streaming-platform" class="flex flex-col w-full text-white mb-10">
          <h1 class="text-xl">Streaming Platforms Link</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Streaming Platforms'" @updateinput="updateList(release.platforms, $event, index, 'platforms')"/>
          <button @click="addStreamingLink()" class="text-left focus:outline-none">Add</button>
      </div>

      <div id="tracklist" class="flex flex-col w-full text-white mb-5 xl:mb-10">
          <h1 class="text-xl">Tracklist*</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div class="mb-1 py-3 space-y-1 w-3/4" v-for="(music, index) in this.release.musics" :key="index">
            <span>Track {{index+1}}</span>
            <t-input v-on:change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.name" placeholder="Track Name"/>
            <t-input @change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.clip" placeholder="Track Clip"/>
          </div>
          <button @click="addMusic()" class="text-left focus:outline-none">Add</button>
      </div>

      <div id="source" class="flex flex-col w-full text-white mb-5 xl:mb-0">
          <h1 class="text-white text-xl">Source*</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <t-textarea id="source" placeholder="Source" v-model="source" name="my-textarea" class="resize w-full h-20"/>
      </div>
      <div class="flex justify-end">
        <button @click="editRelease()" class="px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </section>
  </div>
</template>

<script>
  export default {

    data() {
        return {
          dates: new Date(),
          timezoneIndex: 11,
          timezones: [
            'Pacific/Niue', // -11
            'Pacific/Honolulu', // -10
            'America/Anchorage', // -9
            'America/Los_Angeles', // -8
            'America/Denver', // -7
            'America/Chicago', // -6
            'America/New_York', // -5
            'America/Puerto_Rico', // -4
            'America/Buenos_Aires', // -3
            'America/Sao_Paulo', // -2,
            'Atlantic/Azores', // -1
            'UTC', // 0
            'Europe/Amsterdam', // +1
            'Europe/Athens', // +2
            'Europe/Moscow', // +3
            'Indian/Mahe', // +4
            'Asia/Ashgabat', // +5
            'Asia/Dhaka', // +6
            'Asia/Bangkok', // +7
            'Asia/Hong_Kong', // +8
            'Asia/Seoul', // +9
            'Australia/Sydney', // +10
            'Asia/Magadan', // +11
          ],
          nameZones: [
            'Niue, Pago Pago', // -11
            'Hawaii, Rarotonga, Tahiti', // -10
            'Alaska Gambier', // -9
            'Tijuana, Vancouver, Whitehorse', // -8
            'Arizona, Mazatlan, Dawnson Creek, +3', // -7
            'Mexico City, Costa Rica, Guatemala, +8', // -6
            'Toronto, Jamaica, Panama, +11', // -5
            'Guyana, Puerto Rico, Curacoa, +13', // -4
            'Buenos Aires, Cayenne, Salvador, +17', // -3
            'Noronha, Sao Paulo, South Georgia', // -2,
            'Azores, Cape Verde, Scoresbysund', // -1
            'Dublin, Lisbon, London, +11', // 0
            'Amsterdam, Berlin, Oslo, +23', // +1
            'Bucharest, Jerusalem, Johannesburg, +19', // +2
            'Baghdad, Istanbul, Qatar, +5', // +3
            'Dubai, Reunion, Yerevan, +5', // +4
            'Maldives, Mawson, Karachi, +7', // +5
            'Almaty, Vostok, Chagos, +4', // +6
            'Hanoi, Jakarta, Davis, +4', // +7
            'Taipei, Kuala Lumpur, Singapore, +10', // +8
            'Tokyo, Palau, Dili, +3', // +9
            'Guam, Vladivostok, Port Moresby, +3', // +10
            'Noumea, Casey, Sydney, +7', // +11
          ],
          release:{},
          sendToApi:{},
          oldDataToApi:{},
          artistList:[],
          styleList:[],
          updateRelease:false,
          updateMusic:false,
          sendToApiMusics:[],
          isUploadingImage: false,
          source:'',
        }
    },

    async asyncData({ $axios, params }){
      const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
      const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')

      release["newArtists"] = []

      return {release, artistList}
    },

    mounted(){
      this.dates = new Date(this.release.date)
      this.oldDataToApi = JSON.parse(JSON.stringify(this.release))
    },

    watch:{
      dates: function(val) {
        if(val.toString() != new Date(this.release.date).toString()) {
          this.newObjectToApi('date', val)
        }
      }
    },

    computed: {
      userId(){
        return this.$route.params.userid
      },
      defaultImage(){
          return this.$store.state.imageArtistDefault
      },
      timezone() {
        return this.timezones[this.timezoneIndex];
      },
      namezone() {
        return this.nameZones[this.timezoneIndex];
      },
      gmtzone() {
        var moment = require('moment-timezone')
        let zone = moment().tz(this.timezones[this.timezoneIndex]).format().toString().slice(19,25)
        if(zone == 'Z') {
          return '+00:00'
        } else {
          return zone
        }
      },
    },

    methods:{

      async editRelease() {
        if(this.updateRelease) {
          await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
              state:'PENDING',
              method:'PUT',
              endpoint:`/releases/${this.$route.params.id}`,
              body: this.sendToApi,
              currentData: this.oldDataToApi,
              userId: this.$route.params.userid,
              source: this.source
           }).then(response=>{
              //console.log(response)
              if(!this.updateMusic) {
                this.$router.push({ path: `/${this.userId}/release/${this.$route.params.id}`})
              }
          }).catch(function (error) {
            console.log(error);
          });
        }

        if(this.updateMusic){
          this.sendToApiMusics.forEach(async element => {
            let oldData = {}

            this.oldDataToApi.musics.forEach(el => {
              if(el.id == element.id) {
                oldData = el
              }
            })

            await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                state:'PENDING',
                method:'PUT',
                endpoint:`/musics/${element.id}`,
                body: element,
                currentData: oldData,
                userId: this.$route.params.userid,
                source: this.source
            }).then(response=>{
                //console.log(response)
                this.$router.push({ path: `/${this.userId}/release/${this.$route.params.id}`})
            }).catch(function (error) {
              console.log(error);
            });
          });
        }
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

      addStyle (newTag) {
        if(this.release.styles == null) {
            this.release.styles = [newTag]
        } else {
            this.release.styles.push(newTag)
        }
        this.newObjectToApi('styles', this.release.styles)
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
        console.log(this.sendToApi)
        console.log(this.updateRelease)
      },

      newObjectToApiMusic(value, index){
        if(value[index].id) {
          let elementExist = false
          this.sendToApiMusics.forEach(async element => {
            if(element.id == value[index].id) {
              element = value[index]
              elementExist = true
            }
          })
          if(!elementExist) {this.sendToApiMusics.push(value[index])}
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
          let imageRef = this.$fire.storage.ref(`images/release-${this.release.id.replace(/\s/g, '')}`)

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
