<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12">
                <button type="button" class="btn btn-dsa-outline-primary btn-lg" @click="GenerateUsers()">
                    <span class="font-size-16 font-weight-600">
                        Unduh Data Pengguna
                    </span>
                    <img src="/icon/download-red.svg">
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Nama, NIK Supervisor"
                            @keyup="GetDataUsers()" v-model="Filter.search">
                    </div>
                </div>
            </div>
            <div class="col-auto">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.hasNik">
                        <option value="1">NIK</option>
                        <option value="0">Non NIK</option>
                    </select>
                </div>
            </div>
            <div class="col-auto" @click="isShowFilter.Filter.isOpen = !isShowFilter.Filter.isOpen">
                <div class="filter-select mb-0" :class="isShowFilter.Filter.isOpen ? 'active' : ''">
                    <div class="row d-flex align-items-center">
                        <div class="col-auto pr-2">
                            <div class="filter-label">
                                {{ isShowFilter.Filter.selected }}
                            </div>
                        </div>
                        <div class="col pl-0 pr-2">
                            <span class="filter-select-icon">
                                <img v-if="!isShowFilter.Filter.isOpen" src="/v3/Portal/assets/icon/ICON_FILTER.svg">
                                <img v-if="isShowFilter.Filter.isOpen" src="/v3/Portal/assets/icon/ICON_FILTER_RED.svg">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-end">
                <nuxt-link to="kelola-pengguna/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreatePengguna">
                    <img src="/icon/add.svg" style="width: 15px;">
                    <span class="font-size-16" style="margin-left: 10px;">Tambah</span>
                </nuxt-link>
            </div>
        </div>
        <div class="row" v-if="isShowFilter.Filter.isOpen">
            <!-- <div class="col-auto">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.tribeFilter">
                        <option :value="null">Pilih Tribe</option>
                        <option v-for="(tribe, index) in Data.ListTribe" :key="index" :value="tribe.name">
                            {{ tribe.name }}
                        </option>
                    </select>
                </div>
            </div> -->
            <div class="col-auto">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.productFilter">
                        <option :value="null">Pilih Produk</option>
                        <option v-for="(product, index) in Data.ListProduct" :key="index" :value="product.label">
                            {{ product.label }}
                        </option>
                    </select>
                </div>
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
                                            <th>NIK</th>
                                            <th>Nama Pengguna</th>
                                            <th>Email</th>
                                            <th>Produk</th>
                                            <th>Role</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListUsers.content" :key="index">
                                            <td>{{ item.nik || '-' }}</td>
                                            <td>{{ item.name || '-' }}</td>
                                            <td>{{ item.email || '-' }}</td>
                                            <td>
                                                <div v-if="item.products !== null">
                                                    <div v-if="item.products.length > 1">
                                                        <span class="badge badge-product" :id="`popover-product-${index}`">
                                                            {{ item.products.length }} Produk
                                                        </span>
                                                        <b-popover :target="`popover-product-${index}`" triggers="hover"
                                                            placement="bottom" custom-class="popover-product">
                                                            <span v-for="(item, index) of item.products" :key="index">
                                                                {{ item.label }},
                                                            </span>
                                                        </b-popover>
                                                    </div>
                                                    <div v-if="item.products.length === 1">
                                                        {{ item.products[0].label }}
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <span>-</span>
                                                </div>
                                            </td>
                                            <td>{{ item.role || '-' }}</td>
                                            <td
                                                v-if="PermissionsAccess.DetailPengguna || PermissionsAccess.EditPengguna || PermissionsAccess.DeletePengguna">
                                                <nuxt-link :to="Route.pageDetail + '/ubah/' + item.email"
                                                    class="btn btn-dsa-warning px-3 py-2 ml-1"
                                                    v-if="PermissionsAccess.EditPengguna">
                                                    <img src="/icon/table/edit.svg">
                                                    Edit
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-4 py-2 ml-1"
                                                    @click="DeletePengguna(item.id)"
                                                    v-if="PermissionsAccess.DeletePengguna">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListUsers.content.length === 0" class="text-center">
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
                                {{ Data.ListUsers.meta.show_from }}
                                to
                                {{ Data.ListUsers.meta.show_to }}
                                of
                                {{ Data.ListUsers.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListUsers.meta.totalData" :per-page="Pagination.pageSize"
                                prev-text="Sebelumnya" next-text="Selanjutnya">
                            </b-pagination>
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
        layout: 'cms/default',
        mixins: [mixins],
        props: {

        },
        data() {
            return {
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: null,
                    tribeFilter: null,
                    productFilter: null,
                    hasNik: 0
                },
                Data: {
                    ListUsers: {
                        content: [],
                        meta: {}
                    },
                    ListTribe: [],
                    ListProduct: []
                },
                IsLoading: false,
                NIK: 'active',
                NON_NIK: '',
                PermissionsAccess: [],
                Route: {
                    pageEdit: 'kelola-pengguna',
                    pageDetail: 'kelola-pengguna'
                },
                isShowFilter: {
                    Filter: {
                        isOpen: false,
                        selected: 'Filter'
                    }
                }
            }
        },
        watch: {
            'Pagination.pageSize'() {
                this.GetDataUsers();
            },
            'Pagination.search'() {
                this.GetDataUsers();
            },
            'Pagination.pageIndex'() {
                this.GetDataUsers();
            },
            'Filter.search'() {
                this.GetDataUsers();
            },
            'Filter.roleFilter'() {
                this.GetDataUsers();
            },
            'Filter.hasNik'() {
                this.GetDataUsers();
            },
            'Filter.tribeFilter'() {
                this.GetDataUsers();
            },
            'Filter.productFilter'() {
                this.GetDataUsers();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Pengguna',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetDataUsers();
            this.getTribe();
            this.getProduct();
        },
        methods: {
            GetDataUsers() {
                this.Data.ListUsers.content = [];
                this.Data.ListUsers.meta = {};

                const params = {
                    hasNik: this.Filter.hasNik,
                    role: this.Filter.roleFilter,
                    search: this.Filter.search,
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    tribe: this.Filter.tribeFilter,
                    product: this.Filter.productFilter
                }
                this.Request('GET', '/api/v3/user', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListUsers.content = callback.content;
                        this.Data.ListUsers.meta = callback.meta;
                    };
                });
            },
            getTribe() {
                this.Request('GET', '/api/v3/tribe', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListTribe = callback.content;
                    };
                });
            },
            getProduct() {
                this.Request('GET', '/api/v3/product/list-multiselect', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListProduct = callback.content;
                    };
                });
            },
            DeletePengguna(id) {
                this.swal('confirm-pengguna', 'Data anda akan dihapus').then((result) => {
                    if (result.isConfirmed) {
                        const param = {
                            id: id
                        };
                        this.DELETE(`/api/v3/user/remove`, param, 'BASIC', (data) => {
                            if (data.code === 200) {
                                this.GetDataUsers();
                                this.swal('success', 'Berhasil menghapus data').then((result) => {
                                    if (result.isConfirmed) {}
                                });
                            }
                            if (data.code === 409) {
                                for (let x of data.message.details) {
                                    this.swal('error', x.message);
                                }
                            }
                        });
                    }
                });
            },
            NavClick(nav) {

            },
            async GenerateUsers() {
                let body = {
                    hasNik: Number(this.Filter.hasNik)
                }
                await this.Request('POST', `/api/v3/user/download`, null, body, 'BEARER', (data) => {
                    var FileSaver = require('file-saver');
                    var blob = new Blob([data], {
                        type: 'text/plain;charset=utf-8'
                    });
                    FileSaver.saveAs(blob, `Generate_Users.csv`);
                });
            },
        }
    }

</script>

<style scoped>
    .nav.nav-tabs li a.active {
        color: #EB5757;
        background-color: white;
    }

    .nav.nav-tabs li a {
        color: #676A6C;
        background-color: #E9ECEF;
    }

    .badge-product {
        background-color: #F9E4E4;
        border-radius: 100px;
        color: #E42313;
        padding: 14px 18px;
        font-weight: 400;
        font-size: 16px;
    }

    .popover-product {
        background-color: #FFEFE9;
        border: 1px solid #E42313;
        border-radius: 8px;
    }

    .popover-product span {
        color: #151718;
    }

</style>
