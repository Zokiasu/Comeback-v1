<template>
  <div class="flex flex-col mx-auto my-auto mt-auto">
    <div class="mx-auto">
      <img src="../assets/image/logo.png" alt="">
    </div>
    <form action="login" class="flex flex-col space-y-6">
      <div class="flex flex-col space-y-4">
        <input v-if="signUpOption" type="text" name="username" placeholder="Username" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input type="text" name="email" placeholder="Email" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input type="password" name="password" placeholder="Password" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input v-if="signUpOption" type="password" name="password" placeholder="Password Verification" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
      </div>
      <div v-if="!signUpOption" class="flex flex-col space-y-4">
        <button type="submit" class="bg-red-700 rounded py-2 text-white font-semibold">Login</button>
      </div>
      <div v-else class="flex flex-col space-y-4">
        <button type="submit" class="bg-red-700 rounded py-2 text-white font-semibold">Sign Up</button>
      </div>
    </form>
    <div class="py-5">
      <button v-if="!signUpOption" @click="signUpOption=!signUpOption" class="text-center text-white hover:text-gray-700">
        You don't have an account? Register
      </button>
      <button v-else @click="signUpOption=!signUpOption" class="text-center text-white hover:text-gray-700">
        You have an account? Login
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Authentification',
    data() {
      return {
        username: '',
        password: '',
        signUpOption: false
      }
    },
    methods:{
      loginAuthentification(){

      },
      signUpAuthentification(){

      }
    }
  }
</script>