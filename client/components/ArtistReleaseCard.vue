<template>
    <NuxtLink :to="`/release/${this.release.id}`">
        <div class="bg-red-700 flex px-3 py-2 space-x-3 text-white rounded">
            <div>
                <img class="mt-1.5 w-16 h-16 object-cover rounded" :src="this.release.image ? this.release.image : this.$store.state.imageReleaseDefault">
            </div>
            <div class="space-y-3">
                <div class="flex flex-col">
                <span class="text-base font-semibold">{{this.release.name}}</span>
                <span class="text-xs">{{new Date(this.release.date).toLocaleDateString()}}</span>
                </div>
                <div class="flex space-x-3">
                    <a v-for="(platforms, index) in this.release.platforms" :key="index" href="#" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                </div>
            </div>
        </div>
    </NuxtLink>
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
    }
</script>