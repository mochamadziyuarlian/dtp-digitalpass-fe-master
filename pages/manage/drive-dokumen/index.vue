<template>
    <div class="v3">
        <div class="product-list mb-4">
            <div class="row d-flex align-items-center">
                <div class="col-auto">
                    <!-- <label class="product-name" v-if="isShowFilter.Product.selected.value == null">
                        Pilih
                    </label> -->
                    <label class="product-name">
                        {{ isShowFilter.Product.selected.label }}
                    </label>
                    <div class="product-select-list" v-if="isShowFilter.Product.isOpen">
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
                        @click="isShowFilter.Product.isOpen = !isShowFilter.Product.isOpen">
                        <img src="/v3/Portal/assets/icon/PRODUCT_SELECT_ARROW_DOWN.svg">
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Folder" @keyup="getListFolder()"
                            v-model="Filter.search">
                    </div>
                </div>
            </div>
            <div class="col-xl-3">
                <div class="form-group form-dsa">
                    <select class="form-control filter" v-model="Filter.service">
                        <option :value="null">
                            Semua Service
                        </option>
                        <option value="Software Testing">
                            Software Testing
                        </option>
                        <option value="Heuristic Evaluation">
                            Heuristic Evaluation
                        </option>
                        <option value="Alih Kelola Operational">
                            Alih Kelola Operational
                        </option>
                        <option value="Usability Testing">
                            Usability Testing (UT)
                        </option>
                        <option value="Security Testing">
                            Security Testing
                        </option>
                        <option value="Service Operation">
                            Service Operation
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-3"></div>
        <div style="padding-bottom: 0.7rem;">
            <div class="row" style="height: 30rem;" v-if="listFolder.length === 0">
                <div class="col-xl-12 d-flex justify-content-center align-items-center mb-3 mt-3">
                    <div class="text-center">
                        <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_NOT_FOUND.svg" />
                        <p class="label-not-found">
                            Tidak Ada Folder Tersedia
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4 c-pointer" v-for="(item, index) of listFolder" :key="index">
                    <nuxt-link :to="'/manage/drive-dokumen/file/' + item.product_name + '?id=' + item.id + '&service_id=' + item.service_id">
                        <div class="drive-dokumen-folder">
                            <div class="row d-flex align-items-center">
                                <div class="col-auto">
                                    <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_FOLDER.svg">
                                </div>
                                <div class="col">
                                    <span>
                                        {{ item.product_name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        LIST_PRODUCT
    } from '@/static/v3/Portal/constants/menu';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                listProduct: [],
                listFolder: [],
                isShowProduct: false,
                productSelected: 'Agree Market',
                isShowFilter: {
                    Product: {
                        isOpen: false,
                        selected: null
                    },
                },
                Filter: {
                    service: null,
                    search: null
                },
                userProducts: []
            }
        },
        watch: {
            'Filter.search'() {
                this.getListFolder();
            },
            'Filter.service'() {
                this.getListFolder();
            },
            'isShowFilter.Product.selected.value'() {
                this.getListFolder();
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Drive Dokumen',
                menu: []
            }]);
        },
        mounted() {
            this.userProducts = this.UserLogin().products;
            // this.onSelectProduct(this.userProducts[0]);

            this.listProduct = LIST_PRODUCT
            this.getListFolder()
        },
        methods: {
            getListFolder() {
                const params = {
                    service: this.Filter.service,
                    search: this.Filter.search,
                    productId: this.isShowFilter.Product.selected.value
                }
                this.Request('GET', '/api/v3/drive-request', params, null, 'BEARER', (res) => {
                    if (res.code === 200) {
                        this.listFolder = res.content
                    } else {
                        this.listFolder = []
                    }
                })
            },
            onSelectProduct(item) {
                this.isShowFilter.Product.selected.label = item.label; 
                this.isShowFilter.Product.selected.value = item.id;
                this.isShowFilter.Product.isOpen = false
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

    .daftar-layanan {
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 18px;
        color: #000000;
    }

    .drive-dokumen-folder-name {
        font-family: 'Poppins';
        color: #2E3032;
        font-weight: 600;
        font-size: 24px;
    }

    .drive-dokumen-folder {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 500;
        font-size: 18px;

        background-color: #FFFFFF;
        border: 1px solid #F2F4F6;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
        cursor: pointer;
    }

    .label-not-found {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 600;
        font-size: 24px;

        margin-top: 24px;
        margin-bottom: 24px;
    }

</style>
