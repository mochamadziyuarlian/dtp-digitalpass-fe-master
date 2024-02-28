<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <nav class="navbar navbar-expand-lg navbar-light bg-white align-items-baseline d-none" id="forMobile"
                aria-label="">
                <a class="pl-2" type="button" data-toggle="collapse" data-target="#nav-title" aria-controls="nav-title"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </a>
                <ul style="list-style-type: none;">
                    <li class="nav-item dropdown no-arrow" id="nav-profile">
                        <nuxt-link to="/login" class="btn btn-red font-size-14">
                            Masuk
                        </nuxt-link>
                    </li>
                </ul>
                <div class="collapse navbar-collapse" id="nav-title">
                    <ul class="navbar-nav">
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#TentangKami')">
                                Tentang Kami
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#Layanan')">
                                Layanan
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#FAQ')">
                                FAQ
                            </a>
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
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#TentangKami')">
                                Tentang Kami
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#Layanan')">
                                Layanan
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="javascript:void(0);" class="nav-link title" @click="scroll('#FAQ')">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav ml-auto">
                    <div class="topbar-divider d-none d-sm-block mx-4"></div>
                    <li class="nav-item align-self-center">
                        <div class="row">
                            <!-- <nuxt-link to="/register" class="btn btn-outline-red btn-auth-login mx-2">Daftar</nuxt-link> -->
                            <nuxt-link to="/login" class="btn btn-red btn-auth-login mx-2">Masuk</nuxt-link>
                        </div>
                    </li>
                </ul>
            </nav>

            <div>
                <div class="bg-fafafa" id="BannerPortal">
                    <div class="main" style="padding-top: 220px !important;">
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
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 offset-1" id="col">
                                <div class="py-xl-5 py-lg-5 py-md-5">
                                    <label class="display-3 text-red-main font-weight-900"
                                        id="head">{{ homeBanner.head }}</label>
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
                                                <span class="align-self-center">Ajukan Layanan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 justify-content-end d-flex">
                                <img src="https://minio.digitalpass.id/static/assets/portal/frame2.png" alt="vector">
                            </div>
                        </div>
                        <div class="row mt-5 d-none d-sm-block">
                            <div class="col d-flex justify-content-center cursor-pointer"
                                @click="scroll('#TentangKami')">
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
                        <div class="row pb-1">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h5 class="text-gray-light-1 font-weight-900 line-height-27" id="head">
                                    {{ Data.aboutUs.head }}
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <h2 class="text-gray-dark-1 font-weight-900 line-height-44" id="sub_head"
                                    style="width: 30rem;max-width: 30rem;">
                                    <span v-html="Data.aboutUs.sub_head"></span>
                                </h2>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-xl-1 offset-lg-1 offset-md-1">
                                <h5 class="text-gray-main line-height-36" id="value">
                                    <span v-html="Data.aboutUs.value"></span>
                                </h5>
                            </div>
                        </div>
                        <div class="row py-4">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 align-self-center">
                                <h5 class="text-gray-light-1 line-height-36" id="dipercayai_oleh">DIPERCAYA OLEH
                                </h5>
                            </div>
                            <div
                                class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 align-self-center d-none d-sm-block">
                                <span>
                                    <hr style="transform: rotate(-90deg);">
                                </span>
                            </div>
                            <div
                                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 align-self-center dipercayai-oleh-desktop">
                                <div class="row">
                                    <div class="col-auto mx-3 mt-3">
                                        <img class=""
                                            src="https://minio.digitalpass.id/static/assets/portal/product/vutura.png"
                                            alt="product">
                                    </div>
                                    <div class="col-auto mx-3">
                                        <img class=""
                                            src="https://minio.digitalpass.id/static/assets/portal/product/pijar.png"
                                            alt="product">
                                    </div>
                                    <div class="col-auto mx-3">
                                        <img class=""
                                            src="https://minio.digitalpass.id/static/assets/portal/product/klik-adzkia.png"
                                            alt="product">
                                    </div>
                                    <div class="col-auto mx-3">
                                        <img class=""
                                            src="https://minio.digitalpass.id/static/assets/portal/product/agree.png"
                                            alt="product">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid dipercayai-oleh-mobile">
                            <div class="row">
                                <div class="col-6">
                                    <img class="w-100" style="margin-top: 7px;"
                                        src="https://minio.digitalpass.id/static/assets/portal/product/vutura.png"
                                        alt="product">
                                </div>
                                <div class="col-6 d-flex justify-content-center">
                                    <img class="w-50"
                                        src="https://minio.digitalpass.id/static/assets/portal/product/pijar.png"
                                        alt="product">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 pt-4">
                                    <img class="w-50"
                                        src="https://minio.digitalpass.id/static/assets/portal/product/klik-adzkia.png"
                                        alt="product">
                                </div>
                                <div class="col-6 pt-4 d-flex justify-content-center">
                                    <img class="w-50"
                                        src="https://minio.digitalpass.id/static/assets/portal/product/agree.png"
                                        alt="product">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-fafafa">
                    <div class="container container-main" id="Layanan">
                        <div class="row py-4">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <h5 class="text-gray-light-1 font-weight-700 line-height-27" id="head">LAYANAN</h5>
                                <h2 class="text-gray-dark-1 font-weight-900 line-height-44" id="sub_head">
                                    Solusi untuk semua kebutuhan produk digital Anda
                                </h2>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 align-self-end">
                                <div class="text-right">
                                    <img class="d-none d-sm-block"
                                        src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="dot">
                                </div>
                            </div>
                        </div>
                        <div class="row py-4">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-5"
                                v-for="(item, index) of ourServices" :key="index">
                                <div class="card border-0 bg-fafafa">
                                    <div class="card-body p-0">
                                        <label class="font-size-24 font-weight-800 text-gray-dark-1" id="head">
                                            <em class="fa text-red mr-3" :class="item.icon"></em> {{ item.name }}
                                        </label>
                                        <p class="card-text font-size-18" id="value">
                                            {{ item.short_desc }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white">
                    <div class="container" id="FAQ">
                        <div class="row py-content pb-3">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h5 class="text-gray-light-1 font-weight-bold line-height-27" id="head">
                                    FREQUENTLY ASKED QUESTIONS (FAQ)
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div v-for="(item, index) in faqs" :key="index">
                                    <div class="my-4" v-if="item.status === 1">
                                        <div class="card shadow" id="card">
                                            <a class="" data-toggle="collapse" :href="'#collapse' + index"
                                                @click="click(index)">
                                                <div class="card-header bg-white" style="padding:35px;">
                                                    <div class="row">
                                                        <div class="col-auto align-self-center">
                                                            <h5 id="header-card" class="mb-0 text-gray-dark-1"
                                                                :class="index === isIndex ? 'font-weight-700' : 'font-weight-400'">
                                                                {{ item.question }}
                                                            </h5>
                                                        </div>
                                                        <div class="col justify-content-end d-flex">
                                                            <h5 class="mb-0">
                                                                <!-- icon-down -->
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                    height="16" fill="currentColor"
                                                                    class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd"
                                                                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                                                </svg>
                                                                <!-- icon down -->
                                                                <!-- icon up -->
                                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor" class="bi bi-chevron-up"
                                                            viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd"
                                                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                                        </svg> -->
                                                                <!-- icon up -->
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <div :id="'collapse' + index" class="px-4 collapse"
                                                :class="index === 1 ? 'show' : ''">
                                                <div class="card-body px-3">
                                                    <p class="text-gray-light-1 font-size-18 line-height-36">
                                                        <span v-html="item.answer"></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container py-5 d-none d-sm-block">
                        <div class="py-5 px-5 bg-fafafa">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <h4 class="text-gray-dark-2 font-weight-700">Siap untuk melakukan pengujian?</h4>
                                    <h6 class="text-gray-light-1 font-weight-400">
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
            <footer class="footer py-4" id="FooterPortal">
                <div class="container border-bottom">
                    <div class="row">
                        <div
                            class=" col-sm-4 col-md-3 col-12 col-sm-12 col-xs-12 d-sm-flex justify-content-sm-center mb-sm-4">
                            <img class="img-logo" src="/image/logo/logo-leap.png" alt="dtp-dsa-logo" />
                        </div>
                        <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                            <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">LAYANAN
                                INFORMASI</label>

                            <div class="media">
                                <em class="bi bi-envelope-fill font-size-15"></em>
                                <div class="media-body ml-2 mt-1">
                                    <p class="mb-sm-4 mb-md-2">helpdeskdxb@telkom.co.id</p>
                                </div>
                            </div>

                            <div class="media">
                                <em class="bi bi-whatsapp font-size-15"></em>
                                <div class="media-body ml-2 mt-1">
                                    <p class="mb-2">+62 822-2800-0720</p>
                                </div>
                            </div>

                            <div class="media">
                                <em class="bi bi-geo-alt-fill font-size-15"></em>
                                <div class="media-body ml-2 mt-1">
                                    <p class="mt-0 mb-sm-4 mb-md-2">Menara Bandung Digital Valley, Jl. Gegerkalong Hilir
                                        No.47, Sukarasa,
                                        Sukasari, Kota Bandung, Jawa Barat 40152</p>
                                </div>
                            </div>

                            <div class="media">
                                <em class="bi bi-geo-alt-fill font-size-15"></em>
                                <div class="media-body ml-2 mt-1">
                                    <p class="mt-0 mb-sm-4 mb-md-2">STO Telkom Kebayoran, Lt.6, Jl. Sisingamangaraja
                                        No.4, RT.2/RW.1, Selong, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus
                                        Ibukota Jakarta 12110, Indonesia
                                    </p>
                                </div>
                            </div>

                            <!-- <ul class="footer_ul_amrc"> -->
                            <!-- <li>
                                <a href="javascript:void(0);">
                                    <em class="bi bi-envelope-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;"></em>
                                </a>
                                <p class="mb-0">helpdeskdxb@telkom.co.id</p>
                            </li> -->
                            <!-- <li>
                                <a href="javascript:void(0);">
                                    <em class="bi bi-telephone-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;"></em>
                                </a>
                                <p class="mb-0">+62 822-2800-0720</p>
                                <span class="ml-4" style="color: #BDBEB2;">Hanya jam kerja (Senin - Jum’at)</span>
                            </li> -->
                            <!-- <li id="address-1">
                                <a href="javascript:void(0);">
                                    <em class="bi bi-geo-alt-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;height: 70px;"></em>
                                </a>
                                <p class="mb-0">
                                    Menara Bandung Digital Valley, Jl. Gegerkalong Hilir No.47, Sukarasa,
                                    Sukasari, Kota Bandung, Jawa Barat 40152
                                </p>
                            </li> -->
                            <!-- <li id="address-2">
                                <a href="javascript:void(0);">
                                    <em class="bi bi-geo-alt-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;height: 80px;"></em>
                                </a>
                                <p class="mb-0">
                                    Telkom STO Kebayoran, Jl. Sisingamangaraja No.4, RT.2/RW.1, Selong, Kec. Kby. Baru,
                                    Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110
                                </p>
                            </li> -->
                            <!-- </ul> -->
                        </div>
                        <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                            <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">JASA KAMI</label>
                            <ul class="footer_ul_amrc ml-sm-4 col">
                                <li>
                                    <nuxt-link to="/layanan/security-testing">Security Testing</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/layanan/heuristic-evaluation">Heuristic Evaluation (HE)</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/layanan/usability-testing">Usability Testing (UT)</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/layanan/software-testing">Sofware Testing</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/layanan/service-operation">Service Operation</nuxt-link>
                                </li>
                            </ul>
                        </div>
                        <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                            <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">LAINNYA</label>
                            <ul class="footer_ul_amrc ml-sm-4 col">
                                <li>
                                    <nuxt-link to="/publikasi">Publikasi</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/produk-dalam-pengujian">Produk Dalam Pengujian</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container" id="Lainnya">
                    <div class="row pt-4">
                        <div class="row col-md-7 col-sm-12  justify-content-sm-center mx-auto">
                            <div class="pr-4 link d-sm-none">
                                <img src="https://minio.digitalpass.id/static/assets/logo-telkom-putih.png"
                                    alt="telkom-logo" />
                            </div>
                            <div class="px-4 my-auto pt-3">
                                <nuxt-link to="/arsip-dokumen">
                                    <h6 class="text-gray-light-1">Arsip</h6>
                                </nuxt-link>
                            </div>
                            <div class="px-4 my-auto pt-3">
                                <nuxt-link to="/tentang-kami">
                                    <h6 class="text-gray-light-1">Tentang Kami</h6>
                                </nuxt-link>
                            </div>
                            <div class="px-4 my-auto pt-3">
                                <nuxt-link to="/syarat-ketentuan">
                                    <h6 class="text-gray-light-1">Syarat & Ketentuan</h6>
                                </nuxt-link>
                            </div>
                            <div class="px-4 my-auto pt-3">
                                <nuxt-link to="/FAQ">
                                    <h6 class="text-gray-light-1">FAQ</h6>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="m-0 p-0 col-md-5 col-sm-12">
                            <div class=" my-auto pt-1 text-sm-center d-none">
                                <nuxt-link to="/FAQ">
                                    <h6 class="text-gray-light-1 my-auto pt-1">Copyright © {{ date }} MDD Telkom</h6>
                                </nuxt-link>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    </div>

</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        TESTIMONI
    } from '@/config/constant';
    import {
        HEADER
    } from "@/config/menu/portal.js";

    export default {
        mixins: [mixins],
        middleware: ['authenticated'],
        data() {
            return {
                headerForAdmin: HEADER,
                homeBanner: [],
                whyChooseUs: [],
                listOurServices: [],
                ourServices: [],
                totalST: '',
                totalHE: '',
                totalUT: '',
                totalSEC: '',
                totalAK: '',
                totalAll: '',
                Filter: {
                    search: '',
                },
                Data: {
                    Testimoni: {
                        data: null,
                        length: 0
                    },
                    aboutUs: [],
                },
                IsLoading: false,

                faqs: [],
                isIndex: 1,
                date: null,
                isActive: false
            }
        },
        watch: {
            isIndex: function () {
                this.isClick();
            }
        },
        mounted() {
            this.getHomeBanner();
            this.getWhyChooseUs();
            this.findOurServices();
            this.getTotalProductsInTesting();
            this.getAboutUs();
            this.getFAQ();
            this.Data.Testimoni.data = TESTIMONI;
            const d = new Date();
            this.date = d.getFullYear();
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
            getFAQ() {
                this.GET(`/api/v3/portal/faq`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.faqs = data.content;
                    }
                });
            },
            scroll(param) {
                const scrollToElement = function (el, ms) {
                    const speed = (ms) ? ms : 600;
                    $('html,body').animate({
                        scrollTop: $(el).offset().top
                    }, speed);
                }
                scrollToElement(param, 600);
            },
            showNext() {
                this.$refs.carousel.next();
            },
            showPrev() {
                this.$refs.carousel.prev();
            },
            isClick(index) {
                this.index = index;
            },
            click(index) {
                this.isIndex = index;
                var selector, elems, makeActive;
                selector = '.bg-fafafa #card #header-card';
                elems = document.querySelectorAll(selector);
                makeActive = function () {
                    for (var i = 0; i < elems.length; i++)
                        elems[i].classList.remove('font-weight-700');
                    this.classList.add('font-weight-700');
                };
                for (var i = 0; i < elems.length; i++)
                    elems[i].addEventListener('mousedown', makeActive);
            },
            ajukanLayanan() {
                this.AjukanLayanan(null, null);
            },
            BannerNARU() {
                this.bannerNARU();
            }
        }
    }

