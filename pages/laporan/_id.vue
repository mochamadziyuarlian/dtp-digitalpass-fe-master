<template>
    <div class="bg-white">
        <div class="container" id="Laporan">
            <div class="py-5">
                <div class="row" id="SectionTitle">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <b-breadcrumb class="bg-transparent" active-class="text-red-main" :items="breadcrumb"
                            id="breadcrumb">
                        </b-breadcrumb>
                        <label class="text-gray-dark-1 font-size-32 font-weight-900" id="head">
                            {{ Data.DetailLaporan.data.heading }}
                        </label>
                        <img class="img-fluid rounded w-100" :src="Data.DetailLaporan.data.thumbnail" alt="">
                        <div class="text-center pt-3 pb-4">
                            <span class="text-center text-gray-light-2 font-size-12">
                                {{ Data.DetailLaporan.data.heading }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="row pt-5">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12" id="SectionAuthor">
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">PENULIS</p>
                            <p class="font-size-16 text-gray-main font-weight-700">
                                {{ Data.DetailLaporan.data.publisher_name }}
                            </p>
                        </div>
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">TANGGAL</p>
                            <p class="font-size-16 text-gray-main font-weight-700">
                                {{ Data.DetailLaporan.data.created_at | formatDate }}
                            </p>
                        </div>
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">KATEGORI</p>
                            <p class="font-size-16 text-gray-main font-weight-700">Berita DOA</p>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" id="SectionContent">
                        <p class="text-gray-main font-size-20 text-justify" v-html="Data.DetailLaporan.data.content">
                        </p>
                    </div>
                </div>

                <div class="row" id="SectionDonwload">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <div class="card text-center" v-if="!Login">
                            <div class="card-body">
                                <h5 class="text-gray-dark-1 font-size-20 font-weight-900">Silahkan Masuk atau Daftar
                                    akun terlebih dahulu untuk dapat
                                    mengunduh dokumen laporan pengujian.
                                    Masuk atau Daftar disini :
                                </h5>
                                <div class="pt-3">
                                    <button type="button" @click="LoginOrRegister('login')"
                                        class="btn btn-outline-danger">Masuk</button>
                                    <span class="text-gray-dark-1 font-size-20 font-weight-900 mx-2">atau</span>
                                    <button type="button" @click="LoginOrRegister('register')"
                                        class="btn btn-dsa-primary">Daftar</button>
                                </div>
                            </div>
                        </div>
                        <div class="card text-center" v-if="Login">
                            <div class="card-body">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input cursor-pointer" type="checkbox" id="check" value=""
                                        @click="Agree()">
                                    <label
                                        class="form-check-label text-gray-dark-1 font-size-16 font-weight-400 cursor-pointer"
                                        id="head" for="check">Dengan mencentang ini,
                                        Anda menyetujui untuk menyimpan informasi tentang Kami.
                                    </label>
                                </div>
                                <div class="pt-3">
                                    <a :href="Data.DetailLaporan.data.file" target="_blank" class="btn btn-dsa-primary"
                                        :class="IsDisabled">Unduh Disini</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="py-5" v-if="Data.Laporan.length !== 0" id="SectionLaporanUjiDSA">
                    <div class="row border-bottom py-3" id="SectionTitle">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h2 class="text-gray-dark-1 font-weight-900" id="head">Laporan Uji DOA</h2>
                        </div>
                    </div>
                    <div class="row py-3" id="SectionContent">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-3"
                            v-for="(item, index) in Data.Laporan.data" :key="index">
                            <div class="card bg-transparent border-0">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <img class="img-fluid" :src="item.thumbnail" :alt="item.thumbnail_name">
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="card-body p-0">
                                            <label
                                                class="text-gray-dark-1 font-size-28 font-weight-900 line-height-36 pb-3"
                                                id="head">
                                                {{ item.heading.slice(0, 25) }} ...
                                            </label>
                                            <p class="text-gray-main font-size-16"
                                                v-html="`${item.content.slice(0, 130)} ...`" id="value"></p>
                                            <p class="text-gray-main font-size-16 py-3" id="value">
                                                {{ item.created_at | formatDate}}
                                            </p>
                                            <nuxt-link :to="`/laporan/${item.id}`"
                                                class="btn btn-sm btn-dsa-primary mr-2" id="UnduhLaporan">
                                                Unduh
                                            </nuxt-link>
                                            <a href="javascript:void(0);" id="IdLihatLaporan"
                                                @click="ModalLihatLaporan(item)" class="btn btn-sm btn-light">
                                                Lihat
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal ref="RefLihatLaporan" size="lg" scrollable hide-footer modal-class="SectionContent">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="text-gray-dark-1 font-size-32 font-weight-900" id="head">
                        {{ Data.ModalDetailLaporan.heading }}
                    </label>
                    <img class="img-fluid rounded w-100" :src="Data.ModalDetailLaporan.thumbnail" alt="">
                    <div class="text-center pt-3 pb-4">
                        <span class="text-center text-gray-light-2 font-size-12">
                            {{ Data.ModalDetailLaporan.heading }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row" id="SectionAuthor">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <div class="py-2">
                        <p class="font-size-16 text-gray-light-2 mb-0">PENULIS</p>
                        <p class="font-size-16 text-gray-main font-weight-700">
                            {{ Data.ModalDetailLaporan.publisher_name }}
                        </p>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <div class="py-2">
                        <p class="font-size-16 text-gray-light-2 mb-0">TANGGAL</p>
                        <p class="font-size-16 text-gray-main font-weight-700">
                            {{ Data.ModalDetailLaporan.created_at | formatDate }}
                        </p>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <div class="py-2">
                        <p class="font-size-16 text-gray-light-2 mb-0">KATEGORI</p>
                        <p class="font-size-16 text-gray-main font-weight-700">Berita DOA</p>
                    </div>
                </div>
            </div>
            <div class="row pt-5" id="SectionContent">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p class="text-gray-main font-size-20 text-justify" v-html="Data.ModalDetailLaporan.content" id="value"></p>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    Laporan: {
                        data: {},
                        length: 0
                    },
                    DetailLaporan: {
                        data: {},
                        length: 0
                    },
                    ModalDetailLaporan: []
                },
                IsDisabled: 'disabled',
                breadcrumb: [{
                        text: '',
                        to: {
                            name: ''
                        }
                    },
                    {
                        text: 'Detail Laporan',
                        href: '#'
                    }
                ],
                Login: false
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY - HH:MM')
                } else {
                    return '-';
                }
            }
        },
        mounted() {
            this.Login = this.IsLogin();
            this.GetDetailLaporan();
            this.GetLaporan();

            const path = localStorage.getItem('pathFrom');
            if (path === '/publikasi') {
                this.breadcrumb[0].text = 'Publikasi';
                this.breadcrumb[0].to = '/publikasi';
            } else {
                this.breadcrumb[0].text = 'Laporan';
                this.breadcrumb[0].to = '/laporan';
            }
            
        },
        methods: {
            GetDetailLaporan() {
                this.GET(`/api/v3/portal/laporan/${this.$route.params.id}`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.DetailLaporan.data = data.content[0];
                        this.Data.DetailLaporan.length = data.content[0].length;
                    }
                });
            },
            GetLaporan() {
                this.GET(`/api/v3/portal/laporan?page=1&size=2&status=1`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.Laporan.data = data.content;
                        this.Data.Laporan.length = data.content.length;
                    }

                });
            },
            LoginOrRegister(data) {
                this.$store.commit('setHistoryUrl', this.$route.path);
                if (data === 'login') {
                    this.$router.push('/login');
                } else {
                    this.$router.push('/faq');
                }
            },
            Agree() {
                this.IsDisabled = this.IsDisabled === 'disabled' ? '' : 'disabled';
            },
            ModalLihatLaporan(data) {
                this.Data.ModalDetailLaporan = data;
                this.$refs['RefLihatLaporan'].toggle('#IdLihatLaporan');
            },
        }
    }

</script>

<style scoped>
    b-modal /deep/ header.modal-header {
        border: 0 !important
    }

</style>
