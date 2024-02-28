<template>
    <div>
        <div class="mb-4">
            <div class="h4">
                <label>Inputan Form</label>
            </div>
            <div class="form-group form-dsa">
                <label>
                    Judul Pertanyaan<span class="required">*</span>
                </label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group form-dsa">
                <label>
                    Gambar<span class="required">*</span>
                </label>
                <div class="form-control-image">
                    <img src="/icon/form/upload.svg">
                    <div class="font-size-16">
                        <span class="text-dsa-secondary font-weight-400">Drag file disini, atau</span>
                        <span class="text-dsa-danger font-weight-600 cursor-pointer" @click="TriggerUpload()"> pilih
                            file</span>
                    </div>
                    <input type="file" class="d-none" id="trigger-upload">
                </div>
            </div>
            <div class="form-group form-dsa">
                <label>
                    Jawab Pertanyaan<span class="required">*</span>
                </label>
                <vue-editor></vue-editor>
            </div>
            <div class="form-group form-dsa">
                <div>
                    <label>
                        Status<span class="required">*</span>
                    </label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="publish" value="1">
                    <label class="form-check-label" for="publish">1</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="draft" value="0">
                    <label class="form-check-label" for="draft">2</label>
                </div>

            </div>
        </div>

        <br>
        <br>
        <br>

        <div class="mb-4">
            <div class="h4">
                <label>Filter Form</label>
            </div>

            <div class="form-group form-dsa">
                <select class="form-control filter">
                    <option value="1">value</option>
                    <option value="1">value</option>
                    <option value="1">value</option>
                </select>
            </div>
            <div class="form-group form-dsa">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <img src="/icon/form/search.svg">
                        </div>
                    </div>
                    <input type="text" class="form-control filter" placeholder="Cari Nama Produk">
                </div>
            </div>
            <div class="form-group form-dsa">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <img src="/icon/form/calendar.svg">
                        </div>
                    </div>
                    <input type="date" class="form-control filter" placeholder="Cari Nama Produk">
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>

        <div class="mb-4">
            <div class="h4">
                <label>Button</label>
            </div>
            <button type="button" class="btn btn-dsa-primary">
                Tambah
            </button>
            <button type="button" class="btn btn-dsa-warning">
                Warning
            </button>
            <button type="button" class="btn btn-dsa-light">
                Light
            </button>
            <button type="button" class="btn btn-dsa-success">
                Success
            </button>
            <button type="button" class="btn btn-dsa-outline-primary">
                Outline Primary
            </button>
        </div>

        <br>
        <br>
        <br>

        <div class="mb-4">
            <div class="h4">
                <label>Badge</label>
            </div>

            <span class="badge badge-dsa-success">Badge Success</span>
            <span class="badge badge-dsa-warning">Badge Warning</span>
        </div>

        <br>
        <br>
        <br>

        <div class="mb-4">
            <div class="h4">
                <label>Base card</label>
            </div>

            <div class="row">
                <div class="col-xl-9">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Sample Card
                            </label>
                        </div>
                        <div class="card" style="height: 447px;">
                            <div class="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>

        <div class="mb-4">
            <div class="h4">
                <label>Modal</label>
            </div>

            <div class="row">
                <div class="col-xl-9">
                    <div class="card-base">
                        <button type="button" class="btn btn-dsa-primary" @click="$bvModal.show('ModalAddFile')">
                            Modal
                        </button>

                        <b-modal id="ModalAddFile" class="px-3" centered hide-footer>
                            <template #modal-header>
                                <label class="text-dsa-black font-size-18 font-weight-600 mb-0">
                                    Nama Folder
                                </label>
                            </template>
                            <template #default="{ close }">
                                <form>
                                    <div class="form-group form-dsa">
                                        <label class="font-size-16 font-weight-600 text-dsa-black">
                                            Tambahkan File
                                        </label>
                                        <div class="form-control-image">
                                            <img src="/icon/form/upload.svg">
                                            <div class="font-size-16">
                                                <span class="text-dsa-secondary font-weight-400">Drag file disini,
                                                    atau</span>
                                                <span class="text-dsa-danger font-weight-600 cursor-pointer"
                                                    @click="TriggerUpload()">
                                                    pilih file</span>
                                            </div>
                                            <input type="file" class="d-none" id="trigger-upload">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-6">
                                            <button type="button" class="btn btn-dsa-outline-primary w-100"
                                                style="height: 48px;" @click="close()">
                                                Batal
                                            </button>
                                        </div>
                                        <div class="col-xl-6">
                                            <button type="button" class="btn btn-dsa-primary w-100"
                                                style="height: 48px;">
                                                Bagikan
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </template>
                        </b-modal>

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        layout: 'cms/default',
        methods: {
            TriggerUpload() {
                this.$nextTick(function () {
                    document.getElementById('trigger-upload').click();
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

    

    #ModalAddFile___BV_modal_outer_ /deep/ .modal .modal-content {
        padding: 24px;
    }

    #ModalAddFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-header {
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
    }

    #ModalAddFile___BV_modal_outer_ /deep/ .modal .modal-content .modal-body {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
    }

</style>
