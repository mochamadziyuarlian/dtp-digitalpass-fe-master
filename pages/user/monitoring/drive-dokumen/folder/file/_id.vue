<template>
    <div>
        <div class="section-container">
            <div style="margin-bottom: 2.05rem !important;">
                <span class="drive-dokumen-folder-name">
                    {{ $route.params.id }}
                </span>
            </div>
            <hr class="v3" />
            <div>
                <div style="padding-top: 0.8rem; margin-bottom: 24px;">
                    <div class="row d-flex align-items-center">
                        <div class="col-xl-12">
                            <label class="daftar-layanan">
                                File yang diajukan ({{ listFile.length }} file)
                            </label>
                        </div>
                    </div>
                </div>
                <!-- <div class="row" v-if="listFile.length === 0">
                    <div class="col-xl-4 mb-3" v-for="(item, index) of new Array(6)" :key="index">
                        <b-skeleton animation="wave" height="200px"></b-skeleton>
                    </div>
                </div> -->
                <div class="row" style="height: 30rem;" v-if="listFile.length === 0">
                    <div class="col-xl-12 d-flex justify-content-center align-items-center mb-3 mt-3">
                        <div class="text-center">
                            <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_NOT_FOUND.svg" />
                            <p class="label-not-found">
                                Tidak Ada File Tersedia
                            </p>
                            <button type="button" class="btn btn-v3-dsa-primary m-auto"
                                @click="$router.push('/user/layanan/pengajuan')">
                                <img src="/v3/Portal/assets/icon/ICON_ADD.svg">
                                <span class="ml-2">Ajukan Layanan</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4" v-for="(item, index) of listFile" :key="index">
                        <div class="drive-dokumen-file">
                            <div class="card">
                                <img class="path-image" :src="item.path | handleImage">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <p class="mb-0">
                                                {{ item.file_name.slice(0, 20) }} ...
                                            </p>
                                            <span class="card-text">{{ item.file_size | formatFile }}</span>
                                        </div>
                                        <div class="col d-flex justify-content-end">
                                            <a :href="item.path" target="_blank" class="cursor-pointer">
                                                <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_DOWNLOAD.svg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style="padding-top: 0.8rem; margin-bottom: 24px;">
                    <div class="row d-flex align-items-center">
                        <div class="col-xl-12">
                            <label class="daftar-layanan">
                                File feedback ({{ listFileFeedback.length }} file)
                            </label>
                        </div>
                    </div>
                </div>
                <!-- <div class="row" v-if="listFileFeedback.length === 0">
                    <div class="col-xl-4 mb-3" v-for="(item, index) of new Array(6)" :key="index">
                        <b-skeleton animation="wave" height="200px"></b-skeleton>
                    </div>
                </div> -->
                <div class="row" style="height: 30rem;" v-if="listFileFeedback.length === 0">
                    <div class="col-xl-12 d-flex justify-content-center align-items-center mb-3 mt-3">
                        <div class="text-center">
                            <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_NOT_FOUND.svg" />
                            <p class="label-not-found">
                                Tidak Ada File Feedback Tersedia
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4" v-for="(item, index) of listFileFeedback" :key="index">
                        <div class="drive-dokumen-file">
                            <div class="card">
                                <img class="path-image" :src="item.path | handleImage">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <p class="mb-0">
                                                {{ item.file_name.slice(0, 20) }} ...
                                            </p>
                                            <span class="card-text">{{ item.file_size | formatFile }}</span>
                                        </div>
                                        <div class="col d-flex justify-content-end">
                                            <a :href="item.path" target="_blank" class="cursor-pointer">
                                                <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_DOWNLOAD.svg" />
                                            </a>
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
import {
    LIST_PRODUCT
} from '@/static/v3/Portal/constants/menu';
import moment from 'moment';

export default {
    layout: 'v3/Portal/default',
    mixins: [mixins],
    data() {
        return {
            listProduct: [],
            listFile: [],
            listFileFeedback: [],
            isShowProduct: false,
            productSelected: 'Agree Market',
            isShowFilter: {
                Product: {
                    isOpen: false,
                    selected: 'Agree Market'
                },
            }
        }
    },
    filters: {
        formatFile(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },
        handleImage(typeFile) {
            if (typeFile === 'pdf' || typeFile === 'apk') {
                return '/image/bg-grid-paper.jpg'
            }
        }
    },
    created() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Drive Dokumen',
            titleURL: '/user/monitoring/drive-dokumen',
            menu: [{
                menuTitle: this.$route.query.service,
                menuURL: '/user/monitoring/drive-dokumen/folder/' + this.$route.query.service + '?product=' + this.$route.query.product
            },
            {
                menuTitle: this.$route.params.id,
                menuURL: null
            }
            ]
        }]);
    },
    mounted() {
        this.listProduct = LIST_PRODUCT
        this.getListFile()
        this.getListFileFeedback()
    },
    methods: {
        getListFile() {
            this.Request('GET', '/api/v3/drive-request/' + this.$route.query.id, null, null, 'BEARER', (res) => {
                if (res.code === 200) {
                    let file = res.content.map((item, index) => {
                        return {
                            created_at: moment(String(item.created_at)).format('DD MMMM YYYY'),
                            file_size: item.file_size,
                            file_type: item.file_type,
                            id: item.id,
                            file_name: item.path.split('/').pop(),
                            path: item.path,
                            type: item.type
                        }
                    });
                    this.listFile = file;
                }
            })
        },
        getListFileFeedback() {
            this.Request('GET', '/api/v3/request/' + this.$route.query.id, null, null, 'BASIC', (res) => {
                if (res.code === 200) {
                    let file = res.content[0].report.map((item, index) => {
                        return {
                            created_at: moment(String(item.created_at)).format('DD MMMM YYYY'),
                            file_size: item.file_size ? item.file_size : 0,
                            file_type: item.file_type,
                            id: item.id,
                            file_name: item.path.split('/').pop(),
                            path: item.path,
                            type: item.type
                        }
                    });
                    this.listFileFeedback = file;
                }
            })
        },
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

.drive-dokumen-file {
    margin-bottom: 24px;
}

.drive-dokumen-file .card {
    border: 1px solid #D9DDE3 !important;
    border-radius: 8px !important;
}

.drive-dokumen-file .path-image {
    border-radius: 8px !important;
    cursor: pointer;
    object-fit: cover;
    height: 150px;
}

.drive-dokumen-file p {
    font-family: 'Nunito Sans';
    color: #262829;
    font-weight: 700;
    font-size: 18px;
}

.drive-dokumen-file span {
    font-family: 'Nunito Sans';
    color: #5C5E61;
    font-weight: 400;
    font-size: 16px;
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
