<template>
    <div>
        <div class="bg-white" id="ArsipDokument Publikasi">
            <div class="container" id="SectionTitle">
                <div class="main">
                    <div class="row align-items-center">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <h1 class="display-4 font-weight-900 text-red-main" id="head">
                                Laporan
                            </h1>
                            <h6 class="text-gray-dark-1 line-height-36 w-75 pt-4" id="value">
                                Berikut adalah beberapa laporan dari DOA.
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
                <div class="py-5" id="SectionLaporanUjiDSA">
                    <div class="row border-bottom py-3" id="SearchFilter">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h2 class="text-gray-dark-1 font-weight-900">Laporan DOA</h2>
                        </div>
                        <div id="Search"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <date-picker type="date" v-model="DateRange" range placeholder="Filter date by">
                                    </date-picker>
                                    <!-- <input type="text" class="form-control" v-model="Filter.search"
                                        @keyup="GetLaporan()" placeholder="Cari laporan ..."> -->
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
                                        <img class="img-fluid" :src="item.thumbnail" :alt="item.thumbnail_name">
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="card-body p-0">
                                            <label
                                                class="text-gray-dark-1 font-size-28 font-weight-900 line-height-36 pb-3"
                                                id="head">
                                                {{ item.heading.slice(0, 25) }} ...
                                            </label>
                                            <p class="text-gray-main font-size-16" id="value"
                                                v-html="`${item.content.slice(0, 130)} ...`"></p>
                                            <p class="text-gray-main font-size-16 py-3" id="value">
                                                {{ item.created_at | formatDate }}
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
                <div class="row justify-content-center pb-5" :class="Any.isMaxShowMore ? 'd-none' : ''">
                    <button class="btn border btn-red btn-show-more" @click="ShowMore()">
                        <span>Tampilkan lebih banyak
                            <img src="@/assets/images/icon/arrow-new-down.svg">
                        </span>
                    </button>
                </div>
            </div>
        </div>
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
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        components: {
            DatePicker
        },
        data() {
            return {
                Meta: {
                    pageSize: 4
                },
                Filter: {
                    search: '',
                    Date: {
                        start: null,
                        end: null,
                    },
                },
                Data: {
                    ArsipDokumen: {
                        data: null,
                        length: 0
                    },
                    DetailLaporan: []
                },
                IsLoading: false,
                Any: {
                    totalDataProduct: null,
                    isMaxShowMore: false,
                },
                DateRange: null,
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
        watch: {
            'Filter.search'() {
                this.GetLaporan();
            },
            'Meta.pageSize'() {
                this.GetLaporan();
            },
            'DateRange'() {
                if (this.DateRange !== null) {
                    this.Filter.Date.start = this.DateRange[0];
                    this.Filter.Date.end = this.DateRange[1];
                    this.GetLaporan();
                }
            }
        },
        mounted() {
            this.GetLaporan();
            localStorage.setItem('pathFrom', window.location.pathname);
        },
        methods: {
            GetLaporan() {
                this.Data.ArsipDokumen.data = null;
                let params = {
                    page: 1,
                    size: this.Meta.pageSize,
                    status: 1,
                    date_form: this.Filter.Date.start,
                    date_to: this.Filter.Date.end
                };
                this.Request('GET', '/api/v3/portal/laporan', params, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ArsipDokumen.data = callback.content;
                        this.Data.ArsipDokumen.length = callback.content.length;
                        this.Any.totalDataProduct = callback.meta.totalData;
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
                scrollToElement('#section-2', 600);
            },
            ShowMore() {
                this.Meta.pageSize = this.Meta.pageSize + 4;
                if (this.Meta.pageSize > this.Any.totalDataProduct) {
                    this.Meta.pageSize = this.Any.totalDataProduct;
                    this.Any.isMaxShowMore = true;
                }
            },
            ModalLihatLaporan(data) {
                this.Data.DetailLaporan = data;
                this.$refs['RefLihatLaporan'].toggle('#IdLihatLaporan');
            },
        }
    }

</script>

<style scoped>
    .form-group .mx-datepicker-range {
        width: 265px !important;
    }

</style>
