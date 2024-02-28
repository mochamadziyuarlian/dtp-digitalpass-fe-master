<template>
    <div>
        <div class="v3">
            <div class="row">
                <div class="col-xl-6">
                    <div style="margin-bottom: 2.05rem !important;">
                        <span class="drive-dokumen-folder-name">
                            {{ $route.params.id }}
                        </span>
                    </div>
                </div>
                <div class="col-xl-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-dsa-primary btn-lg btn-add"
                        @click="$bvModal.show('Modal_AddFile')">
                        <span class="font-size-16">Tambah File</span>
                    </button>
                </div>
            </div>
            <div class="mt-3"></div>
            <div class="row" style="height: 30rem;" v-if="listFile.length === 0">
                <div class="col-xl-12 d-flex justify-content-center align-items-center mb-3 mt-3">
                    <div class="text-center">
                        <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_NOT_FOUND.svg" />
                        <p class="label-not-found">
                            Tidak Ada File Tersedia
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4" v-for="(item, index) of listFile" :key="index">
                    <div class="drive-dokumen-file">
                        <div class="card">
                            <img class="path-image" :src="item.path | handleImage">
                            <div class="delete-icon" @click="DeleteFile(item.id)">
                                <img class="w-auto" src="/icon/delete_drive_dokumen.svg" />
                            </div>
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
            <div style="padding-top: 0.8rem; margin-bottom: 24px;">
                <div class="row d-flex align-items-center">
                    <div class="col-xl-12">
                        <label class="daftar-layanan">
                            File feedback ({{ listFileFeedback.length }} file)
                        </label>
                    </div>
                </div>
                <div class="row" style="padding-top: 24px;">
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
        <b-modal id="Modal_AddFile" ref="Modal_AddFile" modal-class="modal-dsa" centered hide-footer no-close-on-esc
            no-close-on-backdrop>
            <template #modal-header>
                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                    {{ $route.params.id }}
                </label>
            </template>
            <template #default="">
                <form>
                    <div class="form-group form-dsa">
                        <label class="font-size-16 mb-3">
                            Tambahkan File
                        </label>
                        <div class="form-control-image" @dragover.prevent @drop.prevent
                            @drop="HandleFileDropUpload($event)">
                            <img src="/icon/form/upload.svg">
                            <div class="font-size-16">
                                <span class="text-dsa-secondary font-weight-400">Drag file disini, atau</span>
                                <span class="text-dsa-danger font-weight-600 cursor-pointer" @click="TriggerUpload()">
                                    pilih file</span>
                            </div>
                            <input type="file" id="trigger-upload" class="d-none" multiple
                                @change="HandleFileUpload($event)">
                        </div>
                    </div>

                    <div v-if="fileUpload.length > 0">
                        <div class="alert alert-success" role="alert" v-for="(item, index) of fileUpload" :key="index">
                            <div class="row">
                                <div class="col-xl-6 d-flex justify-content-start">
                                    {{ item.name }}
                                </div>
                                <div class="col-xl-6 d-flex justify-content-end align-self-center">
                                    <em class="fa fa-times cursor-pointer" @click="RemoveImgFile(index)"></em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;"
                                @click="CloseModalAddFile()">
                                Batal
                            </button>
                        </div>
                        <div class="col-xl-6">
                            <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;"
                                @click="CreateFileUpload()">
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </b-modal>

    </div>
</template>

<script>
import mixins from '@/plugins/mixins.js';
import {
    LIST_PRODUCT
} from '@/static/v3/Portal/constants/menu';
import moment from 'moment';

export default {
    layout: 'cms/default',
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
            },
            fileUpload: [],
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
            menu: []
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
        TriggerUpload() {
            this.$nextTick(function () {
                document.getElementById('trigger-upload').click();
            });
        },
        HandleFileUpload(event) {
            for (let x of event.target.files) {
                const convert = ((x.size / 1024) / 1024).toFixed(1); // MB
                if (convert > 25) {
                    this.swal('error', 'Ukuran file maksimal : 25.0 MB');
                    document.getElementById('trigger-upload').value = '';
                } else {
                    if (convert < 1) {
                        x.sizeFile = ((x.size / 1024)).toFixed(1);
                        x.typeSizeFile = 'KB';
                    } else {
                        x.sizeFile = convert;
                        x.typeSizeFile = 'MB';
                    }
                    this.PreviewimgFile = x.sizeFile;
                    this.fileUpload.push(x);
                }
            }
        },
        HandleFileDropUpload(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(x => {
                const convert = ((x.size / 1024) / 1024).toFixed(1); // MB
                if (convert > 25) {
                    this.swal('error', 'Ukuran file maksimal : 25.0 MB');
                    document.getElementById('trigger-upload').value = '';
                } else {
                    if (convert < 1) {
                        x.sizeFile = ((x.size / 1024)).toFixed(1);
                        x.typeSizeFile = 'KB';
                    } else {
                        x.sizeFile = convert;
                        x.typeSizeFile = 'MB';
                    }
                    this.PreviewimgFile = x.sizeFile;
                    this.fileUpload.push(x);
                }
            });
        },
        RemoveImgFile(index) {
            this.fileUpload.splice(index, 1);
        },
        CloseModalAddFile() {
            this.fileUpload = [];
            this.$bvModal.hide('Modal_AddFile');
        },
        CreateFileUpload() {
            this.fileUpload.forEach((item, index) => {
                const fd = new FormData();
                fd.append('request_id', this.$route.query.id);
                fd.append('name', item.name);
                fd.append('imgFile', item);
                fd.append('type', item.type);
                fd.append('file_type', 'lampiran');
                fd.append('service', this.$route.query.service_id);
                fd.append('created_by', this.UserLogin().id)

                this.Request('POST', '/api/v3/request-attachment/create', null, fd, 'BASIC', (
                    callback) => {
                    if (callback.code === 200) {
                        this.getListFile();

                        this.fileUpload = [];
                        document.getElementById('trigger-upload').value = '';
                        this.$refs['Modal_AddFile'].hide();
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            });
        },
        DeleteFile(id) {
            this.HelperConfirm('Drive Dokumen', 'delete').then((result) => {
                if (result.isConfirmed) {
                    const body = new FormData();
                    body.append('id', id);
                    this.Request('DELETE', '/api/v3/request-attachment/remove', null, body, 'BASIC', (
                        callback) => {
                        if (callback.code === 200) {
                            this.getListFile();
                            this.Data.FileSelected = [];
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });
                };
            });
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
    font-size: 30px;
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

.drive-dokumen-file .delete-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer !important;
}

.label-not-found {
    font-family: 'Poppins';
    color: #151718;
    font-weight: 600;
    font-size: 24px;

    margin-top: 24px;
    margin-bottom: 24px;
}

#Modal_AddFile___BV_modal_outer_ /deep/ .modal .modal-content,
#Modal_ShareFile___BV_modal_outer_ /deep/ .modal .modal-content {
    padding: 24px;
}

#Modal_AddFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-header,
#Modal_ShareFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-header {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
}

#Modal_AddFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-body,
#Modal_ShareFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-body {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
}

.btn-add {
    height: 48px;
    background: #ED2B24;
    border-radius: 4px;
}
</style>
