<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12 d-flex justify-content-end">
                <nuxt-link to="page-authorization/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreatePageAuthorization">
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
                                            <th>Email</th>
                                            <th>Page</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListPageAuthorization.content" :key="index">
                                            <td>{{ item.email || '-' }}</td>
                                            <td>{{ item.page || '-' }}</td>
                                            <td>
                                                <a href="javascript:void(0);" @click="ModalDetail(item)"
                                                    class="btn btn-dsa-warning px-2 ml-1">
                                                    <img src="/icon/table/detail.svg">
                                                </a>
                                                <nuxt-link :to="'page-authorization/ubah/' + item.email"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditPageAuthorization">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeletePageAuthorization(item.email)"
                                                    v-if="PermissionsAccess.DeletePageAuthorization">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListPageAuthorization.content.length === 0" class="text-center">
                                            <td colspan="5">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row d-none" id="Pagination">
                        <div id="Showing"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-start">
                            <span class="font-size-13">Showing
                                {{ Data.ListPageAuthorization.meta.show_from }}
                                to
                                {{ Data.ListPageAuthorization.meta.show_to }}
                                of
                                {{ Data.ListPageAuthorization.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListPageAuthorization.meta.totalData" :per-page="Pagination.pageSize"
                                prev-text="Sebelumnya" next-text="Selanjutnya">
                            </b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal ref="Modal_Detail" hide-footer hide-header centered title="">
            <div>
                <label class="font-size-18 font-weight-600 text-dsa-black">
                    Produk
                </label>
                <hr class="mt-2 mb-4">
                <div class="row">
                    <div class="col-xl-6 mb-3" v-for="(item, index) of Data.Detail" :key="index">
                        <div class="w-auto d-flex align-items-center justify-content-center"
                            style="border-radius: 4px; height: 48px; background-color: #E0FFD1;">
                            <span class="font-size-16 font-weight-600 text-dsa-success">
                            {{ item }}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
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
                module: 'Service Operation',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    product: null
                },
                Data: {
                    ListPageAuthorization: {
                        content: [],
                        meta: {}
                    },
                    Detail: {}
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
                this.GetPageAuthorization();
            },
            'Pagination.search'() {
                this.GetPageAuthorization();
            },
            'Pagination.pageIndex'() {
                this.GetPageAuthorization();
            },
            'Filter.product'() {
                this.GetPageAuthorization();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Page Authorization',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetPageAuthorization();
        },
        methods: {
            GetPageAuthorization() {
                this.Data.ListPageAuthorization.content = [];
                let body = {
                    product: this.Filter.product
                };
                this.Request('GET', '/api/v3/pageAuthorization', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListPageAuthorization.content = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            DeletePageAuthorization(email) {
                this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            email: `${email}`
                        };
                        this.Request('DELETE', '/api/v3/pageAuthorization/remove', null, body, 'BEARER', (
                            callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetPageAuthorization();
                                    }
                                });
                            } else {
                                this.HelperErrorCode(callback);
                            };
                        });
                    };
                });
            },
            ModalDetail(detail) {
                this.Data.Detail = detail.product;
                this.$refs['Modal_Detail'].show();
            }
        }
    }

</script>
