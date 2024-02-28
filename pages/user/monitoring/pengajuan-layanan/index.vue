<template>
    <div>
        <div class="section-container">
            <div class="product-list mb-4">
                <div class="row d-flex align-items-center">
                    <div class="col-auto">
                        <label class="product-name">
                            {{ IsShowFilter.Product.selected.label }}
                        </label>
                        <div class="product-select-list" v-if="IsShowFilter.Product.isOpen">
                            <div class="product-select-item" v-for="(item, index) of userProducts" :key="index"
                                @click="onSelectProduct(item)">
                                <div class="row d-flex align-items-center" :class="'product-' + index">
                                    <div class="col ml-2">
                                        <span>{{ item.label }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <span class="product-select-icon"
                            @click="IsShowFilter.Product.isOpen = !IsShowFilter.Product.isOpen">
                            <img src="/v3/Portal/assets/icon/PRODUCT_SELECT_ARROW_DOWN.svg">
                        </span>
                    </div>
                </div>
            </div>
            <div class="product-banner mb-4" v-if="!isHideProductBanner">
                <div class="row d-flex align-items-center h-100 px-4">
                    <div class="col-auto">
                        <img src="/v3/Portal/assets/icon/PROFILE.svg">
                    </div>
                    <div class="col">
                        <p class="title mb-0">
                            Anda dapat menambahkan produk lainnya didalam folder ini.
                        </p>
                        <p class="sub-title mb-0">
                            Buat dan tambahkan produk Anda untuk memulai menggunakan layanan Digitalpass.
                        </p>
                    </div>
                    <div class="col-auto">
                        <span @click="isHideProductBanner = true">
                            <img class="cursor-pointer" src="/v3/Portal/assets/icon/ICON_BAN.svg">
                        </span>
                    </div>
                </div>
            </div>
            <div class="layanan-banner mb-4" v-if="bannerLayananSelected !== null">
                <div class="row d-flex align-items-center h-100 px-4">
                    <div class="col-12">
                        <p class="title mb-0">
                            {{ bannerLayananSelected }}
                        </p>
                    </div>
                </div>
            </div>
            <hr class="v3" />
            <div class="mb-4">
                <div class="row d-flex align-items-center">
                    <div class="col-xl-6">
                        <label class="daftar-layanan">
                            Daftar pengajuan layanan
                        </label>
                    </div>
                    <div class="col-xl-6 d-flex justify-content-end">
                        <nuxt-link to="/user/monitoring/pengajuan-layanan/pengajuan" class="btn btn-v3-dsa-primary">
                            <img src="/v3/Portal/assets/icon/ICON_ADD.svg">
                            <span class="ml-2">Ajukan Layanan</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div v-if="Data.listPengajuan.content.length !== 0 || isActiveFilter">
                <div class="row mb-3">
                    <div class="col-xl-4">
                        <div class="search">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <img src="/v3/Portal/assets/icon/ICON_SEARCH.svg">
                                    </span>
                                </div>
                                <input type="text" class="form-control" placeholder="Cari nama pemohon dan pengajuan"
                                    v-model="Filter.search">
                            </div>
                        </div>
                    </div>
                    <div class="col-auto" @click="IsShowFilter.Filter.isOpen = !IsShowFilter.Filter.isOpen">
                        <div class="filter-select mb-0" :class="IsShowFilter.Filter.isOpen ? 'active' : ''">
                            <div class="row d-flex align-items-center">
                                <div class="col-auto pr-2">
                                    <div class="filter-label">
                                        {{ IsShowFilter.Filter.selected.label }}
                                    </div>
                                </div>
                                <div class="col pl-0 pr-2">
                                    <span class="filter-select-icon">
                                        <img v-if="!IsShowFilter.Filter.isOpen"
                                            src="/v3/Portal/assets/icon/ICON_FILTER.svg">
                                        <img v-if="IsShowFilter.Filter.isOpen"
                                            src="/v3/Portal/assets/icon/ICON_FILTER_RED.svg">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="IsShowFilter.Filter.isOpen">
                    <div class="col-auto" @click="IsShowFilter.Layanan.isOpen = !IsShowFilter.Layanan.isOpen">
                        <div class="filter-select">
                            <div class="row d-flex align-items-center">
                                <div class="col-auto pr-2">
                                    <div class="filter-label">
                                        {{ IsShowFilter.Layanan.selected.label }}
                                    </div>
                                </div>
                                <div class="col pl-0 pr-1">
                                    <span class="filter-select-icon">
                                        <img src="/v3/Portal/assets/icon/FILTER_ARROW_DOWN.svg">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="filter-select-list" v-if="IsShowFilter.Layanan.isOpen">
                            <div class="filter-select-item" v-for="(item, index) of Data.listLayanan" :key="index"
                                @click="onChangeFilter('layanan', item)">
                                <div class="row d-flex align-items-center" :class="'filter-' + index">
                                    <div class="col-xl-12">
                                        <span>{{ item.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto" @click="IsShowFilter.Status.isOpen = !IsShowFilter.Status.isOpen">
                        <div class="filter-select">
                            <div class="row d-flex align-items-center">
                                <div class="col-auto pr-2">
                                    <div class="filter-label">
                                        {{ IsShowFilter.Status.selected.label }}
                                    </div>
                                </div>
                                <div class="col pl-0 pr-1">
                                    <span class="filter-select-icon">
                                        <img src="/v3/Portal/assets/icon/FILTER_ARROW_DOWN.svg">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="filter-select-list" v-if="IsShowFilter.Status.isOpen">
                            <div class="filter-select-item" v-for="(item, index) of Data.listStatus" :key="index"
                                @click="onChangeFilter('status', item)">
                                <div class="row d-flex align-items-center" :class="'filter-' + index">
                                    <div class="col-xl-12">
                                        <span>{{ item.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-auto" @click="IsShowFilter.Calendar.isOpen = !IsShowFilter.Calendar.isOpen">
                        <div class="calendar">
                            <div class="filter-select">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto pr-2">
                                        <div class="filter-label">
                                            {{ IsShowFilter.Calendar.selected.label }}
                                        </div>
                                    </div>
                                    <div class="col pl-0 pr-1">
                                        <span class="filter-select-icon">
                                            <img src="/v3/Portal/assets/icon/FILTER_ARROW_DOWN.svg">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-select-list" v-if="IsShowFilter.Calendar.isOpen">
                                <div class="filter-select-item" v-for="(item, index) of Data.listCalendar" :key="index"
                                    @click="IsShowFilter.Calendar.selected.label = item.name">
                                    <div class="row d-flex align-items-center" :class="'filter-' + index">
                                        <div class="col-xl-12">
                                            <span>{{ item.name }}</span>
                                        </div>
                                    </div>
                                </div>
                                <v-calendar title-position="left" locale="id" />
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="no-data" v-if="Data.listPengajuan.content.length === 0">
                <div class="row d-flex align-items-center text-center h-100">
                    <div class="col-xl-12">
                        <div style="margin-bottom: 24px;">
                            <img src="/v3/Portal/assets/icon/NO_DATA.svg">
                        </div>
                        <div v-if="isActiveFilter" class="title">
                            <p class="mb-0">
                                Data tidak ditemukan
                            </p>
                        </div>
                        <div v-else-if="!isActiveFilter" class="title">
                            <p class="mb-0">
                                Anda belum mengajukan
                            </p>
                            <p class="mb-0">
                                layanan apapun!
                            </p>
                        </div>
                        <div class="sub-title">
                            <p class="mb-0">
                                Silahkan ajukan layanan untuk menggunakan
                            </p>
                            <p class="mb-0">
                                fasilitas dashboard digitalpass.
                            </p>
                        </div>
                        <nuxt-link to="/user/monitoring/pengajuan-layanan/pengajuan">
                            <div class="title-ajukan-layanan">

                                <p class="mb-0">
                                    Ajukan produk sekarang
                                    <img src="/v3/Portal/assets/icon/ICON_ADD_RED.svg">
                                </p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div v-if="Data.listPengajuan.content.length !== 0">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="table-responsive mb-4">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Nama Pemohon</th>
                                        <th>Nama Produk</th>
                                        <th>Nama Layanan</th>
                                        <th style="width: 240px;">Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) of Data.listPengajuan.content" :key="index">
                                        <td>{{ item.created_at | formatDate }}</td>
                                        <td>{{ item.requested_by.name }}</td>
                                        <td>{{ item.product_name }}</td>
                                        <td>
                                            <span v-if="item.service === null">-</span>
                                            <span v-else>{{ item.service.name }}</span>
                                        </td>
                                        <td>
                                            <div
                                                v-if="otherBadge(item.statusName)">
                                                <span class="badge-layanan mb-0" :class="{ 
                                                'tolak' : badgeReject(item.statusName),
                                                'draft' : item.statusName === 'DRAFT',
                                                'selesai' : item.statusName === 'SELESAI'}">
                                                    {{ item.status_user }}
                                                </span>
                                            </div>
                                            <div v-else>
                                                <span class="badge-layanan proses mb-0">
                                                    <span
                                                        v-if="item.status_user === 'Jadwal pemaparan produk sudah tersedia'">
                                                        Menunggu Jadwal Pemaparan
                                                    </span>
                                                    <span v-else>
                                                        {{ item.status_user }}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-v3-dsa-primary"
                                                @click="onRedirectDetail(item.id)">
                                                Lihat Detail
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr v-if="Data.listPengajuan.content.length === 0" class="text-center">
                                        <td colspan="5">
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row pagination">
                    <div class="col-xl-6 d-flex align-items-center">
                        <span class="pagination-showing">Showing
                            {{ Data.listPengajuan.meta.show_from ? Data.listPengajuan.meta.show_from :  0 }} to
                            {{ Data.listPengajuan.meta.show_to ? Data.listPengajuan.meta.show_to : 0 }} of
                            {{ Data.listPengajuan.meta.totalData ? Data.listPengajuan.meta.totalData : 0 }}
                        </span>
                    </div>
                    <div class="col-xl-6 d-flex align-self-center justify-content-end">
                        <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                            :total-rows="Data.listPengajuan.meta.totalData" :per-page="Pagination.pageSize" first-number
                            last-number>
                        </b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import moment from 'moment';
    import {
        LIST_PRODUCT,
        LIST_FILTER_STATUS,
        LIST_FILTER_CALENDAR
    } from '@/static/v3/Portal/constants/menu';

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                Pagination: {
                    pageSize: 10,
                    pageIndex: 1
                },
                Filter: {
                    search: null,
                    service: null,
                    status: null,
                    date: {
                        start: null,
                        end: null,
                    }
                },
                Data: {
                    listPengajuan: {
                        content: [],
                        meta: {}
                    },
                    listProduct: [],
                    listLayanan: [],
                    listStatus: [],
                    listCalendar: [],
                },
                IsShowFilter: {
                    Filter: {
                        isOpen: false,
                        selected: {
                            label: 'Filter',
                            value: null
                        }
                    },
                    Product: {
                        isOpen: false,
                        selected: {
                            label: 'Pilih Produk',
                            value: null
                        }
                    },
                    Layanan: {
                        isOpen: false,
                        selected: {
                            label: 'Pilih Jenis Layanan',
                            value: null
                        }
                    },
                    Status: {
                        isOpen: false,
                        selected: {
                            label: 'Pilih Status',
                            value: null
                        }
                    },
                    Calendar: {
                        isOpen: false,
                        selected: {
                            label: 'Pilih Tanggal',
                            value: null
                        }
                    }
                },
                isHideProductBanner: false,
                bannerLayananSelected: null,
                userProducts: [],
            }
        },
        computed: {
            isActiveFilter() {
                let active = true;
                if(
                    !this.Filter.search && 
                    !this.IsShowFilter.Layanan.selected.value && 
                    !this.IsShowFilter.Status.selected.value
                ) {
                    active = false;
                }

                return active;
            },
            otherBadge() {
                return (status) => {
                    return status === 'DRAFT' || status === 'SELESAI' || status === 'PENGAJUAN_DITOLAK' || status === 'PENGAJUAN_DIREJECT'
                }
            },
            badgeReject() {
                return (status) => {
                    return status === 'PENGAJUAN_DITOLAK' || status === 'PENGAJUAN_DIREJECT'
                }
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
            'Pagination.pageIndex'() {
                this.getListPengajuan();
            },
            'Pagination.pageSize'() {
                this.getListPengajuan();
            },
            'Filter.search'() {
                this.getListPengajuan();
            },
            'IsShowFilter.Product.selected.value'() {
                this.Pagination.pageIndex = 1;
                this.getListPengajuan();
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Pengajuan Layanan',
                titleURL: null,
                menu: []
            }]);
        },
        async mounted() {
            this.clearStorage()

            // this.userProducts = this.UserLogin().products;
            await this.getProduct();
            
            this.Data.listProduct = LIST_PRODUCT;
            this.Data.listStatus = LIST_FILTER_STATUS;
            this.Data.listCalendar = LIST_FILTER_CALENDAR;
            await this.getListService();
            await this.getListPengajuan();
        },
        methods: {
            clearStorage() {
                let haveLocalStorage = localStorage.getItem('temp_formValue')
                if (haveLocalStorage) {
                    localStorage.removeItem('temp_formValue')
                }
                this.$store.commit('setIsDraft', false)
                this.$store.commit('setIsHasService', false)
                this.$store.commit('setFileLampiran', {})
                this.$store.commit('setServiceValue', {})
                this.$store.commit('setFormValue', [])
            },
            getListPengajuan() {
                this.Data.listPengajuan = {
                    content: [],
                    meta: {}
                };
                
                if(this.IsShowFilter.Product.selected.value) {
                    const params = {
                        page: this.Pagination.pageIndex,
                        size: this.Pagination.pageSize,
                        search_key: this.Filter.search,
                        service_id: this.IsShowFilter.Layanan.selected.value,
                        productId: this.IsShowFilter.Product.selected.value,
                        status: this.IsShowFilter.Status.selected.value,
                        date_start: this.Filter.date.start,
                        date_end: this.Filter.date.end,
                    };

                    const body = {
                        requested_by: this.UserLogin().id,
                    };
                    
                    // this.Request('GET', '/api/v3/requests', params, null, 'BASIC', (res) => {
                    //     if (res.code === 200) {
                    //         this.Data.listPengajuan = res;
                    //     }
                    // });

                    this.Request('POST', '/api/v3/request/findByUser', params, body, 'BASIC', (res) => {
                        if (res.code === 200) {
                            this.Data.listPengajuan = res;
                        }
                    });
                }
            },
            getListService() {
                this.Request('GET', '/api/v3/service', null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        this.Data.listLayanan = res.content;
                        this.Data.listLayanan.splice(0, 0, {
                            name: 'Pilih Jenis Layanan',
                            id: null
                        });
                    }
                });
            },
            onChangeFilter(filter, data) {
                switch (filter) {
                    case 'layanan':
                        this.IsShowFilter.Layanan.selected.label = data.name;
                        this.IsShowFilter.Layanan.selected.value = data.id;
                        break;
                    case 'status':
                        this.IsShowFilter.Status.selected.label = data.name;
                        this.IsShowFilter.Status.selected.value = data.id;
                        break;
                }
                this.Pagination.pageIndex = 1;
                this.getListPengajuan();
            },
            onRedirectDetail(id) {
                this.$router.push('/user/monitoring/pengajuan-layanan/detail/' + id)
            },
            onSelectProduct(item) {
                this.IsShowFilter.Product.selected.label = item.label; 
                this.IsShowFilter.Product.selected.value = item.id;
                this.IsShowFilter.Product.isOpen = false
            },
            async getProduct() {
                await this.Request('GET', '/api/v3/product/list-byuserid', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.userProducts = callback.content;

                        if(this.userProducts.length !== 0) {
                            this.onSelectProduct(this.userProducts[0]);
                        }
                    };
                });
            },
        }
    }

