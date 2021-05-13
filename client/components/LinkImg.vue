<template>
    <div class="text-white flex space-x-1.5">
        <div class="mt-1">
            <img :src="urls">
        </div>
        <a :href="url" target="_blank" class="hover:text-red-700"> {{name}} </a>
    </div>
</template>

<script>
    export default {

        props:['url', 'name'],

        data(){
            return {
                urls: '',
            }
        },

        created(){
            this.urls = "https://www.google.com/s2/favicons?domain=" + this.url
        },
    }
</script>