<template>
    <div class="px-5">
        <ModeratorMenu/>
        <section id="pending-page" class="pb-5 grid grid-cols-1 lg:grid-cols-2 gap-3">

                <div v-for="(pending, index) in this.pendings" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
                    <section id="pending-type">
                        <span v-if="pending.method == 'POST'">Creation</span>
                        <span v-if="pending.method == 'PUT'">Edition</span>
                        <span v-if="pending.user">by {{pending.user.username}} {{pending.state}}</span>
                    </section>

                    <v-read-more-box bg-color="#6B728033">
                        <button slot="readMore" class="focus:outline-none font-semibold mt-2">SHOW MORE</button>
                        <button slot="readLess" class="focus:outline-none font-semibold mt-2">SHOW LESS</button>
                        <section id="pending-artist-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SOLO' || pending.body.type === 'GROUP' || pending.currentData.type === 'SOLO' || pending.currentData.type === 'GROUP'">
                            <span class="font-semibold">Artist Pending</span>
                            <div id="image" class="flex space-x-5">
                                <img :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
                                <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                            </div>
                            <div id="name">
                                <span>Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                            </div>
                            <div id="type">
                                <span>Type : <span :class="pending.body.type ? 'text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
                            </div>
                            <div id="style">
                                <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                                <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div>
                            </div>
                            <div id="description">
                                <span>Description : <span :class="pending.body.description ? 'text-red-500':''">{{pending.currentData.description}}</span> </span>
                                <span class="text-green-500">{{pending.body.description}} </span>
                            </div>
                            <div id="groups">
                                <div class="flex space-x-1"><span>Groups :</span><div :class="pending.body.groups ? 'text-red-500':''" class="space-x-1"><span v-for="(group, index) in pending.currentData.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                                <div v-if="pending.body.groups" class="text-green-500 space-x-1"><span v-for="(group, index) in pending.body.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div>
                            </div>
                            <div id="members">
                                <div class="flex space-x-1">
                                    <span>Members :</span>
                                    <div :class="pending.body.members ? 'text-red-500':''" class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-1">
                                        <span v-for="(member, index) in pending.currentData.members" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span>
                                    </div>
                                </div>
                                <div v-if="pending.body.members" class="text-green-500 grid grid-cols-2 ms:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-1">
                                    <span v-for="(member, index) in pending.body.members" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span>
                                </div>
                            </div>
                            <div id="socials">
                                <span>Social :</span>
                                <div :class="pending.body.socials ? 'text-red-500':''" class="grid grid-cols-1 gap-1 mb-1"><span v-for="(social, index) in pending.currentData.socials" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                                <div v-if="pending.body.socials" class="text-green-500 grid grid-cols-1 gap-1"><span v-for="(social, index) in pending.body.socials" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                            </div>
                            <div id="platforms">
                                <span>Platforms :</span>
                                <div :class="pending.body.platforms ? 'text-red-500':''" class="grid grid-cols-1 gap-1 mb-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                                <div v-if="pending.body.platforms" class="text-green-500 grid grid-cols-1 gap-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                            </div>
                            <div id="source">
                                <span>Source :</span>
                                <span> {{pending.source}} </span>
                            </div>
                        </section>

                        <section id="pending-release-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SINGLE' || pending.body.type === 'ALBUM' || pending.body.type === 'EP' || pending.currentData.type === 'SINGLE' || pending.currentData.type === 'ALBUM' || pending.currentData.type === 'EP'">
                            <span id="title" class="font-semibold">Release Pending</span>
                            <div id="image" class="flex space-x-5">
                                <img v-if="pending.currentData.image" :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
                                <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                            </div>
                            <span id="name">Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                            <span id="type">Type : <span :class="pending.body.type ? 'text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
                            <span id="date">Date : <span :class="pending.body.date ? 'text-red-500':''">{{pending.currentData.date}}</span> <span v-if="pending.body.date" class="text-green-500">{{pending.body.date}}</span></span>
                            <div id="styles">
                                <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                                <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div>
                            </div>
                            <div id="artist">
                                <div class="flex space-x-1"><span>Artists :</span><div :class="pending.body.artists ? 'text-red-500':''" class="space-x-1"><span v-for="(member, index) in pending.currentData.artists" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span></div></div>
                                <div v-if="pending.body.artists" class="text-green-500 space-x-1"><span v-for="(member, index) in pending.body.artists" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span></div>
                            </div>
                            <div id="musics">
                                <span>Musics :</span>
                                <div v-for="(music, index) in pending.currentData.musics" :key="index" :class="pending.body.musics ? 'text-red-500':''" class="grid grid-cols-1 gap-1">
                                    <span class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                                    <span v-if="music.clip" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
                                </div>
                                <div v-for="(music, index) in pending.body.musics" :key="index" class="text-green-500 space-x-1">
                                    <span class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                                    <span v-if="music.clip" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
                                </div>
                            </div>
                            <div id="platforms">
                                <span>Platforms :</span>
                                <div :class="pending.body.platforms ? 'text-red-500':''" class="grid grid-cols-1 gap-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                                <div v-if="pending.body.platforms" class="text-green-500 grid grid-cols-1 gap-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                            </div>
                            <div id="source">
                                <span>Source :</span>
                                <span> {{pending.source}} </span>
                            </div>
                        </section>

                        <section id="pending-music-data" class="flex flex-col space-y-2 h-full" v-if="!pending.body.type && !pending.currentData.type">
                            <span class="font-semibold">Music Pending</span>
                            <span>Name : <span :class="pending.body.name != pending.currentData.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name != pending.currentData.name" class="text-green-500">{{pending.body.name}}</span></span>
                            <span>Clip : <a :href="pending.currentData.clip" :class="pending.body.clip ? 'text-red-500':''">{{pending.currentData.clip}}</a> <a v-if="pending.body.clip" :href="pending.body.clip" class="text-green-500">{{pending.body.clip}}</a></span>
                            <div>
                                <span>Source :</span>
                                <span> {{pending.source}} </span>
                            </div>
                        </section>
                    </v-read-more-box>
                </div>
            <div v-if="this.pendings.length < 1" style="background-color: #6B728033" class="w-full text-white lg:col-span-2 py-2 rounded-sm flex justify-center">
                <span class="w-full text-center">No new pending</span>
            </div>
        </section>
    </div>
</template>

<script>
    import bodyScroll from 'body-scroll-freezer'
    
    export default {
        name:'LastUpdate',

        data() {
            return {
                pendings: [],
                //Edit ressource
                editArtist:false,
                indexEdit: 0,
                maxObjectDisplay:20
            }
        },

        mounted(){
            bodyScroll.init()
        },
    
        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
        },

        methods: {
            
        },

        async asyncData({ $axios }){
            const pendings = await $axios.$get(`https://comeback-api.herokuapp.com/requests`)
            return { pendings }
        },
    }
</script>

<style>
    .fullscreen-modal {
    width: 100%;
    max-width: 100%;
    top: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1F1D1D;
    }
    .fullscreen-modal .vm-titlebar {
    flex-shrink: 0;
    }
    .fullscreen-modal .vm-content {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; 
    }
    .fullscreen-modal .vm-content .scrollable-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 15px 10px 15px;
    flex-grow: 1;
    }
    .fullscreen-modal .fullscreen-modal-footer {
    border-top: 1px solid #e5e5e5;
    padding: 15px;
    }
</style>