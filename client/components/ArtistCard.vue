<template>
  <div id="artist-card" class="text-white">
    <div id="artist-image" class="h-20 md:h-40 w-20 md:w-40 mx-auto">
      <NuxtLink :to="`/artist/${this.id}`">
        <img class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover" v-lazy="this.image ? this.image : defaultArtistImage" :key="this.image ? this.image : defaultArtistImage" :alt="this.name"/>
      </NuxtLink>
    </div>
    <NuxtLink id="artist-name" :to="`/artist/${this.id}`"><h3 class="font-semibold text-center hover:underline">{{this.name}}</h3></NuxtLink>
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
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
      
      defaultArtistImage(){
        return this.$store.state.imageArtistDefault
      },
    }
  }
</script>