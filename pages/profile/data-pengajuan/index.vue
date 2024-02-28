<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Data Pengajuan</h1>
            <nuxt-link to="/layanan/tahapan-pengajuan" class="d-none d-sm-inline-block btn btn-red shadow-sm">
                <i class="fa fa-plus fa-sm text-white-50"></i>
                Buat Pengajuan
            </nuxt-link>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card card-table d-none" style="padding: 17rem;">
                    <div class="align-self-center text-center">
                        <img src="https://minio.digitalpass.id/static/assets/icon/no-data.svg" alt="">
                        <br>
                        <label>Belum ada pengajuan</label>
                        <br>
                        <span>Semua pengajuan yang anda buat akan muncul di sini</span>
                    </div>
                </div>
                <div class="card p-3">
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="form-row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                    <select class="form-control" v-model="Filter.serviceFilter">
                                        <option value="">Jenis Layanan</option>
                                        <option v-for="service in Data.services" :key="service.id" :value="service.id">
                                            {{ service.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                    <select class="form-control" v-model="Filter.statusFilter">
                                        <option value="">Semua</option>
                                        <option value="4,5,6,7">Sedang Berlangsung</option>
                                        <option value="0">Draft</option>
                                        <option value="1">Pilih Layanan</option>
                                        <option value="2">Input Data Pengajuan</option>
                                        <option value="3">Submit Data Pengajuan</option>
                                        <option value="4">Verifikasi Data Pengajuan</option>
                                        <option value="5">Jadwal Pemaparan</option>
                                        <option value="6">Proses Pengujian</option>
                                        <option value="7">Laporan Pengujian</option>
                                        <option value="8">Selesai</option>
                                    </select>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <client-only>
                                        <v-date-picker v-model="Filter.Date" mode="date" :masks="masks"
                                            :model-config="modelConfig" is-range>
                                            <template v-slot="{ inputValue, inputEvents, isDragging }">
                                                <div class="form-row d-flex align-items-center">
                                                    <div class="col">
                                                        <div class="input-group">
                                                            <input class="form-control"
                                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                                :value="inputValue.start" v-on="inputEvents.start"
                                                                placeholder="Tanggal Awal" />
                                                        </div>
                                                    </div>
                                                    <span>➔</span>
                                                    <div class="col">
                                                        <div class="input-group">
                                                            <input class="form-control"
                                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                                :value="inputValue.end" v-on="inputEvents.end"
                                                                placeholder="Tanggal Akhir" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </v-date-picker>
                                    </client-only>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 offset-2">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text bg-white pr-0">
                                                <em class="fa fa-search"></em>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control border-left-0"
                                            @keyup="GetDataPengajuan()" v-model="Filter.search"
                                            placeholder="Cari Nama Produk">
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
                                        <tr class="text-black font-weight-700">
                                            <td>Tanggal</td>
                                            <td>Nama Pemohon</td>
                                            <td>Nama Produk</td>
                                            <td>Jenis Layanan</td>
                                            <td>Status</td>
                                            <td>Lihat Detail</td>
                                        </tr>
                                    </thead>
                                    <tbody class="font-size-16">
                                        <tr v-for="(item, index) of Data.ListPengajuan.data" :key="index">
                                            <td>{{ item.created_at | formatDate }}</td>
                                            <td>{{ item.requested_by.name || '-' }}</td>
                                            <td>{{ item.product_name || '-' }}</td>
                                            <td>{{ item.product_test_type || '-' }}</td>
                                            <td>{{ item.status_user || '-' }}</td>
                                            <td>
                                                <nuxt-link :to="`/detail-pengajuan/${item.id}`"
                                                    class="btn btn-outline-red w-100">
                                                    <span class="font-weight-700">Lihat Detail</span>
                                                </nuxt-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListPengajuan.length === 0" class="text-center">
                                            <td colspan="6">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 d-flex justify-content-start">
                            <!-- <span class="font-size-13">Showing 1 to 10 of {{ Meta.totalRows }} entries</span> -->
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Meta.pageIndex" :total-rows="Meta.totalRows"
                                :per-page="Meta.pageSize" prev-text="Sebelumnya" next-text="Selanjutnya">
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
        layout: 'portal/profile',
        mixins: [mixins],
        data() {
            return {
                Meta: {
                    pageSize: 10,
                    pageIndex: 1,
                    totalRows: null,
                },
                Filter: {
                    search: '',
                    serviceFilter: '',
                    statusFilter: '',
                    Date: {
                        start: '',
                        end: '',
                    },
                },
                Data: {
                    services: {},
                    ListPengajuan: {
                        data: null,
                        length: 0
                    }
                },
                IsLoading: false,
                masks: {
                    input: 'DD/MM/YYYY',
                },
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
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
            'Meta.pageSize'() {
                this.GetDataPengajuan();
            },
            'Meta.search'() {
                this.GetDataPengajuan();
            },
            'Meta.pageIndex'() {
                this.GetDataPengajuan();
            },
            'Filter.serviceFilter'() {
                this.GetDataPengajuan();
            },
            'Filter.statusFilter'() {
                this.GetDataPengajuan();
            },
            'Filter.Date.start'() {
                this.GetDataPengajuan();
            },
            'Filter.Date.end'() {
                this.GetDataPengajuan();
            },
        },
        mounted() {
            this.GetDataPengajuan();
            this.getValueFilter();
        },
        methods: {
            GetDataPengajuan() {
                this.Data.ListPengajuan.data = null;
                this.Data.ListPengajuan.length = 0;
                let param = {
                    requested_by: this.UserLogin().id
                };
                this.POST(
                    `/api/v3/request/findByUser?page=${this.Meta.pageIndex}&size=${this.Meta.pageSize}&search_key=${this.Filter.search}&service_id=${this.Filter.serviceFilter}&date_start=${this.Filter.Date === null ? '' : this.Filter.Date.start}&date_end=${this.Filter.Date === null ? '' : this.Filter.Date.end}&status=${this.Filter.statusFilter}`,
                    param,
                    'BASIC', (data) => {
                        if (data.code === 200) {
                            this.Data.ListPengajuan.data = data.content;
                            this.Data.ListPengajuan.length = data.content.length;
                            this.Meta.totalRows = data.meta.totalData;
                        }

                    });
            },
            getValueFilter() {
                this.GET(`/api/v3/service`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.services = data.content;
                    }
                });
            },
        }
    }

</script>

<style scoped>
    .card-table {
        widows: 100% !important;
        background: #FBFBFD;
        border-radius: 4px;
    }

</style>
