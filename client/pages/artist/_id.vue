<template>
  <div>
    <div id="body-artist-file" class="px-10 space-y-5">
      <div id="tilte-artist">
        <h1 class="text-white text-4xl mt-5 mb-2">{{this.$store.state.artistList[this.$route.params.id].name}}</h1>
        <div class="border-b border-gray-500 mr-40"></div>
      </div>
      <div class="xl:grid xl:grid-cols-5 gap-5">
        <img class="w-80 mx-15" :src="this.$store.state.artistList[this.$route.params.id].picture" alt="Artist Picture"/>
        <div class="text-white flex flex-col justify-between xl:col-start-2 xl:col-end-5 2xl:col-end-4">
          <div>
            <h1 class="text-white text-xl">Description</h1>
            <div class="border-b border-red-700 border-1 my-2 mr-40"></div>
            <div>
              <span class="mt-2 text-base"> {{this.$store.state.loremipsum}} </span>
            </div>
          </div>
          <section class=" mx-3 pt-2 flex space-x-6">
              <a href="#"><img class="w-9" src="../../assets/image/facebook.png"/></a>
              <a href="#"><img class="w-9" src="../../assets/image/twitter.png"/></a>
              <a href="#"><img class="w-9" src="../../assets/image/instagram.png"/></a>
          </section>
        </div>
      </div>
    </div>

    <div class="container">
      <div>
        <h1 class="title">
          Artist : {{ this.$route.params.id}}
        </h1>
        <img class="rounded-full mx-auto h-40 w-40 object-cover" :src="this.$store.state.artistList[this.$route.params.id].picture" alt="Artist Picture"/>
        <h2 class="text-white text-2xl"> {{this.$store.state.artistList[this.$route.params.id].name}} </h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

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
