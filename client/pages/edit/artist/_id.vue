<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-5 mb-2">Artist Edition</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <!--<NuxtLink :to="`/artist/${this.artist.id}`" @click="editArtist()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</NuxtLink>-->
        <button :to="`/artist/${this.artist.id}`" @click="editArtist()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div id="top" class="flex flex-col xl:flex-row xl:space-x-10 my-5 xl:mb-20">
        <div id="image-area" class="relative">
            <img class="w-80" :src="this.artist.image ? this.artist.image : this.$store.state.imageArtistDefault" alt="">
            <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                <button class="px-5 py-1 bg-red-700 text-white">Upload</button>
            </div>
        </div>
        <div class="space-y-10 w-full">
            <div class="flex flex-col xl:flex-row xl:space-x-10 space-y-10 xl:space-y-0">
                <div id="artist-name">
                    <h1 class="text-white text-xl">Artist Name*</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <t-input @change="newObjectToApi('name', artist.name)" autocomplete="false" type="text" v-model="artist.name" :value="artist.name" placeholder="Artist Name" name="artist-name" />
                </div>
                <div id="artist-name">
                    <h1 class="text-white text-xl">Artist Type</h1>
                    <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                    <t-select @change="newObjectToApi('type', artist.type)" v-model="artist.type" id="artist-type-selector" :options="[
                        { value: 'SOLOIST', text: 'Soloist' },
                        { value: 'GROUP', text: 'Group' },
                    ]" ></t-select>
                </div>
            </div>
            <div id="description">
                <h1 class="text-white text-xl">Description</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <t-textarea @change="newObjectToApi('description', artist.description)" id="desc" placeholder="Description" v-model="artist.description" :value="artist.description" name="my-textarea" class="resize w-full xl:w-4/5 h-44"/>
            </div>
        </div>
    </div>

    <div id="middle" class="flex flex-col xl:flex-row">
        <div id="social-media" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Social Media Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.artist.socials" :key="index" :elem="elem" @updateinput="updateList(artist.socials, $event, index, 'socials')"/>
            <button @click="newInput(artist.socials)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="streaming-platform" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Streaming Platforms Link</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.artist.platforms" :key="index" :elem="elem" @updateinput="updateList(artist.platforms, $event, index, 'platforms')"/>
            <button @click="newInput(artist.platforms)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="member-group" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Belong To The Groups</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.artist.groups" :key="index" :elem="elem.name" @updateinput="updateList(artist.groups, $event, index, 'groups')"/>
            <button @click="newInput(artist.groups)" class="text-left focus:outline-none">Add more</button>
        </div>
        <div id="group-member" class="flex flex-col text-white mb-5 xl:mb-0 xl:mr-5 2xl:mr-14">
            <h1 class="text-xl">Members</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <MultipleInput class="mb-1" v-for="(elem, index) in this.artist.members" :key="index" :elem="elem" @updateinput="updateList(artist.members, $event, index, 'members')"/>
            <button @click="newInput(artist.members)" class="text-left focus:outline-none">Add more</button>
        </div>
    </div>
  </div>
</template>

<script>
    export default {

        data() {
            return {
                artists:null,

                artist:{
                    id:'',
                    type:'',
                    name:'',
                    image:'',
                    website:'',
                    description:'',
                    socials:[],
                    platforms:[],
                    followers:[],
                    groups:[],
                    members:[],
                    events:[],
                    releases:[],
                },

                sendToApi:{},
            }
        },

        async asyncData({ $axios, params }){
            const artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
            return {artists}
        },

        mounted(){
            this.artist.id = this.artists.id
            this.artist.name = this.artists.name
            this.artist.image = this.artists.image
            this.artist.website = this.artists.website
            this.artist.description = this.artists.description
            this.artist.socials = this.artists.socials
            this.artist.platforms = this.artists.platforms
            this.artist.followers = this.artists.followers
            this.artist.groups = this.artists.groups
            this.artist.members = this.artists.members
            this.artist.events = this.artists.events
            this.artist.releases = this.artists.releases
        },

        methods:{
            updateList(list, newElem, index, key){
                list[index] = newElem
                this.newObjectToApi(key, list)
            },

            newInput(listToUpdate){
                listToUpdate.push('New')
            },

            newObjectToApi(key, value){
                this.sendToApi[key] = value
            },

            async editArtist() {
                const {data: response} = await this.$axios.put(`https://comeback-api.herokuapp.com/artists/${this.artist.id}`, this.sendToApi)
                
                this.$router.push({ path: `/artist/${this.artist.id}`})
            }
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
