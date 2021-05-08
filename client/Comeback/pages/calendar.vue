<template>
  <div class="grid gap-3 p-10 justify-center" :class="width ? 'grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10' : 'grid-cols-1 gap-3'">
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
    <ReleaseCard :computer="width" />
  </div>
</template>

<script>
  export default {

      data(){
          return {
              hello: false,
              width: false,
          }
      },

      mounted() {
          window.addEventListener('resize', this.handleResize);
          this.handleResize();
      },

      methods: {
        handleResize() {
          if(window.innerWidth > 768) {
            this.width = true
          } else {
            this.width = false
          }
        },
      }
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
