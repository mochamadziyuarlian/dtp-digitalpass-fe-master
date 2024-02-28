<template>
    <div>
        <!-- <div class="alert alert-secondary border-0 text-center" role="alert"
            style="background-color: rgb(59, 61, 57);border-radius: 0px;height: 72px;display: flex;justify-content: center;align-items: center;">
            <img class="mr-3" src="@/assets/images/icon/banner/banner_arrow_right.svg">
            <span style="color: white;">
                Selamat Hari Natal dan Tahun Baru 2021 - 2022.
            </span>
            <div @click="BannerNARU()" class="cursor-pointer">
                <span style="color: #D62D26;">&nbsp; Dapatkan Produk NARU</span>
            </div>
            <img class="ml-3" src="@/assets/images/icon/banner/banner_arrow_left.svg">
        </div> -->
        <div class="bg-fafafa" id="BannerPortal">
            <div class="main">
                <div class="row">
                    <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 offset-1" id="col">
                        <div class="py-xl-5 py-lg-5 py-md-5">
                            <label class="display-3 text-red-main font-weight-900"
                                id="head">
                                {{ homeBanner.head }}
                            </label>
                            <div class="py-4">
                                <h6 class="text-gray-main line-height-36" id="value">
                                    {{ homeBanner.value }}
                                </h6>
                            </div>
                            <div class="row justify-content-center justify-content-xl-start justify-content-lg-start"
                                id="col">
                                <div class="col-auto pt-2">
                                    <button @click="ajukanLayanan"
                                        class="btn btn-red btn-lg-main font-weight-700 d-flex justify-content-center">
                                        <span class="align-self-center">
                                            Ajukan Layanan
                                        </span>
                                    </button>
                                </div>
                                <div class="col-auto pt-2">
                                    <a href="mailto:someone@yoursite.com">
                                        <button
                                            class="btn btn-white btn-lg-main border-gray-light-1 text-gray-light-1 font-weight-700">
                                            Hubungi Kami
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 justify-content-end d-flex">
                        <img src="https://minio.digitalpass.id/static/assets/portal/frame2.png" alt="vector">
                    </div>
                </div>
                <div class="row mt-5 d-none d-sm-block">
                    <div class="col d-flex justify-content-center cursor-pointer" @click="scroll">
                        <h4 class="text-gray-main font-weight-700 mb-0 mt-1 mr-2">
                            Lihat selengkapnya
                        </h4>
                        <div class="align-self-center font-size-20">
                            <em class="bi bi-arrow-down"></em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white" id="TentangKami">
            <div class="container container-main">
                <app-about-us :aboutUs="Data.aboutUs"></app-about-us>
            </div>
            <div class="container-fluid">
                <div class="bg-fafafa">
                    <div class="container container-main">
                        <div class="row my-4" id="head_kapabilitas_kami">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h5 class="text-gray-light-1 font-weight-700">
                                    KAPABILITAS KAMI
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <div class="py-4">
                                    <h4 class="text-gray-dark-1 font-weight-900 line-height-33"
                                        id="sub_head_kapabilitas_kami">
                                        Kami menggunakan ide Anda dan meningkatkannya menjadi produk digital yang solid
                                        sesuai tren dan spesifikasi bisnis terbaru.

                                    </h4>
                                </div>
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                        v-for="(item, index) in whyChooseUs" :key="index">
                                        <div class="py-4">
                                            <div class="mb-3" id="card">
                                                <h5 class="font-weight-700 text-gray-dark-1" id="head">{{ item.title }}
                                                </h5>
                                                <h6 class="font-weight-400 text-gray-light-1 line-height-24"
                                                    id="sub_head">
                                                    {{ item.content }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container container-main" id="Layanan">
                <div class="row py-4">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h5 class="text-gray-light-1 font-weight-700 line-height-27" id="head">LAYANAN</h5>
                        <h2 class="text-gray-dark-1 font-weight-900 line-height-44" id="sub_head">
                            Solusi untuk semua kebutuhan produk digital Anda
                        </h2>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 align-self-end">
                        <div class="text-right d-none d-sm-block">
                            <img class="" src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="dot">
                        </div>
                    </div>
                </div>
                <div class="row py-4" id="card">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-5" id="card"
                        v-for="(item, index) of ourServices" :key="index">
                        <div class="card border-0">
                            <div class="card-body p-0">
                                <label class="font-size-24 font-weight-800 text-gray-dark-1" id="head">
                                    <em class="fa text-red mr-3" :class="item.icon"></em> {{ item.name }}
                                </label>
                                <p class="card-text font-size-18" id="value">
                                    {{ item.short_desc }}
                                </p>
                                <nuxt-link :to="`/layanan/${item.slug}`"
                                    class="text-red-main font-size-18 font-weight-700 d-none d-sm-block">
                                    Pelajari lebih lanjut
                                    <img src="@/assets/images/icon/arrow-new-right-red.svg" class="ml-3 mb-1" alt="">
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-fafafa" id="Produk_Dalam_Pengujian">
            <div class="container container-main">
                <div class="row py-4">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h5 class="text-gray-light-1 font-weight-700 line-height-27" id="head">PRODUK DALAM PENGUJIAN
                        </h5>
                        <h2 class="text-gray-dark-1 font-weight-900 line-height-44 w-75" id="sub_head">
                            Ingin tahu apa yang kami lakukan?
                        </h2>
                        <div class="pt-2 pb-5">
                            <h5 class="text-gray-main font-weight-400 line-height-36" id="sub_sub_head">
                                Berikut adalah jumlah pengajuan layanan yang sedang dilaksanakan pengujian oleh tim
                                kami.
                            </h5>
                        </div>
                        <nuxt-link :to="'/produk-dalam-pengujian'" class="text-red-main font-size-18 font-weight-700"
                            id="sub_sub_head">
                            Lihat produk dalam pengujian

                            <img src="@/assets/images/icon/arrow-new-right-red.svg" class="ml-3 mb-1" alt="">
                        </nuxt-link>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="TotalPengujian">
                        <div class="bg-gray-light-3 p-5">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h1 class="text-gray-dark-1 font-weight-900">{{ totalAll }}</h1>
                                    <h5 class="text-gray-main line-height-27">
                                        Total produk diuji
                                    </h5>
                                </div>
                            </div>
                            <div class="py-3">
                                <hr>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-2">
                                    <h1 class="text-gray-dark-1 font-weight-700">{{ totalST }}</h1>
                                    <h5 class="text-gray-main line-height-27">Software Testing</h5>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-2">
                                    <h1 class="text-gray-dark-1 font-weight-700">{{ totalHE }}</h1>
                                    <h5 class="text-gray-main line-height-27">Heuristic Evaluation</h5>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-2">
                                    <h1 class="text-gray-dark-1 font-weight-700">{{ totalUT }}</h1>
                                    <h5 class="text-gray-main line-height-27">Usability Test</h5>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-2">
                                    <h1 class="text-gray-dark-1 font-weight-700">{{ totalSEC }}</h1>
                                    <h5 class="text-gray-main line-height-27">Security Test</h5>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-2">
                                    <h1 class="text-gray-dark-1 font-weight-700">{{ totalAK }}</h1>
                                    <h5 class="text-gray-main line-height-27">Service Operation</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white" id="Testimoni">
            <div class="container">
                <div class="row pt-5" style="padding-bottom: 4rem;">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <h2 class="text-gray-dark-1 font-weight-900 line-height-44" id="head">
                            Bagaimana pendapat mereka tentang kami?
                        </h2>
                    </div>
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 d-none d-sm-block">
                        <img class="float-right" src="https://minio.digitalpass.id/static/assets/portal/dot.png"
                            alt="dot">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <client-only>
                            <carousel class="cursor-pointer" :autoplay="true" :nav="false" :items="2" :margin="23"
                                :loop="true" :dots="false" :mouseDrag="true" :responsive="responsive">
                                <!-- <template slot="prev">
                                    <button type="button">></button>
                                </template> -->
                                <b-card v-for="(item, index) of Data.Testimoni.data" :key="index">
                                    <p class="text-gray-light-1 font-size-20"
                                        style="height: 26.5rem; max-height: 26.5rem;">
                                        “{{ item.testimoni }}”
                                    </p>
                                    <b-media>
                                        <template #aside>
                                            <b-avatar :src="item.photo" size="2.25rem">
                                            </b-avatar>
                                        </template>
                                        <label class="text-gray-dark-1 font-size-16 mb-0">{{ item.name }}</label>
                                        <p class="text-gray-light-1 font-size-12 mb-0">
                                            Product Owner of {{ item.product }}
                                        </p>
                                    </b-media>
                                </b-card>
                            </carousel>
                        </client-only>
                    </div>
                </div>
            </div>
            <div class="container py-5" id="AjukanLayanan">
                <div class="py-5 px-5 bg-fafafa">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h4 class="text-gray-dark-2 font-weight-700" id="head">Siap untuk melakukan pengujian?</h4>
                            <h6 class="text-gray-light-1 font-weight-400" id="sub_head">
                                Ajukan produkmu sekarang juga!
                            </h6>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <button class="btn btn-red my-2" @click="ajukanLayanan">
                                <span class="font-size-16">Ajukan Layanan</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AboutUs from '@/components/portal/AboutUs.vue';
    import moment from 'moment';
    import mixins from '@/plugins/mixins.js';
    import {
        TESTIMONI
    } from '@/config/constant';

    export default {
        layout: 'portal/default',
        // middleware: ['authenticated'],
        mixins: [mixins],
        components: {
            'app-about-us': AboutUs,
        },
        data() {
            return {
                homeBanner: [],
                whyChooseUs: [],
                listOurServices: [],
                ourServices: [],
                slugServices: 'heuristic-evaluation',
                isSelected: 'text-red-main font-weight-900 link-dsa',
                notSelected: 'text-gray-light-1 font-weight-400',
                totalST: '',
                totalHE: '',
                totalUT: '',
                totalSEC: '',
                totalAK: '',
                totalAll: '',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                },
                Data: {
                    ListPengajuan: {
                        content: [],
                        meta: {}
                    },
                    ListPengajuanLength: 0,
                    Testimoni: {
                        data: null,
                        length: 0
                    },
                    aboutUs: [],
                },
                IsLoading: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    1024: {
                        items: 2,
                        nav: false
                    },
                    1366: {
                        items: 2,
                        nav: false
                    },
                    1440: {
                        items: 2,
                        nav: false
                    },
                    1920: {
                        items: 2,
                        nav: false
                    },

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
            'Pagination.pageSize'() {
                this.getProductsInTesting();
            },
            'Pagination.search'() {
                this.getProductsInTesting();
            },
            'Pagination.pageIndex'() {
                this.getProductsInTesting();
            }
        },
        mounted() {
            this.getHomeBanner();
            this.getWhyChooseUs();
            this.findOurServices();
            this.getProductsInTesting();
            this.getTotalProductsInTesting();
            this.getAboutUs();
            this.Data.Testimoni.data = TESTIMONI;
        },
        methods: {
            getHomeBanner() {
                this.GET(`/api/v3/portal/home-banner`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.homeBanner = data.content[0];
                    }
                });
            },
            getAboutUs() {
                this.GET(`/api/v3/portal/about-dsa`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.aboutUs = data.content[0];
                    }
                });
            },
            getWhyChooseUs() {
                this.GET(`/api/v3/portal/why-choose-us`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.whyChooseUs = data.content;
                    }
                });
            },
            findOurServices() {
                this.GET(`/api/v3/service`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.ourServices = data.content;

                        this.ourServices[0].icon = 'fa-list-ul';
                        this.ourServices[1].icon = 'fa-user-friends';
                        this.ourServices[2].icon = 'fa-calendar-check';
                        this.ourServices[3].icon = 'fa-shield-alt';
                        this.ourServices[4].icon = 'fa-headset';
                    }
                });
            },
            getProductsInTesting() {
                this.GET(
                    `/api/v3/requests?is_draft=false&page=${this.Pagination.pageIndex}&size=${this.Pagination.pageSize}&search_key=${this.Filter.search}`,
                    'BASIC', (data) => {
                        if (data.code === 200) {
                            this.Data.ListPengajuan.content = data.content;
                            this.Data.ListPengajuan.meta = data.meta;
                        }

                    });
            },
            getTotalProductsInTesting() {
                this.GET(`/api/v3/requests?is_draft=false`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.totalST = data.content.requestTotal.st;
                        this.totalHE = data.content.requestTotal.he;
                        this.totalUT = data.content.requestTotal.ut;
                        this.totalSEC = data.content.requestTotal.sec;
                        this.totalAK = data.content.requestTotal.ak;
                        const totalAll = this.totalST + this.totalHE + this.totalUT + this.totalSEC + this
                            .totalAK;
                        this.totalAll = totalAll;
                    }
                });
            },

            scroll() {
                const scrollToElement = function (el, ms) {
                    const speed = (ms) ? ms : 600;
                    $('html,body').animate({
                        scrollTop: $(el).offset().top
                    }, speed);
                }
                scrollToElement('#TentangKami', 600);
            },
            showNext() {
                this.$refs.carousel.next();
            },
            showPrev() {
                this.$refs.carousel.prev();
            },
            ajukanLayanan() {
                // this.AjukanLayanan(null, null);
                window.location.href = `${window.location.origin}/user/monitoring/pengajuan-layanan/pengajuan`;
            },
            BannerNARU() {
                this.bannerNARU();
            }
        }
    }

</script>

<style scoped>
    .page-item.active .page-link {
        background-color: red !important;
        border-color: red !important;
    }

    .our-services-label:hover {
        text-decoration: underline;
        text-decoration-color: #ED2B24 !important;
    }

    .vert .carousel-item-next.carousel-item-left,
    .vert .carousel-item-prev.carousel-item-right {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    .vert .carousel-item-next,
    .vert .active.carousel-item-right {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    .vert .carousel-item-prev,
    .vert .active.carousel-item-left {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    .container {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
    }

</style>
