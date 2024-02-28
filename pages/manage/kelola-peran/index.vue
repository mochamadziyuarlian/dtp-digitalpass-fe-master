<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12 d-flex justify-content-end">
                <nuxt-link to="kelola-peran/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreatePeran">
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
                                            <th>Nama Peran</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListPeran.content" :key="index">
                                            <td>{{ item.name || '' }}</td>
                                            <td>
                                                <div v-if="!item.isStatic">
                                                    <nuxt-link :to="'kelola-peran/ubah/' + item.id"
                                                        class="btn btn-dsa-warning px-2 ml-1"
                                                        v-if="PermissionsAccess.EditPeran">
                                                        <img src="/icon/table/edit.svg">
                                                    </nuxt-link>
                                                    <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                        @click="DeletePeran(item.id)"
                                                        v-if="PermissionsAccess.DeletePeran">
                                                        <img src="/icon/table/delete.svg">
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListPeran.content.length === 0" class="text-center">
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
                                {{ Data.ListPeran.meta.show_from }}
                                to
                                {{ Data.ListPeran.meta.show_to }}
                                of
                                {{ Data.ListPeran.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListPeran.meta.totalData" :per-page="Pagination.pageSize"
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
                module: 'Peran',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    statusFilter: ''
                },
                Data: {
                    ListPeran: {
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
                this.GetPeran();
            },
            'Pagination.search'() {
                this.GetPeran();
            },
            'Pagination.pageIndex'() {
                this.GetPeran();
            },
            'Filter.statusFilter'() {
                this.GetPeran();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Peran',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetPeran();
        },
        methods: {
            GetPeran() {
                this.Data.ListPeran.content = [];

                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search: this.Filter.search,
                    status: this.Filter.statusFilter
                };
                this.Request('GET', '/api/v3/role', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListPeran.content = callback.content;
                        this.Data.ListPeran.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            DeletePeran(id) {
                this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            id: id
                        };
                        this.Request('DELETE', '/api/v3/role/remove', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetPeran();
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
