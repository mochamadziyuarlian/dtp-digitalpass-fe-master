<template>
    <!-- Register -->
    <div class="row">
        <div class="col-12 py-4">
            <form class="auth">
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.auth.name.$error }">
                        Nama lengkap
                    </label>
                    <input type="text" class="form-control" v-model.trim="$v.auth.name.$model"
                        :class="{ 'is-invalid': $v.auth.name.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.auth.name.required">Nama lengkap tidak boleh kosong.</span>
                        <span v-if="!$v.auth.name.minLength">Nama lengkap minimal 3 karakter.</span>
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.auth.phone.$error }">
                        Nomor telepon
                    </label>
                    <input type="number" class="form-control" v-model.trim="$v.auth.phone.$model"
                        :class="{ 'is-invalid': $v.auth.phone.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.auth.phone.required">Nomor telepon tidak boleh kosong.</span>
                        <span v-if="!$v.auth.phone.minLength || !$v.auth.phone.regexPhoneNumber">
                            Nomor telepon minimal 11 karakter dan berformat 08xxx.
                        </span>
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.auth.email.$error }">
                        Email
                    </label>
                    <input type="text" class="form-control" v-model.trim="$v.auth.email.$model"
                        :class="{ 'is-invalid': $v.auth.email.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.auth.email.required">Email tidak boleh kosong.</span>
                        <span v-if="!$v.auth.email.email">Email tidak sesuai.</span>
                    </span>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-control-label" :class="{ 'text-red': $v.auth.password.$error }">
                                Kata sandi
                            </label>
                            <div class="input-group">
                                <input :type="passwordType" class="form-control" v-model.trim="$v.auth.password.$model"
                                    :class="{ 'is-invalid': $v.auth.password.$error }">
                                <div class="input-group-append cursor-pointer" @click="switchVisibility('password')">
                                    <span class="input-group-text showPassword">
                                        <i :class="passwordType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                    </span>
                                </div>
                                <span class="invalid-feedback">
                                    <span v-if="!$v.auth.password.required">Kata sandi tidak boleh kosong.</span>
                                    <span v-if="!$v.auth.password.minLength">
                                        Kata sandi Minimal
                                        {{ $v.auth.password.$params.minLength.min }}.
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-control-label" :class="{ 'text-red': $v.auth.confirmPassword.$error }">
                                Konfirmasi
                            </label>
                            <div class="input-group">
                                <input :type="passwordTypeConfirm" class="form-control"
                                    v-model.trim="$v.auth.confirmPassword.$model"
                                    :class="{ 'is-invalid': $v.auth.confirmPassword.$error }">
                                <div class="input-group-append cursor-pointer"
                                    @click="switchVisibility('passwordConfirm')">
                                    <span class="input-group-text showPassword">
                                        <i
                                            :class="passwordTypeConfirm === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                    </span>
                                </div>
                                <span class="invalid-feedback">
                                    <span v-if="!$v.auth.confirmPassword.required">Kata sandi tidak boleh kosong.</span>
                                    <span v-if="!$v.auth.confirmPassword.sameAsPassword">Kata sandi tidak sama.</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <span class="font-size-12 text-muted">
                        Gunakan minimal 8 karakter dengan campuran huruf, angka & simbol
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.auth.nik_spv.$error }">
                        NIK supervisor (opsional)
                        <em class="far fa-question-circle font-size-12 cursor-pointer" id="answer"></em>
                    </label>
                    <b-popover target="answer" triggers="click hover" placement="right">
                        <span class="font-size-12 text-muted">
                            Diperlukan untuk pertanggung jawaban terhadap pendaftaran akun ini
                        </span>
                    </b-popover>
                    <input type="number" class="form-control" v-model.trim="$v.auth.nik_spv.$model"
                        :class="{ 'is-invalid': $v.auth.nik_spv.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.auth.nik_spv.maxLength">
                            NIK maksimal
                            {{ $v.auth.nik_spv.$params.maxLength.max }}
                            karakter.
                        </span>
                    </span>
                </div>
                <div class="row text-center text-gray-main font-size-12 d-none">
                    <div class="col">
                        <span>
                            Dengan mendaftar akun di DigitalPass, Anda telah menyetujui
                        </span>
                        <br>
                        <span>
                            <span class="text-red font-weight-800">Aturan Penggunaan</span>
                            dan
                            <span class="text-red font-weight-800">Kebijakan Privasi</span>
                        </span>
                    </div>
                </div>
                <span class="font-size-17 text-red">
                    <span v-if="isTelkomEmail">Silahkan masuk dengan NIK dan Kata Sandi Telkom.</span>
                </span>
                <div class="row" id="section-button-register">
                    <div class="col-12 d-flex justify-content-center my-2">
                        <button type="button" @click="register" :disabled="$v.auth.$invalid"
                            class="btn btn-block btn-red font-size-14 font-weight-bold">
                            Buat Akun
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Register -->
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        minLength,
        maxLength,
        sameAs,
        email,
        helpers
    } from 'vuelidate/lib/validators';

    const regexPhoneNumber = helpers.regex('regexPhoneNumber', /^08[0-9]*$/);

    export default {
        mixins: [mixins],
        layout: 'auth',
        components: {},
        data() {
            return {
                passwordType: 'password',
                passwordTypeConfirm: 'password',
                auth: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    role_id: '',
                    nik_spv: ''
                },
                isTelkomEmail: false,
                Data: {
                    Location: {
                        City: null
                    }
                }
            }
        },
        validations: {
            auth: {
                name: {
                    minLength: minLength(3),
                    required
                },
                phone: {
                    minLength: minLength(10),
                    regexPhoneNumber,
                    required,
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs('password')
                },
                nik_spv: {
                    maxLength: maxLength(9)
                },
            },
        },
        watch: {
            'auth.email'() {
                this.isTelkomEmail = false;
                let find = this.$v.auth.email.$model.split('@');
                if (find[0] !== '' && find[1] === 'telkom.co.id') {
                    this.isTelkomEmail = true;
                }
            },
        },
        mounted() {
            this.GetCurrentCity()
        },
        methods: {
            async register() {
                const obj = {
                    name: this.auth.name,
                    email: this.auth.email,
                    password: this.auth.password,
                    phone: this.auth.phone,
                    roles: [
                        'abf7dc10-b821-11e9-bee7-9312538d4610'
                    ],
                    nik_spv: this.auth.nik_spv
                };

                await this.POST(`/api/v3/user/register`, obj, 'BASIC', (data) => {
                    console.log("data ", data);
                    let body = {
                        EVENT_NAME: 'DigitalPass_Register',
                        MODULE: 'REGISTER',
                        METHOD: 'POST',
                        API: '/api/v3/user/register',
                        JSON: obj,
                        RESPONSE_API: data,
                        PATH: window.location.pathname,
                        LOCATION: this.Data.Location.City,
                        DATE: new Date()
                    };

                    this.HelperAddCollectionFirebase('LOG', body, (callback) => {
                    });

                    if (data.code === 200) {
                        this.Swal('success', 'User berhasil dibuat', '');
                        this.Swal(
                            'success', '',
                            'Data berhasil dibuat, silahkan menunggu di approve admin untuk login'
                        ).then((result) => {
                            // window.location.href = `${window.location.origin}/login`;
                        });
                        this.registerAccessSendToIDO(data.content[0].id);
                    } else if (data.code === 409) {
                        this.Swal('error', 'Harap masukan data dengan benar!.', '');
                    } else {
                        this.Swal('error', data.message, '');
                    }
                });
            },
            switchVisibility(field) {
                if (field === 'password') {
                    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
                } else {
                    this.passwordTypeConfirm = this.passwordTypeConfirm === 'password' ? 'text' : 'password';
                }
            },
            GetCurrentCity() {
                this.HelperGetCurrentCity((callback) => {
                    this.Data.Location.City = callback.city
                });
            },
            registerAccessSendToIDO(id) {
                let body = {
                    name: this.auth.name,
                    email: this.auth.email,
                    password: this.auth.password,
                    phone: this.auth.phone,
                    nik: this.auth.nik_spv,
                    expiredToken: null,
                    resetToken: "",
                    digitalPassUserId: id
                };

                this.RequestIDO('POST', '/api/v2/request-access/register-digital-pass', null, body, 'BASIC', (
                    callback) => {
                    if (callback.code === 200) {};
                });
            },
        }
    }

</script>

<style scoped>
    button {
        height: 46px !important;
    }

</style>
