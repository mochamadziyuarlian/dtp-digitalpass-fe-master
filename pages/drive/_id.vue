<template>
    <div class="" style="margin-top: 6rem;margin-bottom: 6rem;">
        <div class="container-fluid">
            <p class="text-gray-main font-size-24 font-weight-700 mb-5">
                Drive Dokumen
            </p>
            <div class="row">
                <div class="col-xl-3" v-if="typeShare === 'folder'">
                    <div class="card">
                        <div class="card-body">
                            <div class="" style="height: 40rem; max-height: 40rem; overflow: auto;">
                                <div class="col-12 px-0" v-for="(item, index) of Data.ListFolder.content" :key="index">
                                    <div @click="GetFile(item)" style="color: #858796;">
                                        <div class="card folder">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-auto">
                                                        <em class="fa fa-folder font-size-24 cursor-pointer"></em>
                                                    </div>
                                                    <div class="col d-flex align-self-center">
                                                        <label class="mb-0 text-capitalize cursor-pointer">
                                                            {{ item.product_name }}
                                                        </label>
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
                <div class="col-xl-9">
                    <div class="row mb-4">
                        <div class="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h4 class="text-black">
                                {{ Data.FolderName }}
                            </h4>
                            <p>
                                {{ Data.Service }}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12"
                            v-for="(item, index) of Data.ListFile.content" :key="index">
                            <div class="card mb-4">
                                <img v-if="item.file_type === 'csv'" class="card-img-top"
                                    src="https://i.ibb.co/ZJvK3Ym/csv.png" alt="csv">
                                <img v-if="item.file_type === 'pdf'" class="card-img-top"
                                    src="https://i.ibb.co/1nj6HVV/pdf.png" alt="pdf">
                                <img v-if="item.file_type === 'zip'" class="card-img-top"
                                    src="https://i.ibb.co/tJhyx7C/zip.png" alt="zip">
                                <img v-if="item.file_type === 'apk'" class="card-img-top"
                                    src="https://i.ibb.co/1XbPCNH/apk.png" alt="apk">
                                <img v-if="item.file_type === 'doc' || item.file_type === 'docx'" class="card-img-top"
                                    src="https://i.ibb.co/RvFXb0j/doc.png" alt="doc">
                                <img v-if="item.file_type === 'xlsx'" class="card-img-top"
                                    src="https://i.ibb.co/N3B5nm8/excel.png" alt="excel">
                                <img v-if="item.file_type === 'json'" class="card-img-top"
                                    src="https://i.ibb.co/bX9TNct/json.png" alt="json">
                                <img v-if="item.file_type === 'png' || item.file_type === 'jpg' || item.file_type === 'jpeg'"
                                    class="card-img-top" :src="item.path" alt="Image"
                                    style="height: 167px; object-fit: cover;">

                                <div class="card-body">
                                    <a :href="item.path" target="_blank">
                                        <h6 class="card-title mb-1">
                                            Download
                                        </h6>
                                    </a>
                                    <p class="card-text mb-0">
                                        {{ item.file_size | formatFile }}

                                    </p>
                                    <p class="card-text">
                                        Dibuat {{ item.created_at | formatDate}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="ml-3" v-if="Data.ListFile.content.length === 0">
                            <label>Tidak ada file</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';

    export default {
        layout: 'portal/without-footer',
        mixins: [mixins],
        data() {
            return {
                module: 'Drive Dokumen',
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
                this.Request('GET', '/api/portal/drive/' + id.id, null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        const type = callback.content.map(x => {
                            return x.type;
                        });
                        this.typeShare = type[0];
                        if (type[0] === 'folder') {
                            this.Data.ListFolder.content = callback.content;
                        } else {
                            this.Data.ListFile.content = callback.content;
                        }

                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetFile(item) {
                this.Data.FolderName = item.product_name;
                this.Data.Service = item.service_name;
                this.Data.ListFile.content = item.file;

            }
        }
    }

</script>

<style scoped>
    .card.folder .card-body {
        padding: 0.75rem !important;
    }

    .card.folder {
        border: 0 !important;
    }

    .form-control:focus {
        box-shadow: unset !important
    }

</style>
