<template>
  <div style="background-color: #3B3B3B" class="texts text-white flex rounded relative">
    <div>
        <img class="h-full w-16 rounded-l object-cover" :src="release.releasePicture" alt="Artist Picture"/>
    </div>
    <div class="col-start-2 col-end-4 w-full pl-2 py-2">
        <div class="flex justify-between w-full">
            <span class="font-semibold">{{release.releaseName}}</span>
            <span class="text-center font-semibold text-sm text-white bg-gray-500 py-1 px-2 shadow-2xl">{{release.releaseDate.toLocaleTimeString('en-US', { hour:'numeric', minute:'numeric' })}}</span>
        </div>
        <div class="flex text-sm">
            <span>{{release.releaseType}} • {{release.releaseArtist}}</span>
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