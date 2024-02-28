<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white align-items-baseline d-none" id="forMobile"
            aria-label="" style="padding-top: 1.5rem;">
            <a class="pl-2" type="button" data-toggle="collapse" data-target="#nav-title" aria-controls="nav-title"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </a>
            <ul style="list-style-type: none;">
                <li class="nav-item dropdown no-arrow" id="nav-profile">
                    <a class="nav-link dropdown-toggle p-0" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b-avatar :src="avatar"></b-avatar>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <!-- <nuxt-link to="/profile/data-pengajuan" class="dropdown-item">
                            <em class="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                            Data Pengajuan
                        </nuxt-link> -->
                        <nuxt-link to="/profile/service-operation" class="dropdown-item" v-if="hasAccess">
                            <em class="fa fa-chart-bar fa-sm fa-fw mr-2 text-gray-400"></em>
                            Service Operation
                        </nuxt-link>
                        <nuxt-link to="/user/dashboard" class="dropdown-item">
                            <em class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></em>
                            Profile
                        </nuxt-link>
                        <div class="dropdown-divider"></div>
                        <a href="javascript:void(0);" class="dropdown-item cursor-pointer"
                            @click="$bvModal.show('bv-modal-example')">
                            <em class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                            Keluar
                        </a>
                    </div>
                </li>
            </ul>
            <div class="collapse navbar-collapse" id="nav-title">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="(item, index) in headerForAdmin" :key="index"
                        :class="item.isSubMenu ? 'dropdown' : ''">
                        <nuxt-link :to="item.link" class="nav-link title" v-if="!item.isSubMenu">{{ item.title }}
                        </nuxt-link>
                        <a class="nav-link dropdown-toggle title" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="item.isSubMenu">
                            Layanan
                        </a>
                        <div class="dropdown-menu px-2" aria-labelledby="navbarDropdown" v-if="item.isSubMenu">
                            <nuxt-link v-for="(subs, index) in item.subs" :key="index" :to="subs.link"
                                class="dropdown-item nav-link sub-title" style="height: 3rem;">{{ subs.sub_title }}
                            </nuxt-link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <nav class="navbar navbar-expand navbar-light bg-white topbar fixed-top navbar-fixed-top static-top bg-white px-5"
            aria-label="" id="forDesktop">

            <div class="collapse navbar-collapse" id="">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <nuxt-link to="/" class="navbar-brand">
                            <img class="d-none isScroll" width="135"
                                src="https://minio.digitalpass.id/static/assets/logo/dtp-logo-red.png"
                                alt="dtp-dsa-logo" />
                            <img class="d-none notScroll" width="135"
                                src="https://minio.digitalpass.id/static/assets/logo/dtp-logo-red.png"
                                alt="dtp-dsa-logo" />
                        </nuxt-link>
                    </li>
                </ul>
            </div>

            <div class="collapse navbar-collapse" id="nav-title">
                <ul class="navbar-nav">
                    <li class="nav-item mx-1" v-for="(item, index) in headerForAdmin" :key="index"
                        :class="item.isSubMenu ? 'dropdown' : ''">
                        <nuxt-link :to="item.link" class="nav-link title" v-if="!item.isSubMenu">{{ item.title }}
                        </nuxt-link>
                        <a class="nav-link dropdown-toggle title" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="item.isSubMenu">
                            Layanan
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="item.isSubMenu">
                            <nuxt-link v-for="(subs, index) in item.subs" :key="index" :to="subs.link"
                                class="dropdown-item nav-link sub-title" style="height: 3rem;">{{ subs.sub_title }}
                            </nuxt-link>
                        </div>
                    </li>
                </ul>
            </div>


            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown no-arrow mx-1" id="nav-notif">
                    <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <em class="fas fa-bell fa-fw" style="color: #D6D7D6;"></em>
                        <span class="badge badge-danger badge-counter font-size-12"
                            style="right: 2px; border: 3px solid white;" v-if="totalUnread.length !== 0">
                            <span v-html="totalUnread.length > 9 ? '9+' : totalUnread.length"></span>
                        </span>
                    </a>
                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="alertsDropdown" style="width: 400px !important;">
                        <span
                            class="dropdown-header bg-transparent border-bottom border-top-0 border-right-0 border-left-0">
                            <div class="row">
                                <div class="col d-flex justify-content-start align-self-center">
                                    <span
                                        class="text-gray-light-1 font-size-16 cursor-pointer text-capitalize font-weight-700">Notifikasi</span>
                                </div>
                            </div>
                        </span>
                        <div v-for="(item, index) in notification" :key="index"
                            @click="DetailNotification(item.id, item.request_id)">
                            <b-list-group>
                                <b-list-group-item href="javascript:void(0);" class="rounded-0 border-top-0"
                                    :class="{ 'bg-f3f3fc': item.read_status === 0}">
                                    <b-media>
                                        <template #aside>
                                            <em v-if="item.request_status === '44'"
                                                class="bi bi-x-circle-fill text-red-main font-size-20 d-flex mt-1"></em>
                                            <em v-else
                                                class="bi bi-check-circle-fill text-dsa-success font-size-20 d-flex mt-1"></em>
                                        </template>
                                        <p class="text-black font-size-14 font-weight-400 mb-2">
                                            {{ item.body }}
                                        </p>
                                        <span class="text-gray-main font-size-12 font-weight-400">
                                            {{ item.created_at | formatDate }}
                                        </span>
                                    </b-media>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                        <span
                            class="dropdown-header bg-transparent border-bottom border-top-0 border-right-0 border-left-0">
                            <div class="row">
                                <div class="col d-flex justify-content-start align-self-center">
                                    <span class="font-size-14 cursor-pointer font-weight-600 text-capitalize"
                                        style="color: #F55151;" @click="ReadAllNotification()">
                                        Tandai semua dibaca
                                    </span>
                                </div>
                                <div class="col d-flex justify-content-end align-self-center">
                                    <nuxt-link class="text-center font-size-14 font-weight-600 text-capitalize"
                                        to="/notification" style="color: #F55151;">
                                        Lihat semua notifikasi
                                        <img src="@/assets/images/icon/arrow-new-right-red.svg" class="ml-3 mb-1"
                                            alt="">
                                    </nuxt-link>
                                </div>
                            </div>
                        </span>
                    </div>
                </li>

                <li class="nav-item dropdown" id="nav-profile">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <b-avatar :src="avatar"></b-avatar>
                        <span class="ml-2 d-none d-lg-inline font-weight-700 small text-black">
                            {{ User.name }}
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <!-- <nuxt-link to="/profile/data-pengajuan" class="dropdown-item">
                            <em class="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                            Pengajuan layanan
                        </nuxt-link> -->
                        <nuxt-link to="/profile/service-operation" class="dropdown-item" v-if="hasAccess">
                            <em class="fa fa-chart-bar fa-sm fa-fw mr-2 text-gray-400"></em>
                            Service Operation
                        </nuxt-link>
                        <nuxt-link to="/user/dashboard" class="dropdown-item">
                            <em class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></em>
                            Profile saya
                        </nuxt-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item cursor-pointer" data-toggle="modal" data-target="#modalLogout">
                            <em class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                            Keluar
                        </a>
                    </div>
                </li>

            </ul>
        </nav>

        <div class="modal fade" id="modalLogout" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-0">
                        <div class="">
                            <label class="text-black font-size-18 font-weight-700">Anda yakin ingin keluar?</label>
                        </div>
                        <label class="text-black font-size-14 font-weight-400">Anda akan diarahkan keluar dari portal
                            akun Anda.</label>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-white border-gray-light-1 text-gray-light-1"
                            data-dismiss="modal" style="width: 121px;height: 43px;">Kembali</button>
                        <button type="button" class="btn btn-red" style="width: 121px;height: 43px;"
                            data-dismiss="modal" data-toggle="modal" data-target="#modalRating">Ya</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalRating" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-black" id="">Pendapat Anda tentang layanan kami</h5>
                    </div>
                    <div class="modal-body">
                        <p>
                            Mohon untuk memberikan pendapat Anda agar kami dapat memperbaiki kualitas layanan kami
                            selanjutnya
                        </p>
                        <div class="rating">
                            <input type="radio" id="star10" name="rating" value="10" /><label for="star10"
                                title="Rocks!">5
                                stars</label>
                            <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4
                                stars</label>
                            <input type="radio" id="star8" name="rating" value="8" /><label for="star8"
                                title="Pretty good">3
                                stars</label>
                            <input type="radio" id="star7" name="rating" value="7" /><label for="star7"
                                title="Pretty good">2
                                stars</label>
                            <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1
                                star</label>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="4" v-model="textFeedback"
                                placeholder="Isi pendapat anda di sini."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-red" @click="submitFeedback">Lanjutkan Keluar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        HEADER
    } from "@/config/menu/portal.js";
    import moment from 'moment';
    import mixins from '@/plugins/mixins.js';

    export default {
        mixins: [mixins],
        data() {
            return {
                headerForAdmin: HEADER,
                notification: [],
                totalUnread: {
                    data: [],
                    length: 0
                },
                textFeedback: '',
                User: {},
                avatar: null,
                Login: false,
                hasAccess: false
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
            this.HelperCheckHasAccessServiceOperation(this.User.email, (callback) => {
                this.hasAccess = callback.isAccess;
            });
            this.GetAvatarUser();
            if (this.Login) {
                this.checkIfLogin();
            };
            this.$root.$on('ReadAllNotif', (art) => {
                this.totalUnread.data = art;
            });
            this.$root.$on('UpdateProfile', (art) => {
                this.User.name = art;
            });
            this.$root.$on('UpdateFotoProfile', (art) => {
                this.avatar = art;
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
                    this.notification = data.content.slice(0, 5);
                    this.totalUnread.data = this.notification.filter(x => x.read_status === 0).map(d => d.id);
                    this.totalUnread.length = this.totalUnread.data.length;
                });
            },
            ReadAllNotification() {
                const param = {
                    id: [this.totalUnread.data],
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
                    this.$router.push(`/detail-pengajuan/${request_id}`);
                });
            },
            GetAvatarUser() {
                this.GET(`/api/v3/user/profile`, 'BEARER', (data) => {
                    this.avatar = data.content.photo;
                });
            },
            submitFeedback() {
                const obj = {
                    userId: this.User.id,
                    star: '5',
                    comment: this.textFeedback
                };
                this.POST('/api/v3/feedback', obj, 'BEARER', (data) => {
                    this.Logout();
                });
            },
            Logout() {
                this.CookiesLogout();
                window.location.assign(`${window.location.origin}/`);
            }
        }
    }

