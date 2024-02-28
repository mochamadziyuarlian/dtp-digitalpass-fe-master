<template>
    <div class="">
        <div class="row">
            <div class="col-xl-9">
                <div class="card-base" id="ReportAnalytics">
                    <div>
                        <label class="section-label">
                            Report Analytics
                        </label>
                    </div>
                    <div class="card" style="height: 447px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="row mb-3">
                                        <div class="col-xl-3">
                                            <div class="cursor-pointer"
                                                :class="Filter.Pengguna === 'totalUsers' ? 'font-weight-700 text-black' : ''"
                                                @click="TypePengguna('totalUsers')">
                                                <label class="text-dsa-black font-size-32 font-weight-600 mb-0">
                                                    {{ Data.Total.Pengguna }}
                                                    <span class="text-dsa-success font-size-14 mb-2">
                                                        +25%
                                                    </span>
                                                </label>
                                                <label>Pengguna</label>
                                            </div>
                                        </div>

                                        <div class="col-xl-3">
                                            <div class="cursor-pointer"
                                                :class="Filter.Pengguna === 'newUsers' ? 'font-weight-700 text-black' : ''"
                                                @click="TypePengguna('newUsers')">
                                                <label class="text-dsa-black font-size-32 font-weight-600 mb-0">
                                                    {{ Data.Total.PenggunaBaru }}
                                                    <span class="text-dsa-success font-size-14 mb-2">
                                                        +25%
                                                    </span>
                                                </label>
                                                <label>Pengguna Baru</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12">
                                    <ChartReportAnalyticsRedesign :Graph="Data.ListUsers" id="ChartReportAnalytics">
                                    </ChartReportAnalyticsRedesign>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3">
                <div class="card-base" id="Device">
                    <div>
                        <label class="section-label">
                            Device
                        </label>
                    </div>
                    <div class="card" style="height: 447px;">
                        <div class="card-body">
                            <div class="row mb-4">
                                <div class="col-xl-12">
                                    <div class="position-relative">
                                        <ChartDeviceRedesign :Graph="Data.ListDevice.Chart" id="ChartDevice">
                                        </ChartDeviceRedesign>
                                        <div class="text-percentage-chart">
                                            <p class="value-channel">
                                                {{ Data.ListDevice.Total }}
                                            </p>
                                            <p class="label-channel">
                                                Pengguna
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 d-flex justify-content-end">
                                    <i class="fas fa-circle text-dsa-success font-size-9 mr-2" style="margin-top: 6px;"></i>
                                    <label class="text-dsa-black">
                                        Desktop
                                    </label>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <i class="fas fa-circle text-dsa-warning font-size-9 mr-2" style="margin-top: 6px;"></i>
                                    <label class="text-dsa-black">
                                        Mobile
                                    </label>
                                </div>
                            </div>
                            <div class="my-4">
                                <hr>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 d-flex justify-content-end">
                                    <div style="text-align: end;">
                                        <p class="font-size-24 text-dsa-black font-weight-600 mb-1">
                                            {{ Data.ListDevice.Label.Desktop || 0 }}
                                        </p>
                                        <p class="font-size-14 text-dsa-secondary font-weight-400">
                                            Desktop
                                        </p>
                                    </div>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <div style="text-align: start;">
                                        <p class="font-size-24 text-dsa-black font-weight-600 mb-1">
                                            {{ Data.ListDevice.Label.Mobile || 0 }}
                                        </p>
                                        <p class="font-size-14 text-dsa-secondary font-weight-400">
                                            Mobile
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6">
                <div class="card-base" id="Peristiwa">
                    <div>
                        <label class="section-label">
                            Peristiwa
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 496px;">
                        <div class="card-body">
                            <div class="category" v-for="(item, index) of Data.ListEvent" :key="index">
                                <div class="row">
                                    <div class="col-lg-6 d-flex justify-content-start">
                                        <label class="label-category">
                                            {{ item.namaPeristiwa || '-' }}
                                        </label>
                                    </div>
                                    <div class="col-lg-6 d-flex justify-content-end">
                                        <label class="value-category">
                                            {{ item.totalPeristiwa || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-dsa-success" role="progressbar"
                                        :class="'progress-category-index-' + index"
                                        :style="`width: ${item.totalPeristiwa}%`" :aria-valuenow="item.totalPeristiwa"
                                        aria-valuemin="0" aria-valuemax="1000000000000000">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="card-base" id="PenggunaByKota">
                    <div>
                        <label class="section-label">
                            Pengguna Berdasarkan Kota
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 496px;">
                        <div class="card-body">
                            <div class="category" v-for="(item, index) of Data.ListCity" :key="index">
                                <div class="row">
                                    <div class="col-lg-6 d-flex justify-content-start">
                                        <label class="label-category">
                                            {{ item.namaKota || '-' }}
                                        </label>
                                    </div>
                                    <div class="col-lg-6 d-flex justify-content-end">
                                        <label class="value-category">
                                            {{ item.total || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-dsa-success" role="progressbar"
                                        :class="'progress-category-index-' + index" :style="`width: ${item.total}%`"
                                        :aria-valuenow="item.total" aria-valuemin="0" aria-valuemax="1000000000000000">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card-base" id="Log">
                    <div>
                        <label class="section-label">
                            Log
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 496px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>Event Name</th>
                                                    <th>Module</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) of Data.Firebase.Log" :key="index">
                                                    <td>{{ item.EVENT_NAME || '-' }}</td>
                                                    <td>{{ item.MODULE || '-' }}</td>
                                                    <td>{{ item.DATE | formatDate }}</td>
                                                    <td>
                                                        <a href="javascript:void(0);" class="btn btn-dsa-warning px-2"
                                                            @click="ModalEventDetail(item)">
                                                            <img src="/icon/table/detail.svg">
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr v-if="Data.Firebase.Log.length === 0" class="text-center">
                                                    <td colspan="5">
                                                        Data tidak ditemukan
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card-base" id="JumlahVisitor">
                    <div>
                        <label class="section-label">
                            Jumlah Visitor
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 496px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>Page Location</th>
                                                    <th>Page Path</th>
                                                    <th>Total Users</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) of Data.ListVisitor" :key="index">
                                                    <td>{{ item.pageLocation || '-' }}</td>
                                                    <td>{{ item.pagePath || '-' }}</td>
                                                    <td>{{ item.totalUsers || '-' }}</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr v-if="Data.ListVisitor.length === 0" class="text-center">
                                                    <td colspan="5">
                                                        Data tidak ditemukan
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal ref="Modal_EventDetail" hide-footer centered size="lg" :title="Data.Modal.Result.EVENT_NAME">
            <div class="my-3 mx-4">

                <div style="color: #3b4151;">
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>API</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.API || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Date</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.DATE | formatDate }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Event Name</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.EVENT_NAME || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Location</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.LOCATION || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Method</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.METHOD || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Module</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.MODULE || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Path URL</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <span>{{ Data.Modal.Result.PATH || '-' }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>JSON Input</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <json-viewer class="json-viewer"
                                :value="Data.Modal.Result.JSON === null ? [] : Data.Modal.Result.JSON" :expanded="true">
                            </json-viewer>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <span>Response API</span>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                            <span>:</span>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <json-viewer class="json-viewer"
                                :value="Data.Modal.Result.RESPONSE_API === null ? [] : Data.Modal.Result.RESPONSE_API"
                                :expanded="true"></json-viewer>
                        </div>
                    </div>
                </div>

                <div class="d-none">
                    <div class="row mb-3">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul class="list-group">
                                <li class="list-group-item p-2 bg-method-api"
                                    :class="{'get': Data.Modal.Result.METHOD === 'GET',
                            'post': Data.Modal.Result.METHOD === 'POST', 'put': Data.Modal.Result.METHOD === 'PUT', 'delete': Data.Modal.Result.METHOD === 'DELETE'}">
                                    <span class="badge badge-secondary p-2 method">
                                        {{ Data.Modal.Result.METHOD }}
                                    </span> &nbsp;
                                    <span class="font-weight-bold api">
                                        {{ Data.Modal.Result.API }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>JSON</label>
                            <json-viewer :value="Data.Modal.Result.JSON === null ? [] : Data.Modal.Result.JSON"
                                :expanded="true" copyable boxed></json-viewer>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Response API</label>
                            <json-viewer
                                :value="Data.Modal.Result.RESPONSE_API === null ? [] : Data.Modal.Result.RESPONSE_API"
                                :expanded="true" copyable boxed>
                            </json-viewer>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    import ChartReportAnalyticsRedesign from '@/components/Chart/ReportAnalytics/ChartReportAnalyticsRedesign';
    import ChartDeviceRedesign from '@/components/Chart/ReportAnalytics/ChartDeviceRedesign';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        components: {
            'ChartReportAnalyticsRedesign': ChartReportAnalyticsRedesign,
            'ChartDeviceRedesign': ChartDeviceRedesign,
        },
        data() {
            return {
                module: 'Report Analytics',
                chartAllReport: null,
                chartPengguna: null,
                Data: {
                    ListEvent: [],
                    ListCity: [],
                    ListVisitor: [],
                    ListDevice: {
                        Label: {
                            Desktop: null,
                            Mobile: null
                        },
                        Total: 0,
                        Chart: []
                    },
                    ListUsers: null,
                    Total: {
                        Pengguna: 0,
                        PenggunaBaru: 0
                    },
                    Firebase: {
                        data: [],
                        Event: [],
                        Log: []
                    },
                    Modal: {
                        Result: {}
                    }
                },
                Filter: {
                    Pengguna: 'totalUsers',
                    StartDate: '2020-01-01',
                    EndDate: '2021-12-30'
                },
                Dummy: {
                    ReportAnalytics: {
                        chart: null
                    }
                }
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('dddd, DD MMMM YYYY HH:mm:ss')
                } else {
                    return '-';
                }
            }
        },
        watch: {
            'Filter.Pengguna'() {
                this.GetUsers();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Report Analytics',
                menu: []
            }]);
            this.GetEvent();
            this.GetCity();
            this.GetVisitor();
            this.GetDevice();
            this.GetUsers();
            this.GetFirebaseEvent();
            this.GetFirebaseLog();
        },
        methods: {
            GetEvent() {
                this.Data.ListEvent = [];
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                    eventName: ''
                };
                this.Request('POST', '/api/v3/google-analytic/get-event', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListEvent = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetCity() {
                this.Data.ListCity = [];
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                    city: ''
                };
                this.Request('POST', '/api/v3/google-analytic/get-city', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListCity = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetVisitor() {
                this.Data.ListVisitor = [];
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                };
                this.Request('POST', '/api/v3/google-analytic/get-visitor-page', null, body, 'BEARER', (
                    callback) => {
                    if (callback.code === 200) {
                        this.Data.ListVisitor = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetDevice() {
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                };
                this.Request('POST', '/api/v3/google-analytic/get-device', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        let Desktop = callback.content.datasets.find(x => {
                            return x.label === 'desktop';
                        });
                        let Mobile = callback.content.datasets.find(x => {
                            return x.label === 'mobile';
                        });

                        this.Data.ListDevice.Label.Desktop = Desktop.data;
                        this.Data.ListDevice.Label.Mobile = Mobile.data;

                        this.Data.ListDevice.Total = this.SUM({
                            Desktop: Desktop.data,
                            Mobile: Mobile.data
                        });;

                        const c1 = document.getElementById('doughnut-chart').getContext('2d');
                        const gradientDesktop = c1.createLinearGradient(300, 0, 0, 0);
                        gradientDesktop.addColorStop(0, '#7bba58');
                        gradientDesktop.addColorStop(1, '#7bba58');

                        const c2 = document.getElementById('doughnut-chart').getContext('2d');
                        const gradientMobile = c2.createLinearGradient(300, 0, 0, 0);
                        gradientMobile.addColorStop(0, '#fcce8a');
                        gradientMobile.addColorStop(1, '#fcce8a');


                        this.Data.ListDevice.Chart = {
                            labels: [
                                Desktop.label,
                                Mobile.label
                            ],
                            datasets: [{
                                backgroundColor: [
                                    gradientDesktop,
                                    gradientMobile
                                ],
                                data: [
                                    Desktop.data,
                                    Mobile.data
                                ],
                                label: [
                                    Desktop.label,
                                    Mobile.label
                                ],
                            }]
                        };
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetUsers() {
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                    type: this.Filter.Pengguna
                };
                this.Request('POST', '/api/v3/google-analytic/get-users', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.GetTotalUsers();
                        this.GetTotalNewUsers();

                        let Januari = this.FindMonth('January', callback.content.datasets);
                        let Februari = this.FindMonth('February', callback.content.datasets);
                        let Maret = this.FindMonth('March', callback.content.datasets);
                        let April = this.FindMonth('April', callback.content.datasets);
                        let Mei = this.FindMonth('May', callback.content.datasets);
                        let Juni = this.FindMonth('June', callback.content.datasets);
                        let Juli = this.FindMonth('July', callback.content.datasets);
                        let Agustus = this.FindMonth('August', callback.content.datasets);
                        let September = this.FindMonth('September', callback.content.datasets);
                        let Oktober = this.FindMonth('October', callback.content.datasets);
                        let November = this.FindMonth('November', callback.content.datasets);
                        let Desember = this.FindMonth('December', callback.content.datasets);

                        const c = document.getElementById('bar-chart').getContext('2d');
                        const gradient = c.createLinearGradient(300, 0, 0, 0);
                        gradient.addColorStop(0, '#76B852');
                        gradient.addColorStop(1, '#8DC26F');

                        // Total User
                        this.Data.ListUsers = {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt',
                                'Nov', 'Des'
                            ],
                            datasets: [{
                                backgroundColor: '#1a73e8',
                                data: [
                                    Januari !== undefined ? Januari.data[0] : 0,
                                    Februari !== undefined ? Februari.data[0] : 0,
                                    Maret !== undefined ? Maret.data[0] : 0,
                                    April !== undefined ? April.data[0] : 0,
                                    Mei !== undefined ? Mei.data[0] : 0,
                                    Juni !== undefined ? Juni.data[0] : 0,
                                    Juli !== undefined ? Juli.data[0] : 0,
                                    Agustus !== undefined ? Agustus.data[0] : 0,
                                    September !== undefined ? September.data[0] : 0,
                                    Oktober !== undefined ? Oktober.data[0] : 0,
                                    November !== undefined ? November.data[0] : 0,
                                    Desember !== undefined ? Desember.data[0] : 0
                                ],
                                fill: false,
                                borderColor: gradient,
                                backgroundColor: gradient,
                                tension: 0.1
                            }]
                        };
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetTotalUsers() {
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                    type: 'totalUsers'
                };
                this.Request('POST', '/api/v3/google-analytic/get-users', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.Total.Pengguna = callback.content.total[0];
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetTotalNewUsers() {
                let body = {
                    startDate: this.Filter.StartDate,
                    endDate: this.Filter.EndDate,
                    type: 'newUsers'
                };
                this.Request('POST', '/api/v3/google-analytic/get-users', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.Total.PenggunaBaru = callback.content.total[0];
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            FindMonth(month, data) {
                let find = data.find(x => {
                    return x.label === month;
                });
                return find;
            },
            TypePengguna(type) {
                this.Filter.Pengguna = type;
            },
            GetFirebaseEvent() {
                this.Data.Firebase.Event = [];
                this.HelperGetCollectionFirebase('EVENT', (callback) => {
                    this.Data.Firebase.Event.push(callback);
                });
            },
            GetFirebaseLog() {
                this.Data.Firebase.Log = [];
                this.HelperGetCollectionFirebase('LOG', (callback) => {
                    callback.DATE = this.HelperDateTimeFirebase(callback.DATE)
                    this.Data.Firebase.Log.push(callback);
                });
            },
            ModalEventDetail(data) {
                this.Data.Modal.Result = data;
                this.$refs['Modal_EventDetail'].show();
            },
        }
    }

</script>

<style scoped>
    .card-body /deep/ canvas#doughnut-chart {
        width: auto !important;
        height: 200px !important;
    }

    .card-body /deep/ canvas#bar-chart {
        width: auto !important;
        height: 300px !important;
    }

    #MoreCard.card {
        height: 30rem;
        max-height: 30rem;
        overflow-y: auto;
    }

    .bg-method-api span.api {
        color: #3b4151 !important;
    }

    .bg-method-api.post {
        border-color: #49cc90;
        background: rgba(73, 204, 144, .1);
    }

    .bg-method-api.post span.method {
        background: #49cc90;
    }

    .bg-method-api.put {
        border-color: #fca130;
        background: rgba(252, 161, 48, .1);
    }

    .bg-method-api.put span.method {
        background: #fca130;
    }

    .bg-method-api.delete {
        border-color: #f93e3e;
        background: rgba(249, 62, 62, .1);
    }

    .bg-method-api.delete span.method {
        background: #f93e3e;
    }

    .bg-method-api.get {
        border-color: #61affe;
        background: rgba(97, 175, 254, .1);
    }

    .bg-method-api.get span.method {
        background: #61affe;
    }

    .json-viewer /deep/ .jv-code {
        padding: 0 !important;
    }













    /* Chart NEW */
    #ChartReportAnalytics /deep/ canvas#bar-chart {
        height: 300px !important;
    }




    /* Device */
    /* for centering text in chart device */
    #Device .text-percentage-chart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    #Device .label-channel {
        font-weight: 400;
        font-size: 14px;
        color: #7F817D;

        margin-bottom: 0 !important;
    }

    #Device .value-channel {
        font-weight: 600;
        font-size: 24px;
        color: #3B3D39;

        margin-bottom: 3px !important;
    }

    .channel-dot {
        font-size: 9px !important;
        margin-right: 0.3rem !important;
    }


    .progress {
        height: 6px !important;
        border-radius: 100px;
    }

    /* Category */
    .category .progress {
        margin-top: 16px !important;
    }

    .category {
        margin-bottom: 18px !important;
    }

    .category .label-category {
        font-weight: 600;
        font-size: 14px;
        color: #3B3D39;

        margin-bottom: 0 !important;
    }

    .category .value-category {
        font-weight: normal;
        font-size: 14px;
        color: #7F8C93;

        margin-bottom: 0 !important;
    }

    .bg-dsa-success {
        background-color: #7ebc5c !important;
    }

</style>
