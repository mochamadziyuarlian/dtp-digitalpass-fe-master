<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12 d-flex justify-content-end">
                <nuxt-link to="kelola-tribe/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreateFAQ">
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
                                            <th>Tribe</th>
                                            <th>Deskripsi</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListTribe.content" :key="index">
                                            <td>{{ item.name || '-' }}</td>
                                            <td>
                                                <span v-html="item.description"></span>
                                            </td>
                                            <td>
                                                <nuxt-link :to="'kelola-tribe/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeleteTribe(item.id)">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListTribe.content.length === 0" class="text-center">
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
                                {{ Data.ListTribe.meta.show_from }}
                                to
                                {{ Data.ListTribe.meta.show_to }}
                                of
                                {{ Data.ListTribe.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListTribe.meta.totalData" :per-page="Pagination.pageSize"
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
                module: 'Tribe',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    statusFilter: '',
                },
                Data: {
                    ListTribe: {
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
                this.GetTribe();
            },
            'Pagination.search'() {
                this.GetTribe();
            },
            'Pagination.pageIndex'() {
                this.GetTribe();
            },
            'Filter.statusFilter'() {
                this.GetTribe();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Tribe',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetTribe();
        },
        methods: {
            GetTribe() {
                this.Data.ListTribe.content = [];
                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search: this.Filter.search,
                    status: this.Filter.statusFilter
                };
                this.Request('GET', '/api/v3/tribe', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListTribe.content = callback.content;
                        this.Data.ListTribe.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            DeleteTribe(id) {
                this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            id: id
                        };
                        this.Request('DELETE', '/api/v3/tribe/remove', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetTribe();
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
