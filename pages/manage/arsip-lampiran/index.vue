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
                        <input type="text" class="form-control filter" placeholder="Cari Arsip Lampiran" @keyup="GetArsipLampiran()" v-model="Filter.search">
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
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Tanggal Upload</th>
                                            <th>Nama Produk</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListArsipLampiran.content" :key="index">
                                            <td>{{ item.created_at | formatDate }}</td>
                                            <td>{{ item.product_name || '-' }}</td>
                                            <td>
                                                <nuxt-link :to="'arsip-lampiran/detail/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.ArsipLampiran">
                                                    <img src="/icon/table/detail.svg">
                                                </nuxt-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListArsipLampiran.content.length === 0" class="text-center">
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
                                {{ Data.ListArsipLampiran.meta.show_from }}
                                to
                                {{ Data.ListArsipLampiran.meta.show_to }}
                                of
                                {{ Data.ListArsipLampiran.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListArsipLampiran.meta.totalData" :per-page="Pagination.pageSize"
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
                module: 'Arsip Lampiran',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: ''
                },
                Data: {
                    ListArsipLampiran: {
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
                this.GetArsipLampiran();
            },
            'Pagination.search'() {
                this.GetArsipLampiran();
            },
            'Pagination.pageIndex'() {
                this.GetArsipLampiran();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Arsip Lampiran',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetArsipLampiran();
        },
        methods: {
            GetArsipLampiran() {
                this.Data.ListArsipLampiran.content = [];
                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search_key: this.Filter.search
                };
                this.Request('GET', '/api/v3/requests', params, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListArsipLampiran.content = callback.content;
                        this.Data.ListArsipLampiran.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>
