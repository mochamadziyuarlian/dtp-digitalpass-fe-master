<template>
    <div class="container-fluid">
        <div class="mb-4">
            <nuxt-link :to="`/profile/drive-dokumen/${this.$route.params.id}`" class="font-size-18 font-weight-400"
                style="color: #8C8F93;">
                Drive Dokumen
            </nuxt-link>
            <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="#E42313" stroke-width="2.08" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>
            <label class="font-size-18 font-weight-600" style="color: #2E3032;">
                {{ Data.FolderName }}
            </label>
        </div>
        <div class="mb-3">
            <label class="font-size-24 font-weight-600" style="color: #262829;">
                {{ Data.FolderName }}
            </label>
        </div>
        <div class="row">
            <div class="col-xl-3" v-for="(item, index) of Data.ListFile.content" :key="index">
                <div class="card mb-4"
                    style="border: 1px solid #D9DDE3; border-radius: 10px; background-color: #FFFFFF;">
                    <div v-if="item.file_type === 'png' || item.file_type === 'jpg' || item.file_type === 'jpeg'">
                        <img class="card-img-top" :src="item.path" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'csv'">
                         <img class="card-img-top" src="https://i.ibb.co/ZJvK3Ym/csv.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'pdf'">
                         <img class="card-img-top" src="https://i.ibb.co/1nj6HVV/pdf.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'zip'">
                         <img class="card-img-top" src="https://i.ibb.co/tJhyx7C/zip.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'apk'">
                         <img class="card-img-top" src="https://i.ibb.co/1XbPCNH/apk.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'doc'">
                         <img class="card-img-top" src="https://i.ibb.co/RvFXb0j/doc.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'xlsx'">
                         <img class="card-img-top" src="https://i.ibb.co/N3B5nm8/excel.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'json'">
                         <img class="card-img-top" src="https://i.ibb.co/bX9TNct/json.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="col">
                                <p class="font-size-18 font-weight-700 mb-0" style="color: #262829;">
                                    attachment.{{item.file_type}}
                                </p>
                                <span class="font-size-16 font-weight-400" style="color: #5C5E61;">
                                    {{ item.file_size | formatFile }}
                                </span>
                            </div>
                            <div class="col-auto d-flex justifyy-content-end align-self-center">
                                <a :href="item.path" target="_blank">
                                    <i class="cursor-pointer">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20 14.9707V18.5263C20 18.9977 19.8127 19.4499 19.4793 19.7833C19.1459 20.1167 18.6937 20.304 18.2222 20.304H5.77777C5.30628 20.304 4.8541 20.1167 4.5207 19.7833C4.1873 19.4499 4 18.9977 4 18.5263V14.9707"
                                                stroke="#E42313" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M7.55554 10.5261L12 14.9706L16.4444 10.5261" stroke="#E42313"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 14.9706V4.30396" stroke="#E42313" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </i>
                                </a>
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
    import Cookies from 'js-cookie';

    export default {
        layout: 'portal/profile',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    ListFolder: {
                        content: [],
                        meta: {}
                    },
                    ListFile: {
                        content: [],
                        meta: {}
                    },
                    FolderName: null,
                    Service: null,
                    ReturnAPI: []
                },
                typeShare: null
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY')
                } else {
                    return '-';
                }
            },
            formatFile(bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
        },
        mounted() {
            this.GetFolder(this.$route.params);
        },
        methods: {
            GetFolder(id) {
                this.Data.ListFolder.content = [];
                this.Request('GET', '/api/portal/drive/' + id.id, null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        const getFile = callback.content.filter(x => {
                            return x.id === this.$route.query.id;
                        });
                        this.Data.FolderName = getFile[0].product_name;
                        this.Data.Service = getFile[0].service_name;
                        this.Data.ListFile.content = getFile[0].file;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
        }
    }

</script>

<style scoped>

</style>
