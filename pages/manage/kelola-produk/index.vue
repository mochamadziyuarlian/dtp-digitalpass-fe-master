<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12 d-flex justify-content-end">
                <nuxt-link to="kelola-produk/tambah" class="btn btn-dsa-primary btn-lg">
                    <img src="/icon/add.svg" style="width: 15px;">
                    <span class="font-size-16" style="margin-left: 10px;">Tambah</span>
                </nuxt-link>
            </div>
        </div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="thead-dark">
                                            <th>Produk</th>
                                            <th>Deskripsi</th>
                                            <!-- <th>Status</th> -->
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListProduct.content" :key="index">
                                            <td>{{ item.name || '-' }}</td>
                                            <td>{{ item.description || '-' }}</td>
                                            <!-- <td>
                                                <div :class="{
                                                    'bgr-yellow': item.status === 'DRAFT',
                                                    'bgr-green': item.status === 'APPROVED',
                                                    'bgr-red': item.status === 'CLOSED'
                                                }">{{ item.status }}</div>

                                            </td> -->
                                            <td>
                                                <nuxt-link :to="'kelola-produk/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeleteProduct(item.id)">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListProduct.content.length === 0" class="text-center">
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
                                {{ Data.ListProduct.meta.show_from }}
                                to
                                {{ Data.ListProduct.meta.show_to }}
                                of
                                {{ Data.ListProduct.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListProduct.meta.totalData" :per-page="Pagination.pageSize"
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
import moment from 'moment'
import mixins from '@/plugins/mixins.js';

export default {
    layout: 'cms/default',
    mixins: [mixins],
    data() {
        return {
            module: 'Produk',
            Pagination: {
                pageSize: 10,
                pageIndex: 1
            },
            Filter: {
                search: '',
                statusFilter: '',
            },
            Data: {
                ListProduct: {
                    content: [],
                    meta: {}
                }
            },
            IsLoading: false,
            PermissionsAccess: []
        }
    },
    filters: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('dddd, DD MMMM YYYY')
            } else {
                return '-';
            }
        }
    },
    watch: {
        'Pagination.pageSize'() {
            this.GetProduct();
        },
        'Pagination.search'() {
            this.GetProduct();
        },
        'Pagination.pageIndex'() {
            this.GetProduct();
        },
        'Filter.statusFilter'() {
            this.GetProduct();
        }
    },
    mounted() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Kelola Produk',
            menu: []
        }]);
        this.HelperAccessPermissions((data) => {
            this.PermissionsAccess = data;
        });
        this.GetProduct();
    },
    methods: {
        GetProduct() {
            this.Data.ListProduct.content = [];
            let params = {
                page: this.Pagination.pageIndex,
                size: this.Pagination.pageSize,
                search: this.Filter.search,
                status: this.Filter.statusFilter
            };
            this.Request('GET', '/api/v3/product', params, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    this.Data.ListProduct.content = callback.content;
                    this.Data.ListProduct.meta = callback.meta;
                } else {
                    this.HelperErrorCode(callback);
                };
            });
        },
        DeleteProduct(id) {
            this.HelperConfirm(this.module, 'delete').then((result) => {
                if (result.isConfirmed) {
                    let body = {
                        id: id,
                    };
                    this.Request('DELETE', '/api/v3/product/remove', null, body, 'BEARER', (callback) => {
                        if (callback.code === 200) {
                            this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                if (result.isConfirmed) {
                                    this.GetProduct();
                                }
                            });
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });
                };
            });
        }
    }
}

</script>
<style>
.bgr-yellow {
    margin-top: 8px !important;
    border-radius: 8px;
    background: var(--accent-warning-warning-20, #FFEFD2);
    font-family: 'Nunito Sans';
    font-size: 12px !important;
    font-style: normal;
    display: inline-flex;
    color: var(--accent-warning-warning-50, #FFB020);
    font-weight: 600;
    line-height: 18px;
    padding: 3.998px 7.997px;
    justify-content: center;
    align-items: center;
    gap: 7.997px;
}

.bgr-green {
    margin-top: 8px !important;
    border-radius: 7.997px;
    background: var(--accent-success-success-20, #EEF8F4);
    color: var(--accent-success-success-60, #429777);
    font-family: 'Nunito Sans';
    font-size: 12px !important;
    font-style: normal;
    display: inline-flex;

    font-weight: 600;
    line-height: 18px;
    padding: 3.998px 7.997px;
    justify-content: center;
    align-items: center;
    gap: 7.997px;
}

.bgr-red {
    margin-top: 8px !important;
    border-radius: 7.997px;
    background: var(--accent-error-error-20, #FFEBE6);
    color: var(--accent-error-error-60, #BF2600);
    font-family: 'Nunito Sans';
    font-size: 12px !important;
    font-style: normal;
    display: inline-flex;

    font-weight: 600;
    line-height: 18px;
    padding: 3.998px 7.997px;
    justify-content: center;
    align-items: center;
    gap: 7.997px;
}
</style>
