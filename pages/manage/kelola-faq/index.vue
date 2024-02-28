<template>
    <div>
        <div class="row">
            <div class="col-xl-4">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari FAQ" @keyup="Search()"
                            v-model="Filter.search">
                    </div>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.statusFilter">
                        <option value="">Status</option>
                        <option value="1">Publish</option>
                        <option value="0">Not Publish</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-6 d-flex justify-content-end">
                <nuxt-link to="kelola-faq/tambah" class="btn btn-dsa-primary btn-lg" v-if="PermissionsAccess.CreateFAQ">
                    <img src="/icon/add.svg" style="width: 15px;">
                    <span class="font-size-16" style="margin-left: 10px;">Tambah</span>
                </nuxt-link>
            </div>
        </div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Tanggal Upload</th>
                                            <th>Judul FAQ</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListFAQ.content" :key="index">
                                            <td>{{ item.created_at | formatDate }}</td>
                                            <td>{{ item.question || '-' }}</td>
                                            <td>
                                                <span class="text-dsa-success font-weight-600" v-if="item.status === 1">Publish</span>
                                                <span class="text-dsa-danger font-weight-600" v-else>Not Publish</span>
                                            </td>
                                            <td>
                                                <nuxt-link :to="'kelola-faq/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditFAQ">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeleteFAQ(item.id)" v-if="PermissionsAccess.DeleteFAQ">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListFAQ.content.length === 0" class="text-center">
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
                                {{ Data.ListFAQ.meta.show_from }}
                                to
                                {{ Data.ListFAQ.meta.show_to }}
                                of
                                {{ Data.ListFAQ.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListFAQ.meta.totalData" :per-page="Pagination.pageSize"
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
                module: 'FAQ',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    statusFilter: '',
                },
                Data: {
                    ListFAQ: {
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
                this.GetIndex();
            },
            'Pagination.search'() {
                this.Search();
            },
            'Pagination.pageIndex'() {
                this.GetIndex();
            },
            'Filter.statusFilter'() {
                this.GetIndex();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola FAQ',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetIndex();
        },
        methods: {
            SetFilter(page, size, search, status) {
                let filter = {
                    page,
                    size,
                    search,
                    status
                };
                return filter;
            },
            Search() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    null,
                    this.Filter.search,
                    this.Filter.statusFilter
                );
                this.GetFAQ(params);
            },
            GetIndex() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    this.Pagination.pageSize,
                    this.Filter.search,
                    this.Filter.statusFilter
                );
                this.GetFAQ(params);
            },
            GetFAQ(params) {
                this.Data.ListFAQ.content = [];
                this.Request('GET', '/api/v3/faq', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListFAQ.content = callback.content;
                        this.Data.ListFAQ.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            DeleteFAQ(id) {
                this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            id: id
                        };
                        this.Request('DELETE', '/api/v3/faq/remove', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetIndex();
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
