<template>
    <div>
        <div style="margin-top: 6rem;">
            <p class="text-center font-size-28 font-weight-700 text-black">Kata Sandi Baru</p>
        </div>

        <form class="auth" style="margin-top: 2rem;">
            <div class="form-group">
                <label class="form-control-label">
                    Kata sandi baru
                </label>
                <div class="input-group">
                    <input 
                        :type="passwordTypeNew" 
                        class="form-control" 
                        v-model.trim="$v.data.NewPassword.$model"
                        :class="{ 'is-invalid': $v.data.NewPassword.$error }" 
                        placeholder="Buat kata sandi"
                    />
                    <div class="input-group-append cursor-pointer" @click="switchVisibilityNew">
                        <span class="input-group-text showPassword" id="basic-password">
                            <i :class="passwordTypeNew === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                        </span>
                    </div>
                </div>
                <span v-if="$v.data.NewPassword.$error">
                    <small class="text-red" v-if="!$v.data.NewPassword.required">
                        Gunakan minimal 8 karakter dengan campuran huruf, angka & simbol
                    </small>
                    <small class="text-red" v-if="!$v.data.NewPassword.minLength">
                        Kata Sandi Minimal
                        {{ $v.data.NewPassword.$params.minLength.min }}.
                    </small>
                </span>
            </div>
            <div class="form-group">
                <label class="form-control-label">
                    Ulangi kata sandi
                </label>
                <div class="input-group">
                    <input 
                        :type="passwordTypeConfirm" 
                        class="form-control" 
                        v-model.trim="$v.data.ConfirmPassword.$model"
                        :class="{ 'is-invalid': $v.data.ConfirmPassword.$error }" 
                        placeholder="Konfirmasi kata sandi"
                        @keydown.enter="changePassword"
                    />
                    <div class="input-group-append cursor-pointer" @click="switchVisibilityConfirm">
                        <span class="input-group-text showPassword" id="basic-password">
                            <i :class="passwordTypeConfirm === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                        </span>
                    </div>
                </div>

                <span v-if="$v.data.ConfirmPassword.$error">
                    <small class="text-red" v-if="!$v.data.ConfirmPassword.sameAsPassword">
                        Kata sandi harus sama.
                    </small>
                </span>
            </div>
            <button 
                type="button" 
                :disabled="$v.data.$invalid"
                @click="changePassword" 
                class="btn btn-user btn-block btn-red font-weight-bold"
            >
                Ubah Kata Sandi
            </button>
        </form>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        minLength,
        maxLength,
        sameAs
    } from 'vuelidate/lib/validators';
    import md5 from 'md5';

    export default {
        mixins: [mixins],
        layout: 'auth',
        data() {
            return {
                passwordTypeNew: 'password',
                passwordTypeConfirm: 'password',
                data: {
                    NewPassword: '',
                    ConfirmPassword: '',
                },
                validation: {
                    isValidOldPassword: ''
                },
                InformationUser: null
            }
        },
        validations: {
            data: {
                NewPassword: {
                    required,
                    minLength: minLength(8)
                },
                ConfirmPassword: {
                    required,
                    sameAsPassword: sameAs('NewPassword')
                },
            }
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
        mounted() {
            this.GetInformationUser();
        },
        methods: {
            GetInformationUser() {
                this.InformationUser = this.$route.query;
            },
            async changePassword() {
                const payload = {
                    id: this.$route.params.id,
                    password: md5(this.data.NewPassword),
                    confirm_password: md5(this.data.ConfirmPassword)
                };

                this.POST(`/api/v3/user/change-password`, payload, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.SwalSuccess('Berhasil mengubah kata sandi.', '').then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = `${window.location.origin}/login/email`;
                            }
                        });
                    } else {
                        this.HelperErrorCode(data);
                    }
                });
            },
            switchVisibilityNew() {
                this.passwordTypeNew = this.passwordTypeNew === 'password' ? 'text' : 'password';
            },
            switchVisibilityConfirm() {
                this.passwordTypeConfirm = this.passwordTypeConfirm === 'password' ? 'text' : 'password';
            },
        }
    }

</script>

<style scoped>
    button {
        height: 46px !important;
    }

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
