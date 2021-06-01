<template>
    <div class="m-5 mt-0">
        <section id="pending-page" class="py-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(pending, index) in this.pendings" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
                <section id="pending-type">
                    <span v-if="pending.method == 'POST'">Creation</span>
                    <span v-if="pending.method == 'PUT'">Edition</span>
                    <span v-if="pending.user">by {{pending.user.username}} </span>
                </section>

                <section id="pending-artist-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SOLO' || pending.body.type === 'GROUP' || pending.currentData.type === 'SOLO' || pending.currentData.type === 'GROUP'">
                    <div class="flex space-x-5">
                        <img :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
                        <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                    </div>
                    <span>Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                    <span>Type : <span :class="pending.body.type ? 'text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
                    
                    <div>
                        <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                        <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div>
                    </div>
                    <span>Description : <span :class="pending.body.description ? 'text-red-500':''">{{pending.currentData.description}}</span> </span>
                    <span class="text-green-500">{{pending.body.description}} </span>
                    <div>
                        <div class="flex space-x-1"><span>Groups :</span><div :class="pending.body.groups ? 'text-red-500':''" class="space-x-1"><span v-for="(group, index) in pending.currentData.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                        <div v-if="pending.body.groups" class="text-green-500 space-x-1"><span v-for="(group, index) in pending.body.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{group.name}}</span></div>
                    </div>
                    <div>
                        <div class="flex space-x-1"><span>Members :</span><div :class="pending.body.members ? 'text-red-500':''" class="space-x-1"><span v-for="(member, index) in pending.currentData.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div></div>
                        <div v-if="pending.body.members" class="text-green-500 space-x-1"><span v-for="(member, index) in pending.body.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div>
                    </div>
                    <div>
                        <span>Social :</span>
                        <div :class="pending.body.socials ? 'text-red-500':''" class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(social, index) in pending.currentData.socials" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                        <div v-if="pending.body.socials" class="text-green-500 space-x-1"><span v-for="(social, index) in pending.body.socials" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                    </div>
                    <div>
                        <span>Platforms :</span>
                        <div :class="pending.body.platforms ? 'text-red-500':''" class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                        <div v-if="pending.body.platforms" class="text-green-500 space-x-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                    </div>
                    <div>
                        <span>Source :</span>
                        <span> {{pending.source}} </span>
                    </div>
                </section>

                <section id="pending-release-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SINGLE' || pending.body.type === 'ALBUM' || pending.body.type === 'EP' || pending.currentData.type === 'SINGLE' || pending.currentData.type === 'ALBUM' || pending.currentData.type === 'EP'">
                    <div class="flex space-x-5">
                        <img v-if="pending.currentData.image" :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
                        <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                    </div>
                    <span>Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                    <span>Type : <span :class="pending.body.type ? 'text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
                    <span>Date : <span :class="pending.body.date ? 'text-red-500':''">{{pending.currentData.date}}</span> <span v-if="pending.body.date" class="text-green-500">{{pending.body.date}}</span></span>
                    <div>
                        <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                        <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div>
                    </div>
                    <div>
                        <div class="flex space-x-1"><span>Artists :</span><div :class="pending.body.artists ? 'text-red-500':''" class="space-x-1"><span v-for="(member, index) in pending.currentData.artists" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div></div>
                        <div v-if="pending.body.artists" class="text-green-500 space-x-1"><span v-for="(member, index) in pending.body.artists" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div>
                    </div>
                    <div>
                        <span>Musics :</span>
                        <div v-for="(music, index) in pending.currentData.musics" :key="index" :class="pending.body.musics ? 'text-red-500':''" class="grid grid-cols-1 gap-1">
                            <span class="bg-gray-500 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                            <span v-if="music.clip" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
                        </div>
                        <div v-for="(music, index) in pending.body.musics" :key="index" class="text-green-500 space-x-1">
                            <span class="bg-gray-500 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                            <span v-if="music.clip" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
                        </div>
                    </div>
                    <div>
                        <span>Platforms :</span>
                        <div :class="pending.body.platforms ? 'text-red-500':''" class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                        <div v-if="pending.body.platforms" class="text-green-500 space-x-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                    </div>
                    <div>
                        <span>Source :</span>
                        <span> {{pending.source}} </span>
                    </div>
                </section>

                <section id="pending-music-data" class="flex flex-col space-y-2 h-full" v-if="!pending.body.type && !pending.currentData.type">
                    <span>Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                    <div>
                        <span>Source :</span>
                        <span> {{pending.source}} </span>
                    </div>
                </section>

                <section id="pending-button" class="flex space-x-3 justify-end">
                    <button @click="editOpen(index)" class="bg-blue-500 px-2 py-1 focus:outline-none hover:bg-blue-700">Edit</button>
                    <button @click="accepted(pending)" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700">Accepted</button>
                    <button @click="refused(pending)" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700">Refused</button>
                </section>

                <Modal
                    v-model="editArtist"
                    wrapper-class="animate__animated"
                    in-class="animate__fadeInDown"
                    out-class="animate__zoomOut"
                    modal-class="fullscreen-modal bg-gray-500 "
                    @before-open="beforeOpen"
                    @before-close="beforeClose">
                        
                    <div class="relative flex flex-col justify-center m-5 p-10 bg-opacity-50 rounded overflow-hidden overflow-y-scroll text-white bg-gray-500">
                        <div>
                            <img :src="pendings[indexEdit].currentData.image" :alt="pendings[indexEdit].currentData.name" class="w-40 h-40 object-cover">
                        </div>
                        <ul class="my-2 space-y-2 py-5">
                            <li v-if="pendings[indexEdit].currentData.name || pendings[indexEdit].body.name" class="space-y-1">
                                <span>Name : <span>{{pendings[indexEdit].currentData.name}}</span></span>
                                <t-input v-if="pendings[indexEdit].body.name" v-model="pendings[indexEdit].body.name" placeholder="Name" name="name" type="text"></t-input>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.type || pendings[indexEdit].body.type" id="artists-type-selector" class="space-y-1">
                                <span>Type : <span>{{pendings[indexEdit].currentData.type}}</span></span>
                                <t-select v-if="pendings[indexEdit].body.type" v-model="pendings[indexEdit].body.type" :options="[ { value: 'SOLO', text: 'Soloist' }, { value: 'GROUP', text: 'Group' }, ]" ></t-select>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.description || pendings[indexEdit].body.description" class="space-y-1">
                                <span>Description : <span>{{pendings[indexEdit].currentData.description}}</span> </span>
                                <t-textarea v-if="pendings[indexEdit].body.description" v-model="pendings[indexEdit].body.description" placeholder="Description" name="description" type="text"></t-textarea>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.website || pendings[indexEdit].body.website" class="space-y-1">
                                <span>Website : <span>{{pendings[indexEdit].currentData.website}}</span> </span>
                                <t-input v-if="pendings[indexEdit].body.website" v-model="pendings[indexEdit].body.website" placeholder="Website" name="website" type="text"></t-input>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.members || pendings[indexEdit].body.members" class="space-y-1">
                                <div class="flex space-x-1"><span>Members :</span><div class="space-x-1"><span v-for="(member, index) in pendings[indexEdit].currentData.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs text-white">{{member.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.members"
                                    v-model="pendings[indexEdit].body.members" 
                                    tag-placeholder="Add this as new artists" 
                                    placeholder="Search or add a artists" 
                                    label="name" 
                                    track-by="id" 
                                    :options="artistList" 
                                    :multiple="true" 
                                    :taggable="true" 
                                    @tag="addMember">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.groups || pendings[indexEdit].body.groups" class="space-y-1">
                                <div class="flex space-x-1"><span>Belong To The Groups :</span><div class="space-x-1"><span v-for="(group, index) in pendings[indexEdit].currentData.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs text-white">{{group.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.groups"
                                    v-model="pendings[indexEdit].body.groups" 
                                    tag-placeholder="Add this as new groups" 
                                    placeholder="Search or add a groups" 
                                    label="name" 
                                    track-by="id" 
                                    :options="artistList" 
                                    :multiple="true" 
                                    :taggable="true" 
                                    @tag="addGroup">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.styles || pendings[indexEdit].body.styles" class="space-y-1">
                                <div class="flex space-x-1"><span>Styles :</span><div class="space-x-1"><span v-for="(style, index) in pendings[indexEdit].currentData.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.styles"
                                    v-model="pendings[indexEdit].body.styles" 
                                    tag-placeholder="Add this as new style" 
                                    placeholder="Search or add a style"
                                    :options="styleList" 
                                    :multiple="true" 
                                    :taggable="true"
                                    @tag="addStyle">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.socials || pendings[indexEdit].body.socials" class="space-y-1">
                                <span>Social :</span>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(social, index) in pendings[indexEdit].currentData.socials" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs text-white"> {{social}} </span></div>
                                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in pendings[indexEdit].body.socials" :key="index" :elem="elem" @updateinput="updateList(pendings[indexEdit].body.socials, $event, index)"/>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.platforms || pendings[indexEdit].body.platforms" class="space-y-1">
                                <span>Platforms :</span>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(platform, index) in pendings[indexEdit].currentData.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs text-white"> {{platform}} </span></div>
                                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in pendings[indexEdit].body.platforms" :key="index" :elem="elem" @updateinput="updateList(pendings[indexEdit].body.platforms, $event, index)"/>
                            </li>
                        </ul>
                        <div class="absolute bottom-5 right-5 space-x-5 flex">
                            <button @click="editArtist=false" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700 text-white">Closed</button>
                            <button @click="editByModerator()" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700 text-white">Confirm Edition</button>
                        </div>
                    </div>
                </Modal>
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
                artistList:[],
                styleList:[],
            }
        },

        mounted(){
            bodyScroll.init()
        },

        methods: {

            async accepted(object){
                await this.$axios.put(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body).then(response => {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error);
                });
                object.state = "ACCEPTED"
                object.checked_by = this.$route.params.userid
                console.log(object)
                await this.$axios.put(`https://comeback-api.herokuapp.com/requests/${object.id}`, object).then(response => {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error);
                });
            },

            async refused(object){
                object.state = "DENIED"
                object.checked_by = this.$route.params.userid
                await this.$axios.put(`https://comeback-api.herokuapp.com/requests/${object.id}`, object).then(response => {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error);
                });
            },

            editByModerator(){
                this.editArtist = false
                this.pendings[this.indexEdit].editedByModerator = true
            },

            updateList(list, newElem, index){
                list[index] = newElem
            },

            addStyle (newTag) {
                if(this.pendings[this.indexEdit].body.styles) {
                    this.pendings[this.indexEdit].body["styles"] = [newTag]
                } else {
                    this.pendings[this.indexEdit].body.styles.push(newTag)
                }
            },

            addMember (newTag) {
                const tag = {
                    name: newTag,
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
                    type: 'SOLO',
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                }

                if(this.pendings[this.indexEdit].body.members) {
                    this.pendings[this.indexEdit].body["members"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.members.push(tag)
                }
                
                this.pendings[this.indexEdit].body.newMembers.push(tag)
            },
            
            addGroup (newTag) {
                const tag = {
                    name: newTag,
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
                    type: 'SOLO',
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                }

                if(this.pendings[this.indexEdit].body.groups) {
                    this.pendings[this.indexEdit].body["groups"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.groups.push(tag)
                }
                
                this.pendings[this.indexEdit].body.newGroups.push(tag)
            },
            
            editOpen(index){
                this.editArtist = true
                this.indexEdit = index

                this.pendings[this.indexEdit].body["newGroups"] = []
                this.pendings[this.indexEdit].body["newMembers"] = []
            },

            beforeOpen() {
                bodyScroll.freeze()
            },

            beforeClose() {
                bodyScroll.unfreeze()
            }
        },

        async asyncData({ $axios }){
            const pendings = await $axios.$get(`https://comeback-api.herokuapp.com/requests?state=PENDING`)
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')
            return {pendings, artistList}
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