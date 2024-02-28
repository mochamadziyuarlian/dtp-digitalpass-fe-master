<template>
    <div>
        <div class="section-container">
            <div style="margin-bottom: 2.05rem !important;">
                <span class="drive-dokumen-folder-name">
                    {{ $route.params.id }}
                </span>
            </div>
            <hr class="v3" />
            <div style="padding-bottom: 0.7rem;">
                <!-- <div class="row" v-if="listFolder.length === 0">
                    <div class="col-xl-4 mb-3" v-for="(item, index) of new Array(6)" :key="index">
                        <b-skeleton animation="wave" height="72px"></b-skeleton>
                    </div>
                </div> -->
                <div class="row" style="height: 30rem;" v-if="listFolder.length === 0">
                    <div class="col-xl-12 d-flex justify-content-center align-items-center mb-3 mt-3">
                        <div class="text-center">
                            <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_NOT_FOUND.svg" />
                            <p class="label-not-found">
                                Tidak Ada Folder Tersedia
                            </p>
                            <button type="button" class="btn btn-v3-dsa-primary m-auto"
                                @click="$router.push('/user/monitoring/pengajuan-layanan/pengajuan')">
                                <img src="/v3/Portal/assets/icon/ICON_ADD.svg">
                                <span class="ml-2">Ajukan Layanan</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 c-pointer" v-for="(item, index) of listFolder" :key="index">
                        <nuxt-link
                            :to="'/user/monitoring/drive-dokumen/folder/file/' + item.product_name + '?id=' + item.id + '&service=' + $route.params.id + '&product=' + $route.query.product">
                            <div class="drive-dokumen-folder">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto">
                                        <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_FOLDER.svg">
                                    </div>
                                    <div class="col">
                                        <span>
                                            {{ item.product_name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        LIST_PRODUCT
    } from '@/static/v3/Portal/constants/menu';

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                listProduct: [],
                listFolder: [],
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Drive Dokumen',
                titleURL: '/user/monitoring/drive-dokumen',
                menu: [{
                    menuTitle: this.$route.params.id,
                    menuURL: null
                }]
            }]);
        },
        mounted() {
            this.listProduct = LIST_PRODUCT
            this.getListFolder()
        },
        methods: {
            getListFolder() {
                if(this.$route.query.product !== 'null') {
                    const params = {
                        service: this.$route.params.id,
                        userId: this.UserLogin().id,
                        productId: this.$route.query.product
                    }
                    this.Request('GET', '/api/v3/drive-request', params, null, 'BEARER', (res) => {
                        if (res.code === 200) {
                            this.listFolder = res.content
                        }
                    })
                }
            }
        }
    }

</script>

<style scoped>
    .daftar-layanan {
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 18px;
        color: #000000;
    }

    .drive-dokumen-folder-name {
        font-family: 'Poppins';
        color: #2E3032;
        font-weight: 600;
        font-size: 24px;
    }

    .drive-dokumen-folder {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 500;
        font-size: 18px;

        background-color: #FFFFFF;
        border: 1px solid #F2F4F6;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
        cursor: pointer;
    }

    .label-not-found {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 600;
        font-size: 24px;

        margin-top: 24px;
        margin-bottom: 24px;
    }

</style>
