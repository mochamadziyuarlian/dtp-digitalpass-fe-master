<template>
    <div>
        <div class="row">
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Nama Kegiatan"
                            @keyup="GetIndex()" v-model="Filter.search">
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
            <div class="col-xl-3">
                <no-ssr>
                    <v-date-picker v-model="Filter.date" mode="date" :masks="VDatePickerConfig.masks"
                        :model-config="VDatePickerConfig.modelConfig" :color="VDatePickerConfig.color"
                        :title-position="VDatePickerConfig.titlePosition">
                        <template v-slot="{ togglePopover }">
                            <div class="form-group form-dsa">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text left">
                                            <img src="/icon/form/calendar.svg">
                                        </div>
                                    </div>
                                    <input type="text" v-model="Filter.date" class="form-control filter"
                                        placeholder="Filter Tanggal">
                                    <div class="input-group-prepend" @click="togglePopover()">
                                        <div class="input-group-text right">
                                            <img src="/icon/expand_down_dark.svg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-date-picker>
                </no-ssr>
            </div>
            <div class="col-xl-4 d-flex justify-content-end">
                <nuxt-link to="kelola-kegiatan/tambah" class="btn btn-dsa-primary btn-lg"
                    v-if="PermissionsAccess.CreateKegiatan">
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
                                            <th>Tanggal Buat</th>
                                            <th>Nama Kegiatan</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListKegiatan.content" :key="index">
                                            <td>{{ item.created_at | formatDate }}</td>
                                            <td>{{ item.heading || '-' }}</td>
                                            <td>
                                                <span class="text-dsa-success font-weight-600"
                                                    v-if="item.status === 1">Publish</span>
                                                <span class="text-dsa-danger font-weight-600" v-else>Not Publish</span>
                                            </td>
                                            <td>
                                                <nuxt-link :to="'kelola-kegiatan/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditKegiatan">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                                <button type="button" class="btn btn-dsa-light px-2 ml-1"
                                                    @click="DeleteKegiatan(item.id)"
                                                    v-if="PermissionsAccess.DeleteKegiatan">
                                                    <img src="/icon/table/delete.svg">
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListKegiatan.content.length === 0" class="text-center">
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
                                {{ Data.ListKegiatan.meta.show_from }}
                                to
                                {{ Data.ListKegiatan.meta.show_to }}
                                of
                                {{ Data.ListKegiatan.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListKegiatan.meta.totalData" :per-page="Pagination.pageSize"
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
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        components: {
            DatePicker
        },
        data() {
            return {
                module: 'Kegiatan',
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    statusFilter: '',
                    date: null
                },
                Data: {
                    ListKegiatan: {
                        content: [],
                        meta: {}
                    }
                },
                IsLoading: false,
                PermissionsAccess: [],
                VDatePickerConfig: {
                    color: 'red',
                    titlePosition: 'left',
                    masks: {
                        input: 'DD/MM/YYYY',
                    },
                    modelConfig: {
                        type: 'string',
                        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                    },
                },
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
            },
            'Filter.date'() {
                this.GetIndex();
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Kegiatan',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetIndex();
        },
        methods: {
            SetFilter(page, size, search, status, date) {
                let filter = {
                    page,
                    size,
                    search,
                    status,
                    date
                };
                return filter;
            },
            Search() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    null,
                    this.Filter.search,
                    this.Filter.statusFilter,
                    this.Filter.date
                );
                this.GetKegiatan(params);
            },
            GetIndex() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    this.Pagination.pageSize,
                    this.Filter.search,
                    this.Filter.statusFilter,
                    this.Filter.date
                );
                this.GetKegiatan(params);
            },
            GetKegiatan(params) {
                this.Data.ListKegiatan.content = [];
                this.Request('GET', '/api/v3/kegiatan', params, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListKegiatan.content = callback.content;
                        this.Data.ListKegiatan.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            DeleteKegiatan(id) {
                this.HelperConfirm(this.module, 'delete').then((result) => {
                    if (result.isConfirmed) {
                        let body = JSON.stringify({
                            'id': `${id}`
                        });
                        this.Request('DELETE', '/api/v3/kegiatan/remove', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'delete').then((result) => {
                                    if (result.isConfirmed) {
                                        this.GetKegiatan();
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
