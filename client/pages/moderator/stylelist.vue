<template>
    <div class="p-5 px-10 space-y-5">
        <ModeratorMenu/>
        <div class="flex flex-wrap">
            <div class="bg-gray-500 text-white rounded flex space-x-1 mr-2 mb-2 p-2 px-3" v-for="(style, index) in styleList" :key="style.id">
                <span>{{style.name}}</span>
                <img class="cursor-pointer w-4 h-4 my-auto" src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/>
                <img class="cursor-pointer w-4 h-4 my-auto" @click="deleteStyle(style.id, style, index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            styleList:[],
        }
    },

    async asyncData({ $axios, params }){
        const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')

        return {styleList}
    },

    methods:{
        deleteStyle(id, object, index){
            this.$axios.delete(`https://comeback-api.herokuapp.com/styles/${id}`, object)
            .then(response=>{
                this.styleList.splice(index, 1)
            })
        }
    },
}
</script>

<style>

</style>