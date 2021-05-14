<template>
  <div class="text-white">
    <div class="h-20 md:h-40 w-20 md:w-40 mx-auto">
    <NuxtLink :to="`/artist/${id}`"><img class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover" :src="img" alt="Artist Picture"/></NuxtLink>
    </div>
    <h3 class="font-semibold text-center"> {{name}} </h3>
  </div>
</template>

<script>
  export default {

    props: ['artist', 'index'],

    data(){
        return {
            id: '-1',
            name:'Artist Name',
            img: 'https://foot44.fff.fr/wp-content/uploads/sites/35/2019/10/Silhouette-Homme.jpg',
        }
    },

    created(){
      this.id=this.index
      if(this.artist.name) this.name=this.artist.name
      if(this.artist.picture) this.img=this.artist.picture
    },
  }
</script>