<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    
    <section id="title-area" class="mb-5">
      <div id="tilte-artist" class="relative">
        <h2 class="text-white text-2xl xl:text-4xl mt-5 mb-2">New Comeback</h2>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="creates()" class="bg-red-700 hover:bg-red-900 absolute right-0 xl:right-5 top-0 px-5 py-1 text-white rounded">Confirm</button>
      </div>
    </section>

    <span class="text-white font-semibold">Please fill all fields with a *</span>
    <section id="body-area" class="rounded bg-gray-500 bg-opacity-20 p-5 px-10 pb-10 pt-10">
      <div id="release-info" class=" flex flex-col xl:flex-row space-y-5 xl:space-y-0 justify-between">

        <div class="flex flex-col 2xl:flex-row space-y-5 2xl:space-y-0 my-5 2xl:space-x-20 2xl:px-10 justify-center h-full w-full">

          <div id="image-area" class="relative h-full">
              <img class="w-96" :src="this.release.image ? this.release.image : defaultImage" alt="">
              <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button 
                  class="p-2 bg-red-700 hover:bg-red-900 text-white rounded flex flex-col text-sm justify-center space-x-2"
                  @click="launchImageFile"
                  :disabled="this.isUploadingImage"
                  type="button">
                  <svg class="w-full" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M85.79327,2.06731c-3.59195,0 -7.18389,3.66947 -14.47115,10.95673l-43.41346,43.62019c-7.98497,8.01082 -5.32331,9.50962 3.10096,9.50962h21.91346v52.92308c0,10.95673 8.88942,19.84615 19.84615,19.84615h26.46154c10.95673,0 19.84615,-8.88942 19.84615,-19.84615v-52.92308h21.5c9.32872,0 11.29267,-1.49879 3.30769,-9.50962l-43.62019,-43.62019c-7.28726,-7.28726 -10.87921,-10.95673 -14.47115,-10.95673zM0,125.69231v26.46154c0,10.95673 8.88942,19.84615 19.84615,19.84615h132.30769c10.95673,0 19.84615,-8.88942 19.84615,-19.84615v-26.46154h-13.23077v26.46154c0,3.64363 -2.97176,6.61538 -6.61538,6.61538h-132.30769c-3.64363,0 -6.61538,-2.97176 -6.61538,-6.61538v-26.46154z"></path></g></g></svg>
                </button>
                <input
                  ref="imageFile"
                  @change.prevent="uploadImageFile($event.target.files)"
                  type="file"
                  accept="image/png, image/jpeg"
                  class="hidden">
              </div>
          </div>

          <div id="basic-info" class="flex flex-col space-y-5 w-full">
            <div id="release-name">
                <h2 class="text-white text-xl">Release Name*</h2>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-input autocomplete="false" type="text" v-model="release.name" placeholder="Release Name" name="release-name" />
            </div>
            <div id="artist-name">
                <h2 class="text-white text-xl">Release Type*</h2>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-select v-model="release.type" id="artist-type-selector" :options="[
                  { value: 'SINGLE', text: 'Single' },
                  { value: 'ALBUM', text: 'Album' },
                  { value: 'EP', text: 'EP'}]">
                </t-select>
            </div>
            <div id="artists" class="flex flex-col text-white mb-5 xl:mb-0">
              <h2 class="text-xl">Artists*</h2>
              <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
              <multiselect 
                v-model="release.artists" 
                tag-placeholder="Add this as new artist" 
                placeholder="Search or add a artist" 
                label="name" 
                track-by="id" 
                :options="artistList" 
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                :multiple="true" 
                :taggable="true" 
                @tag="addArtist">
                <template slot="option" slot-scope="props">
                    <div class="flex space-x-1">
                        <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                        <div class="option__desc flex flex-col space-y-1">
                            <span class="option__title">{{ props.option.name }}</span>
                            <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                        </div>
                    </div>
                </template>
              </multiselect>
            </div>
            <div id="styles" class="flex flex-col text-white mb-5 xl:mb-0">
                <h2 class="text-xl">Styles</h2>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <multiselect
                  v-model="release.styles" 
                  tag-placeholder="Add this as new style" 
                  placeholder="Search or add a style"
                  label="name" 
                  track-by="name" 
                  :options="styleList" 
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="false"
                  :multiple="true" 
                  :taggable="true" 
                  @tag="addStyle">
                </multiselect>
            </div>
          </div>

        </div>

        <section id="release-date">
          <h2 class="text-white text-xl">Release Date* <span class="text-base">: {{dates.toLocaleDateString('fr-FR')}} at {{(dates.toLocaleTimeString('en-US')).toString().slice(0,4)}} in {{actualTimezone}}</span></h2>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div id="date-picker">
            
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
                v-model="timezoneIndex"/>
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
        </section>
      </div>

      <div id="release-contents" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div id="tracklist" class="flex flex-col text-white mb-5 xl:mb-0">
            <h2 class="text-xl">Tracklist</h2>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-full"></div>
            <div v-for="(music, index) in this.release.musics" :key="index" class="py-3 space-y-1">
              <t-input type="text" v-model="music.name" :placeholder="'Track name (' + (index+1) + ')'"/>
              <t-input type="text" v-model="music.clip" :placeholder="'Track clip (' + (index+1) + ')'"/>
            </div>
            <button @click="addMusic()" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
              <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
            </button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white mb-5 xl:mb-0">
            <h2 class="text-xl">Streaming Platforms Link</h2>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-full"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Streaming Link'" @updateinput="updateList(release.platforms, $event, index)"/>
            <button @click="newInput(release.platforms)" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
              <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
            </button>
        </div>
      </div>
      
      <div id="source" class="flex flex-col w-full text-white mb-5 xl:mb-0 mt-5 xl:mt-10">
          <h1 class="text-white text-xl">Source*</h1>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <t-textarea id="source" placeholder="Send us all link where you find you're informations please." v-model="source" name="my-textarea" class="resize w-full h-20"/>
      </div>
    </section>
    <div class="pt-5 flex justify-end">
      <button @click="creates()" class="bg-red-700 hover:bg-red-900 px-5 py-1 text-white rounded">Confirm</button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment-timezone'
  export default {
    
    data() {
      return {
        source:'',
        dates: new Date(),
        actualTimezone:'',
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
          'Europe/Paris', // +1
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
        artistList:[],
        styleList:[],
        isUploadingImage: false,
        release:{
          name: '',
          type:'SINGLE',
          image:'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce',
          date: '',
          platforms: [],
          artists:[],
          styles:[],
          newArtists:[],
          musics:[],
        },
      }
    },

    created(){
      this.actualTimezone = moment.tz.guess()
    },

    computed: {
      userId(){
        let utmp = this.$store.state.dataUser
        return utmp.id
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

    async asyncData({ $axios }){
      const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists/fulllimited?sortby=name:asc')
      const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')
      return {artistList, styleList}
    },

    methods:{

      async creates() {
        this.release.date = this.dates
        if (this.release.name === '') {
            console.log("Failed", "Invalid Name")
            this.$toast.error('Invalid Name', {duration:3000, position:'top-right'})
            return
        } else if (this.release.date === '') {
            console.log("Failed", "Invalid Date")
            this.$toast.error('Invalid Date', {duration:3000, position:'top-right'})
            return
        } else if (this.source === '') {
            console.log("Failed", "Source Missing")
            this.$toast.error('Source Missing. Please put your sources.', {duration:3000, position:'top-right'})
            return
        } else if (this.release.artists?.length === 0) {
            console.log("Failed", "Invalid Artist List")
            this.$toast.error('Invalid Artist List', {duration:3000, position:'top-right'})
            return
        }

        if(this.release.platforms?.length === 1) {
          if (this.release.platforms[0] === '') {
            this.release.platforms = null
          }
        }
        
        await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
          state:'PENDING',
          method:'POST',
          endpoint:`/releases`,
          body: {
            "name": this.release.name,
            "type": this.release.type,
            "image": this.release.image,
            "date": this.release.date,
            "platforms": this.release.platforms,
            "artists": this.release.artists,
            "styles": this.release.styles,
            "newArtists": this.release.newArtists,
            "musics": this.release.musics,
          },
          currentData: {},
          userId: this.userId,
          source: this.source
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(response => {
          this.$toast.success('Thank you, Your new comeback has been added to pending list to validated', {duration:5000, position:'top-right'})
          //this.$toast.info('Find all your modifications in Setting/Requests', {duration:5000, position:'top-right'})
          //this.$router.push({ path: `/${this.userId}/release/${response.data.id}`})
          this.$router.push({ path: `/calendar`})
        })
      },

      addStyle (newTag) {
        const tag = {
          name: newTag,
        }
        if(this.release.styles == null) {
          this.release.styles = [tag]
        } else {
          this.release.styles.push(tag)
        }
        this.styleList.push(tag)
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
          name: null,
          clip: null,
          platforms: null,
        })
      },

      updateList(list, newElem, index){
        list[index] = newElem
      },

      newInput(listToUpdate){
        listToUpdate.push('')
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
          let imageRef = this.$fire.storage.ref(`images/release-${Date.now()}`)

          let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
              return snapshot.ref.getDownloadURL().then((url) => {
                  return url
              })
          }).catch((error) => {
              console.log(error)
          })
          uploadTask.then((url) => {
              this.release.image = url
              this.isUploadingImage = false
          })
      },
    },
  }
</script>