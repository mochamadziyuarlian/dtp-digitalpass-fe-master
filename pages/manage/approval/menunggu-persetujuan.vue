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
                        <input type="text" class="form-control filter" placeholder="Cari Nama, NIK Supervisor"
                            @keyup="Search()" v-model="Filter.search">
                    </div>
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
                                    <thead>
                                        <tr class="thead-dark">
                                            <th>Nama Lengkap</th>
                                            <th>No Telefon</th>
                                            <th>Email</th>
                                            <th>NIK</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListUsers.content" :key="index">
                                            <td>{{ item.name || '-' }}</td>
                                            <td>{{ item.phone || '-' }}</td>
                                            <td>{{ item.email || '-' }}</td>
                                            <td>{{ item.nik_spv || '-' }}</td>
                                            <td>
                                                <button type="button" class="btn btn-dsa-warning px-2 ml-1"
                                                    @click="ApproveOrReject(item.id, 1, 'Approve')">
                                                    <img src="/icon/table/ceklis.svg">
                                                </button>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="ApproveOrReject(item.id, 2, 'Reject')">
                                                    <img src="/icon/table/times.svg">
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
        data() {
            return {
                module: 'User',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    statusFilter: 0,
                },
                Data: {
                    ListUsers: {
                        content: [],
                        meta: {}
                    },
                    ListRole: []
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
            'Filter.search'() {
                this.GetIndex();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Menunggu Persetujuan',
                menu: []
            }]);
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
                this.GetDataUsers(params);
            },
            GetIndex() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    this.Pagination.pageSize,
                    this.Filter.search,
                    this.Filter.statusFilter
                );
                this.GetDataUsers(params);
            },
            GetDataUsers(params) {
                this.Data.ListUsers.content = [];
                this.Request('GET', '/api/v3/user', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListUsers.content = callback.content;
                        this.Data.ListUsers.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    }
                });
            },
            ApproveOrReject(id, status, text) {
                this.HelperConfirm(this.module, text).then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            id: id,
                            status: status
                        };
                        this.Request('PUT', '/api/v3/user/update-status', null, body, 'BASIC', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, text).then((result) => {
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
