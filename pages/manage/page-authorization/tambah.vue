<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.user.$error }">
                        NIK / Email<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Masukkan NIK"
                        :class="{ 'is-invalid': $v.Form.user.$error }" v-model.trim="$v.Form.user.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.user.required">
                            NIK / Email tidak boleh kosong.
                        </span>
                        <span v-if="!$v.Form.user.email">
                            NIK / Email tidak sesuai.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.product.$error }">
                        Nama Produk<span class="required">*</span>
                    </label>
                    <multiselect :class="{ 'is-invalid': $v.Form.product.$error }" v-model.trim="$v.Form.product.$model"
                        :multiple="true" :options="Data.allProduct" :close-on-select="false" :clear-on-select="false"
                        :preserve-search="true" placeholder="Pilih Produk">
                    </multiselect>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.product.required">
                            Nama Produk tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/page-authorization" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="CreatePageAuthorization()">
                        <span class="font-size-16 font-weight-600">
                            Submit
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        email,
        required
    } from 'vuelidate/lib/validators';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Service Operation',
                Form: {
                    product: null,
                    user: null,
                },
                token: null,
                Data: {
                    allProduct: []
                }
            }
        },
        validations: {
            Form: {
                product: {
                    required
                },
                user: {
                    email,
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Tambahkan Page Authorization',
                menu: []
            }]);
            this.ShowAllProduct();
        },
        methods: {
            CreatePageAuthorization() {
                this.HelperConfirm(this.module, 'create').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            email: this.Form.user,
                            product: this.Form.product,
                            page: 'SO'
                        };
                        this.Request('POST', '/api/v3/pageAuthorization/create', null, body, 'BEARER', (
                            callback) => {
                            if (callback.code === 200 || callback.code === 201) {
                                this.HelperSuccessCode(this.module, 'create').then((result) => {
                                    if (result.isConfirmed) {
                                        this.$router.back();
                                    }
                                });
                            } else {
                                this.HelperErrorCode(callback);
                            };
                        });
                    };
                });
            },
            ShowAllProduct() {
                let data = {
                    sort: 'DESC'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/getProduct', null, data, 'BASIC', (
                    callback) => {
                    if (callback.code === 200) {
                        this.Data.allProduct = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>

<style src='vue-multiselect/dist/vue-multiselect.min.css'></style>
<style scoped>
    /* fix height multiselect */

    /* make height same to any input */
    .form-dsa /deep/ .multiselect .multiselect__tags {
        min-height: 56px !important;
        padding: 13px 40px 0 12px !important;
        border: 0 !important;
    }

    .form-dsa /deep/ .multiselect .multiselect__select {
        min-height: 56px !important;
    }

    /* if error state */
    .form-dsa /deep/ .multiselect.is-invalid .multiselect__tags {
        border: 1px solid #FE6965 !important;
        box-shadow: unset !important;
    }

    /* fix if select option click */
    .form-dsa /deep/ .multiselect--active input {
        padding: 0px 0px 0px 0px !important;

    }

    /* fix place holder 'Pilih Produk' */
    .form-dsa /deep/ .multiselect .multiselect__tags .multiselect__placeholder {
        font-weight: normal !important;
        font-size: 16px !important;
        color: #7F817D !important;
    }

    /* change color selected product */
    .form-dsa /deep/ .multiselect .multiselect__tags .multiselect__tags-wrap .multiselect__tag {
        background-color: #E0FFD1 !important;
        border-radius: 100px !important;
        color: #8DC26F !important;
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        font-style: normal !important;
        font-weight: 600 !important;
        font-size: 16px !important;
    }

    .form-dsa /deep/ .multiselect .multiselect__tags .multiselect__tags-wrap .multiselect__tag i {
        padding-top: 3px !important;
    }

    /* fix height multiselect */

</style>
