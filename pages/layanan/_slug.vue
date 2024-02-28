<template>
    <div>
        <div class="bg-fafafa" id="BannerLayanan">
            <div class="container py-content">
                <div class="pb-5">
                    <div class="row pb-3">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <h1 class="font-size-72 font-weight-900 text-red-main w-75" id="head">
                                {{ Services.title }}
                            </h1>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <p class="text-gray-dark-1 font-size-24 line-height-48" id="sub_head">
                                {{ Services.desc }}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <button class="btn btn-dsa-primary btn-dsa-lg" @click="ajukanLayanan">
                                <span class="font-size-20">Ajukan Layanan</span>
                            </button>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <label class="lihat-selengkapnya" @click="lihatSelengkapnya">
                                Lihat selengkapnya
                                <span>
                                    <em class="bi bi-arrow-down"></em>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" id="TreeCard" v-if="slug === 'heuristic-evaluation'">
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="font-weight-bold text-gray-dark-1" id="head">User Interface</h5>
                            <h6 class="text-gray-light-1 line-height-24" id="sub_head">
                                Memeriksa dokumen standar dan instruksi integrasi untuk Interface
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="font-weight-bold text-gray-dark-1" id="head">User Experience</h5>
                            <h6 class="text-gray-light-1 line-height-24" id="sub_head">
                                Memvalidasi alur fungsi dan menilai bagian rentan
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="font-weight-bold text-gray-dark-1" id="head">Micro-Interaction</h5>
                            <h6 class="text-gray-light-1 line-height-24" id="sub_head">
                                Pemecahan masalah, bantuan, interaksi dukungan dan konten terkait.
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white" id="Kenapa">
            <div class="container" v-if="slug === 'heuristic-evaluation'">
                <div class="py-5">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="right">
                                <div class="top-title">
                                    <h5 class="font-weight-900 text-gray-light-1" id="head">WHY?</h5>
                                    <h2 class="font-weight-900 text-gray-dark-1 line-height-44 w-75" id="sub_head">
                                        Heuristic Evaluation
                                        User Interface/User Experience
                                    </h2>
                                </div>
                                <h5 class="text-gray-main line-height-36 pt-5" style="width: 80%;" id="value">
                                    Seringkali disebut Expert Review atau kadang disebut juga Design Audit, bisa
                                    digunakan seperti P3K dalam proses re-design suatu produk digital dan untuk mencari
                                    tahu problem usability diawal sebelum melakukan riset lebih lanjut.
                                </h5>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="left">
                                <img src="@/assets/images/portal/HE_first.png" alt="" class="">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12" style="z-index: 3;">
                            <div class="right">
                                <img src="@/assets/images/portal/HE_second.png" alt="" class="">
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-end mb-5 pb-5 text-right"
                            style="z-index: 2;">
                            <div class="left">
                                <img src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="" class=""
                                    style="position: absolute;bottom: 23rem;">
                                <img src="https://minio.digitalpass.id/static/assets/portal/about-us-2.jpg" alt=""
                                    class="w-100 rounded d-none d-sm-block">
                                <img src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="" class=""
                                    style="position: absolute;top: 11rem;left: 26.3rem;z-index: -1;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container pt-5">
                <div class="pt-5 pb-5 proses-kami" id="Proses_kami">
                    <div class="row pb-3">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="top-title">
                                <h5 class="font-weight-900 text-gray-light-1" id="head">PROSES KAMI</h5>
                                <h2 class="font-weight-900 text-gray-dark-1" id="sub_head">Prosedur yang kami lakukan
                                    saat
                                    {{ Services.title }}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 float-right">
                            <div class="left">
                                <div class="card cursor-pointer border-0"
                                    v-for="(item, index) in detailPageServices.OurProcess" :key="index"
                                    :class="index === isArrSelected ? isSelected : ''"
                                    @click="isClicked(index, item.img)">
                                    <div class="card-body px-4 py-3">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                <button class="btn bg-red-main btn-circle cursor-default" id="count">
                                                    <span
                                                        class="font-weight-bold font-size-24 text-white">{{ index+1 }}</span>
                                                </button>
                                            </div>
                                            <div class="col ml-2 pt-2">
                                                <h4 class="font-weight-bold text-gray-main" id="head">{{ item.title }}
                                                </h4>
                                            </div>
                                        </div>
                                        <div class="row d-none d-sm-block">
                                            <div class="col">
                                                <h6 class="text-gray-light-1 pt-3" id="sub_head">{{ item.sub_title }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-center float-left">
                            <div class="left">
                                <img :src="img" alt="bg-section-3" class="w-100">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-5" id="Daftar_Produk">
                    <div class="row pb-3">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="top-title">
                                <h5 class="font-weight-900 text-gray-light-1" id="head">DAFTAR PRODUK</h5>
                                <h2 class="font-weight-900 text-gray-dark-1" id="sub_head">Produk yang telah dilakukan
                                    pengujian
                                    {{ Services.title }}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="card">
                        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12"
                            v-for="(item, index) in productList" :key="index">
                            <div class="card my-3 border-0" style="height: 10rem;">
                                <div class="card-body">
                                    <h5 class="font-weight-bold text-gray-dark-1 text-capitalize" id="head">
                                        {{ item.product_name }}</h5>
                                    <h6 class="text-gray-light-1 line-height-24" id="sub_head">
                                        {{ item.product_description.substring(0, 70) }} ...
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center py-4" :class="isMaxShowMore ? 'd-none' : ''">
                        <button class="btn border btn-red btn-show-more" @click="showMore()">
                            <span>Tampilkan lebih banyak
                                <img src="@/assets/images/icon/arrow-new-down.svg" alt="">
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row document-requirement" id="Documents">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 pr-0">
                <div class="left bg-red-main">
                    <div class="section-5-additional-1">
                        <label class="font-weight-900 font-size-48 line-height-64 text-white" id="head">
                            Langkah Mudah Untuk Melakukan {{ Services.title }}
                        </label>
                    </div>
                    <div class="section-5-additional-2">
                        <h4 class="text-white line-height-48" id="sub_head">
                            Persyaratan yang diperlukan untuk pengajuan pengujian {{ Services.title }}
                        </h4>
                    </div>
                    <div class="section-5-additional-3" style="z-index: 99;">
                        <button class="btn btn-dsa-primary btn-dsa-lg border-white w-100 font-weigth-700 font-size-20"
                            @click="downloadDocument(detailPageServices.SampleDocument)">
                            Download Dokumen
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 pl-0">
                <div class="right bg-gray-light-3">
                    <div class="section-5-additional-1">
                        <label id="head">Anda Perlu Menyiapkan:</label>
                        <ul>
                            <li v-for="(item, index) of detailPageServices.NeedPrepare" :key="index" id="head">
                                {{ item.label }}
                            </li>
                        </ul>
                    </div>
                    <label class="text-gray-main font-size-18 line-height-36" id="sub_head">
                        Jika ada hal yang ingin ditanyakan, dapat menghubungi kami pada layanan informasi kami.
                    </label>
                </div>
            </div>
        </div>
        <div class="bg-white">
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
    import mixins from '@/plugins/mixins.js';
    import {
        LAYANAN_HE,
        LAYANAN_UT,
        LAYANAN_ST,
        LAYANAN_SC,
        LAYANAN_AK
    } from '@/config/constant';
    import {
        SERVICES
    } from '@/static/v3/Portal/constants/menu';


    export default {
        layout: 'portal/default',
        mixins: [mixins],
        data() {
            return {
                product_id: '',
                product_type: '',
                slug: '',
                layananData: {},
                productList: [],
                size: 9,
                sizeAPI: '',
                totalDataServices: '',
                id_services: '',
                Services: {},
                detailPageServices: {},
                totalDataProduct: '',
                isMaxShowMore: false,
                isSelected: '',
                isArrSelected: 0,
                img: '',
                serviceInformation: {}
            };
        },
        async mounted() {
            await this.getDataWithSlug();
            this.getDetailPageServices();
            this.IsDefaultValue();

            let responseInformation = SERVICES.find((x) => {
                if(this.$route.params.slug === 'service-operation') {
                    return x.slug === 'alih-kelola';
                } else {
                    return x.slug === this.$route.params.slug;
                }
            })
            if (responseInformation !== undefined) {
                this.serviceInformation = responseInformation;
            }
        },
        watch: {
            size() {
                this.getProductList();
            }
        },
        methods: {
            isClicked(arr, img) {
                this.isArrSelected = arr;
                this.isSelected = 'selected';
                this.img = img;
            },
            IsDefaultValue() {
                this.isArrSelected = 0;
                this.isSelected = 'selected';
                this.img = this.detailPageServices.OurProcess[0].img;
            },
            async getDataWithSlug() {
                const body = {
                    slug: this.$route.params.slug === 'service-operation' ? 'alih-kelola' : this.$route.params
                        .slug,
                };
                await this.Request('GET', '/api/v3/service', null, body, 'BASIC', (data) => {
                    if (data.code === 200) {
                        let service = data.content.find((x) => {
                            if(this.$route.params.slug === 'service-operation') {
                                return x.slug === 'alih-kelola';
                            } else {
                                return x.slug === this.$route.params.slug;
                            }
                        });
                        this.getData(service.id);
                        this.id_services = service.id;
                        this.product_id = service.id;
                        this.product_type = service.name;
                        this.slug = service.slug;
                        this.getProductList();
                    };
                });
            },
            async getData(product_id) {
                await this.Request('GET', '/api/v3/service/' + product_id, null, null, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.layananData = data.content[0];
                    };
                });
            },
            lihatSelengkapnya() {
                const scrollToElement = function (el, ms) {
                    const speed = (ms) ? ms : 600;
                    $('html,body').animate({
                        scrollTop: $(el).offset().top
                    }, speed);
                }
                scrollToElement('#Kenapa', 600);
            },
            async getProductList() {
                await this.Request('GET',
                    `/api/v3/requests?page=1&size=${this.size}&service_id=${this.id_services}`, null, null,
                    'BASIC', (data) => {
                        if (data.code === 200) {
                            this.productList = data.content;
                            this.totalDataProduct = data.meta.totalData;
                        };
                    });
            },
            showMore() {
                this.size = this.size + 9;
                if (this.size > this.totalDataProduct) {
                    this.size = this.totalDataProduct;
                    this.isMaxShowMore = true;
                }
            },
            getDetailPageServices() {
                switch (this.$route.params.slug) {
                    case 'security-testing':
                        this.Services = LAYANAN_SC.Data;
                        this.detailPageServices = LAYANAN_SC;
                        break;
                    case 'usability-testing':
                        this.Services = LAYANAN_UT.Data;
                        this.detailPageServices = LAYANAN_UT;
                        break;
                    case 'service-operation':
                        this.Services = LAYANAN_AK.Data;
                        this.detailPageServices = LAYANAN_AK;
                        break;
                    case 'software-testing':
                        this.Services = LAYANAN_ST.Data;
                        this.detailPageServices = LAYANAN_ST;
                        break;
                    case 'heuristic-evaluation':
                        this.Services = LAYANAN_HE.Data;
                        this.detailPageServices = LAYANAN_HE;
                        break;
                }
            },
            ajukanLayanan() {
                // this.AjukanLayanan(this.product_id, this.slug, this.product_type);
                this.$store.commit('setIsHasService', true);
                this.$store.commit('setServiceValue', {
                    id: this.product_id,
                    name: this.serviceInformation.service_name,
                    desc_text: this.serviceInformation.desc_text,
                    slug: this.serviceInformation.slug
                });
                this.$router.push('/user/monitoring/pengajuan-layanan/pengajuan');
            },
            downloadDocument(link) {
                window.open(link);

            }
        },
    };

</script>
