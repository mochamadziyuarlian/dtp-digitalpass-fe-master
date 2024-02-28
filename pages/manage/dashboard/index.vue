<template>
    <div id="PageDashboard">
        <div class="row mb-4" v-if="Role === 'Supervisor'">
            <div class="col-xl col-lg" v-for="(item, index) of Data.CardPengajuan" :key="index">
                <nuxt-link :to="item.link">
                    <div class="card card-service cursor-pointer">
                        <div class="card-body">
                            <div class="icon-service" :style="'background-color:' + item.backgroundColor">
                                <img :src="item.image">
                            </div>
                            <p class="label-service">
                                {{ item.title || '-' }}
                            </p>
                            <span class="value-service text-dsa-success" v-if="item.id === 1">
                                {{ Data.CardDashboard.waitForConfirmation || 0 }}
                            </span>
                            <span class="value-service text-dsa-success" v-if="item.id === 2">
                                {{ Data.CardDashboard.onProgress || 0 }}
                            </span>
                            <span class="value-service text-dsa-success" v-if="item.id === 3">
                                {{ Data.CardDashboard.totalAttachment || 0 }}
                            </span>
                            <span class="value-service text-dsa-success" v-if="item.id === 4">
                                {{ Data.CardDashboard.dataSelesai || 0 }}
                            </span>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Informasi Pengajuan
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 470px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12" v-for="(item, index) of Data.InformasiPengajuan" :key="index">
                                    <div class="border-dsa-top" :class="index === 0 ? 'pb-3' : 'py-3'">
                                        <label class="font-size-12 text-dsa-success font-weight-normal">
                                            {{ item.request.product_test_type }}
                                        </label>
                                        <p class="font-size-14 text-dsa-black font-weight-600 mb-1">
                                            <span v-html="`${item.log}`"></span>
                                        </p>
                                        <span class="font-size-12 text-dsa-secondary font-weight-normal">
                                            <img src="/icon/time.svg">
                                            <span style="margin-left: 10px;">
                                                {{ item.created_at | formatDate }}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="col-xl-8">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Jadwal
                        </label>
                    </div>
                    <div class="card" style="height: 470px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-6">
                                    <client-only>
                                        <v-calendar class="border-0 calendar" locale="id" :attributes="Data.Jadwal.Date"
                                            title-position="left" @dayclick="DayJadwalClick" trim-weeks is-expanded />
                                    </client-only>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card border-0">
                                        <div class="card-header pb-0 bg-white border-0">
                                            <label class="text-dsa-black font-size-18 font-weight-600">
                                                {{ Selected.Events.EventDate | formatDate }}
                                            </label>
                                        </div>
                                        <div class="card-body" style="height: 375px; overflow: auto;">
                                            <div v-if="Selected.Events.EventList.length !== 0">
                                                <div class="alert alert-success badge-success-detail font-size-14 cursor-pointer"
                                                    style="border-radius: 4px; border: 0px solid transparent;" role="alert"
                                                    v-for="(item, index) in Selected.Events.EventList" :key="index"
                                                    @click="DetailPengajuan(item.request_id)">
                                                    {{ item.title }}
                                                </div>
                                            </div>
                                            <div class="text-center align-items-center" style="margin-top: 5rem;"
                                                v-if="Selected.Events.EventList.length === 0">
                                                <div class="text-center mt-5">
                                                    <img src="/icon/not-found/not-found-v3.svg">
                                                    <p class="font-size-12 text-dsa-secondary font-weight-normal mt-4">
                                                        Tidak ada jadwal pemaparan
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Statistik Aktivitas
                        </label>
                    </div>
                    <div class="card" style="height: 468px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <ChartStatistikAktifitasRedesign :Graph="Data.StatistikAktivitas.chart"
                                        id="StatistikAktifitasRedesign">
                                    </ChartStatistikAktifitasRedesign>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="col-xl-6">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Statistik SLA
                        </label>
                    </div>
                    <div class="card" style="height: 468px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <ChartStatistikSLARedesign :Graph="Data.StatistikSLA.chart" id="StatistikSLARedesign">
                                    </ChartStatistikSLARedesign>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Total Pengajuan Layanan Berlangsung
                        </label>
                    </div>
                    <div class="card" style="height: 468px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <ChartTotalPengajuanLayananBerlangsungRedesign
                                        :Graph="Data.TotalPengajuanLayananBerlangsung.chart"
                                        id="TotalPengajuanLayananBerlangsungRedesign">
                                    </ChartTotalPengajuanLayananBerlangsungRedesign>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Total Pengajuan Layanan Selesai
                        </label>
                    </div>
                    <div class="card" style="height: 468px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <ChartTotalPengajuanLayananSelesaiRedesign
                                        :Graph="Data.TotalPengajuanLayananSelesai.chart"
                                        id="TotalPengajuanLayananSelesaiRedesign">
                                    </ChartTotalPengajuanLayananSelesaiRedesign>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Total Pengajuan Layanan Tribe
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 575px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-2">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Tribe
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananTribe.Tribe">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Tribe" :key="index" :value="item">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Produk
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananTribe.Product">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Product" :key="index" :value="item.name">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Service
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananTribe.Service">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Service" :key="index" :value="item.name">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr class="border-dsa my-4">
                            </div>
                            <div class="row" v-if="Data.LayananByTribe.length > 0">
                                <div class="col-xl-3" v-for="(item, index) of Data.LayananByTribe" :key="index">
                                    <div class="card border-dsa mb-4" style="width: auto; height: auto;">
                                        <div class="card-body" style="padding: 19px 16px !important;">
                                            <div class="row">
                                                <div class="col d-flex justify-content-start">
                                                    <p class="font-size-16 text-dsa-black font-weight-600 mb-2">
                                                        {{ item.product_test_type || '-' }}
                                                    </p>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="float-right">
                                                        <span class="px-2 py-1 text-dsa-danger font-size-12 font-weight-600"
                                                            style="background: #FFF6F6;border-radius: 100px;">
                                                            {{ item.tribe }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="font-size-32 text-dsa-success font-weight-600">
                                                {{ item.total || 0 }}
                                            </label>
                                            <div class="row">
                                                <div class="col-xl-12">
                                                    <p class="font-size-14 text-dsa-secondary font-weight-normal mb-2">
                                                        Produk
                                                    </p>
                                                    <label class="font-size-14 text-dsa-black font-weight-600">
                                                        {{ item.product_name || '-' }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row h-100" v-else>
                                <div class="col-xl-12 d-flex justify-content-center align-items-center">
                                    <div class="text-center p-4">
                                        <img src="/icon/not-found/not-found-v1.svg">
                                        <p class="font-size-18 text-dsa-secondary font-weight-normal mt-4">
                                            Tidak Ada Data Ditemukan
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
            <div class="col-xl-12">
                <div class="card-base">
                    <div>
                        <label class="section-label">
                            Total Pengajuan Layanan SLA
                        </label>
                    </div>
                    <div class="card overflow-auto" style="height: 575px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-2">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Tribe
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananSLA.Tribe">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Tribe" :key="index" :value="item">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Produk
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananSLA.Product">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Product" :key="index" :value="item.name">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group form-dsa mb-0">
                                        <label class="font-size-16">
                                            Service
                                        </label>
                                        <select class="form-control filter border-dsa"
                                            v-model="Filter.TotalPengajuanLayananSLA.Service">
                                            <option value="null">Semua</option>
                                            <option v-for="(item, index) of Data.Service" :key="index" :value="item.name">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr class="border-dsa my-4">
                            </div>
                            <div class="row" v-if="Data.LayananBySLA.length > 0">
                                <div class="col-xl-3" v-for="(item, index) of Data.LayananBySLA" :key="index">
                                    <div class="card border-dsa mb-4" style="width: auto; height: auto;">
                                        <div class="card-body" style="padding: 19px 16px !important;">
                                            <div class="row">
                                                <div class="col d-flex justify-content-start">
                                                    <p class="font-size-16 text-dsa-black font-weight-600 mb-2">
                                                        {{ item.product_test_type || '-' }}
                                                    </p>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="float-right">
                                                        <span class="px-2 py-1 text-dsa-danger font-size-12 font-weight-600"
                                                            style="background: #FFF6F6;border-radius: 100px;">
                                                            {{ item.tribe }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="font-size-32 text-dsa-success font-weight-600">
                                                {{ item.total || 0 }}
                                            </label>
                                            <div class="row">
                                                <div class="col-xl-12">
                                                    <p class="font-size-14 text-dsa-secondary font-weight-normal mb-2">
                                                        Produk
                                                    </p>
                                                    <label class="font-size-14 text-dsa-black font-weight-600">
                                                        {{ item.product_name || '-' }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row h-100" v-else>
                                <div class="col-xl-12 d-flex justify-content-center align-items-center">
                                    <div class="text-center p-4">
                                        <img src="/icon/not-found/not-found-v1.svg">
                                        <p class="font-size-18 text-dsa-secondary font-weight-normal mt-4">
                                            Tidak Ada Data Ditemukan
                                        </p>
                                    </div>
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

import ChartStatistikAktifitasRedesign from '@/components/Chart/Dashboard/ChartStatistikAktifitasRedesign';
import ChartStatistikSLARedesign from '@/components/Chart/Dashboard/ChartStatistikSLARedesign';
import ChartTotalPengajuanLayananBerlangsungRedesign from '@/components/Chart/Dashboard/ChartTotalPengajuanLayananBerlangsungRedesign';
import ChartTotalPengajuanLayananSelesaiRedesign from '@/components/Chart/Dashboard/ChartTotalPengajuanLayananSelesaiRedesign';


export default {
    layout: 'cms/default',
    mixins: [mixins],
    components: {
        'ChartStatistikAktifitasRedesign': ChartStatistikAktifitasRedesign,
        'ChartStatistikSLARedesign': ChartStatistikSLARedesign,
        'ChartTotalPengajuanLayananBerlangsungRedesign': ChartTotalPengajuanLayananBerlangsungRedesign,
        'ChartTotalPengajuanLayananSelesaiRedesign': ChartTotalPengajuanLayananSelesaiRedesign,
    },
    data() {
        return {
            Role: null,
            User: {},
            Data: {
                CardPengajuan: [{
                    id: 1,
                    title: 'Menunggu Persetujuan',
                    icon: 'fa-list',
                    image: '/icon/daftar-pengajuan/he.svg',
                    link: '/manage/data-pengajuan/status/menunggu',
                    backgroundColor: '#FFE3E3'
                },
                {
                    id: 2,
                    title: 'Pengajuan Berlangsung',
                    icon: 'fa-user',
                    image: '/icon/daftar-pengajuan/ut.svg',
                    link: '/manage/data-pengajuan/status/berlangsung',
                    backgroundColor: '#FEDCFE'
                },
                {
                    id: 3,
                    title: 'Data Lampiran',
                    icon: 'fa-terminal',
                    image: '/icon/daftar-pengajuan/st.svg',
                    link: '/manage/arsip-lampiran',
                    backgroundColor: '#E6EDFE'
                },
                {
                    id: 4,
                    title: 'Pengajuan Selesai',
                    icon: 'fa-shield-alt',
                    image: '/icon/daftar-pengajuan/sc.svg',
                    link: '/manage/data-pengajuan/status/selesai',
                    backgroundColor: '#F3FFE3'
                },
                ],
                CardDashboard: {
                    waitForConfirmation: null,
                    onProgress: null,
                    totalAttachment: null,
                    dataSelesai: null
                },
                InformasiPengajuan: [],
                Jadwal: {
                    Date: [],
                    Events: [],
                },
                StatistikAktivitas: {
                    chart: null
                },
                StatistikSLA: {
                    chart: null
                },
                TotalPengajuanLayananBerlangsung: {
                    chart: null
                },
                TotalPengajuanLayananSelesai: {
                    chart: null
                },
                LayananByTribe: [],
                LayananBySLA: [],
                Tribe: [],
                Product: [],
                Service: [],
            },
            Selected: {
                Events: {
                    EventDate: null,
                    EventList: [],
                }
            },
            Filter: {
                TotalPengajuanLayananTribe: {
                    Tribe: {
                        id: '',
                        name: ''
                    },
                    Product: '',
                    Service: '',
                },
                TotalPengajuanLayananSLA: {
                    Tribe: {
                        id: '',
                        name: ''
                    },
                    Product: '',
                    Service: '',
                }
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
        // Total Pengajuan Layanan Berlangsung
        'Filter.TotalPengajuanLayananTribe.Tribe'() {
            this.GetPengajuanLayananByTribe();
            this.GetProductTotalPengajuanLayananTribe();
            this.Data.Product = [];
            this.Filter.TotalPengajuanLayananTribe.Product = 'null';
            this.Filter.TotalPengajuanLayananTribe.Service = 'null';
        },
        'Filter.TotalPengajuanLayananTribe.Product'() {
            this.GetPengajuanLayananByTribe();
            this.Filter.TotalPengajuanLayananTribe.Service = 'null';
        },
        'Filter.TotalPengajuanLayananTribe.Service'() {
            this.GetPengajuanLayananByTribe();
        },
        // Total Pengajuan Layanan Berlangsung


        // Total Pengajuan Layanan SLA
        'Filter.TotalPengajuanLayananSLA.Tribe'() {
            this.GetPengajuanLayananBySLA();
            this.GetProductTotalPengajuanLayananSLA();
            this.Data.Product = [];
            this.Filter.TotalPengajuanLayananSLA.Product = 'null';
            this.Filter.TotalPengajuanLayananSLA.Service = 'null';
        },
        'Filter.TotalPengajuanLayananSLA.Product'() {
            this.GetPengajuanLayananBySLA();
            this.Filter.TotalPengajuanLayananSLA.Service = 'null';
        },
        'Filter.TotalPengajuanLayananSLA.Service'() {
            this.GetPengajuanLayananBySLA();
        },
        // Total Pengajuan Layanan SLA

    },
    mounted() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Dashboard',
            menu: []
        }]);

        this.User = this.UserLogin();
        this.Role = this.IsRole();

        this.GetDashboard();
        this.GetStatistikSLA();
        this.GetTotalPengajuanLayananBerlangsung();
        this.GetTotalPengajuanLayananSelesai();
        this.GetPengajuanLayananByTribe();
        this.GetPengajuanLayananBySLA();
        this.GetTribe();
    },
    methods: {
        GetDashboard() {
            this.Request('GET', '/api/v3/dashboard', null, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    this.GetCardDashboard(callback.content[0]);
                    this.GetInformasiPengajuan();
                    this.GetJadwal(callback.content[0].calendar);
                    this.GetDefaultValueJadwal();
                    this.GetStatistikAktivitas(callback.content[0].dataActivityGraph[0], callback.content[0].dataRequest[0]);
                };
            });
        },
        GetCardDashboard(data) {
            this.Data.CardDashboard.waitForConfirmation = data.waitForConfirmation;
            this.Data.CardDashboard.onProgress = data.onProgress;
            this.Data.CardDashboard.totalAttachment = data.totalAttachment;
            this.Data.CardDashboard.dataSelesai = data.dataSelesai;
        },
        GetInformasiPengajuan() {
            let param = {
                is_draft: false
            };
            this.Request('GET', '/api/v3/request-history', param, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    this.Data.InformasiPengajuan = callback.content;
                };
            });
        },
        GetJadwal(calendar) {
            calendar.map(x => {
                x.dates = moment(String(`${x.year}-${x.month}-${x.date}`)).format('YYYY-MM-DD');
            });
            for (let x of calendar) {
                let objEvent = {
                    request_id: x.request_id,
                    id: x.id,
                    title: x.activity,
                    dates: x.dates
                };
                this.Data.Jadwal.Events.push(objEvent);
            };

            let removeDuplicateDate = calendar.reduce((unique, o) => {
                if (!unique.some(obj => obj.dates === o.dates)) {
                    unique.push(o);
                }
                return unique;
            }, []);
            for (let x of removeDuplicateDate) {
                let objAttributes = {
                    key: x.id,
                    dot: true,
                    dates: x.dates
                };
                this.Data.Jadwal.Date.push(objAttributes);
            };
        },
        DayJadwalClick(date) {
            this.Selected.Events.EventDate = date.ariaLabel;
            let getEvents = this.Data.Jadwal.Events.filter(x => x.dates === date.id);
            this.Selected.Events.EventList = getEvents;
        },
        DetailPengajuan(request_id) {
            this.$router.push(`data-pengajuan/detail/${request_id}`);
        },
        GetDefaultValueJadwal() {
            let date = new Date();
            let convertDate = moment(String(date)).format('YYYY-MM-DD');
            this.Selected.Events.EventDate = convertDate;
            let getEvents = this.Data.Jadwal.Events.filter(x => x.dates === convertDate);
            this.Selected.Events.EventList = getEvents;
        },
        GetStatistikAktivitas(statistikAktivitasSPV, statistikAktivitasAdmin) {
            if (this.Role !== 'Supervisor') {
                let DataAK = [];
                let DataUT = [];
                let DataHE = [];
                let DataST = [];
                let DataSC = [];

                this.Data.statistikAktivitasSPV.chart = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt',
                        'Nov', 'Des'
                    ],
                    datasets: [{
                        pointBackgroundColor: '#BBBAFE',
                        pointBorderColor: '#BBBAFE',
                        pointBorderWidth: '0',
                        pointHoverBorderWidth: '0',
                        borderWidth: '3',
                        backgroundColor: '#ffffff00',
                        borderColor: '#BBBAFE',
                        data: DataAK,
                        label: statistikAktivitasSPV.nameAK
                    },
                    {
                        pointBackgroundColor: '#EA90E9',
                        pointBorderColor: '#EA90E9',
                        pointBorderWidth: '0',
                        pointHoverBorderWidth: '0',
                        borderWidth: '3',
                        backgroundColor: '#ffffff00',
                        borderColor: '#EA90E9',
                        data: DataUT,
                        label: statistikAktivitasSPV.namaUT
                    },
                    {
                        pointBackgroundColor: '#FE6965',
                        pointBorderColor: '#FE6965',
                        pointBorderWidth: '0',
                        pointHoverBorderWidth: '0',
                        borderWidth: '3',
                        backgroundColor: '#ffffff00',
                        borderColor: '#FE6965',
                        data: DataHE,
                        label: statistikAktivitasSPV.nameHE
                    },
                    {
                        pointBackgroundColor: '#9DD7FB',
                        pointBorderColor: '#9DD7FB',
                        pointBorderWidth: '0',
                        pointHoverBorderWidth: '0',
                        borderWidth: '3',
                        backgroundColor: '#ffffff00',
                        borderColor: '#9DD7FB',
                        data: DataST,
                        label: statistikAktivitasSPV.nameST
                    },
                    {
                        pointBackgroundColor: '#FCCE8A',
                        pointBorderColor: '#FCCE8A',
                        pointBorderWidth: '0',
                        pointHoverBorderWidth: '0',
                        borderWidth: '3',
                        backgroundColor: '#ffffff00',
                        borderColor: '#FCCE8A',
                        data: DataSC,
                        label: statistikAktivitasSPV.nameSC
                    }
                    ]
                }

                for (let x of statistikAktivitasSPV.dataAK) {
                    DataAK.push(Number(x.value));
                };
                for (let x of statistikAktivitasSPV.dataUT) {
                    DataUT.push(Number(x.value));
                };
                for (let x of statistikAktivitasSPV.dataHE) {
                    DataHE.push(Number(x.value));
                };
                for (let x of statistikAktivitasSPV.dataST) {
                    DataST.push(Number(x.value));
                };
                for (let x of statistikAktivitasSPV.dataSC) {
                    DataSC.push(Number(x.value));
                };
            } else {
                let DataRQ = [];

                this.Data.StatistikAktivitas.chart = {
                    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
                        'September',
                        'Oktober',
                        'Desember'
                    ],
                    datasets: [{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#F89B2B',
                        data: DataRQ,
                        label: statistikAktivitasAdmin.nama
                    }]
                };
                for (let x of statistikAktivitasAdmin.data) {
                    DataRQ.push(Number(x.value));
                }

            }
        },
        GetStatistikSLA() {
            this.Request('GET', '/api/v3/sla-statistic2', null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    let HE = this.HelperFindSLAStatistic(callback.content, 'he');
                    let UT = this.HelperFindSLAStatistic(callback.content, 'ut');
                    let AK = this.HelperFindSLAStatistic(callback.content, 'ak');
                    let SERVICE = this.HelperFindSLAStatistic(callback.content, 'service');
                    let SOFTWARE = this.HelperFindSLAStatistic(callback.content, 'software');

                    this.Data.StatistikSLA.chart = {
                        labels: ['Due Phase 1', 'Not Due Phase 1', 'Due Phase 2', 'Not Due Phase 2',
                            'Due Phase 3', 'Not Due Phase 3', 'Due Phase 4', 'Not Due Phase 4'
                        ],
                        datasets: [{
                            backgroundColor: '#F89B2B',
                            data: AK,
                            label: 'Alih Kelola',
                        },
                        {
                            backgroundColor: '#2F80ED',
                            data: UT,
                            label: 'Usability Testing',
                        },
                        {
                            backgroundColor: '#56CCF2',
                            data: HE,
                            label: 'Heuristic Evaluation',
                        },
                        {
                            backgroundColor: '#BB6BD9',
                            data: SOFTWARE,
                            label: 'Software Testing',
                        },
                        {
                            backgroundColor: '#ed2a23',
                            data: SERVICE,
                            label: 'Security Testing',
                        }
                        ]
                    };
                };
            });
        },
        HelperFindSLAStatistic(data, service) {
            let type = data.find(x => {
                return x.type === service;
            });

            let phase_1 = type.phase.find(x => {
                return x[0].phase === 1;
            });

            let phase_2 = type.phase.find(x => {
                return x[0].phase === 2;
            });

            let phase_3 = type.phase.find(x => {
                return x[0].phase === 3;
            });

            let phase_4 = type.phase.find(x => {
                return x[0].phase === 4;
            });

            return [phase_1[0].due, phase_1[0].notDue, phase_2[0].due, phase_2[0].notDue, phase_3[0].due, phase_3[0]
                .notDue, phase_4[0].due, phase_4[0].notDue
            ]
        },
        GetTotalPengajuanLayananBerlangsung() {
            let body = {
                start_date: '2020-01-01',
                end_date: '2021-12-31'
            };
            this.Request('POST', '/api/v3/dashboard/pengajuan-by-layanan', null, body, 'BEARER', (
                callback) => {
                if (callback.code === 200) {
                    const product_test_type = callback.content.map(x => x.product_test_type);
                    const total = callback.content.map(x => x.total);
                    this.Data.TotalPengajuanLayananBerlangsung.chart = {
                        labels: product_test_type,
                        datasets: [{
                            backgroundColor: '#FCCE8A',
                            backgroundColor: '#FCCE8A',
                            data: total,
                            label: 'Total',
                        }]
                    };
                };
            });
        },
        GetTotalPengajuanLayananSelesai() {
            let body = {
                start_date: '2020-01-01',
                end_date: '2021-12-31'
            };
            this.Request('POST', '/api/v3/dashboard/pengajuan-by-layanan-done', null, body, 'BEARER', (
                callback) => {
                if (callback.code === 200) {
                    const product_test_type = callback.content.map(x => x.product_test_type);
                    const total = callback.content.map(x => x.total);
                    this.Data.TotalPengajuanLayananSelesai.chart = {
                        labels: product_test_type,
                        datasets: [{
                            backgroundColor: '#76B852',
                            backgroundColor: '#76B852',
                            data: total,
                            label: 'Total',
                        }]
                    };
                };
            });
        },
        GetPengajuanLayananByTribe() {
            const par = {
                tribe_name: this.Filter.TotalPengajuanLayananTribe.Tribe === 'null' ? 'tribe_name=' :
                    `tribe_name=${this.Filter.TotalPengajuanLayananTribe.Tribe.name}`,
                product_name: this.Filter.TotalPengajuanLayananTribe.Product === 'null' ? 'product_name=' :
                    `product_name=${this.Filter.TotalPengajuanLayananTribe.Product}`,
                service_name: this.Filter.TotalPengajuanLayananTribe.Service === 'null' ? 'service_name=' :
                    `service_name=${this.Filter.TotalPengajuanLayananTribe.Service}`
            };
            this.Request('GET',
                `/api/v3/dashboard/pengajuan-by-tribe-product?${par.tribe_name}&${par.product_name}&${par.service_name}`,
                null, null, 'BEARER', (
                    callback) => {
                if (callback.code === 200) {
                    this.Data.LayananByTribe = callback.content;
                };
            });
        },
        GetPengajuanLayananBySLA() {
            const par = {
                tribe_name: this.Filter.TotalPengajuanLayananSLA.Tribe === 'null' ? 'tribe_name=' :
                    `tribe_name=${this.Filter.TotalPengajuanLayananSLA.Tribe.name}`,
                product_name: this.Filter.TotalPengajuanLayananSLA.Product === 'null' ? 'product_name=' :
                    `product_name=${this.Filter.TotalPengajuanLayananSLA.Product}`,
                service_name: this.Filter.TotalPengajuanLayananSLA.Service === 'null' ? 'service_name=' :
                    `service_name=${this.Filter.TotalPengajuanLayananSLA.Service}`
            };
            this.Request('GET',
                `/api/v3/dashboard/pengajuan-by-sla?${par.tribe_name}&${par.product_name}&${par.service_name}`,
                null, null, 'BEARER', (
                    callback) => {
                if (callback.code === 200) {
                    this.Data.LayananBySLA = callback.content;
                };
            });
        },







        GetTribe() {
            this.Request('GET', '/api/v3/tribe', null, null, 'BEARER', (
                callback) => {
                if (callback.code === 200) {
                    this.Data.Tribe = callback.content;
                };
            });
        },
        GetProductTotalPengajuanLayananTribe() {
            this.Request('GET', '/api/v3/product-by-tribe/' + this.Filter.TotalPengajuanLayananTribe.Tribe.id, null,
                null, 'BEARER', (
                    callback) => {
                if (callback.code === 200) {
                    this.Data.Product = callback.content;
                };
            });
        },
        GetProductTotalPengajuanLayananSLA() {
            this.Request('GET', '/api/v3/product-by-tribe/' + this.Filter.TotalPengajuanLayananSLA.Tribe.id, null,
                null, 'BEARER', (
                    callback) => {
                if (callback.code === 200) {
                    this.Data.Product = callback.content;
                };
            });
        },
        GetService() {
            this.Request('GET', '/api/v3/service', null, null, 'BASIC', (
                callback) => {
                if (callback.code === 200) {
                    this.Data.Service = callback.content;
                };
            });
        }
    }
}

