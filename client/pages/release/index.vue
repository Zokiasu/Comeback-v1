<template>
    <div>
        <div id="button" class="flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between p-10">
            <div>
                <t-select
                id="artists-type-selector"
                class="focus:outline-none"
                v-model="userPreference"
                :options="[
                    { value: false, text: 'All Comeback' },
                    { value: true, text: 'My Comeback' },
                ]">
                </t-select>
            </div>
            <div>
                <t-datepicker
                    class="text-black"
                    v-model="dateStart"
                    placeholder="Start Date"
                    initial-view="month"
                    dateFormat='Y-m-d'
                    clearable>
                </t-datepicker>
            </div>
        </div>
        <div id="release-date" class="space-y-10">
            <div v-for="(date, index) in dateList" :key="index" class="justify-center texts text-white mx-10 animate__animated animate__fadeIn">
                <div class="top-0 bg-mainbg z-50">
                    <h1 class="font-semibold text-2xl md:text-4xl"> {{new Date(index).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric', year: 'numeric' })}} </h1>
                </div>
                <div class="w-full flex space-x-5 overflow-y-scroll py-5 texts text-white">
                    <ReleaseCard
                        v-for="release in date.releases"
                        :release="release"
                        :key="release.id">
                    </ReleaseCard>
                </div>
            </div>
            <InfiniteLoading v-if="stopInfiniteScroll" @infinite="infiniteScroll"></InfiniteLoading>
            <div v-if="Object.entries(dateList).length < 1 && !stopInfiniteScroll" class="px-5 mt-5">
                <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Release Scheduled.</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                userPreference:'false',
                stopInfiniteScroll: true,
                dateStart: null,
                startDate: new Date('01/01/2021'),
                endDate: new Date(),
                dateList: {},
                userId: null,
                gapDate: 30,
                infiniteId: +new Date(),
            }
        },

        beforeCreate(){
            let that = this
            this.$fire.auth.onAuthStateChanged(function (user) {
                if (user != null) {
                    if(user.uid) {
                        that.userId = user.uid
                    }
                }
            })
        },

        watch: {
            userPreference: {
                immediate: true,
                handler(userPreference) {
                    if (process.client) {
                        if(this.dateStart != null) {
                            this.startDate = new Date(this.dateStart)
                            this.endDate.setDate((this.startDate.getDate()) + 7)
                        }
                        this.fetchData()
                    }
                }
            },

            dateStart: {
                immediate: true,
                handler(dateStart) {
                    if (process.client) {
                        if(dateStart == null) {
                            let d = new Date('01/01/2021');
                            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                            let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
                            let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
                            dateStart = `${ye}-${mo}-${da}`
                            this.dateStart = `${ye}-${mo}-${da}`
                        }
                        this.startDate = new Date(dateStart)
                        this.fetchData()
                    }
                }
            },
        },

        methods:{
            async fetchData() {
                let tmp = {}
                if(this.userPreference == 'true'){
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userId}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                        if(Object.entries(response.data).length !== 0) {
                            this.dateList = {}
                            for(let [key, value] of Object.entries(response.data)) {
                                tmp[key] = value
                            }
                            this.dateList = tmp
                            this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                            this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                        }
                    })
                    .catch(err => {
                        console.log(error);
                    });
                } else {
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                        if(Object.entries(response.data).length !== 0) {
                            this.dateList = {}
                            for(let [key, value] of Object.entries(response.data)) {
                                tmp[key] = value
                            }
                            this.dateList = tmp
                            this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                            this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                        }
                    })
                    .catch(err => {
                        console.log(error);
                    });
                }
                this.changeType()
            },

            infiniteScroll($state) {
                setTimeout(() => {
                    let tmp = this.dateList != null ? this.dateList : {}
                    if(this.userPreference == 'true'){
                        this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.userId}?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                            if(Object.entries(response.data).length !== 0) {
                                this.dateList = {}
                                for(let [key, value] of Object.entries(response.data)) {
                                    tmp[key] = value
                                }
                                this.dateList = tmp
                                this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                                $state.loaded();
                                this.stopInfiniteScroll = true
                            } else {
                                this.stopInfiniteScroll = false
                                $state.complete();
                            }
                        })
                        .catch(err => {
                        console.log(error);
                        });
                    } else {
                        this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.startDate}&date_inf=${this.endDate}`).then(response => {
                            if(Object.entries(response.data).length !== 0) {
                                this.dateList = {}
                                for(let [key, value] of Object.entries(response.data)) {
                                    tmp[key] = value
                                }
                                this.dateList = tmp
                                this.startDate.setDate((this.startDate.getDate()) + this.gapDate)
                                this.endDate.setDate((this.endDate.getDate()) + this.gapDate)
                                $state.loaded();
                                this.stopInfiniteScroll = true
                            } else {
                                this.stopInfiniteScroll = false
                                $state.complete();
                            }
                        })
                        .catch(err => {
                        console.log(error);
                        });
                    }
                }, 500);
            },

            changeType() {
                this.infiniteId += 1;
            },
        },
    }
</script>