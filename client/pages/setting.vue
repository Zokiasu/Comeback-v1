<template>
  <div class="text-white text-lg space-y-7 p-10">
    <div class="flex space-x-5">
      <span class="text-gray-500 font-semibold">Profile Picture :</span>
      <img class="w-20 h-20 object-cover" :src="img"/>
      <button class="bg-red-700 my-auto px-5 py-1">Upload</button>
    </div>
    <div>
      <span class="text-gray-500 font-semibold">Display Name :</span>
      <span>Guest</span>
    </div>
    <div>
      <span class="text-gray-500 font-semibold">Email :</span>
      <span>guest@gmail.com</span>
    </div>
    <div>
      <span class="text-gray-500 font-semibold">User ID :</span>
      <span class="text-gray-500">000000</span>
    </div>
    <div>
      <span class="text-gray-500 font-semibold">Country :</span>
      <span>France</span>
    </div>
    <div>
      <span class="text-gray-500 font-semibold">Date of Birth :</span>
      <span>01/01/1970</span>
    </div>

    <div>
      <span class="text-gray-500 font-semibold">Desactive your account ?</span>
      <button class="bg-red-700 px-5 py-1">Yes, desactive my account</button>
    </div>
  </div>
</template>

<script>
  export default {

    data(){
        return {
            img: 'https://foot44.fff.fr/wp-content/uploads/sites/35/2019/10/Silhouette-Homme.jpg',
        }
    },

  }
</script>

<style>
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
</style>
