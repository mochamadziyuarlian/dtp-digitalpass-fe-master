<template>
    <div>
        <div class="section-container">
            <div class="row">
                <div class="col-xl-8 pr-4" style="border-right: 1px solid #D9DDE3;">
                    <div class="row">
                        <div class="col-xl-12" style="margin-bottom: 32px;">
                            <label class="title-detail-pengajuan">
                                {{ Data.DetailPengajuan.product_name || '-' }}
                                <span class="badge-title-detail-pengajuan" :class="{ 
                                        'in-progress' : badgeInProgress,
                                        'done' : Data.DetailPengajuan.statusName === 'SELESAI',
                                        'draft' : Data.DetailPengajuan.statusName === 'DRAFT',
                                        'reject' : badgeReject
                                }">
                                    {{ Data.DetailPengajuan.status_user }}
                                </span>
                            </label>
                        </div>
                        <div class="col-xl-12">
                            <div class="steper">
                                <li v-for="(item, index) of Steper.data" :key="index" :class="{
                                    'in-progress' : indicatorProgress(item.step_name), 
                                    'done' : indicatorDone(item.step),
                                    'reject' : badgeReject
                                }">
                                    <div class="steper-icon">
                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_STEP_CHECK.svg"
                                            v-if="imgSteperDone(item.step)" />
                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_STEP_LOCK_ORANGE.svg"
                                            v-if="imgSteperProgress(item.step_name)" />
                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_STEP_LOCK_GRAY.svg"
                                            v-if="imgSteperUpcoming(item.step)" />
                                    </div>
                                    <div class="steper-line" :class="{
                                        'done' : indicatorDone(item.step), 
                                        'reject' : badgeReject
                                    }"></div>
                                    <p class="steper-title">
                                        {{ item.title }}
                                    </p>
                                    <div class="steper-distance" v-if="indicatorProgress(item.step_name)">
                                        <span class="steper-badge">
                                            <label class="steper-badge-title">
                                                In Progress
                                            </label>
                                        </span>
                                    </div>
                                    <label class="steper-desc">
                                        <span v-html="item.desc"></span>
                                    </label>
                                </li>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <hr class="v3" style="margin-top: 24px; margin-bottom: 24px;" />
                        </div>
                        <div class="col-xl-12" v-if="Information.setIsShowInformation">
                            <div class="information" v-for="(item, index) of Information.setTypeInformation" :key="index">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-auto align-self-center" v-if="item.image !== null">
                                                <img :src="`/v3/Portal/assets/icon/${item.image}.svg`" />
                                            </div>
                                            <div class="col">
                                                <div class="row">
                                                    <div class="col">
                                                        <p class="information-title">
                                                            {{ item.title }}
                                                        </p>
                                                        <p class="information-desc">
                                                            {{ item.desc }}
                                                        </p>
                                                    </div>
                                                    <div class="col-auto">
                                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_ILUSTRATION_INFORMATION.svg" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div v-if="item.id === 'pengajuan-ditolak' || item.id === 'proses-perbaikan'">
                                                            <div v-if="!isUbahInformasi">
                                                                <button type="button" class="btn btn-v3-dsa-primary btn-information"
                                                                    @click="isUbahInformasi = true">
                                                                    {{ item.btnText }}
                                                                    <img
                                                                        src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_PENCIL_EDIT.svg" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div v-if="item.id === 'pengajuan-draft'">
                                                            <button type="button" class="btn btn-v3-dsa-primary btn-information"
                                                                @click="handleIsDraft()">
                                                                {{ item.btnText }}
                                                            </button>
                                                        </div>
                                                        <div v-if="item.id === 'pengajuan-selesai'">
                                                            <button type="button" class="btn btn-v3-dsa-primary btn-information"
                                                                @click="handleDownloadReport()">
                                                                {{ item.btnText }}
                                                                <img
                                                                    src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_REPORT_DOWNLOAD.svg" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <div class="section-detail-pengajuan">
                                <p class="section-title">
                                    Informasi pengaju
                                </p>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row" style="margin-bottom: 16px;">
                                            <div class="col-auto align-self-center">
                                                <b-avatar
                                                    :src="Data.DetailPengajuan.requested_by.photo === null ? '/v3/Portal/assets/icon/PENGAJUAN_DETAIL_AVATAR.svg' : `${BASE_URL_MINIO}/${Data.DetailPengajuan.requested_by.photo}`"
                                                    size="40px"></b-avatar>
                                            </div>
                                            <div class="col align-self-center pl-1">
                                                <label class="name-requested">
                                                    {{ Data.DetailPengajuan.requested_by.name || '-' }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-3">
                                                <div class="detail">
                                                    <label>
                                                        Unit/tribe
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.unit || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-5">
                                                <div class="detail">
                                                    <label>
                                                        Email
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.requested_by.email || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-4">
                                                <div class="detail">
                                                    <label>
                                                        Nomor telefon
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.requested_by.phone || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <div class="section-detail-pengajuan">
                                <p class="section-title">
                                    Tentang produk
                                </p>
                                <div class="card" v-if="!isUbahInformasi">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Nama produk
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.product_name || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-12"
                                                v-if="Data.DetailPengajuan.service.slug === 'heuristic-evaluation' || Data.DetailPengajuan.service.slug === 'usability-testing'">
                                                <div class="detail">
                                                    <label>
                                                        Link produk
                                                    </label>
                                                    <a :href="Data.DetailPengajuan.product_link" target="_blank">
                                                        <p>
                                                            {{ Data.DetailPengajuan.product_link }}

                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Jenis Platform
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.platform_type || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Versi Aplikasi
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.versi || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Deskripsi singkat
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.product_description || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Nama Modul
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.service_name || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <label>
                                                        Detail fitur upgrade
                                                    </label>
                                                    <p>
                                                        {{ Data.DetailPengajuan.detail_feature_upgrade || '-' }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card" v-if="isUbahInformasi">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div class="form-group form-pengajuan">
                                                        <label class="form-label">
                                                            Nama produk
                                                            <img    
                                                                src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                id="tooltip-product" 
                                                            />
                                                        </label>
                                                        <b-tooltip 
                                                            target="tooltip-product" 
                                                            triggers="hover"
                                                            placement="top" class="tooltip-pengajuan"
                                                        >
                                                            <p class="desc">
                                                                Nama produk yang terdaftar pada dashboard DOA
                                                            </p>
                                                        </b-tooltip>

                                                        <treeselect  
                                                            :class="{ 'is-invalid': $v.Form.Pengajuan.product.$error }" 
                                                            placeholder="Masukkan Nama Produk"
                                                            v-model="Form.Pengajuan.product" 
                                                            :multiple="false"
                                                            :options="userProducts"
                                                            value-format="object"
                                                            no-results-text="Produk belum terdaftar. Silakan hubungi admin"
                                                            no-options-text="Produk belum terdaftar. Silakan hubungi admin"
                                                        />
                                                        <span class="invalid-feedback">
                                                            <span v-if="!$v.Form.Pengajuan.product.required">
                                                                Nama produk tidak boleh kosong.
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail"
                                                    v-if="Data.DetailPengajuan.service.slug === 'heuristic-evaluation' || Data.DetailPengajuan.service.slug === 'usability-testing'">
                                                    <div class="form-group form-pengajuan">
                                                        <label class="form-label">
                                                            Link produk
                                                            <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                            id="tooltip-link-produk" />
                                                        </label>
                                                        <b-tooltip target="tooltip-link-produk" triggers="hover"
                                                            placement="top" class="tooltip-pengajuan">
                                                            <p class="desc">
                                                                Masukkan link untuk mengakses website/App Store/Google Play
                                                                produk
                                                                Anda.
                                                            </p>
                                                        </b-tooltip>
                                                        <input type="text" class="form-control"
                                                            placeholder="awali dengan https://"
                                                            v-model.trim="$v.Form.Pengajuan.product_link.$model"
                                                            :class="{ 'is-invalid': $v.Form.Pengajuan.product_link.$error }" />
                                                        <span class="invalid-feedback">
                                                            <span v-if="!$v.Form.Pengajuan.product_link.required">
                                                                Link produk tidak boleh kosong.
                                                            </span>
                                                            <span v-if="!$v.Form.Pengajuan.product_link.maxLength">
                                                                Masukkan maksimal
                                                                {{ $v.Form.Pengajuan.product_link.$params.maxLength.max }}
                                                                karakter.
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div>
                                                        <div class="form-group form-pengajuan">
                                                            <label class="form-label">
                                                                Jenis Platform
                                                                <img 
                                                                    src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                    id="tooltip-platform" 
                                                                /> 
                                                            </label>
                                                            <b-tooltip 
                                                                target="tooltip-platform" 
                                                                triggers="hover"
                                                                placement="top" class="tooltip-pengajuan">
                                                                <p class="desc">
                                                                    Anda dapat memilih platform dari aplikasi yang akan diajukan.
                                                                </p>
                                                            </b-tooltip>
                                                            <treeselect  
                                                                :class="{ 'is-invalid': $v.Form.Pengajuan.platform_type.$error }" 
                                                                placeholder="Masukkan Jenis platform aplikasi"
                                                                :multiple="true"
                                                                :options="platform"
                                                                v-model="Form.Pengajuan.platform_type" 
                                                                no-results-text="Produk belum terdaftar. Silakan hubungi admin"
                                                                no-options-text="Produk belum terdaftar. Silakan hubungi admin"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div>
                                                        <div class="form-group form-pengajuan">
                                                            <label class="form-label">
                                                                Versi Aplikasi
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                    id="tooltip-versi" />
                                                            </label>
                                                            <b-tooltip 
                                                                target="tooltip-versi" 
                                                                triggers="hover"
                                                                placement="top" class="tooltip-pengajuan">
                                                                <p class="desc">
                                                                    Sebutkan versi dari produk aplikasi yang akan diajukan.
                                                                </p>
                                                            </b-tooltip>
                                                            <input type="text" class="form-control"
                                                                placeholder= "versi 1.0.0"
                                                                v-model="$v.Form.Pengajuan.versi.$model" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div class="form-group form-pengajuan">
                                                        <label class="form-label">
                                                            Deskripsi singkat
                                                            <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                id="tooltip-deskripsi-singkat" />
                                                        </label>
                                                        <b-tooltip target="tooltip-deskripsi-singkat" triggers="hover"
                                                            placement="top" class="tooltip-pengajuan">
                                                            <p class="desc pb-4">
                                                                Jelaskan seberapa penting produk Anda terhadap kepentingan
                                                                pengguna
                                                                dan Telkom.
                                                            </p>
                                                            <p class="sample desc">
                                                                Contoh:
                                                            </p>
                                                            <label class="sample desc">
                                                                Produk ini akan dipakai untuk kepentingan karyawan internal
                                                                Telkom.
                                                            </label>
                                                        </b-tooltip>
                                                        <textarea rows="4" class="form-control"
                                                            placeholder="Masukkan Deskripsi singkat"
                                                            v-model.trim="$v.Form.Pengajuan.product_description.$model"
                                                            :class="{ 'is-invalid': $v.Form.Pengajuan.product_description.$error }">
                                                        </textarea>
                                                        <span class="invalid-feedback">
                                                            <span v-if="!$v.Form.Pengajuan.product_description.required">
                                                                Deskripsi singkat tidak boleh kosong.
                                                            </span>
                                                            <span v-if="!$v.Form.Pengajuan.product_description.minLength">
                                                                Masukkan minimal
                                                                {{ $v.Form.Pengajuan.product_description.$params.minLength.min }}
                                                                karakter.
                                                            </span>
                                                            <span v-if="!$v.Form.Pengajuan.product_description.maxLength">
                                                                Masukkan maksimal
                                                                {{ $v.Form.Pengajuan.product_description.$params.maxLength.max }}
                                                                karakter.
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div>
                                                        <div class="form-group form-pengajuan">
                                                            <label class="form-label">
                                                                Nama Modul
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                    id="tooltip-modul" />
                                                            </label>
                                                            <b-tooltip target="tooltip-modul" triggers="hover" placement="top"
                                                                class="tooltip-pengajuan">
                                                                <p class="desc pb-4">
                                                                    Anda dapat memasukkan servis atau modul yang akan diujikan
                                                                </p>
                                                            </b-tooltip>
                                                            <input type="text" class="form-control"
                                                                placeholder="Silahkann masukkan nama modul..."
                                                                v-model.trim="$v.Form.Pengajuan.service_name.$model" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-12">
                                                <div class="detail">
                                                    <div class="form-group form-pengajuan">
                                                        <label class="form-label">
                                                            Detail fitur upgrade
                                                            <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                                id="tooltip-detail-fitur-upgrade" />
                                                        </label>
                                                        <b-tooltip target="tooltip-detail-fitur-upgrade" triggers="hover"
                                                            placement="top" class="tooltip-pengajuan">
                                                            <p class="desc pb-4">
                                                                Jelaskan detail dari fitur upgrade yang akan dievaluasi.
                                                            </p>
                                                        </b-tooltip>
                                                        <textarea rows="4" class="form-control"
                                                            placeholder="Masukkan fitur upgrade produk yang akan diujikan"
                                                            v-model.trim="$v.Form.Pengajuan.detail_feature_upgrade.$model"
                                                            :class="{ 'is-invalid': $v.Form.Pengajuan.detail_feature_upgrade.$error }">
                                                        </textarea>
                                                        <span class="invalid-feedback">
                                                            <span v-if="!$v.Form.Pengajuan.detail_feature_upgrade.required">
                                                                Deskripsi singkat tidak boleh kosong.
                                                            </span>
                                                            <span v-if="!$v.Form.Pengajuan.detail_feature_upgrade.minLength">
                                                                Masukkan minimal
                                                                {{ $v.Form.Pengajuan.detail_feature_upgrade.$params.minLength.min }}
                                                                karakter.
                                                            </span>
                                                            <span v-if="!$v.Form.Pengajuan.detail_feature_upgrade.maxLength">
                                                                Masukkan maksimal
                                                                {{ $v.Form.Pengajuan.detail_feature_upgrade.$params.maxLength.max }}
                                                                karakter.
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <div class="section-detail-pengajuan">
                                <p class="section-title">
                                    Lampiran dokumen
                                </p>
                                <div v-if="isUbahInformasi">
                                    <div class="upload-lampiran" @dragover.prevent @drop.prevent @drop="handleFileDropUpload($event)">
                                        <div class="row justify-content-center">
                                            <div class="col-auto">
                                                <img
                                                    src="/v3/Portal/assets/icon/PENGAJUAN_UPLOAD_LAYANAN.svg" />
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
                                        <label class="max-file" v-if="IsError.maxFile">
                                            File melebihi kapasitas, maks 25 MB.
                                        </label>
                                    </div>
                                </div>
                                <div class="row" v-if="this.Form.Pengajuan.attachment_type !== 'EVIDENCE_PRIORITAS'">
                                    <div class="col-xl-6" v-for="(item, index) of Data.lampiranDokumen" :key="index">
                                        <div class="file-lampiran">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="list-file-lampiran">
                                                        <div class="row">
                                                            <div class="col-auto d-flex align-items-center">
                                                                <img
                                                                    src="/v3/Portal/assets/icon/PENGAJUAN_ICON_UPLOAD_FILE.svg" />
                                                            </div>
                                                            <div class="col">
                                                                <p class="file-name">
                                                                    {{ item.file.name }}
                                                                </p>
                                                                <label 
                                                                    class="file-size"
                                                                    v-if="!item.additional.isLoading"
                                                                >
                                                                    {{ item.file.file_size || item.file.size | formatSize }}
                                                                </label>
                                                                <div class="file-progress"
                                                                    v-if="item.additional.isLoading">
                                                                    <b-progress
                                                                        :value="item.additional.isLoadingPercentage">
                                                                    </b-progress>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div class="col-auto d-flex justify-content-end align-items-center">
                                                    <div class="row">
                                                        <div class="col-auto pl-1">
                                                            <!-- <div v-if="!isUbahInformasi"> -->
                                                            <div>
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_DOWNLOAD_FILE.svg"
                                                                    class="cursor-pointer" style="margin-right: 4px;"
                                                                    @click="handleDownloadFile(item.file.path)" />
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TRASH_FILE.svg"
                                                                    class="cursor-pointer" style="margin-left: 4px;"
                                                                    @click="handleFileRemove(item.file.id)"
                                                                    v-if="isRevisi" />
                                                            </div>
                                                            <!-- <div v-if="isUbahInformasi">
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_EDIT_FILE.svg"
                                                                    class="cursor-pointer" style="margin-right: 4px;"
                                                                    @click="handleEditFile(item, index)" />
                                                                <input type="file" class="d-none" id="inputFileLampiran"
                                                                    @change="onChangeFileUpload($event)" />
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12" v-if="isUbahInformasi">
                            <div class="d-flex justify-content-end">
                                <button type="button"
                                    class="btn btn-v3-outline-dsa-primary btn-information"
                                    @click="cancelChangeInformation()">
                                    Batal
                                </button>
                                <button type="button" class="btn btn-v3-dsa-primary btn-information"
                                    :class="{ 'disabled': handleDisabledUpdateInformasi() }"
                                    :disabled="handleDisabledUpdateInformasi()"
                                    @click="handleCheckLampiranIsChanged();">
                                    Update Informasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 pl-4">
                    <div class="row">
                        <div class="col-xl-12">
                            <p class="title-service-list">
                                Layanan yang diajukan
                            </p>
                            <div class="service-list" v-for="(item, index) of Data.serviceDetailPengajuan" :key="index">
                                <div class="row">
                                    <div class="col-auto align-self-center">
                                        <div class="service-logo">
                                            <img :src="`/v3/Portal/assets/icon/PENGAJUAN_LAYANAN_${item.slug}.svg`" />
                                        </div>
                                    </div>
                                    <div class="col pl-2">
                                        <p class="service-name">
                                            {{ item.service_name }}
                                        </p>
                                        <label class="service-desc">
                                            {{ item.desc_text }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <hr class="v3" style="margin-top: 20px; margin-bottom: 20px;" />
                        </div>
                        <div class="col-xl-12">
                            <div>
                                <p class="title-aktivitas-pengajuan">
                                    Aktivitas Pengajuan
                                </p>
                            </div>
                            <div v-if="Data.DetailPengajuan.statusName !== 'PENGAJUAN_DITOLAK'">
                                <div class="history" v-for="(item, index) of Data.DetailPengajuan.history" :key="index">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img v-if="item.log !== 'Pengujian dibatalkan'"
                                                src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_HISTORY_APPROVE.svg" />
                                            <img v-if="item.log === 'Pengujian dibatalkan'"
                                                src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_HISTORY_REJECT.svg" />
                                        </div>
                                        <div class="col pl-1">
                                            <div v-if="item.log !== 'Pengujian dibatalkan'">
                                                <p class="history-title">
                                                    <span class="update">
                                                        Pengajuan sudah update
                                                    </span>
                                                </p>
                                                <p class="history-desc">
                                                    <span v-html="item.log || '-'"></span>
                                                </p>
                                            </div>
                                            <div v-if="item.log === 'Pengujian dibatalkan'">
                                                <p class="history-title">
                                                    <span class="reject">
                                                        Pengajuanmu ditolak supervisor
                                                    </span>
                                                </p>
                                                <p class="history-desc">
                                                    {{ Data.DetailPengajuan.note || '-' }}
                                                </p>
                                            </div>
                                            <span class="history-date">
                                                {{ item.created_at | formatDate }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK'">
                                <div class="history">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img src="/v3/Portal/assets/icon/PENGAJUAN_DETAIL_HISTORY_REJECT.svg" />
                                        </div>
                                        <div class="col pl-1">
                                            <div>
                                                <p class="history-title">
                                                    <span class="reject">
                                                        Pengajuanmu ditolak supervisor
                                                    </span>
                                                </p>
                                                <p class="history-desc">
                                                    {{ Data.DetailPengajuan.note || '-' }}
                                                </p>
                                            </div>
                                            <span class="history-date">
                                                {{ Data.DetailPengajuan.updated_at | formatDate }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <b-modal modal-class="modal-v3-dsa" v-model="Modal.setIsShowModal" hide-header hide-footer centered>
                    <div v-for="(item, index) of Modal.setTypeModal" :key="index">
                        <div class="row d-flex align-items-center pr-4">
                            <div class="col">
                                <img src="/v3/Portal/assets/icon/MODAL_ILUSTRATION_HEADER.svg" />
                            </div>
                            <div class="col-auto">
                                <div class="cursor-pointer" @click="Modal.setIsShowModal = false">
                                    <img src="/v3/Portal/assets/icon/MODAL_ICON_CLOSE.svg" />
                                </div>
                            </div>
                        </div>
                        <div class="row section-information">
                            <div class="col-xl-12 text-center" style="margin-bottom: 36px;" v-if="item.type === 'response'">
                                <img :src="`/v3/Portal/assets/icon/${item.image}.svg`" />
                            </div>
                            <div class="col-xl-12 text-center">
                                <p class="title">
                                    {{ item.title }}
                                </p>
                                <label class="desc mb-0">
                                    {{ item.desc }}
                                </label>
                            </div>
                        </div>
                        <div class="row section-button">
                            <div class="col-xl-12 d-flex justify-content-center">
                                <div v-if="item.id === 'hapus-file'">
                                    <button type="button" class="btn btn-v3-outline-dsa-primary"
                                        @click="Modal.setIsShowModal = false">
                                        {{ item.btnLeft }}
                                    </button>
                                    <button type="button" class="btn btn-v3-dsa-primary"
                                        @click="fetchDeleteFilePengajuan(Temporary.DeleteFile.id)">
                                        {{ item.btnRight }}
                                    </button>
                                </div>
                                <div v-if="item.id === 'success-hapus-file'">
                                    <button type="button" class="btn btn-v3-dsa-primary"
                                        @click="Modal.setIsShowModal = false">
                                        {{ item.btnRight }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-modal>

                <b-modal modal-class="modal-v3-dsa" v-model="modalErrorUpload" hide-header hide-footer centered>
                    <div class="row d-flex align-items-center pr-4">
                        <div class="col">
                            <img src="/v3/Portal/assets/icon/MODAL_ILUSTRATION_HEADER.svg" />
                        </div>
                        <div class="col-auto">
                            <div class="cursor-pointer" @click="modalErrorUpload = false">
                                <img src="/v3/Portal/assets/icon/MODAL_ICON_CLOSE.svg" />
                            </div>
                        </div>
                    </div>
                    <div class="row section-information">
                        <div class="col-xl-12 text-center">
                            <p class="title">
                                Gagal mengunggah lampiran
                            </p>
                            <label class="desc mb-0">
                                {{ errorUpload }}
                            </label>
                        </div>
                    </div>
                    <div class="row section-button">
                        <div class="col-xl-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-v3-dsa-primary"
                                @click="modalErrorUpload = false">
                                Oke
                            </button>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';
    import {
        DETAIL_PENGAJUAN_INFORMATION,
        DETAIL_PENGAJUAN_STEPER,
        SERVICES,
        MODAL_MESSAGE
    } from '@/static/v3/Portal/constants/menu'
    import {
        required,
        maxLength,
        minLength,
        url
    } from 'vuelidate/lib/validators'

    const app = require('~/app.json');
    const config = app.config[process.env.ENV || 'development'];

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    DetailPengajuan: {
                        attachment: [],
                        requested_by: {
                            email: null,
                            name: null,
                            phone: null
                        },
                        service: {
                            slug: null
                        },
                        history: [],
                        report: [],
                        stepRequest: null
                    },
                    serviceDetailPengajuan: [],
                    lampiranDokumen: [],
                    lampiranDokumenNewFile: [],
                    lampiranDeleted: [],
                    listFiles: []
                },
                Form: {
                    Pengajuan: {
                        request_id: null,
                        product: '',
                        request_name: null,
                        product_description: null,
                        product_test_type: null,
                        product_sub_test_type: '',
                        product_link: null,
                        platform_type: null,
                        versi: '',
                        unit: '',
                        tribe: '',
                        status: null,
                        revenue: '',
                        service_id: null,
                        micro_impact: '',
                        is_priority: false,
                        detail_feature_upgrade:null,
                        service_name: null,
                        is_gtm_bundle: null,
                        attachment_type: null,
                        requested_by: this.UserLogin().id,
                    }
                },
                Modal: {
                    setIsShowModal: false,
                    setTypeModal: [],
                    modalType: 'ajukan-layanan'
                },
                Temp: {
                    lampiranDokumen: {
                        index: null,
                        file: {}
                    },
                },
                Information: {
                    setIsShowInformation: false,
                    setTypeInformation: []
                },
                Steper: {
                    data: []
                },
                Temporary: {
                    DeleteFile: {
                        id: null
                    }
                },
                isUbahInformasi: false,
                BASE_URL_MINIO: null,
                userProducts: [],
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
                IsError: {
                    maxFile: false
                },
                errorUpload: null,
                modalErrorUpload: false
            }
        },
        validations: {
            Form: {
                Pengajuan: {
                    product: {
                        required
                    },
                    product_description: {
                        required,
                        maxLength: maxLength(100),
                        minLength: minLength(3)
                    },
                    detail_feature_upgrade: {
                        required,
                        maxLength: maxLength(100),
                        minLength: minLength(3)
                    },
                    product_link: {
                        url,
                        maxLength: maxLength(50),
                    },
                    versi: {
                        required
                    },
                    platform_type:{
                        required
                    },
                    service_name:{
                        required
                    }
                }
            }
        },
        filters: {
            formatSize(size) {
                const fileToMB = ((size / 1024) / 1024).toFixed(1)
                if (fileToMB < 1) {
                    return `${((size / 1024)).toFixed(1)} KB`
                } else {
                    return `${fileToMB} MB`
                }
            },
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY')
                } else {
                    return '-';
                }
            }
        },
        computed: {
            badgeInProgress() {
                return this.Data.DetailPengajuan.statusName !== 'PENGAJUAN_DIREJECT' || this.Data.DetailPengajuan.statusName !== 'PENGAJUAN_DITOLAK' || this.Data.DetailPengajuan.statusName !== 'DRAFT' || this.Data.DetailPengajuan.statusName !== 'SELESAI';
            },
            badgeReject() {
                return this.Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK' || this.Data.DetailPengajuan.statusName === 'PENGAJUAN_DIREJECT';
            },
            indicatorProgress() {
                return (current_step) => {
                    return this.Data.DetailPengajuan.statusName === current_step && this.Data.DetailPengajuan.statusName !== 'SELESAI'
                }
            },
            indicatorDone() {
                return (current_step) => {
                    return current_step < this.stepRequest || this.Data.DetailPengajuan.statusName === 'SELESAI';
                }
            },
            imgSteperDone() {
                return(current_step) => {
                    return (current_step < this.stepRequest && this.Data.DetailPengajuan.statusName != 'PENGAJUAN_DITOLAK' && this.Data.DetailPengajuan.statusName !== 'PENGAJUAN_DIREJECT') || this.Data.DetailPengajuan.statusName === 'SELESAI';
                }
            },
            imgSteperProgress() {
                return(current_step) => {
                    return (this.Data.DetailPengajuan.statusName === current_step || this.Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK' || this.Data.DetailPengajuan.statusName === 'PENGAJUAN_DIREJECT') && this.Data.DetailPengajuan.statusName !== 'SELESAI';
                }
            },
            imgSteperUpcoming() {
                return(current_step) => {
                    return current_step > this.stepRequest && this.Data.DetailPengajuan.statusName != 'SELESAI' && this.Data.DetailPengajuan.statusName !== 'PENGAJUAN_DIREJECT';
                }
            },
            isRevisi() {
                return this.Data.DetailPengajuan.statusName === 'PENGAJUAN_DITOLAK' || this.Data.DetailPengajuan.statusName === 'PROSES_PERBAIKAN';
            },
            
        },
        watch: {},
        created() {
            this.fetchGetDetailPengajuan()
            this.Steper.data = DETAIL_PENGAJUAN_STEPER
            this.BASE_URL_MINIO = config.minio
        },
        async mounted() {
            // this.userProducts = this.UserLogin().products;
            this.getProduct();
        },
        methods: {
            fetchGetDetailPengajuan() {
                this.Request('GET', '/api/v3/request/' + this.$route.params.slug, null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.Data.DetailPengajuan = res.content[0]
                        this.Data.DetailPengajuan.history = res.content[0].history.reverse()
                        // this.Data.lampiranDokumen = res.content[0].attachment
                        this.Data.lampiranDokumen = [];
                        for (const item of res.content[0].attachment) {
                            this.Data.lampiranDokumen.push({
                                file: item,
                                additional: {
                                    id: item.id,
                                    isLoading: false,
                                    isLoadingPercentage: 0
                                }
                            });
                        }
                        this.handleSetValueUpdateInformasi()
                        let service = this.Data.DetailPengajuan.service.slug
                        this.Data.serviceDetailPengajuan = SERVICES.filter(x => x.slug === service)
                        let status = this.Data.DetailPengajuan.statusName
                        switch (status) {
                            case 'DRAFT':
                                this.onShowInformation('pengajuan-draft')
                                break
                            case 'SELESAI':
                                this.onShowInformation('pengajuan-selesai')
                                break
                            case 'PENGAJUAN_DITOLAK':
                                this.onShowInformation('pengajuan-ditolak')
                                break
                            case 'PROSES_PERBAIKAN':
                                this.onShowInformation('proses-perbaikan')
                                break
                            default:
                                this.onShowInformation(null)
                                break;
                        }
                        this.stepRequest = this.Steper.data.find((item) => item.step_name === this.Data.DetailPengajuan.statusName).step;
                    }
                    this.$store.commit('setBreadcrumb', [{
                        title: 'Pengajuan Layanan',
                        titleURL: '/user/monitoring/pengajuan-layanan',
                        menu: [{
                            menuTitle: this.Data.DetailPengajuan.status_user,
                            menuURL: null
                        }]
                    }]);
                })
            },
            fetchUpdatePengajuan() {
                const requestData = {
                    id: this.Form.Pengajuan.request_id,
                    product_name: this.Form.Pengajuan.product_name,
                    product_link: this.Form.Pengajuan.product_link,
                    product_sub_test_type: this.Form.Pengajuan.product_sub_test_type ? this.Form.Pengajuan.product_sub_test_type : '',
                    product_description: this.Form.Pengajuan.product_description,
                    service_id: this.Form.Pengajuan.service_id,
                    statusName: this.Form.Pengajuan.status,
                    unit: this.Form.Pengajuan.unit ? this.Form.Pengajuan.unit : '',
                    revenue: this.Form.Pengajuan.revenue ? this.Form.Pengajuan.revenue : '',
                    micro_impact: this.Form.Pengajuan.micro_impact ? this.Form.Pengajuan.micro_impact : '',
                    product_test_type: this.Form.Pengajuan.product_test_type,
                    requested_by: this.Form.Pengajuan.requested_by,
                    productId: this.Form.Pengajuan.product.id,
                    is_priority: this.Form.Pengajuan.is_priority,
                    is_gtm_bundle: this.Form.Pengajuan.is_gtm_bundle,
                    versi: this.Form.Pengajuan.versi ? this.Form.Pengajuan.versi : '',
                    tribe: this.Form.Pengajuan.tribe ? this.Form.Pengajuan.tribe : '',
                    service_name: this.Form.Pengajuan.service_name ? this.Form.Pengajuan.service_name : '',
                    platform_type: this.Form.Pengajuan.platform_type.join(','),
                    detail_feature_upgrade: this.Form.Pengajuan.detail_feature_upgrade ? this.Form.Pengajuan.detail_feature_upgrade : '',
                }
                
                this.Request('PUT', '/api/v3/request/update', null, requestData, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.fetchGetDetailPengajuan()
                        this.isUbahInformasi = false
                    }
                })
            },
            fetchUploadFilePengajuan(file) {
                const formData = new FormData()
                formData.append('request_id', this.Form.Pengajuan.request_id)
                formData.append('name', file.file.name)
                formData.append('imgFile', file.file)
                formData.append('type', file.file.type)
                formData.append('file_type', 'lampiran')
                formData.append('service', this.Form.Pengajuan.service_id)
                formData.append('product_name', this.Form.Pengajuan.request_name)
                formData.append('attachment_type', this.Form.Pengajuan.attachment_type);
                formData.append('created_by', this.Form.Pengajuan.requested_by)

                this.RequestUploadFile('POST', '/api/v3/request-attachment/create', null, formData, 'BASIC',
                    (progress) => {
                        file.additional.isLoadingPercentage = progress
                    }, (res) => {
                        if (res.code === 200) {
                            file.additional.isLoading = false
                            file.additional.id = res.content[0].id
                        } else {
                            this.Data.lampiranDokumen.splice(-1);
                            if(typeof res.message === 'object' && res.message.details.length > 0) {
                                let msg = (res.message.details.map((i) => i.message)).join(", ");
                                this.errorUpload = msg;
                            } else {
                                this.errorUpload = res.message ? res.message : 'Lampiran Anda gagal diunggah';
                            }
                            this.modalErrorUpload = true;
                        }
                    }
                )
            },
            handleIsDraft() {
                this.$router.push('/user/monitoring/pengajuan-layanan/pengajuan')
                this.$store.commit('setIsDraft', true)
                this.$store.commit('setServiceValue', {
                    id: this.Data.DetailPengajuan.service.id,
                    name: this.Data.DetailPengajuan.service.name,
                    desc_text: this.Data.serviceDetailPengajuan[0].desc_text,
                    slug: this.Data.DetailPengajuan.service.slug
                })
                this.$store.commit('setFormValue', {
                    id: this.Form.Pengajuan.request_id,
                    product: this.Form.Pengajuan.product,
                    request_name: this.Form.Pengajuan.request_name,
                    product_description: this.Form.Pengajuan.product_description,
                    product_test_type: this.Form.Pengajuan.product_test_type,
                    product_sub_test_type: this.Form.Pengajuan.product_sub_test_type,
                    product_link: this.Form.Pengajuan.product_link,
                    unit: this.Form.Pengajuan.unit,
                    tribe: this.Form.Pengajuan.tribe === 'null' ? '' : this.Form.Pengajuan.tribe,
                    status: this.Form.Pengajuan.status,
                    revenue: this.Form.Pengajuan.revenue === 'null' ? '' : this.Form.Pengajuan.revenue,
                    service_id: this.Form.Pengajuan.service_id,
                    micro_impact: this.Form.Pengajuan.micro_impact === 'null' ? '' : this.Form.Pengajuan
                        .micro_impact,
                    is_priority: this.Form.Pengajuan.is_priority,
                    is_gtm_bundle: this.Form.Pengajuan.is_gtm_bundle,
                    versi: this.Form.Pengajuan.versi,
                    detail_feature_upgrade: this.Form.Pengajuan.detail_feature_upgrade,
                    platform_type: this.Form.Pengajuan.platform_type,
                    service_name: this.Form.Pengajuan.service_name,
                    requested_by: this.UserLogin().id,
                })
                this.$store.commit('setFileLampiran', this.Data.DetailPengajuan.attachment.map((x) => {
                    return {
                        file: {
                            name: x.name,
                            size: x.file_size
                        },
                        additional: {
                            id: x.id,
                            isLoading: false,
                            isLoadingPercentage: 100
                        }
                    }
                }))
            },
            cancelChangeInformation() {
                this.isUbahInformasi = false; 
                this.fetchGetDetailPengajuan(); 
                this.Data.lampiranDokumenNewFile = []; 
                this.Data.lampiranDeleted = [];
            },
            handleCheckLampiranIsChanged() {
                if (this.Data.lampiranDokumenNewFile.length > 0) {
                    this.Data.lampiranDeleted.forEach((id) => {
                        this.fetchDeleteFilePengajuan(id)
                    })
                    this.Data.lampiranDokumenNewFile.forEach((file, index) => {
                        this.fetchUploadFilePengajuan(file)
                    })
                }
                this.fetchUpdatePengajuan()
            },
            handleSetValueUpdateInformasi() {
                let data = this.Data.DetailPengajuan

                let platformTypeArray = data.platform_type ? data.platform_type.split(',').map(item => item.trim()) : [];

                this.Form.Pengajuan = {
                    request_id: data.id,
                    product: {
                        id: data.product_id,
                        label: data.product_name
                    },
                    request_name: data.nama_pengajuan,
                    product_description: data.product_description,
                    product_test_type: data.product_test_type,
                    product_sub_test_type: data.product_sub_test_type,
                    product_link: data.product_link,
                    unit: data.unit,
                    tribe: data.tribe,
                    status: data.statusName === 'PENGAJUAN_DITOLAK' ? 'SUBMIT_DATA_PENGAJUAN' : data.statusName,
                    revenue: data.revenue,
                    service_id: data.service_id,
                    micro_impact: data.micro_impact,
                    versi: data.versi,
                    is_priority: data.is_priority,
                    platform_type: platformTypeArray,
                    service_name: data.service_name,
                    detail_feature_upgrade: data.detail_feature_upgrade,
                    requested_by: this.UserLogin().id
                }
            },
            handleDownloadFile(url) {
                window.open(url, '_blank');
            },
            handleFileRemove(id) {
                this.onShowModal('hapus-file')
                this.Temporary.DeleteFile.id = id
            },
            fetchDeleteFilePengajuan(id) {
                const formData = new FormData()
                formData.append('id', id)
                this.Request('DELETE', '/api/v3/request-attachment/remove', null, formData, 'BASIC', (res) => {
                    if (res.code === 200) {
                        if (this.Temporary.DeleteFile.id) {
                            this.onShowModal('success-hapus-file')
                            this.fetchGetDetailPengajuan()
                        }
                    }
                })
            },
            handleDownloadReport() {
                window.open(this.Data.DetailPengajuan.report[0].path, '_blank')
            },
            handleEditFile(data, index) {
                this.$nextTick(function () {
                    document.getElementById('inputFileLampiran').click()
                })
                this.Temp.lampiranDokumen.index = index
                this.Temp.lampiranDokumen.file = data
            },
            onChangeFileUpload(e) {
                let file = e.target.files

                if (file.length > 0) {
                    let hasValue = this.Data.lampiranDeleted.filter(x => x === this.Temp.lampiranDokumen.file.id)
                    if (hasValue.length > 0) {
                        this.Data.lampiranDokumenNewFile.splice(this.Temp.lampiranDokumen.index, 1)
                        this.Data.lampiranDokumenNewFile.splice(this.Temp.lampiranDokumen.index, 0, file[0])
                    } else {
                        this.Data.lampiranDokumenNewFile.push(file[0])
                        this.Data.lampiranDeleted.push(this.Temp.lampiranDokumen.file.id)
                    }

                    this.Data.lampiranDokumen[this.Temp.lampiranDokumen.index].name = file[0].name
                    this.Data.lampiranDokumen[this.Temp.lampiranDokumen.index].file_size = file[0].size
                }
            },
            onShowInformation(id) {
                this.Information.setTypeInformation = []

                let getResponseInformation = DETAIL_PENGAJUAN_INFORMATION.find((x) => {
                    return x.id === id
                })
                if (getResponseInformation !== undefined) {
                    this.Information.setIsShowInformation = true
                    this.Information.setTypeInformation.push(getResponseInformation)
                }
            },
            onShowModal(id) {
                this.Modal.setTypeModal = []

                let getResponseModal = MODAL_MESSAGE.find((x) => {
                    return x.id === id
                })
                if (getResponseModal !== undefined) {
                    this.Modal.setIsShowModal = true
                    this.Modal.setTypeModal.push(getResponseModal)
                }
            },
            formatIDR: value => (value + '').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
            handleFormatIDR() {
                this.Form.Pengajuan.revenue = this.formatIDR(this.Form.Pengajuan.revenue)
                this.$emit('input', (this.currentValue + '').replace(/[^0-9]/g, ''))
            },
            handleFileUpload() {
                this.$nextTick(function () {
                    document.getElementById('inputFileLampiran').click()
                })
            },
            handleFileDropUpload(e) {
                let droppedFiles = e.dataTransfer.files;
                if (!droppedFiles) return;

                for (let file of droppedFiles) {
                    const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                    if (fileToMB > 25) {
                        this.handleFileInputReset()
                        this.IsError.maxFile = true
                    } else {
                        const costumizeFile = {
                            file: file,
                            additional: {
                                id: null,
                                isLoading: true,
                                isLoadingPercentage: 0
                            }
                        }
                        this.Data.lampiranDokumen.push(costumizeFile)
                        this.fetchUploadFilePengajuan(costumizeFile);
                    }
                }
                this.handleFileInputReset();
            },
            handleFileInputReset() {
                document.getElementById('inputFileLampiran').value = ''
            },
            handleFileCancel() {},
            handleFileRemove(id, index) {
                this.onShowModal('hapus-file')
                this.Temporary.DeleteFile.id = id
                this.Temporary.DeleteFile.index = index
            },
            onChangeNewFileUpload(e) {
                this.IsError.maxFile = false

                let files = e.target.files
                for (let file of files) {
                    const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                    if (fileToMB > 25) {
                        this.handleFileInputReset()
                        this.IsError.maxFile = true
                    } else {
                        const costumizeFile = {
                            file: file,
                            additional: {
                                id: null,
                                isLoading: true,
                                isLoadingPercentage: 0
                            }
                        }
                        this.Data.lampiranDokumen.push(costumizeFile)
                        this.fetchUploadFilePengajuan(costumizeFile);
                    }
                }
                this.handleFileInputReset()
            },
            getProduct() {
                this.Request('GET', '/api/v3/product/list-multiselect', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.userProducts = callback.content;
                    };
                });
            },
            handleDisabledUpdateInformasi() {
                if (this.$v.Form.Pengajuan.$invalid || this.$v.Form.Pengajuan.product_description.$invalid) return true
                if (this.Data.lampiranDokumen.length === 0 ) return true;
            },
        }
    }

