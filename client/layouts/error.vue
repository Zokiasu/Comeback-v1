<template>
    <div>
        <div class="w-full flex flex-col justify-center text-white text-xl">
            <span>Error 404</span>
            <span>We are sorry, the request page is unfortunately not available.</span>
        </div>
    </div>
</template>

<script>
  export default {
    layout: 'presentation',
    
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style>

</style>