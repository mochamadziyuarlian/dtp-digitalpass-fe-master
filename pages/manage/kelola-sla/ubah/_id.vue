<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.phase_1.$error }">
                                Phase 1<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Phase 1"
                                    :class="{ 'is-invalid': $v.Form.phase_1.$error }"
                                    v-model.trim="$v.Form.phase_1.$model">
                                <div class="input-group-prepend">
                                    <div class="input-group-text right">
                                        <span class="text-dsa-success">
                                            Hari
                                        </span>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.phase_1.required">
                                        Phase 1 tidak boleh kosong.
                                    </span>
                                    <span v-if="!$v.Form.phase_1.minLength">
                                        Masukkan minimal
                                        {{ $v.Form.phase_1.$params.minLength.min }}
                                        karakter.
                                    </span>
                                    <span v-if="!$v.Form.phase_1.maxLength">
                                        Masukkan maksimal
                                        {{ $v.Form.phase_1.$params.maxLength.max }}
                                        karakter.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.phase_2.$error }">
                                Phase 2<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Phase 1"
                                    :class="{ 'is-invalid': $v.Form.phase_2.$error }"
                                    v-model.trim="$v.Form.phase_2.$model">
                                <div class="input-group-prepend">
                                    <div class="input-group-text right">
                                        <span class="text-dsa-success">
                                            Hari
                                        </span>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.phase_2.required">
                                        Phase 1 tidak boleh kosong.
                                    </span>
                                    <span v-if="!$v.Form.phase_2.minLength">
                                        Masukkan minimal
                                        {{ $v.Form.phase_2.$params.minLength.min }}
                                        karakter.
                                    </span>
                                    <span v-if="!$v.Form.phase_2.maxLength">
                                        Masukkan maksimal
                                        {{ $v.Form.phase_2.$params.maxLength.max }}
                                        karakter.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.phase_3.$error }">
                                Phase 3<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Phase 1"
                                    :class="{ 'is-invalid': $v.Form.phase_3.$error }"
                                    v-model.trim="$v.Form.phase_3.$model">
                                <div class="input-group-prepend">
                                    <div class="input-group-text right">
                                        <span class="text-dsa-success">
                                            Hari
                                        </span>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.phase_3.required">
                                        Phase 1 tidak boleh kosong.
                                    </span>
                                    <span v-if="!$v.Form.phase_3.minLength">
                                        Masukkan minimal
                                        {{ $v.Form.phase_3.$params.minLength.min }}
                                        karakter.
                                    </span>
                                    <span v-if="!$v.Form.phase_3.maxLength">
                                        Masukkan maksimal
                                        {{ $v.Form.phase_3.$params.maxLength.max }}
                                        karakter.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.phase_4.$error }">
                                Phase 4<span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Phase 1"
                                    :class="{ 'is-invalid': $v.Form.phase_4.$error }"
                                    v-model.trim="$v.Form.phase_4.$model">
                                <div class="input-group-prepend">
                                    <div class="input-group-text right">
                                        <span class="text-dsa-success">
                                            Hari
                                        </span>
                                    </div>
                                </div>
                                <span class="invalid-feedback pt-1">
                                    <span v-if="!$v.Form.phase_4.required">
                                        Phase 1 tidak boleh kosong.
                                    </span>
                                    <span v-if="!$v.Form.phase_4.minLength">
                                        Masukkan minimal
                                        {{ $v.Form.phase_4.$params.minLength.min }}
                                        karakter.
                                    </span>
                                    <span v-if="!$v.Form.phase_4.maxLength">
                                        Masukkan maksimal
                                        {{ $v.Form.phase_4.$params.maxLength.max }}
                                        karakter.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-sla" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="UpdateFAQ()">
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
                    phase_1: null,
                    phase_2: null,
                    phase_3: null,
                    phase_4: null
                }
            }
        },
        validations: {
            Form: {
                phase_1: {
                    minLength: minLength(1),
                    maxLength: maxLength(3),
                    required
                },
                phase_2: {
                    minLength: minLength(1),
                    maxLength: maxLength(3),
                    required
                },
                phase_3: {
                    minLength: minLength(1),
                    maxLength: maxLength(3),
                    required
                },
                phase_4: {
                    minLength: minLength(1),
                    maxLength: maxLength(3),
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Kelola SLA',
                menu: []
            }]);
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                this.Request('GET', '/api/v3/sla2/' + id.id, null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        for (let x of callback.content) {
                            this.Form.phase_1 = x.phase_1;
                            this.Form.phase_2 = x.phase_2;
                            this.Form.phase_3 = x.phase_3;
                            this.Form.phase_4 = x.phase_4;
                        }
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            UpdateFAQ() {
                this.HelperConfirm(this.module, 'update').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            type: this.$route.params.id,
                            phase_1: this.Form.phase_1,
                            phase_2: this.Form.phase_2,
                            phase_3: this.Form.phase_3,
                            phase_4: this.Form.phase_4
                        };
                        this.Request('PUT', '/api/v3/sla2/update', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200) {
                                this.HelperSuccessCode(this.module, 'update').then((result) => {
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
