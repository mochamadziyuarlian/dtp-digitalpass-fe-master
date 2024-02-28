<template>
    <div>
        <div class="bg-white">
            <div class="container py-content">
                <app-about-us :aboutUs="aboutUs"></app-about-us>
            </div>
            <div class="container-fluid">
                <div class="bg-fafafa">
                    <div class="container" style="padding-bottom: 80px;">
                        <div class="text-center" style="padding-top: 80px;padding-bottom: 80px;">
                            <label class="text-gray-main font-size-48 font-weight-900">
                                Objective Key Result
                            </label>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="text-gray-dark-1 font-weight-700">VISI</h5>
                                        <h2 class="text-gray-light-1 line-height-46">
                                            Memberikan kepuasan kepada pengguna dan keuntungan bisnis bagi perusahaan.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="text-gray-dark-1 font-weight-700">MISI</h5>
                                        <h2 class="text-gray-light-1 line-height-46">
                                            Membangun kualitas produk digital Telkom Group bertaraf Internasional.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container container-main">
                <div class="row d-flex align-items-center">
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <img src="https://minio.digitalpass.id/static/assets/portal/about-us-img.png" class="w-100"
                            alt="about-us">
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div class="pb-1">
                            <h5 class="text-gray-light-1 font-weight-900 line-height-27">TIM</h5>
                        </div>
                        <h2 class="text-gray-dark-1 font-weight-900 line-height-44">Manajemen DOA</h2>
                        <div class="pt-4">
                            <label class="text-gray-main font-weight-900 line-height-36 font-size-36">
                                “Quality is everyone’s responsibility”
                            </label>
                            <label class="text-gray-main font-size-16 pt-4">
                                — Deming, W. Edwards
                            </label>
                        </div>
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
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        components: {
            'app-about-us': AboutUs,
        },
        data() {
            return {
                aboutUs: [],
                visiMisi: []
            }
        },
        mounted() {
            this.getAboutUs();
            this.getVisiMisi();
        },
        methods: {
            getAboutUs() {
                this.GET(`/api/v3/portal/about-dsa`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.aboutUs = data.content[0];
                    }
                });
            },
            getVisiMisi() {
                this.GET(`/api/v3/portal/visi-misi`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.visiMisi = data.content;
                    }
                });
            },
            ajukanLayanan() {
                this.AjukanLayanan(null, null);
            }
        }
    }

</script>
