<template>
  <div class="texts flex flex-col text-white">
    <div class="relative">
        <router-link :to="`/release/${release.releaseID}`"><img class="rounded-md object-cover" :src="release.releasePicture" alt="Artist Picture"/></router-link>
        <div class="absolute top-0 right-0 text-white bg-gray-500 bg-opacity-80 p-2 rounded-bl">
            <p class="text-center"> {{release.releaseDate.toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}} </p>
        </div>
    </div>
    <div>
        <span class="font-semibold"> {{release.releaseName}} </span>
        <div class="flex text-xs md:text-sm">
            <span> {{release.releaseType}} </span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span> {{release.releaseArtist}} </span>
        </div>
    </div>
  </div>
</template>

<script>
    export default {

        props: ['release'],

        data(){
            return {
                
            }
        },

        methods: {
            
        },
    }
</script>

<style>
.texts {
  font-family:
    'Sarala'
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  letter-spacing: 1px;
}
</style>