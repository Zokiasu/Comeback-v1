<template>
    <div class="px-5">
        <section id="releases-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(release, index) in this.releases" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div class="flex absolute right-2 top-3 space-x-2">
                    <NuxtLink :to="`/${userId}/edit/release/${release.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                    <img v-if="adminCheck" class="cursor-pointer" @click="removeRelease(release.id, releases[release.place], index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                </div>
                <div class="flex space-x-2">
                    <img :src="release.releases ? release.releases[0].image : release.image" class="w-20 h-20 object-cover" alt="">
                    <div class="flex flex-col -mt-1">
                        <div class="flex space-x-2 mb-1.5">
                            <span class="font-semibold text-lg"><NuxtLink :to="`/${userId}/release/${release.id}`" target="_blank" class="hover:underline">{{release.name}}</NuxtLink></span>
                        </div>
                        <div class="mb-1.5">
                            <span>{{((release.type).charAt(0).toUpperCase() + (release.type).slice(1))}} </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(platforms, index) in release.platforms" :key="index" :href="platforms" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                            <span v-if="release.platforms" class="text-red-500"> No Streaming Platforms </span>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <span v-for="(style, index) in release.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style}} </span>
                    <span v-if="!release.styles" class="text-red-500"> No styles </span>
                </div>
                <span class="font-semibold text-gray-400">Artists :</span>
                <div class="mb-5">
                    <span v-for="(artist, index) in release.artists" :key="index" class="rounded">{{artist.name}}<span v-if="index < release.artists.length-1">, </span></span>
                    <span v-if="!release.artists" class="text-red-500"> No Artists </span>
                </div>
                <span class="font-semibold text-gray-400">Tracklist :</span>
                <div class="grid grid-cols-2">
                    <span v-for="(music, index) in release.musics" :key="index" class="rounded">{{music.name}}</span>
                    <span v-if="release.musics.length < 1" class="text-red-500"> No Musics </span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'ReleaseList',

        data() {
            return {
                releases: [],
            }
        },

        async asyncData({ $axios }){
            let releases = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=id:asc`)
            return {releases}
        },
    
        computed: {
            userId(){
                return this.$route.params.userid
            },

            adminCheck(){
                return this.adminChecker()
            }
        },

        methods:{
            async removeRelease(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${id}`, object).then(response=>{
                    //console.log(response)
                    this.releases.splice(index, 1)
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