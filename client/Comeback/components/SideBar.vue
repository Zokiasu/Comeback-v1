<template>
    <div class="bg-leftbar max-h-screen flex flex-col relative text-white texts">
        <header class="mx-5">
            <img src="../assets/image/comeback-logo.png"/>
        </header>
        <section class="border-t-2 border-gray-400 mx-5 py-5">
            <nav>
                <ul class="space-y-5">
                    <li>
                        <router-link class="bg-gray-500 px-3 py-1 rounded flex space-x-2" to="/calendar">
                            <img class="w-4 h-4 mt-1" src="../assets/image/home.png"/>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="bg-gray-500 px-3 py-1 rounded flex space-x-2" to="/search">
                            <img class="w-4 h-4 mt-1" src="../assets/image/search.png"/>
                            <span>Search</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="bg-gray-500 px-3 py-1 rounded flex space-x-2" to="/artist">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                            <span>Artists</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="bg-gray-500 px-3 py-1 rounded flex space-x-2" to="/profile">
                            <img class="w-4 h-4 mt-1" src="../assets/image/profile.png"/>
                            <span>Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="bg-gray-500 px-3 py-1 rounded flex space-x-2" to="/setting">
                            <img class="w-4 h-4 mt-1" src="../assets/image/setting.png"/>
                            <span>Setting</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </section>
        <footer class="w-full absolute bottom-0 left-0 space-y-3 my-5 justify-center">
            <section class=" border-t-2 border-gray-400 mx-3 pt-2">
                <p class="text-center font-semibold"><a href="#">Sign Out</a></p>
            </section>
            <section class="border-t-2 border-gray-400 mx-3 pt-2 flex space-x-6 justify-center">
                <a href="#"><img class="w-5" src="../assets/image/facebook.png"/></a>
                <a href="#"><img class="w-5" src="../assets/image/twitter.png"/></a>
                <a href="#"><img class="w-5" src="../assets/image/instagram.png"/></a>
            </section>
            <section class="border-t-2 border-gray-400 mx-3 pt-2 text-sm">
                <p class="text-center"><a href="#">Contact</a> - <a href="#">About</a> - <a href="#">Terms</a> - <a href="#">Privacy Policy</a></p>
            </section>
            <section class="mx-3 text-sm">
                <p class="text-center">©2021<br><a href="#">Studeler Dev.</a> - <a href="#">Cozy Codeur</a></p>
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
