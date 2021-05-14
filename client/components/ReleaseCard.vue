<template>
  <div v-if="width" class="texts flex flex-col text-white">
    <div class="relative">
        <NuxtLink :to="`/release/${release.releaseID}`"><img class="rounded-md object-cover" :src="release.releasePicture" alt="Artist Picture"/></NuxtLink>
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

  <div v-else-if="!width" style="background-color: #3B3B3B" class="texts text-white flex rounded relative">
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

        props: ['release', 'width'],

        data(){
            return {
              
            }
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