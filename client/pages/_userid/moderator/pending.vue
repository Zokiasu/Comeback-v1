<template>
    <div class="m-5 mt-0">
        <section id="pending-page" class="py-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(pending, index) in this.pendings" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
                <div>
                    <span v-if="pending.method == 'POST'">Creation</span>
                    <span v-if="pending.method == 'PUT'">Edition</span>
                </div>
                <div class="flex flex-col space-y-2 h-full">
                    <div class="flex space-x-5">
                        <img :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
                        <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                    </div>
                    <span>Name : <span :class="pending.body.name ? 'line-through text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
                    <span>Type : <span :class="pending.body.type ? 'line-through text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
                    
                    <div>
                        <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'line-through text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
                        <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{style}}</span></div>
                    </div>
                    <span>Description : <span :class="pending.body.description ? 'line-through text-red-500':''">{{pending.currentData.description}}</span> </span>
                    <span class="text-green-500">{{pending.body.description}} </span>
                    <div>
                        <div class="flex space-x-1"><span>Groups :</span><div :class="pending.body.groups ? 'line-through text-red-500':''" class="space-x-1"><span v-for="(group, index) in pending.currentData.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                        <div v-if="pending.body.groups" class="text-green-500 space-x-1"><span v-for="(group, index) in pending.body.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{group.name}}</span></div>
                    </div>
                    <div>
                        <div class="flex space-x-1"><span>Members :</span><div :class="pending.body.members ? 'line-through text-red-500':''" class="space-x-1"><span v-for="(member, index) in pending.currentData.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div></div>
                        <div v-if="pending.body.members" class="text-green-500 space-x-1"><span v-for="(member, index) in pending.body.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs">{{member.name}}</span></div>
                    </div>
                    <div>
                        <span>Social :</span>
                        <div :class="pending.body.socials ? 'line-through text-red-500':''" class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(social, index) in pending.currentData.socials" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                        <div v-if="pending.body.socials" class="text-green-500 space-x-1"><span v-for="(social, index) in pending.body.socials" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{social}} </span></div>
                    </div>
                    <div>
                        <span>Platforms :</span>
                        <div :class="pending.body.platforms ? 'line-through text-red-500':''" class="grid grid-cols-1 lg:grid-cols-2 gap-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                        <div v-if="pending.body.platforms" class="text-green-500 space-x-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
                    </div>
                    <div>
                        <span>Source :</span>
                        <span> {{pending.source}} </span>
                    </div>
                </div>
                <div class="flex space-x-3 justify-end">
                    <button class="bg-blue-500 px-2 py-1 focus:outline-none hover:bg-blue-700">Edit</button>
                    <button class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700">Accepted</button>
                    <button class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700">Refused</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'LastUpdate',

        data() {
            return {
                pendings: [],
            }
        },

        computed: {
            todos () {
                return this.$store.state.loremipsum
            }
        },

        async asyncData({ $axios }){
            let pendings = await $axios.$get(`https://comeback-api.herokuapp.com/requests?state=PENDING`)

            return {pendings}
        },
    }
</script>