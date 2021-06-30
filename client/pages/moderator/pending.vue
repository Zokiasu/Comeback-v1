<template>
    <div class="px-5">
        <section id="pending-page" class="pb-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(pending, index) in this.pendings.slice(0,maxObjectDisplay)" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
                <section id="pending-type">
                    <span v-if="pending.method == 'POST'">Creation</span>
                    <span v-if="pending.method == 'PUT'">Edition</span>
                    <span v-if="pending.user">by {{pending.user.username}} </span>
                </section>
                <PendingArtist :pending="pending" v-if="pending.body.type === 'SOLO' || pending.body.type === 'GROUP' || pending.currentData.type === 'SOLO' || pending.currentData.type === 'GROUP'"/>
                <PendingRelease :pending="pending" v-if="pending.body.type === 'SINGLE' || pending.body.type === 'ALBUM' || pending.body.type === 'EP' || pending.currentData.type === 'SINGLE' || pending.currentData.type === 'ALBUM' || pending.currentData.type === 'EP'"/>
                <PendingMusic :pending="pending" v-if="!pending.body.type && !pending.currentData.type"/>

                <!--<section id="pending-artist-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SOLO' || pending.body.type === 'GROUP' || pending.currentData.type === 'SOLO' || pending.currentData.type === 'GROUP'">
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
                        <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style.name}}</span></div></div>
                        <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style.name}}</span></div>
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
                </section>-->

                <section id="pending-button" class="flex space-x-3 justify-end">
                    <button @click="editOpen(index)" class="bg-blue-500 px-2 py-1 focus:outline-none hover:bg-blue-700">Edit</button>
                    <button @click="accepted(pending, index)" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700">Accepted</button>
                    <button @click="refused(pending, index)" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700">Refused</button>
                </section>

                <!--<Modal
                    v-model="editArtist"
                    wrapper-class="animate__animated"
                    in-class="animate__fadeInDown"
                    out-class="animate__zoomOut"
                    modal-class="fullscreen-modal bg-gray-300 ">
                    <div id="edit-pending-artist-data" class="flex flex-col justify-center p-5 rounded text-white bg-gray-600" v-if="pendings[indexEdit].body.type === 'SOLO' || pendings[indexEdit].body.type === 'GROUP' || pendings[indexEdit].currentData.type === 'SOLO' || pendings[indexEdit].currentData.type === 'GROUP'">
                        <div>
                            <img :src="pendings[indexEdit].currentData.image" :alt="pendings[indexEdit].currentData.name" class="w-40 h-40 object-cover">
                        </div>
                        <ul class="my-2 space-y-5 py-5">
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
                                <div class="flex space-x-1"><span>Members :</span><div class="space-x-1"><span v-for="(member, index) in pendings[indexEdit].currentData.members" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-white">{{member.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.members"
                                    v-model="pendings[indexEdit].body.members" 
                                    tag-placeholder="Add this as new artists" 
                                    placeholder="Search or add a artists" 
                                    label="name" 
                                    track-by="id" 
                                    :options="artistList" 
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="false"
                                    :multiple="true" 
                                    :taggable="true" 
                                    @tag="addMember">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.groups || pendings[indexEdit].body.groups" class="space-y-1">
                                <div class="flex space-x-1"><span>Belong To The Groups :</span><div class="space-x-1"><span v-for="(group, index) in pendings[indexEdit].currentData.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-white">{{group.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.groups"
                                    v-model="pendings[indexEdit].body.groups" 
                                    tag-placeholder="Add this as new groups" 
                                    placeholder="Search or add a groups" 
                                    label="name" 
                                    track-by="id" 
                                    :options="artistList" 
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="false"
                                    :multiple="true" 
                                    :taggable="true" 
                                    @tag="addGroup">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.styles || pendings[indexEdit].body.styles" class="space-y-1">
                                <div class="flex space-x-1"><span>Styles :</span><div class="space-x-1"><span v-for="(style, index) in pendings[indexEdit].currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.styles"
                                    v-model="pendings[indexEdit].body.styles" 
                                    tag-placeholder="Add this as new style" 
                                    placeholder="Search or add a style"
                                    label="name" 
                                    track-by="name" 
                                    :options="styleList" 
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="false"
                                    :multiple="true" 
                                    :taggable="true"
                                    @tag="addStyle">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.socials || pendings[indexEdit].body.socials" class="space-y-1">
                                <span>Social :</span>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(social, index) in pendings[indexEdit].currentData.socials" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-white"> {{social}} </span></div>
                                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in pendings[indexEdit].body.socials" :key="index" :elem="elem" @updateinput="updateList(pendings[indexEdit].body.socials, $event, index)" @deleteinput="deleteList(pendings[indexEdit].body.socials, index)"/>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.platforms || pendings[indexEdit].body.platforms" class="space-y-1">
                                <span>Platforms :</span>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(platform, index) in pendings[indexEdit].currentData.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-white"> {{platform}} </span></div>
                                <MultipleInput class="mb-1 w-full" v-for="(elem, index) in pendings[indexEdit].body.platforms" :key="index" :elem="elem" @updateinput="updateList(pendings[indexEdit].body.platforms, $event, index)" @deleteinput="deleteList(pendings[indexEdit].body.platforms, index)"/>
                            </li>
                        </ul>
                        <div class="bottom-5 right-5 space-x-5 flex w-full justify-end">
                            <button @click="editArtist=false" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700 text-white">Closed</button>
                            <button @click="editByModerator()" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700 text-white">Confirm Edition</button>
                        </div>
                    </div>
                    <div id="edit-pending-release-data" class="flex flex-col justify-center p-5 rounded text-white bg-gray-600" v-if="pendings[indexEdit].body.type === 'SINGLE' || pendings[indexEdit].body.type === 'ALBUM' || pendings[indexEdit].body.type === 'EP' || pendings[indexEdit].currentData.type === 'SINGLE' || pendings[indexEdit].currentData.type === 'ALBUM' || pendings[indexEdit].currentData.type === 'EP'">
                        <div>
                            <img :src="pendings[indexEdit].currentData.image" :alt="pendings[indexEdit].currentData.name" class="w-40 h-40 object-cover">
                        </div>
                        <ul class="my-2 space-y-5 py-5">
                            <li v-if="pendings[indexEdit].currentData.name || pendings[indexEdit].body.name" class="space-y-1">
                                <span>Name : <span>{{pendings[indexEdit].currentData.name}}</span></span>
                                <t-input v-if="pendings[indexEdit].body.name" v-model="pendings[indexEdit].body.name" placeholder="Name" name="name" type="text"></t-input>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.type || pendings[indexEdit].body.type" id="artists-type-selector" class="space-y-1">
                                <span>Type : <span>{{pendings[indexEdit].currentData.type}}</span></span>
                                <t-select v-if="pendings[indexEdit].body.type" v-model="pendings[indexEdit].body.type" :options="[ { value: 'SOLO', text: 'Soloist' }, { value: 'GROUP', text: 'Group' }, ]" ></t-select>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.artists || pendings[indexEdit].body.artists" class="space-y-1">
                                <div class="flex space-x-1"><span>Artists :</span><div class="space-x-1"><span v-for="(member, index) in pendings[indexEdit].currentData.artists" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-white">{{member.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.artists"
                                    v-model="pendings[indexEdit].body.artists" 
                                    tag-placeholder="Add this as new artists" 
                                    placeholder="Search or add a artists" 
                                    label="name" 
                                    track-by="id" 
                                    :options="artistList" 
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="false"
                                    :multiple="true" 
                                    :taggable="true" 
                                    @tag="addMember">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.styles || pendings[indexEdit].body.styles" class="space-y-1">
                                <div class="flex space-x-1"><span>Styles :</span><div class="space-x-1"><span v-for="(style, index) in pendings[indexEdit].currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style.name}}</span></div></div>
                                <multiselect
                                    v-if="pendings[indexEdit].body.styles"
                                    v-model="pendings[indexEdit].body.styles" 
                                    tag-placeholder="Add this as new style" 
                                    placeholder="Search or add a style"
                                    label="name" 
                                    track-by="name" 
                                    :options="styleList" 
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="false"
                                    :multiple="true" 
                                    :taggable="true"
                                    @tag="addStyle">
                                </multiselect>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.platforms || pendings[indexEdit].body.platforms" class="flex flex-col w-full text-white mb-10">
                                <h1 class="text-xl">Streaming Platforms Link</h1>
                                <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
                                <MultipleInput class="mb-1" v-for="(elem, index) in pendings[indexEdit].body.platforms" :key="index" :elem="elem" :placehol="'Streaming Platforms'" @updateinput="updateList(pendings[indexEdit].body.platforms, $event, index)" @deleteinput="deleteList(pendings[indexEdit].body.platforms, index)"/>
                                <button @click="addStreamingLink()" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
                                    <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                                </button>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.musics || pendings[indexEdit].body.musics" class="flex flex-col w-full text-white mb-5 xl:mb-10">
                                <h1 class="text-xl">Tracklist</h1>
                                <div class="mb-1 py-3 space-y-1 w-3/4" v-for="(music, index) in pendings[indexEdit].body.musics" :key="index">
                                    <span>Track {{index+1}}</span>
                                    <t-input type="text" v-model="music.name" placeholder="Track Name"/>
                                    <t-input type="text" v-model="music.clip" placeholder="Track Clip"/>
                                </div>
                                <button @click="addMusic()" class="mt-1 text-left focus:outline-none flex space-x-2 bg-gray-500 bg-opacity-30 p-2 justify-center rounded">
                                    <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                                </button>
                            </li>
                        </ul>
                        <div class="bottom-5 right-5 space-x-5 flex w-full justify-end">
                            <button @click="editArtist=false" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700 text-white">Closed</button>
                            <button @click="editByModerator()" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700 text-white">Confirm Edition</button>
                        </div>
                    </div>
                    <div id="edit-pending-music-data" class="flex flex-col justify-center p-5 rounded text-white bg-gray-600" v-if="!pendings[indexEdit].body.type && !pendings[indexEdit].currentData.type">
                        <ul class="my-2 space-y-5 py-5">
                            <li v-if="pendings[indexEdit].currentData.name || pendings[indexEdit].body.name" class="space-y-1">
                                <span>Name : <span>{{pendings[indexEdit].currentData.name}}</span></span>
                                <t-input v-if="pendings[indexEdit].body.name" v-model="pendings[indexEdit].body.name" placeholder="Name" name="name" type="text"></t-input>
                            </li>
                            <li v-if="pendings[indexEdit].currentData.clip || pendings[indexEdit].body.clip" class="space-y-1">
                                <span>Clip : <span>{{pendings[indexEdit].currentData.clip}}</span></span>
                                <t-input v-if="pendings[indexEdit].body.clip" v-model="pendings[indexEdit].body.clip" placeholder="Clip" name="clip" type="text"></t-input>
                            </li>
                        </ul>
                        <div class="bottom-5 right-5 space-x-5 flex w-full justify-end">
                            <button @click="editArtist=false" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700 text-white">Closed</button>
                            <button @click="editByModerator()" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700 text-white">Confirm Edition</button>
                        </div>
                    </div>
                </Modal>-->
            </div>

            <div v-if="maxObjectDisplay < this.pendings.length" class="w-full flex justify-center">
                <button @click="maxObjectDisplay = maxObjectDisplay + 20">More</button>
            </div>

            <div v-if="this.pendings.length < 1" style="background-color: #6B728033" class="w-full text-white lg:col-span-2 py-2 rounded-sm flex justify-center">
                <span class="w-full text-center">No new pending</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'Pending',

        data() {
            return {
                pendings: [],

                //Edit ressource
                editArtist:false,
                indexEdit: 0,
                artistList:[],
                styleList:[],
                maxObjectDisplay:20
            }
        },

        async asyncData({ $axios }){
            const pendings = await $axios.$get(`https://comeback-api.herokuapp.com/requests?state=PENDING`)
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')
            const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles')
            return { pendings, artistList, styleList }
        },
    
        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
        },

        methods: {

            async accepted(object, index){
                if(object.method == 'PUT'){
                    await this.$axios.put(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        
                        if(response) this.updateRequest(object, index, "ACCEPTED", this.userData.id)
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if (object.method == 'POST'){
                    await this.$axios.post(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        if(response) {
                            this.updateRequest(object, index, "ACCEPTED", this.userData.id)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            async refused(object, index){
                this.updateRequest(object, index, "DENIED", this.userData.id)
            },

            async updateRequest(object, index, state, checked_by){
                object.state = state
                object.checked_by = checked_by
                await this.$axios.put(`https://comeback-api.herokuapp.com/requests/${object.id}`, object).then(response => {
                    
                    this.pendings.splice(index, 1)
                    if(state == "ACCEPTED") this.$toast.success('The pending has been accepted', {duration:3000, position:'top-right'})
                    else this.$toast.error('The pending has been refused', {duration:3000, position:'top-right'})
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

            deleteList(list, index){
                list.splice(index, 1)
            },

            addStyle (newTag) {
                const tag = {
                    name: newTag,
                }
                if(this.pendings[this.indexEdit].body.styles) {
                    this.pendings[this.indexEdit].body["styles"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.styles.push(tag)
                }
                this.styleList.push(tag)
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

            addMusic(){
                this.pendings[this.indexEdit].body.musics.push({
                    id: null,
                    name: null,
                    clip: null,
                    platforms: null,
                })
            },

            addStreamingLink(){
                if(this.pendings[this.indexEdit].body.platforms == null) {
                    this.pendings[this.indexEdit].body.platforms = [""]
                } else {
                    this.pendings[this.indexEdit].body.platforms.push("")
                }
            },
            
            editOpen(index){
                this.editArtist = true
                this.indexEdit = index

                this.pendings[this.indexEdit].body["newGroups"] = []
                this.pendings[this.indexEdit].body["newMembers"] = []
            },

            /*beforeOpen() {
                bodyScroll.freeze()
            },

            beforeClose() {
                bodyScroll.unfreeze()
            }*/
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