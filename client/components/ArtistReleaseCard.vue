<template>
    <div class="bg-red-700 flex px-3 py-2 space-x-3 text-white rounded">
    <div>
        <img class="mt-1.5 w-16 h-16 object-cover rounded" :src="this.$store.state.artistList[this.$route.params.id].picture">
    </div>
    <div class="space-y-3">
        <div class="flex flex-col">
        <span class="text-base font-semibold">Release Name</span>
        <span class="text-xs">01/10/1970</span>
        </div>
        <div class="flex space-x-3">
        <a href="#" target="_blank"><img class="w-4" src="https://open.spotify.com/favicon.ico"/></a>
        <a href="#" target="_blank"><img class="w-4" src="https://music.youtube.com/favicon.ico"/></a>
        <a href="#" target="_blank"><img class="w-4" src="https://soundcloud.com/favicon.ico"/></a>
        </div>
    </div>
    </div>
</template>

<script>
    export default {

        props:['release'],

        data(){
            return {
                name:'',
                date:'',
                link:[],
            }
        },

        created(){
            /*if(this.release.name) this.name = this.release.name
            if(this.release.name) this.date = this.release.name
            if(this.release.name) this.link = this.release.name*/
        },
    }
</script>