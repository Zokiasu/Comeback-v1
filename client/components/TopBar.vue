<template>
    <div class="relative text-white texts w-full flex mt-2">
        <section class="w-full">
                <ul class="flex space-x-3 w-full justify-center relative">
                    <li>
                        <button @click="backToHome()" class="focus:outline-none h-full ml-5"><img class="h-7 w-7 cursor-pointer absolute left-5 top-0" src="../assets/image/mini-logo.png"/></button>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-calendar' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/${userId}/calendar`">
                            <img class="w-4 h-4 mt-1" src="../assets/image/calendar.png"/>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-artist' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/${userId}/artist`">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-profile' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/${userId}/profile`">
                            <img class="w-4 h-4 mt-1" src="../assets/image/profile.png"/>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-setting' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/${userId}/setting`">
                            <img class="w-4 h-4 mt-1" src="../assets/image/setting.png"/>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-search' ? 'bg-transparent' : 'bg-select-leftbar'" :to="`/${userId}/search`">
                            <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
                        </NuxtLink>
                    </li>
                    <li>
                        <button @click="logout()" class="focus:outline-none"><img class="h-6 w-6 cursor-pointer absolute right-5 top-1" src="https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Flogout.png?alt=media&token=6e8430d0-a180-4492-9249-6714142b2f94" alt="logout-logo"></button>
                    </li>
                </ul>
        </section>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                search:'',
            }
        },
    
        computed: {
            userId(){
                return this.$route.params.userid
            },

            adminCheck(){
                return this.adminChecker()
            }
        },

        methods:{

            logout(){
                this.$fire.auth.signOut().then(() => {
                    console.log('Signed Out');
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
                        let userData = await that.$axios.$get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
                        if(userData.role != "NONE") {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                })
            },

            backToHome() {
                let that = this
                this.$fire.auth.onAuthStateChanged(function (user) {
                    if (user != null) {
                        that.$router.push(`/${user.uid}/calendar`)
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
