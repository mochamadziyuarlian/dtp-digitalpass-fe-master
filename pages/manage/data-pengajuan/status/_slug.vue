<template>
    <div>
        <div class="row">
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Nama Produk"
                            @keyup="GetDataPengajuan()" v-model="Filter.search">
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Tanggal Upload</th>
                                            <th>Nama Produk</th>
                                            <th>Jenis Layanan</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListPengajuan.content" :key="index">
                                            <td>
                                                {{ item.created_at | formatDate }}
                                            </td>
                                            <td>
                                                {{ item.product_name || '-' }}
                                            </td>
                                            <td>
                                                {{ item.product_test_type || '-' }}
                                            </td>
                                            <td>
                                                <div class="text-dsa-success font-weight-600"
                                                    v-if="item.status_spv === 'Pengujian Selesai'">
                                                    {{item.status_spv}}
                                                </div>
                                                <div class="text-dsa-danger font-weight-600"
                                                    v-else-if="item.status_spv === 'Pengujian Ditolak / Dibatalkan'">
                                                    {{item.status_spv}}
                                                </div>
                                                <div class="text-dsa-warning font-weight-600" v-else>
                                                    {{item.status_spv}}
                                                </div>
                                            </td>
                                            <td v-if="PermissionsAccess.ApprovalDataPengajuan">
                                                <nuxt-link :to="'/manage/data-pengajuan/detail/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1">
                                                    <img src="/icon/table/detail.svg">
                                                </nuxt-link>
                                            </td>
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
                            <div class="row" id="Pagination">
                                <div id="Showing"
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                                    <span class="pagination-info">
                                        Showing
                                        {{ Data.ListPengajuan.meta.show_from }}
                                        to
                                        {{ Data.ListPengajuan.meta.show_to }}
                                        of
                                        {{ Data.ListPengajuan.meta.totalData }}
                                        entries
                                    </span>
                                </div>
                                <div id="Trigger"
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                                    <b-pagination class="pagination-button" v-model="Pagination.pageIndex"
                                        :total-rows="Data.ListPengajuan.meta.totalData" :per-page="Pagination.pageSize"
                                        first-number last-number>
                                    </b-pagination>
                                </div>
                            </div>
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
        layout: 'cms/default',
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
                Role: null,
                IsLoading: false,
                PermissionsAccess: [],
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
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Data Pengajuan Layanan',
                menu: [{
                    menuTitle: 'Data Pengajuan',
                    menuURL: '/manage/data-pengajuan',
                    menuIsRedirect: true,
                    menuIsTextColor: 'danger',
                },
                {
                    menuTitle: 'List',
                    menuURL: '',
                    menuIsRedirect: false,
                    menuIsTextColor: 'secondary',
                }]
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.Role = this.IsRole();
            this.SetFilterStatus();
            this.GetDataPengajuan();
        },
        methods: {
            GetDataPengajuan() {
                this.Data.ListPengajuan.content = [];
                let params = {
                    // is_draft: 'false',
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search_key: this.Filter.search,
                    status: this.Filter.statusFilter
                };
                this.Request('GET', '/api/v3/requests', params, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListPengajuan.content = callback.content;
                        this.Data.ListPengajuan.meta = callback.meta;
                    };
                });
            },
            SetFilterStatus() {
                const status = this.$route.params.slug;
                switch (status) {
                    case 'menunggu':
                        this.Filter.statusFilter = 'SUBMIT_DATA_PENGAJUAN';
                        break;
                    case 'berlangsung':
                        this.Filter.statusFilter = 'VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN,PROSES_PERBAIKAN';
                        break;
                    case 'selesai':
                        this.Filter.statusFilter = 'SELESAI';
                        break;
                }
            }
        }
    }

</script>
