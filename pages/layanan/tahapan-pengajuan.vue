<template>
    <div class="py-4">
        <div class="bg-white">
            <div class="container" style="">
                <div class="row border p-4">
                    <div class="col-12">
                        <div class="ml-2">
                            <label class="text-gray-main font-size-36 line-height-36 font-weight-700">
                                Ajukan Layanan
                            </label>
                            <h6 class="text-gray-main font-size-18 font-weight-400 line-height-24 mt-2 mb-4">
                                Tahapan Pengajuan
                            </h6>
                        </div>
                        <div id="stepper4" class="bs-stepper vertical linear d-block">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                    <div class="bs-stepper-header" role="tablist">
                                        <div class="step" :class="step >= 1 ? 'active' : ''" data-target="#step-1">
                                            <button type="button" class="step-trigger py-0 pl-0"
                                                :class="step >= 1 ? 'text-gray-main font-weight-700' : 'text-gray-light-2 font-weight-400'"
                                                role="tab" id="steptrigger1" aria-controls="step-1"
                                                :aria-selected="step >= 1 ? true : false"
                                                :disabled="step >= 1 ? 'disabled' : ''">
                                                <span class="bs-stepper-circle"
                                                    :class="step >= 1 ? 'text-black' : 'text-gray-light-2'">
                                                    <span class="font-size-20 align-self-center">1</span>
                                                </span>
                                                <span class="bs-stepper-label">Pilihan jenis layanan</span>
                                            </button>
                                        </div>
                                        <div class="bs-stepper-line">
                                            <span class="text-gray-light-1 font-size-14"
                                                :class="step >= 1 ? 'text-gray-main' : 'text-gray-light-2'">
                                                Silahkan memilih salah satu layanan yang tersedia
                                            </span>
                                        </div>
                                        <div class="step" :class="step >= 2 ? 'active' : ''" data-target="#step-2">
                                            <button type="button" class="step-trigger py-0 pl-0"
                                                :class="step >= 2 ? 'text-gray-main font-weight-700' : 'text-gray-light-2 font-weight-400'"
                                                role="tab" id="steptrigger2" aria-controls="step-2"
                                                :aria-selected="step >= 2 ? true : false"
                                                :disabled="step >= 2 ? 'disabled' : ''">
                                                <span class="bs-stepper-circle"
                                                    :class="step >= 2 ? 'text-black' : 'text-gray-light-2'">
                                                    <span class="font-size-20 align-self-center">2</span>
                                                </span>
                                                <span class="bs-stepper-label">Input data pengajuan</span>
                                            </button>
                                        </div>
                                        <div class="bs-stepper-line">
                                            <span class="text-gray-light-1 font-size-14"
                                                :class="step >= 2 ? 'text-gray-main' : 'text-gray-light-2'">
                                                Silahkan input data pengajuan tentang data produk digital anda
                                            </span>
                                        </div>
                                        <div class="step" :class="step >= 3 ? 'active' : ''" data-target="#step-3">
                                            <button type="button" class="step-trigger py-0 pl-0"
                                                :class="step >= 3 ? 'text-gray-main font-weight-700' : 'text-gray-light-2 font-weight-400'"
                                                role="tab" id="steptrigger3" aria-controls="step-3"
                                                :aria-selected="step >= 3 ? true : false"
                                                :disabled="step >= 3 ? 'disabled' : ''">
                                                <span class="bs-stepper-circle"
                                                    :class="step >= 3 ? 'text-black' : 'text-gray-light-2'">
                                                    <span class="font-size-20 align-self-center">3</span>
                                                </span>
                                                <span class="bs-stepper-label">Dokumen pendukung</span>
                                            </button>
                                        </div>
                                        <div class="bs-stepper-line">
                                            <span class="text-gray-light-1 font-size-14"
                                                :class="step >= 3 ? 'text-gray-main' : 'text-gray-light-2'">
                                                Anda dapat menggunakan template dokumen lampiran yang telah kami
                                                sediakan
                                            </span>
                                        </div>
                                        <div class="step" :class="step >= 4 ? 'active' : ''" data-target="#step-4">
                                            <button type="button" class="step-trigger py-0 pl-0"
                                                :class="step >= 4 ? 'text-gray-main font-weight-700' : 'text-gray-light-2 font-weight-400'"
                                                role="tab" id="steptrigger4" aria-controls="step-4"
                                                :aria-selected="step >= 4 ? true : false"
                                                :disabled="step >= 4 ? 'disabled' : ''">
                                                <span class="bs-stepper-circle"
                                                    :class="step >= 4 ? 'text-black' : 'text-gray-light-2'">
                                                    <span class="font-size-20 align-self-center">4</span>
                                                </span>
                                                <span class="bs-stepper-label">Submit pengajuan</span>
                                            </button>
                                        </div>
                                        <div class="bs-stepper-line border-0">
                                            <span class="text-gray-light-1 font-size-14"
                                                :class="step >= 4 ? 'text-gray-main' : 'text-gray-light-2'">
                                                Submit pengajuan layananmu ke Kami
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
                                </div>
                                <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-xs-12"
                                    style="height: 33rem;overflow-x: hidden;">
                                    <form onsubmit="return false">
                                        <div id="step-1" role="tabpanel" class="bs-stepper-pane fade"
                                            :class="step === 1 ? 'active dstepper-block' : 'd-none'"
                                            aria-labelledby="steptrigger1">
                                            <div class="card my-3 cursor-pointer"
                                                @click="selectProductTest({id: serviceId.he, name: 'Heuristic Evaluation (HE)', services: 'HeuristicEvaluation', service_code: 'he', slug: 'heuristic-evaluation'})"
                                                :class="selectedServices === 'Heuristic Evaluation (HE)' ? 'selected' : ''">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <div class="bg-white border p-2 rounded-circle"></div>
                                                        </div>
                                                        <div class="col">
                                                            <h6 class="text-gray-main font-weight-700">Heuristic
                                                                Evaluation (HE)
                                                            </h6>
                                                            <label
                                                                class="text-gray-light-1 font-size-14 line-height-24">
                                                                Metode evaluasi UI/UX yang dilakukan oleh minimal 3
                                                                orang expert
                                                                dengan cara menemukan potensi usability problem yang ada
                                                                pada
                                                                sebuah produk digital.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card my-3 cursor-pointer"
                                                :class="selectedServices === 'Usability Testing (UT)' ? 'selected' : ''"
                                                @click="selectProductTest({id: serviceId.ut, name: 'Usability Testing (UT)', services: 'UsabilityTesting', service_code: 'ut', slug: 'usability-testing'})">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <div class="bg-white border p-2 rounded-circle"></div>
                                                        </div>
                                                        <div class="col">
                                                            <h6 class="text-gray-main font-weight-700">Usability Testing
                                                            </h6>
                                                            <label
                                                                class="text-gray-light-1 font-size-14 line-height-24">
                                                                Metode evaluasi UI/UX yang dilakukan dengan cara
                                                                mengamati
                                                                bagaimana target user menggunakan Produk Anda.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card my-3 cursor-pointer"
                                                :class="selectedServices === 'Software Testing' ? 'selected' : ''"
                                                @click="selectProductTest({id: serviceId.st, name: 'Software Testing', services: 'SoftwareTesting', service_code: 'st', slug: 'software-testing'})">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <div class="bg-white border p-2 rounded-circle"></div>
                                                        </div>
                                                        <div class="col">
                                                            <h6 class="text-gray-main font-weight-700">Software Testing
                                                            </h6>
                                                            <label
                                                                class="text-gray-light-1 font-size-14 line-height-24">
                                                                Pengujian produk digital untuk memeriksa apakah
                                                                fungsi-fungsi
                                                                pada produk yang dibangun telah berjalan sesuai dengan
                                                                rancangan
                                                                yang dibuat.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card my-3 cursor-pointer"
                                                :class="selectedServices === 'Security Testing' ? 'selected' : ''"
                                                @click="selectProductTest({id: serviceId.sc, name: 'Security Testing', services: 'SecurityTesting', service_code: 'sc', slug: 'security-testing'})">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <div class="bg-white border p-2 rounded-circle"></div>
                                                        </div>
                                                        <div class="col">
                                                            <h6 class="text-gray-main font-weight-700">Security Testing
                                                            </h6>
                                                            <label
                                                                class="text-gray-light-1 font-size-14 line-height-24">
                                                                Pengujian untuk memvalidasi fungsionalitas keamanan
                                                                aplikasi
                                                                atau sistem secara menyeluruh menggunakan metode
                                                                Penetration
                                                                Testing.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card my-3 cursor-pointer"
                                                :class="selectedServices === 'Service Operation' ? 'selected' : ''"
                                                @click="selectProductTest({id: serviceId.so, name: 'Service Operation', services: 'AlihKelola', service_code: 'so', slug: 'alih-kelola'})">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <div class="bg-white border p-2 rounded-circle"></div>
                                                        </div>
                                                        <div class="col">
                                                            <h6 class="text-gray-main font-weight-700">Service Operation
                                                            </h6>
                                                            <label
                                                                class="text-gray-light-1 font-size-14 line-height-24">
                                                                Layanan yang kami sediakan yaitu service operation dari
                                                                produk digital yang telah siap/sudah <i>Go To
                                                                    Market</i>.
                                                                Service Operation meliputi Customer Care dan Product
                                                                Feedback. DOA menggunakan Omni-Channel Salesforce
                                                                (lengkapnya cari di proposal SF) sebagai tools contact
                                                                center yang beroperasi 24/7 dengan channel yang kami
                                                                gunakan yaitu email, whatsapp, telegram, live chat, dan
                                                                media social.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-2" role="tabpanel" class="bs-stepper-pane fade"
                                            :class="step === 2 ? 'active dstepper-block' : 'd-none'"
                                            aria-labelledby="steptrigger2">
                                            <div>
                                                <h5 class="text-gray-blue-100 font-weight-700 line-height-27">
                                                    Data Produk
                                                </h5>
                                                <hr class="border-hr">
                                                <app-he-component
                                                    v-if="selectedServices === 'Heuristic Evaluation (HE)'"
                                                    :Data="Data.TahapanPengajuan.data" :Product="Data.Product"
                                                    :Tribe="Data.Tribe">
                                                </app-he-component>
                                                <app-st-component v-if="selectedServices === 'Software Testing'"
                                                    :Data="Data.TahapanPengajuan.data" :Product="Data.Product"
                                                    :Tribe="Data.Tribe">
                                                </app-st-component>
                                                <app-ut-component v-if="selectedServices === 'Usability Testing (UT)'"
                                                    :Data="Data.TahapanPengajuan.data" :Product="Data.Product"
                                                    :Tribe="Data.Tribe">
                                                </app-ut-component>
                                                <app-sc-component v-if="selectedServices === 'Security Testing'"
                                                    :Data="Data.TahapanPengajuan.data" :Product="Data.Product"
                                                    :Tribe="Data.Tribe">
                                                </app-sc-component>
                                                <app-ak-component v-if="selectedServices === 'Service Operation'"
                                                    :Data="Data.TahapanPengajuan.data" :Product="Data.Product"
                                                    :Tribe="Data.Tribe">
                                                </app-ak-component>

                                                <!-- <div class="form-group">
                                                    <label class="text-body-1">Unit/tribe pengaju</label>
                                                    <input type="text" class="form-control" id="bgst"
                                                        v-model="Data.TahapanPengajuan.data.unit"
                                                        placeholder="misal : DEX">
                                                    <small class="form-text text-muted pt-1">
                                                        Silahkan diisi dengan nama unit.
                                                    </small>
                                                </div> -->

                                                <h5 class="text-gray-blue-100 font-weight-700 line-height-27">
                                                    Data tambahan (optional)
                                                </h5>
                                                <hr class="border-hr">

                                                <div class="form-group">
                                                    <label class="pb-1 text-body-1">
                                                        Pendapatan (revenue)
                                                        <em class="far fa-question-circle font-size-12 cursor-pointer"
                                                            id="revenue"></em>
                                                    </label>
                                                    <b-popover target="revenue" triggers="click hover"
                                                        placement="right">
                                                        <div class="font-size-12">
                                                            <p>
                                                                Masukkan perkiraan atau rentang pendapatan produk per
                                                                tahun.
                                                            </p>
                                                            <span class="font-weight-700">
                                                                Contoh:
                                                                <br>
                                                                Rp50.000.000/tahun
                                                                Rp420.000.000 – Rp1.000.000.000/tahun
                                                            </span>
                                                        </div>
                                                    </b-popover>
                                                    <input type="text" class="form-control"
                                                        v-model.trim="$v.Data.TahapanPengajuan.data.revenue.$model"
                                                        :class="{ 'is-invalid': $v.Data.TahapanPengajuan.data.revenue.$error }">
                                                    <span class="invalid-feedback pt-2">
                                                        <span v-if="!$v.Data.TahapanPengajuan.data.revenue.minLength">
                                                            Masukkan minimal
                                                            {{ $v.Data.TahapanPengajuan.data.revenue.$params.minLength.min }}
                                                            karakter.
                                                        </span>
                                                        <span v-if="!$v.Data.TahapanPengajuan.data.revenue.maxLength">
                                                            Masukkan maksimal
                                                            {{ $v.Data.TahapanPengajuan.data.revenue.$params.maxLength.max }}
                                                            karakter.
                                                        </span>
                                                    </span>
                                                </div>

                                                <div class="form-group">
                                                    <label class="pb-1 text-body-1">
                                                        Dampak (impact)
                                                        <em class="far fa-question-circle font-size-12 cursor-pointer"
                                                            id="impact"></em>
                                                    </label>
                                                    <b-popover target="impact" triggers="click hover" placement="right">
                                                        <div class="font-size-12">
                                                            <p>
                                                                Jelaskan kategori produk Anda (bergerak di bidang apa)
                                                                dan tujuannya dengan singkat.
                                                            </p>
                                                            <span class="font-weight-700">
                                                                Contoh:
                                                                <br>
                                                                Produk telekomunikasi ini bertujuan untuk melayani
                                                                pengguna Telkom.
                                                            </span>
                                                        </div>
                                                    </b-popover>
                                                    <textarea type="text" class="form-control"
                                                        v-model.trim="$v.Data.TahapanPengajuan.data.impact.$model"
                                                        :class="{ 'is-invalid': $v.Data.TahapanPengajuan.data.impact.$error }"
                                                        rows="3">
                                                    </textarea>
                                                    <span class="invalid-feedback pt-2">
                                                        <span v-if="!$v.Data.TahapanPengajuan.data.impact.minLength">
                                                            Masukkan minimal
                                                            {{ $v.Data.TahapanPengajuan.data.impact.$params.minLength.min }}
                                                            karakter.
                                                        </span>
                                                        <span v-if="!$v.Data.TahapanPengajuan.data.impact.maxLength">
                                                            Masukkan maksimal
                                                            {{ $v.Data.TahapanPengajuan.data.impact.$params.maxLength.max }}
                                                            karakter.
                                                        </span>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                        <div id="step-3" role="tabpanel" class="bs-stepper-pane fade"
                                            :class="step === 3 ? 'active dstepper-block' : 'd-none'"
                                            aria-labelledby="steptrigger3">
                                            <div style="height: 33rem;overflow-x: hidden;">
                                                <h5 class="text-gray-blue-100 font-weight-700 line-height-27">
                                                    Contoh dokumen lampiran
                                                </h5>
                                                <hr class="border-hr mb-4">
                                                <div class="card bg-fafafa my-3" style="border-radius: 10px;"
                                                    v-if="Data.TemplateDocuments.length === 0">
                                                    <div class="p-3">
                                                        <div class="row">
                                                            <div class="col align-self-center">
                                                                <span
                                                                    class="text-gray-blue-100 font-size-14 font-weight-400">
                                                                    Tidak ada contoh dokumen lampiran
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card bg-fafafa my-3" style="border-radius: 10px;"
                                                    v-for="(item, index) in Data.TemplateDocuments" :key="index">
                                                    <div class="p-3">
                                                        <div class="row">
                                                            <div class="col-auto align-self-center">
                                                                <img class="section-vector"
                                                                    src="https://minio.digitalpass.id/static/assets/icon/doc.svg"
                                                                    alt="doc">
                                                            </div>
                                                            <div class="col align-self-center">
                                                                <span
                                                                    class="text-gray-blue-100 font-size-14 font-weight-400">{{ item.name }}</span>
                                                            </div>
                                                            <div class="col-auto">
                                                                <button @click="download(item)"
                                                                    :disabled="Loader.IsLoadingFile"
                                                                    class="btn btn-secondary font-size-14 font-weight-700">
                                                                    <em class="fas fa-circle-notch fa-spin"
                                                                        v-if="Loader.IsLoadingFile"></em>
                                                                    <img class="section-vector"
                                                                        v-if="!Loader.IsLoadingFile"
                                                                        src="https://minio.digitalpass.id/static/assets/icon/donwload-doc.svg"
                                                                        alt="donwload-doc">
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span class="text-gray-main font-size-12">*(Khusus mobile
                                                    application)</span>
                                                <h5 class="text-gray-blue-100 font-weight-700 line-height-27 mt-5">
                                                    Upload dokumen lampiran
                                                </h5>
                                                <hr class="border-hr">
                                                <div v-if="Loader.IsLoading"
                                                    class="alert alert-warning text-gray-blue-100 font-size-14 font-weight-500 line-height-27 mt-4" role="alert">
                                                    Sedang mengupload file lampiran
                                                    <b-spinner small class="ml-1" style="margin-bottom: 2px;"></b-spinner>
                                                </div>
                                                <div class="row">
                                                    <div class="col-auto my-2" v-for="(item, index) in fileUpload"
                                                        :key="index">
                                                        <div class="card max-file-size fold bg-fafafa p-1">
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
                                                                    <label class="font-size-9 font-weight-500"
                                                                        style="color: #BDBDBD;">
                                                                        {{ item.sizeFile }} {{ item.typeSizeFile }}
                                                                    </label>
                                                                    <div>
                                                                        <button class="btn btn-secondary px-2 py-0"
                                                                            @click="removeFileUpload(index)"
                                                                            style="background: #626262;">
                                                                            <img class="cursor-pointer"
                                                                                src="https://minio.digitalpass.id/static/assets/icon/trash.svg"
                                                                                alt="">
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <!-- <div class="col-auto">
                                                                    <b-spinner small label="Small Spinner" v-if="item.isUploading"></b-spinner>
                                                                    <div v-else>
                                                                        <em class="fa fa-check text-success" v-if="item.isSuccess"></em>
                                                                        <em class="fa fa-times text-red-main" v-if="!item.isSuccess"></em>
                                                                    </div>
                                                                </div> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4 my-1">
                                                        <div class="card max-file-size cursor-pointer"
                                                            @click="addButtonUpload"
                                                            style="border-style: dashed;background: #EBEFF5;">
                                                            <div class="card-body text-center">
                                                                <img class="cursor-pointer mt-2"
                                                                    src="https://minio.digitalpass.id/static/assets/icon/add-doc.svg"
                                                                    alt="add-doc">
                                                                <br>
                                                                <label class="font-size-12 mt-2">Tambah Lampiran</label>
                                                            </div>
                                                        </div>
                                                        <input type="file" class="d-none" id="addButton" 
                                                            @change="fileChanges($event)">
                                                    </div>
                                                </div>
                                                <p class="mt-4 mb-0">
                                                    <span class="text-gray-main font-size-12">
                                                        *Pastikan lampiran Anda telah sesuai dengan template dokumen
                                                        yang telah kami sediakan.
                                                    </span>
                                                </p>
                                                <p>
                                                    <span class="text-gray-main font-size-12">
                                                        *Dokumen lampiran Deskripsi produk maksimal
                                                        ukuran 25 MB.
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div id="step-4" role="tabpanel" class="bs-stepper-pane fade"
                                            :class="step === 4 ? 'active dstepper-block' : 'd-none'"
                                            aria-labelledby="steptrigger4">
                                            <div>
                                                <label class="text-gray-main font-weight-14 font-weight-400">Layanan
                                                    yang diajukan adalah </label>
                                                <h4 class="text-gray-main font-weight-700 line-height-36">
                                                    {{ Data.TahapanPengajuan.data.product_test_type || '-' }}
                                                </h4>
                                                <hr class="border-hr">
                                                <label
                                                    class="text-gray-main font-size-18 font-weight-700 line-height-24">Data
                                                    produk</label>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">Nama
                                                            Produk</label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-700">{{ Data.TahapanPengajuan.data.product_name || '-' }}</label>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">Deskripsi
                                                            Produk</label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <p class="text-gray-main font-size-12 font-weight-700">
                                                            {{ Data.TahapanPengajuan.data.product_description || '-' }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="row"
                                                    v-if="selectedServices === 'Usability Testing (UT)' || selectedServices === 'Heuristic Evaluation (HE)'">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">Link
                                                            Produk</label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <a :href="Data.TahapanPengajuan.data.product_link"
                                                            class="font-weight-700 font-size-12 line-height-16"
                                                            target="_blank" style="color: #56CCF2;">
                                                            {{ Data.TahapanPengajuan.data.product_link || '-' }}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                                            Unit
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-700">{{ Data.TahapanPengajuan.data.unit || '-' }}</label>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                                            Revenue
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-700">{{ Data.TahapanPengajuan.data.revenue || '-' }}</label>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                                            Impact
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <p class="text-gray-main font-size-12 font-weight-700">
                                                            {{ Data.TahapanPengajuan.data.impact || '-' }}</p>
                                                    </div>
                                                </div>
                                                <div class="row" v-if="selectedServices === 'Software Testing'">
                                                    <div class="col-3">
                                                        <label
                                                            class="text-gray-main font-size-12 font-weight-400 line-height-16">
                                                            Jenis Pengujian
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col">
                                                        <ul class="pl-3">
                                                            <li class="text-gray-main font-size-12 font-weight-700"
                                                                v-for="(item, index) in Data.TahapanPengajuan.data.product_sub_test_type"
                                                                :key="index">
                                                                {{ item }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <label
                                                    class="text-gray-main font-size-18 font-weight-700 line-height-24 mt-3">
                                                    Lampiran dokumen
                                                </label>
                                                <div class="row">
                                                    <div class="col-auto my-2" v-for="(item, index) in fileUpload"
                                                        :key="index">
                                                        <div class="card max-file-size fold bg-fafafa p-1">
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
                                                                    <label class="font-size-9 font-weight-500"
                                                                        style="color: #BDBDBD;">
                                                                        {{ item.sizeFile }} {{ item.typeSizeFile }}
                                                                    </label>
                                                                </div>
                                                                <!-- <div class="col-auto">
                                                                    <b-spinner small label="Small Spinner"></b-spinner>
                                                                    <div>
                                                                        <em class="fa fa-check text-success"></em>
                                                                        <em class="fa fa-times text-red-main"></em>
                                                                    </div>
                                                                </div> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" style="">
                <div class="row border-left border-bottom border-right px-4 py-3">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <a class="batalkan" v-b-modal.modal-center v-if="step !== 1">
                            <span class="text-danger">Batalkan</span>
                        </a>

                        <!-- Step 1 Pilih Layanan -->
                        <button type="button" @click="nextStep"
                            class="btn btn-danger float-right font-size-16 font-weight-700" v-if="step === 1"
                            :disabled="!selectedServices ? true : false">
                            Berikutnya
                        </button>
                        <!-- Step 1 -->

                        <!-- Step 2 Isi Detail Produk -->
                        <button type="button" @click="nextStep"
                            class="btn btn-danger float-right font-size-16 font-weight-700"
                            v-if="step === 2 && selectedServices === 'Usability Testing (UT)'"
                            :disabled="$v.Data.TahapanPengajuan.data.$invalid">
                            Berikutnya
                        </button>
                        <button type="button" @click="nextStep"
                            class="btn btn-danger float-right font-size-16 font-weight-700"
                            v-if="step === 2 && selectedServices !== 'Usability Testing (UT)'"
                            :disabled="$v.Data.TahapanPengajuan.data.$invalid">
                            Berikutnya
                        </button>
                        <!-- Step 2 -->

                        <!-- Step 3 Upload File -->
                        <button type="button" @click="nextStep"
                            class="btn btn-danger float-right font-size-16 font-weight-700" v-if="step === 3"
                            :disabled="disabledSuccessUpload || fileUpload.length === 0 ? true : false" v-html="'Berikutnya'">
                        </button>
                        <!-- Step 3 -->

                        <!-- Step 4 Selesai -->
                        <button type="button" @click="nextStep"
                            class="btn btn-danger float-right font-size-16 font-weight-700" v-if="step === 4"
                            :disabled="Loader.IsLoading" v-html="'Selesai'">
                        </button>
                        <!-- Step 4 -->

                        <button type="button"
                            class="btn btn-outline-danger mx-2 float-right font-size-16 font-weight-700"
                            v-b-modal.modal-center v-if="step === 1" v-html="'Batalkan'">
                        </button>

                        <button type="button" @click="prevStep"
                            class="btn btn-outline-danger mx-2 float-right font-size-16 font-weight-700"
                            v-if="step !== 1" v-html="'Kembali'">
                        </button>

                    </div>
                </div>
            </div>
            <div>
                <b-modal id="modal-center" centered hide-footer>
                    <template #modal-title>
                        <h5 class="modal-title text-black font-size-20 font-weight-700">
                            Batalkan Pengajuan?
                        </h5>
                    </template>
                    <label class="font-size-14">
                        Apakah Anda yakin untuk membatalkan pengajuan ini ?
                        <br>
                        <!-- <strong>“Judul Pengajuan”</strong> -->
                    </label>
                    <div class="modal-footer border-0 p-0">
                        <button type="button" class="btn btn-outline-red"
                            @click="$bvModal.hide('modal-center')">Lanjutkan
                            Pengajuan</button>
                        <nuxt-link to="/">
                            <button type="button" class="btn btn-red">Batalkan Pengajuan</button>
                        </nuxt-link>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        maxLength,
        minLength,
        url
    } from 'vuelidate/lib/validators'
    import HEComponent from '@/components/portal/TahapanPengajuan/HE.vue';
    import STComponent from '@/components/portal/TahapanPengajuan/ST.vue';
    import UTComponent from '@/components/portal/TahapanPengajuan/UT.vue';
    import SCComponent from '@/components/portal/TahapanPengajuan/SC.vue';
    import AKComponent from '@/components/portal/TahapanPengajuan/AK.vue';

    export default {
        mixins: [mixins],
        layout: 'portal/tahapan-pengajuan',
        components: {
            'app-he-component': HEComponent,
            'app-st-component': STComponent,
            'app-ut-component': UTComponent,
            'app-sc-component': SCComponent,
            'app-ak-component': AKComponent,
        },
        data() {
            return {
                step: 1,
                selectedServices: '',
                Data: {
                    TahapanPengajuan: {
                        data: {
                            product_name: '',
                            service_code: '',
                            product_link: '',
                            product_sub_test_type: [],
                            product_description: '',
                            service_id: '',
                            status: '',
                            unit: '',
                            revenue: '',
                            impact: '',
                            product_test_type: '',
                            requested_by: '',
                            product: null,
                            tribe: null
                        }
                    },
                    TemplateDocuments: [],
                    Product: [],
                    Tribe: []
                },
                fileUpload: [],
                Loader: {
                    IsLoading: false,
                    IsLoadingFile: false
                },
                Filter: {
                    Tribe: null
                },
                serviceId: {
                    he: null,
                    ut: null,
                    st: null,
                    sc: null,
                    so: null,
                },
                disabledSuccessUpload: true
            }
        },
        validations: {
            Data: {
                TahapanPengajuan: {
                    data: {
                        product_name: {
                            required,
                            maxLength: maxLength(50),
                            minLength: minLength(3)
                        },
                        product_description: {
                            required,
                            maxLength: maxLength(100),
                            minLength: minLength(3)
                        },
                        unit: {
                            required,
                            maxLength: maxLength(50),
                            minLength: minLength(3)
                        },
                        product_link: {
                            maxLength: maxLength(50),
                            url,
                        },
                        revenue: {
                            minLength: minLength(3),
                            maxLength: maxLength(100),

                        },
                        impact: {
                            minLength: minLength(3),
                            maxLength: maxLength(100),
                        },
                        product: {
                            required
                        },
                        tribe: {
                            minLength: minLength(3)
                        }
                    }
                }
            }
        },
        created() {
            this.getAllService();
        },
        mounted() {
            this.checkServicesFrom();
            this.GetTribe();
            this.GetProduct();
        },
        watch: {
            'Data.TahapanPengajuan.data.tribe'() {
                this.GetProduct();
            }
        },
        methods: {
            validation() {},
            checkServicesFrom() {
                const servicesId = this.$store.state.product_id;
                const servicesName = this.$store.state.product_type_slug;
                const servicesTestType = this.$store.state.product_test_type;
                switch (servicesName) {
                    case 'heuristic-evaluation':
                        this.selectedServices = 'Heuristic Evaluation (HE)';
                        this.Data.TahapanPengajuan.data.service_id = servicesId;
                        this.Data.TahapanPengajuan.data.product_test_type = servicesTestType;
                        break;
                    case 'usability-testing':
                        this.selectedServices = 'Usability Testing (UT)';
                        this.Data.TahapanPengajuan.data.service_id = servicesId;
                        this.Data.TahapanPengajuan.data.product_test_type = servicesTestType;
                        break;
                    case 'software-testing':
                        this.selectedServices = 'Software Testing';
                        this.Data.TahapanPengajuan.data.service_id = servicesId;
                        this.Data.TahapanPengajuan.data.product_test_type = servicesTestType;
                        break;
                    case 'security-testing':
                        this.selectedServices = 'Security Testing';
                        this.Data.TahapanPengajuan.data.service_id = servicesId;
                        this.Data.TahapanPengajuan.data.product_test_type = servicesTestType;
                        break;
                    case 'alih-kelola':
                        this.selectedServices = 'Service Operation';
                        this.Data.TahapanPengajuan.data.service_id = servicesId;
                        this.Data.TahapanPengajuan.data.product_test_type = servicesTestType;
                        break;
                }
            },
            getAttachmentTemplate(id) {
                this.GET(`/api/v3/attachment-template?service_id=${id}`, 'BASIC', (
                    data) => {
                    if (data.code === 200) {
                        this.Data.TemplateDocuments = data.content;
                    }
                });
            },
            selectProductTest(item) {
                this.ResetValue();
                // this.Data.TahapanPengajuan.length = 0;
                this.selectedServices = item.name;
                this.Data.TahapanPengajuan.data.service_id = item.id;
                this.Data.TahapanPengajuan.data.product_test_type = item.name;
                this.Data.TahapanPengajuan.data.service_code = item.service_code;
                console.log(item.id)
                this.getAttachmentTemplate(item.id);
            },
            // async GetServiceBySlug(slug) {
            //     const obj = {
            //         slug: slug
            //     };
            //     await this.Request('GET', '/api/v3/service', null, obj, 'BASIC', (callback) => {
            //         if (callback.code === 200) {
            //             for (let x of data.content) {
            //                 this.getAttachmentTemplate(x.id);
            //             }
            //         };
            //     });
            // },
            ResetValue() {
                this.Data.TahapanPengajuan.data = {
                    product_name: '',
                    product_code_name: '',
                    product_link: '',
                    product_sub_test_type: [],
                    product_description: '',
                    service_id: '',
                    status: '',
                    unit: '',
                    revenue: '',
                    impact: '',
                    product_test_type: '',
                    requested_by: '',
                    product: null,
                    tribe: null
                };
                this.fileUpload = [];
                document.getElementById('addButton').value = '';
            },
            async postDataPengajuan() {




                this.Loader.IsLoading = true;




                                    

                let IsNewProduct = localStorage.getItem('IsNewProduct');
                if (IsNewProduct) {
                    this.CreateProduct();
                };

                this.Loader.IsLoading = false;


                this.Swal('success', 'Sukses!',
                                        'Pengajuan ini telah berhasil anda buat dan akan segera diinformasikan kepada supervisor'
                                    ).then((result) => {
                                        this.$router.push('/profile/data-pengajuan')
                                    });




            },
            fileChanges(event) {
                this.disabledSuccessUpload = true;
                for (let x of event.target.files) {
                    x.isUploading = true;
                    x.isSuccess = null;
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
                        this.checkValidationFile(x);
                    }
                }
            },
            addButtonUpload() {
                this.$nextTick(function () {
                    document.getElementById('addButton').click();
                });
            },
            removeFileUpload(index) {
                this.fileUpload.splice(index, 1);
            },
            nextStep() {
                if (this.step === 4) {
                    this.postDataPengajuan();
                } else {
                    this.step++;
                }
            },
            prevStep() {
                if (this.step === 1) {} else {
                    this.step--;
                }
            },
            download(data) {
                window.open(data.path, '_blank');
            },
            GetTribe() {
                this.Request('GET', '/api/v3/tribe', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        if (callback.content.length > 0) {
                            const arr = callback.content.map(x => {
                                return {
                                    id: x.id,
                                    label: x.name
                                }
                            });
                            this.Data.Tribe = arr;
                        } else {
                            this.Data.Tribe = [];
                        };
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetProduct() {
                if (this.Data.TahapanPengajuan.data.tribe !== null) {
                    this.Data.Product = [];
                    this.Data.TahapanPengajuan.data.product = null;
                    this.Request('GET', '/api/v3/product-by-tribe/' + this.Data.TahapanPengajuan.data.tribe, null, null,
                        'BEARER', (
                            callback) => {
                            if (callback.code === 200) {
                                if (callback.content.length > 0) {
                                    const arr = callback.content.map(x => {
                                        return {
                                            id: x.id,
                                            label: x.name
                                        }
                                    });
                                    this.Data.Product = arr;
                                } else {
                                    this.Data.Product = [];
                                };
                            } else {
                                // this.HelperErrorCode(callback);
                            };
                        });
                }
            },
            CreateProduct() {
                let body = {
                    name: this.Data.TahapanPengajuan.data.product,
                    description: this.Data.TahapanPengajuan.data.product,
                    tribe_id: this.Data.TahapanPengajuan.data.tribe
                };
                this.Request('POST', '/api/v3/product/create', null, body, 'BEARER', (callback) => {
                    localStorage.removeItem('IsNewProduct');
                });
            },

            async getAllService() {
                await this.Request('GET', '/api/v3/service', null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        let he = callback.content.find((x) => {
                            return x.slug === 'heuristic-evaluation'
                        });
                        let ut = callback.content.find((x) => {
                            return x.slug === 'usability-testing'
                        });
                        let st = callback.content.find((x) => {
                            return x.slug === 'software-testing'
                        });
                        let sc = callback.content.find((x) => {
                            return x.slug === 'security-testing'
                        });
                        let so = callback.content.find((x) => {
                            return x.slug === 'alih-kelola'
                        });

                        this.serviceId.he = he.id;
                        this.serviceId.ut = ut.id;
                        this.serviceId.st = st.id;
                        this.serviceId.sc = sc.id;
                        this.serviceId.so = so.id;
                    };
                    console.log(this.serviceId)
                });
            },

            async checkValidationFile(file) {
                this.Loader.IsLoading = true;
                let IsNewProduct = localStorage.getItem('IsNewProduct');
                if (IsNewProduct) {
                    this.CreateProduct();
                };
                const fd = new FormData();
                fd.append('product_name', this.Data.TahapanPengajuan.data.product_name);
                fd.append('product_link', this.Data.TahapanPengajuan.data.product_link);
                fd.append('product_sub_test_type', this.Data.TahapanPengajuan.data.product_sub_test_type);
                fd.append('product_description', this.Data.TahapanPengajuan.data.product_description);
                fd.append('service_id', this.Data.TahapanPengajuan.data.service_id);
                fd.append('status', '3');
                fd.append('unit', this.Data.TahapanPengajuan.data.unit);
                fd.append('revenue', this.Data.TahapanPengajuan.data.revenue);
                fd.append('micro_impact', this.Data.TahapanPengajuan.data.impact);
                fd.append('product_test_type', this.Data.TahapanPengajuan.data.product_test_type);
                fd.append('requested_by', this.UserLogin().id);
                fd.append('product', this.Data.TahapanPengajuan.data.product.id);
                fd.append('tribe', this.Data.TahapanPengajuan.data.tribe);
                await this.POST(`/api/v3/request/create`, fd, 'BASIC', (data) => {
                    if (data.code === 200) {
                        [file].forEach((item, index) => {
                            item.isUploading = true;
                            item.isSuccess = null;

                            const fd = new FormData();
                            fd.append('request_id', data.content[0].id);
                            fd.append('name', item.name);
                            fd.append('imgFile', item);
                            fd.append('type', item.type);
                            fd.append('file_type', 'lampiran');
                            fd.append('service', this.Data.TahapanPengajuan.data.service_code);
                            fd.append('product_name', this.Data.TahapanPengajuan.data.product_name);
                            this.POST(`/api/v3/request-attachment/create`, fd, 'BASIC', (data) => {
                                if (data.code === 200) {
                                    item.isUploading = false;
                                    item.isSuccess = true;
                                    this.disabledSuccessUpload = false;
                                    let temp = [...this.fileUpload, item]
                                    this.fileUpload = temp;
                                } else {
                                    item.isUploading = false;
                                    item.isSuccess = false;
                                }
                                if (this.fileUpload.length) {
                                    this.Loader.IsLoading = false;
                                }
                            });
                        });

                    } else if (data.code === 409) {

                        this.Loader.IsLoading = false;
                        this.swal('error', data.message.details.map(x => x.message));
                    } else {
                        this.Loader.IsLoading = false;
                        this.swal('error', 'Gagal mengajukan data');
                    }
                });
            },

        }
    }

