<template>
    <div class="bg-white">
        <div class="container" id="Publikasi">
            <div class="row py-5" id="SectionTitle">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="text-gray-dark-1 font-size-60 font-weight-900" id="head">Publikasi</label>
                </div>
            </div>
            <div class="row border-bottom py-3" id="SectionTitleContent">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <h2 class="text-gray-dark-1 font-weight-900" id="head">DOA Weekly Review</h2>
                </div>
                <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                        <h5 class="text-gray-dark-1 font-weight-700 text-underline-main cursor-pointer">
                            Tampilkan Semua
                            <span class="text-black ml-3">
                                <em class="bi bi-arrow-right"></em>
                            </span>
                        </h5>
                    </div> -->
                <!-- <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div class="row" v-if="Data.MainNews.content.length !== 0">
                        <div class="col-auto pr-4">
                            <span class="badge badge-secondary rounded-circle bg-red-main font-size-36"
                                style="width: 65px;height: 65px;">
                                <h2 class="mt-1 font-weight-900">A</h2>
                            </span>
                        </div>
                        <div class="col pl-4" style="border-left: 2px solid #e3e6f0 !important;">
                            <label
                                class="text-gray-light-1 font-size-18 mb-0">{{ Data.MainNews.content[0].created_at | formatDate }}
                                WIB
                            </label>
                            <br>
                            <label class="text-gray-main font-size-20 font-weight-700 mb-0">
                                By {{ Data.MainNews.content[0].publisher_name }}
                            </label>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Cari Publikasi" aria-label="Search for ..."
                            @keyup="GetMainNews()" v-model="search" style="height: 3rem;">
                        <div class="input-group-append">
                            <button class="btn btn-red" type="button" style="width: 3.5rem;" @click="GetMainNews()">
                                <span>
                                    <em class="fa fa-search"></em>
                                </span>
                            </button>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="row pt-3" id="SectionContent">
                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <div class="d-flex justify-content-center" style="height: 19rem;align-items: center;"
                        v-if="Data.MainNews.content.length === 0">
                        <label>Data tidak ditemukan</label>
                    </div>
                    <div class="card bg-transparent border-0" v-for="(item, index) in Data.MainNews.content"
                        :key="index">
                        <h2 class="text-gray-dark-1 font-weight-900 pb-3" id="head">
                            {{ item.heading.slice(0, 25) }} ...</h2>
                        <img class="img-fluid rounded"
                            :src="item.thumbnail || 'https://minio.digitalpass.id/static/assets/portal/about-us-1.png'"
                            alt="">
                        <div class="card-body px-0">
                            <p class="text-gray-main font-size-20 line-height-36" id="value">
                                <span v-html="`${item.content.slice(0, 120)} ...`"></span>
                            </p>
                            <nuxt-link :to="`/publikasi/${item.id}`" id="value"
                                class="text-red-main font-size-20 font-weight-700 link-dsa-hover">
                                Baca selengkapnya >>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" id="SectionContent">
                    <div class="card bg-transparent border-0" v-for="(item, index) in Data.TopThreeNews.content"
                        :key="index">
                        <nuxt-link :to="`/publikasi/${item.id}`">
                            <div class="card-body cursor-pointer px-0 pt-0 mb-4">
                                <div class="row">
                                    <div class="col-auto">
                                        <h5 class="text-gray-dark-1 font-weight-900 line-height-44 link-dsa-hover"
                                            id="head" style="width: 17.5rem;">
                                            {{ item.heading.slice(0, 40) }} ...
                                        </h5>
                                    </div>
                                    <div class="col">
                                        <span class="text-black font-size-30">
                                            <em class="bi bi-arrow-right"></em>
                                        </span>
                                    </div>
                                </div>
                                <label class="text-gray-light-1 font-size-18 font-weight-400 mt-3" id="value">
                                    {{ item.created_at | formatDate }} WIB
                                </label>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="pt-5" id="SectionLaporanUjiDSA">
                <div class="row border-bottom py-3">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="SectionTitle">
                        <h2 class="text-gray-dark-1 font-weight-900" id="head">Laporan DOA</h2>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                        <nuxt-link :to="`/laporan`">
                            <h5 class="text-gray-dark-1 font-weight-700 text-underline-main cursor-pointer"
                                @click="TampilkanSemuaLaporan()">
                                Tampilkan Semua
                                <span class="text-black ml-3">
                                    <em class="bi bi-arrow-right"></em>
                                </span>
                            </h5>
                        </nuxt-link>
                    </div>
                </div>
                <div class="row py-3" id="SectionContent">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-3"
                        v-for="(item, index) in Data.Laporan.content" :key="index">
                        <div class="card bg-transparent border-0">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <img class="img-fluid" :src="item.thumbnail" :alt="item.thumbnail_name">
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div class="card-body p-0">
                                        <label class="text-gray-dark-1 font-size-28 font-weight-900 line-height-36 pb-3"
                                            id="head">
                                            {{ item.heading.slice(0, 25) }} ...
                                        </label>
                                        <p class="text-gray-main font-size-16" id="value"
                                            v-html="`${item.content.slice(0, 130)} ...`"></p>
                                        <p class="text-gray-main font-size-16 py-3" id="value">
                                            {{ item.created_at | formatDate}}
                                        </p>
                                        <nuxt-link :to="`/laporan/${item.id}`" class="btn btn-sm btn-dsa-primary mr-2"
                                            id="UnduhLaporan">
                                            Unduh
                                        </nuxt-link>
                                        <a href="javascript:void(0);" id="IdLihatLaporan" @click="ModalPreviewPDF(item)"
                                            class="btn btn-sm btn-light">
                                            Lihat
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-5">
                <div class="row border-bottom py-3">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="SectionTitle">
                        <h2 class="text-gray-dark-1 font-weight-900" id="head">Berita DOA</h2>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                        <!-- <h5 class="text-gray-dark-1 font-weight-700 text-underline-main cursor-pointer">
                            Tampilkan Semua
                            <span class="text-black ml-3">
                                <em class="bi bi-arrow-right"></em>
                            </span>
                        </h5> -->
                    </div>
                </div>
                <div class="row py-3" id="SectionContent">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 my-3"
                        v-for="(item, index) in Data.AllNews.content" :key="index">
                        <nuxt-link :to="`/publikasi/${item.id}`">
                            <div class="card bg-transparent border-0">
                                <img class="img-fluid rounded" :src="item.thumbnail" alt=""
                                    style="height: 214px;max-width: 350px;max-height: 214px;">
                                <div class="card-body px-0">
                                    <h5 class="text-gray-dark-1 font-weight-900" id="head">
                                        {{ item.heading.slice(0, 25) }} ...
                                    </h5>
                                    <p class="text-gray-main font-size-16 line-height-24" id="value">
                                        <span v-html="`${item.content.substring(0, 75)} ...`"></span>
                                    </p>
                                    <nuxt-link :to="`/publikasi/${item.id}`" id="value"
                                        class="text-red-main font-weight-700 link-dsa-hover">
                                        Baca selengkapnya >>
                                    </nuxt-link>
                                </div>
                            </div>
                        </nuxt-link>
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







        <b-modal ref="RefPreviewPDF" size="xl" scrollable hide-header hide-footer modal-class="">
            <div class="row">
                <div class="col-auto py-4 px-3 d-none">
                    <div class="row" v-for="(item, index) of new Array(9)" :key="index">
                        <div class="col-xl-12 text-center">
                            <div class="card cursor-pointer"
                                style="height: 174px; width: 174px; background-color: #F2F2F2; border-radius: 4px; border: 0px solid transparent;">
                            </div>
                            <label class="font-size-16 text-dsa-black font-weight-bold"
                                style="margin-top: 16px; margin-bottom: 16px;">
                                {{ index }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="col" style="background-color: #F2F2F2;">
                    <div class="row d-none" style="height: 88px; background-color: white;">
                        <div class="col px-0">

                            <div class="row d-flex align-self-center ml-4">
                                <div class="col-auto mt-3">
                                    <img src="/icon/publikasi/grid.svg">
                                </div>

                                <div class="col mt-2">
                                    <label class="font-size-18 font-size-600">
                                        {{ Data.DetailLaporan.heading }}
                                    </label>
                                    <p class="mb-0">
                                        <span class="font-size-16 font-size-600 text-dsa-danger">
                                            Page 1
                                        </span>
                                        <span class="font-size-16 font-size-600 text-dsa-secondary">
                                            From 4
                                        </span>
                                    </p>
                                </div>
                            </div>

                        </div>



                        <div class="col mt-2">

                            <button type="button" class="btn btn-dsa-primary" style="width: 120px; height: 48px;">
                                <span class="font-size-16">
                                    Unduh
                                </span>
                                <img src="/icon/download-white.svg">
                            </button>
                        </div>



                    </div>

                    <div class="row">
                        <div class="col-xl-12">
                            <!-- <div class="p-4"> -->
                            <div class="card">
                                <div class="card-body p-0">
                                    <iframe class="w-100" :src="PreviewPDF"
                                            style="height: 70vh;"></iframe>
                                </div>
                            </div>
                            <!-- </div> -->
                        </div>
                    </div>


                </div>
            </div>
        </b-modal>




        <b-modal ref="RefLihatLaporan" size="lg" scrollable hide-footer modal-class="SectionContent">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="text-gray-dark-1 font-size-32 font-weight-900" id="head">
                        {{ Data.DetailLaporan.heading }}
                    </label>
                    <img class="img-fluid rounded w-100" :src="Data.DetailLaporan.thumbnail" alt="">
                    <div class="text-center pt-3 pb-4">
                        <span class="text-center text-gray-light-2 font-size-12">
                            {{ Data.DetailLaporan.heading }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row" id="SectionAuthor">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <div class="py-2">
                        <p class="font-size-16 text-gray-light-2 mb-0">PENULIS</p>
                        <p class="font-size-16 text-gray-main font-weight-700">
                            {{ Data.DetailLaporan.publisher_name }}
                        </p>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <div class="py-2">
                        <p class="font-size-16 text-gray-light-2 mb-0">TANGGAL</p>
                        <p class="font-size-16 text-gray-main font-weight-700">
                            {{ Data.DetailLaporan.created_at | formatDate }}
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
                    <p class="text-gray-main font-size-20 text-justify" v-html="Data.DetailLaporan.content" id="value">
                    </p>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import moment from 'moment';
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        data() {
            return {
                PreviewPDF: null,
                Data: {
                    MainNews: {
                        content: [],
                        meta: {}
                    },
                    TopThreeNews: {
                        content: [],
                        meta: {}
                    },
                    AllNews: {
                        content: [],
                        meta: {}
                    },
                    Laporan: {
                        content: [],
                        meta: {
                            page: 1,
                            size: 2,
                            status: 1
                        }
                    },
                    DetailLaporan: []
                },
                search: ''
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
            this.GetMainNews();
            this.GetTopThreeNews();
            this.GetAllNews();
            this.GetLaporan();
            localStorage.setItem('pathFrom', window.location.pathname);
        },
        methods: {
            GetMainNews() {
                this.GET(`/api/v3/portal/kegiatan?page=1&size=1&search=${this.search}`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.MainNews.content = data.content.filter(x => x.status === 1);
                        this.Data.MainNews.meta = data.meta;
                    }
                });
            },
            GetTopThreeNews() {
                this.GET(`/api/v3/portal/kegiatan?page=1&size=3`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.TopThreeNews.content = data.content.filter(x => x.status === 1);
                        this.Data.TopThreeNews.meta = data.meta;
                    }
                });
            },
            GetAllNews() {
                this.GET(`/api/v3/portal/kegiatan`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.AllNews.content = data.content.filter(x => x.status === 1);
                        this.Data.AllNews.meta = data.meta;
                    }
                });
            },
            GetLaporan() {
                let params = {
                    page: this.Data.Laporan.meta.page,
                    size: this.Data.Laporan.meta.size,
                    status: this.Data.Laporan.meta.status
                };
                this.Request('GET', '/api/v3/portal/laporan', params, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.Laporan.content = callback.content;
                    };
                });
            },
            ajukanLayanan() {
                this.AjukanLayanan(null, null);
            },
            ModalLihatLaporan(data) {
                this.Data.DetailLaporan = data;
                this.$refs['RefLihatLaporan'].toggle('#IdLihatLaporan');
            },
            TampilkanSemuaLaporan() {
                this.Data.Laporan.meta.page = null;
                this.Data.Laporan.meta.size = null;
                this.GetLaporan();
            },


            ModalPreviewPDF(item) {
                this.Data.DetailLaporan = item;
                // this.PreviewPDF = 'http://www.africau.edu/images/default/sample.pdf';
                this.PreviewPDF = 'http://149.129.247.151:9000/client/sample.pdf';
                console.log(item)
                this.$refs['RefPreviewPDF'].toggle('#IdLihatLaporan');
            }
        }
    }

</script>
