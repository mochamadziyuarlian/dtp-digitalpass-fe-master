<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.text.$error }">
                        Text<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Text"
                        :class="{ 'is-invalid': $v.Form.text.$error }" v-model.trim="$v.Form.text.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.text.required">
                            Text tidak boleh kosong.
                        </span>
                        <span v-if="!$v.Form.text.minLength">
                            Masukkan minimal
                            {{ $v.Form.text.$params.minLength.min }}
                            karakter.
                        </span>
                        <span v-if="!$v.Form.text.maxLength">
                            Masukkan maksimal
                            {{ $v.Form.text.$params.maxLength.max }}
                            karakter.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/mini-survey" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="CreateSLA()">
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
        minLength,
        maxLength,
        required
    } from 'vuelidate/lib/validators';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Mini Survey',
                Form: {
                    text: null
                }
            }
        },
        validations: {
            Form: {
                text: {
                    minLength: minLength(5),
                    maxLength: maxLength(50),
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Tambahkan Mini Survey',
                menu: []
            }]);
        },
        methods: {
            CreateSLA() {
                this.HelperConfirm(this.module, 'create').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            text: this.Form.text
                        };
                        this.Request('POST', '/api/v3/mini-survey2/create', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
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
            }
        }
    }

</script>
