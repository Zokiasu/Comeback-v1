<template>
    <div class="bg-leftbar flex flex-col justify-between relative text-white texts min-h-screen">
        <div class="w-full">
            <header class="m-5 flex justify-center">
                <button @click="backToHome()" class="focus:outline-none"><img class="w-52 cursor-pointer" src="~/assets/image/logo.png"/></button>
            </header>
            <section id="navigation" class="border-t-2 border-gray-400 mx-5 py-5">
                <nav>
                    <ul class="space-y-5">
                        <li>
                            <div class="flex bg-select-leftbar text-white rounded">
                                <div class="pr-1 pl-2 rounded-none rounded-l py-1.5">
                                    <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
                                </div>
                                <input v-model="search" @change="updateSearch()" type="text" placeholder="Search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-transparent">
                            </div>
                        </li>
                        <li>
                            <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'calendar' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/calendar`">
                                <img class="w-4 h-4 mt-1" src="~/assets/image/calendar.png"/>
                                <span>Calendar</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'artist' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/artist`">
                                <img class="w-4 h-4 mt-1" src="~/assets/image/artist.png"/>
                                <span>Artists</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'profile-id' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/profile/`">
                                <img class="w-4 h-4 mt-1" src="~/assets/image/profile.png"/>
                                <span>Profile</span>
                            </NuxtLink>
                        </li>
                        <!--<li>
                            <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'discover' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/discover`">
                                <img class="w-4 h-4 mt-1" src="~/assets/image/artist.png"/>
                                <span>Discover</span>
                            </NuxtLink>
                        </li>-->
                        <li>
                            <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'setting' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/setting`">
                                <img class="w-4 h-4 mt-1" src="~/assets/image/setting.png"/>
                                <span>Setting</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </section>
            <section id="action-navigation" class="border-t-2 border-gray-400 mx-5 py-5 h-full">
                <nav>
                    <ul class="space-y-5">
                        <!--<li>
                            <NuxtLink :to="`/add/release`" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <span>New Release</span>
                            </NuxtLink>
                        </li>-->
                        <li>
                            <button @click="openNewsWindow()" class="w-full texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <span>Add a News</span>
                            </button>
                        </li>
                        <!--<li>
                            <NuxtLink :to="`/add/artist`" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <span>New Artist</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="`/add/release`" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <span>New Event</span>
                            </NuxtLink>
                        </li>-->
                    </ul>
                </nav>
            </section>
            <section id="moderator-navigation" class="border-t-2 border-gray-400 mx-5 py-5 h-full">
                <nav>
                    <ul class="space-y-5">
                        <li v-if="adminCheck">
                            <NuxtLink :to="`/moderator/pending`" class="px-3 py-1 rounded flex space-x-2" >
                                <img class="w-4 h-4 mt-1" src="~/assets/image/setting.png"/>
                                <span>Moderator Panel</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
        <footer class="space-y-3 my-5 justify-center">
            <section class=" border-t-2 border-gray-400 mx-3 pt-2">
                <div class="w-full flex justify-center">
                    <button @click="logout()" class="text-center font-semibold flex justify-center space-x-1 focus:outline-none">
                        <img class="h-5 w-5" src="https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Flogout.png?alt=media&token=6e8430d0-a180-4492-9249-6714142b2f94" alt="logout-logo">
                        <span class="focus:outline-none -mt-0.5">Sign Out</span>
                    </button>
                </div>
            </section>
            <section class="border-t-2 border-gray-400 mx-3 pt-2 flex space-x-6 justify-center">
                <span class="text-center">This website is currently under development, so you may encounter some bugs while using it.</span>
            </section>
            <section class="border-t-2 border-gray-400 space-y-2 mx-3 pt-2 text-sm">
                <p class="text-center"><a href="#">Contact</a> - <a href="#">About</a> - <a href="#">Terms</a> - <a href="#">Privacy Policy</a></p>
                <p class="text-center">©2021<br><a href="#">Studeler Dev</a> - <a href="#">Cozy Codeur</a></p>
            </section>
        </footer>
        
        <Modal
            v-model="newsWindow" 
            title="Add a news"
            wrapper-class="animate__animated modal-wrapper"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <div class="flex flex-col justify-center">
                <!--<t-input type="text" v-model="news.userId" placeholder="Your Id" name="userId" class="my-2"></t-input>-->
                <multiselect
                    v-if="!newArtist"
                    v-model="artistSelected"
                    placeholder="Please select an artists" 
                    label="name" 
                    track-by="id" 
                    :options="artistList"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="false">
                    <template slot="singleLabel" slot-scope="props">
                        <div class="flex space-x-1">
                            <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                            <div class="option__desc flex flex-col space-y-1">
                                <span class="option__title">{{ props.option.name }}</span>
                                <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                            </div>
                        </div>
                    </template>
                    <template slot="option" slot-scope="props">
                        <div class="flex space-x-1">
                            <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                            <div class="option__desc flex flex-col space-y-1">
                                <span class="option__title">{{ props.option.name }}</span>
                                <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                            </div>
                        </div>
                    </template>
                </multiselect>
                <t-input v-else type="text" v-model="news.newArtistName" placeholder="Your Artist Name" name="Artist Name" class="my-2"></t-input>
                <span v-if="!newArtist" class="text-sm my-2">You can't find your artist ? <button @click="newArtist = !newArtist" class="focus:outline-none text-green-500">Please click here to suggest him with your news</button></span>
                <span v-else class="text-sm my-2"><button @click="newArtist = !newArtist" class="focus:outline-none text-green-500">Back to artist list</button></span>
                <t-datepicker
                    class="text-black"
                    v-model="news.date"
                    placeholder="Date"
                    initial-view="month" dateFormat='Y-m-d' clearable>
                </t-datepicker>
                <t-textarea type="text" v-model="news.message" placeholder="Your News" name="News" class="my-2"></t-textarea>
                <button v-if="!newArtist" @click="sendNews()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-green-500 hover:bg-green-700 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Send the news</button>
                <button v-else @click="sendNewsToValidated()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-green-500 hover:bg-green-700 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Suggest Artist and News</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                search:'',
                newComeback: false,
                adminCheck: false,
                userData: null,

                newsWindow:false,
                newArtist:false,

                news:{
                    message: null,
                    date: null,
                    artistId: null,
                    userId: null,
                    newArtistName: null,
                },

                artistSelected:{},
                artistList:[],
            }
        },

        watch: {
            $route() {
                if(this.$route.name != 'search') this.search = ''
            },
            artistSelected: {
                immediate: true,
                handler(artistSelected) {
                    if (process.client) {
                        this.news.artistId = artistSelected.id
                    }
                }
            },
        },
        
        async mounted(){
            this.adminChecker()
        },

        methods:{
            async openNewsWindow(){
                this.newsWindow = !this.newsWindow
                const{data: response} = await this.$axios.get('https://comeback-api.herokuapp.com/artists/fulllimited?sortby=name:asc')
                this.artistList = response
            },

            async sendNewsToValidated() {
                if(!this.news.message) {
                    this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
                } else if(!this.news.newArtistName) {
                    this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
                } else {
                    await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                        state:'PENDING',
                        method:'POST',
                        endpoint:`/infos`,
                        body: this.news,
                        currentData: [],
                        userId: this.news.userId,
                        source: null
                    }).then(response=>{
                        this.newsWindow = !this.newsWindow
                        this.news.message = null,
                        this.news.newArtistName = null,
                        this.news.userId = null
                        this.newArtist = false
                    })
                }
            },
      
            async sendNews(){
                if(!this.news.message) {
                    this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
                } else if(!this.news.artistId) {
                    this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
                } else {
                    await this.$axios.post(`https://comeback-api.herokuapp.com/infos`, this.news)
                    .then(response => {
                        this.newsWindow = !this.newsWindow
                        this.news.message = null,
                        this.news.artistId = null,
                        this.news.date = null,
                        this.news.userId = null
                        this.newArtist = false
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            updateSearch(){
                let that = this
                this.$fire.auth.onAuthStateChanged(async function (user) {
                    if (user != null) {
                        that.$router.push(`/search?search=${that.search}`)
                    }
                })
            },

            //firebase logout function
            logout(){
                this.$fire.auth.signOut().then(() => {
                    this.$router.push('/')
                    this.$toast.error('You are log out!', {duration:3000, position:'top-right'})
                }).catch((error) => {
                    console.log(error)
                })
            },

            async adminChecker(){
                let that = this
                await this.$fire.auth.onAuthStateChanged(async function (user) {
                    if (user != null) {
                        let userDatas = await that.$axios.$get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
                        if(userDatas.role != "NONE") {
                            that.adminCheck = true
                            that.news.userId = user.uid
                        } else {
                            that.adminCheck =  false
                        }
                    } else {
                        that.adminCheck =  false
                    }
                })
            },

            backToHome() {
                let that = this
                this.$fire.auth.onAuthStateChanged(function (user) {
                    if (user != null) {
                        that.$router.push(`/calendar`)
                    } else {
                        that.$router.push('/')
                    }
                })
            },
        }
    }
</script>

<style>
.texts {
  font-family:
    'Sarala'
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  letter-spacing: 1px;
}
</style>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
