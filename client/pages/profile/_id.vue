<template>
    <div>
        <div class="background-top relative" :style="{ 'background-image': 'url(' + release.image + ')' }">
            <div class="h-full w-full bg-background bg-opacity-30 flex">
                <div class="flex lg:space-x-10 mt-auto lg:my-auto w-full px-5 md:px-10 lg:px-20 z-50">
                    <div class="relative releaseJacket">
                        <img class="h-80 w-80 shadowRelease object-cover object-center" :src="release.image" :alt="release.name"/>
                        <div v-if="user != null" id="button" class="absolute right-0 top-0">
                            <button @click="liked ? unfollowArtist() : followArtist()" :class="liked ? '':''" class="flex space-x-0.5 px-2 focus:outline-none rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <svg v-if="!liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>
                                <svg v-if="liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667z"></path></g></g></svg>
                            </button>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <NuxtLink v-if="user != null" :to="`/edit/release/${$route.params.id}`" class="mt-auto">Edit</NuxtLink>
                        <h2 class="cursor-default font-semibold filter tShadowRelease text-2xl">{{release.type}} - <span v-for="(artist, index) in release.artists" :key="index"><NuxtLink :to="`/artist/${artist.id}`" class="hover:underline cursor-pointer">{{artist.name}}</NuxtLink><span v-if="index < release.artists.length-1">, </span></span></h2>
                        <h1 class="cursor-default font-semibold filter tShadowRelease text-4xl lg:text-6xl">{{release.name}}</h1>
                        <div id="link-social" class="flex flex-row lg:space-x-10 pt-3">
                            <LinkImg class="tShadowRelease" v-for="(platforms, index) in release.platforms" :key="index" :url="platforms" :name="platforms"/>
                        </div>
                    </div>
                </div>
                <div class="gradient w-full h-32 font-bold absolute bottom-0"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: this.user.name,
            }
        },

        data() {
            return {
                user: null,
            }
        },

        async asyncData({ $axios, params }){
            const user = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/all`)
            return {user}
        },
    }
</script>