</script>

<style scoped>
.calendar /deep/ .vc-header {
    padding-bottom: 1rem !important;
}

.calendar /deep/ .vc-header .vc-title {
    font-weight: 600 !important;
    font-size: 20px !important;
    color: #3B3D39 !important;
}

.calendar /deep/ .vc-weeks .vc-weekday,
.calendar /deep/ .vc-day-content {
    color: #1D1E1C !important;
    font-weight: 600 !important;
    font-size: 16px;
}

.calendar /deep/ .vc-header {
    padding-top: 0 !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
}

.badge-success-detail {
    background-color: #E0FFD1;
    color: #8DC26F;
}

/* FIX */

/* Tanda panah */
.calendar /deep/ .vc-arrows-container .vc-arrow.is-left:active,
.calendar /deep/ .vc-arrows-container .vc-arrow.is-left:focus {
    color: #ED2B24 !important;
    border-color: transparent !important;
}

.calendar /deep/ .vc-arrows-container .vc-arrow.is-left:hover {
    color: #ED2B24 !important;
    background-color: transparent !important;
}

.calendar /deep/ .vc-arrows-container .vc-arrow.is-right:active,
.calendar /deep/ .vc-arrows-container .vc-arrow.is-right:focus {
    color: #ED2B24 !important;
    border-color: transparent !important;
}

