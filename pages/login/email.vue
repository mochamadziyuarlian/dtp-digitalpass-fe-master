<template>
    <!-- Login Email -->
    <div class="row">
        <div class="col-12 py-4">
            <label class="font-size-24 text-gray-dark-1 font-weight-700">
                <em class="fa fa-arrow-left mr-4 cursor-pointer" @click="$router.push('/login')"></em>
                Masuk dengan email
            </label>
        </div>
        <div class="col-12">
            <form class="auth">
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.email.email.$error }">
                        Email
                    </label>
                    <input type="text" class="form-control" v-model.trim="$v.email.email.$model"
                        :class="{ 'is-invalid': $v.email.email.$error }">
                    <span class="invalid-feedback">
                        <span v-if="!$v.email.email.required">Email tidak boleh kosong.</span>
                        <span v-if="!$v.email.email.email">Email tidak sesuai.</span>
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-control-label" :class="{ 'text-red': $v.email.password.$error }">
                        Kata Sandi
                    </label>
                    <div class="input-group">
                        <input :type="passwordType" class="form-control" v-model.trim="$v.email.password.$model"
                            :class="{ 'is-invalid': $v.email.password.$error }" @keydown.enter="Login">
                        <div class="input-group-append cursor-pointer" @click="switchVisibility">
                            <span class="input-group-text showPassword" id="basic-password">
                                <i :class="passwordType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                            </span>
                        </div>
                        <span class="invalid-feedback">
                            <span v-if="!$v.email.password.required">Password tidak boleh kosong.</span>
                            <span v-if="!$v.email.password.minLength">
                                Password minimal
                                {{ $v.email.password.$params.minLength.min }}
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
                            <a href="javascript:void(0);" @click="RedirectLupaPassword()"
                                class="font-size-14 text-red-main font-weight-700 cursor-pointer link-dsa-hover">
                                Lupa kata sandi?
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row" id="section-button-login">
                    <div class="col-12 d-flex justify-content-center my-2">
                        <button type="button" class="btn btn-block btn-red font-size-16 font-weight-700"
                            @click="Login()" :disabled="$v.email.$invalid">
                            Masuk
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Login Email -->
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        minLength,
        email
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [mixins],
        layout: 'auth',
        data() {
            return {
                passwordType: 'password',
                email: {
                    email: '',
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
            email: {
                email: {
                    required,
                    email
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
                let email = {
                    with: 'email',
                    api: '/api/v3/auth/login',
                    param: {
                        email: this.email.email,
                        password: this.email.password,
                        // ip: this.IPAddress ? this.IPAddress : localStorage.getItem('local_session'),
                        // time: new Date(),
                        // location: this.Location ? this.Location : 'n/a'
                        type: 'email'
                    }
                };

                await this.POST(email.api, email.param, 'BASIC', (data) => {
                    let body = {
                        EVENT_NAME: 'DigitalPass_LoginEmail',
                        MODULE: 'LOGIN',
                        METHOD: 'POST',
                        API: email.api,
                        JSON: email.param,
                        RESPONSE_API: data,
                        PATH: window.location.pathname,
                        LOCATION: this.Data.Location.City,
                        DATE: new Date()
                    };

                    this.HelperAddCollectionFirebase('LOG', body, (callback) => {
                    });

                    if (data.code === 200) {
                        this.Data.ReturnAPI = data;
                        if (data.content[0].role.role_name !== null) {
                            if (this.isRememberMe) {
                                expiredDay = 30;
                            }
                            this.CookiesLogin({
                                ...data.content[0],
                                ...{
                                    loginWith: email.with
                                }
                            }, expiredDay);
                            this.LoginStrategies(data.content[0]);
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
            RedirectLupaPassword() {
                window.location.href = `${window.location.origin}/lupa-password`;
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
