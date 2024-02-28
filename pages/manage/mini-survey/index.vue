<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-12 d-flex justify-content-end">
                <nuxt-link to="mini-survey/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreateMiniSurvey">
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
                                            <th>Text</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListSLA.content" :key="index">
                                            <td>{{ item.text }}</td>
                                            <td>
                                                <nuxt-link :to="'mini-survey/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditMiniSurvey">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeleteSLA(item.id)"
                                                    v-if="PermissionsAccess.DeleteMiniSurvey">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
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
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Mini Survey',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: ''
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
        watch: {
            'Pagination.pageSize'() {
                this.GetSLA();
            },
            'Pagination.search'() {
                this.GetSLA();
            },
            'Pagination.pageIndex'() {
                this.GetSLA();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Mini Survey',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetSLA();
        },
        methods: {
            async GetSLA() {
                this.Data.ListSLA.content = [];
                let params = {
                    page: this.Pagination.pageIndex,
                    size: this.Pagination.pageSize,
                    search: this.Filter.search
                };
                await this.Request('GET', '/api/v3/mini-survey2', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListSLA.content = callback.content;
                        this.Data.ListSLA.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            async DeleteSLA(id) {
                await this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            id: id
                        };
                        this.Request('DELETE', '/api/v3/mini-survey2/remove', null, body, 'BEARER', (
                            callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetSLA();
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
