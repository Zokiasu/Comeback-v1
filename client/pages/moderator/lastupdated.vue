<template>
    <div class="px-5">
        <ModeratorMenu/>
        <section v-if="lastUpdate.length > 0" id="page-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(update, index) in this.lastUpdate.slice(0,maxObjectDisplay)" :key="index" style="background-color: #6B728033" class="flex text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div id="image" class="mr-2">
                    <img :src="update.image ? update.image : require(`~/assets/image/artist.png`)" class="w-20 h-20 object-cover" :alt="update.name">
                </div>
                <div id="release" class="flex flex-col justify-between" v-if="update.type === 'SINGLE' || update.type === 'ALBUM' || update.type === 'EP'">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/edit/release/${update.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img v-if="adminCheck" @click="removeRelease(update.id, artists[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Releases (id: {{update.id}})</span>
                    <span><span><NuxtLink :to="`/release/${update.id}`" target="_blank" class="hover:underline">{{update.name}}</NuxtLink></span> • <span v-for="(artist, index) in update.artists" :key="index"><NuxtLink :to="`/artist/${artist.id}`" target="_blank" class="hover:underline">{{artist.name}}</NuxtLink><span v-if="index < update.artists.length-1">, </span></span></span>
                    <span><span>{{(new Date(update.updatedAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.updatedAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
                <div id="artist" class="flex flex-col justify-between" v-if="update.type === 'SOLO' || update.type === 'GROUP'">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/edit/artist/${update.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img @click="removeArtist(update.id, releases[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Artists (id: {{update.id}})</span>
                    <span><NuxtLink :to="`/artist/${update.id}`" target="_blank" class="hover:underline">{{update.name}}</NuxtLink></span>
                    <span><span>{{(new Date(update.updatedAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.updatedAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
                <div class="flex flex-col justify-between" v-if="!update.type">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/release/${update.release.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img @click="removeMusic(update.id, musics[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Musics (id: {{update.id}})</span>
                    <NuxtLink :to="`/release/${update.release.id}`" target="_blank" class="hover:underline">{{update.release.name}}</NuxtLink>
                    <span><span>{{(new Date(update.release.updatedAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.release.updatedAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
            </div>
        </section>
        <div v-if="maxObjectDisplay < this.lastUpdate.length" class="w-full flex justify-center">
            <button @click="maxObjectDisplay = maxObjectDisplay + 20">More</button>
        </div>
        <div v-if="lastUpdate.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Updated found.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'LastUpdate',

        data() {
            return {
                artists: [],
                releases: [],
                musics: [],
                lastUpdate: [],
                maxObjectDisplay:20
            }
        },

        async asyncData({ $axios }){
            let artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists?sortby=id:asc`)
            let releases = await $axios.$get(`https://comeback-api.herokuapp.com/releases?sortby=id:asc`)
            let musics = await $axios.$get(`https://comeback-api.herokuapp.com/musics?sortby=id:asc`)
            return {artists, releases, musics}
        },

        mounted(){
            this.artists.forEach(element => {
                    this.lastUpdate.push({
                        id: element.id,
                        name: element.name,
                        image: element.image,
                        type: element.type,
                        artists: element.artists,
                        releases: element.releases,
                        updatedAt: element.updatedAt,
                    })
                    this.lastUpdate['place'] = this.artists.indexOf(element)
            });
            this.releases.forEach(async element => {
                this.lastUpdate.push({
                    id: element.id,
                    name: element.name,
                    image: element.image,
                    type: element.type,
                    artists: element.artists,
                    releases: element.releases,
                    updatedAt: element.updatedAt,
                })
                this.lastUpdate['place'] = this.releases.indexOf(element)
            });
            this.musics.forEach(element => {
                this.lastUpdate.push({
                    id: element.id,
                    name: element.name,
                    image: element.image,
                    type: element.type,
                    artists: element.artists,
                    release: element.release,
                    updatedAt: element.updatedAt,
                })
                this.lastUpdate['place'] = this.musics.indexOf(element)
            });
            this.lastUpdate.sort(function(a,b){
                if(a.updatedAt.toLowerCase() > b.updatedAt.toLowerCase()) {return -1}
                if(a.updatedAt.toLowerCase() < b.updatedAt.toLowerCase()) {return 1}
                return 0;
            })
        },
    
        computed: {
            userId(){
                let utmp = this.$store.state.dataUser
return utmp.id
            },

            adminCheck(){
                return this.adminChecker()
            },
        },

        methods:{
            async removeArtist(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/artists/${id}`, object).then(response=>{
                    
                    this.lastUpdate.splice(index, 1)
                })
            },

            async removeRelease(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${id}`, object).then(response=>{
                    
                    this.lastUpdate.splice(index, 1)
                })
            },

            async removeMusic(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/musics/${id}`, object).then(response=>{
                    
                    this.lastUpdate.splice(index, 1)
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