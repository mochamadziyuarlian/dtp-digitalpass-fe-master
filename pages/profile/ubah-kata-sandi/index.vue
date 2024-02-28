<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-8 col-md-6 mt-5">
                <div class="col-lg-12">
                    <div class="p-5">
                        <p class="font-size-24 text-black">Ubah Kata Sandi</p>
                        <div id="stepOldPassword">
                            <div class="form-group">
                                <label>Kata sandi lama</label>
                                <div class="input-group">
                                    <!-- FIXME: update code  -->
                                    <input :type="passwordTypeOld" class="form-control form-control-user"
                                        @keydown.enter="checkPassword()"
                                        :class="{ 'is-invalid': $v.OldPassword.$error }"
                                        v-model.trim="$v.OldPassword.$model" placeholder="Masukan Password">
                                    <div class="input-group-append cursor-pointer" @click="switchVisibilityOld">
                                        <span class="input-group-text" id="basic-password">
                                            <i
                                                :class="passwordTypeOld === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="invalid-feedback">
                                    <span v-if="!$v.OldPassword.required">Kata sandi tidak boleh kosong.</span>
                                    <span v-if="!$v.OldPassword.minLength">
                                        Kata Sandi Minimal
                                        {{ $v.OldPassword.$params.minLength.min }}.
                                    </span>
                                    <span v-if="!$v.OldPassword.maxLength">
                                        Kata Sandi Maximal
                                        {{ $v.OldPassword.$params.maxLength.max }}.
                                    </span>
                                </div>
                                <span class="font-size-10">Silahkan diisi dengan kata sandi lama</span>
                            </div>
                            <button type="button" class="btn btn-user btn-block btn-red font-weight-bold"
                                :class="!$v.OldPassword.required || !$v.OldPassword.required || !$v.OldPassword.minLength ? 'disabled' : ''"
                                @click="checkPassword">
                                Lanjutkan
                            </button>
                        </div>
                        <div class="d-none" id="stepNewPassword">
                            <div class="form-group">
                                <label class="form-control-label"
                                    :class="{ 'text-red-main': $v.NewPassword.$error }">Masukkan kata sandi baru</label>
                                <div class="input-group">
                                    <input :type="passwordTypeNew" class="form-control"
                                        v-model.trim="$v.NewPassword.$model"
                                        :class="{ 'is-invalid': $v.NewPassword.$error }" placeholder="Masukan Password">
                                    <div class="input-group-append cursor-pointer" @click="switchVisibilityNew">
                                        <span class="input-group-text" id="basic-password">
                                            <i
                                                :class="passwordTypeNew === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                        </span>
                                    </div>
                                </div>

                                <span class="invalid-feedback">
                                    <span v-if="!$v.NewPassword.required">Kata sandi tidak boleh kosong.</span>
                                    <span v-if="!$v.NewPassword.minLength">
                                        Kata Sandi Minimal
                                        {{ $v.NewPassword.$params.minLength.min }}.
                                    </span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label class="form-control-label"
                                    :class="{ 'text-red-main': $v.ConfirmPassword.$error }">Ulangi kata sandi</label>
                                <div class="input-group">
                                    <input :type="passwordTypeConfirm" class="form-control"
                                        v-model.trim="$v.ConfirmPassword.$model"
                                        :class="{ 'is-invalid': $v.ConfirmPassword.$error }"
                                        placeholder="Konfirmasi Password">
                                    <div class="input-group-append cursor-pointer" @click="switchVisibilityConfirm">
                                        <span class="input-group-text" id="basic-password">

                                            <i
                                                :class="passwordTypeConfirm === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                                </span>
                                    </div>
                                </div>
                                <span class="invalid-feedback">
                                    <span v-if="!$v.ConfirmPassword.required">Kata sandi tidak boleh kosong.</span>
                                    <span v-if="!$v.NewPassword.sameAsPassword">Kata sandi tidak sama.</span>
                                </span>
                            </div>
                            <button type="button" :disabled="notSamePasswords ? notSamePasswords : false"
                                @click="changePassword" class="btn btn-user btn-block btn-red font-weight-bold">
                                Ubah Kata Sandi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        minLength,
        maxLength,
        sameAs
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [mixins],
        layout: 'portal/profile',
        data() {
            return {
                passwordTypeNew: 'password',
                passwordTypeOld: 'password',
                passwordTypeConfirm: 'password',
                OldPassword: '',
                NewPassword: '',
                ConfirmPassword: '',
                validation: {
                    isValidOldPassword: ''
                }
            }
        },
        validations: {
            OldPassword: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(50)
            },
            NewPassword: {
                required,
                minLength: minLength(8)
            },
            ConfirmPassword: {
                required,
                sameAsPassword: sameAs('NewPassword')
            },
        },
        computed: {
            notSamePasswords() {
                if (this.NewPassword !== this.ConfirmPassword) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        methods: {
            lanjutkan() {
                var elementOldPassword = document.getElementById('stepOldPassword');
                var elementNewPassword = document.getElementById('stepNewPassword');
                elementNewPassword.classList.remove('d-none');
                elementOldPassword.classList.add('d-none');
                elementNewPassword.classList.add('d-block');
            },
            checkPassword() {
                const obj = {
                    old_password: this.OldPassword
                };
                this.POST(`/api/v2/auth/check-password`, obj, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.lanjutkan();
                    } else {
                        this.validation.isValidOldPassword = 'is-invalid';
                        let responseMessage = '';
                        if (data.code === 404) {
                            responseMessage = 'Password yang anda masukan salah!';
                        } else {
                            responseMessage = 'Password tidak boleh kosong';
                        }
                        this.ErrorCode(data.code, responseMessage);
                    }
                });
            },
            changePassword() {
                const obj = {
                    old_password: this.OldPassword,
                    password: this.NewPassword
                }
                this.POST(`/api/v2/auth/change-password`, obj, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.SwalSuccess('Berhasil mengubah kata sandi.', '').then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = `${window.location.origin}/profile`;
                            }
                        });
                    } else {
                        this.ErrorCode(data.code, data.message);
                    }
                });
            },
            switchVisibilityNew() {
                this.passwordTypeNew = this.passwordTypeNew === 'password' ? 'text' : 'password';
            },
            switchVisibilityOld() {
                this.passwordTypeOld = this.passwordTypeOld === 'password' ? 'text' : 'password';
            },
            switchVisibilityConfirm() {
                this.passwordTypeConfirm = this.passwordTypeConfirm === 'password' ? 'text' : 'password';
            },

        }
    }

</script>

<style scoped>
    .limiter {
        width: 100%;
        margin: 0 auto;
    }

    .container-login100 {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 15px;
    }

    .wrap-login100 {
        width: 500px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
    }

</style>
