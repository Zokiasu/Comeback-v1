<template>
    <div>
        <div id="button" class="flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between p-10">
            <div v-if="user != null">
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
        </div>
        <div id="release-date" class="space-y-5">
            <div v-for="(date, index) in dateList.slice().reverse()" :key="index" class="justify-center texts text-white mx-10 animate__animated animate__fadeIn">
                <div class="top-0 bg-mainbg z-50">
                    <h1 class="font-semibold text-2xl md:text-4xl"> {{new Date(date.date).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric', year: 'numeric' })}} </h1>
                </div>
                <div class="w-full flex flex-wrap overflow-y-scroll py-5 texts text-white">
                    <ReleaseCard
                        v-for="release in date.releases"
                        :release="release"
                        :key="release.id"
                        displayDate
                        class="mr-2 mb-5 lg:mr-5 lg:mb-0"
                    />
                </div>
            </div>
            <InfiniteLoading v-if="stopInfiniteScroll" @infinite="infiniteScroll"/>
            <div v-if="Object.entries(dateList).length < 1 && !stopInfiniteScroll" class="px-5 mt-5">
                <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Release Scheduled.</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {

        head() {
            return {
                title: "Comeback - Calendar",
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: "Find all the artists' releases by day and according to your preferences.",
                    }
                ]
            }
        },

        data(){
            return {
                userPreference: 'false',
                stopInfiniteScroll: true,
                dateStart: null,
                startDate: new Date(),
                endDate: new Date(),
                dateList: [],
                user: null,
                gapDate: 5,
                infiniteId: +new Date(),
            }
        },

        created(){
            this.user = this.GET_DATA_USER()
            this.endDate.setDate(this.startDate.getDate()+1)
            this.startDate.setDate(this.startDate.getDate()-5)
        },

        watch: {
            userPreference: {
                immediate: true,
                handler(userPreference) {
                    if (process.client) {
                        if(this.dateStart != null) {
                            //this.startDate = new Date(this.dateStart)/
                        }
                        this.fetchData()
                    }
                }
            },
        },

        methods:{

            dateFormat(d){
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
                return `${mo}/${da}/${ye}`
            },

            ...mapGetters([
                'GET_DATA_USER',
            ]),

            async fetchData() {
                let test = []
                if(this.userPreference == 'true'){
                    this.user = this.GET_DATA_USER()
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.user.id}?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
                        if(Object.entries(response.data).length) {
                            this.dateList = []
                            for(let [key, value] of Object.entries(response.data)) {
                                value['date'] = key
                                if(value.releases) test.push(value)
                            }
                            this.dateList = test
                        } else {
                            this.dateList = []
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
                        if(Object.entries(response.data).length) {
                            this.dateList = []
                            for(let [key, value] of Object.entries(response.data)) {
                                value['date'] = KeyframeEffect
                                if(value.releases) test.push(value)
                            }
                            this.dateList = test
                        } else {
                            this.dateList = []
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                this.changeType()
            },

            infiniteScroll($state) {
                setTimeout(() => {
                    let test = []
                    if(this.userPreference == 'true'){
                        this.user = this.GET_DATA_USER()
                        this.$axios.get(`https://comeback-api.herokuapp.com/calendar/${this.user.id}?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
                            if(Object.entries(response.data).length !== 0) {
                                this.dateList = []
                                for(let [key, value] of Object.entries(response.data)) {
                                    value['date'] = MediaKeySession
                                    if(value.releases) test.push(value)
                                }
                                this.dateList = test
                                this.startDate.setDate((this.startDate.getDate()) - this.gapDate)
                                $state.loaded();
                                this.stopInfiniteScroll = true
                            } else {
                                this.stopInfiniteScroll = false
                                $state.complete();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    } else {
                        this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
                            if(Object.entries(response.data).length !== 0) {
                                this.dateList = []
                                for(let [key, value] of Object.entries(response.data)) {
                                    value['date'] = key
                                    if(value.releases) test.push(value)
                                }
                                this.dateList = test
                                this.startDate.setDate((this.startDate.getDate()) - this.gapDate)
                                $state.loaded();
                                this.stopInfiniteScroll = true
                            } else {
                                this.stopInfiniteScroll = false
                                $state.complete();
                            }
                        })
                        .catch(error => {
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