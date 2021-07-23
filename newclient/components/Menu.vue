<template>
    <div>
        <div class="bg-opacity-10 bg-gray-500 px-3 py-2 flex justify-between text-white lg:px-5">
            <div class="relative">
                <img class="w-36 hidden lg:flex" src="~/assets/image/logo.png" alt="Comeback Logo">
                <span class="text-red-700 hidden lg:flex text-xs absolute bottom-0 right-0">Beta</span>
                <img class="w-8 sm:w-10 lg:hidden" src="~/assets/image/mini-logo.png" alt="Comeback Logo">
            </div>
            <div class="flex justify-center lg:justify-between lg:w-full relative lg:ml-5">
                <ul id="menu" class="flex space-x-0">
                    <NuxtLink :to="`/`" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'index' ? '' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/home.png"/>
                        <span class="hidden mt-0.5 lg:flex">Home</span>
                    </NuxtLink>
                    <NuxtLink :to="`/calendar`" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'calendar' ? '' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/calendar.png"/>
                        <span class="hidden mt-0.5 lg:flex">Calendar</span>
                    </NuxtLink>
                    <NuxtLink :to="`/artist`" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'artist' ? '' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/artist.png"/>
                        <span class="hidden mt-0.5 lg:flex">Artists</span>
                    </NuxtLink>
                    <NuxtLink :to="`/moderator`" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="$route.name != 'moderator' ? '' : 'bg-gray-500'">
                        <img class="w-4 h-4 mt-1 lg:hidden" src="~/assets/image/moderator.png"/>
                        <span class="hidden mt-0.5 lg:flex">Moderator</span>
                    </NuxtLink>
                    <button @click="showInput" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1 lg:invisible">
                        <img class="w-4 h-4 mt-0.5 lg:mt-2" src="~/assets/image/search.png"/>
                    </button>
                    <!--<NuxtLink :to="`/search`" @click="showInput" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1 lg:invisible">
                        <img class="w-4 h-4 mt-0.5 lg:mt-2" src="~/assets/image/search.png"/>
                    </NuxtLink>-->
                </ul>
                <section id="searchbar" v-if="(searchbar || width) && userConnected" class="flex justify-start -space-x-1 absolute lg:static w-screen lg:w-1/3">
                    <div id="search-icon" style="background-color:#3B3B3B" class="pl-2 pt-3 lg:pt-2.5 lg:pl-2.5 rounded-none rounded-l cursor-pointer">
                        <img @click="hideInput" v-if="!width" class="w-6 h-5 cursor-pointer" src="~/assets/image/arrow_back.png"/>
                        <img @click="showInput" v-else class="w-5 h-5" src="~/assets/image/search.png"/>
                    </div>
                    <input ref="searchInput" @blur="hideInput" type="text" placeholder="Find Releases, Artist, Comeback" v-model="search" style="background-color:#3B3B3B" class="w-full p-2 pl-5 text-white placeholder-white focus:outline-none rounded-r rounded-none">
                </section>
            </div>
            <div v-if="!userConnected" class="text-white font-semibold my-auto">
                <button @click="login=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out hover:bg-gray-600 transform hover:font-bold">Login</button>
            </div>
            <div v-else class="flex space-x-1">
                <div v-if="width" class="p-2 px-3 relative">
                    <img class="w-6 h-6" src="~/assets/image/bell.png" alt="">
                    <span class="bg-red-500 text-xs rounded-full absolute top-0 right-2 px-1">10</span>
                </div>
                <div>
                    <img @click="userMenu = !userMenu" class="w-8 sm:w-10 rounded-full cursor-pointer" src="https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fuser-KIIY5tZja8Sa0g8Z9sd4VF8TsEc2?alt=media&token=f95429ca-9934-4d34-8e2a-a8ec062961e4" alt="">
                    <div v-if="userMenu" @blur="userMenu = !userMenu" class="w-40 fixed rounded bg-leftbar bg-opacity-50 right-3 mt-2 animate__animated animate__fadeInDown animate__faster">
                        <ul class="flex flex-col">
                            <NuxtLink :to="`/profile`" class="rounded-t hover:bg-gray-700 px-5 py-1">
                                Profile
                            </NuxtLink>
                            <NuxtLink :to="`/setting`" class="hover:bg-gray-700 px-5 py-1">
                                Setting
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
            v-model="login" 
            title="Login"
            wrapper-class="animate__animated modal-wrapper"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <div class="flex flex-col justify-center">
                <t-input type="email" v-model="auth.email" placeholder="Email" name="email" class="my-2"></t-input>
                <t-input type="password" v-model="auth.password" placeholder="Password" name="password" class="my-2"></t-input>
                <button @click="logIn(auth)" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Login</button>
                <div class="flex justify-center space-x-1">
                    <span>Forget your password? <button class="focus:outline-none text-red-500 font-semibold">Reset Password</button></span>
                </div>
                <div class="flex justify-center space-x-1">
                    <p>No account? <button @click="signup=true" class="focus:outline-none font-semibold "> Sign Up</button></p>
                </div>
            </div>
        </Modal>
        <Modal 
            v-model="signup" 
            title="Signup"
            wrapper-class="animate__animated modal-wrapper"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <div class="flex flex-col justify-center">
                <t-input id="username" type="text" v-model="sign.username" placeholder="Username" name="username" class="my-2"></t-input>
                <t-input id="email" type="email" v-model="sign.email" placeholder="Email" name="email" class="my-2"></t-input>
                <t-input id="password" type="password" v-model="sign.password" placeholder="Password" name="password" class="my-2"></t-input>
                <t-input id="confirm_password" type="password" v-model="passwordCheck" placeholder="Confirm Password" name="confirm_password" class="my-2"></t-input>
                <button @click="signUpUser()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Sign Up</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import 'animate.css'
    export default {
        data() {
            return {
                searchbar: false,
                search:'',
                userMenu: false,
                width: false,

                login: false,
                signup: false,
                userConnected: false,
                
                auth: {
                    email: '',
                    password: '',
                },

                sign: {
                    username: '',
                    email: '',
                    password: '',
                },

                passwordCheck: null,
            }
        },

        beforeCreate(){
            let that = this
            this.$fire.auth.onAuthStateChanged(function (user) {
                if (user != null) {
                    if(user.uid) {
                        that.userConnected = true
                    }
                }
            })
        },

        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },

        methods:{
            async logIn(user){
                let that = this
                await this.$fire.auth.signInWithEmailAndPassword(user.email, user.password)
                .catch(error => {
                console.error('Oops...connection error', error) 
                that.$toast.error('Error while authenticating', {duration:3000, position:'top-right'})
                that.$toast.error('Email/Password incorrect', {duration:3000, position:'top-right'})
                })
                .then(async (res)=>{
                    if(res){
                        const token = that.$fire.auth.currentUser.getIdToken();
                        const {data: response} = await that.$axios.get(`https://comeback-api.herokuapp.com/users/${res.user.uid}`)
                        that.$store.commit('SET_DATA_USER', response)
                        that.$store.commit('SET_TOKEN_USER', token.i)
                        that.login = false
                        that.userConnected = true
                        that.$toast.success('You are login', {duration:3000, position:'top-right'})
                    }
                })
            },

            logout(){
                this.$fire.auth.signOut().then(() => {
                    this.$router.push('/')
                    this.userConnected = true
                    this.$toast.error('You are log out!', {duration:3000, position:'top-right'})
                }).catch((error) => {
                    console.log(error)
                })
            },

            forgotPassword(){
                
            },

            async signUpUser(){
                if(this.sign.password === this.passwordCheck){
                await this.$axios.post('https://comeback-api.herokuapp.com/users/auth/signup', this.sign)
                .catch((error) => {
                    this.$toast.error('Oops...Something went wrong', {duration:3000, position:'top-right'})
                    console.error('Oops...connection error', error)
                    this.$toast.error(error.response.data.message, {duration:3000, position:'top-right'})
                })
                .then((res) => {
                    if(res){
                        this.signup = false
                        this.logIn(this.sign)
                    }
                })
                } else {
                this.$toast.error('Your passwords is not the same', {duration:3000, position:'top-right'})
                }
            },

            handleResize() {
                if(window.innerWidth > 1024) {
                    this.width = true
                } else {
                    this.width = false
                }
            },
            showInput(){
                this.searchbar = true;

                this.$nextTick(() => {
                    this.setFocus();
                });
            },

            setFocus: function(){
                this.$refs.searchInput.focus()
            },
            
            hideInput(){
                this.searchbar = false;
            },
        },
    }
</script>