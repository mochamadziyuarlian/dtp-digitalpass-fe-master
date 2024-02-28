<template>
    <div>
        <footer class="footer py-4" id="FooterPortal">
            <div class="container border-bottom">
                <div class="row">
                    <div
                        class=" col-sm-4 col-md-3 col-12 col-sm-12 col-xs-12 d-sm-flex justify-content-sm-center mb-sm-4">
                        <img class="img-logo" src="/image/logo/logo-leap.png" alt="dtp-dsa-logo" />
                    </div>
                    <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                        <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">LAYANAN INFORMASI</label>

                        <div class="media">
                            <em class="bi bi-envelope-fill font-size-15"></em>
                            <div class="media-body ml-2 mt-1">
                                <p class="mb-sm-4 mb-md-2">helpdeskdxb@telkom.co.id</p>
                            </div>
                        </div>

                        <div class="media">
                            <em class="bi bi-whatsapp font-size-15"></em>
                            <div class="media-body ml-2 mt-1">
                                <p class="mb-2">+62 822-2800-0720</p>
                            </div>
                        </div>

                        <div class="media">
                            <em class="bi bi-geo-alt-fill font-size-15"></em>
                            <div class="media-body ml-2 mt-1">
                                <p class="mt-0 mb-sm-4 mb-md-2">Menara Bandung Digital Valley, Jl. Gegerkalong Hilir
                                    No.47, Sukarasa,
                                    Sukasari, Kota Bandung, Jawa Barat 40152</p>
                            </div>
                        </div>

                        <div class="media">
                            <em class="bi bi-geo-alt-fill font-size-15"></em>
                            <div class="media-body ml-2 mt-1">
                                <p class="mt-0 mb-sm-4 mb-md-2">STO Telkom Kebayoran, Lt.6, Jl. Sisingamangaraja
                                        No.4, RT.2/RW.1, Selong, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus
                                        Ibukota Jakarta 12110, Indonesia
                                </p>
                            </div>
                        </div>

                        <!-- <ul class="footer_ul_amrc"> -->
                        <!-- <li>
                                <a href="javascript:void(0);">
                                    <em class="bi bi-envelope-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;"></em>
                                </a>
                                <p class="mb-0">helpdeskdxb@telkom.co.id</p>
                            </li> -->
                        <!-- <li>
                                <a href="javascript:void(0);">
                                    <em class="bi bi-telephone-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;"></em>
                                </a>
                                <p class="mb-0">+62 822-2800-0720</p>
                                <span class="ml-4" style="color: #BDBEB2;">Hanya jam kerja (Senin - Jum’at)</span>
                            </li> -->
                        <!-- <li id="address-1">
                                <a href="javascript:void(0);">
                                    <em class="bi bi-geo-alt-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;height: 70px;"></em>
                                </a>
                                <p class="mb-0">
                                    Menara Bandung Digital Valley, Jl. Gegerkalong Hilir No.47, Sukarasa,
                                    Sukasari, Kota Bandung, Jawa Barat 40152
                                </p>
                            </li> -->
                        <!-- <li id="address-2">
                                <a href="javascript:void(0);">
                                    <em class="bi bi-geo-alt-fill fleft padding-right font-size-15"
                                        style="margin-top: -4px;height: 80px;"></em>
                                </a>
                                <p class="mb-0">
                                    Telkom STO Kebayoran, Jl. Sisingamangaraja No.4, RT.2/RW.1, Selong, Kec. Kby. Baru,
                                    Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110
                                </p>
                            </li> -->
                        <!-- </ul> -->
                    </div>
                    <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                        <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">JASA KAMI</label>
                        <ul class="footer_ul_amrc ml-sm-4 col">
                            <li>
                                <nuxt-link to="/layanan/security-testing">Security Testing</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/layanan/heuristic-evaluation">Heuristic Evaluation (HE)</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/layanan/usability-testing">Usability Testing (UT)</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/layanan/software-testing">Sofware Testing</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/layanan/service-operation">Service Operation</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class=" col-sm-4 col-md-3 col-sm-12 col-xs-12 mx-auto width-layanan-informasi mb-sm-4">
                        <label class="text-gray-dark-1 font-size-14 font-weight-700 mb-sm-4">LAINNYA</label>
                        <ul class="footer_ul_amrc ml-sm-4 col">
                            <li>
                                <nuxt-link to="/publikasi">Publikasi</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/produk-dalam-pengujian">Produk Dalam Pengujian</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container" id="Lainnya">
                <div class="row pt-4">
                    <div class="row col-md-7 col-sm-12  justify-content-sm-center mx-auto">
                        <div class="pr-4 link d-sm-none">
                            <img src="https://minio.digitalpass.id/static/assets/logo-telkom-putih.png"
                                alt="telkom-logo" />
                        </div>
                        <div class="px-4 my-auto pt-3">
                            <nuxt-link to="/arsip-dokumen">
                                <h6 class="text-gray-light-1">Arsip</h6>
                            </nuxt-link>
                        </div>
                        <div class="px-4 my-auto pt-3">
                            <nuxt-link to="/tentang-kami">
                                <h6 class="text-gray-light-1">Tentang Kami</h6>
                            </nuxt-link>
                        </div>
                        <div class="px-4 my-auto pt-3">
                            <nuxt-link to="/syarat-ketentuan">
                                <h6 class="text-gray-light-1">Syarat & Ketentuan</h6>
                            </nuxt-link>
                        </div>
                        <div class="px-4 my-auto pt-3">
                            <nuxt-link to="/FAQ">
                                <h6 class="text-gray-light-1">FAQ</h6>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="m-0 p-0 col-md-5 col-sm-12">
                        <div class=" my-auto pt-1 text-sm-center d-none">
                            <nuxt-link to="/FAQ">
                                <h6 class="text-gray-light-1 my-auto pt-1">Copyright © {{ date }} MDD Telkom</h6>
                            </nuxt-link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: null
            };
        },
        mounted() {
            const d = new Date();
            this.date = d.getFullYear();
        },
    };

