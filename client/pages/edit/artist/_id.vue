<template>
  <div class="p-2 xl:px-5 2xl:px-10 xl:py-5">
    <div id="title-area">
        <NuxtLink :to="`/artist/${this.$route.params.id}`" class="absolute left-2 top-2"><img class="w-8 h-8" src="~/assets/image/arrow_back.png" alt=""></NuxtLink>
      <div id="tilte-artist" class="relative">
        <h1 class="text-white text-2xl xl:text-4xl mt-10 xl:mt-5 mb-2">Artist Edition</h1>
        <div id="divider" class="border-b-2 border-gray-100"></div>
        <button :to="`/artist/${this.$route.params.id}`" @click="editArtist()" class="absolute right-0 xl:right-5 top-0 px-5 py-1 bg-red-700 text-white rounded">Confirm</button>
      </div>
    </div>

    <div class="rounded bg-gray-500 bg-opacity-20 p-10 mt-10">
        <div class="flex flex-col xl:flex-row xl:space-x-10 my-5 xl:mb-10">
            <div id="image-area" class="relative h-full">
                <img style="width:60rem;" :src="this.artists.image ? this.artists.image : this.$store.state.imageArtistDefault" alt="">
                <div class="my-5 xl:my-0 xl:absolute xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                    <button class="px-5 py-1 bg-red-700 text-white">Upload</button>
                </div>
            </div>
            <div class="space-y-10 w-full">
                <div class="flex flex-col xl:flex-row xl:space-x-10 space-y-10 xl:space-y-0">
                    <div id="artists-name">
                        <h1 class="text-white text-xl">Artist Name*</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-input @change="newObjectToApi('name', artists.name)" autocomplete="false" type="text" v-model="artists.name" :value="artists.name" placeholder="Artist Name" name="artists-name" />
                    </div>
                    <div id="artists-name">
                        <h1 class="text-white text-xl">Artist Type</h1>
                        <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                        <t-select @change="newObjectToApi('type', artists.type)" v-model="artists.type" id="artists-type-selector" :options="[
                            { value: 'SOLOIST', text: 'Soloist' },
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
                :multiple="true" 
                :taggable="true"
                @input="newObjectToApi('members', artists.members)" 
                @tag="addMember">
            </multiselect>
        </div>
        
        <div id="member-group" class="flex flex-col text-white mb-5 xl:mb-10">
            <h1 class="text-xl">Belong To The Groups</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div><multiselect
                v-model="artists.groups" 
                tag-placeholder="Add this as new artists" 
                placeholder="Search or add a artists" 
                label="name" 
                track-by="id" 
                :options="artistList" 
                :multiple="true" 
                :taggable="true"
                @input="newObjectToApi('groups', artists.groups)" 
                @tag="addGroup">
            </multiselect>
        </div>

        <div class="flex flex-col xl:flex-row xl:justify-between">
            <div id="social-media" class="flex flex-col w-full xl:mr-5 text-white mb-5 xl:mb-0">
                <h1 class="text-xl">Social Media Link</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in this.artists.socials" :key="index" :elem="elem" @updateinput="updateList(artists.socials, $event, index, 'socials')"/>
                <button @click="newInput(artists.socials)" class="text-left focus:outline-none">Add more</button>
            </div>
            <div id="streaming-platform" class="flex flex-col w-full xl:ml-5 text-white mb-5 xl:mb-0">
                <h1 class="text-xl">Streaming Platforms Link</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in this.artists.platforms" :key="index" :elem="elem" @updateinput="updateList(artists.platforms, $event, index, 'platforms')"/>
                <button @click="newInput(artists.platforms)" class="text-left focus:outline-none">Add more</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {

        data() {
            return {
                artists:{},
                artistList:[],
                sendToApi:{},
            }
        },

        async asyncData({ $axios, params }){
            const artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')

            artists["newGroups"] = []
            artists["newMembers"] = []

            return {artists, artistList}
        },

        methods:{
            addGroup (newTag) {
                const tag = {
                    name: newTag,
                    image: null,
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                }
                this.release.newGroups.push(tag)
            },

            addMember (newTag) {
                const tag = {
                name: newTag,
                image: null,
                website: null,
                description: null,
                socials: null,
                platforms: null,
                }
                this.release.newMembers.push(tag)
            },

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
                const {data: response} = await this.$axios.put(`https://comeback-api.herokuapp.com/artists/${this.$route.params.id}`, this.sendToApi)
                
                this.$router.push({ path: `/artist/${this.$route.params.id}`})
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
