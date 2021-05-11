<template>
  <div class="container">
    <div>
      <h1 class="title">
        Artist : {{ this.$route.params.id}}
      </h1>
      <img class="rounded-full mx-auto h-40 w-40 object-cover" :src="this.$store.state.artistList[this.$route.params.id].picture" alt="Artist Picture"/>
      <h2 class="text-white text-2xl"> {{this.$store.state.artistList[this.$route.params.id].name}} </h2>
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
