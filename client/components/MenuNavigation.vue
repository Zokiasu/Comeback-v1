<template>
  <nav class="relative bg-gray-500 bg-opacity-10">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button @click="navMenu = !navMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <NuxtLink :to="`/`" class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="../assets/image/mini-logo.png" alt="Comeback">
            <img class="hidden lg:block h-8 w-auto" src="../assets/image/logo.png" alt="Comeback">
          </NuxtLink>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4" @click="userMenu=false">
              <NuxtLink :to="`/`" class="px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.name != 'index' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                Home
              </NuxtLink>

              <NuxtLink :to="`/calendar`" class="px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                Calendar
              </NuxtLink>

              <NuxtLink :to="`/artist`" class="px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.name != 'artist' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                Artists
              </NuxtLink>

              <NuxtLink v-if="isAdmin" :to="`/calendar`" class="px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                Dashboard
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div v-if="userConnected" class="hidden lg:flex">
            <button class="bg-red-800 text-white px-2 py-1 rounded shadow flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 my-auto mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Comeback</span>
            </button>
          </div>
          <div class="text-white">
            <button @click="signupModal=!signupModal" class="font-semibold">Login</button>
          </div>
          <!-- Profile dropdown -->
          <div v-if="userConnected" class="ml-3 relative">
            <div>
              <button @click="userMenu = !userMenu" type="button" class="bg-gray-500 bg-opacity-10 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              </button>
            </div>
            <!--
              Dropdown menu, show/hide based on menu state.
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div v-if="userMenu" class="transition ease-in-out duration-100 transform opacity-100 scale-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
              <NuxtLink :to="`/`" class="block px-4 py-2 text-sm text-gray-700"
                :class="$route.name != 'index' ? '' : 'bg-gray-300 text-white'">
                Your Profile
              </NuxtLink>
              <NuxtLink :to="`/calendar`" class="block px-4 py-2 text-sm text-gray-700"
                :class="$route.name != 'calendar' ? '' : 'bg-gray-300 text-white'">
                Settings
              </NuxtLink>
              <NuxtLink :to="`/calendar`" class="block px-4 py-2 text-sm text-gray-700"
                :class="$route.name != 'calendar' ? '' : 'bg-gray-300 text-white'">
                Sign out
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="navMenu" class="absolute bg-gray-500 bg-opacity-10 w-full sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1" @click="navMenu=false">
        <NuxtLink :to="`/`" class="block px-3 py-2 rounded-md text-base font-medium"
          :class="$route.name != 'index' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
          Home
        </NuxtLink>

        <NuxtLink :to="`/calendar`" class="block px-3 py-2 rounded-md text-base font-medium"
          :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
          Calendar
        </NuxtLink>

        <NuxtLink :to="`/calendar`" class="block px-3 py-2 rounded-md text-base font-medium"
          :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
          Artists
        </NuxtLink>

        <NuxtLink :to="`/calendar`" class="block px-3 py-2 rounded-md text-base font-medium"
          :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
          Dashboard
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name:'MenuNavigation',
    
    data() {
      return {
        navMenu: false,
        userMenu: false,
        userConnected: false,
        isAdmin: false,
        signupModal: false
      }
    },
  }
</script>