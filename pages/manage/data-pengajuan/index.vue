<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl col-lg" v-for="(item, index) of cardPengajuanLayanan" :key="index">
                <div class="card card-service">
                    <div class="card-body">
                        <div class="icon-service" :style="'background-color:' + item.backgroundColor">
                            <img :src="item.image">
                        </div>
                        <p class="label-service">
                            {{ item.title[0] }}
                        </p>
                        <span class="value-service text-dsa-success" v-if="item.id === 'HE'">
                            {{ Data.dashboard.totalHE }}
                        </span>
                        <span class="value-service text-dsa-success" v-if="item.id === 'UT'">
                            {{ Data.dashboard.totalUT }}
                        </span>
                        <span class="value-service text-dsa-success" v-if="item.id === 'ST'">
                            {{ Data.dashboard.totalST }}
                        </span>
                        <span class="value-service text-dsa-success" v-if="item.id === 'SC'">
                            {{ Data.dashboard.totalSC }}
                        </span>
                        <span class="value-service text-dsa-success" v-if="item.id === 'AK'">
                            {{ Data.dashboard.totalAK }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Nama Pengajuan"
                            @keyup="GetDataPengajuan()" v-model="Filter.search">
                    </div>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.productFilter">
                        <option value="">Produk</option>
                        <option v-for="item in userProducts" :key="item.id" :value="item.id">
                            {{ item.label }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.serviceFilter">
                        <option value="">Jenis Layanan</option>
                        <option v-for="service in Data.services" :key="service.id" :value="service.id">
                            {{ service.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.statusFilter">
                        <option value="">Status</option>
                        <option value="SUBMIT_DATA_PENGAJUAN">Submit Data Pengajuan</option>
                        <option value="VERIFIKASI_DATA_PENGAJUAN">Verifikasi Data Pengajuan</option>
                        <option value="JADWAL_PEMAPARAN">Jadwal Pemaparan</option>
                        <option value="PROSES_PENGUJIAN">Proses Pengujian</option>
                        <option value="LAPORAN_PENGUJIAN">Laporan Pengujian</option>
                        <option value="SELESAI">Selesai</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-3">
                <no-ssr>
                    <v-date-picker v-model="Filter.date" mode="date" :masks="VDatePickerConfig.masks"
                        :model-config="VDatePickerConfig.modelConfig" is-range :color="VDatePickerConfig.color"
                        :title-position="VDatePickerConfig.titlePosition">
                        <template v-slot="{ togglePopover }">
                            <div class="form-group form-dsa">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text left">
                                            <img src="/icon/form/calendar.svg">
                                        </div>
                                    </div>
                                    <input type="text" v-model="Filter.dateString" class="form-control filter"
                                        placeholder="Filter Tanggal">
                                    <div class="input-group-prepend" @click="togglePopover()">
                                        <div class="input-group-text right">
                                            <img src="/icon/expand_down_dark.svg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-date-picker>
                </no-ssr>
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
                                            <th>Nama Modul</th>
                                            <th>Jenis Layanan</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style="padding: 20px;">
                                        <tr v-for="(item, index) of Data.ListPengajuan.content" :key="index"  >
                                            <td>
                                                {{ item.created_at | formatDate }}
                                            </td>
                                            <td>
                                                <div v-if="item.is_priority === true || item.is_gtm_bundle === true ">
                                                    {{ item.product_name || '-' }}
                                                    <div class=" d-inline-flex align-items-center">
                                                        <div class="tagging">
                                                            <div v-if="item.is_priority === true"
                                                                class="produk-prioritas">
                                                                Prioritas
                                                            </div>
                                                            <div v-if="item.is_gtm_bundle === true"
                                                                class="go-to-market">
                                                                Go To Market
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    {{ item.product_name || '-' }}
                                                </div>
                                            </td>
                                            <td>
                                                {{ item.service_name || '-' }}
                                            </td>
                                            <td>
                                                {{ item.product_test_type || '-' }}
                                            </td>
                                            <td>
                                                <div class="text-dsa-success font-weight-600"
                                                    v-if="item.status_spv === 'Pengujian Selesai'">
                                                    {{ item.status_spv }}
                                                </div>
                                                <div class="text-dsa-danger font-weight-600"
                                                    v-else-if="isRejected(item.status_spv)">
                                                    {{ item.status_spv }}
                                                </div>
                                                <div class="text-dsa-warning font-weight-600" v-else>
                                                    {{ item.status_spv }}
                                                </div>
                                            </td>
                                            <td v-if="PermissionsAccess.ApprovalDataPengajuan">
                                                <nuxt-link :to="'data-pengajuan/detail/' + item.id"
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    layout: 'cms/default',
    mixins: [mixins],
    components: {
        DatePicker
    },
    data() {
        return {
            Pagination: {
                pageSize: 10,
                pageIndex: 1
            },
            Filter: {
                search: '',
                serviceFilter: '',
                productFilter: '',
                statusFilter: '',
                date: [],
                dateString: null,

            },
            Data: {
                dashboard: {},
                services: {},
                ListPengajuan: {
                    content: [],
                    meta: {}
                }
            },
            cardPengajuanLayanan: [{
                id: 'HE',
                title: ['Heuristic Evaluation'],
                icon: 'fa-list',
                image: '/icon/daftar-pengajuan/he.svg',
                backgroundColor: '#FFE3E3'
            },
            {
                id: 'UT',
                title: ['Usability Testing'],
                icon: 'fa-user',
                image: '/icon/daftar-pengajuan/ut.svg',
                backgroundColor: '#FEDCFE'
            },
            {
                id: 'ST',
                title: ['Software Testing'],
                icon: 'fa-terminal',
                image: '/icon/daftar-pengajuan/st.svg',
                backgroundColor: '#E6EDFE'
            },
            {
                id: 'SC',
                title: ['Security Testing'],
                icon: 'fa-shield-alt',
                image: '/icon/daftar-pengajuan/sc.svg',
                backgroundColor: '#F3FFE3'
            },
            {
                id: 'AK',
                title: ['Alih Kelola'],
                icon: 'fa-chart-pie',
                image: '/icon/daftar-pengajuan/ak.svg',
                backgroundColor: '#E4E4FD'
            },
            ],
            Role: null,
            IsLoading: false,
            PermissionsAccess: [],
            VDatePickerConfig: {
                color: 'red',
                titlePosition: 'left',
                masks: {
                    input: 'DD/MM/YYYY',
                },
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
            },
            userProducts: []
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
    computed: {
        isRejected() {
            return (status) => {
                return status === 'Pengujian Ditolak / Dibatalkan' || status === 'Pengujian Ditolak';
            }
        }
    },
    watch: {
        'Pagination.pageSize'() {
            this.GetDataPengajuan();
        },
        'Pagination.search'() {
            this.Pagination.pageIndex = 1;
            this.Pagination.pageSize = 10;
            this.GetDataPengajuan();
        },
        'Pagination.pageIndex'() {
            this.GetDataPengajuan();
        },
        'Filter.serviceFilter'() {
            this.GetDataPengajuan();
        },
        'Filter.productFilter'() {
            this.GetDataPengajuan();
        },
        'Filter.statusFilter'() {
            this.GetDataPengajuan();
        },
        'Filter.date'() {
            this.GetDataPengajuan();
            this.Filter.dateString = `${this.Filter.date.start} - ${this.Filter.date.end}`;
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

        this.userProducts = this.UserLogin().products;

        this.getPengajuanLayanan();
        this.getValueFilter();
        this.GetDataPengajuan();
    },
    methods: {
        GetDataPengajuan() {
            this.Data.ListPengajuan.content = [];
            let allStatus = "SUBMIT_DATA_PENGAJUAN,VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN,PROSES_PERBAIKAN,PENGAJUAN_DITOLAK,PENGAJUAN_DIREJECT,SELESAI"
            let params = {
                page: this.Pagination.pageIndex,
                size: this.Pagination.pageSize,
                search_key: this.Filter.search,
                service_id: this.Filter.serviceFilter,
                productId: this.Filter.productFilter,
                date_start: this.Filter.date === null ? '' : this.Filter.date.start,
                date_end: this.Filter.date === null ? '' : this.Filter.date.end,
                status: this.Filter.statusFilter ? this.Filter.statusFilter : allStatus
            };
            this.Request('GET', '/api/v3/requests', params, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    this.Data.ListPengajuan.content = callback.content;
                    this.Data.ListPengajuan.meta = callback.meta;
                };
            });
        },
        getPengajuanLayanan() {
            this.Request('GET', '/api/v3/dashboard/request', null, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    this.Data.dashboard = callback.content[0];
                };
            });
        },
        getValueFilter() {
            this.Request('GET', '/api/v3/service', null, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    this.Data.services = callback.content;
                };
            });
        },
        resetFilter() {
            this.Filter.serviceFilter = '';
            this.Filter.statusFilter = '';
            this.Filter.fromDateFilter = '';
            this.Filter.toDateFilter = '';
            this.Filter.search_key = '';
        }
    }
}

</script>

<style scoped>
.card-service {
    border: 0;
    box-shadow: 10px 24px 30px rgba(138, 138, 138, 0.02);
    border-radius: 4px;
}

.card-service .icon-service {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    width: 40px;
    height: 40px;

    margin-bottom: 10px;
}

.card-service .label-service {
    font-weight: 600;
    font-size: 18px;
    color: #3B3D39;

    margin-bottom: 8px;
}

.card-service .value-service {
    font-weight: 600;
    font-size: 32px;
    color: #3B3D39;
}


/* prioritas */
.tagging {
    width: 100%;
    height: 22px;
    position: relative;
    display: flex;
}

.tagging .produk-prioritas {
    background: var(--secondary-secondary-10, #FFEFE9);
    height: 22px;
    color: #FF6121;
    font-size: 10px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    border-radius: 5px;
    padding: 5px;
}

.go-to-market{
    border-radius: 5px; 
    padding: 5px;
    margin-left: 5px;
    background-color: #FFEFD2;
    height: 22px;
    color: #FFB020;
    font-size: 10px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    display: block;
}
</style>
