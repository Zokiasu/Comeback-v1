<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5 relative">
    <div id="title-area">
        <NuxtLink :to="`/artist/${this.$route.params.id}`" class="absolute left-2 top-2"><img class="w-8 h-8" src="~/assets/image/arrow_back.png" alt=""></NuxtLink>
        <div id="tilte-artist" class="relative">
            <h1 class="text-white text-2xl xl:text-4xl mt-10 xl:mt-5 mb-2">Artist Edition</h1>
            <div id="divider" class="border-b-2 border-gray-100"></div>
            <button @click="editArtist()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
        </div>
    </div>
    <div class="rounded bg-gray-500 bg-opacity-20 p-10 mt-10">
        <div class="flex flex-col xl:flex-row xl:space-x-10 my-5 xl:mb-10">
            <div id="image-area" class="relative h-full">
                <img class="w-40" :src="this.artists.image ? this.artists.image : defaultImage">
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
            <div class="space-y-10 w-full">
                <div class="flex flex-col xl:flex-row xl:space-x-10 space-y-10 xl:space-y-0">
                    <div id="artists-name">
                        <h1 class="text-white text-xl">Artist Name*</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-input @change="newObjectToApi('name', artists.name)" autocomplete="false" type="text" v-model="artists.name" :value="artists.name" placeholder="Artist Name" name="artists-name" />
                    </div>
                    <div id="artists-type">
                        <h1 class="text-white text-xl">Artist Type</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-select @change="newObjectToApi('type', artists.type)" v-model="artists.type" id="artists-type-selector" :options="[
                            { value: 'SOLO', text: 'Soloist' },
                            { value: 'GROUP', text: 'Group' },
                        ]" ></t-select>
                    </div>
                </div>
                <div id="description">
                    <h1 class="text-white text-xl">Description</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <t-textarea @change="newObjectToApi('description', artists.description)" id="desc" placeholder="Description" v-model="artists.description" :value="artists.description" name="my-textarea" class="resize w-full xl:w-4/5 h-44"/>
                </div>
            </div>
        </div>

        <div id="group-member" class="flex flex-col text-white mb-5 xl:mb-10" v-if="artists.type == 'GROUP'">
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
                @input="newObjectToApi('members', artists.members)" 
                @tag="addMember">
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
                @input="newObjectToApi('groups', artists.groups)" 
                @tag="addGroup">
            </multiselect>
        </div>
        
        <div id="artist-styles" class="flex flex-col text-white mb-5 xl:mb-10">
            <h1 class="text-xl">Styles</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <multiselect
                v-model="artists.styles" 
                tag-placeholder="Add this as new style" 
                placeholder="Search or add a style"
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
                artists:{},
                oldArtistData:{},
                artistList:[],
                styleList:[],
                editToApi:{},
                oldDataToApi:{},
                source:'',
                isUploadingImage: false,
            }
        },

        async asyncData({ $axios, params }){
            const artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')

            artists["newGroups"] = []
            artists["newMembers"] = []

            return {artists, artistList}
        },

        mounted(){
            this.oldArtistData = JSON.parse(JSON.stringify(this.artists))
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
            async editArtist() {
                this.oldDataToApi['name'] = this.oldArtistData['name']
                this.oldDataToApi['image'] = this.oldArtistData['image']
                await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                    state:'PENDING',
                    method:'PUT',
                    endpoint:`/artists/${this.$route.params.id}`,
                    body: this.editToApi,
                    currentData: this.oldArtistData,
                    userId: this.userData.id,
                    source: this.source
                }).then(response=>{
                    //console.log(response)
                    this.$router.push({ path: `/artist/${this.$route.params.id}`})
                })
            },

            addStyle (newTag) {
                if(this.artists.styles == null) {
                    this.artists.styles = [newTag]
                } else {
                    this.artists.styles.push(newTag)
                }
                this.newObjectToApi('styles', this.artists.styles)
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
                this.newObjectToApi('newGroups', this.artists.newGroups)
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
                this.newObjectToApi('newMembers', this.artists.newMembers)
            },

            updateList(list, newElem, index, key){
                list[index] = newElem
                this.newObjectToApi(key, list)
            },

            deleteList(list, index, key){
                list.splice(index, 1)
                this.newObjectToApi(key, list)
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

            newObjectToApi(key, value){
                this.editToApi[key] = value
                this.oldDataToApi[key] = this.oldArtistData[key]
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
                let imageRef = this.$fire.storage.ref(`images/artist-${this.artists.id}`)

                let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                    return snapshot.ref.getDownloadURL().then((url) => {
                        return url
                    })
                }).catch((error) => {
                    console.error('Error uploading image', error)
                })
                uploadTask.then((url) => {
                    this.newObjectToApi("image", url)
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
