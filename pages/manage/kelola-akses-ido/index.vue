<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-4">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg" />
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Kelola Akses IDO"
                            @keyup="GetDataRequestAccess()" v-model="Filter.search" />
                    </div>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.searchBy">
                        <option value="nama">Nama</option>
                        <option value="nik">NIK</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-6 d-flex justify-content-end">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.status">
                        <option value="0">Status Akses IDO</option>
                        <option value="1">Tidak Memiliki Akses</option>
                        <option value="2">Mengajukan Akses</option>
                        <option value="3">Memiliki Akses</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row mb-4 d-none">
            <div class="col-auto">
                <button type="button" class="btn btn-dsa-primary btn-lg mr-2">
                    <span class="font-size-16 font-weight-600">
                        Terima
                    </span>
                </button>
                <button type="button" class="btn btn-dsa-outline-white btn-lg mr-2">
                    <span class="font-size-16 font-weight-600">
                        Tolak
                    </span>
                </button>
                <button type="button" class="btn btn-dsa-warning btn-lg mr-2">
                    <span class="font-size-16 font-weight-600">
                        Edit
                    </span>
                </button>
            </div>
        </div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <!-- <th></th> -->
                                            <th>NIK</th>
                                            <th>Nama Pengguna</th>
                                            <th>Email</th>
                                            <th>Status Akses IDO</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbodyFolder">
                                        <tr class="cursor-pointer on-hover trFile"
                                            v-for="(item, index) of Data.ListRequestAccess.content" :key="index">
                                            <!-- <td>
                                                <input type="checkbox" />
                                            </td> -->
                                            <td>{{ item.nik_spv || '-' }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.email }}</td>
                                            <td>
                                                <span v-if="item.is_allowed === null" class="text-warning">
                                                    Mengajukan Akses
                                                </span>
                                                <span v-if="item.is_allowed === true" class="text-success">
                                                    Memiliki Akses
                                                </span>
                                                <span v-if="item.is_allowed === false" class="text-danger">
                                                    Tidak Memiliki Akses
                                                </span>
                                            </td>
                                            <td>
                                                <div v-if="item.is_allowed === null">
                                                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2"
                                                        @click="giveAccess(item, true)">
                                                        <span class="font-size-16 font-weight-600">
                                                            Terima
                                                        </span>
                                                    </button>
                                                    <button type="button"
                                                        class="btn btn-dsa-outline-white btn-lg ml-2 border"
                                                        @click="giveAccess(item, false)">
                                                        <span class="font-size-16 font-weight-600">
                                                            Tolak
                                                        </span>
                                                    </button>
                                                </div>
                                                <div v-if="item.is_allowed === true || item.is_allowed === false">
                                                    <button type="button" class="btn btn-dsa-warning btn-lg ml-2"
                                                        @click="modalEditAccess(item)">
                                                        <span class="font-size-16 font-weight-600">
                                                            Edit
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListRequestAccess.content.length === 0" class="text-center">
                                            <td colspan="5">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="Pagination">
                        <div id="Showing"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                            <span class="font-size-13">Showing
                                {{ Data.ListRequestAccess.meta.show_from }}
                                to
                                {{ Data.ListRequestAccess.meta.show_to }}
                                of
                                {{ Data.ListRequestAccess.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListRequestAccess.meta.totalData" :per-page="Pagination.pageSize"
                                prev-text="Sebelumnya" next-text="Selanjutnya">
                            </b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="Modal_GiveAccessPopup" ref="Modal_GiveAccessPopup" centered hide-header hide-footer
            no-close-on-backdrop>
            <div class="give-access">
                <div class="accept" v-if="isAllowed">
                    <div class="row mb-4">
                        <div class="col-xl-12">
                            <img class="w-100" src="/request-access/ilustration-header.svg" />
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-xl-12 d-flex justify-content-center">
                            <img src="/request-access/ilustration-laptop.svg" />
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-xl-12 text-center">
                            <label class="text-information">
                                Akses IDO berhasil diberikan kepada pengguna!
                            </label>
                        </div>
                    </div>
                </div>
                <div class="reject" v-if="!isAllowed">
                    <div class="row mb-4">
                        <div class="col-xl-12">
                            <img class="w-100" src="/request-access/ilustration-header.svg" />
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-xl-12 d-flex justify-content-center">
                            <img src="/request-access/ilustration-person.svg" />
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-xl-12 text-center">
                            <label class="text-information" style="width: 95%;">
                                Penolakan akses IDO berhasil dilakukan!
                            </label>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-xl-12">
                            <button type="button" class="btn btn-dsa-primary btn-lg w-100"
                                @click="$refs['Modal_GiveAccessPopup'].hide()">
                                <span class="font-size-16 font-weight-600">
                                    Oke
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="Modal_RemarkPenolakan" ref="Modal_RemarkPenolakan" centered hide-header hide-footer>
            <div class="tolak-access">
                <div class="container">
                    <div>
                        <div class="row mb-4">
                            <div class="col-xl-12">
                                <img class="w-100" src="/request-access/ilustration-header.svg" />
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-xl-12 text-center">
                                <label class="label mb-3">
                                    Pesan Penolakan
                                </label>
                                <p class="sub-label">
                                    Pesan berisikan alasan penolakan permohonan akses IDO yang diajukan oleh pengguna
                                    <span>
                                        digitalpass.id
                                    </span>.
                                    Pesan akan dilampirkan pada badan email yang akan dikirimkan kepada pengguna.
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="form-group">
                                    <textarea class="form-control" rows="10"
                                        placeholder="Tuliskan pesan kepada pengguna" v-model="Form.note"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-xl-12">
                            <button type="button" class="btn btn-dsa-primary btn-lg w-100" @click="confirmGiveAccess()"
                                :disabled="!Form.note">
                                <span class="font-size-16 font-weight-600">
                                    Kirim Pesan
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="Modal_EditAccess" ref="Modal_EditAccess" centered hide-header hide-footer>
            <div class="edit-access py-3 px-2">
                <div class="row mb-2">
                    <div class="col-xl-12">
                        <label class="label-edit-access">
                            Pengubahan Data
                        </label>
                        <p class="sub-label-edit-access">
                            Data yang Anda pilih merupakan data individual. Anda dapat mengubah status permohonan akses
                            pengguna secara langsung terhadap data yang Anda pilih.
                        </p>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-xl-6">
                        <div>
                            <p class="desc">NIK</p>
                            <label class="sub-desc">{{ Data.Detail.nik_spv || '-' }}</label>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div>
                            <p class="desc">Email</p>
                            <label class="sub-desc">{{ Data.Detail.email || '-' }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-xl-6">
                        <div>
                            <p class="desc">Nama Pengguna</p>
                            <label class="sub-desc">{{ Data.Detail.name || '-' }}</label>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div>
                            <p class="desc">Status Akses IDO</p>
                            <label class="sub-desc">
                                <span v-if="Data.Detail.is_allowed">Memiliki Akses</span>
                                <span v-if="!Data.Detail.is_allowed">Tidak Memiliki Akses</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12">
                        <div class="form-group">
                            <label class="desc">Status Akses IDO</label>
                            <select class="form-control filter" v-model="Form.isAllowed">
                                <option value="">Status Akses IDO</option>
                                <option :value="false">Tidak Memiliki Akses</option>
                                <option :value="true">Memiliki Akses</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6">
                        <button type="button" class="btn btn-dsa-primary w-100" style="height: 48px;" @click="editAccess()">
                            <span class="font-size-16 font-weight-600">
                                Simpan
                            </span>
                        </button>
                    </div>
                    <div class="col-xl-6">
                        <button type="button" class="btn btn-dsa-outline-primary w-100" style="height: 48px;" @click="$refs['Modal_EditAccess'].hide()">
                            <span class="font-size-16 font-weight-600">
                                Kembali
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import mixins from "@/plugins/mixins.js";

    export default {
        layout: "cms/default",
        mixins: [mixins],
        props: {},
        data() {
            return {
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: "",
                    searchBy: "nama",
                    status: "",
                },
                Data: {
                    ListRequestAccess: {
                        content: [],
                        meta: {}
                    },
                    Detail: {}
                },
                IsLoading: false,
                NIK: "active",
                NON_NIK: "",
                PermissionsAccess: [],
                Route: {
                    pageEdit: "kelola-pengguna",
                    pageDetail: "kelola-pengguna"
                },
                isAllowed: false,
                Form: {
                    idRequest: null,
                    isAllowed: "",
                    note: null
                },
                tempData: {}
            };
        },
        watch: {
            "Pagination.pageSize"() {
                this.GetDataRequestAccess();
            },
            "Pagination.pageIndex"() {
                this.GetDataRequestAccess();
            },
            "Filter.search"() {
                this.GetDataRequestAccess();
            },
            "Filter.searchBy"() {
                this.Filter.search = ""
            },
            "Filter.status"() {
                this.GetDataRequestAccess();
            }
        },
        mounted() {
            this.$store.commit("setBreadcrumb", [{
                title: "Kelola Akses IDO",
                menu: []
            }]);
            this.HelperAccessPermissions(data => {
                this.PermissionsAccess = data;
            });
            this.GetDataRequestAccess();
        },
        methods: {
            GetDataRequestAccess() {
                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    name: this.Filter.searchBy === 'nama' ? this.Filter.search : null,
                    email: this.Filter.searchBy === 'email' ? this.Filter.search : null,
                    nik_spv: this.Filter.searchBy === 'nik' ? this.Filter.search : null,
                    status: this.Filter.status,
                };
                this.Request('GET', '/api/v3/request-access', params, null, 'BASIC', (res) => {
                    this.Data.ListRequestAccess = res;
                });
            },
            modalGiveAccess() {
                this.$refs['Modal_GiveAccessPopup'].show();
            },
            modalEditAccess(data) {
                this.Data.Detail = data;
                this.Form.isAllowed = data.is_allowed
                this.Form.idRequest = data.id;
                this.$refs['Modal_EditAccess'].show();
            },
            giveAccess(data, isAllowed) {
                this.isAllowed = isAllowed;
                this.tempData = data;

                if (!isAllowed) {
                    this.$refs['Modal_RemarkPenolakan'].show();
                } else {
                    this.confirmGiveAccess();
                }
            },
            confirmGiveAccess() {
                this.HelperConfirm('user', 'request access').then((result) => {
                    if (result.isConfirmed) {
                        let bodyIsAllowed = {
                            email: this.tempData.email,
                            isAllowed: this.isAllowed,
                        };

                        let bodyNotIsAllowed = {
                            email: this.tempData.email,
                            isAllowed: this.isAllowed,
                            note: this.Form.note
                        };

                        let body = this.isAllowed ? bodyIsAllowed : bodyNotIsAllowed;

                        this.Request('POST', '/api/v3/request-access/confirmation', null, body, 'BASIC', (
                            callback) => {
                            if (callback.code === 200) {
                                this.$refs['Modal_GiveAccessPopup'].show();
                                this.giveAccessSendToIDO(callback.content[0]);
                                this.GetDataRequestAccess();
                            } else {
                                this.HelperErrorCode(callback);
                            };
                        });
                    };
                });
            },
            giveAccessSendToIDO(data) {
                let body = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    nik: data.nik_spv,
                    expiredToken: data.expired_token,
                    resetToken: data.reset_token,
                    isActive: data.is_active,
                    isAllowed: data.is_allowed,
                    digitalPassUserId: data.id
                };

                this.RequestIDO('POST', '/api/v2/request-access/confirmation', null, body, 'BASIC', (
                    callback) => {
                    if (callback.code === 200) {};
                });
            },
            editAccess() {
                let body = {
                    id: this.Form.idRequest,
                    isAllowed: this.Form.isAllowed,
                };

                this.Request('PUT', '/api/v3/request-access/update', null, body, 'BASIC', (
                    callback) => {
                    if (callback.code === 200) {
                        this.giveAccessSendToIDO(callback.content[0]);
                        this.GetDataRequestAccess();
                        this.$refs['Modal_EditAccess'].hide();
                    };
                });
            }
        }
    };

