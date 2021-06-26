<template>
    <div class="bg-opacity-10 bg-gray-500 px-3 py-2 flex justify-between text-white w-full lg:px-5">
        <div>
            <img class="w-36 hidden lg:flex" src="~/assets/image/logo.png" alt="Comeback Logo">
            <img class="w-8 sm:w-10 lg:hidden" src="~/assets/image/mini-logo.png" alt="Comeback Logo">
        </div>
        <div class="flex justify-center relative">
            <ul id="menu" class="flex space-x-0">
                <li @click="actualPage = 'Home'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Home' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/home.png"/>
                    <span class="hidden mt-1 lg:flex">Home</span>
                </li>
                <li @click="actualPage = 'Calendar'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Calendar' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/calendar.png"/>
                    <span class="hidden mt-1 lg:flex">Calendar</span>
                </li>
                <li @click="actualPage = 'Artist'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Artist' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/artist.png"/>
                    <span class="hidden mt-1 lg:flex">Artists</span>
                </li>
                <li @click="actualPage = 'Moderator'" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1" :class="actualPage != 'Moderator' ? '' : 'bg-gray-500'">
                    <img class="w-4 h-4 mt-1 lg:hidden" src="../assets/image/moderator.png"/>
                    <span class="hidden mt-1 lg:flex">Moderator</span>
                </li>
                <li @click="showInput" class="bg-opacity-30 px-2 sm:px-3 rounded space-x-1 pt-2 lg:pt-1">
                    <img class="w-4 h-4 mt-0.5 lg:mt-2" src="../assets/image/search.png"/>
                </li>
            </ul>
            <section id="searchbar" v-if="searchbar" class="flex justify-start absolute w-full lg:w-1/2">
                <div id="search-icon" style="background-color:#3B3B3B" class="pr-1 pl-2 rounded-none rounded-l cursor-pointer">
                    <img @click="hideInput" class="w-5 h-5 cursor-pointer" src="../assets/image/arrow_back.png"/>
                </div>
                <input ref="searchInput" @blur="hideInput" type="text" placeholder="Search" v-model="search" style="background-color:#3B3B3B" class="w-full pl-2 text-white placeholder-white focus:outline-none rounded-r rounded-none">
            </section>
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
            }
        },

        methods:{
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