<template>
    <!-- Login NIK -->
    <div class="row">
        <div class="col-12 py-4">
            <label class="font-size-24 text-gray-dark-1 font-weight-700">
                Masuk dengan akun Telkom
            </label>
        </div>
        <div class="col-12">
            <form class="auth">
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.sso.nik.$error }">
                        NIK
                    </label>
                    <input type="number" class="form-control" v-model.trim="$v.sso.nik.$model"
                        :class="{ 'is-invalid': $v.sso.nik.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.sso.nik.required">NIK tidak boleh kosong.</span>
                        <span v-if="!$v.sso.nik.maxLength">
                            NIK maksimal
                            {{ $v.sso.nik.$params.maxLength.max }}
                            karakter.
                        </span>
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.sso.password.$error }">
                        Kata Sandi
                    </label>
                    <div class="input-group">
                        <input :type="passwordType" class="form-control" v-model.trim="$v.sso.password.$model"
                            :class="{ 'is-invalid': $v.sso.password.$error }" @keydown.enter="Login">
                        <div class="input-group-append cursor-pointer" @click="switchVisibility">
                            <span class="input-group-text showPassword">
                                <i :class="passwordType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                            </span>
                        </div>
                        <span class="invalid-feedback">
                            <span v-if="!$v.sso.password.required">Password tidak boleh kosong.</span>
                            <span v-if="!$v.sso.password.minLength">
                                Password minimal
                                {{ $v.sso.password.$params.minLength.min }}
                                karakter.
                            </span>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input cursor-pointer" type="checkbox" id="rememberMe"
                                    @change="rememberMe($event)">
                                <label class="font-size-14 font-weight-400 form-check-label cursor-pointer"
                                    style="color: #3B3D39;" for="rememberMe">
                                    Ingat saya
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group text-right">
                            <a href="https://portal.telkom.co.id/login/forgot" target="_blank"
                                class="font-size-14 text-red-main font-weight-700 cursor-pointer link-dsa-hover">
                                Lupa kata sandi?
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row" id="section-button-login">
                    <div class="col-12 d-flex justify-content-center my-2">
                        <button type="button" class="btn btn-block btn-red font-size-16 font-weight-700"
                            @click="Login()" :disabled="$v.sso.$invalid">
                            Masuk
                        </button>
                    </div>
                    <div class="col-12 d-flex justify-content-center my-2">
                        <button type="button"
                            class="btn btn-block btn-outline-red font-size-16 font-weight-700 border-secondary"
                            @click="$router.push('/login/email')">
                            <img src="@/assets/images/icon/v2/email-login.svg" alt="">
                            Gunakan Email
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Login NIK -->
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [mixins],
        layout: 'auth',
        data() {
            return {
                passwordType: 'password',
                sso: {
                    nik: '',
                    password: ''
                },
                Loader: {
                    IsLoading: false
                },
                IPAddress: null,
                Location: null,
                isRememberMe: false,
                Data: {
                    Location: {
                        City: null
                    },
                    ReturnAPI: {}
                }
            }
        },
        validations: {
            sso: {
                nik: {
                    required,
                    maxLength: maxLength(9)
                },
                password: {
                    required,
                    minLength: minLength(8)
                }
            },
        },
        mounted() {
            this.GetIPLocationUser();
            this.GenerateLocalSession();
        },
        methods: {
            async Login() {
                this.Loader.IsLoading = true;
                let expiredDay = 1;
                let sso = {
                    with: 'sso',
                    api: '/api/v3/auth/login-sso',
                    param: {
                        nik: this.sso.nik,
                        password: this.sso.password,
                        // ip: this.IPAddress ? this.IPAddress : localStorage.getItem('local_session'),
                        // time: new Date(),
                        // location: this.Location ? this.Location : 'n/a'
                        // type: 'nik'
                    }
                };

                await this.POST(sso.api, sso.param, 'BASIC', (data) => {
                    let body = {
                        EVENT_NAME: 'DigitalPass_LoginNIK',
                        MODULE: 'LOGIN',
                        METHOD: 'POST',
                        API: sso.api,
                        JSON: sso.param,
                        RESPONSE_API: data,
                        PATH: window.location.pathname,
                        LOCATION: this.Data.Location.City,
                        DATE: new Date()
                    };

                    this.HelperAddCollectionFirebase('LOG', body, (callback) => {
                    });

                    if (data.code === 200) {
                        if (data.content.role.role_name !== null) {
                            if (this.isRememberMe) {
                                expiredDay = 30;
                            }
                            this.CookiesLogin({
                                ...data.content,
                                ...{
                                    loginWith: sso.with
                                }
                            }, expiredDay);
                            this.LoginStrategies(data.content);
                        } else {
                            window.location.href = `${window.location.origin}/login`;
                        }
                    } else {
                        this.HelperErrorCode(data);
                    }
                    this.Loader.IsLoading = false;
                });
                this.Loader.IsLoading = false;
            },
            switchVisibility() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
            },
            GetIPLocationUser() {
                fetch('https://extreme-ip-lookup.com/json/')
                    .then(res => res.json())
                    .then(response => {
                        this.IPAddress = response.query;
                        // 'Kota, Benua, Negara, Kode Negara, Latitude, Longitude, IP, Provisi'
                        this.Data.Location.City = response.city
                        this.Location =
                            `${response.city}, ${response.continent}, ${response.country}, ${response.countryCode}, ${response.lat}, ${response.lon}, ${response.query}, ${response.region}`;
                    })
            },
            rememberMe(event) {
                this.isRememberMe = event.target.checked;
            },
            GenerateLocalSession() {
                let dt = new Date().getTime();
                let uuid = 'IP.xxx-yyy-xyy-yyx'.replace(/[xy]/g, function (c) {
                    let r = (dt + Math.random() * 16) % 16 | 0;
                    dt = Math.floor(dt / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                localStorage.setItem('local_session', uuid ? uuid : 'n/a');
            }
        }
    }

</script>

<style scoped>
    button {
        height: 46px !important;
    }

</style>
