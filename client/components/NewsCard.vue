<template>
    <div class="bg-gray-500 bg-opacity-30 px-3 py-1 rounded flex flex-col w-full text-white">
        <div class="flex space-x-2 focus-within: w-full justify-between border-b border-red-700" v-if="element.artist">
            <div class="font-semibold mt-auto h-full flex space-x-1">
                <NuxtLink :to="`/artist/${element.artist.id}`" target="_blank">{{element.artist.name}}'s news</NuxtLink>
                <img v-if="element.verified" class="w-4 my-auto" src="~/assets/image/approval.png" alt="Verified mark">
            </div>            
            <NuxtLink class="text-right text-xs mt-auto mb-1 h-full" :to="`/profile/${element.user.id}`" target="_blank" v-if="element.user">by {{element.user.username}}</NuxtLink>
        </div>
        <p class="text-sm my-1">{{element.message}}</p>
    </div>
</template>

<script>
    export default {
        props:['element'],
    }
</script>

<style>

</style>