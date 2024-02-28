<template>
    <div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="thead-dark">
                                            <th>Service</th>
                                            <th>Phase 1</th>
                                            <th>Phase 2</th>
                                            <th>Phase 3</th>
                                            <th>Phase 4</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListSLA.content" :key="index">
                                            <td>{{ item.object_service }}</td>
                                            <td>{{ item.phase_1 }} Hari</td>
                                            <td>{{ item.phase_2 }} Hari</td>
                                            <td>{{ item.phase_3 }} Hari</td>
                                            <td>{{ item.phase_4 }} Hari</td>
                                            <td>
                                                <span class="text-dsa-success">
                                                    {{ item.total }} Hari
                                                </span>
                                            </td>
                                            <td>
                                                 <nuxt-link :to="'kelola-sla/ubah/' + item.type"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditSLA">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListSLA.content.length === 0" class="text-center">
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
                                {{ Data.ListSLA.meta.show_from }}
                                to
                                {{ Data.ListSLA.meta.show_to }}
                                of
                                {{ Data.ListSLA.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListSLA.meta.totalData" :per-page="Pagination.pageSize"
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
                    ListSLA: {
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
                this.GetSLA();
            },
            'Pagination.search'() {
                this.GetSLA();
            },
            'Pagination.pageIndex'() {
                this.GetSLA();
            },
            'Filter.statusFilter'() {
                this.GetSLA();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola SLA',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetSLA();
        },
        methods: {
            GetSLA() {
                this.Data.ListSLA.content = [];
                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search: this.Filter.search,
                    status: this.Filter.statusFilter
                };
                this.Request('GET', '/api/v3/sla2', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListSLA.content = callback.content;
                        this.Data.ListSLA.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>
