<template>
    <div>
        <div id="accordion">
            <div class="row mb-4" v-if="lessStep('LAPORAN_PENGUJIAN')">
                <div class="col-xl-12">
                    <div class="card">

                        <div class="card-header" id="headingOne" :class="IsCollapse ? 'show' : ''">
                            <div class="row d-flex align-items-center">
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <span class="font-size-14 font-weight-600 text-success">
                                        Batas {{ Data.CurrentStatusService }} adalah {{ Data.DueDate.date | formatDate }}
                                    </span>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-end">
                                    <a href="javascrip:9(0)" data-toggle="collapse" data-target="#collapseOne"
                                        v-if="!IsCollapse" aria-expanded="true" aria-controls="collapseOne"
                                        @click="IsCollapse = true">
                                        <img src="/icon/expand_down.svg">
                                    </a>
                                    <a href="javascrip:9(0)" data-toggle="collapse" data-target="#collapseOne"
                                        v-if="IsCollapse" aria-expanded="true" aria-controls="collapseOne"
                                        @click="IsCollapse = false">
                                        <img src="/icon/expand_up.svg">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-3">
                                        <p class="font-size-18 font-weight-600 text-dsa-black">
                                            Verifikasi data pengajuan
                                        </p>
                                        <label class="font-size-18 font-weight-600 text-dsa-success mb-0">
                                            {{ Data.SLA.phase_1 }} Hari
                                        </label>
                                    </div>
                                    <div class="col-xl-3">
                                        <p class="font-size-18 font-weight-600 text-dsa-black">
                                            Proses Pengujian
                                        </p>
                                        <label class="font-size-18 font-weight-600 text-dsa-success mb-0">
                                            {{ Data.SLA.phase_2 }} Hari
                                        </label>
                                    </div>
                                    <div class="col-xl-3">
                                        <p class="font-size-18 font-weight-600 text-dsa-black">
                                            Proses Pengujian
                                        </p>
                                        <label class="font-size-18 font-weight-600 text-dsa-success mb-0">
                                            {{ Data.SLA.phase_3 }} Hari
                                        </label>
                                    </div>
                                    <div class="col-xl-3">
                                        <p class="font-size-18 font-weight-600 text-dsa-black">
                                            Info Pengujian
                                        </p>
                                        <label class="font-size-18 font-weight-600 text-dsa-success mb-0">
                                            {{ Data.SLA.phase_4 }} Hari
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row mb-4"
                v-if="Data.DetailPengajuan.statusName === 'VERIFIKASI_DATA_PENGAJUAN' || Data.DetailPengajuan.statusName === 'JADWAL_PEMAPARAN' || Data.DetailPengajuan.statusName === 'PROSES_PENGUJIAN'">
                <div class="col-xl-12 d-flex justify-content-end">
                    <button type="button" class="btn btn-dsa-outline-primary btn-lg" @click="Reject()">
                        <span class="font-size-16 font-weight-600">
                            Batalkan Pengajuan
                        </span>
                    </button>
                </div>
            </div>

            <div class="row mb-4 d-flex align-items-center">
                <div class="col-xl-6 d-flex align-items-center">
                    <label class="font-size-28 font-weight-600 text-dsa-black mb-0">
                        {{ Data.DetailPengajuan.product_name || '-' }}
                    </label>
                    <span class="badge text-center ml-2 dropdown-status" :class="{
                        'badge-success-detail': Data.DetailPengajuan.statusName === 'SELESAI',
                        'badge-danger-detail': Data.DetailPengajuan.statusName === 'PENGAJUAN_DIREJECT',
                        'badge-warning-detail': Data.DetailPengajuan.statusName !== 'PENGAJUAN_DIREJECT' && Data.DetailPengajuan.statusName !== 'SELESAI'
                    }">
                        <div @click="handleDropdownStatus()">
                            <span class="font-size-16 font-weight-600">
                                <span v-if="Data.DetailPengajuan.statusName === 'SUBMIT_DATA_PENGAJUAN'">
                                    Submit Data Pengajuan
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'VERIFIKASI_DATA_PENGAJUAN'">
                                    Verifikasi Data Pengajuan
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'JADWAL_PEMAPARAN'">
                                    Jadwal Pemaparan
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'PROSES_PENGUJIAN'">
                                    Proses Pengujian
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'LAPORAN_PENGUJIAN'">
                                    Info Pengujian
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'PROSES_PERBAIKAN'">
                                    Proses Perbaikan
                                </span>
                                <span v-if="Data.DetailPengajuan.statusName === 'SELESAI'">
                                    Selesai
                                </span>
                                <span
                                    v-if="Data.DetailPengajuan.statusName === 'PENGAJUAN_DIREJECT' || Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK'">
                                    Pengujian Ditolak / Dibatalkan
                                </span>
                            </span>
                            <img src="/icon/expand_down.svg" class="chevron-status"
                                v-if="Data.DetailPengajuan.statusName !== 'SELESAI'" />
                        </div>
                        <div class="status-container" v-if="openStatus">
                            <div class="status-item" v-for="(item, index) in listStatus" :key="index"
                                @click="onSelectStatus(item.status_name)">
                                {{ item.name }}
                            </div>
                        </div>
                    </span>
                </div>
                <div class="col-xl-6 d-flex justify-content-end">


                    <!-- Step  1 -->
                    <div class=""
                        v-if="Data.DetailPengajuan.statusName === 'SUBMIT_DATA_PENGAJUAN' || Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK'">
                        <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-3" @click="tolakPengajuan()"
                            :disabled="Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK'">
                            <span class="font-size-16 font-weight-600">
                                Tolak Pengajuan
                            </span>
                        </button>
                        <button type="button" class="btn btn-dsa-primary btn-lg" @click="SetVerification()"
                            :disabled="Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK'">
                            <span class="font-size-16 font-weight-600">
                                Mulai Verifikasi


                            </span>
                        </button>
                    </div>
                    <!-- Step  1 -->


                    <!-- Step  2 -->
                    <div class="" v-if="Data.DetailPengajuan.statusName === 'VERIFIKASI_DATA_PENGAJUAN'">

                        <div v-if="setJadwalPemaparan === null">
                            <no-ssr>
                                <v-date-picker v-model="setJadwalPemaparan" :color="VDatePickerConfig.color"
                                    :title-position="VDatePickerConfig.titlePosition">
                                    <template v-slot="{ togglePopover }">
                                        <button type="button" class="btn btn-dsa-primary btn-lg" @click="togglePopover()">
                                            <span class="font-size-16 font-weight-600">
                                                <span>
                                                    Pilih Tanggal Pemaparan
                                                </span>
                                                <img src="/icon/form/calendar_light.svg">
                                            </span>
                                        </button>
                                    </template>
                                </v-date-picker>
                            </no-ssr>
                        </div>
                    </div>
                    <!-- Step  2 -->


                    <!-- Step  3 -->
                    <div class="" v-if="Data.DetailPengajuan.statusName === 'JADWAL_PEMAPARAN'">
                        <div v-if="setJadwalPemaparan === null">
                            <no-ssr>
                                <v-date-picker v-model="setJadwalPemaparan" :color="VDatePickerConfig.color"
                                    :title-position="VDatePickerConfig.titlePosition">
                                    <template v-slot="{ togglePopover }">
                                        <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-2"
                                            @click="togglePopover()">
                                            <span class="font-size-16 font-weight-600">
                                                Jadwalkan Ulang
                                            </span>
                                        </button>
                                    </template>
                                </v-date-picker>
                            </no-ssr>

                            <button type="button" class="btn btn-dsa-primary btn-lg"
                                @click="$bvModal.show('Modal_ProsesPengujian')">
                                <span class="font-size-16 font-weight-600">
                                    Mulai Proses Pengujian
                                </span>
                            </button>
                        </div>
                    </div>
                    <!-- Step  3 -->


                    <!-- Step  4 -->
                    <div class="" v-if="Data.DetailPengajuan.statusName === 'PROSES_PENGUJIAN'">
                        <div v-if="setJadwalPemaparan === null">
                            <no-ssr>
                                <v-date-picker v-model="setJadwalPemaparan" :color="VDatePickerConfig.color"
                                    :title-position="VDatePickerConfig.titlePosition">
                                    <template v-slot="{ togglePopover }">
                                        <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-2"
                                            @click="togglePopover()">
                                            <span class="font-size-16 font-weight-600">
                                                Jadwalkan Ulang
                                            </span>
                                        </button>
                                    </template>
                                </v-date-picker>
                            </no-ssr>

                            <button type="button" class="btn btn-dsa-success btn-lg mr-2"
                                @click="$bvModal.show('Modal_KirimInfo')">
                                <span class="font-size-16 font-weight-600">
                                    Kirim Info
                                </span>
                            </button>

                            <button type="button" class="btn btn-dsa-primary btn-lg" @click="SetSelesai()">
                                <span class="font-size-16 font-weight-600">
                                    Pengujian Selesai
                                </span>
                            </button>
                        </div>
                    </div>
                    <!-- Step  4 -->


                    <!-- Step  5 -->
                    <div class="" v-if="Data.DetailPengajuan.statusName === 'LAPORAN_PENGUJIAN'">
                        <div v-if="Data.DetailPengajuan.report.length === 0">
                            <button type="button" class="btn btn-dsa-primary btn-lg"
                                @click="$bvModal.show('Modal_SubmitLaporan')">
                                <span class="font-size-16 font-weight-600">
                                    Submit Laporan
                                </span>
                            </button>
                        </div>

                        <div v-if="Data.DetailPengajuan.report.length > 0">
                            <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-2"
                                @click="handleInfoRevisi()">
                                <span class="font-size-16 font-weight-600">
                                    Proses Perbaikan
                                </span>
                            </button>

                            <button type="button" class="btn btn-dsa-primary btn-lg" @click="confirmDone()">
                                <span class="font-size-16 font-weight-600">
                                    Selesai
                                </span>
                            </button>
                        </div>
                    </div>
                    <!-- Step  5 -->

                    <!-- Step  6 -->
                    <div class="" v-if="Data.DetailPengajuan.statusName === 'PROSES_PERBAIKAN'">
                        <button type="button" class="btn btn-dsa-primary btn-lg" @click="confirmDone()">
                            <span class="font-size-16 font-weight-600">
                                Selesai
                            </span>
                        </button>
                    </div>
                    <!-- Step 6 -->

                    <!-- Button Set Schedule -->
                    <div v-if="showSetSchedule">
                        <div v-if="setJadwalPemaparan !== null">
                            <no-ssr>
                                <v-date-picker v-model="setJadwalPemaparan" :color="VDatePickerConfig.color"
                                    :title-position="VDatePickerConfig.titlePosition">
                                    <template v-slot="{ togglePopover }">
                                        <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-2"
                                            @click="togglePopover()">
                                            <span class="font-size-16 font-weight-600">
                                                Jadwalkan Ulang
                                            </span>
                                        </button>
                                    </template>
                                </v-date-picker>
                            </no-ssr>

                            <button type="button" class="btn btn-dsa-primary btn-lg" @click="SetRequestSchedule()">
                                <span class="font-size-16 font-weight-600">
                                    <span>
                                        Lanjutkan Penjadwalan
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <!-- Button Set Schedule -->
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <div class="card-base">
                        <div class="d-flex align-items-center title-section">
                            <label class="section-label">
                                Detail Produk
                            </label>
                            <button type="button" class="btn btn-red-outline" @click="handleUpdateDetail()"
                                v-if="!isUpdateDetail">
                                <img src="/icon/pen.svg" />
                                <span class="font-size-16 font-weight-600">
                                    Ubah Informasi
                                </span>
                            </button>
                        </div>
                        <div class="card">
                            <!-- <span style="padding-top: 20px; padding-left: 25px" v-if="Data.DetailPengajuan.product.length > 0 && Data.DetailPengajuan.product[0].status === 'DRAFT'">
                                <span style="color: red;">*</span>
                                    Terdapat pengajuan produk baru, silahkan update status pada
                                <nuxt-link to="/manage/kelola-produk" type="text">
                                    <span class="kelola-produk">
                                        kelola produk <img src="/v3/Portal/assets/icon/ICON_PEN_EDIT.svg" />
                                    </span>
                                </nuxt-link>
                            </span> -->
                            <div class="card-body font-size-16 font-weight-400 text-dsa-secondary">
                                
                                <div class="row">

                                    <div class="col-xl-5">
                                        
                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Nama Produk
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.product_name || '-' }}
                                                    <!-- <span v-if="Data.DetailPengajuan.product.length > 0 && Data.DetailPengajuan.product[0].status === 'DRAFT'" class="badge-status"> -->
                                                        <!-- {{ Data.DetailPengajuan.product.length > 0 ? Data.DetailPengajuan.product[0].status : '-' }} -->
                                                        <!-- {{ Data.DetailPengajuan.product[0].status }} -->
                                                    <!-- </span> -->
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <treeselect class="treeselect"
                                                    :class="{ 'is-invalid': $v.productDetail.product.$error }"
                                                    placeholder="Masukkan Nama Produk" v-model="productDetail.product"
                                                    :multiple="false" :options="listProduct" />
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.productDetail.product.required">
                                                        Nama produk tidak boleh kosong.
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Jenis Platform
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.platform_type || '-' }}
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <!-- <treeselect  
                                                    :class="{ 'is-invalid': $v.productDetail.platform_type.$error }" 
                                                    placeholder="Masukkan Jenis platform aplikasi"
                                                    :multiple="true"
                                                    :options="platform"
                                                    v-model="productDetail.platform_type" 
                                                /> -->
                                                <input type="text" class="form-control" placeholder="jenis Platform"
                                                    v-model.trim="$v.productDetail.platform_type.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.platform_type.$error }" />
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.productDetail.platform_type.required">
                                                        Jenis Platform tidak boleh kosong.
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Deskripsi Produk
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.product_description || '-' }}
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <input type="text" class="form-control" placeholder="Deskripsi Produk"
                                                    v-model.trim="$v.productDetail.product_description.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.product_description.$error }" />
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.productDetail.product_description.required">
                                                        Deskripsi produk tidak boleh kosong.
                                                    </span>
                                                    <span v-if="!$v.productDetail.product_description.minLength">
                                                        Masukkan minimal
                                                        {{ $v.productDetail.product_description.$params.minLength.min }}
                                                        karakter.
                                                    </span>
                                                    <span v-if="!$v.productDetail.product_description.maxLength">
                                                        Masukkan maksimal
                                                        {{ $v.productDetail.product_description.$params.maxLength.max }}
                                                        karakter.
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Unit
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.unit || '-' }}
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <input type="text" class="form-control" placeholder="Unit"
                                                    v-model.trim="$v.productDetail.unit.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.unit.$error }" />
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Versi
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.versi || '-' }}
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <input type="text" class="form-control" placeholder="Versi"
                                                    v-model.trim="$v.productDetail.version.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.version.$error }" />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-xl-5">

                                        <div class="row mb-3">
                                            <div class="col-xl-5">
                                                <span>
                                                    Jenis Layanan
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.product_test_type || '-' }}
                                                </span>
                                            </div>

                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <select class="form-control custom-select-user"
                                                    v-model.trim="$v.productDetail.service_id.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.service_id.$error }">
                                                    <option value="" disabled>Jenis Layanan</option>
                                                    <option v-for="(item, index) of listService" :key="index"
                                                        :value="item.id">
                                                        {{ item.name }}
                                                    </option>
                                                </select>
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.productDetail.service_id.required">
                                                        Jenis layanan tidak boleh kosong.
                                                    </span>
                                                </span>
                                            </div>

                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-xl-5">
                                                <span>
                                                    Nama Modul
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.service_name || '-' }}
                                                </span>
                                            </div>

                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <input type="text" class="form-control" placeholder="masukkan nama modul"
                                                    v-model.trim="$v.productDetail.service_name.$model" 
                                                    :class="{ 'is-invalid': $v.productDetail.service_name.$error }"/>
                                            </div>
                                            <span class="invalid-feedback">
                                                <span v-if="!$v.productDetail.service_name.minLength">
                                                    Masukkan minimal
                                                    {{ $v.productDetail.service_name.$params.minLength.min }}
                                                    karakter.
                                                </span>
                                                <span v-if="!$v.productDetail.service_name.maxLength">
                                                    Masukkan maksimal
                                                    {{ $v.productDetail.service_name.$params.maxLength.max }}
                                                    karakter.
                                                </span>
                                            </span>
                                        </div>

                                        <div class="row mb-3" v-if="Data.DetailPengajuan.service.slug === 'heuristic-evaluation' || Data.DetailPengajuan.service.slug === 'usability-testing'">
                                            <div class="col-xl-5">
                                                <span>
                                                    Pattern Legion
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div class="col-xl-5">
                                                <span>
                                                    <div v-if="Data.DetailPengajuan.is_legion_standard === true">
                                                        <p>Ya;
                                                        {{ Data.DetailPengajuan.legion_notes || '-' }} </p>
                                                    </div>
                                                    <div v-if="Data.DetailPengajuan.is_legion_standard === false">
                                                          <p>Tidak</p>
                                                    </div>
                                                    <!-- {{ Data.DetailPengajuan.product_test_type || '-' }} -->
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Detail Fitur Upgrade
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div v-if="!isUpdateDetail" class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.detail_feature_upgrade || '-' }}
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <input type="text" class="form-control"
                                                    placeholder="Masukkan Detail Fitur Upgrade aplikasi anda"
                                                    v-model.trim="$v.productDetail.detail_feature_upgrade.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.detail_feature_upgrade.$error }" />
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.productDetail.detail_feature_upgrade.minLength">
                                                        Masukkan minimal
                                                        {{ $v.productDetail.detail_feature_upgrade.$params.minLength.min }}
                                                        karakter.
                                                    </span>
                                                    <span v-if="!$v.productDetail.detail_feature_upgrade.maxLength">
                                                        Masukkan maksimal
                                                        {{ $v.productDetail.detail_feature_upgrade.$params.maxLength.max }}
                                                        karakter.
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3 align-items-center">
                                            <div class="col-xl-5">
                                                <span>
                                                    Jenis Pengajuan
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div class="col-xl-6">
                                                <div v-if="this.Data.DetailPengajuan.is_priority === true"
                                                    class="label-chips">
                                                    <div class="chip-item">
                                                        Percepatan Layanan
                                                    </div>
                                                </div>
                                                <div v-if="this.Data.DetailPengajuan.is_gtm_bundle === true"
                                                    class="label-chips">
                                                    <div class="chip-item" style="color: #FFB020;">
                                                        Go To Market
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    -
                                                </div>
                                            </div>
                                            <!-- <div v-if="!isUpdateDetail" class="col-xl-6">
                                                <div v-if="this.Data.DetailPengajuan.labelValue.length > 0"
                                                    class="label-chips">
                                                    <div class="chip-item"
                                                        v-for="(item, index) in Data.DetailPengajuan.labelValue"
                                                        :key="index">
                                                        {{ item }}
                                                    </div>
                                                </div>
                                                <span v-else>
                                                    -
                                                </span>
                                            </div>
                                            <div v-if="isUpdateDetail" class="col-xl-6">
                                                <b-form-tags input-id="tags-pills" class="form-control custom-form-tags"
                                                    placeholder="Label" v-model.trim="$v.productDetail.label.$model"
                                                    :class="{ 'is-invalid': $v.productDetail.label.$error }" />
                                            </div> -->
                                        </div>

                                    </div>

                                    <div class="col-xl-2 d-flex justify-content-end">
                                        <a :href="Data.DetailPengajuan.product_link" target="_blank"
                                            class="btn btn-dsa-outline-primary" style="width: 104px;height: 40px;">
                                            <span class="font-size-14">
                                                Open Apps
                                            </span>
                                        </a>
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
                                Identitas Pemohon
                            </label>
                        </div>
                        <div class="card overflow-auto" style="height: 180px;">
                            <div class="card-body font-size-16 font-weight-400 text-dsa-secondary">

                                <div class="row">

                                    <div class="col-xl-12">

                                        <div class="row mb-3">
                                            <div class="col-xl-4">
                                                <span>
                                                    Nama Pemohon
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.requested_by.name || '-' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-xl-4">
                                                <span>
                                                    Email
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.requested_by.email || '-' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-xl-4">
                                                <span>
                                                    No Telefon
                                                </span>
                                            </div>
                                            <div class="col-xl-1">
                                                <span>
                                                    :
                                                </span>
                                            </div>
                                            <div class="col-xl-5">
                                                <span>
                                                    {{ Data.DetailPengajuan.requested_by.phone || '-' }}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Riwayat Pengajuan
                            </label>
                        </div>
                        <div class="card">
                            <div class="card-body">

                                <div class="text-center align-items-center" style="margin-top: 5rem; margin-bottom: 5rem;"
                                    v-if="Data.DetailPengajuan.history.length === 0">
                                    <div class="text-center mt-5">
                                        <img src="/icon/not-found/not-found-v3.svg">
                                        <p class="font-size-12 text-dsa-secondary font-weight-normal mt-4">
                                            Belum ada riwayat pengajuan
                                        </p>
                                    </div>
                                </div>

                                <div v-for="(item, index) of Data.DetailPengajuan.history" :key="index">
                                    <div class="row">
                                        <div class="col-auto pr-0">
                                            <div class="bg-dsa-success mt-2"
                                                style="width: 8px; height: 8px; border-radius: 100%;">
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <p class="font-size-16 font-weight-400 text-dsa-success"
                                                style="margin-bottom: 10px !important;">
                                                {{ item.created_at | formatDate }}
                                            </p>
                                            <p class="font-size-16 font-weight-400 text-dsa-secondary" v-html="item.log">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="Pengajuan-percepatan" v-if="this.Data.DetailPengajuan.is_priority === true">
                        <div class="card-base">
                            <label class="section-label">
                                Detail Pengajuan Percepatan
                            </label>
                            <div class="card overflow-auto" style="height: 180px;">
                                <div class="card-body font-size-16 font-weight-400 text-dsa-secondary">
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="row">
                                                <div class="col-xl-3">
                                                    <span>
                                                        File Justifikasi
                                                    </span>
                                                </div>
                                                <div class="col-xl-1">
                                                    <span>
                                                        :
                                                    </span>
                                                </div>
                                                <div class="col-xl-8">
                                                    <span>
                                                        <div class="row"
                                                            v-for="(item, index) of Data.DetailPengajuan.attachment"
                                                            :key="index">
                                                            <div class="col-xl-12"
                                                                v-if="item.attachment_type === 'EVIDENCE_PRIORITAS'">
                                                                <div class="row" style="margin-bottom: 8px;">
                                                                    <div class="col-xl-6 d-flex align-self-end">
                                                                        <label>
                                                                            {{ item.name.slice(0, 30) }}
                                                                        </label>
                                                                    </div>
                                                                    <div class="col-xl-6 d-flex justify-content-end">
                                                                        <a :href="item.path" target="_blank"
                                                                            class="btn btn-dsa-success border-0 px-2 mr-2"
                                                                            style="background-color: #E9FCDF;">
                                                                            <img src="/icon/download.svg">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-base">
                        <div class="d-flex justify-content-between align-items-center title-section">
                            <label class="section-label">
                                Lampiran
                            </label>
                            <button type="button" class="btn btn-red-outline btn-add-file" @click="handleAddAttachment()">
                                <img src="/icon/add-red.svg" />
                                <span class="font-size-16 font-weight-600">
                                    Tambah File
                                </span>
                            </button>
                        </div>
                        <div class="card overflow-auto" style="height: 180px;">
                            <div class="card-body font-size-16 font-weight-400 text-dsa-secondary">
                                <div class="row" v-for="(item, index) of Data.DetailPengajuan.attachment" :key="index">
                                    <div class="col-xl-12" v-if="item.attachment_type !== 'EVIDENCE_PRIORITAS'">
                                        <div class="row">
                                            <div class="col-xl-6 d-flex align-self-end">
                                                <label>
                                                    {{ item.name.slice(0, 30) }}
                                                </label>
                                            </div>
                                            <div class="col-xl-6 d-flex justify-content-end">
                                                <button type="button" class="btn btn-remove"
                                                    @click="deleteAttachment(item.id)">
                                                    <img src="/icon/trash.svg">
                                                </button>
                                                <a :href="item.path" target="_blank"
                                                    class="btn btn-dsa-success border-0 px-2 mr-2"
                                                    style="background-color: #E9FCDF;">
                                                    <img src="/icon/download.svg">
                                                </a>
                                                <button type="button" class="btn btn-dsa-outline-warning"
                                                    @click="ModalUbahLampiran(item)" style="width: 64px;">
                                                    <span class="font-size-14">
                                                        Edit
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="laporan-penguji" v-if="Data.DetailPengajuan.report.length !== 0">
                        <div class="card-base">
                            <div>
                                <label class="section-label">
                                    Laporan Pengujian
                                </label>
                            </div>
                            <div class="card overflow-auto" style="height: 180px;">
                                <div class="card-body font-size-16 font-weight-400 text-dsa-secondary">

                                    <div class="row" v-for="(item, index) of Data.DetailPengajuan.report" :key="index">
                                        <div class="col-xl-12">
                                            <div class="row">
                                                <div class="col-xl-6 d-flex align-self-end">
                                                    <label>
                                                        {{ item.name.slice(0, 30) }}
                                                    </label>
                                                </div>
                                                <div class="col-xl-6 d-flex justify-content-end">
                                                    <a :href="item.path" target="_blank"
                                                        class="btn btn-dsa-success border-0 px-2 mr-2"
                                                        style="background-color: #E9FCDF;">
                                                        <img src="/icon/download.svg">
                                                    </a>
                                                    <button type="button" class="btn btn-dsa-outline-warning"
                                                        @click="ModalUbahLaporan(item)" style="width: 64px;">
                                                        <span class="font-size-14">
                                                            Edit
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row" v-if="isUpdateDetail">
                <div class="col-xl-12 d-flex justify-content-end">
                    <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-3" @click="handleUpdateDetail()">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </button>
                    <button type="button" class="btn btn-dsa-primary btn-lg" @click="submitDetailProduct()"
                        :disabled="$v.productDetail.$invalid">
                        <span class="font-size-16 font-weight-600">
                            Simpan
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Reason Mini Survey -->
        <b-modal id="Modal_ReasonMiniSurvey" ref="Modal_ReasonMiniSurvey" modal-class="modal-dsa" centered hide-footer
            no-close-on-esc no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Mini Survey
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            <p class="mb-1">Tanggal melebihi dari batas yang ditentukan.</p>
                            <span>Pilih alasan untuk melanjutkan</span>
                        </label>
                        <select class="form-control border" v-model="Form.surveyId">
                            <option value="" disabled>Pilih alasan untuk melanjutkan</option>
                            <option v-for="(item, index) of Data.MiniSurvey" :key="index" :value="item.id">
                                {{ item.text }}
                            </option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanConfirmReason()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                :disabled="Form.surveyId === null" @click="ConfirmReason()">
                                Lanjutkan
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Proses Pengujian -->
        <b-modal id="Modal_ProsesPengujian" ref="Modal_ProsesPengujian" modal-class="modal-dsa" centered hide-footer
            no-close-on-esc no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Mulai Proses Pengujian
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Pilih Tanggal Mulai
                        </label>
                        <v-date-picker v-model="setJadwalPengujianStart" :color="VDatePickerConfig.color"
                            :title-position="VDatePickerConfig.titlePosition">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="form-control border" :value="inputValue" v-on="inputEvents"
                                    placeholder="Pilih Tanggal" />
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Pilih Tanggal Selesai
                        </label>
                        <v-date-picker v-model="setJadwalPengujianEnd" :color="VDatePickerConfig.color"
                            :title-position="VDatePickerConfig.titlePosition" :min-date="setJadwalPengujianStart">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="form-control border" :value="inputValue" v-on="inputEvents"
                                    placeholder="Pilih Tanggal" />
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanSetOnProcess()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                :disabled="setJadwalPengujianStart === '' || setJadwalPengujianEnd === ''"
                                @click="SetOnProcess()">
                                Mulai Pengujian
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Kirim Info -->
        <b-modal id="Modal_KirimInfo" ref="Modal_KirimInfo" modal-class="modal-dsa" centered hide-footer no-close-on-esc
            no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Kirim Info
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Silahkan masukkan informasi perihal data pengajuan kepada pemohon
                        </label>
                        <textarea class="form-control border" rows="4" v-model="setInfo"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanSetInfo()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                :disabled="setInfo === null" @click="SetInfo()">
                                Kirim
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Submit Laporan -->
        <b-modal id="Modal_SubmitLaporan" ref="Modal_SubmitLaporan" modal-class="modal-dsa" centered hide-footer
            no-close-on-esc no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Submit Laporan
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Pilih File
                        </label>
                        <div class="form-control-image" @dragover.prevent @drop.prevent
                            @drop="HandleFileDropUploadLaporan($event)">
                            <img src="/icon/form/upload.svg">
                            <div class="font-size-16">
                                <span class="text-dsa-secondary font-weight-400">
                                    Drag file disini, atau
                                </span>
                                <span class="text-dsa-danger font-weight-600 cursor-pointer"
                                    @click="TriggerUploadLaporan()">
                                    pilih file
                                </span>
                            </div>
                            <input type="file" class="d-none" id="trigger-upload-laporan"
                                @change="HandleFileUploadLaporan($event)">
                        </div>
                    </div>

                    <div class="alert alert-success" role="alert" v-if="PreviewFileLaporan !== null">
                        <div class="row">
                            <div class="col-xl-6 d-flex justify-content-start">
                                {{ PreviewFileLaporan }}
                            </div>
                            <div class="col-xl-6 d-flex justify-content-end align-self-center">
                                <div class="cursor-pointer" @click="RemoveFileLaporan()">
                                    <em class="fa fa-times"></em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanSetUploadReport()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                @click="SetUploadReport()">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Ubah Lampiran -->
        <b-modal id="Modal_UbahLampiran" ref="Modal_UbahLampiran" modal-class="modal-dsa" centered hide-footer
            no-close-on-esc no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Ubah Lampiran
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Pilih File
                        </label>
                        <div class="form-control-image" @dragover.prevent @drop.prevent
                            @drop="HandleFileDropUploadLampiran($event)">
                            <img src="/icon/form/upload.svg">
                            <div class="font-size-16">
                                <span class="text-dsa-secondary font-weight-400">
                                    Drag file disini, atau
                                </span>
                                <span class="text-dsa-danger font-weight-600 cursor-pointer"
                                    @click="TriggerUploadLampiran()">
                                    pilih file
                                </span>
                            </div>
                            <input type="file" class="d-none" id="trigger-upload-lampiran"
                                @change="HandleFileUploadLampiran($event)">
                        </div>
                    </div>

                    <div class="alert alert-success" role="alert" v-if="PreviewFileLampiran !== null">
                        <div class="row">
                            <div class="col-xl-6 d-flex justify-content-start">
                                {{ PreviewFileLampiran }}
                            </div>
                            <div class="col-xl-6 d-flex justify-content-end align-self-center">
                                <div class="cursor-pointer" @click="RemoveFileLampiran()">
                                    <em class="fa fa-times"></em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanSetUploadLampiran()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                @click="SetUploadLampiran()" :disabled="PreviewFileLampiran === null">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>


        <!-- Modal Ubah Laporan -->
        <b-modal id="Modal_UbahLaporan" ref="Modal_UbahLaporan" modal-class="modal-dsa" centered hide-footer no-close-on-esc
            no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Ubah Laporan
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Pilih File
                        </label>
                        <div class="form-control-image" @dragover.prevent @drop.prevent
                            @drop="HandleFileDropUploadUbahLaporan($event)">
                            <img src="/icon/form/upload.svg">
                            <div class="font-size-16">
                                <span class="text-dsa-secondary font-weight-400">
                                    Drag file disini, atau
                                </span>
                                <span class="text-dsa-danger font-weight-600 cursor-pointer"
                                    @click="TriggerUploadUbahLaporan()">
                                    pilih file
                                </span>
                            </div>
                            <input type="file" class="d-none" id="trigger-upload-ubah-laporan"
                                @change="HandleFileUploadUbahLaporan($event)">
                        </div>
                    </div>

                    <div class="alert alert-success" role="alert" v-if="PreviewFileUbahLaporan !== null">
                        <div class="row">
                            <div class="col-xl-6 d-flex justify-content-start">
                                {{ PreviewFileUbahLaporan }}
                            </div>
                            <div class="col-xl-6 d-flex justify-content-end align-self-center">
                                <div class="cursor-pointer" @click="RemoveFileUbahLaporan()">
                                    <em class="fa fa-times"></em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="ModalBatalkanSetUploadUbahLaporan()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                @click="SetUploadUbahLaporan()" :disabled="PreviewFileUbahLaporan === null">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Tolak Pengajuan -->
        <b-modal id="Modal_TolakPengajuan" ref="Modal_TolakPengajuan" modal-class="modal-dsa" centered hide-footer
            hide-header size="lg">
            <template #default="">
                <form class="px-4 py-3">
                    <div class="font-size-32 font-weight-600 text-center" style="color: #3B3D39;">
                        Mengapa Anda
                        <p class="mb-">
                            Mengajukan Penolakan?
                        </p>
                    </div>

                    <div class="reason" v-for="(item, index) of Data.Reason.message" :key="index"
                        @click="selectReasonPenolakan(item.title, index)" :class="'reason' + index">
                        <div class="row d-flex align-items-center">
                            <div class="col-auto d-flex align-items-center">
                                <span class="circle">
                                </span>
                                <span class="circle active">
                                </span>
                            </div>
                            <div class="col pl-1">
                                <label class="font-size-20 font-weight-400 mb-0 cursor-pointer" style="color: #3B3D39;">
                                    {{ item.title }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="any-reason d-none">
                        <div class="form-group">
                            <label class="form-label">
                                Catatan
                            </label>
                            <textarea rows="4" class="form-control" v-model="Data.Reason.remark"></textarea>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 d-flex justify-content-end">
                            <button type="button" class="btn btn-dsa-outline-primary mr-2 px-4" style="height: 48px;"
                                @click="$bvModal.hide('Modal_TolakPengajuan');">
                                Batalkan
                            </button>
                            <button type="button" class="btn btn-dsa-primary ml-2" style="height: 48px;"
                                :disabled="Data.Reason.remark === null" @click="ConfirmPenolakan()">
                                Submit Penolakan
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Proses Perbaikan -->
        <b-modal v-model="modalInfoRevisi" modal-class="modal-dsa" centered hide-footer no-close-on-esc
            no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Info Perbaikan
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 font-weight-600 text-dsa-black">
                            Silahkan masukkan informasi perbaikan perihal data pengajuan kepada pemohon
                        </label>
                        <textarea class="form-control border" rows="4" v-model="infoRevisi"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="handleInfoRevisi()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                :disabled="infoRevisi === null" @click="setRevisi()">
                                Kirim
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

        <!-- Modal Dropdown Status -->
        <b-modal v-model="noteChangedStatus.open" modal-class="modal-dsa" body-class="modal-status" size="md" centered
            hide-footer hide-header no-close-on-esc no-close-on-backdrop>
            <form class="note-status">
                <div class="form-group form-dsa">
                    <label class="title">
                        Mengapa Anda Mengubah Tahapan?
                    </label>
                    <b-form-radio-group v-model="noteChangedStatus.data.radioNote" name="note-status">
                        <b-form-radio v-for="(item, index) in noteChangedStatus.noteItem" :key="index" :value="item.value"
                            :class="{ 'checked': item.value === noteChangedStatus.data.radioNote }">
                            {{ item.text }}
                        </b-form-radio>
                    </b-form-radio-group>
                    <div v-if="noteChangedStatus.data.radioNote === 'others'" class="other-note">
                        <label>Catatan</label>
                        <textarea class="form-control border" rows="4" v-model="dynamicStatus.note">
                        </textarea>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <div>
                        <button type="button" class="btn btn-dsa-outline-primary w-100" @click="handleNoteStatus()">
                            Batalkan
                        </button>
                    </div>
                    <div class="ml-2">
                        <button type="button" class="btn btn-dsa-primary w-100" :disabled="disableSubmitStatus"
                            @click="submitStatus()">
                            Ubah Tahapan
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>

        <!-- Modal Add Attachment -->
        <b-modal v-model="addAttachment.open" modal-class="modal-dsa" centered hide-footer no-close-on-esc>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    Tambah file baru
                </label>
            </template>
            <template #default="">
                <div class="upload-lampiran" @dragover.prevent @drop.prevent @drop="handleFileDropUpload($event)">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <img src="/v3/Portal/assets/icon/PENGAJUAN_UPLOAD_LAYANAN.svg" />
                        </div>
                        <div class="col-auto d-flex align-items-center">
                            <div>
                                <p class="click-upload" @click="handleFileUpload()">
                                    Klik atau drop file untuk upload file
                                </p>
                                <label class="information-max-upload">
                                    Maximal file size 25 MB
                                </label>
                            </div>
                            <input type="file" class="d-none" id="inputFileLampiran"
                                @change="onChangeNewFileUpload($event)" />
                        </div>
                    </div>
                </div>
                <div class="error-upload">
                    <label class="max-file" v-if="addAttachment.isError.maxFile">
                        File melebihi kapasitas, maks 25 MB.
                    </label>
                </div>
                <div class="row">
                    <div class="col-xl-12" v-for="(item, index) of addAttachment.list" :key="index">
                        <div class="file-lampiran">
                            <div class="row">
                                <div class="col">
                                    <div class="list-file-lampiran">
                                        <div class="row">
                                            <div class="col-auto d-flex align-items-center">
                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_UPLOAD_FILE.svg" />
                                            </div>
                                            <div class="col">
                                                <p class="file-name">
                                                    {{ item.file.name }}
                                                </p>
                                                <label class="file-size" v-if="!item.additional.isLoading">
                                                    {{ item.file.file_size || item.file.size | formatSize }}
                                                </label>
                                                <div class="file-progress" v-if="item.additional.isLoading">
                                                    <b-progress :value="item.additional.isLoadingPercentage">
                                                    </b-progress>
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
        </b-modal>
    </div>
</template>

<script>
import mixins from '@/plugins/mixins.js';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Swal from 'sweetalert2';
import moment from 'moment';
import {
    required,
    maxLength,
    minLength
} from 'vuelidate/lib/validators';
import { LIST_REQUEST_STATUS } from '../../../../static/config/constant';

export default {
    layout: 'cms/default',
    mixins: [mixins],
    components: {
        DatePicker
    },
    data() {
        return {
            VDatePickerConfig: {
                color: 'red',
                titlePosition: 'left',
            },
            module: '',
            isJadwalPemaparan: false,
            setJadwalPengujianStart: '',
            setJadwalPengujianEnd: '',
            setJadwalPemaparan: null,
            setInfo: null,
            imgFile: null,
            StatisticImgFile: null,
            StatisticImg: null,

            PreviewimgFile: null,

            PreviewFileLaporan: null,
            FileLaporan: null,

            PreviewFileUbahLaporan: null,
            FileUbahLaporan: null,

            PreviewFileLampiran: null,
            FileLampiran: [],

            Form: {
                surveyId: null
            },
            Data: {
                DetailPengajuan: {
                    id: '',
                    nama_pengajuan: '',
                    product_name: '',
                    product_photo: '',
                    product_test_type: '',
                    product_sub_test_type: '',
                    product_link: '',
                    product_description: '',
                    service_id: '',
                    status: '',
                    created_at: '',
                    updated_at: '',
                    attachment_requirement: '',
                    requested_by: {},
                    checked_by: {},
                    finished_at: '',
                    revenue: '',
                    micro_impact: '',
                    mega_impact: '',
                    unit: '',
                    tribe: '',
                    // product: '',
                    service: {},
                    history: [],
                    attachment: [],
                    product:[],
                    statistic: [],
                    report: [],
                    status_name: '',
                    status_spv: '',
                    status_user: '',
                    labelValue: [],
                    is_priority: false,
                    platform_type: '',
                    detail_feature_upgrade: '',
                    is_gtm_bundle:null,
                    legion_notes:null,
                    is_legion_standard:false,
                    service_name:null,
                },
                SLA: {
                    id: '',
                    type: '',
                    phase_1: '',
                    phase_2: '',
                    phase_3: '',
                    phase_4: '',
                    created_at: '',
                    created_by: '',
                    updated_at: '',
                    updated_by: '',
                    object_service: '',
                    total: ''
                },
                MiniSurvey: [],
                DueDate: {
                    phase_1: null,
                    phase_2: null,
                    phase_3: null,
                    phase_4: null,
                    date: null
                },
                CurrentPhase: null,
                CurrentStatusService: null,
                User: {},
                UploadFile: {
                    Lampiran: []
                },
                Reason: {
                    message: [{
                        title: 'Terdapat kesalahan pada detail produk'
                    },
                    {
                        title: 'Terdapat kesalahan pada lampiran produk'
                    },
                    {
                        title: 'Lainnya'
                    }
                    ],
                    remark: null
                }
            },
            IsEditLampiran: false,
            IdDeleteLampiran: null,
            IdDeleteUbahLaporan: null,
            IsCollapse: false,
            stepStatus: [],
            currentStep: null,
            modalInfoRevisi: false,
            infoRevisi: null,
            listStatus: [],
            openStatus: false,
            dynamicStatus: {
                statusName: null,
                note: null
            },
            noteChangedStatus: {
                data: {
                    radioNote: null,
                },
                open: false,
                noteItem: [
                    {
                        text: "Terdapat kesalahan pada detail produk",
                        value: "Terdapat kesalahan pada detail produk",
                    },
                    {
                        text: "Terdapat kesalahan pada lampiran produk",
                        value: "Terdapat kesalahan pada lampiran produk"
                    },
                    {
                        text: "Lainnya",
                        value: "others"
                    }
                ]
            },
            productDetail: {
                product: null,
                request_name: null,
                product_description: null,
                unit: null,
                version: null,
                revenue: null,
                impact: null,
                service_id: null,
                asignee: null,
                label: [],
                is_priority: false,
                platform_type: null,
                detail_feature_upgrade: null,
                is_gtm_bundle:null,
                is_legion_standard: null,
                legion_notes:null,
                service_name:null,
            },
            isUpdateDetail: false,
            listService: [],
            listProduct: [],
            listTribe:[],
            value: [],
                platform: [ {
                    id: 'Mobile',
                    label: 'Mobile',
                        children: [ {
                            id: 'Android',
                            label: 'Android'
                        }, {
                            id: 'Ios',
                            label: 'Ios',
                        }],
                    }, {
                        id: 'Web Apps',
                        label: 'Web Apps',
                    }, {
                        id: 'Desktop',
                        label: 'Desktop',
                }],
            addAttachment: {
                open: false,
                list: [],
                file: null,
                isError: {
                    maxFile: false
                }
            },

        }
    },
    computed: {
        lessStep() {
            return (status) => {
                let status_index = this.stepStatus.find((item) => item.status_name === status).step;
                return this.currentStatus < status_index;
            }
        },
        disableSubmitStatus() {
            if (this.noteChangedStatus.data.radioNote === "others") {
                return this.dynamicStatus.note === null;
            } else {
                return this.noteChangedStatus.data.radioNote === null;
            }
        },
        showSetSchedule() {
            return this.Data.DetailPengajuan.statusName === 'VERIFIKASI_DATA_PENGAJUAN' || this.Data.DetailPengajuan.statusName === 'JADWAL_PEMAPARAN' || this.Data.DetailPengajuan.statusName === 'PROSES_PENGUJIAN';
        },
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
        'setJadwalPengujianStart'() {
            this.setJadwalPengujianEnd = '';
        },
        'noteChangedStatus.data.radioNote'() {
            if (this.noteChangedStatus.data.radioNote !== "others") {
                this.dynamicStatus.note = this.noteChangedStatus.data.radioNote;
            } else {
                this.dynamicStatus.note = null;
            }
        }
    },
    validations: {
        Form: {
            surveyId: {
                required
            }
        },
        productDetail: {
            product: {
                required
            },
            request_name: {
                required,
                maxLength: maxLength(50),
                minLength: minLength(3)
            },
            platform_type: {
                required
            },
            product_description: {
                required,
                maxLength: maxLength(100),
                minLength: minLength(3)
            },
            unit: {},
            version: {},
            revenue: {
                maxLength: maxLength(100),
                minLength: minLength(3)
            },
            detail_feature_upgrade: {
                maxLength: maxLength(100),
                minLength: minLength(3)
            },
            service_name: {
                maxLength: maxLength(100),
                minLength: minLength(3)
            },
            is_priority: {
                required
            },
            service_id: {
                required
            },
            asignee: {},
            label: {}
        }
    },
    created() {
        this.stepStatus = LIST_REQUEST_STATUS;
    },
    mounted() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Daftar Pengajuan Layanan',
            menu: [{
                menuTitle: 'Data Pengajuan',
                menuURL: '/manage/data-pengajuan',
                menuIsRedirect: true,
                menuIsTextColor: 'danger',
            },
            {
                menuTitle: 'Detail Pengajuan',
                menuURL: '',
                menuIsRedirect: false,
                menuIsTextColor: 'secondary',
            }
            ]
        }]);
        this.Data.User = this.UserLogin();
        this.getStatusList();
        this.GetDetailRequest();
        this.getService();
        this.getProduct();
        this.GetTribe();
        // this.GetAttachment();
    },
    methods: {
        async GetDetailRequest() {
            
            const Id = this.$route.params.id;
            await this.Request('GET', '/api/v3/request/' + Id, null, null, 'BASIC', (callback) => {
                if (callback.code === 200) {
                    if (callback.content.length > 0) {
                        for (let x of callback.content) {
                            this.Data.DetailPengajuan = {
                                ...x,
                                labelValue: x.label ? x.label.split(", ") : []
                            };
                            
                            // Form Edit Product Detail
                            this.productDetail.product = x.product_id;
                            this.productDetail.request_name = x.nama_pengajuan;
                            this.productDetail.product_description = x.product_description;
                            this.productDetail.unit = x.unit !== "null" ? x.unit : null
                            this.productDetail.version = x.versi !== "null" ? x.versi : null;
                            this.productDetail.revenue = x.revenue !== "null" ? x.revenue : null;
                            this.productDetail.impact = x.micro_impact !== "null" ? x.micro_impact : null;
                            this.productDetail.service_id = x.service_id;
                            this.productDetail.asignee = x.peserta !== "null" ? x.peserta : null;
                            this.productDetail.platform_type = x.platform_type;
                            this.productDetail.detail_feature_upgrade = x.detail_feature_upgrade;
                            this.productDetail.is_priority = x.is_priority;
                            this.productDetail.is_gtm_bundle = x.is_gtm_bundle;
                            this.productDetail.service_name = x.service_name;
                            if (x.label || x.label !== "null") {
                                this.productDetail.label = x.label ? x.label.split(", ") : null;
                            }
                        };
                        this.currentStatus = this.stepStatus.find((item) => item.status_name === this.Data.DetailPengajuan.statusName).step;
                    };
                    this.GetSLA();
                } else {
                    this.HelperErrorCode(callback);
                };
            });
        },
        async GetSLA() {
            const service = this.HelperConvertService(this.Data.DetailPengajuan.service);
            await this.Request('GET', '/api/v3/sla2/' + service, null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    for (let x of callback.content) {
                        this.Data.SLA = x;
                    };
                    this.FindDueDate();
                };
            });
        },
        async GetSLAMiniSurvey() {
            await this.Request('GET', '/api/v3/mini-survey2', null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    this.Data.MiniSurvey = callback.content;
                };
            });
        },
        nextStep(step) {
            switch (step) {
                case 'SUBMIT_DATA_PENGAJUAN':
                    this.setJadwalPemaparan = null;
                    this.Data.DetailPengajuan.statusName = 'VERIFIKASI_DATA_PENGAJUAN';
                    break;
                case 'VERIFIKASI_DATA_PENGAJUAN':
                    this.Data.DetailPengajuan.statusName = 'JADWAL_PEMAPARAN';
                    break;
                case 'JADWAL_PEMAPARAN':
                    this.Data.DetailPengajuan.statusName = 'PROSES_PENGUJIAN';
                    break;
                case 'PROSES_PENGUJIAN':
                    this.Data.DetailPengajuan.statusName = 'LAPORAN_PENGUJIAN';
                    break;
                case 'LAPORAN_PENGUJIAN':
                    this.Data.DetailPengajuan.statusName = 'SELESAI';
                    break;
            }
        },
        GetTribe() {
            this.Request('GET', '/api/v3/tribe', null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    this.listTribe = callback.content.map((tribe) => {
                        return {
                            id: tribe.id,
                            label: tribe.name, 
                        };
                    });
                } else {
                    this.HelperErrorCode(callback);
                }
            });
        },
        SetVerification() {
            this.Data.CurrentPhase = 1;

            let dueDate = new Date(this.Data.DetailPengajuan.created_at);
            dueDate.setHours(0, 0, 0, 0);
            dueDate.setDate(dueDate.getDate() + this.Data.SLA.phase_1);
            this.Data.DueDate.phase_1 = dueDate;

            let verificationDate = new Date();
            verificationDate.setHours(0, 0, 0, 0);

            if (verificationDate > dueDate) {
                this.GetSLAMiniSurvey();
                this.Form.surveyId = null;
                this.$bvModal.show('Modal_ReasonMiniSurvey');
            } else {
                this.ConfirmVerification();
            };

        },

        HelperConfirmVerificationPriority(text) {
            let swal = Swal.fire({
                icon: 'question',
                title: 'Apakah anda yakin',
                text: text,
                input: 'checkbox',
                inputValue: 0,
                inputPlaceholder: 'Pastikan anda telah melakukan validasi <b> Justifikasi </b>',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                inputValidator: (result) => {
                    return !result && 'Anda perluh checklist validasi Justifikasi '
                }
            });

            return swal;
        },

        HelperDataPengajuanPriority(messageConfirm, body, APIDataPengajuan, bodyReason, messageSuccess, callbackAfterSuccess) {
            this.HelperConfirmVerificationPriority(messageConfirm).then((result) => {
                if (result.isConfirmed) {
                    this.Request('POST', APIDataPengajuan, null, body, 'BASIC', (
                        callback) => {
                        if (callback.code === 200) {
                            this.HelperSLARequestHistory(bodyReason);
                            this.HelperSuccessCode('', messageSuccess).then((result) => {
                                return callbackAfterSuccess(result);
                            });
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });
                };
            });
        },
        ConfirmVerification() {
            let body = {
                id: this.Data.DetailPengajuan.id,
                user_id: this.Data.User.id
            };

            let bodyReason = {
                request_id: this.Data.DetailPengajuan.id,
                phase: this.Data.CurrentPhase,
                due_date: this.HelperConvertDate(this.Data.DueDate.phase_1),
                submitted_date: this.HelperConvertDate(new Date()),
                survey_id: this.Form.surveyId,
                type: this.HelperConvertService(this.Data.DetailPengajuan.service),
                isDue: this.Form.surveyId === null ? true : false
            };


            if (this.Form.surveyId === null) {
                delete bodyReason.survey_id;
            };

            if (this.Data.DetailPengajuan.is_priority === true) {
                this.HelperDataPengajuanPriority('akan menverifikasi pengajuan prioritas ini?', body,
                    '/api/v3/request/verification', bodyReason, 'verifikasi', (callback) => {
                        if (callback.isConfirmed) {
                            this.GetDetailRequest();
                            this.$bvModal.hide('Modal_ReasonMiniSurvey');
                        };
                    });
            } else {
                this.HelperDataPengajuan('akan menverifikasi pengajuan ini?', body,
                    '/api/v3/request/verification', bodyReason, 'verifikasi', (callback) => {
                        if (callback.isConfirmed) {
                            this.GetDetailRequest();
                            this.$bvModal.hide('Modal_ReasonMiniSurvey');
                        };
                    });
            };
        },
        SetRequestSchedule() {
            this.Data.CurrentPhase = 2;

            let dueDate = new Date(this.Data.DetailPengajuan.updated_at);
            dueDate.setHours(0, 0, 0, 0);
            dueDate.setDate(dueDate.getDate() + this.Data.SLA.phase_2);
            this.Data.DueDate.phase_2 = dueDate;

            let verificationDate = new Date(this.setJadwalPemaparan);
            verificationDate.setHours(0, 0, 0, 0);

            if (verificationDate > dueDate) {
                this.GetSLAMiniSurvey();
                this.Form.surveyId = null;
                this.$bvModal.show('Modal_ReasonMiniSurvey');
            } else {
                this.ConfirmRequestSchedule();
            };

        },
        ConfirmRequestSchedule() {
            let body = {
                created_by: this.Data.User.id,
                date: this.HelperConvertDate(this.setJadwalPemaparan),
                request_id: this.Data.DetailPengajuan.id,
            };

            let bodyReason = {
                request_id: this.Data.DetailPengajuan.id,
                phase: this.Data.CurrentPhase,
                due_date: this.HelperConvertDate(this.Data.DueDate.phase_2),
                submitted_date: this.HelperConvertDate(new Date()),
                survey_id: this.Form.surveyId,
                type: this.HelperConvertService(this.Data.DetailPengajuan.service),
                isDue: this.Form.surveyId === null ? true : false
            };

            if (this.Form.surveyId === null) {
                delete bodyReason.survey_id;
            };

            this.HelperDataPengajuan('akan menjadwalkan pengajuan ini?', body,
                '/api/v3/request-schedule/create', bodyReason, 'jadwalkan', (callback) => {
                    if (callback.isConfirmed) {
                        this.setJadwalPemaparan = null;
                        this.GetDetailRequest();
                        this.$bvModal.hide('Modal_ReasonMiniSurvey');
                    };
                });
        },
        SetOnProcess() {
            this.Data.CurrentPhase = 3;

            let dueDate = new Date(this.Data.DetailPengajuan.updated_at);
            dueDate.setHours(0, 0, 0, 0);
            dueDate.setDate(dueDate.getDate() + this.Data.SLA.phase_3);
            this.Data.DueDate.phase_3 = dueDate;

            let verificationDateStart = new Date(this.setJadwalPengujianStart);
            let verificationDateEnd = new Date(this.setJadwalPengujianEnd);
            verificationDateStart.setHours(0, 0, 0, 0);
            verificationDateEnd.setHours(0, 0, 0, 0);

            if (verificationDateStart > dueDate || verificationDateEnd > dueDate) {
                this.GetSLAMiniSurvey();
                this.Form.surveyId = null;
                this.$bvModal.hide('Modal_ProsesPengujian');
                this.$bvModal.show('Modal_ReasonMiniSurvey');
            } else {
                this.ConfirmOnProcess();
            };

        },
        ConfirmOnProcess() {
            let body = {
                date: this.HelperConvertDate(this.setJadwalPengujianStart),
                date_end: this.HelperConvertDate(this.setJadwalPengujianEnd),
                id: this.Data.DetailPengajuan.id,
                user_id: this.Data.User.id
            };

            let bodyReason = {
                request_id: this.Data.DetailPengajuan.id,
                phase: this.Data.CurrentPhase,
                due_date: this.HelperConvertDate(this.Data.DueDate.phase_3),
                submitted_date: this.HelperConvertDate(new Date()),
                survey_id: this.Form.surveyId,
                type: this.HelperConvertService(this.Data.DetailPengajuan.service),
                isDue: this.Form.surveyId === null ? true : false
            };

            if (this.Form.surveyId === null) {
                delete bodyReason.survey_id;
            };

            this.HelperDataPengajuan('akan memulai proses pengajuan ini?', body,
                '/api/v3/request/setOnProcess', bodyReason, 'memulai', (callback) => {
                    if (callback.isConfirmed) {
                        this.GetDetailRequest();
                        this.ModalBatalkanSetOnProcess();
                        this.$bvModal.hide('Modal_ReasonMiniSurvey');
                    };
                });
        },
        ModalBatalkanSetOnProcess() {
            this.setJadwalPengujianStart = '';
            this.setJadwalPengujianEnd = '';
            this.$bvModal.hide('Modal_ProsesPengujian');
        },
        SetInfo() {
            this.swal('confirm-pengajuan', 'akan mengirim info kepada pemohon?').then((result) => {
                if (result.isConfirmed) {
                    const param = {
                        id: this.Data.DetailPengajuan.id,
                        info: this.setInfo,
                        status: this.Data.DetailPengajuan.statusName,
                        user_id: this.Data.User.id
                    };
                    this.POST(`/api/v3/request/setInfo`, param, 'BASIC', (data) => {
                        if (data.code === 200) {
                            this.setInfo = null;
                            this.GetDetailRequest();
                            this.$bvModal.hide('Modal_KirimInfo');
                            this.SwalSuccess('Informasi anda telah disumbit kepada pemohon', '');
                        }

                        if (data.code === 409) {
                            this.SwalSuccess('Gagal sumbit Informasi kepada pemohon', '');
                        }
                    });
                }
            });
        },
        ModalBatalkanSetInfo() {
            this.setInfo = null;
            this.$bvModal.hide('Modal_KirimInfo');
        },
        SetSelesai() {
            this.Data.CurrentPhase = 4;

            let dueDate = new Date(this.Data.DetailPengajuan.updated_at);
            dueDate.setHours(0, 0, 0, 0);
            dueDate.setDate(dueDate.getDate() + this.Data.SLA.phase_4);
            this.Data.DueDate.phase_4 = dueDate;

            let verificationDate = new Date();
            verificationDate.setHours(0, 0, 0, 0);

            if (verificationDate > dueDate) {
                this.GetSLAMiniSurvey();
                this.Form.surveyId = null;
                this.$refs['Modal_ReasonMiniSurvey'].show();
            } else {
                this.ConfirmSetSelesai();
            };

        },
        ConfirmSetSelesai() {
            let body = {
                id: this.Data.DetailPengajuan.id,
                status: 'LAPORAN_PENGUJIAN',
                user_id: this.Data.User.id
            };

            let bodyReason = {
                request_id: this.Data.DetailPengajuan.id,
                phase: this.Data.CurrentPhase,
                due_date: this.HelperConvertDate(this.Data.DueDate.phase_3),
                submitted_date: this.HelperConvertDate(new Date()),
                survey_id: this.Form.surveyId,
                type: this.HelperConvertService(this.Data.DetailPengajuan.service),
                isDue: this.Form.surveyId === null ? true : false
            };

            if (this.Form.surveyId === null) {
                delete bodyReason.survey_id;
            };

            this.HelperDataPengajuan('akan menyelesaikan pengajuan ini?', body,
                '/api/v3/request/setSelesai', bodyReason, 'selesai', (callback) => {
                    if (callback.isConfirmed) {
                        this.GetDetailRequest();
                        this.$refs['Modal_ReasonMiniSurvey'].hide();
                    };
                });
        },
        SetAsDone() {
            const param = {
                id: this.Data.DetailPengajuan.id,
                user_id: this.Data.User.id
            };
            this.POST(`/api/v3/request/setAsDone`, param, 'BASIC', (data) => {
                if (data.code === 200) {
                    this.GetDetailRequest();
                    // this.SwalSuccess('Berhasil mengupload report', '');
                }

                if (data.code === 409) {
                    // this.SwalSuccess('Gagal mengupload report', '');
                }
            });
        },
        Reject() {
            this.swal('confirm-pengajuan', 'akan membatalkan pengajuan ini?').then((result) => {
                if (result.isConfirmed) {
                    const param = {
                        id: this.Data.DetailPengajuan.id,
                        user_id: this.Data.User.id
                    };
                    this.POST(`/api/v3/request/reject`, param, 'BASIC', (data) => {
                        if (data.code === 200) {
                            this.GetDetailRequest();
                            this.SwalSuccess('Data pengajuan telah dibatalkan', '');
                        }

                        if (data.code === 409) {
                            this.SwalSuccess('Gagal membatalkan data pengajuan', '');
                        }
                    });
                }
            });
        },
        ConfirmReason() {
            this.$refs['Modal_ReasonMiniSurvey'].hide();
            if (this.Data.CurrentPhase === 1) {
                this.ConfirmVerification();
            } else if (this.Data.CurrentPhase === 2) {
                this.ConfirmRequestSchedule();
            } else if (this.Data.CurrentPhase === 3) {
                this.ConfirmOnProcess();
            } else {
                this.ConfirmSetSelesai();
            }
        },
        ModalBatalkanConfirmReason() {
            this.$refs['Modal_ReasonMiniSurvey'].hide();
            this.Form.surveyId = null;
        },
        HandleFileDropUploadLaporan(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(file => {
                this.FileLaporan = file;
                this.PreviewFileLaporan = file.name;
            });
        },
        TriggerUploadLaporan() {
            this.$nextTick(function () {
                document.getElementById('trigger-upload-laporan').click();
            });
        },
        HandleFileUploadLaporan(e) {
            const file = e.target.files[0];
            this.FileLaporan = file;
            this.PreviewFileLaporan = file.name;
        },
        RemoveFileLaporan() {
            document.getElementById('trigger-upload-laporan').value = '';
            this.FileLaporan = null;
            this.PreviewFileLaporan = null;
        },
        SetUploadReport() {
            this.swal('confirm-pengajuan', 'akan mengupload report?').then((result) => {
                if (result.isConfirmed) {
                    const fd = new FormData();
                    fd.append('request_id', this.Data.DetailPengajuan.id);
                    fd.append('name', this.PreviewFileLaporan);
                    fd.append('description', 'Laporan Pengujian');
                    fd.append('path', this.FileLaporan);
                    fd.append('created_by', this.Data.User.id);
                    this.POST(`/api/v3/request-report/create`, fd, 'BASIC', (data) => {
                        if (data.code === 200) {
                            this.setInfo = null;
                            this.GetDetailRequest();
                            // this.SetAsDone();
                            this.SwalSuccess('Berhasil mengupload report', '');
                            this.$refs['Modal_SubmitLaporan'].hide();
                        }

                        if (data.code === 409) {
                            this.SwalSuccess('Gagal mengupload report', '');
                        }
                    });
                }
            });
        },
        ModalBatalkanSetUploadReport() {
            this.FileLaporan = null;
            this.PreviewFileLaporan = null;
            this.$refs['Modal_SubmitLaporan'].hide();
        },
        ModalUbahLaporan(item) {
            this.IdDeleteUbahLaporan = item;
            this.$bvModal.show('Modal_UbahLaporan')
        },
        HandleFileDropUploadUbahLaporan(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(file => {
                this.FileUbahLaporan = file;
                this.PreviewFileUbahLaporan = file.name;
            });
        },
        TriggerUploadUbahLaporan() {
            this.$nextTick(function () {
                document.getElementById('trigger-upload-ubah-laporan').click();
            });
        },
        HandleFileUploadUbahLaporan(e) {
            const file = e.target.files[0];
            this.FileUbahLaporan = file;
            this.PreviewFileUbahLaporan = file.name;
        },
        RemoveFileUbahLaporan() {
            document.getElementById('trigger-upload-ubah-laporan').value = '';
            this.FileUbahLaporan = null;
            this.PreviewFileUbahLaporan = null;
        },
        SetUploadUbahLaporan() {
            this.swal('confirm-pengajuan', 'akan merubah laporan?').then((result) => {
                if (result.isConfirmed) {
                    const fd = new FormData();
                    fd.append('id', this.IdDeleteUbahLaporan.id);
                    this.Request('DELETE', '/api/v3/request-report/remove', null, fd, 'BASIC', (
                        callback) => {
                        if (callback.code === 200) {
                            const fd = new FormData();
                            fd.append('request_id', this.Data.DetailPengajuan.id);
                            fd.append('name', this.PreviewFileUbahLaporan);
                            fd.append('description', 'Laporan Pengujian');
                            fd.append('path', this.FileUbahLaporan);
                            fd.append('created_by', this.Data.User.id);
                            this.POST(`/api/v3/request-report/create`, fd, 'BASIC',
                                (data) => {
                                    this.IdDeleteLaporan = null;
                                    this.GetDetailRequest();
                                    // this.SetAsDone();
                                    this.ModalBatalkanSetUploadUbahLaporan();
                                });
                        }
                    });

                }
            });
        },
        ModalBatalkanSetUploadUbahLaporan() {
            this.FileUbahLaporan = null;
            this.PreviewFileUbahLaporan = null;
            this.$refs['Modal_UbahLaporan'].hide();
        },
        ModalUbahLampiran(item) {
            this.IdDeleteLampiran = item;
            this.$bvModal.show('Modal_UbahLampiran')
        },
        HandleFileDropUploadLampiran(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(file => {
                this.FileLampiran = file;
                this.PreviewFileLampiran = file.name;
            });
        },
        TriggerUploadLampiran() {
            this.$nextTick(function () {
                document.getElementById('trigger-upload-lampiran').click();
            });
        },
        HandleFileUploadLampiran(e) {
            for (let x of e.target.files) {
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
                    this.PreviewFileLampiran = x.name;
                    this.FileLampiran.push(x);
                }
            }
        },
        RemoveFileLampiran() {
            document.getElementById('trigger-upload-lampiran').value = '';
            this.FileLampiran = [];
            this.PreviewFileLampiran = null;
        },
        SetUploadLampiran() {
            this.swal('confirm-pengajuan', 'akan merubah lampiran?').then((result) => {
                if (result.isConfirmed) {
                    const fd = new FormData();
                    fd.append('id', this.IdDeleteLampiran.id);
                    this.Request('DELETE', '/api/v3/request-attachment/remove', null, fd, 'BASIC', (
                        callback) => {
                        if (callback.code === 200) {
                            this.FileLampiran.forEach((item, index) => {
                                const fd = new FormData();
                                fd.append('request_id', this.Data.DetailPengajuan.id);
                                fd.append('name', item.name);
                                fd.append('imgFile', item);
                                fd.append('type', item.type);
                                fd.append('file_type', 'lampiran');
                                fd.append('service', this.Data.DetailPengajuan.service.id);
                                fd.append('product_name', this.Data.DetailPengajuan.product_name);
                                this.POST(`/api/v3/request-attachment/create`, fd, 'BASIC',
                                    (data) => {
                                        this.IdDeleteLampiran = null;
                                        this.GetDetailRequest();
                                        this.ModalBatalkanSetUploadLampiran();
                                    });
                            });
                        }
                    });

                }
            });
        },
        ModalBatalkanSetUploadLampiran() {
            this.FileLampiran = [];
            this.PreviewFileLampiran = null;
            this.$refs['Modal_UbahLampiran'].hide();
        },
        FindDueDate() {
            this.Data.DueDate.date = null;
            this.Data.CurrentStatusService = null;

            switch (this.Data.DetailPengajuan.statusName) {
                case 'SUBMIT_DATA_PENGAJUAN':
                    let dueDate3 = new Date(this.Data.DetailPengajuan.created_at);
                    dueDate3.setHours(0, 0, 0, 0);
                    dueDate3.setDate(dueDate3.getDate() + this.Data.SLA.phase_1);
                    this.Data.DueDate.date = dueDate3;
                    this.Data.CurrentStatusService = 'Verifikasi Data Pengajuan';
                    break;
                case 'VERIFIKASI_DATA_PENGAJUAN':
                    let dueDate4 = new Date(this.Data.DetailPengajuan.updated_at);
                    dueDate4.setHours(0, 0, 0, 0);
                    dueDate4.setDate(dueDate4.getDate() + this.Data.SLA.phase_2);
                    this.Data.DueDate.date = dueDate4;
                    this.Data.CurrentStatusService = 'Jadwal Pemaparan';
                    break;
                case 'JADWAL_PEMAPARAN':
                    let dueDate5 = new Date(this.Data.DetailPengajuan.updated_at);
                    dueDate5.setHours(0, 0, 0, 0);
                    dueDate5.setDate(dueDate5.getDate() + this.Data.SLA.phase_3);
                    this.Data.DueDate.date = dueDate5;
                    this.Data.CurrentStatusService = 'Proses Pengujian';
                    break;
                case 'PROSES_PENGUJIAN':
                    let dueDate6 = new Date(this.Data.DetailPengajuan.updated_at);
                    dueDate6.setHours(0, 0, 0, 0);
                    dueDate6.setDate(dueDate6.getDate() + this.Data.SLA.phase_4);
                    this.Data.DueDate.date = dueDate6;
                    this.Data.CurrentStatusService = 'Info Pengujian';
                    break;
            };

        },
        HelperConvertService(service) {
            if (service.slug === 'security-testing') {
                return 'security';
            } else if (service.slug === 'heuristic-evaluation') {
                return 'he';
            } else if (service.slug === 'usability-testing') {
                return 'ut';
            } else if (service.slug === 'software-testing') {
                return 'software';
            } else {
                return 'ak';
            };
        },
        HelperConvertDate(date) {
            return moment(String(date)).format('YYYY-MM-DD');
        },


        tolakPengajuan() {
            this.$bvModal.show('Modal_TolakPengajuan');
        },
        selectReasonPenolakan(remark, index) {
            this.Data.Reason.remark = null

            $('.reason').removeClass('active');
            $('.reason' + index).addClass("active");

            if (remark === 'Lainnya') {
                $('.any-reason').removeClass("d-none");
            } else {
                $('.any-reason').addClass("d-none");
                this.Data.Reason.remark = remark
            }
        },
        ConfirmPenolakan() {
            this.swal('confirm-pengajuan', 'akan menolak pengajuan ini?').then((result) => {
                if (result.isConfirmed) {
                    const param = {
                        id: this.Data.DetailPengajuan.id,
                        status: "PENGAJUAN_DITOLAK",
                        note: this.Data.Reason.remark
                    };
                    this.Request('PUT', `/api/v3/request/create-penolakan`, null, param, 'BASIC', (data) => {
                        if (data.code === 200) {
                            this.setInfo = null;
                            this.GetDetailRequest();
                            this.$bvModal.hide('Modal_TolakPengajuan');
                            this.SwalSuccess('Informasi anda telah disumbit kepada pemohon', '');
                        }
                    });
                }
            });
        },
        handleInfoRevisi() {
            this.infoRevisi = null;
            this.modalInfoRevisi = !this.modalInfoRevisi;
        },
        async setRevisi() {
            this.swal('confirm-pengajuan', 'akan mengubah status pengajuan ini?').then(async (result) => {
                if (result.isConfirmed) {
                    const payload = {
                        statusName: 'PROSES_PERBAIKAN',
                        note: this.infoRevisi
                    };

                    await this.setDynamicStatus(payload);
                    this.handleInfoRevisi();
                }
            });
        },
        async setDynamicStatus(data) {
            const payload = {
                id: this.Data.DetailPengajuan.id,
                user_id: this.Data.User.id,
                statusName: data.statusName,
                note: data.note ? data.note : ""
            }

            await this.Request('POST', `/api/v3/request/change-status-dinamis`, null, payload, 'BASIC', (response) => {
                if (response.code === 200) {
                    this.GetDetailRequest();
                    this.SwalSuccess('Status pengajuan berhasil diubah', '');
                } else {
                    this.SwalError('Status pengajuan gagal diubah', response.message);
                }
            });
        },
        confirmDone() {
            this.swal('confirm-pengajuan', 'akan menyelesaikan pengajuan ini?').then((result) => {
                if (result.isConfirmed) {
                    this.SetAsDone();
                }
            });
        },
        handleDropdownStatus() {
            if (this.Data.DetailPengajuan.statusName !== 'SELESAI') {
                this.openStatus = !this.openStatus;
            }
        },
        getStatusList() {
            this.Request('GET', `/api/v3/request-status/list`, null, null, 'BASIC', (response) => {
                if (response.code === 200) {
                    const except = ['PILIH_LAYANAN', 'INPUT_DATA_PENGAJUAN', 'PENGAJUAN_DIREJECT', 'PENGAJUAN_DITOLAK', 'DRAFT'];
                    for (const item of response.content) {
                        const filterStatus = except.find(e => e === item.status_name);
                        if (!filterStatus) {
                            this.listStatus.push(item);
                        }
                    }
                }
            });
        },
        onSelectStatus(status) {
            this.dynamicStatus.statusName = status;
            this.handleDropdownStatus();
            this.handleNoteStatus();
        },
        handleNoteStatus() {
            this.noteChangedStatus.open = !this.noteChangedStatus.open;
            this.noteChangedStatus.data.radioNote = null;
        },
        async submitStatus() {
            this.swal('confirm-pengajuan', 'akan mengubah status pengajuan ini?').then(async (result) => {
                if (result.isConfirmed) {
                    const payload = {
                        statusName: this.dynamicStatus.statusName,
                        note: this.dynamicStatus.note
                    };

                    await this.setDynamicStatus(payload);
                    this.handleNoteStatus();
                    this.dynamicStatus.statusName = null;
                    this.dynamicStatus.note = null;
                }
            });
        },
        handleUpdateDetail() {
            this.isUpdateDetail = !this.isUpdateDetail;
        },
        getService() {
            this.Request('GET', '/api/v3/service', null, null, 'BASIC', (res) => {
                if (res.code === 200) {
                    this.listService = res.content;
                }
            })
        },
        getProduct() {
            this.Request('GET', '/api/v3/product/list-multiselect', null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    this.listProduct = callback.content;
                };
            });
        },
        submitDetailProduct() {
            this.swal('confirm-pengajuan', 'akan mengubah detail produk pada pengajuan ini?').then(async (result) => {
                if (result.isConfirmed) {
                    const payload = {
                        id: this.Data.DetailPengajuan.id,
                        product_name: this.productDetail.product_name,
                        product_link: this.Data.DetailPengajuan.product_link,
                        product_sub_test_type: this.Data.DetailPengajuan.product_sub_test_type,
                        product_description: this.productDetail.product_description,
                        service_id: this.productDetail.service_id,
                        statusName: this.Data.DetailPengajuan.statusName,
                        unit: this.productDetail.unit,
                        revenue: this.productDetail.revenue ? this.productDetail.revenue : "",
                        micro_impact: this.productDetail.impact ? this.productDetail.impact : "",
                        product_test_type: this.Data.DetailPengajuan.product_test_type,
                        requested_by: this.Data.User.id,
                        product_id: this.productDetail.product,
                        tribe: this.Data.DetailPengajuan.tribe,
                        versi: this.productDetail.version ? this.productDetail.version : "",
                        peserta: this.productDetail.asignee ? this.productDetail.asignee : "",
                        platform_type: this.productDetail.platform_type,
                        is_priority: this.productDetail.is_priority,
                        detail_feature_upgrade: this.productDetail.detail_feature_upgrade ? this.productDetail.detail_feature_upgrade : "",
                        label: this.productDetail.label ? this.productDetail.label.join(", ") : "",
                        is_gtm_bundle: this.productDetail.is_gtm_bundle,
                        legion_notes: this.productDetail.legion_notes,
                        is_legion_standard: this.productDetail.is_legion_standard,
                        service_name: this.productDetail.service_name,
                    }

                    this.Request('PUT', '/api/v3/request/update-confirmation', null, payload, 'BASIC', (res) => {
                        if (res.code === 200) {
                            this.handleUpdateDetail();
                            this.GetDetailRequest();
                            this.SwalSuccess('Status pengajuan berhasil diubah', '');
                        } else {
                            this.SwalError('Detail pengajuan gagal diubah', res.message);
                        }
                    })
                }
            })
        },
        handleAddAttachment() {
            this.addAttachment.open = !this.addAttachment.open;
        },
        handleFileUpload() {
            this.$nextTick(function () {
                document.getElementById('inputFileLampiran').click()
            })
        },
        handleFileDropUpload(e) {
            tthis.addAttachment.isError.maxFile = false;

            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;

            for (let file of droppedFiles) {
                const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                if (fileToMB > 25) {
                    this.handleFileInputReset()
                    this.addAttachment.isError.maxFile = true;
                } else {
                    const costumizeFile = {
                        file: file,
                        additional: {
                            id: null,
                            isLoading: true,
                            isLoadingPercentage: 0
                        }
                    }
                    this.addAttachment.list.push(costumizeFile)
                    this.uploadNewAttachment(costumizeFile);
                }
            }
            this.handleFileInputReset();
        },
        handleFileInputReset() {
            document.getElementById('inputFileLampiran').value = ''
        },
        onChangeNewFileUpload(e) {
            this.addAttachment.isError.maxFile = false;

            let files = e.target.files
            for (let file of files) {
                const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                if (fileToMB > 25) {
                    this.handleFileInputReset()
                    this.addAttachment.isError.maxFile = true;
                } else {
                    const costumizeFile = {
                        file: file,
                        additional: {
                            id: null,
                            isLoading: true,
                            isLoadingPercentage: 0
                        }
                    }
                    this.addAttachment.list.push(costumizeFile)
                    this.uploadNewAttachment(costumizeFile);
                }
            }
            this.handleFileInputReset();
        },
        uploadNewAttachment(file) {
            this.swal('confirm-pengajuan', 'akan mengunggah lampiran ini?').then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData()
                    formData.append('request_id', this.Data.DetailPengajuan.id)
                    formData.append('name', file.file.name)
                    formData.append('imgFile', file.file)
                    formData.append('type', file.file.type)
                    formData.append('file_type', 'lampiran')
                    formData.append('service', this.Data.DetailPengajuan.service_id)
                    formData.append('product_name', this.Data.DetailPengajuan.product_name)

                    this.RequestUploadFile('POST', '/api/v3/request-attachment/create', null, formData, 'BASIC',
                        (progress) => {
                            file.additional.isLoadingPercentage = progress;
                        }, (res) => {
                            if (res.code === 200) {
                                file.additional.isLoading = false;
                                file.additional.id = res.content[0].id;
                                this.SwalSuccess('Lampiran berhasil diunggah', '');
                                this.handleAddAttachment();
                                this.addAttachment.list = [];
                                this.GetDetailRequest();
                            } else {
                                this.addAttachment.list.splice(-1);
                                let error = "";
                                if (typeof res.message === 'object' && res.message.details.length > 0) {
                                    let msg = (res.message.details.map((i) => i.message)).join(", ");
                                    error = msg;
                                } else {
                                    error = res.message ? res.message : 'Lampiran Anda gagal diunggah';
                                }
                                this.SwalError('Lampiran gagal diunggah', error);
                            }
                        }
                    );
                }
            });
        },
        deleteAttachment(id) {
            this.swal('confirm-pengajuan', 'akan menghapus lampiran ini?').then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData()
                    formData.append('id', id)
                    this.Request('DELETE', '/api/v3/request-attachment/remove', null, formData, 'BASIC', (res) => {
                        if (res.code === 200) {
                            this.SwalSuccess('Lampiran berhasil dihapus', '');
                            this.GetDetailRequest();
                        }
                    })
                }
            });
        },
    }
}

