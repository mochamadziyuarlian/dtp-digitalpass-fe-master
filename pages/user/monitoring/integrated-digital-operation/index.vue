<template>
    <div class="section-container">
        <div style="height: 80vh;">
            <div class="row h-100">
                <div class="col-xl-12 d-flex justify-content-center">
                    <div>
                        <img src="/v3/Portal/assets/icon/IDO_ILUSTRATION.svg">
                    </div>
                </div>
                <div class="col-xl-12 d-flex justify-content-center align-items-center">
                    <div class="ido">
                        <p class="ido-title">Integrated Digital Operation</p>
                        <p class="ido-sub-title">
                            Untuk melihat halaman ini, Anda harus masuk ke halaman utama untuk meminta akses kepada tim
                            kami.
                            Tekan tombol dibawah ini untuk menuju ke website Integrated Digital Operation (IDO)
                        </p>
                        <div class="d-flex justify-content-center mb-4">
                            <button type="button" class="btn btn-v3-dsa-primary"
                                @click="$refs['Modal_RedirectIDO'].show()"
                                style="padding-left: 9rem; padding-right: 9rem; border-radius: 4px;">
                                Website IDO
                            </button>
                        </div>
                        <p class="text-center">
                            <span class="ido-bingung">Merasa bingung?</span>&nbsp;
                            <span class="ido-bingung-hubungi">Hubungi Kami disini</span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <b-modal ref="Modal_RedirectIDO" id="Modal_RedirectIDO" size="lg" hide-header hide-footer centered>
                    <img src="/v3/Portal/assets/icon/IDO_MODAL_ILUSTRATION.svg">
                    <div style="margin-top: 20rem;">
                        <div class="row mb-3">
                            <div class="col-xl-12 d-flex justify-content-center">
                                <p class="modal-label w-50 text-center">Apakah Anda yakin melanjutkan ke halaman IDO?</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 d-flex justify-content-end">
                                <button type="button" class="btn btn-v3-outline-dsa-primary" style="padding: 10px 40px;"
                                    @click="$refs['Modal_RedirectIDO'].hide()">
                                    Batal
                                </button>
                            </div>
                            <div class="col-xl-6 d-flex justify-content-start" @click="redirectIDO()">
                                <button type="button" class="btn btn-v3-dsa-primary" style="padding: 10px 50px;">
                                    Ya
                                </button>
                            </div>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {

            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Integrated Digital Operation',
                titleURL: null,
                menu: []
            }]);
        },
        mounted() {

        },
        methods: {
            redirectIDO() {
                window.open('https://ido.digitalpass.id/', '_blank').focus();
            }
        }
    }

</script>

<style scoped>
    .ido {
        width: 40%;
    }

    .ido-title {
        font-family: 'Poppins';
        color: #262B31;
        font-weight: 600;
        font-size: 24px;
        text-align: center;
        margin-bottom: 50px;
    }

    .ido-sub-title {
        font-family: 'Nunito Sans';
        color: #656664;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        margin-bottom: 40px;
    }

    .ido-bingung {
        font-family: 'Poppins';
        color: #000000;
        font-weight: 400;
        font-size: 18px;
    }

    .ido-bingung-hubungi {
        font-family: 'Nunito Sans';
        color: #E42313;
        font-weight: 700;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }

    div /deep/ .modal-content {
        border-radius: 0;
        border: 0;
        height: 600px;
    }

    div /deep/ .modal-body {
        padding: 0;
        height: 100%;
    }

    div /deep/ .modal-body .modal-label {
        font-family: 'Nunito Sans';
        color: #3B3D39;
        font-weight: 700;
        font-size: 24px;
    }

</style>