</script>

<style scoped>
    .bs-stepper-line,
    .bs-stepper .line {
        background-color: transparent !important;
        flex: unset !important;
    }

    .bs-stepper-line {
        width: 18rem;
        margin-left: 23px;
        border-left: 2px solid #D6D7D6;
        height: 65px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .bs-stepper-line span {
        position: relative;
        left: 27px;
        bottom: 15px;

    }

    .bs-stepper-circle {
        background-color: transparent;
        border: 2px solid #D6D7D6;
        padding: 0.3em 0;
        color: black;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        justify-content: center;
        display: flex;
    }

    .active .bs-stepper-circle {
        border: 3px solid #74B816;
        background-color: transparent;
        color: black;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        justify-content: center;
        display: flex;
    }

    .step.active {
        opacity: unset !important;
    }

    .card:hover {
        background: #F3F3FC;
    }

    .card.selected {
        background: #ED2B24;
    }

    .card.selected .card-body .row .col>h6,
    .card.selected .card-body .row .col>label {
        color: white !important;
    }

    .card.selected .card-body .row .col-auto .bg-white {
        padding: 5px !important;
        border: 5px solid #B21E19 !important;
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

    .form-control:focus {
        box-shadow: unset !important;
    }


    .panel-icon>a:before {
        content: "+";
    }

    .panel-icon>a.collapsed:before {
        content: "-";
    }

    a.batalkan:focus {
        outline: none !important;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @media screen and (max-width: 520px) {

        .bs-stepper-line {
            border-left: unset;
            margin-left: auto;
            width: auto;
        }

        .bs-stepper-line span {
            left: unset;
        }
    }

    .form-group {
        margin-bottom: 2rem !important;
    }

</style>
