<template>
    <div>
        <div class="bg-white" id="ProdukDalamPengujian">
            <div class="container" id="SectionTitle">
                <div class="main">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <h1 class="display-4 font-weight-900 text-red-main" id="head">
                                Produk Dalam
                                Pengujian
                            </h1>
                            <h6 class="text-gray-dark-1 line-height-36 w-75 pt-4" id="value">
                                Berikut adalah perkembangan pengujian berbagai produk yang sedang kami uji.
                            </h6>
                            <label class="lihat-selengkapnya pt-5" @click="lihatSelengkapnya" id="value">
                                Lihat selengkapnya
                                <span>
                                    <em class="bi bi-arrow-down"></em>
                                </span>
                            </label>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <img src="https://minio.digitalpass.id/static/assets/portal/under-tester.png" alt="" class="w-100">
                        </div>
                    </div>
                </div>
            </div>
            <hr style="border: 1px dashed #C4C4C4;" id="section-2">
            <div class="container">
                <div class="main pt-5">
                    <div class="row mb-4" id="SearchFilter">
                        <div id="PageSize" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div class="form-check form-check-inline">
                                <label class="form-check-label mr-2" for="pageSize">Tampilkan</label>
                                <select class="form-control form-control-sm" id="pageSize"
                                    v-model="Pagination.pageSize">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label class="form-check-label" for="pageSize">&nbsp;&nbsp;entries</label>
                            </div>
                        </div>
                        <div id="Search" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end pr-0 float-right">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control font-size-16" placeholder="Search"
                                        @keyup="GetDataPengajuan()" v-model="Filter.search">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-red-main" id="search">
                                            <em class="fa fa-search text-white font-size-14"></em>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-bordered text-gray-main" width="100%">
                                    <thead class="font-size-14">
                                        <tr class=" text-black font-weight-700">
                                            <td>Nama Produk</td>
                                            <td>Status</td>
                                            <td>Pembaruan Terakhir</td>
                                        </tr>
                                    </thead>
                                    <tbody class="font-size-16">
                                        <tr v-for="(item, index) of Data.ListPengajuan.content" :key="index">
                                            <td>{{ item.product_name || '-' }}</td>
                                            <td>{{ item.status_user || '-' }}</td>
                                            <td>{{ item.updated_at | formatDate }}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListPengajuan.length === 0" class="text-center">
                                            <td colspan="5">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="Pagination">
                        <div id="Showing" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                            <span class="font-size-18 mt-2">Menampilkan
                                {{ Data.ListPengajuan.meta.show_from }}
                                sampai
                                {{ Data.ListPengajuan.meta.show_to }}
                                dari
                                {{ Data.ListPengajuan.meta.totalData }}
                                entri
                            </span>
                        </div>
                        <div id="Trigger" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-16" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListPengajuan.meta.totalData" :per-page="Pagination.pageSize"
                                prev-text="Sebelumnya" next-text="Selanjutnya">
                            </b-pagination>
                        </div>
                    </div>
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
                    }
                },
                IsLoading: false
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
                this.GetDataPengajuan();
            },
            'Pagination.search'() {
                this.GetDataPengajuan();
            },
            'Pagination.pageIndex'() {
                this.GetDataPengajuan();
            }
        },
        mounted() {
            this.GetDataPengajuan();
        },
        methods: {
            GetDataPengajuan() {
                this.GET(
                    `/api/v3/requests?is_draft=false&page=${this.Pagination.pageIndex}&size=${this.Pagination.pageSize}&search_key=${this.Filter.search}`,
                    'BASIC', (data) => {
                        if (data.code === 200) {
                            this.Data.ListPengajuan.content = data.content;
                            this.Data.ListPengajuan.meta = data.meta;
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
        }
    }

</script>