</script>

<style scoped>
    .product-name {
        font-size: 30px;
        font-weight: 600;
        color: var(--color-tertiary-80);
        margin-bottom: 0;
    }

    .product-select-icon {
        background-color: #F2F4F6;
        border-radius: 8px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .product-select-list {
        margin-top: 15px;
        z-index: 9999;
        position: absolute;
        left: 5px;
        width: 250px;
        max-height: 80vh;
        overflow-y: auto;
        border: 2px solid #D9DDE3;
        background-color: #FFFFFF;
        border-radius: 8px 8px 8px 8px;
    }

    .product-select-item {
        cursor: pointer;
        padding: 10px 20px;
        border-bottom: 2px solid #D9DDE3;
    }

    .product-select-item:last-child {
        border-bottom: 0px !important;
    }

    .product-select-item:hover {
        background-color: #D9DDE3;
    }

    .product-select-item span {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 500;
        font-size: 18px;
    }

    .product-banner {
        background: #F2F4F6;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        width: 100%;
        height: 95px;
    }

    .product-banner .title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 18px;
        color: #2E3032;
    }

    .product-banner .sub-title {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 18px;
        color: #2E3032;
    }

    .daftar-layanan {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 18px;
        color: #000000;
    }

    .layanan-banner {
        background: #DCF2EA;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        width: 100%;
        height: 95px;
    }

    .layanan-banner .title {
        font-family: 'Nunito Sans';
        font-weight: 400;
        font-size: 16px;
        color: #2E3032;
    }

</style>
