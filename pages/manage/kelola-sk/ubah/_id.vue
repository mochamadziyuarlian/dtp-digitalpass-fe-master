<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.name.$error }">
                        Judul Syarat dan Ketentuan<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Judul syarat dan ketentuan"
                        :class="{ 'is-invalid': $v.Form.name.$error }" v-model.trim="$v.Form.name.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.name.required">
                            Judul Syarat dan Ketentuan tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.value.$error }">
                        Konten<span class="required">*</span>
                    </label>
                    <vue-editor :class="{ 'is-invalid is-invalid-vue-editor': $v.Form.value.$error }"
                        v-model.trim="$v.Form.value.$model"></vue-editor>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.value.required">
                            Konten tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-sk" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="UpdateSyaratKetentuan()">
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
        required
    } from 'vuelidate/lib/validators';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Syarat & Ketentuan',
                Form: {
                    name: null,
                    value: null,
                }
            }
        },
        validations: {
            Form: {
                name: {
                    required
                },
                value: {
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Syarat dan Ketentuan',
                menu: []
            }]);
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                let body = {
                    type: id.id
                };
                this.Request('POST', '/api/v3/term-condition/byType', null, body, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Form.name = callback.content.name;
                        this.Form.value = callback.content.value;
                    } else {
                        this.HelperErrorCode(callback);
                    };

                });
            },
            UpdateSyaratKetentuan() {
                this.HelperConfirm(this.module, 'update').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            name: this.Form.name,
                            value: this.Form.value
                        };
                        this.Request('PUT', '/api/v3/term-condition/update/' + this.$route.params.id
                            .toLowerCase(), null, body, 'BEARER', (callback) => {
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

<style scoped>
    /* Quill Editor */
    ::v-deep .quillWrapper {
        background-color: white;
        box-shadow: 10px 24px 30px rgb(138 138 138 / 2%);
        border-radius: 4px;
    }

    ::v-deep .ql-toolbar.ql-snow {
        border: 0;
        border-bottom: 1px solid #C4C4C4;
        margin-left: 24px;
        margin-right: 24px;

        padding-bottom: 15px !important;
        padding-top: 15px !important;
    }

    ::v-deep .ql-container {
        border: 0 !important;
    }

    ::v-deep .ql-container.ql-snow {
        margin-left: 9px;
        margin-right: 9px;

        height: 320px !important;
    }

</style>
