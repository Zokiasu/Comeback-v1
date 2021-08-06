<template>
    <div class="text-white">
        <div class="background-top relative" :style="{ 'background-image': 'url(' + user.avatar + ')' }">
            <div class="h-full w-full bg-background bg-opacity-30 flex">
                <div class="flex lg:space-x-10 mt-auto lg:my-auto w-full px-5 md:px-10 lg:px-20 z-50">
                    <div class="relative releaseJacket">
                        <img class="h-80 w-80 rounded shadowRelease object-cover object-center" :src="user.avatar" :alt="user.avatar"/>
                    </div>
                    <div class="mt-auto">
                        <NuxtLink v-if="user.id == this.$route.params.id" :to="`/edit/release/${$route.params.id}`" class="mt-auto">Edit</NuxtLink>
                        <h1 class="cursor-default font-semibold filter tShadowRelease text-4xl lg:text-6xl">{{user.username}}</h1>
                    </div>
                </div>
                <div class="gradient w-full h-32 font-bold absolute bottom-0"></div>
            </div>
        </div>
        <section>
            <div class="px-10">
                <ul class="grid grid-cols-4 text-xl">
                    <li @click="actualPage = 'General'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage == 'General' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">General</li>
                    <li @click="actualPage = 'Artist'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage == 'Artist' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Artist</li>
                    <li @click="actualPage = 'Release'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage == 'Release' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Release</li>
                    <li @click="actualPage = 'Stats'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage == 'Stats' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Stats</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        head() {
            return {
                title: this.user.username,
            }
        },

        data() {
            return {
                user: null,
                actualPage: 'General'
            }
        },

        async asyncData({ $axios, params }){
            const user = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/full`)
            return {user}
        },

        methods:{
            ...mapGetters([
                'GET_DATA_USER',
            ]),
        },
    }
</script>

<style>
@media screen and (max-width: 1024px) {
    .releaseJacket {
        display: none !important;
    }
}

.tShadowRelease{
    text-shadow: 2px 2px 5px rgba(0,0,0,0.50);
}

.shadowRelease{
    --tw-shadow: 5px 5px 5px 5px rgba(0,0,0,0.30);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.background-top{
    height: 30rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-position: 50% 25%;
}
.gradient{
    background: rgb(0,0,0);
    background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#1f1d1d",GradientType=1);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>