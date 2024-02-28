<template>
    <div class="bg-white">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9 py-content">
                    <div style="padding-right: 2.5rem;padding-left: 2.5rem;">
                        <div class="row">
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9 align-self-center">
                                <label class="text-gray-dark-2 font-size-24 font-weight-700">
                                    <em class="fa fa-arrow-left" @click="backPage()"></em> &nbsp;
                                    {{ detailServices.product_name }}
                                    <span class="badge font-size-12" :class="{
                                            'badge-success': detailServices.status === '8',
                                            'badge-danger': detailServices.status === '44'
                                        }">
                                        <span v-if="detailServices.status === '8'">SELESAI</span>
                                        <span v-if="detailServices.status === '44'">DITOLAK</span>
                                    </span>
                                </label>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-right">
                                <label class="text-gray-main font-size-11">Layanan yang diajukan adalah </label>
                                <p class="text-gray-main font-weight-700 font-size-16">
                                    {{ detailServices.product_test_type }}
                                </p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <ul class="steps">
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '3' || detailServices.status === '4' || detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '2' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '3' || detailServices.status === '4' || detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8'"></em>
                                            <span v-else>1</span>
                                        </span>
                                        <span class="step-text title">TAHAP 1</span>
                                        <span class="step-text desc">
                                            Mengajukan
                                            layanan
                                        </span>
                                    </div>
                                </li>
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '4' || detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '3' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '4' || detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8'"></em>
                                            <span v-else>2</span>
                                        </span>
                                        <span class="step-text title">TAHAP 2</span>
                                        <span class="step-text desc">
                                            Verifikasi data
                                            pengajuan
                                        </span>
                                    </div>
                                </li>
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '4' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '5' || detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8'"></em>
                                            <span v-else>3</span>
                                        </span>
                                        <span class="step-text title">TAHAP 3</span>
                                        <span class="step-text desc" style="width: 102px;">
                                            Menetapkan
                                            jadwal pemaparan
                                        </span>
                                    </div>
                                </li>
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '5' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '6' || detailServices.status === '7' || detailServices.status === '8'"></em>
                                            <span v-else>4</span>
                                        </span>
                                        <span class="step-text title">TAHAP 4</span>
                                        <span class="step-text desc" style="width: 99px;">
                                            Pengujian sedang
                                            berlangsung
                                        </span>
                                    </div>
                                </li>
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '7' || detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '6' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '7' || detailServices.status === '8'"></em>
                                            <span v-else>5</span>
                                        </span>
                                        <span class="step-text title">TAHAP 5</span>
                                        <span class="step-text desc" style="width: 100px;">
                                            Menyusun
                                            laporan pengujian
                                        </span>
                                    </div>
                                </li>
                                <li class="step"
                                    :class="{ 'step-success': detailServices.status === '8', 'step-error': detailServices.status === '44', 'step-current': detailServices.status === '7' }">
                                    <div class="step-content">
                                        <span class="step-circle">
                                            <em class="fas fa-check font-size-21"
                                                v-if="detailServices.status === '8'"></em>
                                            <span v-else>6</span>
                                        </span>
                                        <span class="step-text title">TAHAP 6</span>
                                        <span class="step-text desc">
                                            Pengujian
                                            selesai
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="row mb-4" v-for="(item, index) of detailServices.report" :key="index">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="card" style="padding: 0.5rem;">
                                    <div class="row identitas">
                                        <div class="col-xl-1 col-lg-1 col-md-1 align-self-center text-center">
                                            <em class="far fa-file font-size-30"></em>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <label class="font-size-16 font-weight-700 line-height-16 mb-0"
                                                style="color: #212121;">
                                                Pengujian produk Anda selesai!
                                            </label>
                                            <br>
                                            <label class="font-size-12 font-weight-400 line-height-16"
                                                style="color: #656664">
                                                Laporan pengujian produk.pdf
                                            </label>
                                        </div>
                                        <div class="col-xl-5 col-lg-5 col-md-5 align-self-center">
                                            <div class="float-right">
                                                <a :href="item.path" target="_blank"
                                                    class="btn btn-red font-size-14 font-weight-700">
                                                    Unduh Laporan
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="text-gray-main font-size-16 font-weight-700 mb-3">
                                    Informasi pengaju
                                </label>
                                <div class="card" style="padding: 0.5rem;">
                                    <div class="row identitas">
                                        <div class="col-auto align-self-center">
                                            <div class="rounded text-center d-flex justify-content-center"
                                                style="width: 38px; height: 38px; background: #D2FDE4;">
                                                <label class="font-weight-700 font-size-18"
                                                    style="color: #27AE60; margin-top: 6px; align-items: center;">
                                                    {{ firtsCharacter }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <label class="font-size-12 font-weight-400 line-height-16 mb-0"
                                                style="color: #757575;">
                                                Nama Pemohon
                                            </label>
                                            <br>
                                            <label class="font-size-12 font-weight-700 line-height-16"
                                                style="color: #212121;">
                                                {{ identitasPemohon.name || '-' }}
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <label class="font-size-12 font-weight-400 line-height-16 mb-0"
                                                style="color: #757575;">
                                                Unit/tribe
                                            </label>
                                            <br>
                                            <label class="font-size-12 font-weight-700 line-height-16"
                                                style="color: #212121;">
                                                {{ detailServices.unit || '-' }}
                                            </label>
                                        </div>
                                        <div class="col-3">
                                            <label class="font-size-12 font-weight-400 line-height-16 mb-0"
                                                style="color: #757575;">
                                                Email
                                            </label>
                                            <br>
                                            <label class="font-size-12 font-weight-700 line-height-16"
                                                style="color: #212121;">
                                                {{ identitasPemohon.email || '-' }}
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <label class="font-size-12 font-weight-400 line-height-16 mb-0"
                                                style="color: #757575;">
                                                Nomor Telepon
                                            </label>
                                            <br>
                                            <label class="font-size-12 font-weight-700 line-height-16"
                                                style="color: #212121;">
                                                {{ identitasPemohon.phone || '-' }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row mb-4">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="text-gray-main font-size-16 font-weight-700 mb-3">
                                    Tentang produk
                                </label>
                                <div class="row">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Nama Produk
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <label class="text-gray-main font-size-12 font-weight-700">
                                            {{ detailServices.product_name || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Deskripsi singkat
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <label class="text-gray-main font-size-12 font-weight-700">
                                            {{ detailServices.product_description || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="row" v-if="detailServices.product_link">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Link produk
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <a :href="detailServices.product_link" target="_blank"
                                            class="font-size-12 font-weight-700">
                                            {{ detailServices.product_link || '-' }}
                                        </a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Unit
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <label class="text-gray-main font-size-12 font-weight-700">
                                            {{ detailServices.unit || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Revenue
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <label class="text-gray-main font-size-12 font-weight-700">
                                            {{ detailServices.revenue || '-' }}
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <label class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                            Impact
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <label>:</label>
                                    </div>
                                    <div class="col">
                                        <label class="text-gray-main font-size-12 font-weight-700">
                                            {{ detailServices.micro_impact || '-' }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row mb-4">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="text-gray-main font-size-16 font-weight-700 mb-3">
                                    Lampiran dokumen
                                </label>
                                <div v-if="detailServices.status < '6'">
                                    <div v-if="!IsEditLampiran">
                                        <a href="javascript:void(0);" class="font-size-14 float-right"
                                            @click="IsEditLampiran = true">
                                            <u>Ubah Lampiran</u>
                                        </a>
                                    </div>
                                    <div v-if="IsEditLampiran">
                                        <a href="javascript:void(0);" class="font-size-14 float-right"
                                            @click="ClickEditLampiran()">
                                            <u>Batal</u>
                                        </a>
                                        <a href="javascript:void(0);" class="font-size-14 float-right mr-3"
                                            @click="ClickTambahLampiran()">
                                            <u>Tambah Lampiran</u>
                                        </a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12" v-if="IsEditLampiran">
                                        <!-- <h4 class="font-size-14 text-left mb-4">Silahkan pilih terlebih dahulu lampiran
                                            yang akan di
                                            edit dibawah, lalu upload lampiran baru :
                                        </h4> -->
                                    </div>
                                    <div class="col-auto my-2" v-for="(item, index) in attachment" :key="index">
                                        <div 
                                            class="card max-file-size fold bg-fafafa p-1 cursor-pointer">
                                            <div class="row no-gutters">
                                                <div class="col-auto px-2">
                                                    <img v-if="item.type === 'application/pdf'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/pdf-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/x-zip-compressed'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/zip-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'image/jpeg'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/jpg-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'image/png'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/png-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/vnd.android.package-archive'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/apk-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'text/xml'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/xml-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === ''"
                                                        src="https://minio.digitalpass.id/static/assets/icon/csv-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/xlsx-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'text/html'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/html-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/msword'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/doc-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/ppt-upload.svg"
                                                        alt="">
                                                    <img v-if="item.type === 'application/json'"
                                                        src="https://minio.digitalpass.id/static/assets/icon/json-upload.svg"
                                                        alt="">
                                                </div>
                                                <div class="col pt-1">
                                                    <p class="font-size-10 font-weight-700 mb-0"
                                                        style="color: #777777; width: 88%">
                                                        {{ item.name.slice(0, 30) }}
                                                    </p>
                                                    <label class="font-size-9 font-weight-500" style="color: #BDBDBD;">
                                                        {{ item.sizeFile }} {{ item.typeSizeFile }}
                                                    </label>
                                                    <div>
                                                        <button class="btn btn-secondary px-2 py-0 mt-1"
                                                            @click="removeFileUpload(item.id)"
                                                            style="background: #626262;">
                                                            <img class="cursor-pointer"
                                                                src="https://minio.digitalpass.id/static/assets/icon/trash.svg"
                                                                alt="">
                                                        </button>
                                                        <button class="btn btn-secondary px-1 py-0 mt-1"
                                                        @click="ClickLampiran(item)"
                                                            style="background: #626262;">
                                                            <img class="cursor-pointer"
                                                                src="/icon/download-white.svg"
                                                                alt="">
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <b-modal ref="Modal_EditLampiran" hide-header hide-footer centered title="">
                                <div class="my-3 mx-4">
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <h4 class="font-size-15 font-weight-bold">
                                                Upload file lampiran
                                            </h4>
                                            <input type="file" class="form-control"
                                                @change="handleFileUploadUbahLampiran($event)">
                                        </div>
                                    </div>

                                    <div class="mt-4">
                                        <button type="button" class="btn btn-warning float-right"
                                            @click="SetUploadUbahLampiran()">
                                            Ubah Lampiran
                                        </button>
                                    </div>
                                </div>
                            </b-modal>
                            <b-modal ref="Modal_TambahLampiran" hide-header hide-footer centered title="">
                                <div class="my-3 mx-4">
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <h4 class="font-size-15 font-weight-bold">
                                                Upload file lampiran
                                            </h4>
                                            <input type="file" class="form-control" 
                                                @change="handleFileUploadTambahLampiran($event)">
                                        </div>
                                    </div>

                                    <div class="mt-4">
                                        <button type="button" class="btn btn-danger float-right"
                                            :disabled="isLoadingUploadFile" @click="SetUploadTambahLampiran()">
                                            <span class="d-flex align-items-center">
                                                Tambah Lampiran
                                                <b-spinner v-if="isLoadingUploadFile" class="ml-1" small variant="light"></b-spinner>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </b-modal>
                        </div>

                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 border-left py-content">
                    <p class="text-gray-main font-size-16 font-weight-700 mb-3">
                        Aktifitas Pengajuan
                    </p>
                    <p class="text-gray-main font-size-12 mb-0">
                        Status Pengajuan :
                    </p>
                    <span class="font-weight-700 ">
                        {{ detailServices.status_user }}
                    </span>
                    <div class="row mt-3" v-for="(item, index) of detailServices.statistic" :key="index">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <span class="text-gray-main font-size-12 font-weight-700">
                                {{ item.name }}
                            </span>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 d-flex justify-content-end">
                            <a :href="item.path" target="_blank"
                                class="btn btn-red font-size-12 font-weight-700 text-white">
                                <img class="section-vector"
                                    src="https://minio.digitalpass.id/static/assets/icon/donwload-doc.svg"
                                    alt="donwload-doc">Unduh
                            </a>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul class="steps vertical">
                                <li class="step" v-for="(item, index) in detailServices.history" :key="index"
                                    :class="{ 'step-error' :  item.request_status === '44', 'step-success' : item.request_status !== '44'}">
                                    <div class="row">
                                        <div class="col-auto">
                                            <div class="step-content">
                                                <span class="step-circle">
                                                    <em class="fas font-size-10"
                                                        :class="{ 'fa-times' :  item.request_status === '44', 'fa-check' : item.request_status !== '44'}"></em>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col text-left">
                                            <h5 class="font-size-12">
                                                {{ item.created_at | formatDate }}
                                            </h5>
                                            <p class="text-black font-size-14" v-html="item.log"></p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    export default {
        layout: 'portal/without-footer',
        mixins: [mixins],
        data() {
            return {
                detailServices: [],
                identitasPemohon: [],
                attachment: [],
                history: [],
                firtsCharacter: '',
                LoginWith: null,
                IsEditLampiran: false,

                Data: {
                    UploadFile: {
                        Lampiran: []
                    }
                },
                isLoadingUploadFile: false
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY')
                } else {
                    return '-';
                }
            }
        },
        mounted() {
            this.LoginWith = this.UserLogin().loginWith;
            this.getDetailServices();
        },
        methods: {
            getDetailServices() {
                const param = this.$route.params;
                this.GET(`/api/v3/request/${param.id}`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        for (let x of data.content) {
                            this.detailServices = x;
                            this.identitasPemohon = x.requested_by;
                            const str = x.requested_by.name;
                            this.firtsCharacter = str.charAt(0);
                            this.history = x.history;
                            this.Attachment(x.attachment);
                        }
                    }
                });
            },
            Attachment(file) {
                for (let x of file) {
                    const convert = ((x.file_size / 1024) / 1024).toFixed(1); // MB
                    if (convert < 1) {
                        x.sizeFile = ((x.file_size / 1024)).toFixed(1);
                        x.typeSizeFile = 'KB';
                    } else {
                        x.sizeFile = convert;
                        x.typeSizeFile = 'MB';
                    }
                    this.attachment.push(x);
                }
            },
            backPage() {
                this.$router.back();
            },
            ClickLampiran(item) {
                if (this.IsEditLampiran) {
                    this.$refs['Modal_EditLampiran'].show();
                    this.IdDeleteLampiran = item;
                } else {
                    window.open(item.path, '_blank');
                }
            },
            ClickEditLampiran() {
                this.IsEditLampiran = false;
                this.IdDeleteLampiran = null;
            },
            ClickTambahLampiran() {
                this.$refs['Modal_TambahLampiran'].show();
            },
            handleFileUploadUbahLampiran(event) {
                for (let x of event.target.files) {
                    const convert = ((x.size / 1024) / 1024).toFixed(1); // MB
                    if (convert > 25) {
                        this.swal('error', 'Ukuran file maksimal : 25.0 MB');
                        document.getElementById('addButton').value = '';
                    } else {
                        if (convert < 1) {
                            x.sizeFile = ((x.size / 1024)).toFixed(1);
                            x.typeSizeFile = 'KB';
                        } else {
                            x.sizeFile = convert;
                            x.typeSizeFile = 'MB';
                        }
                        this.Data.UploadFile.Lampiran.push(x);
                    }
                }
            },
            handleFileUploadTambahLampiran(event) {
                for (let x of event.target.files) {
                    const convert = ((x.size / 1024) / 1024).toFixed(1); // MB
                    if (convert > 25) {
                        this.swal('error', 'Ukuran file maksimal : 25.0 MB');
                        document.getElementById('addButton').value = '';
                    } else {
                        if (convert < 1) {
                            x.sizeFile = ((x.size / 1024)).toFixed(1);
                            x.typeSizeFile = 'KB';
                        } else {
                            x.sizeFile = convert;
                            x.typeSizeFile = 'MB';
                        }
                        this.Data.UploadFile.Lampiran.push(x);
                    }
                }
            },
            SetUploadUbahLampiran() {
                this.swal('confirm-pengajuan', 'akan merubah lampiran?').then((result) => {
                    if (result.isConfirmed) {
                        const fd = new FormData();
                        fd.append('id', this.IdDeleteLampiran.id);
                        this.Request('DELETE', '/api/v3/request-attachment/remove', null, fd, 'BASIC', (
                            callback) => {
                            if (callback.code === 200) {
                                this.attachment = [];
                                this.Data.UploadFile.Lampiran.forEach((item, index) => {
                                    const fd = new FormData();
                                    fd.append('request_id', this.detailServices.id);
                                    fd.append('name', item.name);
                                    fd.append('imgFile', item);
                                    fd.append('type', item.type);
                                    fd.append('file_type', 'lampiran');
                                    fd.append('service', this.detailServices.service.id);
                                    fd.append('product_name', this.detailServices.product_name);
                                    this.POST(`/api/v2/request-attachment/create`, fd, 'BASIC',
                                        (data) => {
                                            this.IdDeleteLampiran = null;
                                            this.getDetailServices();
                                            this.$refs['Modal_EditLampiran'].hide();
                                        });
                                });
                            }
                        });

                    }
                });
            },
            SetUploadTambahLampiran() {
                this.isLoadingUploadFile = true;
                this.Data.UploadFile.Lampiran.forEach((item, index) => {
                    const fd = new FormData();
                    fd.append('request_id', this.detailServices.id);
                    fd.append('name', item.name);
                    fd.append('imgFile', item);
                    fd.append('type', item.type);
                    fd.append('file_type', 'lampiran');
                    fd.append('service', this.detailServices.service.id);
                    fd.append('product_name', this.detailServices.product_name);
                    this.POST(`/api/v2/request-attachment/create`, fd, 'BASIC', (data) => {
                        if (data.code === 200) {
                            this.isLoadingUploadFile = false;
                            this.getDetailServices();
                            this.$refs['Modal_TambahLampiran'].hide();
                        } else {
                            this.isLoadingUploadFile = false;
                        }
                    });
                });
            },
            removeFileUpload(id) {
                this.swal('confirm-pengajuan', 'akan menghapus lampiran?').then((result) => {
                    if (result.isConfirmed) {
                        const fd = new FormData();
                        fd.append('id', id);
                        this.Request('DELETE', '/api/v3/request-attachment/remove', null, fd, 'BASIC', (
                            callback) => {
                            if (callback.code === 200) {
                                this.attachment = [];
                                this.getDetailServices();
                            }
                        });

                    }
                });
            },
        }

    }

</script>

<style scoped>
    .py-content {
        padding-top: 6rem;
        padding-bottom: 6rem;
    }

    .identitas-init {
        width: 40px;
        height: 40px;
    }

    .max-file-size {
        width: 170px !important;
        height: 108px !important;
        max-width: 170px !important;
        max-height: 108px !important;
    }

    .fold:before {
        content: "";
        position: absolute;
        bottom: -1px;
        right: -1px;
        border-width: 0 0 16px 16px;
        border-style: solid;
        border-color: #f8f9fc #E8453C;
    }

    .fold:after {
        content: "";
        position: absolute;
        bottom: -1px;
        right: 15px;
        border-width: 0 0 16px 16px;
        border-style: solid;
        border-color: #C4C4C4 #fafafa;
    }

    em.fa.fa-arrow-left:hover {
        color: #ED2B24 !important;
        cursor: pointer !important;
    }

</style>