</script>

<style scoped>

    .btn-information.disabled {
    color: #b1b5ba;
    background-color: #d9dde3;
    border-color: #d9dde3;
    }
    .title-detail-pengajuan {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 30px;
        color: #2E3032;

        display: flex;
        align-items: center;
    }

    .badge-title-detail-pengajuan {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 18px;

        border-radius: 8px;
        padding: 12px 16px;
        margin-left: 12px;
    }

    .badge-title-detail-pengajuan.in-progress {
        color: #FF6121;
        background-color: #FFEFE9;
    }

    .badge-title-detail-pengajuan.done {
        color: #52BD94;
        background-color: #EEF8F4;
    }

    .badge-title-detail-pengajuan.reject {
        color: #BF2600;
        background-color: #FFEBE6;
    }

    .badge-title-detail-pengajuan.draft {
        color: #8C8F93;
        background-color: #F2F4F6;
    }

    .information .card {
        background: #FFFFFF;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        border: 0 solid transparent !important;
    }

    .information .card-body {
        padding: 16px;
    }

    .information .btn-information {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 16px;
        color: #FFFFFF;
        padding: 0.375rem 0.75rem;

        height: 36px;
    }

    .information .btn-information img {
        margin-left: 8px;
    }

    .information .btn-v3-outline-dsa-primary {
        color: #E42313;

        margin-right: 16px;
    }

    .information .information-title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 20px;
        color: #3B3D39;

        margin-bottom: 8px;
        text-transform: uppercase;
    }

    .information .information-desc {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 14px;
        color: #8C8F93;

        margin-bottom: 8px;
    }

    .information,
    .section-detail-pengajuan {
        height: auto;
        margin-bottom: 24px;
    }

    .btn-information {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 16px;
        color: #FFFFFF;
        padding: 0.375rem 0.75rem;
        height: 36px;
    }

    .btn-v3-outline-dsa-primary {
        color: #E42313;
        margin-right: 16px;
    }

    .section-detail-pengajuan .section-title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 18px;
        color: #2E3032;

        margin-bottom: 16px;
    }

    .section-detail-pengajuan .name-requested {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 16px;
        color: #2E3032;
    }

    .section-detail-pengajuan .card {
        border: 1px solid #D9DDE3;
        border-radius: 8px;
        height: 100%;
    }

    .section-detail-pengajuan .card-body {
        padding: 16px;
    }

    .section-detail-pengajuan .detail {
        margin-bottom: 16px;
    }

    .section-detail-pengajuan .detail label {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 14px;
        color: #8C8F93;

        margin-bottom: 4px !important;
    }

    .section-detail-pengajuan .detail p {
        font-family: 'Nunito Sans';
        font-weight: 600;
        font-size: 16px;
        color: #2E3032;
    }

    .section-detail-pengajuan .detail a p {
        color: #E42313;
    }

    .title-service-list {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 14px;
        color: #8C8F93;

        margin-bottom: 16px;
    }

    .service-list .service-logo {
        background-color: #F8F8F8;
        border: 1px solid #D9DDE3;
        border-radius: 4px;
        padding: 10px;
    }

    .service-list .service-name {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 18px;
        color: #262B31;

        margin-bottom: 0;
    }

    .service-list .service-desc {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 14px;
        color: #262B31;
    }

    .service-list .btn-service-selected {
        font-family: 'Nunito Sans' !important;
        font-weight: 800 !important;
        font-size: 14px !important;
        color: #D7281E;

        padding: 8px 24px;
        border: 1px solid #D7281E;
        border-radius: 3px;
    }

    .history {
        margin-bottom: 16px;
    }

    .history .history-title {
        font-family: 'Nunito Sans';
        font-weight: 600;
        font-size: 14px;

        margin-bottom: 4px;
    }

    .history .history-title .update {
        color: #52BD94;
    }

    .history .history-title .reject {
        color: #262B31;
    }

    .history .history-desc {
        font-family: 'Nunito Sans';
        font-weight: 400;
        font-size: 12px;
        color: #8C8F93;

        margin-bottom: 4px;
    }

    .history .history-date {
        font-family: 'Nunito Sans';
        font-weight: 400;
        font-size: 12px;
        color: #8C8F93;
    }

    .title-aktivitas-pengajuan {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 16px;
        color: #2E3032;

        margin-bottom: 16px;
    }

    .steper {
        display: flex;
    }
    .steper li {
        width: 100%;
        padding-left: 8px;
        flex: 1 1 0px;
    }
    .steper li:first-child {
        padding-left: 0;
    }
    .steper .steper-badge {
        padding: 4px 6px;
    }
    .steper li:first-child .steper-line {
        width: calc(100% - 32px - 8px);
    }
    .steper .steper-line {
        position: absolute;
        top: 16px;
        right: 0;
        width: calc(100% - 32px - 16px);
        height: 4px;
        border-radius: 8px;
        background-color: #F2F4F6;
    }
    .steper .steper-line.done {
        background-color: #52BD94;
    }
    .steper .steper-line.reject {
        background-color: #FFBDAD;
    }
    .steper li:last-child .steper-line {
        display: none;
    }

    .upload-lampiran {
        background-color: #fdf7f7;
        border-radius: 4px;
        padding: 16px 60px;
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

    .list-file-lampiran /deep/ .file-progress {
        margin-top: 9px;
        margin-bottom: 9px;
    }

    .list-file-lampiran /deep/ .file-progress .progress {
        height: 6px !important;
        background: #f2f4f6;
        border-radius: 100px;
    }

    .list-file-lampiran /deep/ .file-progress .progress-bar {
        height: 6px !important;
        background: #52bd94;
        border-radius: 100px;
    }
</style>
