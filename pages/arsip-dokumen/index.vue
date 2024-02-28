<template>
    <div>
        <div class="bg-white" id="ArsipDokument">
            <div class="container" id="SectionTitle">
                <div class="main">
                    <div class="row align-items-center">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <h1 class="display-4 font-weight-900 text-red-main" id="head">
                                Arsip Dokumen
                                Pengajuan
                            </h1>
                            <h6 class="text-gray-dark-1 line-height-36 w-75 pt-4" id="value">
                                Berikut adalah beberapa dokumen dari produk yang telah kami uji.
                            </h6>
                        </div>
                    </div>
                    <div class="row align-items-center pt-5">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <label class="lihat-selengkapnya" @click="lihatSelengkapnya" id="value">
                                Lihat selengkapnya
                                <span>
                                    <em class="bi bi-arrow-down"></em>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <hr style="border: 1px dashed #C4C4C4;" id="section-2">
            <div class="container">
                <div class="py-5">
                    <div class="row border-bottom py-3" id="SearchFilter">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h2 class="text-gray-dark-1 font-weight-900">Laporan Uji DOA</h2>
                        </div>
                        <div id="Search"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="Filter.search"
                                        @keyup="GetArsipDokumen()" placeholder="Cari laporan ...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-3"
                            v-for="(item, index) in Data.ArsipDokumen.data" :key="index">
                            <div class="card bg-transparent border-0">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <img class="img-fluid"
                                            src="https://minio.digitalpass.id/static/assets/portal/cover_prd.png"
                                            alt="">
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="card-body p-0">
                                            <p class="text-red-light-1 mb-2">
                                                .{{ item.file_type }}
                                            </p>
                                            <label
                                                class="text-gray-dark-1 font-size-28 font-weight-900 line-height-36 pb-3 pt-1">
                                                {{ item.name }}
                                            </label>
                                            <p class="text-gray-main font-size-16">
                                                {{ item.created_at  | formatDate }}
                                            </p>
                                            <p class="text-gray-main font-size-16">
                                                <b>{{ item.file_size }}kb</b>
                                            </p>
                                            <a :href="item.path" target="_blank"
                                                class="btn btn-sm btn-dsa-primary mr-2">
                                                Unduh
                                            </a>
                                            <!-- <a href="#" class="btn btn-sm btn-light">
                                                Lihat
                                            </a> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center pb-5" :class="Any.isMaxShowMore ? 'd-none' : ''">
                    <button class="btn border btn-red btn-show-more" @click="ShowMore()">
                        <span>Tampilkan lebih banyak
                            <img src="@/assets/images/icon/arrow-new-down.svg">
                        </span>
                    </button>
                </div>
            </div>
        </div>
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
                Meta: {
                    pageSize: 4
                },
                Filter: {
                    search: '',
                },
                Data: {
                    ArsipDokumen: {
                        data: null,
                        length: 0
                    }
                },
                IsLoading: false,
                Any: {
                    totalDataProduct: null,
                    isMaxShowMore: false,
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
                this.GetArsipDokumen();
            },
            'Meta.pageSize'() {
                this.GetArsipDokumen();
            }
        },
        mounted() {
            this.GetArsipDokumen();
        },
        methods: {
            GetArsipDokumen() {
                this.GET(
                    `/api/attachment-template?page=1&size=${this.Meta.pageSize}&search_key=${this.Filter.search}`,
                    'BASIC', (data) => {
                        if (data.code === 200) {
                            this.Data.ArsipDokumen.data = data.content;
                            this.Data.ArsipDokumen.length = data.content.length;
                            this.Any.totalDataProduct = data.meta.totalData;
                        }

                    });
            },
            lihatSelengkapnya() {
                const scrollToElement = function (el, ms) {
                    const speed = (ms) ? ms : 600;
                    $('html,body').animate({
                        scrollTop: $(el).offset().top
                    }, speed);
                }
                scrollToElement('#section-2', 600);
            },
            ShowMore() {
                this.Meta.pageSize = this.Meta.pageSize + 4;
                if (this.Meta.pageSize > this.Any.totalDataProduct) {
                    this.Meta.pageSize = this.Any.totalDataProduct;
                    this.Any.isMaxShowMore = true;
                }
            },
        }
    }

</script>
