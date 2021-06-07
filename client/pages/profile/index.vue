<template>
    
</template>
<script>
    export default {
        beforeCreate(){
            let that = this
            this.$fire.auth.onAuthStateChanged(async function (user) {
                if (user != null) {
                    that.$router.push(`/profile/${user.uid}`)
                }
            })
        },
    }
</script>