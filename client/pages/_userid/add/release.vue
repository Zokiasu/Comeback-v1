<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h2 class="text-white text-2xl xl:text-4xl mt-5 mb-2">New Comeback</h2>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button @click="creates()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="body-area" class="xl:space-y-14 rounded bg-gray-500 bg-opacity-20 p-5 px-10 pb-10 mt-10">
      <div id="top" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 my-5 xl:space-x-20 justify-between xl:pr-40">
        
        <div class="flex flex-col 2xl:flex-row space-y-5 2xl:space-y-0 my-5 2xl:space-x-10 justify-center h-full">
          <div id="image-area" class="relative h-full">
              <img class="w-80" :src="this.release.image ? this.release.image : this.$store.state.imageArtistDefault" alt="">
              <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                  <button 
                      class="px-5 py-1 bg-red-700 text-white rounded"
                      @click="launchImageFile"
                      :disabled="this.isUploadingImage"
                      type="button">
                      {{ this.isUploadingImage ? 'Uploading...' : 'Upload' }}
                  </button>
                  <input
                      ref="imageFile"
                      @change.prevent="uploadImageFile($event.target.files)"
                      type="file"
                      accept="image/png, image/jpeg"
                      class="hidden">
              </div>
          </div>

          <div class="flex flex-col space-y-5">
            <div id="artist-name">
                <h2 class="text-white text-xl">Release Type*</h2>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-select v-model="release.type" id="artist-type-selector" :options="[
                  { value: 'SINGLE', text: 'Single' },
                  { value: 'ALBUM', text: 'Album' },
                  { value: 'EP', text: 'EP'}
                ]" ></t-select>
            </div>

            <div id="release-name">
                <h2 class="text-white text-xl">Release Name*</h2>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-input autocomplete="false" type="text" v-model="release.name" placeholder="Release Name" name="release-name" />
            </div>
          </div>
        </div>

        <div id="release-date w-full">
          <h2 class="text-white text-xl">Release Date*</h2>
          <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
          <div>
            <v-date-picker
                mode="dateTime"
                v-model="dates"
                :timezone="timezone"
                :min-date="new Date()"
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
            :multiple="true" 
            :taggable="true" 
            @tag="addArtist">
          </multiselect>
      </div>

      <div id="middle" class="flex flex-col xl:flex-row mx-auto">
        <div id="tracklist" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h2 class="text-xl">Tracklist*</h2>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <t-input class="mb-1" v-for="(music, index) in this.release.musics" :key="index" type="text" v-model="music.name" placeholder="Track name"/>
            <button @click="addMusic()" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h2 class="text-xl">Streaming Platforms Link</h2>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Streaming Platform'" @updateinput="updateList(release.platforms, $event, index)"/>
            <button @click="newInput(release.platforms)" class="text-left focus:outline-none">Add more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    
    data() {
      return {
        testb:'',
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
        isUploadingImage: false,
        release:{
          name: '',
          type:'SINGLE',
          image:'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce',
          date: '',
          platforms: [],
          artists:[],
          newArtists:[],
          musics:[],
        },
      }
    },

    computed: {
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
      let artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')
      return {artistList}
    },

    methods:{
      testa(){

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

      async creates() {
          if (this.release.name === '' || this.release.date === '' || (this.release.artists?.length === 1 && this.release.artists[0] === 'New') || (this.release.musics?.length === 1 && this.release.musics[0] === 'New')) {
              console.log("Failed")
              return
          }

          if(this.release.platforms?.length === 1) {
            if (this.release.platforms[0] === 'New') {
              this.release.platforms = null
            }
          }

          await this.$axios.post('https://comeback-api.herokuapp.com/releases', {
            "name": this.release.name,
            "type": this.release.type,
            "image": this.release.image,
            "date": this.release.date,
            "platforms": this.release.platforms,
            "artists": this.release.artists,
            "newArtists": this.release.newArtists,
            "musics": this.release.musics,
          }).then(response => {
            this.$router.push({ path: `/_userid/release/${response.data.id}`})
          })
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
              console.error('Error uploading image', error)
          })
          uploadTask.then((url) => {
              this.release.image = url
              this.isUploadingImage = false
          })
      },
    },
  }
</script>

<style>
fieldset[disabled] .multiselect {
  pointer-events: none;
}
.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}
.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #b91c1c transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}
.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}
.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.multiselect__input::placeholder {
  color: #35495e;
}
.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
.multiselect__tags-wrap {
  display: inline;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #b91c1c;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.multiselect__tag-icon:after {
  content: "×";
  color: #ffffff;
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #b91c1c;
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}
.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}
.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #999999 transparent transparent transparent;
  content: "";
}
.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}
.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}
.multiselect__content::webkit-scrollbar {
  display: none;
}
.multiselect__element {
  display: block;
}
.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
.multiselect__option--highlight {
  background: #b91c1c;
  outline: none;
  color: white;
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #b91c1c;
  color: white;
}
.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}
.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}
.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}
.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .multiselect {
  text-align: right;
}
*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .multiselect__content {
  text-align: right;
}
*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>