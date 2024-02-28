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
                        <input type="text" class="form-control filter" placeholder="Cari Nama Akun" @keyup="Search()"
                            v-model="Filter.search">
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
                                            <th>Nama Akun</th>
                                            <th>Comment</th>
                                            <th>Bintang</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListFeedback.content" :key="index">
                                            <td>{{ item.user_name || '-' }}</td>
                                            <td>{{ item.comment || '-' }}</td>
                                            <td>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListFeedback.content.length === 0" class="text-center">
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
                                {{ Data.ListFeedback.meta.show_from }}
                                to
                                {{ Data.ListFeedback.meta.show_to }}
                                of
                                {{ Data.ListFeedback.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListFeedback.meta.totalData" :per-page="Pagination.pageSize"
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
                module: 'Rating',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                },
                Data: {
                    ListFeedback: {
                        content: [],
                        meta: {}
                    },
                    ListRole: null
                },
                IsLoading: false
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
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Rating',
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
                    10,
                    this.Filter.search,
                    this.Filter.statusFilter
                );
                this.GetFeedback(params);
            },
            GetIndex() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    this.Pagination.pageSize,
                    this.Filter.search,
                    this.Filter.statusFilter
                );
                this.GetFeedback(params);
            },
            GetFeedback(params) {
                this.Data.ListFeedback.content = [];
                this.Request('GET', '/api/v3/feedback', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListFeedback.content = callback.content;
                        this.Data.ListFeedback.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>

<style>
    .checked {
        color: orange;
    }

</style>
