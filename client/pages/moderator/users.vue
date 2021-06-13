<template>
    <div class="px-5">
        <section id="users-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(user, index) in this.users.slice(0,maxObjectDisplay)" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div class="flex space-x-5 p-2">
                    <img :src="user.avatar ? user.avatar : require(`~/assets/image/profile.png`)" class="w-20 h-20 object-cover rounded-full border border-gray-400" alt="">
                    <div class="flex flex-col space-y-1.5 -mt-1">
                        <div class="flex space-x-2">
                            <span class="font-semibold text-lg"><NuxtLink :to="`/users/${user.id}`" target="_blank" class="hover:underline">{{user.username}}</NuxtLink> - <span class="text-base font-normal">{{user.id}}</span></span>
                        </div>
                        <div>
                            <span :class="user.role === 'ADMIN' ? 'text-red-500' : ''">{{((user.role).charAt(0).toUpperCase() + (user.role).slice(1))}}</span>
                        </div>
                        <div>
                            <span v-if="user.email">{{user.email}}</span>
                            <span v-if="!user.email"> Email Undefined </span>
                        </div>
                    </div>
                </div>
                <div v-if="maxObjectDisplay < this.users.length" class="w-full flex justify-center">
                    <button @click="maxObjectDisplay = maxObjectDisplay + 20">More</button>
                </div>
                <div class="flex space-x-3">
                    <div>
                        <span v-if="user.artists.length > 0">{{user.artists.length}} Artists followed</span>
                        <span v-else> No artists followed </span>
                    </div>
                    <span>•</span>
                    <div>
                        <span v-if="user.requests.length > 0">{{user.requests.length}} Request sent</span>
                        <span v-else> No request sent </span>
                    </div>
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
                users: [],
                maxObjectDisplay:20
            }
        },

        async asyncData({ $axios }){
            let users = await $axios.$get(`https://comeback-api.herokuapp.com/users`)
            return {users}
        },
    
        computed: {
            userId(){
                let utmp = this.$store.state.dataUser
return utmp.id
            },
        
            defaultImage(){
                return "../../assets/image/profile.png"
            },
        }
    }
</script>