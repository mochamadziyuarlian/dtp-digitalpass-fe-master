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
                        <input type="text" class="form-control filter" placeholder="Cari File" @keyup="Search()"
                            v-model="Filter.file_name" v-if="category === 'file'">
                        <input type="text" class="form-control filter" placeholder="Cari Request" @keyup="Search()"
                            v-model="Filter.request_name" v-if="category === 'request'">
                    </div>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="form-group form-dsa">
                    <select class="form-control filter" @change="CategoryChange($event)">
                        <option value="">Kategori</option>
                        <option value="file">File</option>
                        <option value="request">Request</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-3">
                <no-ssr>
                    <v-date-picker v-model="Filter.date" mode="date" :masks="VDatePickerConfig.masks"
                        :model-config="VDatePickerConfig.modelConfig" is-range :color="VDatePickerConfig.color"
                        :title-position="VDatePickerConfig.titlePosition">
                        <template v-slot="{ togglePopover }">
                            <div class="form-group form-dsa">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text left">
                                            <img src="/icon/form/calendar.svg">
                                        </div>
                                    </div>
                                    <input type="text" v-model="Filter.dateString" class="form-control filter"
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
                                            <th>Tanggal</th>
                                            <th>Username</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListAudit.content" :key="index">
                                            <td>{{ item.created_at | formatDate }}</td>
                                            <td>{{ item.user ? item.user.name : '-' }}</td>
                                            <td v-for="(item, index) of item.user_role" :key="index">
                                                {{ item.role_name }}
                                            </td>
                                            <td v-html="item.log"></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListAudit.content.length === 0" class="text-center">
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
                                {{ Data.ListAudit.meta.show_from }}
                                to
                                {{ Data.ListAudit.meta.show_to }}
                                of
                                {{ Data.ListAudit.meta.totalData }}
                                entries
                            </span>
                        </div>
                        <div id="Trigger"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                :total-rows="Data.ListAudit.meta.totalData" :per-page="Pagination.pageSize"
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
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: '',
                    serviceFilter: '',
                    statusFilter: '',
                    date: [],
                    dateString: null,
                    file_name: '',
                    request_name: ''
                },
                Data: {
                    ListAudit: {
                        content: [],
                        meta: {}
                    }
                },
                category: 'file',
                IsLoading: false,
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
            'Filter.date'() {
                this.GetIndex();
                this.Filter.dateString =
                    `${moment(String(this.Filter.date.start)).format('DD MMMM YYYY')} - ${moment(String(this.Filter.date.end)).format('DD MMMM YYYY')}`;
            },
            'Filter.request_name'() {
                this.GetIndex();
            },
            'Filter.file_name'() {
                this.GetIndex();
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Audit Trail',
                menu: []
            }]);
            this.GetIndex();
        },
        methods: {
            SetFilter(page, size, date_start, date_end, request_name, file_name, search) {
                let filter = {
                    page,
                    size,
                    date_start,
                    date_end,
                    request_name,
                    file_name,
                    search
                };
                return filter;
            },
            Search() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    null,
                    this.Filter.Date === null ? '' : this.Filter.date.start,
                    this.Filter.Date === null ? '' : this.Filter.date.end,
                    this.Filter.request_name,
                    this.Filter.file_name,
                    this.Filter.search
                );
                this.GetDataAudit(params);
            },
            GetIndex() {
                let params = this.SetFilter(
                    this.Pagination.pageIndex,
                    this.Pagination.pageSize,
                    this.Filter.Date === null ? '' : this.Filter.date.start,
                    this.Filter.Date === null ? '' : this.Filter.date.end,
                    this.Filter.request_name,
                    this.Filter.file_name,
                    this.Filter.search
                );
                this.GetDataAudit(params);
            },
            GetDataAudit(params) {
                this.Data.ListAudit.content = [];
                this.Request('GET', '/api/v3/audit-trail', params, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListAudit.content = callback.content;
                        this.Data.ListAudit.meta = callback.meta;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            CategoryChange(event) {
                this.file_name = '';
                this.request_name = '';
                this.category = event.target.value;
            },
        }
    }

</script>