</script>


<style scoped>
    footer {
        width: 100%;
        background-color: #F4F4F4;
        min-height: 250px;
        padding: 10px 0px 25px 0px;
    }

    .pt2 {
        padding-top: 40px;
        margin-bottom: 20px;
    }

    footer p {
        font-size: 12px;
        color: #7F817D !important;
        padding-bottom: 0px;
        margin-bottom: 8px;
    }

    .mb10 {
        padding-bottom: 15px;
    }

    .footer_ul_amrc {
        margin: 0px;
        list-style-type: none;
        font-size: 12px;
        padding: 0px 0px 10px 0px;
    }

    .footer_ul_amrc li {
        padding: 0px 0px 20px 0px;
    }

    .footer_ul_amrc li a {
        color: #7F817D;
        /* text-decoration: none; */
    }

    .fleft {
        float: left;
    }

    .padding-right {
        padding-right: 10px;
    }

    .footer_ul2_amrc {
        margin: 0px;
        list-style-type: none;
        padding: 0px;
    }

    .footer_ul2_amrc li p {
        display: table;
    }

    .footer_ul2_amrc li a:hover {
        text-decoration: none;
    }

    .footer_ul2_amrc li i {
        margin-top: 5px;
    }

    .foote_bottom_ul_amrc {
        list-style-type: none;
        padding: 0px;
        display: table;
        margin-top: 10px;
        margin-right: auto;
        margin-bottom: 10px;
        margin-left: auto;
    }

    .foote_bottom_ul_amrc li {
        display: inline;
    }

    .foote_bottom_ul_amrc li a {
        color: #999;
        margin: 0 12px;
    }

    .social_footer_ul {
        display: table;
        margin: 15px auto 0 auto;
        list-style-type: none;
    }

    .social_footer_ul li {
        padding-left: 20px;
        padding-top: 10px;
        float: left;
    }

    .social_footer_ul li a {
        color: #CCC;
        border: 1px solid #CCC;
        padding: 8px;
        border-radius: 50%;
    }

    .social_footer_ul li i {
        width: 20px;
        height: 20px;
        text-align: center;
    }

    .footer a h6:hover,
    .footer ul li a:hover {
        color: #ED2B24 !important;
        text-decoration: underline !important;
    }

    .footer a h6,
    .footer ul li a {
        /* text-decoration: underline !important; */
    }

    .img-logo {
        width: 120px;
    }

    @media (max-width: 576px) {
        .px-4 {
            padding-right: 0.25rem !important;
            padding-left: 0.25rem !important;
        }

        .d-sm-flex {
            display: -webkit-box !important;
            display: -ms-flexbox !important;
            display: flex !important
        }

        .justify-content-sm-center {
            -webkit-box-pack: center !important;
            -ms-flex-pack: center !important;
            justify-content: center !important
        }

        .mb-sm-4,
        .my-sm-4 {
            margin-bottom: 1.5rem !important;
        }

        .width-layanan-informasi {
            width: 80%;
        }

        .mb-sm-5,
        .my-sm-5 {
            margin-bottom: 3rem !important;
        }

        .ml-sm-4,
        .mx-sm-4 {
            margin-left: 1.5rem !important;
        }

        .d-sm-none {
            display: none !important;
        }

        .mr-sm-auto,
        .mx-sm-auto {
            margin-right: auto !important;
        }

        .text-sm-center {
            text-align: center !important;
        }
    }

    @media (min-width: 576px) {

        .d-sm-flex {
            display: unset !important;
        }

        .justify-content-sm-center {
            -webkit-box-pack: unset !important;
            -ms-flex-pack: unset !important;
            justify-content: unset !important
        }

        .ml-sm-4,
        .mx-sm-4 {
            margin-left: 0 !important;
        }

        .d-sm-none {
            display: block !important;
        }

        .text-sm-center {
            text-align: right !important;
        }

    }

</style>
