<template>
    <div>
        <div class="section-container">
            <div class="product-list mb-4">
                <div class="row d-flex align-items-center">
                    <div class="col-auto">
                        <label class="product-name">
                            {{ isShowFilter.Product.selected.label }}
                        </label>
                        <div class="product-select-list" v-if="isShowFilter.Product.isOpen">
                            <div class="product-select-item" v-for="(item, index) of userProducts" :key="index"
                                @click="onSelectProduct(item)">
                                <div class="row d-flex align-items-center" :class="'product-' + index">
                                    <div class="col">
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
            <hr class="v3" />
            <div style="padding-top: 0.8rem; padding-bottom: 2.2rem;">
                <div class="row" v-if="listService.length === 0">
                    <div class="col-xl-4 mb-3" v-for="(item, index) of new Array(6)" :key="index">
                        <b-skeleton animation="wave" height="72px"></b-skeleton>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-xl-4 c-pointer" v-for="(item, index) of listService" :key="index">
                        <nuxt-link :to="'/user/monitoring/drive-dokumen/folder/' + item.name + '?product=' + isShowFilter.Product.selected.value">
                            <div class="drive-dokumen-folder">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto">
                                        <img src="/v3/Portal/assets/icon/DRIVE_DOKUMEN_FOLDER.svg">
                                    </div>
                                    <div class="col">
                                        <span>
                                            {{ item.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
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
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                listProduct: [],
                listService: [],
                isShowProduct: false,
                productSelected: 'Agree Market',
                isShowFilter: {
                    Product: {
                        isOpen: false,
                        selected: {
                            label: "Pilih Produk",
                            value: null
                        }
                    },
                },
                userProducts: []
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Drive Dokumen',
                titleURL: null,
                menu: []
            }]);
        },
        async mounted() {
            // this.userProducts = this.UserLogin().products;
            // if(this.userProducts.length !== 0) {
            //     this.onSelectProduct(this.userProducts[0]);
            // }
            await this.getProduct();
            this.listService = [{
                    name: 'Heuristic Evaluation',
                },
                {
                    name: 'Software Testing',
                },
                {
                    name: 'Security Testing',
                },
                {
                    name: 'Usability Testing',
                },
                {
                    name: 'Service Operation',
                }
            ];
        },
        methods: {
            onSelectProduct(item) {
                this.isShowFilter.Product.selected.label = item.label; 
                this.isShowFilter.Product.selected.value = item.id;
                this.isShowFilter.Product.isOpen = false
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
        width: 280px;
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

</style>
