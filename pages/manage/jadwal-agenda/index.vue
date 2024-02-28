<template>
    <div class="">
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <client-only>
                                <v-calendar class="border-0 calendar" locale="id" :attributes="attributes"
                                    title-position="left" @dayclick="onDayClick" trim-weeks is-expanded />
                            </client-only>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 overflow-auto">
                            <div class="card border-0">
                                <div class="card-header pb-0 bg-white border-0">
                                    <label class="text-dsa-black font-size-18 font-weight-600">
                                        {{ eventDate }}
                                    </label>
                                </div>
                                <div class="card-body overflow-auto" v-if="eventName.length !== 0">
                                    <div class="alert alert-success badge-success-detail font-size-14 cursor-pointer"
                                        style="border-radius: 4px; border: 0px solid transparent;" role="alert"
                                        v-for="(item, index) in eventName" :key="index"
                                        @click="DetailPengajuan(item.request_id)">
                                        {{ item.title }}
                                    </div>
                                </div>
                                <div class="card-body text-center align-items-center" v-if="eventName.length === 0">
                                    <div class="text-center mt-5">
                                        <img src="/icon/not-found/not-found-v3.svg">
                                        <p class="font-size-12 text-dsa-secondary font-weight-normal mt-4">
                                            Tidak ada jadwal pemaparan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                attributes: [],
                events: [],
                eventName: [],
                eventDate: null,
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('dddd, DD MMMM YYYY')
                } else {
                    return '-';
                }
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Jadwal Agenda',
                menu: []
            }]);
            this.getRequestSchedule();
            this.getFirstValueEvent();
        },
        methods: {
            DetailPengajuan(request_id) {
                this.$router.push(`data-pengajuan/detail/${request_id}`);
            },
            getRequestSchedule() {
                this.Request('GET', '/api/v3/request-schedule', null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {

                        callback.content.map(x => {
                            x.dates = moment(String(`${x.date}`)).format('YYYY-MM-DD');
                        });
                        for (const x of callback.content) {
                            let objEvent = {
                                request_id: x.request_id,
                                id: x.id,
                                title: x.activity,
                                dates: moment(String(`${x.date}`)).format('YYYY-MM-DD')
                            };
                            this.events.push(objEvent);
                        }

                        let removeDuplicateDate = callback.content.reduce((unique, o) => {
                            if (!unique.some(obj => obj.dates === o.dates)) {
                                unique.push(o);
                            }
                            return unique;
                        }, []);
                        for (const x of removeDuplicateDate) {
                            let obj = {
                                key: x.id,
                                dot: true,
                                dates: moment(String(`${x.date}`)).format('YYYY-MM-DD')
                            };
                            this.attributes.push(obj);
                        }
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            getFirstValueEvent() {
                let newDate = new Date();
                let convertDate = moment(String(newDate)).format('YYYY-MM-DD');
                this.eventDate = convertDate;
                let events = this.events;
                let getEvents = events.filter(y => y.dates === convertDate);
                this.eventName = getEvents;



                let arrayOfObjects = events;
                const newArrayOfObjects =
                    arrayOfObjects.reduce((accumulator, object) => {
                        if (objectFound = accumulator.find(arrItem => arrItem.dates === object.dates)) {
                            objectFound.times++;
                        } else {
                            object.times = 1;
                            accumulator.push(object);
                        }
                        return accumulator;
                    }, []);
                console.log(newArrayOfObjects);

            },
            onDayClick(date) {
                this.eventDate = date.ariaLabel;
                let events = this.events;
                let getEvents = events.filter(x => x.dates === date.id);
                this.eventName = getEvents;

                console.log(date)
            },
        },
    }

</script>
<style scoped>
    .calendar /deep/ .vc-header {
        padding-bottom: 1rem !important;
    }


    .calendar /deep/ .vc-header .vc-title {
        font-weight: 600 !important;
        font-size: 20px !important;
        color: #3B3D39 !important;
    }

    .calendar /deep/ .vc-weeks .vc-weekday,
    .calendar /deep/ .vc-day-content {
        color: #1D1E1C !important;
        font-weight: 600 !important;
        font-size: 16px;
    }

    .calendar /deep/ .vc-header {
        padding-top: 0 !important;
        padding-right: 0 !important;
        padding-left: 0 !important;
    }








    .badge-success-detail {
        background-color: #E0FFD1;
        color: #8DC26F;
    }




    /* FIX */

    /* Tanda panah */
    .calendar /deep/ .vc-arrows-container .vc-arrow.is-left:active,
    .calendar /deep/ .vc-arrows-container .vc-arrow.is-left:focus {
        color: #ED2B24 !important;
        border-color: transparent !important;
    }

    .calendar /deep/ .vc-arrows-container .vc-arrow.is-left:hover {
        color: #ED2B24 !important;
        background-color: transparent !important;
    }

    .calendar /deep/ .vc-arrows-container .vc-arrow.is-right:active,
    .calendar /deep/ .vc-arrows-container .vc-arrow.is-right:focus {
        color: #ED2B24 !important;
        border-color: transparent !important;
    }

    .calendar /deep/ .vc-arrows-container .vc-arrow.is-right:hover {
        color: #ED2B24 !important;
        background-color: transparent !important;
    }

    .calendar /deep/ .vc-day {
        min-height: 60px !important;
    }

    .calendar /deep/ .vc-highlights .vc-highlight {
        background-color: white !important;
        border-radius: unset !important;
        width: 36px;
        height: 36px;
    }

    /* Ini buat hover/focus yang date sekarang */
    .calendar /deep/ .is-today .vc-highlights .vc-highlight {
        background-color: #ED2B24 !important;
        border-radius: 100% !important;
        width: 40px;
        height: 40px;
    }

    .calendar /deep/ .is-today .vc-day-content:hover {
        color: white !important;
        background-color: #ED2B24;
        width: 40px;
        height: 40px;
    }

    .calendar /deep/ .is-today .vc-day-content:focus {
        color: white !important;
        background-color: #ED2B24;
    }

    .calendar /deep/ .is-today .vc-day-content {
        /* color: white !important; */
    }

    /* Ini buat hover/focus yang date lainnya */
    .calendar /deep/ .vc-day-content:focus {
        width: 40px;
        height: 40px;
        border: 1px solid #ED2B24;
        color: #ED2B24 !important;
        background-color: transparent;
    }

    .calendar /deep/ .vc-day-content:hover {
        color: #ED2B24 !important;
        background-color: transparent;
    }

    /* ngilangin dot yang buat event */
    .calendar /deep/ .vc-dots .vc-dot {
        /* display: none; */
    }

    .calendar /deep/ .vc-dots .vc-dot {
        width: 6px;
        height: 6px;
        background: linear-gradient(180deg, #76B852 0%, #8DC26F 100%);
        background-color: transparent;
    }

</style>