</script>

<style scoped>
    .btn-auth-login {
        width: 110px;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
    }



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
    .navbar-fixed-top #nav-profile a span,
    .navbar-fixed-top #nav-notif a em {
        color: #656664;
    }

    .navbar-fixed-top.scrolled #nav-title ul li a.title,
    .navbar-fixed-top.scrolled #nav-profile a span,
    .navbar-fixed-top.scrolled #nav-notif a em {
        color: #656664 !important;
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
    }

    .topbar .nav-item.dropdown.show .dropdown-toggle::after {
        transform: rotate(180deg) !important;
    }

    .navbar-fixed-top {
        box-shadow: unset;
    }

    #forDesktop ul li a.nuxt-link-active {
        color: #ED2B24 !important;
    }

    footer {
        width: 100%;
        background-color: #F4F4F4;
        min-height: 250px;
        padding: 10px 0px 25px 0px;
    }

    .pt2 {
        padding-top: 40px;
        margin-bottom: 20px;
    }

    footer p {
        font-size: 12px;
        color: #7F817D !important;
        padding-bottom: 0px;
        margin-bottom: 8px;
    }

    .mb10 {
        padding-bottom: 15px;
    }

    .footer_ul_amrc {
        margin: 0px;
        list-style-type: none;
        font-size: 12px;
        padding: 0px 0px 10px 0px;
    }

    .footer_ul_amrc li {
        padding: 0px 0px 20px 0px;
    }

    .footer_ul_amrc li a {
        color: #7F817D;
        /* text-decoration: none; */
    }

    .fleft {
        float: left;
    }

    .padding-right {
        padding-right: 10px;
    }

    .footer_ul2_amrc {
        margin: 0px;
        list-style-type: none;
        padding: 0px;
    }

    .footer_ul2_amrc li p {
        display: table;
    }

    .footer_ul2_amrc li a:hover {
        text-decoration: none;
    }

    .footer_ul2_amrc li i {
        margin-top: 5px;
    }

    .foote_bottom_ul_amrc {
        list-style-type: none;
        padding: 0px;
        display: table;
        margin-top: 10px;
        margin-right: auto;
        margin-bottom: 10px;
        margin-left: auto;
    }

    .foote_bottom_ul_amrc li {
        display: inline;
    }

    .foote_bottom_ul_amrc li a {
        color: #999;
        margin: 0 12px;
    }

    .social_footer_ul {
        display: table;
        margin: 15px auto 0 auto;
        list-style-type: none;
    }

    .social_footer_ul li {
        padding-left: 20px;
        padding-top: 10px;
        float: left;
    }

    .social_footer_ul li a {
        color: #CCC;
        border: 1px solid #CCC;
        padding: 8px;
        border-radius: 50%;
    }

    .social_footer_ul li i {
        width: 20px;
        height: 20px;
        text-align: center;
    }

    .footer a h6:hover,
    .footer ul li a:hover {
        color: #ED2B24 !important;
        text-decoration: underline !important;
    }

    .footer a h6,
    .footer ul li a {
        /* text-decoration: underline !important; */
    }

    .img-logo {
        width: 120px;
    }

    .container {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
    }

    @media (max-width: 576px) {
        .dipercayai-oleh-desktop {
            display: none !important;
        }

        .px-4 {
            padding-right: 0.25rem !important;
            padding-left: 0.25rem !important;
        }

        .d-sm-flex {
            display: -webkit-box !important;
            display: -ms-flexbox !important;
            display: flex !important
        }

        .justify-content-sm-center {
            -webkit-box-pack: center !important;
            -ms-flex-pack: center !important;
            justify-content: center !important
        }

        .mb-sm-4,
        .my-sm-4 {
            margin-bottom: 1.5rem !important;
        }

        .width-layanan-informasi {
            width: 80%;
        }

        .mb-sm-5,
        .my-sm-5 {
            margin-bottom: 3rem !important;
        }

        .ml-sm-4,
        .mx-sm-4 {
            margin-left: 1.5rem !important;
        }

        .d-sm-none {
            display: none !important;
        }

        .mr-sm-auto,
        .mx-sm-auto {
            margin-right: auto !important;
        }

        .text-sm-center {
            text-align: center !important;
        }
    }

    @media (min-width: 576px) {
        .dipercayai-oleh-mobile {
            display: none !important;
        }

        .d-sm-flex {
            display: unset !important;
        }

        .justify-content-sm-center {
            -webkit-box-pack: unset !important;
            -ms-flex-pack: unset !important;
            justify-content: unset !important
        }

        .ml-sm-4,
        .mx-sm-4 {
            margin-left: 0 !important;
        }

        .d-sm-none {
            display: block !important;
        }

        .text-sm-center {
            text-align: right !important;
        }

    }

</style>
