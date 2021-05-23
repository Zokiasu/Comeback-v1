<template>
    <div class="m-5">
        <ModeratorMenu/>
        <section id="page-body" class="bg-gray-500 bg-opacity-20 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(artist, index) in this.artists" :key="index" class="flex bg-white relative p-2 rounded-xl overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-500 px-2">{{index}}</span>
                <div class="mr-2">
                    <img :src="artist.releases ? artist.releases[0].image : artist.image" class="w-20 h-20 object-cover rounded-xl" alt="">
                </div>
                <div class="flex flex-col justify-between">
                    <div class="flex space-x-2 absolute right-2">
                        <NuxtLink :to="`/_userid/edit/artist/${artist.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/24/000000/edit--v1.png"/></NuxtLink>
                        <img @click="removeArtist(artist.id, releases[artist.place], index)" src="https://img.icons8.com/material-rounded/24/000000/delete-trash.png"/>
                    </div>
                    <span class="font-semibold text-xl"><NuxtLink :to="`/_userid/artist/${artist.id}`" target="_blank" class="hover:underline">{{artist.name}}</NuxtLink></span>
                    
                    <div class="flex space-x-2 my-1" v-if="artist.platforms">
                        <a v-for="(social, index) in artist.socials" :key="index" :href="social" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${social}`"/></a>
                    </div>
                    <div class="flex space-x-2 my-1" v-if="artist.platforms">
                        <a v-for="(platforms, index) in artist.platforms" :key="index" :href="platforms" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                    </div>
                    <span><span>{{(new Date(artist.createdAt)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} </span> - <span>{{(new Date(artist.createdAt)).toLocaleTimeString({ hour:'numeric', minute: 'numeric' })}}</span></span>
                </div>
            </div>
        </section>
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
            console.log(artists)
            return {artists}
        },

        methods:{
            async removeArtist(id, object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/artists/${id}`, object).then(response=>{
                    console.log(response)
                    this.artists.splice(index, 1)
                })
            },
        },
    }
</script>