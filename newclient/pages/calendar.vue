<template>
    <div>
        <div id="button">
            <div>
                <t-select
                id="artists-type-selector"
                class="focus:outline-none text-xs"
                v-model="userPreference"
                :options="[
                    { value: true, text: 'My Comeback' },
                    { value: false, text: 'All Comeback' },
                ]">
                </t-select>
            </div>
            <div>
                <t-datepicker
                    class="text-black"
                    v-model="dateStart"
                    placeholder="Birthday"
                    initial-view="month" dateFormat='Y-m-d' clearable>
                </t-datepicker>
            </div>
        </div>
        <div id="release-date">
            <div id="date">
                
            </div>
            <div id="release">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                userPreference:'false',
                dateStart: new Date(),
                dateList: {},

                
            }
        },

        watch: {
            userPreference: {
                immediate: true,
                handler(userPreference) {
                    if (process.client) {
                        this.fetchData()
                    }
                }
            },

            dateStart: {
                immediate: true,
                handler(dateStart) {
                    if (process.client) {
                        this.fetchData()
                    }
                }
            },
        },

        methods:{
            async fetchData() {
                if(this.userPreference == "true"){
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userData.id}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                        this.dateList = {}
                        for(let [key, value] of Object.entries(response.data)) {
                            this.dateList[key] = value
                        }
                        this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                        this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                    })
                    .catch(err => {
                        console.log(err);
                    });
                } else {
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                        if(Object.entries(response.data).length !== 0) {
                            this.dateList = {}
                            for(let [key, value] of Object.entries(response.data)) {
                                this.dateList[key] = value
                            }
                            this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                            this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            },
        },
    }
</script>

<style>

</style>s