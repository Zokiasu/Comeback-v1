<template>
    <div class="px-5">
        <section v-if="artists.length > 0" id="page-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(artist, index) in this.artists" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div class="flex absolute right-2 top-3 space-x-2">
                    <NuxtLink :to="`/edit/artist/${artist.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                    <img v-if="adminCheck" class="cursor-pointer" @click="removeArtist(artist, index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                </div>
                <div class="flex space-x-2 mb-2">
                    <img :src="artist.releases ? artist.releases[0].image : artist.image" class="w-20 h-20 object-cover" alt="">
                    <div class="flex flex-col justify-between">
                        <div class="flex space-x-2">
                            <span class="font-semibold text-xl"><NuxtLink :to="`/artist/${artist.id}`" target="_blank" class="hover:underline">{{artist.name}}</NuxtLink> -</span>
                            <span class="text-base mt-1">{{((artist.type).charAt(0).toUpperCase() + (artist.type).slice(1))}} </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(social, index) in artist.socials" :key="index" :href="social" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${social}`"/></a>
                            <span v-if="!artist.socials" class="text-red-500"> No Social Media </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(platforms, index) in artist.platforms" :key="index" :href="platforms" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                            <span v-if="!artist.platforms" class="text-red-500"> No Streaming Platforms </span>
                        </div>
                    </div>
                </div>
                <div>
                    <span v-for="(style, index) in artist.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style}} </span>
                    <span v-if="!artist.styles" class="text-red-500"> No styles </span>
                </div>
                <div>
                    <span v-if="artist.description" class="truncate hover:overflow-ellipsis break-words overflow-wrap block"> {{artist.description}} </span>
                    <span v-if="!artist.description" class="text-red-500"> No description </span>
                </div>
            </div>
        </section>
        <div v-if="artists.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Artist found.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ArtistList',

        data() {
            return {
                artists: [],
            }
        },

        async asyncData({ $axios }){
            let artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists?sortby=id:asc`)
            return {artists}
        },
    
        computed: {
            userId(){
                let utmp = this.$store.state.dataUser
return utmp.id
            },

            adminCheck(){
                return this.adminChecker()
            }
        },

        methods:{
            async removeArtist(object, index){await this.$axios.delete(`https://comeback-api.herokuapp.com/artists/${object.id}`, object).then(response=>{
                    //console.log(response)
                    this.$toast.error(this.artists[index].name + ' has been deleted', {duration:2000, position:'top-right'})
                    this.artists.splice(index, 1)
                })
            },

            async adminChecker(){
                let that = this
                await this.$fire.auth.onAuthStateChanged(async function (user) {
                    if (user != null) {
                        let userData = await that.$axios.$get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
                        if(userData.role != "NONE") {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                })
            },
        },
    }
</script>