</script>

<style>
.kelola-produk{
    color: var(--primary-primary-50, #E42313);
    font-family: Nunito Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
}

.badge-status {
  display: inline-block;
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 6px;
  background: var(--accent-warning-warning-20, #FFEFD2);
  color: var(--accent-warning-warning-50, #FFB020);
}

.submit-data-pengajuan {
    height: 36.1rem;
    max-height: 36.1rem;
}

.verifikasi-data-pengajuan {
    height: 18.5rem;
    max-height: 18.5rem;
}

.jadwal-pemaparan {
    height: 18.7rem;
    max-height: 18.7rem;
}

.proses-pengujian {
    height: 5.5rem;
    max-height: 5.5rem;
}



/* NEW */

#accordion .card .card-header {
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #76B852;
}

#accordion .collapse.show {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-top: 0 !important;
    border: 1px solid #76B852;
}

#headingOne.show {
    border-bottom: 0px solid transparent !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

/* NEW */

.badge-warning-detail {
    background-color: #FFE7D1;
    color: #F2994A;
}

.badge-success-detail {
    background-color: #E0FFD1;
    color: #8DC26F;
}

.badge-danger-detail {
    background-color: #FFF7F7;
    color: #ED2B24;
}


#Modal_UbahLampiran___BV_modal_outer_ /deep/ .modal .modal-content {
    padding: 24px;
}