</script>

<style lang="css" scoped>
    /* Custom */
    .navbar-fixed-top #nav-title ul li a.title:hover {
        color: #dd1b14 !important
    }

    .navbar-fixed-top.scrolled #nav-title ul li a.title:hover {
        color: #dd1b14 !important
    }

    .btn-auth-register {
        width: 110px;
        height: 32px;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
    }

    .btn-auth-login {
        width: 110px;
        height: 32px;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
    }

    /* Costum */


    .navbar-fixed-top.scrolled {
        background-color: #fff !important;
        box-shadow: 0px 0px 25px rgb(138 138 138 / 15%);
        transition: background-color 200ms linear;
    }

    .navbar-fixed-top #nav-title .dropdown-menu a.sub-title:active {
        color: white !important;
    }

    .navbar-fixed-top.scrolled #nav-title .dropdown-menu a.sub-title:active {
        color: white !important;
    }

    .navbar-fixed-top #nav-title ul li a.title,
    .navbar-fixed-top #nav-profile a span {
        color: #656664;
    }

    .navbar-fixed-top .navbar-brand img.isScroll {
        display: none !important;
    }

    .navbar-fixed-top .navbar-brand img.notScroll {
        display: block !important;
    }

    .navbar-fixed-top.scrolled .navbar-brand img.notScroll {
        display: none !important;
    }

    .navbar-fixed-top.scrolled .navbar-brand img.isScroll {
        display: block !important;
    }


    .navbar-fixed-top #nav-title form .nav-profile a {
        color: white !important;
    }

    .navbar-fixed-top.scrolled #nav-title form .nav-profile a {
        color: #656664 !important;
    }

    .navbar-fixed-top #nav-title ul li .dropdown-menu a {
        color: black !important;
    }

    .topbar .nav-item.dropdown .dropdown-toggle::after {
        transform: rotate(90deg) !important;
        color: #656664 !important;
    }

    .topbar .nav-item.dropdown.show .dropdown-toggle::after {
        transform: rotate(180deg) !important;
    }

    .checked {
        color: #FFC92E;
    }

    .rating {
        float: left;
    }

    .rating:not(:checked)>input {
        position: absolute;
        top: -9999px;
        clip: rect(0, 0, 0, 0);
    }

    .rating:not(:checked)>label {
        float: right;
        width: 1em;
        /* padding:0 .1em; */
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        font-size: 300%;
        /* line-height:1.2; */
        color: #ddd;
    }

    .rating:not(:checked)>label:before {
        content: '★ ';
    }

    .rating>input:checked~label {
        color: #FFC92E;

    }

    .rating:not(:checked)>label:hover,
    .rating:not(:checked)>label:hover~label {
        color: #FFC92E;

    }

    .rating>input:checked+label:hover,
    .rating>input:checked+label:hover~label,
    .rating>input:checked~label:hover,
    .rating>input:checked~label:hover~label,
    .rating>label:hover~input:checked~label {
        color: #FFC92E;

    }

    .rating>label:active {
        position: relative;
        top: 2px;
        left: 2px;
    }

    .navbar-fixed-top {
        box-shadow: unset;
    }

    #forDesktop ul li a.nuxt-link-exact-active.nuxt-link-active {
        color: #ED2B24 !important;
    }

    span.b-avatar {
        color: white !important;
    }

</style>