</script>

<style scoped>
    .nav.nav-tabs li a.active {
        color: #eb5757;
        background-color: white;
    }

    .nav.nav-tabs li a {
        color: #676a6c;
        background-color: #e9ecef;
    }

    .give-access .text-information {
        font-size: 24px;
        font-weight: 700;
        color: #3B3D39 !important;
    }

    div /deep/ .modal-body {
        padding-top: 0;
    }

    .edit-access .label-edit-access {
        font-size: 24px;
        font-weight: 600;
        color: #3B3D39;

        margin-bottom: 0.5rem;
    }

    .edit-access .sub-label-edit-access {
        font-size: 16px;
        font-weight: 400;
        color: #7F817D;
    }

    .edit-access .desc {
        font-size: 16px;
        font-weight: 700;
        color: #3B3D39;

        margin-bottom: 0.5rem;
    }

    .edit-access .sub-desc {
        font-size: 14px;
        font-weight: 600;
        color: #3B3D39;
    }

    .edit-access select {
        font-size: 16px;
        font-weight: 400;
        color: #3B3D39;

        height: 48px;
    }

    .tolak-access .label {
        font-size: 24px;
        font-weight: 700;
        color: #3B3D39;
    }

    .tolak-access .sub-label {
        font-size: 16px;
        font-weight: 400;
        color: #7F817D;
    }

    .tolak-access .sub-label span {
        font-size: 16px;
        font-weight: 400;
        color: red;
    }

    textarea {
        padding: 15px 20px;
        border: 1.5px solid #F4F4F4;
        border-radius: 4px;
        color: #C8CBCB;
    }

    textarea::placeholder {
        color: #C8CBCB;

    }

</style>