.calendar /deep/ .vc-arrows-container .vc-arrow.is-right:hover {
    color: #ED2B24 !important;
    background-color: transparent !important;
}

.calendar /deep/ .vc-day {
    min-height: 60px !important;
}

.calendar /deep/ .vc-highlights .vc-highlight {
    background-color: white !important;
    border-radius: unset !important;
    width: 36px;
    height: 36px;
}

/* Ini buat hover/focus yang date sekarang */
.calendar /deep/ .is-today .vc-highlights .vc-highlight {
    background-color: #ED2B24 !important;
    border-radius: 100% !important;
    width: 40px;
    height: 40px;
}

.calendar /deep/ .is-today .vc-day-content:hover {
    color: white !important;
    background-color: #ED2B24;
    width: 40px;
    height: 40px;
}

.calendar /deep/ .is-today .vc-day-content:focus {
    color: white !important;
    background-color: #ED2B24;
}

.calendar /deep/ .is-today .vc-day-content {
    /* color: white !important; */
}

/* Ini buat hover/focus yang date lainnya */
.calendar /deep/ .vc-day-content:focus {
    width: 40px;
    height: 40px;
    border: 1px solid #ED2B24;
    color: #ED2B24 !important;
    background-color: transparent;
}

.calendar /deep/ .vc-day-content:hover {
    color: #ED2B24 !important;
    background-color: transparent;
}

/* ngilangin dot yang buat event */
.calendar /deep/ .vc-dots .vc-dot {
    /* display: none; */
}

.calendar /deep/ .vc-dots .vc-dot {
    width: 6px;
    height: 6px;
    background: linear-gradient(180deg, #76B852 0%, #8DC26F 100%);
    background-color: transparent;
}

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
</style>
