<template>
    <div>
        <div class="h-96 relative">
            <img class="h-full relative w-full object-cover object-center " :src="this.release.image ? this.release.image : defaultImage" alt="Artist Picture"/>
            <div class="gradient w-full h-32 font-bold text-white absolute bottom-0"></div>
            <div class="absolute bottom-5 px-5 lg:flex md:justify-between text-white text-2xl w-full">
                <div class="flex space-x-2">
                    <span><span v-for="(artist, index) in this.release.artists" :key="index"><NuxtLink :to="`/artist/${artist.id}`" class="hover:underline">{{artist.name}}</NuxtLink><span v-if="index < release.artists.length-1">, </span></span> • {{this.release.name}}</span>
                    <div v-if="this.release.styles" class="space-x-1.5 text-sm mt-2.5">
                        <span v-for="(style, index) in this.release.styles" :key="index" class="bg-gray-500 text-white p-1 px-2 rounded">{{style}}</span>
                    </div>
                </div>
                <span>{{(new Date(this.release.date)).toLocaleDateString({ day:'numeric', month: 'numeric', year:'numeric' })}} • {{this.release.type.charAt(0).toUpperCase() + this.release.type.slice(1).toLowerCase() }}</span>
            </div>
        </div>
        <div class="relative px-5 py-5">
            <div id="button" class="my-5 md:my-0 md:absolute right-5 top-5 flex space-x-2">
                <button @click="liked ? unfollowRelease() : followRelease()" :class="liked ? 'bg-red-500 text-white border-red-500 hover:border-white hover:bg-transparent':'text-red-500 border-red-500'" class="flex space-x-0.5 px-2 border focus:outline-none rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                    <svg v-if="!liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ef4444"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>
                    <svg v-if="liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667z"></path></g></g></svg>
                    <!--<span class="mt-1">{{liked ? 'Unlike':'Like'}}</span>-->
                </button>
                <NuxtLink :to="`/edit/release/${this.release.id}`" class="py-1 text-white border border-white hover:bg-white hover:text-black hover:border-black focus:outline-none px-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Edit</NuxtLink>
            </div>
            <div v-if="this.release.platforms && this.release.platforms.length > 0" id="tilte-artist" class="mb-10">
                <h1 class="text-white text-xl">Streaming Platforms</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10">
                    <LinkImg v-for="(platforms, index) in this.release.platforms" :key="index" :url="platforms" :name="platforms"/>
                </div>
            </div>
            <div v-if="this.release.musics && this.release.musics.length > 0" id="tracklist" class="mb-10">
                <h1 class="text-white text-xl">Tracklist</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                <div id="link-social" class="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300 md:w-1/2">
                    <div v-for="(title, index) in this.release.musics" :key="index"><span> {{title.name}} </span></div>
                </div>
            </div>
            <div v-if="this.videoId.length > 0" id="player-section" class="mb-10">
                <h1 class="text-white text-xl">Music Video</h1>
                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-5 w-96"></div>
                <div id="video" class="grid grid-cols-1 gap-5 justify-center" :class="this.videoId.length > 1 ? 'xl:grid-cols-2' : ''">
                    <iframe class=" justify-self-center" v-for="(clip, index) in this.videoId" :key="index" width="560" height="315" :src="clip" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                release: null,
                videoId: [],
                liked:false,
            }
        },

        head() {
            return {
                title: this.release.name,
            }
        },

        async asyncData({ $axios, params }){
            const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
            return {release}
        },

        async mounted(){
            for (let index = 0; index < this.release.musics?.length; index++) {
                let x = this.getYoutubeId(this.release.musics[index].clip)
                if(x != null) this.videoId.push(x)
            }
            let that = this
            /*await this.$axios.get(`https://comeback-api.herokuapp.com/users/${this.userData.id}`).then(res => {
                res.data.releases.forEach(element => {
                    if(element.id == that.release.id) that.liked = true
                });
            })*/
            
            this.userData.releases.forEach(element => {
                if(element.id == that.release.id) that.liked = true
            });
        },
    
        computed: {    
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },

            defaultImage(){
                return this.$store.state.imageReleaseDefault
            },

            like(){
                return this.liked
            }
        },

        methods:{
            async followRelease(){
                await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userData.id}`, {
                    releases: [this.release],
                }).then(response => {
                    
                    this.$toast.info('You have been following ' + this.release.name, {duration:2000, position:'bottom-left'})
                    this.liked = true
                }).catch(function (error) {
                    console.log(error);
                });
            },

            async unfollowRelease(){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/users/${this.userData.id}/releases/${this.release.id}`, this.release).then(response => {
                    
                    this.liked = false
                }).catch(function (error) {
                    console.log(error);
                });
            },

            getYoutubeId(url){
                let id, fullId
                if(this.release.type === "ALBUM") {
                    if(url?.includes("list=")) {

                        id = url.split("list=")[1]
                        fullId = "https://www.youtube.com/embed/videoseries?list=" + id

                    } else if(url?.includes("v=")) {

                        id = url.split("v=")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    } else if(url?.includes(".be/")) {

                        id = url.split(".be/")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    }
                } else {
                    if(url?.includes("v=")) {

                        id = url.split("v=")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    } else if(url?.includes(".be/")) {

                        id = url.split(".be/")[1]
                        fullId = "https://www.youtube.com/embed/" + id

                    }
                }
                return fullId
            },
        },
    }
</script>

<style>
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
