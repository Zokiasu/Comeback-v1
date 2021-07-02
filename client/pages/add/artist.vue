<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5 relative">
    <div id="title-area">
        <div id="tilte-artist" class="relative">
            <h1 class="text-white text-2xl xl:text-4xl mt-10 xl:mt-5 mb-2">Artist Edition</h1>
            <div id="divider" class="border-b-2 border-gray-100"></div>
            <button @click="createArtist()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
        </div>
    </div>
    <div class="rounded bg-gray-500 bg-opacity-20 p-10 mt-10">
        <div class="flex flex-col xl:flex-row xl:space-x-10 my-5 xl:mb-10">
            <div id="image-area" class="relative h-full">
                <img class="w-96" :src="this.artists.image ? this.artists.image : defaultImage">
                <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                    <button 
                        class="px-5 py-1 bg-red-700 text-white"
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
            
            <div class="space-y-5 xl:space-y-10 w-full">
                <div class="flex flex-col xl:flex-row xl:justify-between">
                    <div id="artists-name" class="flex flex-col w-full xl:mr-5 text-white mb-5 xl:mb-0">
                        <h1 class="text-white text-xl">Artist Name*</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-input autocomplete="false" type="text" v-model="artists.name" :value="artists.name" placeholder="Artist Name" name="artists-name" />
                    </div>
                    <div id="artists-type" class="flex flex-col w-full xl:ml-5 text-white mb-5 xl:mb-0">
                        <h1 class="text-white text-xl">Artist Type</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-select v-model="artists.type" id="artists-type-selector" :options="[
                            { value: 'SOLO', text: 'Soloist' },
                            { value: 'GROUP', text: 'Group' },
                        ]" ></t-select>
                    </div>
                </div>
                <div id="description">
                    <h1 class="text-white text-xl">Description</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <t-textarea id="desc" placeholder="Description" v-model="artists.description" :value="artists.description" name="my-textarea" class="resize w-full h-44"/>
                </div>
            </div>
        </div>

        <div id="group-member" class="flex flex-col text-white mb-5 xl:mb-10">
            <h1 class="text-xl">Members</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <multiselect
                v-model="artists.members" 
                tag-placeholder="Add this as new artists" 
                placeholder="Search or add a artists" 
                label="name" 
                track-by="id" 
                :options="artistList"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                :multiple="true" 
                :taggable="true"
                @tag="addMember">
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
        
        <div id="member-group" class="flex flex-col text-white mb-5 xl:mb-10">
            <h1 class="text-xl">Belong To The Groups</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <multiselect
                v-model="artists.groups" 
                tag-placeholder="Add this as new artists" 
                placeholder="Search or add a artists"
                label="name" 
                track-by="id" 
                :options="artistList" 
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="false"
                :multiple="true" 
                :taggable="true"
                @tag="addGroup">
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
        
        <div id="artist-styles" class="flex flex-col text-white mb-5 xl:mb-10">
            <h1 class="text-xl">Styles</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <multiselect
                v-model="artists.styles" 
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

        <div class="flex flex-col xl:flex-row xl:justify-between mb-5 xl:mb-10">
            <div id="social-media" class="flex flex-col w-full xl:mr-5 text-white mb-5 xl:mb-0">
                <h1 class="text-xl">Social Media Link</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in this.artists.socials" :key="index" :elem="elem" @updateinput="updateList(artists.socials, $event, index, 'socials')" @deleteinput="deleteList(artists.socials, index, 'socials')"/>
                <button @click="addSocials()" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
                    <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                </button>
            </div>
            <div id="streaming-platform" class="flex flex-col w-full xl:ml-5 text-white mb-5 xl:mb-0">
                <h1 class="text-xl">Streaming Platforms Link</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in this.artists.platforms" :key="index" :elem="elem" @updateinput="updateList(artists.platforms, $event, index, 'platforms')" @deleteinput="deleteList(artists.platforms, index, 'platforms')"/>
                <button @click="addStreamingLink()" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
                    <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                </button>
            </div>
        </div>

        <div id="source" class="flex flex-col w-full text-white mb-5 xl:mb-0">
            <h1 class="text-white text-xl">Source*</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <t-textarea id="source" placeholder="Source" v-model="source" name="my-textarea" class="resize w-full h-20"/>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        artistList:[],
        styleList:[],
        source:'',
        isUploadingImage: false,

        artists:{
          name:'',
          image:"https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
          type:'SOLO',
          website:null,
          description:null,
          socials:[],
          platforms:[],
          styles:[],
          groups:[],
          newGroups:[],
          members:[],
          newMembers:[],
        },

        oldArtistData:{},
        editToApi:{},
        oldDataToApi:{},
      }
    },

    async asyncData({ $axios}){
      const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists/full?sortby=name:asc')
      const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')
      return {artistList, styleList}
    },

    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },

      defaultImage(){
          return this.$store.state.imageArtistDefault
      },
    },

    methods:{
      async createArtist() {
        await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
          state:'PENDING',
          method:'POST',
          endpoint:`/artists`,
          body: this.artists,
          currentData: [],
          userId: this.userData.id,
          source: this.source
        }).then(response=>{
          this.$router.push({ path: `/artist`})
        })
      },

      addStyle (newTag) {
        const tag = {
          name: newTag,
        }
        if(this.artists.styles == null) {
            this.artists.styles = [tag]
        } else {
            this.artists.styles.push(tag)
        }
        this.styleList.push(tag)
      },
      
      addGroup (newTag) {
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
        this.artists.groups.push(tag)
        this.artists.newGroups.push(tag)
      },

      addMember (newTag) {
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
        this.artists.members.push(tag)
        this.artists.newMembers.push(tag)
      },

      updateList(list, newElem, index, key){
        list[index] = newElem
      },

      deleteList(list, index, key){
        list.splice(index, 1)
      },

      addStreamingLink(){
        if(this.artists.platforms == null) {
          this.artists.platforms = [""]
        } else {
          this.artists.platforms.push("")
        }
      },

      addSocials(){
        if(this.artists.socials == null) {
            this.artists.socials = [""]
        } else {
            this.artists.socials.push("")
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

          //let imageRef = this.$fire.storage.ref(`images/artist-${this.artists.id.replace(/\s/g, '')}`)
          let imageRef = this.$fire.storage.ref(`images/artist-${Date.now()}`)

          let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
              return snapshot.ref.getDownloadURL().then((url) => {
                  return url
              })
          }).catch((error) => {
              console.error(error)
          })
          uploadTask.then((url) => {
              this.artists.image = url
              this.isUploadingImage = false
          })
      },
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
