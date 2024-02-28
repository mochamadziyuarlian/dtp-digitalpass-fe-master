<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.name.$error }">
                                Nama Lengkap<span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" placeholder="Nama Lengkap"
                                :class="{ 'is-invalid': $v.Form.name.$error }" v-model.trim="$v.Form.name.$model">
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.name.required">
                                    Nama Lengkap tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.email.$error }">
                                Email<span class="required">*</span>
                            </label>
                            <input type="email" class="form-control" placeholder="Email"
                                :class="{ 'is-invalid': $v.Form.email.$error }" v-model.trim="$v.Form.email.$model">
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.email.required">
                                    Email tidak boleh kosong.
                                </span>
                                <span v-if="!$v.Form.email.email">
                                    Email tidak sesuai!.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.tribe.$error }">
                                Tribe<span class="required">*</span>
                            </label>
                            <select class="form-control" v-model.trim="$v.Form.tribe.$model"
                                :class="{ 'is-invalid': $v.Form.tribe.$error }">
                                <option value="">Pilihan</option>
                                <option v-for="(item, index) of Data.ListTribe" :key="index" :value="item.id">
                                    {{ item.name }}</option>
                            </select>
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.tribe.required">
                                    Tribe tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.role_id.$error }">
                                Role<span class="required">*</span>
                            </label>
                            <select class="form-control" v-model.trim="$v.Form.role_id.$model"
                                :class="{ 'is-invalid': $v.Form.role_id.$error }">
                                <option value="">Pilihan</option>
                                <option v-for="(item, index) of Data.ListRole" :key="index" :value="item.id">
                                    {{ item.name }}</option>
                            </select>
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.role_id.required">
                                    Role tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.product.$error }">
                                Product<span class="required">*</span>
                            </label>
                            <treeselect class="treeselect" :class="{ 'is-invalid': $v.Form.product.$error }" v-model.trim="$v.Form.product.$model" :multiple="true"
                                :options="Data.ListProduct" :flat="true" />
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.product.required">
                                    Product tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.phone.$error }">
                                Nomor Telefon<span class="required">*</span>
                            </label>
                            <input type="number" class="form-control" placeholder="Nomor Telefon"
                                :class="{ 'is-invalid': $v.Form.phone.$error }" v-model.trim="$v.Form.phone.$model">
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.phone.required">
                                    Nomor Telefon tidak boleh kosong.
                                </span>
                                <span v-if="!$v.Form.phone.minLength || !$v.Form.phone.regexPhoneNumber">
                                    Nomor telepon minimal 11 karakter dan berformat 08xxx.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.password.$error }">
                                Password<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input :type="passwordType" class="form-control" placeholder="Password"
                                    v-model.trim="$v.Form.password.$model"
                                    :class="{ 'is-invalid': $v.Form.password.$error }" autocomplete="off">
                                <div class="input-group-prepend cursor-pointer" @click="switchVisibility()">
                                    <div class="input-group-text right">
                                        <img src="/icon/form/eyes.svg" v-if="passwordType === 'password'">
                                        <img src="/icon/form/eyes-slash.svg" v-else>

                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.password.required">
                                        Password Lama tidak boleh kosong!.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-pengguna" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="CreateAccount()">
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
        minLength,
        maxLength,
        required,
        helpers
    } from 'vuelidate/lib/validators';

    const regexPhoneNumber = helpers.regex('regexPhoneNumber', /^08[0-9]*$/);

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                Form: {
                    name: null,
                    email: null,
                    password: null,
                    phone: null,
                    role_id: '',
                    tribe: null,
                    product: [],
                },
                Data: {
                    ListRole: null,
                    ListTribe: null,
                    ListProduct: null,
                },
                passwordType: 'password'
            }
        },
        validations: {
            Form: {
                name: {
                    required
                },
                email: {
                    email,
                    required
                },
                password: {
                    required
                },
                phone: {
                    minLength: minLength(10),
                    regexPhoneNumber,
                    required,
                },
                role_id: {
                    required
                },
                tribe: {
                    required
                },
                product: {
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Tambah Kelola Pengguna',
                menu: []
            }]);
            this.GetRole();
            this.GetTribe();
            this.GetProduct();
        },
        methods: {
            GetRole() {
                this.GET(`/api/v3/role`, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.Data.ListRole = data.content;
                    }
                });
            },
            GetTribe() {
                this.Request('GET', '/api/v3/tribe', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListTribe = callback.content;
                    };
                });
            },
            GetProduct() {
                this.Request('GET', '/api/v3/product/list-multiselect', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListProduct = callback.content;
                    };
                });
            },
            CreateAccount() {
                this.swal('confirm-add', 'Data anda akan disimpan').then((result) => {
                    if (result.isConfirmed) {
                        let param = {
                            name: this.Form.name,
                            email: this.Form.email,
                            password: this.Form.password,
                            phone: this.Form.phone,
                            roles: [
                                this.Form.role_id
                            ],
                            // tribe: this.Form.tribe,
                            products: this.Form.product,
                            status: 1,
                            nik_spv: ''
                        };
                        this.POST(`/api/v3/user/create`, param, 'BEARER', (data) => {
                            if (data.code === 200) {
                                this.swal('success', 'Berhasil menyimpan data').then((result) => {
                                    if (result.isConfirmed) {
                                        this.$router.back();
                                    }
                                });
                            }
                            if (data.code === 409) {
                                for (let x of data.message.details) {
                                    this.swal('error', x.message);
                                }
                            }
                            if (data.code === 500) {
                                this.swal('error', data.message);
                            }
                        });
                    }
                });
            },
            switchVisibility() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
            }
        }
    }

</script>

<style scoped>
    div /deep/ .treeselect .vue-treeselect__control {
        height: 56px;
        background: #FFFFFF;
        box-shadow: 10px 24px 30px rgb(138 138 138 / 2%);
        border-radius: 4px;
        border: 0px;
        padding-left: 16px;
        padding-right: 16px;
    }

    div /deep/ .treeselect.is-invalid {
        border: 1px solid #FE6965 !important;
    box-shadow: unset !important;
    border-radius: 4px;

    }

    

    div /deep/ .treeselect .vue-treeselect__control .vue-treeselect__placeholder {
        margin-top: 11px;
    }

</style>
