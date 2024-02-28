<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.role.$error }">
                        Nama Peran<span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Masukkan Nama"
                        :class="{ 'is-invalid': $v.Form.role.$error }" v-model.trim="$v.Form.role.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.role.required">
                            Nama Peran tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.permission.$error }">
                        <span class="text-dsa-danger">*</span>
                        Permission
                    </label>
                    <treeselect class="treeselect" v-model="Form.permission" :multiple="true" :options="allPermission"
                        :flat="true" />
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-peran" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="CreatePeran()">
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

    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        components: {
            Treeselect
        },
        data() {
            return {
                module: 'Peran',
                Form: {
                    role: null,
                    permission: []
                },
                allPermission: []
            }
        },
        validations: {
            Form: {
                role: {
                    required
                },
                permission: {
                    required
                }
            },
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Tambahkan Kelola Peran',
                menu: []
            }]);
            this.ShowAllPermission();
        },
        methods: {
            CreatePeran() {
                this.HelperConfirm(this.module, 'create').then((result) => {
                    if (result.isConfirmed) {
                        let body = {
                            name: this.Form.role,
                            permission: this.Form.permission
                        };
                        this.Request('POST', '/api/v3/role/create', null, body, 'BEARER', (callback) => {
                            if (callback.code === 200 || callback.code === 201) {
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
            },
            ShowAllPermission() {
                this.allPermission = [];
                this.Request('GET', '/api/v3/permissionTree', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.allPermission = callback.content[0].permission;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>

<style scoped>
    .treeselect /deep/ .vue-treeselect__control {
        height: 56px !important;
        border: 0;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    .treeselect /deep/ .vue-treeselect__multi-value-label {
        font-size: 14px;
    }

     .treeselect /deep/ .vue-treeselect__placeholder {
        top: 10px;
    }

</style>
