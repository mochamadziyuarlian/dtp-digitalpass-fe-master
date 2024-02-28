<template>
    <div>
        <div class="bg-white" v-if="Data.Notification.content.length === 0">
            <div class="container">
                <div class="" style="padding-bottom: 15rem; padding-top: 15rem;">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <div class="text-center">
                                <div class="py-3">
                                    <label class="text-gray-dark-1 font-size-36 font-weight-700 line-height-46">
                                        Tidak ada notifikasi.
                                    </label>
                                    <h6 class="text-gray-dark-1 font-weight-400 line-height-20">
                                        Saat ini Anda tidak memiliki notifikasi.
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white" v-if="Data.Notification.content.length !== 0">
            <div class="container">
                <div class="main pb-5">
                    <div class="row align-items-center pb-3">
                        <div class="col-6 d-flex justify-content-start">
                            <label class="text-gray-light-1 font-size-24 font-weight-700">Notifikasi</label>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <a href="javascript:void(0);" @click="ReadAllNotification()"
                                class="text-red-main font-size-16 font-weight-600">Tandai semua sudah dibaca</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div v-for="(item, index) in Data.Notification.content" :key="index"
                                @click="ReadNotification(item)">
                                <b-list-group>
                                    <b-list-group-item href="javascript:void(0);"
                                        class="rounded-0 border-bottom-0 border-left-0 border-right-0"
                                        :class="{ 'bg-f3f3fc': item.read_status === 0 }">
                                        <b-media>
                                            <template #aside>
                                                <i v-if="item.request_status === '44'"
                                                    class="bi bi-x-circle-fill text-red-main font-size-20 d-flex mt-1"></i>
                                                <i v-else
                                                    class="bi bi-check-circle-fill text-dsa-success font-size-20 d-flex mt-1"></i>
                                            </template>
                                            <p class="text-black font-size-14 font-weight-700 mb-2 mt-1">
                                                {{ item.body }}
                                            </p>
                                            <span class="text-gray-main font-size-12">
                                                {{ item.created_at | formatDate }}
                                            </span>
                                        </b-media>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border fixed-bottom bg-white">
                <div class="container">
                    <div class="row" id="Pagination">
                        <div id="Showing" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                            <span class="text-black font-size-16 mt-3">
                                Halaman
                                {{ Data.Notification.meta.page }}
                                dari
                                {{ Data.Notification.meta.totalPage }}
                            </span>
                        </div>
                        <div id="Trigger" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-16 mt-3" v-model="Pagination.pageIndex"
                                :total-rows="Data.Notification.meta.totalData" :per-page="Pagination.pageSize"
                                prev-text="Sebelumnya" next-text="Selanjutnya">
                            </b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    export default {
        mixins: [mixins],
        layout: 'portal/without-footer',
        data() {
            return {
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1,
                },
                Data: {
                    Notification: {
                        content: [],
                        meta: {}
                    },
                    TotalUnread: {
                        content: [],
                        meta: {}
                    }
                }
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
        watch: {
            'Filter.search'() {
                this.GetNotification();
            },
            'Pagination.pageSize'() {
                this.GetNotification();
            },
            'Pagination.pageIndex'() {
                this.GetNotification();
            }
        },
        mounted() {
            this.GetNotification();
        },
        methods: {
            GetNotification() {
                this.GET(`/api/v3/notification?page=${this.Pagination.pageIndex}&size=${this.Pagination.pageSize}`,
                    'BEARER', (
                        data) => {
                        this.Data.Notification.content = data.content;
                        this.Data.Notification.meta = data.meta;
                    });
            },
            GetUnreadNotification() {
                this.GET('/api/v3/notification?read_status=0', 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.Data.TotalUnread.content = data.content;
                    }
                });
            },
            ReadAllNotification() {
                const param = {
                    id: [this.Data.TotalUnread.content.map(x => x.id)],
                    setAll: true,
                    userId: this.UserLogin().id
                };
                this.PUT(`/api/v3/notification/setAsRead`, param, 'BEARER', (data) => {
                    if (data.code === 200) {}
                });
                this.$root.$emit('ReadAllNotif', []);
                this.GetUnreadNotification();
                this.GetNotification();
            },
            ReadNotification(item) {
                const param = {
                    id: [item.id],
                    setAll: false,
                    userId: this.UserLogin().id
                };
                this.PUT(`/api/v3/notification/setAsRead`, param, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.GetNotification();
                        this.$router.push(`/detail-pengajuan/${item.request_id}`);
                    }

                });
            },
        }
    }

</script>