#Modal_UbahLampiran___BV_modal_outer_ /deep/ .modal .modal-content .modal-header {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
}

#Modal_UbahLampiran___BV_modal_outer_ /deep/ .modal .modal-content .modal-body {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
}

.reason {
    border: 1px solid #F4F4F4;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    margin-bottom: 16px;
}

.reason .circle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid #7F817D;
}

.reason .form-dsa {
    margin-bottom: -7px !important;
}

.reason .circle.active {
    display: none;
}

.reason.active {
    background-color: #ED2B24;
}

.reason.active label {
    color: #FFFFFF !important;
}

.reason.active .circle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid #FFFFFF;
    background-color: #ED2B24;
}

.reason.active .circle.active {
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid #FFFFFF;
    background-color: #ffffff;
    position: absolute;
    right: 17px;
}

.any-reason .form-label {
    font-size: 20px !important;
    font-weight: 600 !important;
    color: #3B3D39 !important;
}

.any-reason textarea {
    font-size: 16px !important;
    font-weight: 400 !important;
    color: #3B3D39 !important;
    border: 1px solid #F4F4F4;
    border-radius: 4px;
    padding-top: 10px;
}

.form-dsa textarea.form-control {
    height: auto;
}

.badge-warning-detail .chevron-status {
    filter: brightness(0) saturate(100%) invert(86%) sepia(19%) saturate(6502%) hue-rotate(325deg) brightness(98%) contrast(93%);
}

