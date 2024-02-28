<template>
    <div>
        <div class="form-group">
            <label class="pb-1 text-body-1">
                Tribe
            </label>
            <treeselect v-model.trim="$v.Data.tribe.$model" :class="{ 'is-invalid': $v.Data.tribe.$error }"
                :multiple="false" :options="Tribe" :open-on-click="false" :open-on-focus="false" />
            <span class="invalid-feedback pt-2">
                <span v-if="!$v.Data.tribe.required">
                    Tribe tidak boleh kosong!.
                </span>
                <span v-if="!$v.Data.tribe.minLength">
                    Masukkan minimal
                    {{ $v.Data.tribe.$params.minLength.min }}
                    karakter.
                </span>
                <span v-if="!$v.Data.tribe.maxLength">
                    Masukkan maksimal
                    {{ $v.Data.tribe.$params.maxLength.max }}
                    karakter.
                </span>
            </span>
        </div>

        <div class="form-group">
            <label class="pb-1 text-body-1">
                Produk
            </label>
            <multiselect v-model.trim="$v.Data.product.$model" :class="{ 'is-invalid': $v.Data.product.$error }"
                tag-placeholder="Tambahkan Produk baru" placeholder="Cari Produk" label="label" track-by="id"
                :options="Product" :multiple="false" :taggable="true" @tag="addNewProduk">
            </multiselect>
            <span class="invalid-feedback pt-2">
                <span v-if="!$v.Data.product.required">
                    Produk tidak boleh kosong!.
                </span>
            </span>
        </div>

        <div class="form-group">
            <label class="pb-1 text-body-1">
                Nama Produk
            </label>
            <textarea type="text" class="form-control" v-model.trim="$v.Data.product_name.$model"
                :class="{ 'is-invalid': $v.Data.product_name.$error }" rows="1"></textarea>
            <span class="invalid-feedback pt-2">
                <span v-if="!$v.Data.product_name.required">
                    Nama Produk tidak boleh kosong!.
                </span>
                <span v-if="!$v.Data.product_name.minLength">
                    Masukkan minimal
                    {{ $v.Data.product_name.$params.minLength.min }}
                    karakter.
                </span>
                <span v-if="!$v.Data.product_name.maxLength">
                    Masukkan maksimal
                    {{ $v.Data.product_name.$params.maxLength.max }}
                    karakter.
                </span>
            </span>
        </div>

        <div class="form-group">
            <label class="pb-1 text-body-1">
                Deskripsi singkat
                <em class="far fa-question-circle font-size-12 cursor-pointer" id="deskripsi_singkat"></em>
            </label>
            <b-popover target="deskripsi_singkat" triggers="click hover" placement="right">
                <div class="font-size-12">
                    <p>
                        Jelaskan seberapa penting produk Anda terhadap kepentingan pengguna dan Telkom.
                    </p>
                    <span class="font-weight-700">
                        Contoh:
                        <br>
                        Produk ini akan dipakai untuk kepentingan karyawan internal Telkom.
                    </span>
                </div>
            </b-popover>
            <textarea type="text" class="form-control" v-model.trim="$v.Data.product_description.$model"
                :class="{ 'is-invalid': $v.Data.product_description.$error }" rows="3">
            </textarea>
            <span class="invalid-feedback pt-2">
                <span v-if="!$v.Data.product_description.required">
                    Deskripsi singkat tidak boleh kosong!.
                </span>
                <span v-if="!$v.Data.product_description.minLength">
                    Masukkan minimal
                    {{ $v.Data.product_description.$params.minLength.min }}
                    karakter.
                </span>
                <span v-if="!$v.Data.product_description.maxLength">
                    Masukkan maksimal
                    {{ $v.Data.product_description.$params.maxLength.max }}
                    karakter.
                </span>
            </span>
        </div>

        <div class="form-group">
            <label class="pb-1 text-body-1">
                Unit/tribe pengaju
            </label>
            <input type="text" class="form-control" v-model.trim="$v.Data.unit.$model"
                :class="{ 'is-invalid': $v.Data.unit.$error }">
            <span class="invalid-feedback pt-2">
                <span v-if="!$v.Data.unit.required">
                    Unit/tribe tidak boleh kosong!.
                </span>
                <span v-if="!$v.Data.unit.minLength">
                    Masukkan minimal
                    {{ $v.Data.unit.$params.minLength.min }}
                    karakter.
                </span>
                <span v-if="!$v.Data.unit.maxLength">
                    Masukkan Maksimal
                    {{ $v.Data.unit.$params.maxLength.max }}
                    karakter.
                </span>
            </span>
        </div>

        <div class="form-group">
            <label class="pb-1 text-body-1">
                Link produk
                <em class="far fa-question-circle font-size-12 cursor-pointer" id="link_produk"></em>
            </label>
            <b-popover target="link_produk" triggers="click hover" placement="right">
                <div class="font-size-12">
                    <span>
                        Masukkan link untuk mengakses website/App Store/Google Play produk Anda.
                    </span>
                </div>
            </b-popover>
            <textarea type="text" class="form-control" v-model.trim="$v.Data.product_link.$model"
                :class="{ 'is-invalid': $v.Data.product_link.$error }" rows="2">
            </textarea>
            <span class="invalid-feedback pt-2" v-if="$v.Data.product_link.$model !== 'https://'">
                <span v-if="!$v.Data.product_link.required">
                    Link produk tidak boleh kosong!.
                </span>
                <span v-if="!$v.Data.product_link.url">
                    Link produk tidak valid!.
                </span>
                <span v-if="!$v.Data.product_link.maxLength">
                    Link produk Maksimal
                    {{ $v.Data.product_link.$params.maxLength.max }}
                    karakter.
                </span>
            </span>
        </div>

    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        maxLength,
        minLength,
        url
    } from 'vuelidate/lib/validators';

    export default {
        mixins: [mixins],
        props: {
            Product: null,
            Tribe: null,
            Data: {
                product_name: null,
                product_description: null,
                unit: null,
                product_link: null,
                product: null,
                tribe: null
            },
        },
        validations: {
            Data: {
                product_name: {
                    required,
                    maxLength: maxLength(50),
                    minLength: minLength(3)
                },
                product_description: {
                    required,
                    maxLength: maxLength(100),
                    minLength: minLength(3)
                },
                unit: {
                    required,
                    maxLength: maxLength(50),
                    minLength: minLength(3)
                },
                product_link: {
                    required,
                    maxLength: maxLength(50),
                    url,
                },
                product: {
                    required
                },
                tribe: {
                    required,
                    maxLength: maxLength(50),
                    minLength: minLength(3)
                }
            },
        },
        mounted() {
            this.$v.Data.product_link.$model = 'https://'
        },
        methods: {
            addNewProduk(newTag) {
                this.$v.Data.product.$model = null;
                const body = {
                    name: newTag,
                    description: newTag,
                    tribe_id: this.$v.Data.tribe.$model
                };
                this.Request('POST', '/api/v3/product/create', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        const selected = {
                            id: callback.content.id,
                            label: callback.content.name
                        };
                        this.Product.push(selected);
                        this.$v.Data.product.$model = selected;
                    }
                });
            }
        }
    }

</script>

<style scoped>
    .form-group {
        margin-bottom: 2rem !important;
    }

    span.invalid-feedback span {
        color: #E60707;
        font-size: 12px !important;
    }

    .was-validated .form-control:invalid,
    .form-control.is-invalid {
        border-color: #d1d3e2;
        padding-right: calc(1.5em + 0.75rem);
        background-image: unset;
    }

    .was-validated .form-control:invalid:focus,
    .form-control.is-invalid:focus {
        border-color: #e74a3b;
        box-shadow: 0 0 0 0.2rem rgba(231, 74, 59, 0.25);
    }

</style>
