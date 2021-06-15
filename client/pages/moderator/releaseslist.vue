<template>
    <div class="px-5">
        <section v-if="releases.length > 0" id="releases-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(release, index) in this.releases" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2 z-50">{{index}}</span>
                <div class="flex 2xl:absolute mb-2 2xl:mb-0 right-2 top-3 space-x-2">
                    <NuxtLink :to="`/edit/release/${release.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                    <img v-if="adminCheck" class="cursor-pointer" @click="removeRelease(release.id, releases[release.place], index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                </div>
                <div class="flex space-x-2">
                    <img :src="release.releases ? release.releases[0].image : release.image" class="w-20 h-20 object-cover" alt="">
                    <div class="flex flex-col -mt-1">
                        <div class="flex space-x-2 mb-1.5">
                            <span class="font-semibold text-lg"><NuxtLink :to="`/release/${release.id}`" target="_blank" class="hover:underline">{{release.name}}</NuxtLink></span>
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
                    <span v-for="(style, index) in release.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style.name}} </span>
                    <span v-if="!release.styles" class="text-red-500"> No styles </span>
                </div>
                <span class="font-semibold text-gray-400">Artists :</span>
                <div class="mb-5">
                    <span v-for="(artist, index) in release.artists" :key="index" class="rounded">{{artist.name}}<span v-if="index < release.artists.length-1">, </span></span>
                    <span v-if="!release.artists" class="text-red-500"> No Artists </span>
                </div>
                <span class="font-semibold text-gray-400">Tracklist :</span>
                <v-read-more-box bg-color="#6B728033">
                    <button slot="readMore" class="focus:outline-none font-semibold mt-2">SHOW MORE</button>
                    <button slot="readLess" class="focus:outline-none font-semibold mt-2">SHOW LESS</button>
                    <div class="grid grid-cols-1 gap-y-1">
                        <span v-for="(music, index) in release.musics" :key="index" class="rounded truncate text-sm">{{music.name}}</span>
                        <span v-if="release.musics.length < 1" class="text-red-500"> No Musics </span>
                    </div>
                </v-read-more-box>
            </div>
        </section>
        <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
        <!--<div v-if="maxObjectDisplay < this.releases.length" class="w-full flex justify-center mb-5 text-white">
            <button @click="maxObjectDisplay = maxObjectDisplay + 20">More</button>
        </div>-->
        <div v-if="releases.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Release found.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ReleaseList',

        data() {
            return {
                search: '',
                releases: [],
                maxObjectDisplay: 20,
                enough: false,
            }
        },

        /*async asyncData({ $axios }){
            let releases = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=name:asc`)

            releases?.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                if(a.name.toLowerCase() < b.name.toLowerCase()) {return 1}
                return 0;
            })

            return {releases}
        },*/
    
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
            infiniteScroll($state) {
                let artTmp = []
                setTimeout(() => {
                    artTmp = artTmp.concat(this.releases)
                    this.$axios.get(`https://comeback-api.herokuapp.com/releases?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`).then(response => {
                        if(response.data.length > 0) {
                            artTmp = artTmp.concat(response.data)
                            this.releases = [...new Set(artTmp)]
                            this.maxObjectDisplay = this.maxObjectDisplay + 20
                            $state.loaded();
                        } else {
                            console.log("response < 0 V2")
                            this.enough = true
                            $state.complete();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }, 500);
            },

            removeRelease(id, object, index){
                this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${id}`, object)
                .then(response=>{
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