.badge-danger-detail .chevron-status {
    filter: brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(2458%) hue-rotate(347deg) brightness(119%) contrast(98%);
}

.dropdown-status {
    cursor: pointer;
    position: relative;
    z-index: 1;
    padding: 8px 12px;
}

.dropdown-status .status-container {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    border: 1px solid #C8CCD2;
    border-radius: 8px;
    margin-top: 8px;
}

.dropdown-status .status-item {
    padding: 12px;
    border-bottom: 1px solid #C8CCD2;
    color: #7F817D;
}

.dropdown-status .status-item:hover {
    background-color: #D9DDE3;
}

.dropdown-status .status-item:last-child {
    border: none;
}

.note-status .title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 24px;
}

.note-status button {
    height: 48px;
}

.note-status .custom-control-input:checked~.custom-control-label::before {
    background-color: #ED2B24;
    border-color: #fff;
}

.note-status .custom-control.custom-control-inline.custom-radio {
    padding: 12px 12px 12px 36px;
    border: 1px solid #F4F4F4;
    border-radius: 4px;
    margin-bottom: 8px;
    width: 100%;
}

.note-status .custom-control.custom-control-inline.custom-radio.checked {
    background-color: #ED2B24;
}

.note-status .custom-control.custom-control-inline.custom-radio.checked .custom-control-label {
    color: #fff;
}

