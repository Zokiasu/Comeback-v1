<template>
    <div class="bg-opacity-10 bg-gray-500 px-3 py-2 flex justify-between text-white w-full lg:p-5">
        <div class="relative">
            <img class="w-36 hidden lg:flex" src="~/assets/image/logo.png" alt="Comeback Logo">
            <span class="text-red-700 hidden lg:flex text-xs absolute bottom-0 right-0">Beta</span>
            <img class="w-8 sm:w-10 lg:hidden" src="~/assets/image/mini-logo.png" alt="Comeback Logo">
        </div>
        <div class="flex justify-center lg:justify-between lg:w-full relative lg:ml-5">
            <ul id="menu" class="flex space-x-0">
                <li @click="actualPage = 'Home'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Home' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/home.png"/>
                    <span class="hidden mt-0.5 lg:flex">Home</span>
                </li>
                <li @click="actualPage = 'Calendar'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Calendar' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/calendar.png"/>
                    <span class="hidden mt-0.5 lg:flex">Calendar</span>
                </li>
                <li @click="actualPage = 'Artist'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Artist' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/artist.png"/>
                    <span class="hidden mt-0.5 lg:flex">Artists</span>
                </li>
                <li @click="actualPage = 'Moderator'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Moderator' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/moderator.png"/>
                    <span class="hidden mt-0.5 lg:flex">Moderator</span>
                </li>
                <li @click="showInput" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1 lg:invisible">
                    <img class="w-4 h-4 mt-0.5 lg:mt-2" src="../assets/image/search.png"/>
                </li>
            </ul>
            <section id="searchbar" v-if="searchbar || width" class="flex justify-start absolute lg:static lg:w-1/3">
                <div id="search-icon" style="background-color:#3B3B3B" class="pl-2 pt-3 lg:pt-2.5 lg:pl-2.5 rounded-none rounded-l cursor-pointer">
                    <img @click="hideInput" v-if="!width" class="w-5 h-5 cursor-pointer" src="../assets/image/arrow_back.png"/>
                    <img @click="showInput" v-else class="w-5 h-5" src="../assets/image/search.png"/>
                </div>
                <input ref="searchInput" @blur="hideInput" type="text" placeholder="Find Releases, Artist, Comeback" v-model="search" style="background-color:#3B3B3B" class="w-full p-2 pl-5 text-white placeholder-white focus:outline-none rounded-r rounded-none">
            </section>
        </div>
        <div v-if="width" class="p-2 px-3 relative">
            <img class="w-6 h-6" src="~/assets/image/bell.png" alt="">
            <span class="bg-red-500 text-xs rounded-full absolute top-0 right-2 px-1">10</span>
        </div>
        <div>
            <img @click="userMenu = !userMenu" class="w-8 sm:w-10 rounded-full cursor-pointer" src="https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fuser-KIIY5tZja8Sa0g8Z9sd4VF8TsEc2?alt=media&token=f95429ca-9934-4d34-8e2a-a8ec062961e4" alt="">
            <div v-if="userMenu" @blur="userMenu = !userMenu" class="fixed bg-gray-500 right-6 mt-2">
                <ul>
                    <li class="hover:bg-gray-700 px-5 py-1">
                        Profile
                    </li>
                    <li class="hover:bg-gray-700 px-5 py-1">
                        Setting
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                actualPage: 'Home',
                searchbar: false,
                search:'',
                userMenu: false,
                width: false,
            }
        },

        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },

        methods:{
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