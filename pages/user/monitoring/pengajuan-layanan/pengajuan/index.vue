<template>
    <div class="d-flex align-items-center"> 
        <div class="container">
            <div>
                <div class="row">
                    <div class="col-xl-6">
                        <img src="/v3/Portal/assets/icon/LOGO_DSA.svg" />
                    </div>
                    <div class="col-xl-6 d-flex justify-content-end">
                        <div class="cursor-pointer" @click="handleBatalkanPengajuan()">
                            <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_BAN.svg" />
                        </div>
                    </div>
                </div>
                <div class="bg-white" style="padding: 36px; margin-top: 46px">
                    <div class="row">
                        <div class="col-xl-6" v-if="Step.isStep !== 4 && Step.isStep !== 5 ">
                            <div class="title-information-layanan">
                                <p>
                                    Solusi untuk semua kebutuhan produk digital Anda
                                </p>
                            </div>
                            <div class="sub-information-layanan">
                                <p>
                                    Syarat yang perlu disiapkan :
                                </p>
                                <ul>
                                    <li>
                                        Download dokumen pengajuan
                                        <a href="https://minio.digitalpass.id/static/DokumenRequirementTestingDigitalpassV1.zip" class="redirect-link">
                                            disini
                                        </a>
                                    </li>
                                    <li>
                                        Deskripsi & Detail produk yang akan diajukan
                                    </li>
                                    <li>
                                        Dokumen proses bisnis produk (alur produk)
                                    </li>
                                    <li>
                                        Link website / aplikasi produk
                                    </li>
                                </ul>
                            </div>
                            <p class="any-information-layanan">
                                Jika ada hal yang ingin ditanyakan, dapat membuka halaman
                                <a href="#" class="redirect-link">
                                    FAQ
                                </a>
                                atau menghubungi
                                <a href="#" class="redirect-link">
                                    layanan informasi
                                </a>
                                kami.
                            </p>
                        </div>
                        <div class="col-xl-6" v-if="Step.isStep === 4 && $v.Form.Pengajuan.is_priority.$model === true">
                            <div class="title-information-percepatan">
                                <p>
                                    Pengajuan Percepatan Layanan
                                </p>
                            </div>
                            <p class="any-information-percepatan">
                                Anda dapat mengajukan layanan tanpa antrian dengan Pengajuan Percepatan Layanan                               
                            </p>

                            <div class="orange-rectangle">
                                
                                <div class="chipVar">
                                    <img class="masterchipicon" alt="" src="../../../../../assets/images/icon/info.svg">
                                    <div class="masterchiptext">
                                        <div class="medium"> Penting </div>
                                    </div>
                                </div>
                                <h5>
                                    Untuk mengajukan percepatan layanan, anda perlu menyiapkan justifikasi eviden berupa NDE (Nota Dinas Elektronik) atau Screenshot chat approval dari Senior Leader (Band 1).
                                </h5>
                            </div>
                            <div class="sub-information-sla">
                                <p>
                                    Estimasi Pengerjaan Layanan :
                                </p>
                                <div class="sub-information">
                                    <b>Heuristic Evaluation</b>
                                     <ul>
                                        <li>
                                            HE Simple 7 Hari Kerja
                                        </li>
                                        <li>
                                            HE Medium 10 Hari Kerja
                                        </li>
                                        <li>
                                            HE Complex 15 Hari Kerja
                                        </li>
                                    </ul>
                                    <div class="sub-sla" >
                                        <b>Usability Testing (UT)</b> 15 Hari Kerja<br>
                                        <b>Functional Testing</b> 5 Hari Kerja<br>
                                        <b>Software Testing</b> 5 Hari Kerja<br>
                                        <b>Security Testing</b> 5 Hari Kerja<br>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                        <div :class="Step.isStep !== 5 ? 'col-xl-6' : 'col-xl-12'">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="section-layanan">
                                        <p class="title">
                                            Layanan yang <span v-html="Step.isStep !== 5 ? 'dipilih' : 'diajukan'"></span>
                                            <span class="badge-selected-service"
                                                v-if="Data.selectedServices.length !== 0 && Step.isStep !== 5">
                                                Layanan terpilih
                                            </span>
                                        </p>
                                        <div v-if="Data.selectedServices.length === 0">
                                            <div class="no-pilih-layanan">
                                                <div class="row">
                                                    <div class="col-auto">
                                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_PILIH_LAYANAN.svg">
                                                    </div>
                                                    <div class="col d-flex align-items-center">
                                                        <label>
                                                            Kamu belum mengajukan layanan, pilih layanan dibawah ini !
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="service-list">
                                                <div class="row" v-if="$v.Form.Pengajuan.is_gtm_bundle === true">
                                                    <div class="col-auto align-self-center">
                                                        <div class="service-logo">
                                                            <img  :src="`/v3/Portal/assets/icon/PENGAJUAN_LAYANAN_go-to-market.svg`" />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <p class="service-name">
                                                            Go to Market
                                                        </p>
                                                        <label class="service-desc">
                                                            Layanan Evaluasi yang mencakup keseluruhan layanan pada digitalpass.id
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="service-list" v-for="(item, index) of Data.selectedServices"
                                                :key="index">
                                                <div class="row" v-if="$v.Form.Pengajuan.is_gtm_bundle !== true">
                                                    <div class="col-auto align-self-center">
                                                        <div class="service-logo">
                                                            <img 
                                                                :src="`/v3/Portal/assets/icon/PENGAJUAN_LAYANAN_${item.slug}.svg`" />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <p class="service-name">
                                                            {{ item.name }}
                                                        </p>
                                                        <label class="service-desc">
                                                            {{ item.desc_text }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12" v-if="Step.isStep === 1">
                                    <div class="section-layanan">
                                        <p class="title">
                                            Pilih layanan (Anda bisa mengajukan lebih dari 1 layanan)
                                        </p>
                                        <div class="service-list">
                                            <div class="row">
                                                <div class="col-auto align-self-center">
                                                    <div class="service-logo">
                                                        <img
                                                            :src="`/v3/Portal/assets/icon/PENGAJUAN_LAYANAN_go-to-market.svg`" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <p class="service-name">
                                                        Go to Market
                                                    </p>
                                                    <label class="service-desc">
                                                        Layanan Evaluasi yang mencakup keseluruhan layanan pada digitalpass.id
                                                    </label>
                                                </div>
                                                <div class="col-auto d-flex justify-content-end">
                                                    <div>
                                                        <input v-model="$v.Form.Pengajuan.is_gtm_bundle" class="swal2-checkbox" type="checkbox" :value="true"
                                                        @change="onChangeGTM()">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="service-list" v-for="(item, index) of Data.listServices"
                                            :key="index">
                                            <div class="row">
                                                <div class="col-auto align-self-center">
                                                    <div class="service-logo">
                                                        <img
                                                            :src="`/v3/Portal/assets/icon/PENGAJUAN_LAYANAN_${item.slug}.svg`" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <p class="service-name">
                                                        {{ item.name }}
                                                    </p>
                                                    <label class="service-desc">
                                                        {{ item.desc_text }}
                                                    </label>
                                                </div>
                                                <div class="col-auto d-flex justify-content-end">
                                                    <div>
                                                        <input  class="swal2-checkbox" type="checkbox" 
                                                        :id="'serviceCheckbox' + index" 
                                                        :value="item.id" 
                                                        :checked="shouldCheckCheckbox(item)"
                                                        :class="{ 'disabled': handleDisabledCheckbox() }"
                                                        :disabled="handleDisabledCheckbox()"
                                                        @change="onChangeService(item)" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div class="col-xl-12" v-if="Step.isStep === 2">
                                    <div class="section-layanan">
                                        <p class="title">
                                            DATA PRODUK (WAJIB)
                                        </p>
                                        <div>
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Nama produk
                                                    <img    
                                                        src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-product" 
                                                    />
                                                    <!-- <div class="sample" style="font-weight: 600;">
                                                        Anda dapat mendaftarkan produk baru <a href="#" v-b-modal.Modal_addNewProduct style="color: #D7281E;" >disini</a>
                                                    </div> -->
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
                                                    class="treeselect" 
                                                    :class="{ 'is-invalid': $v.Form.Pengajuan.product.$error }" 
                                                    placeholder="Masukkan Nama Produk"
                                                    v-model="Form.Pengajuan.product" 
                                                    :multiple="false"
                                                    :options="userProducts"
                                                    value-format="object"
                                                    no-results-text="Produk belum terdaftar. Silakan hubungi admin"
                                                    no-options-text="Produk belum terdaftar. Silakan hubungi admin"
                                                >
                                                </treeselect>
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.Form.Pengajuan.product.required">
                                                        Nama produk tidak boleh kosong.
                                                    </span>
                                                </span>
                                            </div>

                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Nama unit 
                                                    <img 
                                                        src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-unit" 
                                                    />
                                                </label>
                                                <b-tooltip 
                                                    target="tooltip-unit" 
                                                    triggers="hover"
                                                    placement="top" class="tooltip-pengajuan">
                                                    <p class="desc">
                                                        Anda dapat memasukkan unit yang menaungi produk yang akan diajukan.
                                                    </p>
                                                </b-tooltip>
                                                <treeselect 
                                                    class="treeselect" 
                                                    :class="{ 'is-invalid': $v.Form.Pengajuan.unit.$error }" 
                                                    placeholder="Masukkan Nama Unit"
                                                    v-model="Form.Pengajuan.unit" 
                                                    :multiple="false"
                                                    :options="listTribe"
                                                    value-format="object"
                                                    no-results-text="Tribe belum terdaftar. Silakan hubungi admin"
                                                    no-options-text="Tribe belum terdaftar. Silakan hubungi admin"
                                                />
                                            </div>
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Jenis platform
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
                                                    v-model="Form.Pengajuan.platform_type"
                                                    :multiple="true"                              
                                                    :options="platform"
                                                    placeholder="Masukkan Jenis Platform"
                                                    no-results-text="Jenis Platform belum terdaftar. Silakan hubungi admin"
                                                    no-options-text="Jenis Platform belum terdaftar. Silakan hubungi admin"
                                                />
                                            </div>   
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Versi aplikasi
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
                                                    placeholder="Versi 1.0.0"
                                                    v-model.trim="$v.Form.Pengajuan.versi.$model"
                                                    :class="{ 'is-invalid': $v.Form.Pengajuan.versi.$error }" />
                                            </div>                                       
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Deskripsi singkat
                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-deskripsi-singkat" />
                                                    <label class="sample">
                                                        Contoh: Portal digital yang berperan dalam mempermudah Product
                                                    </label>
                                                </label>
                                                <b-tooltip target="tooltip-deskripsi-singkat" triggers="hover"
                                                    placement="top" class="tooltip-pengajuan">
                                                    <p class="desc pb-4">
                                                        Jelaskan seberapa penting produk Anda terhadap kepentingan pengguna dan Telkom.
                                                    </p>
                                                </b-tooltip>
                                                <textarea rows="4" class="form-control"
                                                    placeholder="Masukkan Deskripsi Singkat"
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
                                            <div v-if="Data.selectedServices.length !== 0" >
                                                <div class="form-group form-pengajuan"
                                                    v-if="this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')">
                                                    <label class="form-label">
                                                        Link produk
                                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                            id="tooltip-link-produk" />
                                                        <p class="sample" style="margin:0%">
                                                            Contoh: https://digitalpass.id
                                                        </p>
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
                                                        placeholder="Awali dengan https://"
                                                        v-model.trim="$v.Form.Pengajuan.product_link.$model"
                                                        :class="{ 'is-invalid': $v.Form.Pengajuan.product_link.$error }" />
                                                    <span class="invalid-feedback">
                                                        <span v-if="!$v.Form.Pengajuan.product_link.required">
                                                            Link produk tidak boleh kosong.
                                                        </span>
                                                        <span v-if="!$v.Form.Pengajuan.product_link.url">
                                                            Link produk tidak valid.
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
                                    </div> 
                                    <!-- <div>
                                        <b-modal id="Modal_addNewProduct" ref="Modal_addNewProduct" centered hide-footer hide-header no-close-on-esc no-close-on-backdrop> 
                                            <p class="addnewProduct">Penambahan nama produk</p>
                                            <div class="form-group form-pengajuan">
                                                <label class="textNewProoduct">Nama produk baru</label>
                                                    <input
                                                        :class="{ 'is-invalid': $v.Form.newProduct.name.$error }"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Masukkan Nama Produk baru"
                                                        v-model.trim="$v.Form.newProduct.name.$model"
                                                        />
                                                <span class="invalid-feedback pt-1">
                                                    <span v-if="!$v.Form.newProduct.name.required">
                                                        Nama Produk baru tidak boleh kosong.
                                                    </span>
                                                </span>
                                            </div>
                                                <div class="form-group form-pengajuan">
                                                    <label class="textNewProoduct">
                                                        Deskripsi produk
                                                    </label>
                                                    <textarea rows="4" class="form-control"
                                                        :class="{ 'is-invalid': $v.Form.newProduct.description.$error }"
                                                        placeholder="Masukkan Deskripsi Produk baru"
                                                        v-model.trim="$v.Form.newProduct.description.$model">
                                                    </textarea>
                                                    <span class="invalid-feedback pt-1">
                                                        <span v-if="!$v.Form.newProduct.description.required">
                                                            Deskripsi Produk baru tidak boleh kosong.
                                                        </span>
                                                        <span v-if="!$v.Form.newProduct.description.minLength">
                                                            Masukkan minimal
                                                            {{ $v.Form.newProduct.description.$params.minLength.min }}
                                                            karakter.
                                                        </span>
                                                    </span>
                                                </div>
                                                <label class="swal2-checkbox-label">
                                                    <input v-model.trim="$v.Form.showNewProductInput.$model" class="swal2-checkbox" type="checkbox">
                                                    Apakah Anda yakin mendaftarkan produk baru?
                                                </label>
                                                <div class="note">
                                                    <div class="starNote">*</div>
                                                    <div class="textNote">
                                                        Silahkan pilih nama yang telah dibuat pada form nama produk
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-end">
                                                    <div>
                                                        <button type="button" class="btn btn-dsa-outline-primary w-100" @click="ModalBatalAddNewProduct()">
                                                            Batal
                                                        </button>
                                                    </div>
                                                    <div class="ml-2">
                                                        <button 
                                                            type="button" 
                                                            class="btn btn-dsa-primary w-100 btn-next" 
                                                            :class="{ 'disabled': handleDisabledbuatButton() }"
                                                            :disabled="handleDisabledbuatButton()"
                                                            @click="createAndClose()">
                                                            Buat
                                                        </button>
                                                    </div>
                                                </div>
                                        </b-modal>
                                    </div> -->
                                    <div class="section-layanan">
                                        <p class="title">
                                            DATA TAMBAHAN (OPSIONAL)
                                        </p>
                                        <div class="section-layanan">
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Nama modul
                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-modul" />
                                                    <p class="sample" style="margin:0%">
                                                        Contoh: Login, Pembayaran, Notifikasi
                                                    </p>
                                                </label>
                                                <b-tooltip target="tooltip-modul" triggers="hover" placement="top"
                                                    class="tooltip-pengajuan">
                                                    <p class="desc pb-4">
                                                        Anda dapat memasukkan servis atau modul yang akan diujikan
                                                    </p>
                                                </b-tooltip>
                                                <input type="text" class="form-control"
                                                    placeholder="Silahkann Masukkan Nama Modul..."
                                                    v-model.trim="$v.Form.Pengajuan.service_name.$model"
                                                    :class="{ 'is-invalid': $v.Form.Pengajuan.service_name.$error }">
                                                <span class="invalid-feedback">
                                                    <span v-if="!$v.Form.Pengajuan.service_name.minLength">
                                                        Masukkan minimal
                                                        {{ $v.Form.Pengajuan.service_name.$params.minLength.min }}
                                                        karakter.
                                                    </span>
                                                    <span v-if="!$v.Form.Pengajuan.service_name.maxLength">
                                                        Masukkan maksimal
                                                        {{ $v.Form.Pengajuan.service_name.$params.maxLength.max }}
                                                        karakter.
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Detail fitur upgrade
                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-dampak" />
                                                    <label class="sample">
                                                        Contoh: Fitur pengajuan layanan, notifikasi, daftar pengajuan layanan
                                                    </label>
                                                </label>
                                                <b-tooltip target="tooltip-dampak" triggers="hover" placement="top"
                                                    class="tooltip-pengajuan">
                                                    <p class="desc pb-4">
                                                        Jelaskan detail dari fitur upgrade yang akan dievaluasi.
                                                    </p>
                                                </b-tooltip>
                                                <textarea rows="4" class="form-control"
                                                    placeholder="Masukkan Fitur Upgrade Produk yang akan Diujikan"
                                                    v-model.trim="$v.Form.Pengajuan.detail_feature_upgrade.$model"
                                                    :class="{ 'is-invalid': $v.Form.Pengajuan.detail_feature_upgrade.$error }">
                                                </textarea>
                                                <span class="invalid-feedback">
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
                                    <div class="section-layanan">
                                        <div>
                                            <div class="form-group form-pengajuan" 
                                             v-if="this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')">
                                                <label class="form-label">
                                                    Apakah Anda menerapkan <i>design system Legion</i>?
                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-legion" />
                                                </label>
                                                <b-tooltip target="tooltip-legion" triggers="hover" placement="top"
                                                    class="tooltip-legion">
                                                    <p class="desc">
                                                        Anda dapat menjelaskan fitur pada aplikasi anda yang menggunakan design pattern Legion
                                                    </p>
                                                </b-tooltip>
                                                <div>    
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio"
                                                         id="rd_legion_ya" 
                                                         name="radio-legion" 
                                                         v-model="$v.Form.Pengajuan.is_legion_standard.$model"
                                                         class="custom-control-input" :value=true>
                                                        <label class="custom-control-label red" for="rd_legion_ya">Ya</label>
                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" 
                                                        id="rd_legion_tidak" 
                                                        name="radio-legion" 
                                                        v-model="$v.Form.Pengajuan.is_legion_standard.$model"
                                                        class="custom-control-input" :value=false>
                                                        <label class="custom-control-label red" 
                                                        for="rd_legion_tidak">Tidak</label>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </div>
                                    <div class="section-layanan" v-if="$v.Form.Pengajuan.is_legion_standard.$model === true">
                                        <div > 
                                            <textarea rows="3" class="form-control"
                                                placeholder="Pattern apa saja yang telah kamu terapkan..."
                                                v-model.trim="$v.Form.Pengajuan.legion_notes.$model"
                                                :class="{ 'is-invalid': $v.Form.Pengajuan.legion_notes.$error }">
                                            </textarea>  
                                            <span class="invalid-feedback">
                                                <span v-if="!$v.Form.Pengajuan.legion_notes.minLength">
                                                    Masukkan minimal
                                                   {{ $v.Form.Pengajuan.legion_notes.$params.minLength.min }}
                                                    karakter.
                                                </span>
                                                <span v-if="!$v.Form.Pengajuan.legion_notes.maxLength">
                                                    Masukkan maksimal
                                                    {{ $v.Form.Pengajuan.legion_notes.$params.maxLength.max }}
                                                    karakter.
                                                </span>
                                            </span>                                     
                                        </div>
                                    </div>                  
                                </div>

                                <div class="col-xl-12" v-if="Step.isStep === 3">
                                    <div class="section-layanan">
                                        <div class="title">
                                            Upload Lampiran
                                        <label class="sample" style="text-transform: lowercase;">
                                            Upload dokumen sesuai dengan layanan yang anda pilih.
                                        </label>
                                    </div>
                                        <div v-for="(item, index) of Data.selectedServices" :key="index"> 
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label" >
                                                    {{ item.name }}
                                                </label>
                                                <div class="upload-lampiran">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <img
                                                                src="/v3/Portal/assets/icon/PENGAJUAN_UPLOAD_LAYANAN.svg" />
                                                        </div>
                                                        <div class="col d-flex align-items-center">
                                                            <div>
                                                                <p class="click-upload" @click="handleFileUpload(item.slug)">
                                                                    Klik untuk upload file
                                                                </p>
                                                                <label class="information-max-upload">
                                                                    Maximal file size 25 MB
                                                                </label>
                                                            </div>
                                                            <input type="file" class="d-none" :id="`inputFileLampiran_${item.slug}`"
                                                                @change="onChangeFileUpload($event, item.slug)" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="error-upload">
                                                    <label class="max-file" v-if="IsError.maxFile">
                                                        File melebihi kapasitas, maks 25 MB.
                                                    </label>
                                                </div>
                                                <div class="file-lampiran" v-for="(file, idFile) of Data.listFiles[item.slug]" :key="idFile">
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
                                                                            {{ file.file.name }}
                                                                        </p>
                                                                        <label class="file-size"
                                                                            v-if="!file.additional.isLoading">
                                                                            Size file {{ file.file.size | formatSize}}
                                                                        </label>
                                                                        <div class="file-progress"
                                                                            v-if="file.additional.isLoading">
                                                                            <b-progress
                                                                                :value="file.additional.isLoadingPercentage">
                                                                            </b-progress>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-auto d-flex justify-content-end align-items-center">
                                                            <div class="row">
                                                                <div class="col-auto">
                                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TRASH_FILE.svg"
                                                                        class="cursor-pointer"
                                                                        v-if="!file.additional.isLoading"
                                                                        @click="handleFileRemove(file.additional.id, idFile, item.slug)" />
                                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_REMOVE_FILE.svg"
                                                                        class="cursor-pointer"
                                                                        v-if="file.additional.isLoading"
                                                                        @click="handleFileCancel()" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="file-lampiran"
                                                    v-for="(item, index) of DataParsing.fileLampiran" :key="index">
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
                                                                        <label class="file-size"
                                                                            v-if="!item.additional.isLoading">
                                                                            Size file {{ item.file.size | formatSize}}
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
                                                        <div
                                                            class="col-auto d-flex justify-content-end align-items-center">
                                                            <div class="row">
                                                                <div class="col-auto">
                                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TRASH_FILE.svg"
                                                                        class="cursor-pointer"
                                                                        v-if="!item.additional.isLoading"
                                                                        @click="handleFileRemove(item.additional.id, index)" />
                                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_REMOVE_FILE.svg"
                                                                        class="cursor-pointer"
                                                                        v-if="item.additional.isLoading"
                                                                        @click="handleFileCancel()" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span class="invalid-feedback">
                                                            <span v-if="!$v.Form.Pengajuan.fileLampiran.required">
                                                                File tidak boleh kosong.
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>  
                                    <div class="section-layanan">
                                        <div>
                                            <div class="form-group form-pengajuan">
                                                <label class="form-label">
                                                    Apakah anda ingin mengajukan percepatan layanan?
                                                    <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TOOLTIP.svg"
                                                        id="tooltip-percepatan" />
                                                </label>
                                                <b-tooltip target="tooltip-percepatan" triggers="hover" placement="top"
                                                    class="tooltip-pengajuan">
                                                    <p class="desc">
                                                        Anda dapat mengajukan layanan tanpa antrian dengan Pengajuan Percepatan Layanan 
                                                    </p>
                                                </b-tooltip>
                                                <div>
                                                    
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio"
                                                         id="rd_ya" 
                                                         name="radio-prioritas" 
                                                         v-model="$v.Form.Pengajuan.is_priority.$model"
                                                         class="custom-control-input" :value=true>
                                                        <label class="custom-control-label red" for="rd_ya">Ya</label>
                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" 
                                                        id="rd_tidak" 
                                                        name="radio-prioritas" 
                                                        v-model="$v.Form.Pengajuan.is_priority.$model"
                                                        class="custom-control-input" :value=false>
                                                        <label class="custom-control-label red" 
                                                        for="rd_tidak">Tidak</label>
                                                    </div>
                                                    <span class="invalid-feedback">
                                                        <span v-if="!$v.Form.Pengajuan.is_priority.required">
                                                            Pilih salah satu pilihan (Ya/Tidak).
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>                                           
                                        </div>
                                    </div>          
                                </div>

                                <div class="col-xl-12" v-if="Step.isStep === 4 && $v.Form.Pengajuan.is_priority.$model === true">
                                    <div class="section-layanan">
                                    <p class="title">
                                        DATA PRODUK (WAJIB)
                                    </p>
                                    <div class="form-group form-pengajuan">
                                        <label class="form-label">
                                            Upload justifikasi 
                                        </label>
                                        <div>
                                        <div class="upload-lampiran">
                                            <div class="row">
                                                <div class="col-auto">
                                                    <img
                                                        src="/v3/Portal/assets/icon/PENGAJUAN_UPLOAD_LAYANAN.svg" />
                                                </div>
                                                <div class="col d-flex align-items-center">
                                                    <div>
                                                        <p class="click-upload" @click="handleFileUploadJustifikasi()">
                                                            Klik untuk upload file
                                                        </p>
                                                        <label class="information-max-upload">
                                                            Maximal file size 25 MB
                                                        </label>
                                                    </div>
                                                        <input type="file" class="d-none" id="inputFileJustifikasi"
                                                            @change="onChangeFileUploadJustifikasi($event)" />
                                                    </div>        
                                                </div>
                                             </div>
                                            <div class="error-upload">
                                                <label class="max-file" v-if="IsError.maxFile">
                                                    File melebihi kapasitas, maks 25 MB.
                                                </label>
                                            </div>
                                            <div class="file-lampiran" v-for="(item, index) of Data.listFiles" :key="index">
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
                                                                    <label class="file-size"
                                                                        v-if="!item.additional.isLoading">
                                                                        Size file {{ item.file.size | formatSize}}
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
                                                            <div class="col-auto">
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TRASH_FILE.svg" class="cursor-pointer"
                                                                    v-if="!item.additional.isLoading"
                                                                    @click="handleFileRemove(item.additional.id, index)" />
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_REMOVE_FILE.svg" class="cursor-pointer"
                                                                    v-if="item.additional.isLoading"
                                                                    @click="handleFileCancel()" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                            <div class="file-lampiran" v-for="(item, index) of DataParsing.fileLampiran" :key="index">
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
                                                                    <label class="file-size"
                                                                        v-if="!item.additional.isLoading">
                                                                        Size file {{ item.file.size | formatSize}}
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
                                                            <div class="col-auto">
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_TRASH_FILE.svg"
                                                                    class="cursor-pointer"
                                                                    v-if="!item.additional.isLoading"
                                                                    @click="handleFileRemove(item.additional.id, index)" />
                                                                <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_REMOVE_FILE.svg"
                                                                    class="cursor-pointer"
                                                                    v-if="item.additional.isLoading"
                                                                    @click="handleFileCancel()" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            
                            <div class="col-xl-12 handle-scroll" v-if="Step.isStep === 5 || Step.isStep === 4 && $v.Form.Pengajuan.is_priority.$model === false">
                                    <div class="row">
                                        <div class="col-xl-6">
                                            <div class="section-layanan">
                                                <p class="title">
                                                    DATA PRODUK
                                                </p>
                                                <div class="summary-layanan">
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Nama produk
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                {{ Form.Pengajuan.product.label }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Nama Unit
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                {{ Form.Pengajuan.unit.label }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Jenis platform
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                {{ formattedPlatform }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Deskripsi singkat
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                {{ Form.Pengajuan.product_description }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row"
                                                        v-if="this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Link produk
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <a :href="Form.Pengajuan.product_link" target="_blank"
                                                                class="value">
                                                                {{ Form.Pengajuan.product_link }}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                               Detail Fitur Upgrade
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                {{ Form.Pengajuan.detail_feature_upgrade }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Pengajuan layanan prioritas
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                <div v-if="$v.Form.Pengajuan.is_priority.$model === true">
                                                                    <p>Ya</p>
                                                                </div>
                                                                <div v-if="$v.Form.Pengajuan.is_priority.$model === false">
                                                                    <p>Tidak</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-5">
                                                            <span class="key">
                                                                Pantern legion
                                                            </span>
                                                        </div>
                                                        <div class="col-xl-1">
                                                            <span class="colon">:</span>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <label class="value">
                                                                <div v-if="$v.Form.Pengajuan.is_legion_standard.$model === true">
                                                                    <p>Ya;
                                                                    {{ Form.Pengajuan.legion_notes }} </p>
                                                                </div>
                                                                <div v-if="$v.Form.Pengajuan.is_legion_standard.$model === false">
                                                                    <p>Tidak</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="section-layanan">
                                                <p class="title">
                                                    LAMPIRAN
                                                </p>
                                                <div  v-for="(item, index) of Data.selectedServices" :key="index">
                                                    <div class="file-lampiran" v-for="(file, idFile) of Data.listFiles[item.slug]" :key="idFile">
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="list-file-lampiran">
                                                                    <div class="row">
                                                                        <div class="col-auto d-flex align-items-center">
                                                                            <img
                                                                                src="/v3/Portal/assets/icon/PENGAJUAN_ICON_UPLOAD_FILE.svg" />
                                                                        </div>
                                                                        <div class="col">
                                                                            <p class="file-name">
                                                                                {{ file.file.name }}
                                                                            </p>
                                                                            <label class="file-size">
                                                                                Size file
                                                                                {{ file.file.size | formatSize}}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="file-lampiran"
                                                        v-for="(item, index) of DataParsing.fileLampiran" :key="index">
                                                        <div class="row">
                                                            <div class="col-xl-12">
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
                                                                            <label class="file-size">
                                                                                Size file
                                                                                {{ item.file.size | formatSize}}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="section-layanan" v-if="$v.Form.Pengajuan.is_priority.$model === true" >
                                                <p class="title">
                                                    File justifikasi
                                                </p>
                                                    <div class="file-lampiran" v-for="(file, idFile) of Data.listFiles" :key="idFile">
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="list-file-lampiran">
                                                                    <div class="row">
                                                                        <div class="col-auto d-flex align-items-center">
                                                                            <img
                                                                                src="/v3/Portal/assets/icon/PENGAJUAN_ICON_UPLOAD_FILE.svg" />
                                                                        </div>
                                                                        <div class="col">
                                                                            <p class="file-name">
                                                                                {{ file.file.name }}
                                                                            </p>
                                                                            <label class="file-size">
                                                                                Size file
                                                                                {{ file.file.size | formatSize}}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="file-lampiran"
                                                        v-for="(item, index) of DataParsing.fileLampiran" :key="index">
                                                        <div class="row">
                                                            <div class="col-xl-12">
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
                                                                            <label class="file-size">
                                                                                Size file
                                                                                {{ item.file.size | formatSize}}
                                                                            </label>
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
                            <div class="row mt-5">
                                <div class="col-xl-12 d-flex justify-content-end">
                                    <div v-if="Step.isStep === 2 || Step.isStep === 3 || Step.isStep === 4 || Step.isStep === 5">
                                        <button type="button" class="btn btn-v3-dsa-secondary btn-back"
                                            @click="handleBackButtonClick">
                                            Kembali
                                        </button>
                                    </div>
                                    <button type="button" class="btn btn-v3-dsa-primary btn-next"
                                        :class="{ 'disabled': handleDisabledNextButton() }"
                                        :disabled="handleDisabledNextButton()"
                                        @click="Step.isStep !== 5 ? onChangeStep() : onShowModal('ajukan-layanan')">
                                        <span v-html="Step.isStep !== 5 ? 'Lanjutkan' : 'Selesai'"></span>
                                    </button>
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
                                    @click="fetchDeleteFilePengajuan()">
                                    {{ item.btnRight }}
                                </button>
                            </div>
                            <div v-if="item.id === 'success-hapus-file'">
                                <button type="button" class="btn btn-v3-dsa-primary"
                                    @click="Modal.setIsShowModal = false">
                                    {{ item.btnRight }}
                                </button>
                            </div>
                            <div v-if="item.id === 'batalkan-layanan'">
                                <span v-if="Form.FilePengajuan.request_id !== null">
                                    <button type="button" class="btn btn-v3-outline-dsa-primary"
                                        @click="$store.commit('setIsDraft', true); fetchUpdatePengajuan()">
                                        {{ item.btnLeft }}
                                    </button>
                                </span>
                                <span
                                    v-if="Form.FilePengajuan.request_id === null && Data.selectedServices.length !== 0">
                                    <button type="button" class="btn btn-v3-outline-dsa-primary"
                                        @click="fetchDraftPengajuan()">
                                        {{ item.btnLeft }}
                                    </button>
                                </span>
                                <span v-if="Data.selectedServices.length === 0">
                                    <button type="button" class="btn btn-v3-outline-dsa-primary"
                                        @click="Modal.setIsShowModal = false">
                                        Tidak
                                    </button>
                                </span>
                                <span v-if="$store.state.isDraft">
                                    <button type="button" class="btn btn-v3-dsa-primary"
                                        @click="$router.push('/user/monitoring/pengajuan-layanan')">
                                        {{ item.btnRight }}
                                    </button>
                                </span>
                                <span v-if="!$store.state.isDraft">
                                    <button type="button" class="btn btn-v3-dsa-primary"
                                        @click="Form.FilePengajuan.request_id === null ? $router.push('/user/monitoring/pengajuan-layanan') : fetchDeletePengajuan()">
                                        {{ item.btnRight }}
                                    </button>
                                </span>
                            </div>
                            <div v-if="item.id === 'ajukan-layanan'">
                                <button type="button" class="btn btn-v3-outline-dsa-primary"
                                    @click="$store.commit('setIsDraft', true); fetchUpdatePengajuan()">
                                    {{ item.btnLeft }}
                                </button>
                                <button type="button" class="btn btn-v3-dsa-primary" 
                                    @click="$store.commit('setIsDraft', false); fetchUpdatePengajuan()">
                                    {{ item.btnRight }}
                                </button>
                            </div>
                            <div v-if="item.id === 'ajukan-layanan-draft'">
                                <button type="button" class="btn btn-v3-outline-dsa-primary"
                                    @click="Modal.setIsShowModal = false">
                                    {{ item.btnLeft }}
                                </button>
                                <button type="button" class="btn btn-v3-dsa-primary" @click="fetchUpdatePengajuan()">
                                    {{ item.btnRight }}
                                </button>
                            </div>
                            <div v-if="item.type === 'response' && item.id !== 'success-hapus-file'">
                                <button type="button" class="btn btn-v3-dsa-primary"
                                    @click="$router.push('/user/monitoring/pengajuan-layanan')">
                                    {{ item.btnRight }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>

            <b-modal modal-class="modal-v3-dsa" v-model="modalError" hide-header hide-footer centered>
                <div class="row d-flex align-items-center pr-4">
                    <div class="col">
                        <img src="/v3/Portal/assets/icon/MODAL_ILUSTRATION_HEADER.svg" />
                    </div>
                    <div class="col-auto">
                        <div class="cursor-pointer" @click="modalError = false">
                            <img src="/v3/Portal/assets/icon/MODAL_ICON_CLOSE.svg" />
                        </div>
                    </div>
                </div>
                <div class="row section-information">
                    <div class="col-xl-12 text-center">
                        <p class="title">
                            {{ error.message.title }}
                        </p>
                        <label class="desc mb-0">
                            {{ error.message.content }}
                        </label>
                    </div>
                </div>
                <div class="row section-button">
                    <div class="col-xl-12 d-flex justify-content-center">
                        <button type="button" class="btn btn-v3-dsa-primary"
                            @click="modalError = false">
                            Oke
                        </button>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js'
    import {
        SERVICES,
        MODAL_MESSAGE
    } from '@/static/v3/Portal/constants/menu'
    import {
        required,
        maxLength,
        minLength,
        url
    } from 'vuelidate/lib/validators'
    
    export default {
        layout: 'v3/Portal/blank',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    listServices: [],
                    listFiles: [],
                    selectedServices: [],
                },
                Step: {
                    isStep: 1
                },
                Form: {
                    Pengajuan: {
                        product: null,
                        request_name: null,
                        product_description: null,
                        product_test_type: null,
                        product_sub_test_type: '',
                        product_link:'',
                        unit: null,
                        tribe: '',
                        status: 'SUBMIT_DATA_PENGAJUAN',
                        revenue: '',
                        service_id: null,
                        is_priority: false,
                        micro_impact: '',
                        platform_type:null,
                        versi:null,
                        detail_feature_upgrade:null,
                        attachment_requirement_heuristic_evaluation:'',
                        attachment_requirement_usability_testing:'',
                        attachment_requirement_security_testing:'',
                        attachment_requirement_software_testing:'',
                        attachment_requirement_service_operation:'',
                        is_gtm_bundle:null,
                        legion_notes:null,
                        is_legion_standard:false,
                        service_name:null,
                        requested_by: this.UserLogin().id,
                        isCreatePengajuanCalled: false, 
                    },
                    FilePengajuan: {
                        request_id: null,
                        name: null,
                        type: null,
                        file_type: null,
                        service: null,
                        product_name: null,
                        attachment_type: null,
                        created_by: this.UserLogin().id,
                    },
                    // module: 'Produk',
                    // newProduct: {
                    //     name: null,
                    //     description: null,
                    //     status:null,
                    // },
                    userProducts: [] ,
                    // showNewProductInput: false,
                    listTribe:[],  
                },
                IsError: {
                    maxFile: false
                },
                Modal: {
                    setIsShowModal: false,
                    setTypeModal: [],
                    modalType: 'ajukan-layanan'
                },
                Temporary: {
                    DeleteFile: {
                        id: null,
                        index: null
                    }
                },
                DataParsing: {
                    fileLampiran: []
                },
                error: {
                    message: {
                        title: null,
                        content: null
                    }
                },
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
                isChecked: false,
                modalError: false,
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
            }
        },
        watch: {
            'Form.Pengajuan.revenue': {
                handler(after) {
                    this.Form.Pengajuan.revenue = this.formatIDR(after)
                }
            }
        },
        validations: {
            Form: {
                Pengajuan: {
                    product: {
                        required
                    },
                    unit: {
                        required,
                    },
                    platform_type:{
                        required
                    },
                    product_description: {
                        required,
                        maxLength: maxLength(100),
                        minLength: minLength(3)
                    },
                    product_link: {
                        url,
                        maxLength: maxLength(50),
                    },
                    detail_feature_upgrade: {
                        minLength: minLength(3),
                        maxLength: maxLength(100),
                    },
                    versi:{
                        required
                    },
                    is_priority:{
                        required
                    },
                    is_legion_standard:{
                        required
                    },
                    service_name: {
                        minLength: minLength(3),
                        maxLength: maxLength(100),
                    },
                    legion_notes: {
                        minLength: minLength(3),
                        maxLength: maxLength(100),
                    },
                },
                // newProduct:{
                //     name:{
                //         required
                //     },
                //     description:{
                //         required,
                //         minLength: minLength(5)
                //     }
                // },
                // showNewProductInput:{
                //     required
                // }
            }
        },
        created() {},
        async mounted() {
            // this.userProducts = this.UserLogin().products;
            this.getProduct();

            this.handleIfHasValueOtherPage()
            this.fetchGetListService()
            this.GetTribe()
        },
        computed: {
            formattedPlatform() {
                if (this.Form.Pengajuan.platform_type && this.Form.Pengajuan.platform_type.length > 0) {
                    return this.Form.Pengajuan.platform_type.join(', ');
                }
                return '';
            },
        },
        methods: {
            // ModalBatalAddNewProduct() {
            //     this.$refs['Modal_addNewProduct'].hide();
            //     this.Form.newProduct.name = null;
            //     this.Form.newProduct.description = null;
            //     this.Form.newProduct.status = null;
            // },
            // closeModal() {
            //     this.$bvModal.hide('Modal_addNewProduct');
            // },
            // createAndClose() {
            //     this.CreateProduct();
            //     this.closeModal();
            // },
            // CreateProduct() {
            //     this.HelperConfirm(this.Form.module, 'create').then((result) => {
            //         if (result.isConfirmed) {
            //             let body = {
            //                 name: this.Form.newProduct.name,
            //                 description: this.Form.newProduct.description,
            //                 status:'DRAFT',
            //             };
            //             this.Request('POST', '/api/v3/product/create', null, body, 'BEARER', (callback) => {
            //                 if (callback.code === 200) {
            //                     this.HelperSuccessCode(this.Form.module, 'create').then((result) => {
            //                         if (result.isConfirmed) {
            //                             this.$router.back();
            //                         }
            //                     });
            //                     window.location.reload();
            //                 } else {
            //                     this.HelperErrorCode(callback);
            //                 };
            //             });
            //         };
            //     });              
            // },
            handleIfHasValueOtherPage() {
                if (this.$store.state.isDraft) {
                    localStorage.setItem('temp_formValue', JSON.stringify(this.$store.state.formValue))
                    this.onChangeService(this.$store.state.serviceValue)
                    this.onChangeGTM(this.$store.state.serviceValue)
                    this.Form.Pengajuan = JSON.parse(localStorage.getItem('temp_formValue'))
                    this.DataParsing.fileLampiran = this.$store.state.fileLampiran
                    this.Form.FilePengajuan.request_id = this.$store.state.formValue.id
                    this.Form.FilePengajuan.name = this.$store.state.formValue.request_name
                    this.Modal.modalType = 'ajukan-layanan-draft'
                }
                if (this.$store.state.isHasService) {
                    this.onChangeService(this.$store.state.serviceValue)
                    this.onChangeGTM(this.$store.state.serviceValue)
                    this.Form.FilePengajuan.request_id = this.$store.state.formValue.id
                    this.Form.FilePengajuan.name = this.$store.state.formValue.request_name
                }
            },
            formatIDR: value => (value + '').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
            handleFormatIDR() {
                this.Form.Pengajuan.revenue = this.formatIDR(this.Form.Pengajuan.revenue)
                this.$emit('input', (this.currentValue + '').replace(/[^0-9]/g, ''))
            },
            fetchGetListService() {
                this.Request('GET', '/api/v3/service', null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.Data.listServices = res.content
                        this.Data.listServices.map((x) => {
                            let includeDescText = SERVICES.filter((y) => {
                                return y.slug === x.slug
                            })
                            x.desc_text = includeDescText[0].desc_text
                        })
                    }
                })
            },
            fetchGetListServiceGtm() {
                this.Request('GET', '/api/v3/service/gtm', null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.Data.listServices = res.content;
                        this.Data.listServices.map((x) => {
                            let includeDescText = SERVICES.filter((y) => {
                            return y.slug === x.slug;
                            });
                            x.desc_text = includeDescText[0].desc_text;
                        });
                        if (this.Form.Pengajuan.is_gtm_bundle) {
                            this.Data.selectedServices = this.Data.listServices;
                            this.Form.Pengajuan.service_id = this.Data.selectedServices.map(service => service.id);
                            this.Form.Pengajuan.product_test_type = this.Data.selectedServices.map(service => service.name);
                            if (this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')) {
                                this.Form.Pengajuan.product_link = 'https://';
                            }
                        }
                    }
                })
            },
            isServiceSelected(serviceId) {
                return this.Data.selectedServices.some(service => service.id === serviceId);
            },
            shouldCheckCheckbox(item) {
                if (this.Form.Pengajuan.is_gtm_bundle === null|| this.Form.Pengajuan.is_gtm_bundle !== true) {
                    return this.isServiceSelected(item.id);
                }        
            },
            onChangeService({
                id,
                name,
                desc_text,
                slug
            }) {
                this.handleResetForm();    
                const selectedServiceIndex = this.Data.selectedServices.findIndex(service => service.id === id);
                    
                    if (selectedServiceIndex !== -1) {
                        this.Data.selectedServices.splice(selectedServiceIndex, 1);
                    } else {
                        this.Data.selectedServices.push({
                            id: id,
                            name: name,
                            desc_text: desc_text,
                            slug: slug
                        });
                    }     
                this.Form.Pengajuan.service_id = this.Data.selectedServices.map(service => service.id);
                this.Form.Pengajuan.product_test_type = this.Data.selectedServices.map(service => service.name);
                
                if (this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')) {
                    this.Form.Pengajuan.product_link = 'https://';
                }
            },

            onChangeGTM() {
                if(this.Form.Pengajuan.is_gtm_bundle){
                    this.Data.selectedServices = []
                    this.handleResetForm();
                }else{
                    if(this.Form.Pengajuan.is_gtm_bundle = true && this.$v.Form.Pengajuan.is_gtm_bundle === true){                        
                       this.fetchGetListServiceGtm() 
                    }
                } 
            },
            
            onChangeStep() {
                if(this.Step.isStep === 3) {
                    if (!this.Form.Pengajuan.isCreatePengajuanCalled) {
                        this.fetchCreatePengajuan()
                        this.Form.Pengajuan.isCreatePengajuanCalled = true;
                    }
                    if(
                        this.Form.FilePengajuan.request_id !== null ||
                        this.Form.FilePengajuan.request_id !== "null" ||
                        this.Form.FilePengajuan.request_id !== undefined ||
                        this.Form.FilePengajuan.request_id !== "undefined"
                    ) {
                        
                        if (this.Step.isStep === 3) {
                            if (this.Form.Pengajuan.is_priority === true) {
                                this.Step.isStep = 4;
                            } else {
                                this.Step.isStep = 5;
                            }
                        } else {
                            this.Step.isStep = this.Step.isStep + 1;
                        }
                    } else {
                        this.error.message = {
                            title: 'Gagal mengunggah lampiran',
                            content: 'Lampiran gagal diunggah. Harap mengunggah ulang lampiran'
                        };
                        this.modalError = true;
                    }
                } else {
                    this.Step.isStep = this.Step.isStep + 1;
                }
            },
            handleResetForm() {
                this.$v.Form.Pengajuan.$reset()
                this.Form.Pengajuan = {
                    product: null,
                    request_name: null,
                    product_description: null,
                    product_test_type: null,
                    product_sub_test_type: '',
                    product_link: '',
                    unit: null,
                    tribe: '',
                    platform_type: null,
                    status: null,
                    revenue: '',
                    service_id: null,
                    micro_impact: '',
                    is_priority: false,
                    versi: null,
                    detail_feature_upgrade:null,
                    attachment_requirement_heuristic_evaluation:'',
                    attachment_requirement_usability_testing:'',
                    attachment_requirement_security_testing:'',
                    attachment_requirement_software_testing:'',
                    attachment_requirement_service_operation:'',
                    is_gtm_bundle:null,
                    legion_notes:null,
                    is_legion_standard:false,
                    service_name:null,
                    requested_by: this.UserLogin().id,
                }
            },
            handleFileUpload(slug) {
                this.$nextTick(function () {
                    const inputFileLampiran = `inputFileLampiran_${slug}`
                    document.getElementById(inputFileLampiran).click()
                })
            },
            handleFileInputReset(slug) {
                const inputFileLampiran = `inputFileLampiran_${slug}`
                document.getElementById(inputFileLampiran).value = ''
            },
            handleFileUploadJustifikasi() {
                this.$nextTick(function () {
                    document.getElementById('inputFileJustifikasi').click()
                })
            },
            handleFileInputResetJustifikasi() {
                document.getElementById('inputFileJustifikasi').value = ''
            },
            handleFileCancel() {},
            handleFileRemove(id, index, slug) {
                this.onShowModal('hapus-file')
                this.Temporary.DeleteFile.id = id
                this.Temporary.DeleteFile.index = index
                this.Temporary.DeleteFile.slug = slug
            },
            onChangeFileUploadJustifikasi(e) {
                this.IsError.maxFile = false

                let files = e.target.files
                for (let file of files) {
                    const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                    if (fileToMB > 25) {
                        this.handleFileInputResetJustifikasi()
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
                        if(this.Form.Pengajuan.product !== null ||
                            this.Form.Pengajuan.tribe !== null ||
                            this.Form.Pengajuan.platform_type !== null ||
                            this.Form.Pengajuan.versi !== null ||
                            this.Form.Pengajuan.product_description !== null
                        ) {
                            this.Data.listFiles.push(costumizeFile)
                            // if((this.Form.FilePengajuan.request_id === null || 
                            //     typeof this.Form.FilePengajuan.request_id === 'undefined' || 
                            //     this.Form.FilePengajuan.request_id === 'undefined') 
                            //     && 
                            //     (this.Form.FilePengajuan.name === null ||
                            //     typeof this.Form.FilePengajuan.name === 'undefined' || 
                            //     this.Form.FilePengajuan.name === 'undefined')
                            //     )
                            // {
                                this.fetchUploadFileJustifikasi(costumizeFile)
                                // this.fetchCreatePengajuan(costumizeFile, slug)
                            // } 
                            // else {
                            //     this.fetchCreatePengajuan(costumizeFile, slug)
                                // this.fetchUploadFilePengajuan(costumizeFile, slug)
                            // }
                        } else {
                            this.error.message = {
                                title: 'Gagal mengunggah lampiran',
                                content: 'Harap mengisi data Nama Produk, Nama Unit, Jenis Platform, Versi Aplikasi, dan Deskripsi Singkat sebelum mengunggah lampiran'
                            };
                            this.modalError = true;
                        }
                    }
                }
                this.handleFileInputResetJustifikasi()
            },
            onChangeFileUpload(e, slug) {
                this.IsError.maxFile = false

                let files = e.target.files
                for (let file of files) {
                    const fileToMB = ((file.size / 1024) / 1024).toFixed(1)
                    if (fileToMB > 25) {
                        this.handleFileInputReset(slug)
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
                        if(this.Form.Pengajuan.product !== null ||
                            this.Form.Pengajuan.tribe !== null ||
                            this.Form.Pengajuan.platform_type !== null ||
                            this.Form.Pengajuan.versi !== null ||
                            this.Form.Pengajuan.product_description !== null
                        ) {
                            if (!this.Data.listFiles.hasOwnProperty(slug)) {
                                this.$set(this.Data.listFiles, slug, []);
                            }
                            this.Data.listFiles[slug].push(costumizeFile)
                            // if((this.Form.FilePengajuan.request_id === null || 
                            //     typeof this.Form.FilePengajuan.request_id === 'undefined' || 
                            //     this.Form.FilePengajuan.request_id === 'undefined') 
                            //     && 
                            //     (this.Form.FilePengajuan.name === null ||
                            //     typeof this.Form.FilePengajuan.name === 'undefined' || 
                            //     this.Form.FilePengajuan.name === 'undefined')
                            //     )
                            // {                               
                                this.fetchUploadFilePengajuan(costumizeFile, slug)
                                // this.fetchCreatePengajuan(costumizeFile, slug)
                            // } 
                            // else {
                            //     this.fetchCreatePengajuan(costumizeFile, slug)
                                // this.fetchUploadFilePengajuan(costumizeFile, slug)
                            // }
                        } else {
                            this.error.message = {
                                title: 'Gagal mengunggah lampiran',
                                content: 'Harap mengisi data Nama Produk, Nama Unit, Jenis Platform, Versi Aplikasi, dan Deskripsi Singkat sebelum mengunggah lampiran'
                            };
                            this.modalError = true;
                        }
                    }
                }
                this.handleFileInputReset(slug)
            },
            fetchDeleteFilePengajuan() {
                const formData = new FormData()
                formData.append('id', this.Temporary.DeleteFile.id)
                this.Request('DELETE', '/api/v3/request-attachment/remove', null, formData, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.Data.listFiles.splice(this.Temporary.DeleteFile.index, 1)
                        if (this.Step.isStep === 3) {
                            this.Data.listFiles[this.Temporary.DeleteFile.slug].splice(this.Temporary.DeleteFile.index, 1)
                        }
                            this.onShowModal('success-hapus-file')
                    }
                })
            },
            fetchDeletePengajuan() {
                const formData = new FormData()
                formData.append('id', this.Form.FilePengajuan.request_id)
                this.Request('DELETE', '/api/v3/request/remove', null, formData, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.onShowModal('success-batalkan')
                    }
                })
            },
            fetchCreatePengajuan(file, slug) {
                const productTestTypes = this.Form.Pengajuan.product_test_type;
                const serviceIds = Array.isArray(this.Form.Pengajuan.service_id) ? this.Form.Pengajuan.service_id : [this.Form.Pengajuan.service_id];
                const requestIds = [];
                for (const [productTestType, serviceId] of productTestTypes.map((id, index) => [id, serviceIds[index]])) {
                    const requestData = {
                        product_name: this.Form.Pengajuan.product.label,
                        product_link: this.Form.Pengajuan.product_link,
                        product_sub_test_type: this.Form.Pengajuan.product_sub_test_type,
                        product_description: this.Form.Pengajuan.product_description,
                        service_id: serviceId,
                        statusName: 'SUBMIT_DATA_PENGAJUAN',
                        unit: this.Form.Pengajuan.unit.label,
                        is_priority: this.Form.Pengajuan.is_priority,
                        product_test_type: productTestType,
                        requested_by: this.Form.Pengajuan.requested_by,
                        product: this.Form.Pengajuan.product.id,
                        tribe: this.Form.Pengajuan.tribe,
                        versi: this.Form.Pengajuan.versi,
                        revenue: this.Form.Pengajuan.revenue,
                        micro_impact: this.Form.Pengajuan.micro_impact,
                        platform_type: this.Form.Pengajuan.platform_type.join(','),
                        detail_feature_upgrade: this.Form.Pengajuan.detail_feature_upgrade,
                        attachment_requirement_heuristic_evaluation: this.Form.Pengajuan.attachment_requirement_heuristic_evaluation,
                        attachment_requirement_usability_testing: this.Form.Pengajuan.attachment_requirement_usability_testing,
                        attachment_requirement_security_testing: this.Form.Pengajuan.attachment_requirement_security_testing,
                        attachment_requirement_service_operation: this.Form.Pengajuan.attachment_requirement_service_operation,
                        attachment_requirement_software_testing: this.Form.Pengajuan.attachment_requirement_software_testing,
                        is_gtm_bundle: this.Form.Pengajuan.is_gtm_bundle,
                        legion_notes: this.Form.Pengajuan.legion_notes,
                        is_legion_standard: this.Form.Pengajuan.is_legion_standard,
                        service_name: this.Form.Pengajuan.service_name,
                    };
                    this.Request('POST', '/api/v3/request/create-bundle', null, requestData, 'BASIC', (res) => {
                        if (res.code === 200) {
                            if (res.content && res.content.length > 0 && res.content[0].length > 0) {
                                const requestId = res.content[0][0].id;
                                requestIds.push(requestId);

                                // if (
                                //     (this.Form.FilePengajuan.request_id !== null ||
                                //         typeof this.Form.FilePengajuan.request_id !== 'undefined' ||
                                //         this.Form.FilePengajuan.request_id !== 'undefined') &&
                                //     this.Form.FilePengajuan.name !== null
                                // ) {
                                //     this.fetchUploadFilePengajuan(file, slug);
                                // }
                            }
                        } else {
                            this.error.message = {
                                title: 'Gagal membuat pengajuan',
                                content: res.message ? res.message : 'Pengajuan ini gagal dibuat'
                            };
                            this.modalError = true;
                        }
                    });
                }
                this.Form.FilePengajuan.request_id = requestIds;
            },

            fetchUpdatePengajuan() {
                const productTestTypes = this.Form.Pengajuan.product_test_type;
                const request_ids = Array.isArray(this.Form.FilePengajuan.request_id) ? this.Form.FilePengajuan.request_id : [this.Form.FilePengajuan.request_id];
                const serviceIds = Array.isArray(this.Form.Pengajuan.service_id) ? this.Form.Pengajuan.service_id : [this.Form.Pengajuan.service_id];
                for (let index = 0; index < productTestTypes.length; index++) {
                        const productTestType = productTestTypes[index];
                        const serviceId = serviceIds[index];
                        const requestData = {
                            id: request_ids[index],
                            product_name: this.Form.Pengajuan.product.label,
                            product_link: this.Form.Pengajuan.product_link,
                            product_sub_test_type: this.Form.Pengajuan.product_sub_test_type,
                            product_description: this.Form.Pengajuan.product_description,
                            service_id: serviceId,
                            statusName: 'SUBMIT_DATA_PENGAJUAN',
                            unit: this.Form.Pengajuan.unit.label,
                            is_priority: this.Form.Pengajuan.is_priority,
                            product_test_type: productTestType,
                            requested_by: this.Form.Pengajuan.requested_by,
                            product: this.Form.Pengajuan.product.id,
                            tribe: this.Form.Pengajuan.tribe,
                            versi: this.Form.Pengajuan.versi,
                            revenue: this.Form.Pengajuan.revenue,
                            micro_impact: this.Form.Pengajuan.micro_impact,
                            platform_type: this.Form.Pengajuan.platform_type.join(','),
                            detail_feature_upgrade: this.Form.Pengajuan.detail_feature_upgrade,
                            attachment_requirement_heuristic_evaluation: this.Form.Pengajuan.attachment_requirement_heuristic_evaluation,
                            attachment_requirement_usability_testing: this.Form.Pengajuan.attachment_requirement_usability_testing,
                            attachment_requirement_security_testing: this.Form.Pengajuan.attachment_requirement_security_testing,
                            attachment_requirement_service_operation: this.Form.Pengajuan.attachment_requirement_service_operation,
                            attachment_requirement_software_testing: this.Form.Pengajuan.attachment_requirement_software_testing,
                            is_gtm_bundle: this.Form.Pengajuan.is_gtm_bundle,
                            legion_notes: this.Form.Pengajuan.legion_notes,
                            is_legion_standard: this.Form.Pengajuan.is_legion_standard,
                            service_name: this.Form.Pengajuan.service_name,
                        };

                        this.Request('PUT', '/api/v3/request/update-confirmation', null, requestData, 'BASIC', (res) => {
                            if (res.code === 200) {
                                if (this.$store.state.isDraft) {
                                    this.onShowModal('success-draft')
                                } else {
                                    this.onShowModal('success-ajukan-layanan')
                                }
                            } else {
                                this.error.message = {
                                    title: 'Gagal membuat pengajuan',
                                    content: res.message ? res.message : 'Pengajuan ini gagal dibuat'
                                };
                                this.modalError = true;
                            }
                        })
                }
            },
            fetchDraftPengajuan() {
                const productTestTypes = this.Form.Pengajuan.product_test_type;
                const serviceIds = Array.isArray(this.Form.Pengajuan.service_id) ? this.Form.Pengajuan.service_id : [this.Form.Pengajuan.service_id];
                for (const [productTestType, serviceId] of productTestTypes.map((id, index) => [id, serviceIds[index]])) {
                    const requestData = {
                        product_name: this.Form.Pengajuan.product.label,
                        product_link: this.Form.Pengajuan.product_link,
                        product_sub_test_type: this.Form.Pengajuan.product_sub_test_type,
                        product_description: this.Form.Pengajuan.product_description,
                        service_id: serviceId,
                        statusName: 'DRAFT',
                        unit: this.Form.Pengajuan.unit.label,
                        is_priority: this.Form.Pengajuan.is_priority,
                        product_test_type: productTestType,
                        requested_by: this.Form.Pengajuan.requested_by,
                        product: this.Form.Pengajuan.product.id,
                        tribe: this.Form.Pengajuan.tribe,
                        versi: this.Form.Pengajuan.versi,
                        revenue: this.Form.Pengajuan.revenue,
                        micro_impact: this.Form.Pengajuan.micro_impact,
                        platform_type: this.Form.Pengajuan.platform_type.join(','),
                        detail_feature_upgrade: this.Form.Pengajuan.detail_feature_upgrade,
                        attachment_requirement_heuristic_evaluation: this.Form.Pengajuan.attachment_requirement_heuristic_evaluation,
                        attachment_requirement_usability_testing: this.Form.Pengajuan.attachment_requirement_usability_testing,
                        attachment_requirement_security_testing: this.Form.Pengajuan.attachment_requirement_security_testing,
                        attachment_requirement_service_operation: this.Form.Pengajuan.attachment_requirement_service_operation,
                        attachment_requirement_software_testing: this.Form.Pengajuan.attachment_requirement_software_testing,
                        is_gtm_bundle: this.Form.Pengajuan.is_gtm_bundle,
                        legion_notes: this.Form.Pengajuan.legion_notes,
                        is_legion_standard: this.Form.Pengajuan.is_legion_standard,
                        service_name: this.Form.Pengajuan.service_name,
                    };
                    this.Request('POST', '/api/v3/request/create-draft', null, requestData, 'BASIC', (res) => {
                        if (res.code === 200) {
                            this.onShowModal('success-draft')
                        }
                    })
                }
            },

            fetchUploadFileJustifikasi(file) {
                this.Form.FilePengajuan.attachment_type = 'EVIDENCE_PRIORITAS';
                const productTestTypes = this.Form.Pengajuan.product_test_type;
                const request_ids = Array.isArray(this.Form.FilePengajuan.request_id) ? this.Form.FilePengajuan.request_id : [this.Form.FilePengajuan.request_id];
                const serviceIds = Array.isArray(this.Form.Pengajuan.service_id) ? this.Form.Pengajuan.service_id : [this.Form.Pengajuan.service_id];
                for (let index = 0; index < productTestTypes.length; index++) {
                    const productTestType = productTestTypes[index];
                    const serviceId = serviceIds[index];
                    const formData = new FormData()
                    formData.append('request_id', request_ids[index])
                    formData.append('name', file.file.name)
                    formData.append('imgFile', file.file)
                    formData.append('type', file.file.type)
                    formData.append('file_type', 'lampiran')
                    formData.append('service', serviceId)
                    formData.append('product_name', this.Form.FilePengajuan.product_name)
                    formData.append('attachment_type', this.Form.FilePengajuan.attachment_type)
                    formData.append('created_by', this.Form.Pengajuan.requested_by)

                    this.RequestUploadFile('POST','/api/v3/request-attachment/createEvidence', null, formData, 'BASIC',
                        (progress) => {
                            file.additional.isLoadingPercentage = progress
                        }, (res) => {
                            if (res.code === 200) {
                                    file.additional.isLoading = false;
                                    file.additional.id = res.content[0].id;
                            } else {
                                this.Data.listFiles.splice(-1);
                                if(typeof res.message === 'object' && res.message.details.length > 0) {
                                    let msg = (res.message.details.map((i) => i.message)).join(", ");
                                    this.error.message = {
                                        title: 'Gagal mengunggah lampiran',
                                        content: msg
                                    };
                                } else {
                                    this.error.message = {
                                        title: 'Gagal mengunggah lampiran',
                                        content: res.message ? res.message : 'Lampiran Anda gagal diunggah'
                                    };
                                }
                                this.modalError = true;
                            }
                        })
                }
            },
            
            fetchUploadFilePengajuan(file, slug) { 

                if (slug === 'alih-kelola') {
                    slug = 'service-operation';
                }

                let endpoint = `/api/v3/request-attachment/create/${slug}`;

                const formData = new FormData();
                formData.set('request_id', this.Form.FilePengajuan.request_id);
                formData.set('name', file.file.name);
                formData.set('imgFile', file.file);
                formData.set('type', file.file.type);
                formData.set('file_type', 'lampiran');
                formData.set('service', this.Form.FilePengajuan.service);
                formData.set('product_name', this.Form.FilePengajuan.product_name);
                formData.set('attachment_type', this.Form.FilePengajuan.attachment_type);
                formData.set('created_by', this.Form.Pengajuan.requested_by);

                this.RequestUploadFile('POST', endpoint, null, formData, 'BASIC', (progress) => {
                    file.additional.isLoadingPercentage = progress;
                }, (res) => {
                    if (res.code === 200) {
                        file.additional.isLoading = false;
                        file.additional.id = res.content[0].id;
                        if (this.Form.Pengajuan.is_priority === false) {
                            slug = slug.replace(/-/g, '_');
                            let attachment_requirement = `attachment_requirement_${slug}`
                            this.Form.Pengajuan[attachment_requirement] = res.content[0].id;
                        }
                    } else {
                        this.Data.listFiles.splice(-1);
                        if (typeof res.message === 'object' && res.message.details.length > 0) {
                            let msg = res.message.details.map((i) => i.message).join(', ');
                            this.error.message = {
                                title: 'Gagal mengunggah lampiran',
                                content: msg
                            };
                        } else {
                            this.error.message = {
                                title: 'Gagal mengunggah lampiran',
                                content: res.message ? res.message : 'Lampiran Anda gagal diunggah'
                            };
                        }
                        this.modalError = true;
                    }
                });
            },
            
            handleBatalkanPengajuan() {
                this.onShowModal('batalkan-layanan')
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
            handleDisabledCheckbox(){
                if(this.Form.Pengajuan.is_gtm_bundle === true) return true
            },
            handleDisabledbuatButton(){
                if (this.$v.Form.newProduct.$invalid) return true
                if(this.Form.showNewProductInput === false) return true
            },
            handleDisabledNextButton() {
                if (this.Step.isStep === 1) {
                    if (this.Data.selectedServices.length === 0) return true
                }

                if (this.Step.isStep === 2) {
                    if (this.Data.selectedServices.some(service =>service.slug === 'heuristic-evaluation' || service.slug === 'usability-testing')) {
                        if (this.$v.Form.Pengajuan.$invalid) return true
                        if  (this.$v.Form.Pengajuan.is_legion_standard.$model === true && (this.$v.Form.Pengajuan.legion_notes.$model === '' || this.$v.Form.Pengajuan.legion_notes.$model === null)) return true
                    } else {
                        if (this.$v.Form.Pengajuan.$invalid || this.$v.Form.Pengajuan.product_description.$invalid) return true
                    }
                }
                if (this.Step.isStep === 3) {
                    const selectedSlugs = this.Data.selectedServices.map((item) => item.slug);
                    const incompleteUpload = selectedSlugs.some((slug) => {
                        if (!this.Data.listFiles.hasOwnProperty(slug) || this.Data.listFiles[slug].length === 0) {
                        return true; 
                        }
                        return this.Data.listFiles[slug].some((file) => file.additional.isLoading);
                    });
                    if (!this.$store.state.isDraft && incompleteUpload) {
                        return true;
                    }
                }

                if (this.Step.isStep === 4) {
                    if (this.Data.listFiles.length === 0 && !this.$store.state.isDraft) return true;
                    if (this.Form.FilePengajuan.attachment_type === null) return true

                }
            },
            handleBackButtonClick() {
                if (this.Step.isStep === 5 && this.Form.Pengajuan.is_priority === false) {
                    this.Step.isStep = this.Step.isStep - 2;
                } else {
                    this.Step.isStep = this.Step.isStep - 1;
                }
            },
            isPrioritySelected(value) {
                return this.Form.Pengajuan.is_priority === value;
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
            getProduct() {
                this.Request('GET', '/api/v3/product/list-multiselect', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.userProducts = callback.content;
                        // this.userProducts = callback.content.map((product, index) => ({
                        //     label: product.status !== 'DRAFT'  ? product.label: `${product.label} (${product.status})`,
                        //     id: product.id, 
                        //     status: product.status, 
                        // }));
                    };
                });
            },
        }
    }

