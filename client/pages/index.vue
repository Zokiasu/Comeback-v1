<template>
  <div>
    <div class="text-white flex space-x-5 justify-end m-5">
      <button @click="login=true" class="focus:outline-none hover:text-red-700">Login</button>
      <button @click="signup=true" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Sign Up</button>
    </div>
    <Modal v-model="login" title="Login">
      <div class="flex flex-col justify-center">
        <t-input type="email" v-model="log.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input type="password" v-model="log.password" placeholder="Password" name="password" class="my-2"></t-input>
        <button class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Login</button>
      </div>
    </Modal>
    <Modal v-model="signup" title="Signup">
      <div class="flex flex-col justify-center">
        <t-input id="email" type="email" v-model="sign.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input id="password" type="password" v-model="sign.password" placeholder="Password" name="password" class="my-2"></t-input>
        <t-input id="confirm_password" type="password" v-model="sign.passwordCheck" placeholder="Confirm Password" name="confirm_password" class="my-2"></t-input>
        <button class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Sign Up</button>
      </div>
    </Modal>
    <div class="flex justify-center mx-auto">
      <Logo class="justify-self-center mx-auto"/>
    </div>
    <div class="w-full my-20 relative grid grid-flow-col auto-cols-col auto-rows-auto gap-2 max-w-full">
      <img class="object-cover" style="min-height:15rem;" src="https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Flistartist.png?alt=media&token=ad9b2408-7966-4d03-bd50-4d41910ecc7f" alt="">
      <div class="absolute bg-mainbg bg-opacity-80 top-20 md:top-20 lg:top-10 2xl:top-16 ms:left-10">
        <h2 class="text-white py-5 px-10 md:text-xl lg:text-2xl xl:text-3xl w-full" style="max-width:45rem;line-height: 2em;">Find your favorite artists and track all their comeback in one place</h2>
      </div>
    </div>
    <div class="flex justify-center text-white my-32">
      <span class="text-center text-xl md:text-3xl xl:text-4xl mx-10 2xl:mx-60">Create with us the best place where you can find and track all your favorite musicians.</span>
    </div>
    <div class="w-full mt-20 px-10">
      <div class="w-full flex flex-col space-y-5 justify-center border-t-2 border-gray-500 py-5">
        <ul class="flex space-x-1.5 text-white justify-center text-xl">
          <li>
            <span>©</span>
          </li>
          <li>
            <span>Studeler Dev.</span>
          </li>
          <li>
            <span>-</span>
          </li>
          <li>
            <span>Cozy Codeur</span>
          </li>
          <li>
            <span>|</span>
          </li>
          <li>
            <a href="#" class="hover:text-red-700">About</a>
          </li>
          <li>
            <span>-</span>
          </li>
          <li>
            <a href="#" class="hover:text-red-700">Contact</a>
          </li>
          <li>
            <span>-</span>
          </li>
          <li>
            <a href="#" class="hover:text-red-700">Terms</a>
          </li>
          <li>
            <span>-</span>
          </li>
          <li>
            <a href="#" class="hover:text-red-700">Privacy Policy</a>
          </li>
        </ul>
        <ul class="flex space-x-7 justify-center">
          <li>
            <a href="#"><img class="w-5" src="../assets/image/facebook.png"/></a>
          </li>
          <li>
            <a href="#"><img class="w-5" src="../assets/image/twitter.png"/></a>
          </li>
          <li>
            <a href="#"><img class="w-5" src="../assets/image/instagram.png"/></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'presentation',
    data(){
      return{
        login: false,
        signup: false,
        log: {
          email: null,
          password: null,
        },
        sign: {
          email: null,
          password: null,
          passwordCheck: null,
        }
      }
    },

    head() {
      return {
        title: 'Comeback - Track every next album, single, EP releases.',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Find your favorite artists and track all their comeback in one place.'
          }
        ]
      }
    },
  }
</script>

<style>
  /* Sample `apply` at-rules with Tailwind CSS
  .container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
  }
  */
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
