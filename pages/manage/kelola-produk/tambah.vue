<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="row">
                    <div class="col-xl-12">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.name.$error }">
                                Nama Produk<span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" placeholder="Nama Produk"
                                :class="{ 'is-invalid': $v.Form.name.$error }" v-model.trim="$v.Form.name.$model">
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.name.required">
                                    Nama Produk tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- <div class="col-xl-2">
                        <div class="form-group form-dsa">
                            <label :class="{ 'text-dsa-danger': $v.Form.status.$error }">
                                Status Produk<span class="required">*</span>
                            </label>
                            <select class="form-control" ref="statusSelect" :class="{
                                'badge-success-detail': $v.Form.status.$model === 'APPROVED',
                                'badge-danger-detail': $v.Form.status.$model === 'CLOSED',
                                'badge-warning-detail': $v.Form.status.$model === 'DRAFT',
                                'is-invalid': $v.Form.status.$error
                            }" v-model.trim="$v.Form.status.$model">
                                <option 
                                v-for="(item, index) of Data.Status" 
                                :key="index" :value="item.name"
                                style="background-color: #FFF; color: #151718;">
                                    {{ item.name }}
                                </option>
                            </select>
                            <span class="invalid-feedback pt-1">
                                <span v-if="!$v.Form.status.required">
                                    Status Produk tidak boleh kosong.
                                </span>
                            </span>
                        </div>
                    </div> -->
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.description.$error }">
                        Deskripsi Produk<span class="required">*</span>
                    </label>
                    <no-ssr>
                        <vue-editor :class="{ 'is-invalid is-invalid-vue-editor': $v.Form.description.$error }"
                            v-model.trim="$v.Form.description.$model"></vue-editor>
                    </no-ssr>
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.description.required">
                            Deskripsi Produk tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <nuxt-link to="/manage/kelola-produk" class="btn btn-dsa-outline-primary btn-lg mr-2">
                        <span class="font-size-16 font-weight-600">
                            Batal
                        </span>
                    </nuxt-link>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="CreateProduct()">
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
            module: 'Produk',
            Form: {
                name: null,
                description: null,
                tribe_id: null,
                status: null
            }, 
            // Data: {
            //     Status: [
            //         {
            //             name: 'DRAFT'
            //         },
            //         {
            //             name: 'APPROVED'
            //         },
            //         {
            //             name: 'CLOSED'
            //         },
            //     ]
            // }
        }
    },
    validations: {
        Form: {
            // status: {
            //     required
            // },
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
            title: 'Tambahkan Kelola Produk',
            menu: []
        }]);
    },
    methods: {
        CreateProduct() {
            this.HelperConfirm(this.module, 'create').then((result) => {
                if (result.isConfirmed) {
                    let body = {
                        name: this.Form.name,
                        description: this.Form.description,
                        tribe_id: this.Form.tribe_id,
                        status: this.Form.status
                    };
                    this.Request('POST', '/api/v3/product/create', null, body, 'BEARER', (callback) => {
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
        }, 
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

.vue-treeselect.is-invalid {
    border: 1px solid red !important;
    border-radius: 5px !important;
}

.badge-warning-detail {
    background-color: #FFE7D1;
    color: #F2994A;
}

.badge-success-detail {
    background-color: #E0FFD1;
    color: #8DC26F;
}

.badge-danger-detail {
    background-color: #FFF7F7;
    color: #ED2B24;
}

</style>
