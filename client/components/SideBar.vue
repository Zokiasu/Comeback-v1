<template>
    <div class="bg-leftbar flex flex-col relative text-white texts min-h-screen">
        <header class="mx-5">
            <NuxtLink to="/_userid/calendar"></NuxtLink>
            <img class=" w-60" src="../assets/image/comeback-logo.png"/>
        </header>
        <section class="border-t-2 border-gray-400 mx-5 py-5">
            <nav>
                <ul class="space-y-5">
                    <li>
                        <div class="flex bg-select-leftbar text-white rounded">
                            <button class="pr-1 pl-2 rounded-none rounded-l py-1.5">
                                <div class="">
                                    <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
                                </div>
                            </button>
                            <input type="text" placeholder="Search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-transparent">
                        </div>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-calendar' ? 'bg-transparent' : 'bg-select-leftbar'" to="/_userid/calendar">
                            <img class="w-4 h-4 mt-1" src="../assets/image/calendar.png"/>
                            <span>Calendar</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-artist' ? 'bg-transparent' : 'bg-select-leftbar'" to="/_userid/artist">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                            <span>Artists</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-profile' ? 'bg-transparent' : 'bg-select-leftbar'" to="/_userid/profile">
                            <img class="w-4 h-4 mt-1" src="../assets/image/profile.png"/>
                            <span>Profile</span>
                        </NuxtLink>
                    </li>
                    <!--<li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-discover' ? 'bg-transparent' : 'bg-select-leftbar'" to="/_userid/discover">
                            <img class="w-4 h-4 mt-1" src="../assets/image/artist.png"/>
                            <span>Discover</span>
                        </NuxtLink>
                    </li>-->
                    <li>
                        <NuxtLink class="px-3 py-1 rounded flex space-x-2" :class="$route.name !== 'userid-setting' ? 'bg-transparent' : 'bg-select-leftbar'" to="/_userid/setting">
                            <img class="w-4 h-4 mt-1" src="../assets/image/setting.png"/>
                            <span>Setting</span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </section>
        <section class="border-t-2 border-gray-400 mx-5 py-5 h-full">
            <nav>
                <ul class="space-y-5">
                    <li>
                        <NuxtLink :to="`/_userid/add/release`" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                            <span>New Comeback</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/_userid/moderator/lastupdated" class="px-3 py-1 rounded flex space-x-2" >
                            <img class="w-4 h-4 mt-1" src="../assets/image/setting.png"/>
                            <span>Moderator Panel</span>
                        </NuxtLink>
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
