<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.heading.$error }">
                        Judul Laporan<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Judul Laporan"
                        :class="{ 'is-invalid': $v.Form.heading.$error }" v-model.trim="$v.Form.heading.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.heading.required">
                            Judul Laporan tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': Form.imgFile === null }">
                        Gambar Laporan<span class="required">*</span>
                    </label>
                    <div class="form-control-image" @dragover.prevent @drop.prevent @drop="HandleFileDropUploadImage($event)">
                        <img src="/icon/form/upload.svg">
                        <div class="font-size-16">
                            <span class="text-dsa-secondary font-weight-400">Drag file disini, atau</span>
                            <span class="text-dsa-danger font-weight-600 cursor-pointer" @click="TriggerUploadImage()">
                                pilih file
                            </span>
                        </div>
                        <input type="file" class="d-none" id="trigger-upload-image" accept=".jpg,.jpeg,.png"
                            @change="HandleFileUploadImage($event)">
                    </div>
                    <span class="notes-upload" v-if="Form.imgFile !== null">
                        Jenis file yang diizinkan : .Jpeg, .Jpg, .Png (Maksimal 5,0 MB)
                    </span>
                </div>

                <div class="form-group form-dsa" v-if="imgPreview.image !== null">
                    <div class="card preview-image">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <img :src="imgPreview.image" alt="">
                                </div>
                                <div class="col align-self-center">
                                    <p class="font-size-16 font-weight-400 text-dsa-success mb-0">
                                        {{ imgPreview.name }}
                                    </p>
                                    <p class="font-size-14 font-weight-400 text-dsa-secondary mb-0">
                                        {{ imgPreview.size | formatFile }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': Form.reportFile === null }">
                        Lampiran<span class="required">*</span>
                    </label>
                    <div class="form-control-image" @dragover.prevent @drop.prevent @drop="HandleFileDropUploadFile($event)">
                        <img src="/icon/form/upload.svg">
                        <div class="font-size-16">
                            <span class="text-dsa-secondary font-weight-400">Drag file disini, atau</span>
                            <span class="text-dsa-danger font-weight-600 cursor-pointer" @click="TriggerUploadFile()">
                                pilih file
                            </span>
                        </div>
                        <input type="file" class="d-none" id="trigger-upload-file" accept=".pdf"
                            @change="HandleFileUploadFile($event)">
                    </div>
                    <span class="notes-upload" v-if="Form.reportFile !== null">
                        Jenis file yang diizinkan : .Pdf (Maksimal 10,0 MB)
                    </span>
                </div>


                <div class="form-group form-dsa" v-if="pdfPreview.file !== null">
                    <div class="card preview-file">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <iframe :src="pdfPreview.file"></iframe>
                                </div>
                                <div class="col align-self-center">
                                    <p class="font-size-16 font-weight-400 text-dsa-success mb-0">
                                        {{ pdfPreview.name }}
                                    </p>
                                    <p class="font-size-14 font-weight-400 text-dsa-secondary mb-0">
                                        {{ pdfPreview.size | formatFile }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.content.$error }">
                        Konten<span class="required">*</span>
                    </label>
                    <no-ssr>
                        <vue-editor :class="{ 'is-invalid is-invalid-vue-editor': $v.Form.content.$error }"
                            v-model.trim="$v.Form.content.$model"></vue-editor>
                    </no-ssr>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.content.required">
                            Konten tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <div>
                        <label :class="{ 'text-dsa-danger': $v.Form.status.$error }">
                            Status<span class="required">*</span>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="publish" value="1"
                            v-model="$v.Form.status.$model">
                        <label class="form-check-label" for="publish">Publish</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="draft" value="0"
                            v-model="$v.Form.status.$model">
                        <label class="form-check-label" for="draft">Not Publish</label>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-laporan" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="UpdateLaporan()">
                        <span class="font-size-16 font-weight-600">
                            Submit
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required
    } from 'vuelidate/lib/validators';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Laporan',
                Form: {
                    heading: null,
                    content: null,
                    status: null,
                    imgFile: '',
                    reportFile: '',
                },
                User: {},
                imgPreview: {
                    name: null,
                    size: null,
                    image: null
                },
                pdfPreview: {
                    name: null,
                    size: null,
                    file: null
                }
            }
        },
        validations: {
            Form: {
                heading: {
                    required
                },
                content: {
                    required
                },
                status: {
                    required
                },
                imgFile: {
                    required
                },
                reportFile: {
                    required
                },
            },
        },
        filters: {
            formatFile(bytes) {
                if (bytes !== null) {
                    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                    if (bytes == 0) return '0 Byte';
                    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
                } else {
                    return '0 KB';
                }
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Kelola Laporan',
                menu: []
            }]);
            this.User = this.UserLogin();
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                let _this = this;
                this.Request('GET', '/api/v3/laporan/' + id.id, null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        for (let x of callback.content) {
                            this.Form.heading = x.heading;
                            this.Form.content = x.content;
                            this.Form.status = x.status;

                            this.imgPreview = {
                                name: x.thumbnail_name,
                                size: x.thumbnail_size,
                                image: x.thumbnail
                            };

                            this.pdfPreview = {
                                name: x.file_name,
                                size: x.file_size,
                                file: x.file
                            };

                            fetch(`${x.thumbnail}`).then(function (response) {
                                return response.blob();
                            }).then(function (blob) {
                                let file = new File([blob], x.thumbnail_name, {
                                    type: x.thumbnail_type,
                                    lastModified: Date.now()
                                });
                                _this.Form.imgFile = file;
                            });

                            fetch(`${x.file}`).then(function (response) {
                                return response.blob();
                            }).then(function (blob) {
                                let file = new File([blob], x.file_name, {
                                    type: x.file_type,
                                    lastModified: Date.now()
                                });
                                _this.Form.reportFile = file;
                            });

                        }
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            HandleFileUploadImage(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const filesize = ((file.size / 1024) / 1024).toFixed(4); // MB
                    if (filesize > 5) {
                        this.HelperErrorUploadFile(5);
                        this.HandleResetValueImage();
                    } else {
                        this.Form.imgFile = file;
                        this.imgPreview = {
                            name: file.name,
                            size: file.size,
                            image: URL.createObjectURL(file)
                        };
                    }
                } else {
                    this.HandleResetValueImage();
                }
            },
            HandleFileDropUploadImage(e) {
                let droppedFiles = e.dataTransfer.files;
                if (!droppedFiles) return;
                ([...droppedFiles]).forEach(file => {
                    const filesize = ((file.size / 1024) / 1024).toFixed(4); // MB
                    if (filesize > 5) {
                        this.HelperErrorUploadFile(5);
                        this.HandleResetValueImage();
                    } else {
                        console.log(file)
                        this.Form.imgFile = file;
                        this.imgPreview = {
                            name: file.name,
                            size: file.size,
                            image: URL.createObjectURL(file)
                        };
                    }
                });
            },
            HandleFileUploadFile(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const filesize = ((file.size / 1024) / 1024).toFixed(4); // MB
                    if (filesize > 10) {
                        this.HelperErrorUploadFile(10);
                        this.HandleResetValueFile();
                    } else {
                        this.Form.reportFile = file;
                        this.pdfPreview = {
                            name: file.name,
                            size: file.size,
                            file: URL.createObjectURL(file)
                        };
                    }
                } else {
                    this.HandleResetValueFile();
                }
            },
            HandleFileDropUploadFile(e) {
                let droppedFiles = e.dataTransfer.files;
                if (!droppedFiles) return;
                ([...droppedFiles]).forEach(file => {
                    const filesize = ((file.size / 1024) / 1024).toFixed(4); // MB
                    if (filesize > 10) {
                        this.HelperErrorUploadFile(10);
                        this.HandleResetValueFile();
                    } else {
                        this.Form.reportFile = file;
                        this.pdfPreview = {
                            name: file.name,
                            size: file.size,
                            file: URL.createObjectURL(file)
                        };
                    }
                });
            },
            HandleResetValueImage() {
                document.getElementById('trigger-upload-image').value = '';
                this.Form.imgFile = null;
                this.imgPreview = {
                    name: null,
                    size: null,
                    image: null
                };
            },
            HandleResetValueFile() {
                document.getElementById('trigger-upload-file').value = '';
                this.Form.reportFile = null;
                this.pdfPreview = {
                    name: null,
                    size: null,
                    file: null
                };
            },
            UpdateLaporan() {
                this.HelperConfirm(this.module, 'update').then((result) => {
                    if (result.isConfirmed) {
                        const body = new FormData();
                        body.append('id', this.$route.params.id);
                        body.append('heading', this.Form.heading);
                        body.append('content', this.Form.content);
                        body.append('imgFile', this.Form.imgFile);
                        body.append('imgFile2', this.Form.reportFile);
                        body.append('status', this.Form.status);
                        body.append('publish_by', this.User.id);
                        this.Request('PUT', '/api/v3/laporan/update', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'update').then((result) => {
                                    if (result.isConfirmed) {
                                        this.$router.back();
                                    }
                                });
                            } else {
                                this.HelperErrorCode(callback);
                            };
                        });
                    };
                });
            },
            TriggerUploadImage() {
                this.$nextTick(function () {
                    document.getElementById('trigger-upload-image').click();
                });
            },
            TriggerUploadFile() {
                this.$nextTick(function () {
                    document.getElementById('trigger-upload-file').click();
                });
            },
        }
    }

</script>

<style scoped>
    /* Quill Editor */
    ::v-deep .quillWrapper {
        background-color: white;
        box-shadow: 10px 24px 30px rgb(138 138 138 / 2%);
        border-radius: 4px;
    }

    ::v-deep .ql-toolbar.ql-snow {
        border: 0;
        border-bottom: 1px solid #C4C4C4;
        margin-left: 24px;
        margin-right: 24px;

        padding-bottom: 15px !important;
        padding-top: 15px !important;
    }

    ::v-deep .ql-container {
        border: 0 !important;
    }

    ::v-deep .ql-container.ql-snow {
        margin-left: 9px;
        margin-right: 9px;

        height: 320px !important;
    }

</style>
