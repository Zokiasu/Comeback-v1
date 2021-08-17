<template>
    <NuxtLink :to="`/artist/${element.artist.id}`" class="Card flex flex-col space-y-5 bg-gray-500 bg-opacity-30 text-white rounded-xl w-56">
        <div class="flex justify-between px-3 py-2">
            <div class="flex flex-col">
                <div class="font-semibold">
                    {{element.artist.name}}'s news
                </div>
                <div class="text-xs">
                    by {{element.user ? element.user.username : 'Unknow'}}
                </div>
            </div>
            <div>
                <img class="w-5 my-auto" src="~/assets/image/approval.png" alt="Verified mark">
            </div>
        </div>
        <div class="flex justify-center">
            <img class="w-36 h-36 rounded-full object-cover" :src="element.artist.image" alt="">
        </div>
        <div class="w-full h-full bg-black-three flex justify-center py-3 px-5 rounded-b-xl mb-0 mt-auto">
            <span class="text-center my-auto">{{element.message}}</span>
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        props:['element'],
    }
</script>

<style>

</style>