<template>
  <div class="text-white">
    <div class="h-20 md:h-40 w-20 md:w-40 mx-auto">
    <NuxtLink :to="`/artist/${this.id}`"><img class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover" :src="this.image ? this.image : this.$store.state.imageArtistDefault" alt="Artist Picture"/></NuxtLink>
    </div>
    <h3 class="font-semibold text-center"> {{this.name}} </h3>
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

    data(){
      return {
        
      }
    },
  }
</script>