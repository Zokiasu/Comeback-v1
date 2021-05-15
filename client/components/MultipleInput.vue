<template>
    <input @change="updateInput" v-model="input" :placeholder="elem" class="w-full xl:w-96 focus:outline-none p-2 text-black focus:text-white bg-gray-100 border focus:bg-gray-400 focus:border-white transition-colors duration-500" type="text">
</template>

<script>
    export default {

        props:{
            elem: String,
        },

        data(){
            return{
                input:'',
            }
        },

        methods:{
            updateInput(){
                this.$emit('updateinput', this.input)
            }
        },
    }
</script>