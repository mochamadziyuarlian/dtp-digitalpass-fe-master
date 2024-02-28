<template>
    <div class="bg-white">
        <div class="container">
            <footer class="footer mb-4">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <img src="https://minio.digitalpass.id/static/assets/logo-gray.png" alt="dtp-dsa-logo" style="width: 100px;" />
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div class="row justify-content-end" style="display: flex;align-items: flex-end;">
                            <div class="px-4">
                                <nuxt-link to="/tentang-kami">
                                    <h6 class="text-gray-light-1">Tentang Kami</h6>
                                </nuxt-link>
                            </div>
                            <div class="px-4">
                                <nuxt-link to="/syarat-ketentuan">
                                    <h6 class="text-gray-light-1">Syarat & Ketentuan</h6>
                                </nuxt-link>
                            </div>
                            <div class="pl-4">
                                <nuxt-link to="/FAQ">
                                    <h6 class="text-gray-light-1">FAQ</h6>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {

    };

</script>
<style scoped>
    footer a h6:hover {
        color: #ED2B24 !important;
    }

</style>
