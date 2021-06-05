<template>
    <div class="flex space-x-1">
        <a v-if="input" :href="input" target="_blank"><img class="w-5 h-5 mt-2" :src="`https://www.google.com/s2/favicons?domain=${input}`"/></a>
        <t-input class="w-full" type="text" @change="updateInput" v-model="input" :placeholder="placehol"/>
    </div>
</template>

<script>
    export default {

        props:{
            elem: String,
            placehol: String,
        },

        data(){
            return{
                input:'',
            }
        },

        created(){
            this.input = JSON.parse(JSON.stringify(this.elem))
        },

        methods:{
            updateInput(){
                this.$emit('updateinput', this.input)
            }
        },
    }
</script>