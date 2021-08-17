<template>
    <div class="bg-black-four flex p-2 space-x-2 text-white rounded">
        <div class="my-auto w-20">
            <img class="my-auto object-cover rounded" :src="this.release.image ? this.release.image : defaultImage">
        </div>
        <div class="flex flex-col w-full">
            <div class="flex flex-col">
                <NuxtLink :to="`/release/${this.release.id}`"><span class="text-base font-semibold hover:text-red-700">{{this.release.name}}</span></NuxtLink>
                <div class="flex space-x-1 text-xs">
                    <span>{{this.release.type}}</span>
                    <span>-</span>
                    <span>{{new Date(this.release.date).toLocaleDateString()}}</span>
                </div>
            </div>
            <div class="flex space-x-3 my-auto">
                <a v-for="(platforms, index) in this.release.platforms" :key="index" :href="platforms" target="_blank">
                    <img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        props:['release', 'imageDefault'],

        data(){
            return {
                id: null,
                name: null,
                date: null,
                image: null,
                link: [],
            }
        },

        created(){
            if(this.release.id) this.id = this.release.id
            if(this.release.name) this.name = this.release.name
            if(this.release.date) this.date = new Date(this.release.date).toLocaleDateString()
            if(this.release.image) {this.image = this.release.image} else {this.image = this.imageDefault}
            if(this.release.platforms) this.link = this.release.platforms
        },
    
        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
            
            defaultImage(){
                return this.$store.state.imageReleaseDefault
            },
        }
    }
</script>