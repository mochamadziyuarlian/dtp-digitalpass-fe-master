<template>
    <div class="py-content bg-white" style="padding-top: 16.5rem; padding-bottom: 16.5rem;">
        <div class="row">
            <div class="col-3 align-self-center">
                <img class="" src="https://minio.digitalpass.id/static/assets/error/additional-left.png" alt="">
            </div>
            <div class="col-6 d-flex justify-content-center">
                <img class="" src="https://minio.digitalpass.id/static/assets/error/404.png" alt="">
            </div>
            <div class="col-3"></div>
        </div>

        <div class="row">
            <div class="col-3 align-self-center">
            </div>
            <div class="col-6 d-flex justify-content-center">
                <div class="text-center">
                    <div class="py-3">
                        <label class="text-gray-dark-1 font-size-36 font-weight-700 line-height-46">
                            Halaman tidak ditemukan
                        </label>
                        <h6 class="text-gray-dark-1 font-weight-400 line-height-20">
                            Halaman yang kamu cari sedang tidak tersedia.
                        </h6>
                    </div>
                    <nuxt-link to="/" class="btn btn-outline-red">
                        Kembali ke halaman utama
                    </nuxt-link>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <img class="" src="https://minio.digitalpass.id/static/assets/error/additional-right.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'without-footer',
    }

</script>
