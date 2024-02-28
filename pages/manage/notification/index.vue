<template>
    <div>
        <div class="row mb-3">
            <div class="col-xl-12 d-flex justify-content-end">
                <a href="javascript:void(0);" class="font-size-14 text-dsa-danger font-size-400 cursor-pointer"
                    @click="ReadAllNotification()">
                    Tandai Semua Sudah Dibaca
                </a>
            </div>
        </div>

        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body px-0">
                    <div class="notification-list mb-3">
                    <b-list-group v-for="(item, index) in Data.Notification.content" :key="index"
                    @click="DetailNotification(item.id, item.request_id)">
                        <b-list-group-item href="javascript:void(0);" 
                            :active="item.read_status === 0 ? false : true"
                            class="flex-column align-items-start p-3">
                            <b-media>
                                <template #aside>
                                    <img src="/icon/calendar.svg">
                                </template>
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="font-size-15 mb-2">
                                        {{ item.body }}
                                        </h5>
                                </div>
                                <p class="text-dsa-secondary font-size-13 mb-0">
                                    {{ item.created_at | formatDate }}
                                </p>
                            </b-media>

                        </b-list-group-item>
                    </b-list-group>
                </div>

                    <div class="row px-4" id="Pagination">
                        <div id="Showing"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                            <span class="text-black font-size-16 mt-3">
                                Halaman
                                {{ Data.Notification.meta.page }}
                                dari
                                {{ Data.Notification.meta.totalPage }}
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12 mt-3" v-model="Pagination.pageIndex"
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
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                Pagination: {
                    pageSize: 7,
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
            this.User = this.UserLogin();
            this.GetUnreadNotification();
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
                    id: this.Data.TotalUnread.content.map(x => x.id),
                    setAll: true,
                    userId: this.UserLogin().id
                };
                this.PUT(`/api/v3/notification/setAsRead`, param, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.totalUnread = null;
                        this.getNotification();
                        this.$root.$emit('ReadAllNotif', []);
                    }
                });
            },
            DetailNotification(id, request_id) {
                const param = {
                    id: [id],
                    setAll: false,
                    userId: this.User.id
                };
                this.HelperDetailNotification(param, (data) => {
                    this.GetNotification();
                    this.$router.push(`/manage/data-pengajuan/detail/${request_id}`);
                });
            },
        }
    }

</script>


<style scoped>
    .notification-list /deep/ .list-group .list-group-item {
        background-color: #ffffff;
        color: black;
        border-color: rgb(255, 246, 246);
        border-bottom: 1px solid #e7e7e7;
        border-radius: 0;
    }

    .notification-list /deep/ .list-group .list-group-item.active {
        background-color: rgb(255, 246, 246) !important;
    }

</style>