.note-status .custom-control-input:focus~.custom-control-label::before {
    box-shadow: none;
}

.note-status .other-note {
    margin-top: 24px
}

.modal-status {
    padding: 36px;
}

.title-section {
    margin-bottom: 14px;
}

.title-section .section-label {
    margin-bottom: 0;
}

.btn-red-outline {
    border: 1px solid #E42313;
    background-color: #F9E4E4;
    color: #E42313;
    margin-left: 24px;
    display: flex;
    align-items: center;
}

.btn-red-outline img {
    margin-right: 8px;
}

.btn-red-outline:hover {
    color: #E42313;
}

.custom-form-tags .badge.b-form-tag {
    border: 1px solid #E42313;
    background-color: #FDF7F7;
    color: #E42313;
    padding: 4px 12px;
    border-radius: 16px;
}

.label-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.label-chips .chip-item {
    /* border: 1px solid #EEAFAF; */
    background-color: #FDF7F7;
    color: #FF6121;
    font-size: 14px;
    padding: 4px 12px;
    border-radius: 8px;
    margin-right: 8px;
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 21px;

}

.label-chips .chip-item:last-child {
    margin-right: 0;
}

.btn-add-file img {
    width: 12px;
    height: 12px;
}

.btn-remove {
    background-color: #F9E4E4;
    margin-right: 8px;
    padding: 6px 10px;
}

.upload-lampiran {
    background-color: #fdf7f7;
    border-radius: 4px;
    padding: 16px;
    border: 1.5px dashed #e42313;

    margin-bottom: 16px;
}

.upload-lampiran .click-upload {
    font-family: "Nunito Sans";
    font-weight: 700;
    font-size: 18px;
    color: #e42313;

    margin-bottom: 0;
    cursor: pointer;
}

.upload-lampiran .information-max-upload {
    font-family: "Nunito Sans";
    font-weight: 600;
    font-size: 16px;
    color: #8c8f93;
}

.error-upload {
    margin-bottom: 8px;
}

.error-upload .max-file {
    font-family: "Nunito Sans";
    font-weight: 600;
    font-size: 16px;
    color: #ff5630;
}

.list-file-lampiran .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.list-file-lampiran .file-progress {
    margin-top: 9px;
    margin-bottom: 9px;
}

.list-file-lampiran .file-progress .progress {
    height: 6px !important;
    background: #f2f4f6;
    border-radius: 100px;
}

.list-file-lampiran .file-progress .progress-bar {
    height: 6px !important;
    background: #52bd94;
    border-radius: 100px;
}
</style>