<template>
    <div class="text-white text-lg space-y-7 p-10 m-10 bg-gray-500 bg-opacity-20">
      <div class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
        <span class="font-semibold">Profile Picture</span>
        <img class="w-20 h-20 object-cover" :src="img"/>
        <button class="bg-red-700 my-auto px-5 py-1">Upload</button>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Display Name</span>
        <t-input @change="newObjectToApi('name', displayName)" autocomplete="false" type="text" v-model="displayName" :value="displayName"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Email</span>
        <t-input @change="newObjectToApi('email', email)" autocomplete="false" type="text" v-model="email" :value="email"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">User ID</span>
        <span>{{userId}}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Country</span>
        <t-input @change="newObjectToApi('country', country)" autocomplete="false" type="text" v-model="country" :value="country"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Date of Birth</span>
        <t-datepicker
          class="text-black"
          v-model="dateOfBirth"
          @change="newObjectToApi('dateOfBirth', dateOfBirth)"
          placeholder="Release Date"
          initial-view="month" dateFormat='Y-m-d' clearable timepicker amPm>
        </t-datepicker>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Desactive your account ?</span>
        <button class="bg-red-700 px-5 py-1">Yes, desactive my account</button>
      </div>
    </div>
</template>

<script>
  export default {

    data(){
        return {
            img: 'https://foot44.fff.fr/wp-content/uploads/sites/35/2019/10/Silhouette-Homme.jpg',
            displayName:'Guest',
            email:'guest@gmail.com',
            userId:'000000',
            country:'France',
            dateOfBirth:'01/01/2010',
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
