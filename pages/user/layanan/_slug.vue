<template>
    <div>
        <div class="section-container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="information">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <div class="padding">
                                            <p class="information-title">
                                                {{ Information.setTypeInformation.service_name }}
                                            </p>
                                            <p class="information-desc">
                                                {{ Information.setTypeInformation.banner_text }}
                                            </p>
                                            <button type="button" class="btn btn-v3-dsa-primary btn-information"
                                                @click="handleRedirectService(Information.setTypeInformation.slug)">
                                                <img src="/v3/Portal/assets/icon/ICON_ADD.svg">
                                                Ajukan Layanan
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <img src="/v3/Portal/assets/icon/PENGAJUAN_ILUSTRATION_INFORMATION.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="section-layanan">
                        <p class="title">
                            PROSES KAMI
                        </p>
                        <div class="detail-layanan">
                            <p class="prosedur">Prosedur yang kami lakukan saat</p>
                            <p class="prosedur-layanan-name">
                                {{ Information.setTypeInformation.service_name }}
                            </p>
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="prosedur-layanan-list" v-for="(item, index) of Data.listProcedure"
                                        :key="index" :class="isSelectedProcedure === index ? 'active' : ''"
                                        @click="onClickProcedure(item, index)">
                                        <p class="prosedur-title">
                                            {{ item.prosedur_title }}
                                        </p>
                                        <span class="prosedur-desc">
                                            {{ item.prosedur_desc }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-xl-6 d-flex align-items-center">
                                    <img :src="Data.imageProcedure" />
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
    import {
        SERVICES
    } from '@/static/v3/Portal/constants/menu'

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    listProcedure: [],
                    imageProcedure: null,
                    detailService: null
                },
                Information: {
                    setTypeInformation: []
                },
                isSelectedProcedure: 0
            }
        },
        filters: {},
        watch: {},
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: SERVICES.filter(x => x.slug === this.$route.params.slug)[0].service_name,
                titleURL: null,
                menu: []
            }]);
        },
        async mounted() {
            this.getListService()

            let getResponseInformation = SERVICES.find((x) => {
                return x.slug === this.$route.params.slug
            })
            if (getResponseInformation !== undefined) {
                this.Information.setTypeInformation = getResponseInformation
                this.Data.listProcedure = getResponseInformation.prosedur
                this.Data.imageProcedure = this.Data.listProcedure[0].image
            }
        },
        methods: {
            getListService() {
                this.Request('GET', '/api/v3/service', null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        let getServiceID = res.content.find((x) => {
                            return x.slug === this.$route.params.slug
                        })
                        this.Data.detailService = getServiceID
                    }
                });
            },
            handleRedirectService(slug) {
                this.$store.commit('setIsHasService', true)
                this.$store.commit('setServiceValue', {
                    id: this.Data.detailService.id,
                    name: this.Information.setTypeInformation.service_name,
                    desc_text: this.Information.setTypeInformation.desc_text,
                    slug: this.Information.setTypeInformation.slug
                })
                this.$router.push('/user/monitoring/pengajuan-layanan/pengajuan')
            },
            onClickProcedure(item, index) {
                this.Data.imageProcedure = item.image
                this.isSelectedProcedure = index
            }
        }
    }

</script>

<style scoped>
    .information {
        height: auto;
        margin-bottom: 40px;
    }

    .information .padding {
        padding: 24px;
    }

    .information .card {
        background: #FFFFFF;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        border: 0 solid transparent !important;
    }

    .information .card-body {
        padding: 0;
    }

    .information .btn-information {
        font-family: 'Nunito Sans';
        font-weight: 700;
        font-size: 18px;
        color: #FFFFFF;
        padding: 0.75rem 1.5rem 0.75rem 1rem;

        height: 55px;
    }

    .information .btn-information img {
        margin-right: 8px;
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
        font-family: 'Nunito Sans';
        font-weight: 400;
        font-size: 16px;
        color: #8C8F93;

        margin-bottom: 24px;
    }

    .section-layanan {
        margin-bottom: 16px;
    }

    .section-layanan .title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 16px;
        color: #61676D;

        margin-bottom: 16px;
        text-transform: uppercase !important;
    }

    .detail-layanan .prosedur,
    .prosedur-layanan-name {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 32px;
        color: #262B31;
    }

    .detail-layanan .prosedur {
        margin-bottom: 0;
    }

    .detail-layanan .prosedur-layanan-name {
        margin-bottom: 24px;
    }

    .prosedur-layanan-list {
        margin-bottom: 16px;
        cursor: pointer;
    }

    .prosedur-layanan-list.active {
        border-left: 8px solid #E42313;
        padding-left: 16px;
    }

    .prosedur-layanan-list .prosedur-title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 24px;
        color: #262B31;

        margin-bottom: 4px;
    }

    .prosedur-layanan-list .prosedur-desc {
        font-family: 'Nunito Sans';
        font-weight: 600;
        font-size: 16px;
        color: #8C8F93;
    }

</style>
