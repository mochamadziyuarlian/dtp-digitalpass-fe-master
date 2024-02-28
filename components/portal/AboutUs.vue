<template>
    <div id="TentangKami">
        <div class="row pb-1">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h5 class="text-gray-light-1 font-weight-900 line-height-27" id="head">{{ aboutUs.head }}</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <h2 class="text-gray-dark-1 font-weight-900 line-height-44" style="width: 30rem;max-width: 30rem;"
                    id="sub_head">
                    <span v-html="aboutUs.sub_head"></span>
                </h2>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-xl-1 offset-lg-1 offset-md-1">
                <h5 class="text-gray-main line-height-36" id="value">
                    <span v-html="aboutUs.value"></span>
                </h5>
                <nuxt-link :to="'/tentang-kami'" class="text-red-main font-size-18 font-weight-700" v-if="$route.path === '/'">
                    Pelajari lebih lanjut
                    <img src="@/assets/images/icon/arrow-new-right-red.svg" class="ml-3 mb-1" alt="">
                </nuxt-link>
            </div>
        </div>
        <div class="row py-5">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pt-5 float-right" style="margin-right: 2rem;">
                    <img class="max-size-about-us-1 w-100 rounded"
                        src="https://minio.digitalpass.id/static/assets/portal/about-us-1.jpg" alt="about-us">
                </div>
                <div class="pt-5 mt-2 float-right" style="margin-right: 2rem;">
                    <img class="max-size-about-us-3 w-100 rounded"
                        src="https://minio.digitalpass.id/static/assets/portal/about-us-3.jpg" alt="about-us">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="position-absolute" style="top: 3.5rem;right: 0;">
                    <img class="" src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="dot">

                </div>
                <div class="pt-5 mt-5 position-sticky">
                    <img class="max-size-about-us-2 w-100 rounded"
                        src="https://minio.digitalpass.id/static/assets/portal/about-us-2.jpg" alt="about-us">
                </div>
                <div class="pt-5 mt-2">
                    <img class="max-size-about-us-4 w-100 rounded"
                        src="https://minio.digitalpass.id/static/assets/portal/about-us-4.jpg" alt="about-us">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pl-5 pt-3">
                    <img class="" src="https://minio.digitalpass.id/static/assets/portal/dot.png" alt="dot">
                </div>
            </div>
        </div>
        <div class="row py-4">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 align-self-center">
                <h5 class="text-gray-light-1 line-height-36" id="dipercayai_oleh">DIPERCAYA OLEH
                </h5>
            </div>
            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 align-self-center d-none d-sm-block">
                <span>
                    <hr style="transform: rotate(-90deg);">
                </span>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 align-self-center d-none d-sm-block">
                <div class="row">
                    <div class="col-auto mx-3 mt-3">
                        <img class="" src="https://minio.digitalpass.id/static/assets/portal/product/vutura.png"
                            alt="product">
                    </div>
                    <div class="col-auto mx-3">
                        <img class="" src="https://minio.digitalpass.id/static/assets/portal/product/pijar.png"
                            alt="product">
                    </div>
                    <div class="col-auto mx-3">
                        <img class="" src="https://minio.digitalpass.id/static/assets/portal/product/klik-adzkia.png"
                            alt="product">
                    </div>
                    <div class="col-auto mx-3">
                        <img class="" src="https://minio.digitalpass.id/static/assets/portal/product/agree.png"
                            alt="product">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid d-block d-sm-none">
            <div class="row">
                <div class="col-6">
                    <img class="w-100" style="margin-top: 7px;"
                        src="https://minio.digitalpass.id/static/assets/portal/product/vutura.png" alt="product">
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <img class="w-50" src="https://minio.digitalpass.id/static/assets/portal/product/pijar.png"
                        alt="product">
                </div>
            </div>
            <div class="row">
                <div class="col-6 pt-4">
                    <img class="w-50" src="https://minio.digitalpass.id/static/assets/portal/product/klik-adzkia.png"
                        alt="product">
                </div>
                <div class="col-6 pt-4 d-flex justify-content-center">
                    <img class="w-50" src="https://minio.digitalpass.id/static/assets/portal/product/agree.png"
                        alt="product">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            aboutUs: {}
        },
    }

</script>
