<template>
    <div class="text-white text-lg space-y-7 p-5 m-10 bg-gray-500 bg-opacity-20 relative">
      <Modal v-model="disableAccount" title="Disable Account" wrapper-class="modal-wrapper">
        <div class="flex flex-col justify-center space-y-3">
          <span>Are you sure you want to disable your account?</span>
          <div class="flex text-white space-x-5 justify-start">
            <button class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-green-500 hover:bg-green-700 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10">Yes, disable</button>
            <button @click="disableAccount=false" class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10">No, cancel</button>
          </div>
        </div>
      </Modal>
      <div class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
        <span class="font-semibold">Profile Picture</span>
        <img class="w-40 h-40 rounded-full object-cover" :src="user.avatar ? user.avatar : require(`~/assets/image/profile.png`)">
        <div>
            <button 
                class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-900 hover:bg-red-700 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10"
                @click="launchImageFile"
                :disabled="isUploadingImage"
                type="button">
                {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
            </button>
            <input
                ref="imageFile"
                @change.prevent="uploadImageFile($event.target.files)"
                type="file"
                accept="image/png, image/jpeg"
                class="hidden">
        </div>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Display Name</span>
        <t-input @change="newObjectToApi('username', user.username)" autocomplete="false" type="text" v-model="user.username" :value="user.username"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Email</span>
        <t-input @change="newObjectToApi('email', user.email)" autocomplete="false" type="text" v-model="user.email" :value="user.email"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">User ID</span>
        <span>{{user.id}}</span>
      </div>
      <div v-if="user.country" class="flex flex-col">
        <span class="font-semibold">Country</span>
        <t-input @change="newObjectToApi('country', user.country)" autocomplete="false" type="text" v-model="user.country" :value="user.country"/>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">Date of Birth</span>
        <t-datepicker
          class="text-black"
          v-model="dateOfBirth"
          @change="newObjectToApi('dateOfBirth', dateOfBirth)"
          placeholder="Release Date"
          initial-view="month" dateFormat='Y-m-d' clearable>
        </t-datepicker>
      </div>
      <div class="flex flex-row">
        <span class="font-semibold">Desactive your account ?</span>
        <div class="mx-2">
          <button @click="disableAccount=true" class="rounded-sm flex justify-center transition duration-500 ease-in-out transform hover:font-bold text-red-900 hover:text-red-500">Yes, desactive my account</button>
        </div>
      </div>
      <div class="w-full flex justify-end">
        <button @click="editUser()" class="px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold focus:outline-none">Save Changes</button>
      </div>
    </div>
</template>

<script>
  export default {

    data(){
      return {
          dateOfBirth:'01/01/2010',
          user:{},
          editToApi:{},
          isUploadingImage: false,
          disableAccount: false,
      }
    },

    async asyncData({ $axios, params }){
      let user = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.userid}`)
      return {user}
    },

    methods: {
      newObjectToApi(key, value){
          this.editToApi[key] = value
      },

      async editUser() {
          await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.$route.params.userid}`, this.editToApi).catch((error) => {console.log(error)}).then(response=>{
              console.log(response)
              //Add Alert success
          })
      },

      async disableUser(){
        await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.$route.params.userid}`, {username: null, email: null,}).catch((error) => {console.log(error)}).then(response=>{
            console.log(response)
            //Add Alert success
        })
        
        this.$fire.auth.signOut().then(() => {
            this.$router.push('/')
        }).catch((error) => {
            console.log(error)
        })
      },

      launchImageFile () {
          this.$refs.imageFile.click()
      },

      uploadImageFile (files) {
          if (!files.length) {
              return
          }
          let file = files[0]

          if (!file.type.match('image.*')) {
              alert('Please upload an image.')
              return
          }

          let metadata = {
              contentType: file.type
          }

          this.isUploadingImage = true

          let imageRef = this.$fire.storage.ref(`images/user-${this.user.id}`)

          let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
              return snapshot.ref.getDownloadURL().then((url) => {
                  return url
              })
          }).catch((error) => {
              console.error('Error uploading image', error)
          })
          uploadTask.then((url) => {
              this.newObjectToApi("avatar", url)
              this.user.avatar = url
              this.isUploadingImage = false
          })
      },
    },
  }
</script>

<style>
  .modal-wrapper {
    display: flex;
    align-items: center;
  }
  .modal-wrapper .vm {
    top: auto;
  }
</style>