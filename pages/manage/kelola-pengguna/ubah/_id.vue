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
                            <label :class="{ 'text-dsa-danger': $v.Form.product.$error }">
                                Product<span class="required">*</span>
                            </label>
                            <treeselect 
                                class="treeselect" 
                                :class="{ 'is-invalid': $v.Form.product.$error }" 
                                v-model.trim="$v.Form.product.$model" 
                                :multiple="true"
                                :options="Data.ListProduct" 
                                :flat="true"
                                valueFormat="object"
                            />
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.product.required">
                                    Product tidak boleh kosong.
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
                            <label :class="{ 'text-dsa-danger': $v.Form.old_password.$error }">
                                Password Lama<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input :type="passwordTypeOld" class="form-control" placeholder="Password Lama"
                                    v-model.trim="$v.Form.old_password.$model"
                                    :class="{ 'is-invalid': $v.Form.old_password.$error }" autocomplete="off">
                                <div class="input-group-prepend cursor-pointer" @click="switchVisibility('Old')">
                                    <div class="input-group-text right">
                                        <img src="/icon/form/eyes.svg" v-if="passwordTypeOld === 'password'">
                                        <img src="/icon/form/eyes-slash.svg" v-else>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.old_password.required">
                                        Password Lama tidak boleh kosong!.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.new_password.$error }">
                                Password Baru<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input :type="passwordTypeNew" class="form-control" placeholder="Password Baru"
                                    v-model.trim="$v.Form.new_password.$model"
                                    :class="{ 'is-invalid': $v.Form.new_password.$error }" :disabled="isDisabled"
                                    autocomplete="off" value="">
                                <div class="input-group-prepend cursor-pointer" @click="switchVisibility('New')">
                                    <div class="input-group-text right">
                                        <img src="/icon/form/eyes.svg" v-if="passwordTypeNew === 'password'">
                                        <img src="/icon/form/eyes-slash.svg" v-else>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-2">
                                    <span v-if="!$v.Form.new_password.minLength">
                                        Kata sandi Minimal
                                        {{ $v.Form.new_password.$params.minLength.min }}!.
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
                        @click="Submit()">
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
                    id: null,
                    name: null,
                    email: null,
                    phone: null,
                    old_password: null,
                    new_password: null,
                    role_id: '',
                    product: null,
                    tribe: null,
                    product: [],
                },
                passwordTypeOld: 'password',
                passwordTypeNew: 'password',
                isDisabled: true,
                Data: {
                    ListRole: null,
                    ListTribe: null,
                    ListProduct: null,
                },
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
                old_password: {},
                new_password: {
                    minLength: minLength(8)
                },
                phone: {
                    minLength: minLength(10),
                    regexPhoneNumber,
                    required,
                },
                role_id: {
                    required
                },
                product: {
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
        watch: {
            'Form.old_password'() {
                this.checkIfFilled();
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Kelola Pengguna',
                menu: []
            }]);
            this.GetRole();
            this.GetTribe();
            this.GetProduct();
            this.SetValue(this.$route.params);
        },
        methods: {
            GetRole() {
                this.GET(`/api/v3/role`, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.Data.ListRole = data.content;
                    }
                });
            },
            SetValue(id) {
                const param = {
                    page: 1,
                    size: 1,
                    search: id.id
                }
                this.Request('GET', '/api/v3/user', param, null, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.Form.id = data.content[0].id;
                        this.Form.name = data.content[0].name;
                        this.Form.email = data.content[0].email;
                        this.Form.phone = data.content[0].phone;
                        this.Form.role_id = data.content[0].role_id;
                        let mapProduct = data.content[0].products.map((x) => {
                            return x.id
                        })
                        let arr = []
                        arr = [...this.Form.product, mapProduct]

                        // this.Form.product = arr[0]
                        this.Form.product = data.content[0].products;

                        console.log(this.Form.product)
                    }
                })
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
            async UpdateUserProductsEmail() {
                let payload = {
                    email: this.Form.email,
                    userDigitalPassId: this.Form.id
                };
                console.log("payload ", payload);
                await this.RequestIDO('POST',`/api/cms/user-product/updateByEmail`, null, payload, 'BEARER', async (data) => {
                    if (data.code === 200) {
                        await this.UpdateUserProducts();
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
            },
            async UpdateUserProducts() {
                let mapProduct = this.Form.product.map((x) => {
                    return x.label
                })
                let arr = [...mapProduct];
                let products = arr.join(", ");
                let payload = {
                    userDigitalPassId: this.Form.id,
                    productDesc: products
                };
                console.log("product ", products);
                await this.RequestIDO('POST',`/api/cms/user-product/updateByUserDigitalPass`, null, payload, 'BEARER', (data) => {
                    if (data.code === 200) {
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
            },
            async UpdateAccount() {
                let mapProduct = this.Form.product.map((x) => {
                    return x.id
                })
                let arr = [...mapProduct];
                console.log("arr ", arr);
                let param = {
                    id: this.Form.id,
                    name: this.Form.name,
                    email: this.Form.email,
                    phone: this.Form.phone,
                    roles: [
                        this.Form.role_id
                    ],
                    // tribe: this.Form.tribe,
                    products: arr,
                };
                this.PUT(`/api/v3/user/update`, param, 'BEARER', async (data) => {
                    if (data.code === 200) {
                        await this.UpdateUserProductsEmail();
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
            },
            UpdatePassword() {
                let obj = {
                    id: `${this.$route.params.id}`,
                    old_password: this.Form.old_password,
                    password: this.Form.new_password
                };
                this.PUT('/api/v3/user/change-password', obj, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.UpdateAccount();
                    }
                    if (data.code === 409) {
                        for (let x of data.message.details) {
                            this.swal('error', x.message);
                        }
                    }
                    if (data.code === 400) {
                        this.swal('error', data.message);
                    }
                    if (data.code === 500) {
                        this.swal('error', data.message);
                    }
                });
            },
            Submit() {
                this.swal('confirm-add', 'Data anda akan disimpan').then((result) => {
                    if (result.isConfirmed) {
                        if (this.isDisabled) {
                            this.UpdateAccount();
                        } else {
                            this.UpdatePassword();
                        }
                    }
                });
            },
            switchVisibility(field) {
                if (field === 'Old') {
                    this.passwordTypeOld = this.passwordTypeOld === 'password' ? 'text' : 'password';
                } else {
                    this.passwordTypeNew = this.passwordTypeNew === 'password' ? 'text' : 'password';
                }
            },
            checkIfFilled() {
                if (this.Form.old_password === '' || this.Form.old_password === null) {
                    this.Form.new_password = null;
                    this.isDisabled = true;
                } else {
                    this.isDisabled = false;
                }
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