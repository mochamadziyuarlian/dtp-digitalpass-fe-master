<template>
    <div>
        <div class="" style="margin-top: 2.1rem;">
            <a href="javascript:void(0);" @click="RedirectLogin()" class="text-red font-size-16">
                <em class="fa fa-arrow-left mr-3"></em> Masuk ke Digitalpass
            </a>
        </div>

        <div style="margin-top: 8rem;">
            <p class="text-center font-size-28 font-weight-700 text-black">Lupa Kata Sandi</p>
        </div>

        <form class="auth" style="margin-top: 4rem;" @submit.prevent="forgotPassword">
            <div class="form-group">
                <label class="form-control-label">
                    Email
                </label>
                <input 
                    type="text" 
                    class="form-control" 
                    v-model.trim="$v.auth.email.$model"
                    :class="{ 'is-invalid': $v.auth.email.$error }"
                >
                <span class="invalid-feedback">
                    <span v-if="!$v.auth.email.required">Email tidak boleh kosong.</span>
                    <span v-if="!$v.auth.email.email">Email tidak sesuai.</span>
                </span>
            </div>
            <button 
                type="button" 
                @click="forgotPassword" 
                class="btn btn-user btn-block btn-red font-weight-bold"
                :disabled="$v.auth.$invalid"
            >
                Kirim
            </button>
        </form>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        required,
        email
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [mixins],
        layout: 'auth',
        data() {
            return {
                auth: {
                    email: '',
                },
            }
        },
        validations: {
            auth: {
                email: {
                    required,
                    email
                }
            }
        },
        mounted() {
        },
        methods: {
            forgotPassword() {
                const obj = {
                    email: this.auth.email,
                };
                this.POST(`/api/v3/user/link-change-password`, obj, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Swal('success', 'Email Reset Telah Dikirim',
                            'Permintaan Ubah Password telah dikirimkan ke email Anda. Silahkan buka email Anda untuk menyelesaikan tahap selanjutnya.'
                        );
                    } else {
                        this.Swal('error', 'Email Reset Gagal Dikirim', data.message);
                    }
                });
            },
            RedirectLogin() {
                window.location.href = `${window.location.origin}/login`;
            }
        }
    }

</script>

<style scoped>
    button {
        height: 46px !important;
    }

</style>
