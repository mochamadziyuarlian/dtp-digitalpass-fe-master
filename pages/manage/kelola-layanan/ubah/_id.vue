<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.name.$error }">
                        Jenis Layanan<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Jenis Layanan"
                        :class="{ 'is-invalid': $v.Form.name.$error }" v-model.trim="$v.Form.name.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.name.required">
                            Jenis Layanan tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.description.$error }">
                        Konten<span class="required">*</span>
                    </label>
                    <no-ssr>
                        <vue-editor :class="{ 'is-invalid is-invalid-vue-editor': $v.Form.description.$error }"
                            v-model.trim="$v.Form.description.$model"></vue-editor>
                    </no-ssr>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.description.required">
                            Konten tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-layanan" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="UpdateLayanan()">
                        <span class="font-size-16 font-weight-600">
                            Simpan
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
                module: 'Layanan',
                Form: {
                    name: null,
                    description: null,
                }
            }
        },
        validations: {
            Form: {
                name: {
                    required
                },
                description: {
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Konten Kelola Layanan',
                menu: []
            }]);
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                this.Request('GET', '/api/v3/service/' + id.id, null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        for (let x of callback.content) {
                            this.Form.name = x.name;
                            this.Form.description = x.description;
                        }
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            UpdateLayanan() {
                this.HelperConfirm(this.module, 'update').then((result) => {
                    if (result.isConfirmed) {
                        const body = new FormData();
                        body.append('id', this.$route.params.id);
                        body.append('name', this.Form.name);
                        body.append('description', this.Form.description);
                        this.Request('PUT', '/api/v3/service/update', null, body, 'BEARER', (callback) => {
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
