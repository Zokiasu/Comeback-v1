<template>
    <div>
        <t-input type="text" @change="updateInput" v-model="input" :placeholder="placehol"/>
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