</script>

<style scoped>

.draft-status {
    color: orange; /* Atur warna oranye sesuai keinginan Anda */
}
.addnewProduct{
    color: var(--tertiary-tertiary-80, #2E3032);
    text-align: center;
    font-family: Nunito Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}
.textNewProoduct{
    color: var(--tertiary-tertiary-80, #2E3032);
    font-family: Nunito Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
}
.swal2-checkbox-label {
    color: var(--tertiary-tertiary-60, #8C8F93);
    font-family: Nunito Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
}
.swal2-checkbox {
    margin: 0%;
    margin-right: 10px;
    vertical-align: middle;  
}
.note{
    background: var(--accent-warning-warning-20, #FFEFD2);
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    margin-top:2%;
    margin-bottom:4%;
}
.textNote{
    color: var(--tertiary-tertiary-60, #8C8F93);
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
}
.starNote{
    color: var(--primary-primary-50, #E42313);
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
    padding-left:10px;
}
.title-information-layanan {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 32px;
  color: #262b31;

  margin-bottom: 32px;
}

.title-information-percepatan {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 32px;
  color: #262b31;
}
.sub-information-layanan p {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  color: #262b31;

  margin-bottom: 16px;
}


.sub-information-layanan ul {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #61676d;

  list-style-type: disc;
  padding-left: 1rem;
}

.sub-information-layanan ul li {
  margin-bottom: 16px;
}

.any-information-layanan {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #61676d;

  margin-top: 32px;
}

.any-information-percepatan {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #61676d;
}

.section-layanan {
  margin-bottom: 32px;
}

.section-layanan .title {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 16px;
  color: #61676d;

  margin-bottom: 16px;
  text-transform: uppercase !important;
}

.no-pilih-layanan {
  background-color: #f2f4f6;
  border-radius: 4px;
  padding: 20px 60px;
}

.no-pilih-layanan label {
  font-family: "Nunito Sans";
  font-weight: 700;
  font-size: 16px;
  color: #151718;
}

.upload-lampiran {
  background-color: #fdf7f7;
  border-radius: 4px;
  padding: 16px 60px;
  border: 1.5px dashed #e42313;

  margin-bottom: 8px;
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

.file-lampiran {
  margin-bottom: 16px;
}

.list-file-lampiran {
  background-color: #ffffff;
  border: 1px solid #f2f4f6;
  border-radius: 8px;
  padding: 14px 16px;
}

.list-file-lampiran .file-name {
  font-family: "Poppins";
  font-weight: 500;
  font-size: 14px;
  color: #151718;

  margin-bottom: 0;
}

.list-file-lampiran .file-size {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 12px;
  color: #8c8f93;
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

.service-list {
  margin-bottom: 37px;
}

.service-list .service-logo {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 12px;
}

.service-list .service-name {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  color: #262b31;

  margin-bottom: 0;
}

.service-list .service-desc {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #262b31;

  width: 75%;
}

.service-list .btn-service-selected {
  font-family: "Nunito Sans" !important;
  font-weight: 800 !important;
  font-size: 14px !important;
  color: #d7281e;

  padding: 8px 24px;
  border: 1px solid #d7281e;
  border-radius: 3px;
}

.summary-layanan .row {
  margin-bottom: 16px;
}

.summary-layanan .key {
  font-family: "Nunito Sans";
  font-weight: 600;
  font-size: 16px;
  color: #151718;
}

.summary-layanan .colon {
  font-family: "Nunito Sans";
  font-weight: 600;
  font-size: 16px;
  color: #151718;
}

.summary-layanan .value {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #151718;
}

.summary-layanan a.value {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 16px;
  color: #e42313;
}

.btn-back {
  font-family: "Nunito Sans" !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  color: #e42313;

  padding: 6px 12px;
  margin-right: 8px;
}

.btn-next {
  font-family: "Nunito Sans" !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  color: #ffffff;

  padding: 6px 12px;
  margin-left: 8px;
}

.btn-next.disabled {
  color: #b1b5ba;
  background-color: #d9dde3;
  border-color: #d9dde3;
}

.badge-selected-service {
  font-family: "Nunito Sans" !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  color: #e42313;

  padding: 3px 7px;
  margin-left: 8px;
  border: 1px solid #e42313;
  border-radius: 8px;
  text-transform: capitalize;
}

.b-tooltip {
  opacity: unset !important;
}

div /deep/ .tooltip-inner {
  background-color: white;
  padding: 8px;
  box-shadow: 0px 10px 14px rgba(126, 50, 25, 0.15) !important;
  border-radius: 3px;
}

div /deep/ .arrow::before {
  display: none !important;
}

div /deep/ .tooltip-inner .desc {
  font-family: "Nunito Sans";
  font-weight: 400;
  font-size: 12px;
  color: #8c8f93;

  margin-bottom: 0 !important;
  text-align: left;
}

div /deep/ .tooltip-inner .sample.desc {
  font-weight: 700 !important;

  margin-bottom: 0 !important;
}

.sample{
    color: #A8ABAE;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
}
.handle-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  height: 270px;
}

.form-pengajuan /deep/ .treeselect .vue-treeselect__control {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}

.form-pengajuan /deep/ .vue-treeselect__placeholder, 
.form-pengajuan /deep/ .vue-treeselect__single-value {
    line-height: 26px;
}

.orange-rectangle {
  border: 2px solid orange;
  padding: 10px;
  color: #151718;
  border-radius: 8px;
}

.orange-rectangle h5 {
    color: #262B31;
    text-align: justify;
    font-family: "Poppins";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-left: 20px;
    margin-right: 20px;
}

.masterchipicon {
    position: relative;
    width: 23px;
    height: 23px;
}
.medium {
    position: relative;
    letter-spacing: 0.15px;
    line-height: 143%;
}
.masterchiptext {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.chipVar {
    position: relative;
    border-radius: 16px;
    background-color: #ff9800;
    box-sizing: border-box;
    width: 23%;
    height: 30px;
    display: flex;
    padding: 4px 5px 4px 5px;
    align-items: center;
    justify-content: center;
    text-align: right;
    color: #fff;
    margin-left: 20px;
}

.sub-information-sla p{
    font-family: "Poppins";
    font-weight: 600;
    font-size: 20px;
    color: #262b31;
    margin-top: 20px;
    margin-bottom: 9px;
}

.sub-information-sla ul {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 16px;
    color: #61676d;
    margin: 5px 10px;
    /* line-height: 30px; */
    list-style-type: disc;
    padding-left: 25px;
}

.sub-information-sla ul li {
    margin-bottom: 5px;
}

.sub-information b{
    font-family: "Poppins";
    font-weight: 600;
    font-size: 16px;
    color: #262b31; 
    line-height: 28px;  
}

.sub-sla {
    color: #61676d;
}

.custom-control-input:checked~.custom-control-label.red::before {
  background-color: red;
}

/* Styling for unchecked checkbox */
.swal2-checkbox[type="checkbox"] {
  position: relative;
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #FDF7F7;
  border: 2px solid red;
  border-radius: 20%;
  cursor: pointer;
}

.swal2-checkbox[type="checkbox"]:disabled{
  /* position: relative;
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #d9dde3;
  border: 2px solid #d9dde3;
  border-radius: 20%;
  cursor: pointer; */
  color: #b1b5ba;
  background-color: #d9dde3;
  border-color: #d9dde3;
}

/* Styling for checked checkbox */
.swal2-checkbox[type="checkbox"]:checked {
  background-color: red;
  
  border: none;
}

/* Styling for checked checkbox when clicked */
.swal2-checkbox[type="checkbox"]:checked:active {
  background-color: red;
}

/* Styling for checkbox hover effect */
.swal2-checkbox[type="checkbox"]:hover {
  border-color: red;
}

.swal2-checkbox[type="checkbox"]:checked::before {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }

</style>
