<template>
    <div class="bg-leftbar flex flex-col relative text-white texts min-h-screen">
        <header class="mx-5">
            <img class=" w-60" src="../assets/image/comeback-logo.png"/>
        </header>
        <section class="border-t-2 border-gray-400 mx-5 pt-5 h-full">
            <nav>
                <ul>
                    <li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'search' ? 'bg-transparent' : 'bg-gray-500'" to="/search">
                            <img class="w-4 h-4 mt-1" src="../assets/image/search.png"/>
                            <span>Search</span>
                        </router-link>
                    </li>
                    <li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'calendar' ? 'bg-transparent' : 'bg-gray-500'" to="/calendar">
                            <img class="w-4 h-4 mt-1" src="../assets/image/calendar.png"/>
                            <span>Calendar</span>
                        </router-link>
                    </li>
                    <li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'artist' ? 'bg-transparent' : 'bg-gray-500'" to="/artist">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                            <span>Artists</span>
                        </router-link>
                    </li>
                    <li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'profile' ? 'bg-transparent' : 'bg-gray-500'" to="/profile">
                            <img class="w-4 h-4 mt-1" src="../assets/image/profile.png"/>
                            <span>Profile</span>
                        </router-link>
                    </li>
                    <!--<li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'discover' ? 'bg-transparent' : 'bg-gray-500'" to="/discover">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                            <span>Discover</span>
                        </router-link>
                    </li>-->
                    <li class="mb-5">
                        <router-link class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'setting' ? 'bg-transparent' : 'bg-gray-500'" to="/setting">
                            <img class="w-4 h-4 mt-1" src="../assets/image/setting.png"/>
                            <span>Setting</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </section>
        <section class="border-t-2 border-gray-400 mx-5 py-5 h-full">
            <nav>
                <ul>
                    <li class="mb-5">
                        <!--<button class="Button bg-red-700 w-full">Add New Release</button>-->
                        <button class="transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold w-full py-2 texts">New Comeback</button>
                    </li>
                </ul>
            </nav>
        </section>
        <footer class="w-full bottom-0 left-0 space-y-3 my-5 justify-center">
            <section class=" border-t-2 border-gray-400 mx-3 pt-2">
                <p class="text-center font-semibold"><a href="#">Sign Out</a></p>
            </section>
            <section class="border-t-2 border-gray-400 mx-3 pt-2 flex space-x-6 justify-center">
                <a href="#"><img class="w-5" src="../assets/image/facebook.png"/></a>
                <a href="#"><img class="w-5" src="../assets/image/twitter.png"/></a>
                <a href="#"><img class="w-5" src="../assets/image/instagram.png"/></a>
            </section>
            <section class="border-t-2 border-gray-400 space-y-2 mx-3 pt-2 text-sm">
                <p class="text-center"><a href="#">Contact</a> - <a href="#">About</a> - <a href="#">Terms</a> - <a href="#">Privacy Policy</a></p>
                <p class="text-center">©2021<br><a href="#">Studeler Dev</a> - <a href="#">Cozy Codeur</a></p>
            </section>
        </footer>
    </div>
</template>

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
