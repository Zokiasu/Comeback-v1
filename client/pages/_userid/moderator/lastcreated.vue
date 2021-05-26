<template>
    <div class="m-5">
        <ModeratorMenu/>
        <section id="page-body" class="p-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(update, index) in this.lastUpdate" :key="index" style="background-color: #6B728033" class="flex text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div class="mr-2">
                    <img :src="update.releases ? update.releases[0].image : update.image" class="w-20 h-20 object-cover" alt="">
                </div>
                <div class="flex flex-col justify-between" v-if="update.type === 'SINGLE' || update.type === 'ALBUM' || update.type === 'EP'">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/_userid/edit/release/${update.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img @click="removeRelease(update.id, artists[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Releases</span>
                    <span><span><NuxtLink :to="`/_userid/release/${update.id}`" target="_blank" class="hover:underline">{{update.name}}</NuxtLink></span> • <span v-for="(artist, index) in update.artists" :key="index"><NuxtLink :to="`/_userid/artist/${artist.id}`" target="_blank" class="hover:underline">{{artist.name}}</NuxtLink><span v-if="index < update.artists.length-1">, </span></span></span>
                    <span><span>{{(new Date(update.createdAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.createdAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
                <div class="flex flex-col justify-between" v-if="update.type === 'SOLO' || update.type === 'GROUP'">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/_userid/edit/artist/${update.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img @click="removeArtist(update.id, releases[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Artists</span>
                    <span><NuxtLink :to="`/_userid/artist/${update.id}`" target="_blank" class="hover:underline">{{update.name}}</NuxtLink></span>
                    <span><span>{{(new Date(update.createdAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.createdAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
                <div class="flex flex-col justify-between" v-if="!update.type">
                    <div class="flex absolute right-2 top-3 space-x-2">
                        <NuxtLink :to="`/_userid/edit/release/${update.releases[0].id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                        <img @click="removeMusic(update.id, musics[update.place], index)" class="cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                    <span class="font-semibold">Musics</span>
                    <span><NuxtLink :to="`/_userid/release/${update.releases[0].id}`" target="_blank" class="hover:underline">{{update.name}}</NuxtLink></span>
                    <span><span>{{(new Date(update.createdAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(update.createdAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
            </div>
        </section>
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
                    createdAt: element.createdAt,
                })
                this.lastUpdate['place'] = this.artists.indexOf(element)
            });
            this.releases.forEach(element => {
                this.lastUpdate.push({
                    id: element.id,
                    name: element.name,
                    image: element.image,
                    type: element.type,
                    artists: element.artists,
                    releases: element.releases,
                    createdAt: element.createdAt,
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
                    releases: element.releases,
                    createdAt: element.createdAt,
                })
                this.lastUpdate['place'] = this.musics.indexOf(element)
            });

            this.lastUpdate.sort(function(a,b){
                if(a.createdAt.toLowerCase() > b.createdAt.toLowerCase()) {return -1}
                if(a.createdAt.toLowerCase() < b.createdAt.toLowerCase()) {return 1}
                return 0;
            })
        },

        methods:{
            getData(){

            },

            async removeArtist(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/artists/${id}`, object).then(response=>{
                    console.log(response)
                    this.lastUpdate.splice(index, 1)
                })
            },

            async removeRelease(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${id}`, object).then(response=>{
                    console.log(response)
                    this.lastUpdate.splice(index, 1)
                })
            },

            async removeMusic(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/musics/${id}`, object).then(response=>{
                    console.log(response)
                    this.lastUpdate.splice(index, 1)
                })
            },
        },
    }
</script>