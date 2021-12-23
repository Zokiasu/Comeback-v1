<template>
    <div>
        <div class="bg-opacity-10 bg-gray-500 px-3 py-2 flex justify-between text-white lg:px-5">
            <NuxtLink :to="`/`" name="home page" class="relative">
                <img class="w-36 hidden lg:flex" src="~/assets/image/logo.png" alt="Comeback Logo">
                <span class="text-red-700 hidden lg:flex text-xs absolute bottom-0 right-0">Beta</span>
                <img class="w-8 sm:w-10 hidden sm:flex lg:hidden" src="~/assets/image/mini-logo.png" alt="Comeback Logo">
            </NuxtLink>
            <div class="flex justify-start sm:justify-center lg:justify-between lg:w-full relative lg:ml-5">
                <div id="menu" class="flex space-x-2 mx-2">
                    <NuxtLink :to="`/`" name="home page" 
                        class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" 
                        :class="$route.name != 'index' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/home.png" alt="Home button redirect"/>
                        <span class="hidden mt-0.5 lg:flex">Home</span>
                    </NuxtLink>
                    <NuxtLink :to="`/calendar`" name="calendar page" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'calendar' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/calendar.png" alt="calendar button redirect"/>
                        <span class="hidden mt-0.5 lg:flex">Calendar</span>
                    </NuxtLink>
                    <NuxtLink :to="`/artist`" name="artists page" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'artist' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/artist.png" alt="artist button redirect"/>
                        <span class="hidden mt-0.5 lg:flex">Artists</span>
                    </NuxtLink>
                    <button v-if="userConnected" @click="newsModal=true" class="bg-red-700 Card px-5 rounded-md focus:outline-none">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/news.png" alt="comeback button to add new comeback"/>
                        <span class="hidden mt-0.5 lg:flex">Add a News</span>
                    </button>
                </div>
            </div>
            <div v-if="!userConnected" class="text-white font-semibold my-auto">
                <button @click="authentificationModal=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out hover:bg-gray-600 transform hover:font-bold">Login</button>
            </div>
            <div v-else class="flex space-x-1">
                <div>
                    <img @click="userMenu = !userMenu" class="w-8 sm:w-10 rounded-full cursor-pointer" :src="userAvatar" alt="">
                    <div v-if="userMenu" class="w-40 fixed rounded bg-black-one right-3 mt-3 animate__animated animate__fadeInDown animate__faster">
                        <ul @click="userMenu = !userMenu" class="flex flex-col">
                            <NuxtLink :to="`/profile/${user.id}/general`" class="hover:bg-gray-700 px-5 py-1">
                                Profile
                            </NuxtLink>
                            <NuxtLink :to="`/add/artist`" class="hover:bg-gray-700 px-5 py-1">
                                Add New Artist
                            </NuxtLink>
                            <NuxtLink v-if="userConnected && userRole != 'NONE'" :to="`/dashboard`" class="hover:bg-gray-700 px-5 py-1">
                                Dashboard
                            </NuxtLink>
                            <button @click="logout()" class="focus:outline-none rounded-b text-left hover:bg-gray-700 px-5 py-1">
                                Sign Out
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="authentificationModal" 
            title="Authentification"
            wrapper-class="animate__animated modal-wrapper"
            :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <Authentification @close="closeAuthentificationModal"/>
        </Modal>
        <Modal
            v-model="newsModal"
            title="Add a News"
            wrapper-class="animate__animated modal-wrapper"
            :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <NewsCreation @close="closeNewsModal"/>
        </Modal>
    </div>
</template>

<style>
.modal-custom{background:#1F1D1D; border-radius: 0.25rem; color:white;}
</style>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    data() {
        return {
            userMenu: false,

            authentificationModal: false,
            newsModal:false,

            user: null,
            userConnected: false,
            userRole: 'NONE',
            userAvatar: require('@/assets/image/artist.png'),
        }
    },

    async created(){
        let that = this
        await this.$fire.auth.onAuthStateChanged(async function (user) {
            if (user != null) {
                if(user.uid) {
                    that.userConnected = true
                    await that.setStoreData(user.uid)
                }
            }
        })
    },

    async mounted() {
        this.$toast.info("This website is currently under development, so you may encounter some bugs while using it.", {duration:5000, position:'top-center'})
    },

    methods:{
        ...mapMutations([
            'SET_DATA_USER',
            'SET_TOKEN_USER',
        ]),

        ...mapGetters([
            'GET_DATA_USER',
        ]),

        logout(){
            this.$fire.auth.signOut().then(() => {
                this.$router.push('/')
                this.userConnected = false
                this.userRole = 'NONE'
                this.$toast.error('You are log out!', {duration:3000, position:'top-right'})
                this.SET_DATA_USER(null)
                this.SET_TOKEN_USER(null)
            }).catch((error) => {
                console.log(error)
            })
        },

        async setStoreData(userId){
            const that = this

            this.$fire.auth.currentUser.getIdToken(true).then(function(idToken){
                that.SET_TOKEN_USER(idToken)
            }).catch(function(error) {
                console.log(error)
            })

            await this.$axios.get(`https://comeback-api.herokuapp.com/users/${userId}`).then((res) => {
                that.SET_DATA_USER(res.data)
                that.user = that.GET_DATA_USER()
                if(that.user != null) {
                    if(that.user.avatar) that.userAvatar = that.user.avatar
                    that.userRole = that.user.role
                }
            })
        },

        closeAuthentificationModal(){
            this.authentificationModal = false
        },

        closeNewsModal(){
            this.newsModal = false
        },
    },
}
</script>