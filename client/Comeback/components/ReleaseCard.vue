<template>
  <div v-if="computer" class="texts flex flex-col text-white">
    <div class="relative">
        <img class="rounded-md object-cover" src="https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg" alt="Artist Picture"/>
        <div class="absolute top-0 right-0 text-white bg-gray-500 bg-opacity-80 p-2 rounded-bl">
            <p class="text-center">6PM (KST)</p>
        </div>
    </div>
    <div>
        <span class="font-semibold">Yellow</span>
        <div class="flex text-xs md:text-sm">
            <span>Album</span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span>Kang Daniel</span>
        </div>
    </div>
  </div>

  <div v-else style="background-color: #3B3B3B" class="texts text-white flex rounded relative">
    <div>
        <img class="h-16 w-16 rounded-l bg-green-500 object-cover" src="https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg" alt="Artist Picture"/>
    </div>
    <div class="px-5 col-start-2 col-end-4">
        <div class="flex py-1.5">
            <span class="font-semibold">Yellow</span>
            <span class="text-center font-semibold text-sm absolute right-0 top-0 text-white py-1 px-2 rounded-bl rounded-tr shadow-2xl">6PM (KST)</span>
        </div>
        <div class="flex text-sm">
            <span>Album</span><div class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div><span>Kang Daniel</span>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['computer'],

        data(){
            return {
                hello: false,
                width: 0,
            }
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth;
            },
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