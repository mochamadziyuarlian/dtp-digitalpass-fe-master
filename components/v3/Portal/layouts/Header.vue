<template>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown no-arrow mx-1" v-if="Role === 'Supervisor'">
            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <img src="/icon/notification.svg">
                <span class="badge badge-danger badge-counter font-size-12">
                    {{ totalUnread.length }}
                </span>
            </a>
            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown" style="width: 400px !important;">
                <span class="dropdown-header bg-transparent border-bottom border-top-0 border-right-0 border-left-0">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start align-self-center">
                            <span class="text-black font-size-18 cursor-pointer"
                                style="text-transform: none; font-weight: 600;">
                                Pemberitahuan
                            </span>
                        </div>
                        <div class="col d-flex justify-content-end align-self-center">
                            <span class="font-size-12 cursor-pointer"
                                style="text-transform: none; color: #ED2B24; font-weight: normal;"
                                @click="ReadAllNotification()">
                                Tandai Semua Sudah Dibaca
                            </span>
                        </div>
                    </div>
                </span>
                <div class="notification-list">
                    <div v-if="notification.length !== 0">
                        <b-list-group v-for="(item, index) in notification" :key="index"
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

                    <div class="text-center align-items-center" style="margin-top: 7rem;"
                        v-if="notification.length === 0">
                        <div class="text-center mt-5">
                            <img src="/icon/not-found/not-found-v3.svg">
                            <p class="font-size-12 text-dsa-secondary font-weight-normal mt-4">
                                Belum ada pemberitahuan
                            </p>
                        </div>
                    </div>
                </div>
                <nuxt-link class="dropdown-item text-center font-size-12 py-3 border-0" to="/manage/notification"
                    style="color: #F55151;" v-if="notification.length !== 0">
                    Lihat semua
                </nuxt-link>
            </div>
        </li>
        <div class="topbar-divider d-none d-sm-block"></div>

        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                    {{ User.name }}
                </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <nuxt-link class="dropdown-item" to="/user/dashboard">
                    <em class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></em>
                    Profil
                </nuxt-link>
                <a class="dropdown-item" @click="logout" href="#" data-toggle="modal" data-target="#logoutModal">
                    <em class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                    Logout
                </a>
            </div>
        </li>
    </ul>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    export default {
        mixins: [mixins],
        data() {
            return {
                notification: [],
                totalUnread: [],
                User: {},
                Login: false,
                Role: ''
            };
        },
        filters: {
            formatDate(value) {
                return moment(String(value)).format('dddd, DD MMMM YYYY');
            }
        },
        mounted() {
            this.User = this.UserLogin();
            this.Login = this.IsLogin();
            this.Role = this.IsRole();
            if (this.Login) {
                this.checkIfLogin();
            }
            this.$root.$on('ReadAllNotif', (art) => {
                this.totalUnread = art;
            });
            this.$root.$on('UpdateProfileCMS', (art) => {
                this.User.name = art;
            });
        },
        methods: {
            checkIfLogin() {
                this.getNotification();
                this.startInterval();
            },
            startInterval() {
                setInterval(() => {
                    this.getNotification();
                }, 60000);
            },
            getNotification() {
                this.HelperGetNotification((data) => {
                    this.notification = data.content;
                    this.totalUnread = this.notification.filter(x => x.read_status === 0).map(d => d.id);
                });
            },
            ReadAllNotification() {
                const param = {
                    id: [this.totalUnread],
                    setAll: true,
                    userId: this.User.id
                };
                this.HelperReadAllNotification(param, (data) => {
                    this.getNotification();
                });
            },
            DetailNotification(id, request_id) {
                const param = {
                    id: [id],
                    setAll: false,
                    userId: this.User.id
                };
                this.HelperDetailNotification(param, (data) => {
                    this.getNotification();
                    this.$router.push(`/manage/data-pengajuan/${request_id}`);
                });
            },
            logout() {
                this.CookiesLogout();
                window.location.assign(`${window.location.origin}/`);
            },
        },
    };

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

    .notification-list {
        height: 400px !important;
        overflow: auto;
    }

</style>
