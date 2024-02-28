<template>
    <div>
        <div class="row d-none">
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <select class="form-control filter">
                        <option value="" disabled hidden>Semua Produk</option>
                        <option v-for="(item, index) of Filter.product" :key="index" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <select class="form-control filter">
                        <option value="null">Semua Channel</option>
                        <option value="Email">
                            Email
                        </option>
                        <option value="Telegram">
                            Telegram
                        </option>
                        <option value="Whatsapp">
                            Whatsapp
                        </option>
                        <option value="Facebook">
                            Facebook
                        </option>
                        <option value="Instagram">
                            Instagram
                        </option>
                        <option value="LiveChat">
                            Live Chat
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <select class="form-control filter">
                        <option value="">Semua Category</option>
                        <option value="1">Publish</option>
                        <option value="0">Not Publish</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <div>
                <label class="font-size-24 font-weight-600">
                    <span class="text-dsa-black">
                        List Case
                    </span>
                    <span class="text-dsa-success">
                        ({{ Data.ListFAQ.content.length }})
                    </span>
                </label>
            </div>

            <!-- <button type="button" class="btn btn-dsa-warning px-2 ml-1" data-toggle="modal" data-target="#exampleModal">
                    <img src="/icon/table/detail.svg">
                </button> -->

            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Channel</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListFAQ.content" :key="index">
                                            <td>
                                                {{ item.Product }}
                                            </td>
                                            <td>
                                                {{ item.Origin }}
                                            </td>
                                            <td>
                                                {{ item.status }}
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-dsa-warning px-2 ml-1"
                                                    data-toggle="modal" data-target="#exampleModal"
                                                    @click="ModalDetailCase(item)">
                                                    <img src="/icon/table/detail.svg">
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
                    <!-- <div class="row" id="Pagination">
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
                    </div> -->
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div style="margin-bottom: 32px;">
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <label class="font-size-20 font-weight-600 text-dsa-black">
                                        Details
                                    </label>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-end">
                                    <img src="/icon/table/times.svg">
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Case Owner F
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.CaseOwnerType || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Contact Name
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.ContactName || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Contact Email
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.ContactEmail || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Account Name
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.NamedUser || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Status
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <span class="badge badge-success">
                                        {{ this.Data.Detail.Status || '-' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style="margin-bottom: 32px;">
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <label class="font-size-20 font-weight-600 text-dsa-black">
                                        Additional Information
                                    </label>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-end">
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Product
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.Product || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Case Origin
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.Origin || '-' }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style="margin-bottom: 32px;">
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-6 d-flex justify-content-start">
                                    <label class="font-size-20 font-weight-600 text-dsa-black">
                                        Description Information
                                    </label>
                                </div>
                                <div class="col-xl-6 d-flex justify-content-end">
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        SubCategory
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.SubCategory || '-' }}
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Description
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <p class="font-size-16 font-weight-400 text-dsa-black mb-0">
                                        {{ this.Data.Detail.Description || '-' }}
                                    </p>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 16px;">
                                <div class="col-xl-3">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        Web Email
                                    </label>
                                </div>
                                <div class="col-xl-1">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">:</label>
                                </div>
                                <div class="col-xl">
                                    <label class="font-size-16 font-weight-400 text-dsa-black">
                                        {{ this.Data.Detail.WebEmailCompany || '-' }}
                                    </label>
                                </div>
                            </div>
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
        layout: 'portal/ServiceOperation',
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
                    product: null
                },
                Data: {
                    ListFAQ: {
                        content: [],
                        meta: {}
                    },
                    Detail: []
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
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetIndex();
            this.GetProduct();
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
                params = {
                    sort: "DESC",
                    product: "",
                    status: "",
                    category: "",
                    origin: "",
                    limit: 10,
                    offset: 0,
                    dateFrom: "2021-11-01T00:00:00.000Z",
                    dateTo: "2021-11-01T23:00:00.000Z"
                }
                this.Data.ListFAQ.content = [];
                this.Request('POST', '/api/v2/salesforce/case', null, params, 'BASIC', (callback) => {
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
            },
            GetProduct() {
                this.Request('POST', '/api/v2/salesforce/getProduct', null, null, 'BASIC', (callback) => {
                    this.Filter.product = callback.content;
                });
            },
            ModalDetailCase(item) {
                let body = {
                    id: item.id
                }
                this.Request('POST', '/api/v2/salesforce/case-detail', null, body, 'BASIC', (callback) => {
                    this.Data.Detail = callback.content[0];
                });
            }
        }
    }

</script>
