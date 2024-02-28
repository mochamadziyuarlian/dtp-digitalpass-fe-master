<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.question.$error }">
                        Judul Pertanyaan<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Judul pertanyaan"
                        :class="{ 'is-invalid': $v.Form.question.$error }" v-model.trim="$v.Form.question.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.question.required">
                            Judul Pertanyaan tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.answer.$error }">
                        Jawaban Pertanyaan<span class="required">*</span>
                    </label>
                    <no-ssr>
                        <vue-editor :class="{ 'is-invalid is-invalid-vue-editor': $v.Form.answer.$error }"
                            v-model.trim="$v.Form.answer.$model"></vue-editor>
                    </no-ssr>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.answer.required">
                            Jawaban Pertanyaan tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <div>
                        <label :class="{ 'text-dsa-danger': $v.Form.status.$error }">
                            Status<span class="required">*</span>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="publish" value="1"
                            v-model="$v.Form.status.$model">
                        <label class="form-check-label" for="publish">Publish</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="draft" value="0"
                            v-model="$v.Form.status.$model">
                        <label class="form-check-label" for="draft">Not Publish</label>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-faq" class="btn btn-dsa-outline-primary btn-lg mr-2">
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
        required
    } from 'vuelidate/lib/validators';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'FAQ',
                Form: {
                    question: null,
                    answer: null,
                    status: null,
                }
            }
        },
        validations: {
            Form: {
                question: {
                    required
                },
                answer: {
                    required
                },
                status: {
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Ubah Kelola FAQ',
                menu: []
            }]);
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                this.Request('GET', '/api/v3/faq/' + id.id, null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        for (let x of callback.content) {
                            this.Form.question = x.question;
                            this.Form.answer = x.answer;
                            this.Form.status = x.status;
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
                            id: this.$route.params.id,
                            question: this.Form.question,
                            answer: this.Form.answer,
                            status: `${this.Form.status}`
                        };
                        this.Request('PUT', '/api/v3/faq/update', null, body, 'BEARER', (callback) => {
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
