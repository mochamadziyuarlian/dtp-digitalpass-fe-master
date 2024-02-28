<template>
    <div>
        <div class="title-container">
            <p class="title">Butuh bantuan?</p>
            <p class="subtitle">Temukan jawabanmu disini</p>
        </div>
        <div class="section-container">
            <div class="topic">
                <p class="topic-title">Pilih Topik Bantuan</p>
                <div class="row">
                    <div class="col-xl-4" v-for="(item, index) of topic" :key="index">
                        <nuxt-link :to="'/user/lainnya/pusat-bantuan/' + item.title">
                            <div class="topic-item">
                                <img :src="'/v3/Portal/assets/images/pusat-bantuan/' + item.image + '.svg'" />
                                <p>{{ item.title }}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
            <!-- <div style="margin-bottom: 1.5rem !important;">
                <span class="label-title">
                    FAQ
                </span>
            </div>
            <hr class="v3" />
            <div style="padding-top: 0.8rem; padding-bottom: 2.2rem;">
                <div id="accordion">
                    <div class="row">
                        <div class="col-xl-12" v-for="(item, index) of listFaq" :key="index">
                            <div class="card mb-3">
                                <div class="card-header" :id="`headingFAQ${index}`">
                                    <label class="label-section-faq mb-0">
                                        <button class="btn btn-link" data-toggle="collapse"
                                            :data-target="`#collapseFAQ${index}`" aria-expanded="true"
                                            :aria-controls="`collapseFAQ${index}`">
                                            {{ item.question }}
                                        </button>
                                    </label>
                                </div>
                                <div :id="`collapseFAQ${index}`" class="collapse" :aria-labelledby="`headingFAQ${index}`"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <label class="sub-label-section-faq">
                                            <span v-html="item.answer"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

            <div class="row mt-3">
                <div class="col-xl-12">
                    <div class="footer-faq">
                        <div>
                            <div class="row">
                                <div class="col-xl-12">
                                    <p class="title-footer">
                                        Masih butuh bantuan?
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="hubungi-telfon">
                                        <div class="row">
                                            <div class="col-auto pr-0">
                                                <img src="/v3/Portal/assets/icon/FAQ_TELFON.svg">
                                            </div>
                                            <div class="col">
                                                <p class="mb-0">
                                                    <a href="https://wa.me/082228000720" target="_blank">
                                                        +62 82228000720
                                                    </a>
                                                </p>
                                                <label>WhatsApp</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="hubungi-email" style="width: 270px">
                                        <div class="row">
                                            <div class="col-auto pr-0">
                                                <img src="/v3/Portal/assets/icon/FAQ_EMAIL.svg">
                                            </div>
                                            <div class="col">
                                                <p class="mb-0">
                                                    <a href="mailto:helpdesk@digitalpass.id" target="_blank">
                                                        helpdesk@digitalpass.id
                                                    </a>
                                                </p>
                                                <label>Email</label>
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
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                listFaq: [],
                topic: [
                    {
                        title: 'Akun & Keamanan',
                        image: 'account-security'
                    },
                    {
                        title: 'Layanan',
                        image: 'service'
                    },
                    {
                        title: 'Drive Dokumen',
                        image: 'drive-document'
                    },
                ]
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Pusat Bantuan',
                titleURL: null,
                menu: []
            }]);
        },
        mounted() {
            this.getFAQ();
        },
        methods: {
            getFAQ() {
                const param = {
                    status: 1
                }
                this.Request('GET', '/api/v3/portal/faq', param, null, 'BASIC', (res) => {
                    this.listFaq = res.content;
                });
            }
        }
    }

</script>

<style scoped>
    .label-title {
        font-family: 'Poppins';
        color: #2E3032;
        font-weight: 600;
        font-size: 30px;
    }

    .card {
        border: 1px solid #C8CCD2 !important;
        border-radius: 8px !important;
    }

    .card-header {
        padding: 22px 24px 22px 24px !important;
    }

    .card-body {
        padding: 0 24px 0 24px !important;
    }

    .card-header,
    .card-body {
        border-radius: 8px !important;
        background-color: white;
        border: 0;
    }

    .label-section-faq .btn {
        font-family: 'Poppins';
        color: #2E3032 !important;
        font-weight: 500;
        font-size: 18px;

        border: 0;
        padding: 0 !important;
    }

    .sub-label-section-faq {
        font-family: 'Nunito Sans';
        color: #8C8F93;
        font-weight: 400;
        font-size: 16px;
    }

    .label-section-faq .btn:hover,
    .label-section-faq .btn:active,
    .label-section-faq .btn:focus {
        border: 0 !important;
        box-shadow: none !important;
        text-decoration: none !important;
    }

    .label-pertanyaan-lain {
        font-family: 'Poppins';
        color: #3B3D39;
        font-weight: 600;
        font-size: 18px;
    }

    .hubungi-telfon p a,
    .hubungi-email p a {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 600;
        font-size: 14px;
    }

    .hubungi-telfon span,
    .hubungi-email span {
        font-family: 'Poppins';
        color: #8C8F93;
        font-weight: 400;
        font-size: 14px;
    }

    .hubungi-telfon,
    .hubungi-email {
        background-color: #FFFFFF;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        padding: 16px;
    }


    .title-container {
        background-image: url('../../../../static/v3/Portal/assets/images/pusat-bantuan/banner.svg');
        background-size: cover;
        padding: 80px 40px;
    }

    .title-container .title {
        font-family: 'Poppins', sans-serif;
        font-size: 48px;
        font-weight: 600;
        color: #FDF7F7;
        text-align: center;
    }

    .title-container .subtitle {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #FDF7F7;
        text-align: center;
        margin-bottom: 0;
    }

    .topic-title {
        font-family: 'Poppins', sans-serif;
        font-size: 28px;
        font-weight: 600;
        color: #000;
        text-align: center;
        margin-bottom: 48px;
    }

    .topic {
        padding: 40px 60px;
    }

    .topic-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 48px;
    }

    .topic-item img {
        margin-bottom: 24px;
    }

    .topic-item p {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #000;
        text-align: center;
        margin-bottom: 0;
    }

    .footer-faq {
        background-color: #D9D9D933;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 60px 100px;
    }

    .footer-faq .title-footer {
        font-family: 'Poppins', sans-serif;
        color: #000;
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 24px;
    }
</style>
