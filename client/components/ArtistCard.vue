<template>
  <div class="text-white">
    <div class="h-20 md:h-40 w-20 md:w-40 mx-auto">
    <NuxtLink :to="`/${userId}/artist/${this.id}`">
      <img class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover" :src="this.image ? this.image : defaultImage" alt="Artist Picture"/>
    </NuxtLink>
    </div>
    <NuxtLink :to="`/${userId}/artist/${this.id}`"><h3 class="font-semibold text-center hover:underline"> {{this.name}} </h3></NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "artistCard",

    props: {
      id: '',
      name: String,
      image: String,
    },
    
    computed: {
      userId(){
        return this.$fire.auth.currentUser.uid
      },
      
      defaultImage(){
        return this.$store.state.imageArtistDefault
      },
    }
  }
</script>