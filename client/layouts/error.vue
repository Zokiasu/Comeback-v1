<template>
    <div class="h-full relative">
        <div class="absolute w-full top-1/2 transform">
            <div class="w-full flex justify-center">
                <span class="text-white text-4xl">Error 404</span>
            </div>
            <div class="w-full flex justify-center">
                <span class="text-white text-4xl my-auto">We are sorry, the request page is unfortunately not available.</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style>

</style>