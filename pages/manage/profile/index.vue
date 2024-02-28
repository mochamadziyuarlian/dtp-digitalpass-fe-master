<template>
    <div>
        <div class="mb-4">
            <form>
                <div class="form-group form-dsa">
                    <label>
                        Ubah Photo
                    </label>
                    <div>
                        <b-avatar :src="Form.photo" size="80px"></b-avatar>
                        <input type="file" id="change-photo" class="d-none" @change="ChangePhotoProfile($event)"
                            accept="image/x-png,image/jpeg" />
                        <button type="button" class="btn btn-dsa-warning px-2 ml-2" onclick="$('#change-photo').click();">
                            <img src="/icon/table/edit.svg">
                        </button>
                    </div>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.name.$error }">
                        Nama Lengkap
                    </label>
                    <input type="text" class="form-control" placeholder="Nama Lengkap"
                        :class="{ 'is-invalid': $v.Form.name.$error }" v-model.trim="$v.Form.name.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.name.required">
                            Nama Lengkap tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="form-group form-dsa">
                    <label :class="{ 'text-dsa-danger': $v.Form.phone.$error }">
                        Nomor Telefon
                    </label>
                    <input type="text" class="form-control" placeholder="Nomor Telefon"
                        :class="{ 'is-invalid': $v.Form.phone.$error }" v-model.trim="$v.Form.phone.$model">
                    <span class="invalid-feedback pt-1">
                        <span v-if="!$v.Form.phone.required">
                            Nomor Telefon tidak boleh kosong.
                        </span>
                    </span>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-dsa-outline-primary btn-lg mr-2" @click="SetValue()">
                        <span class="font-size-16 font-weight-600">
                            Batalkan
                        </span>
                    </button>
                    <button type="button" class="btn btn-dsa-primary btn-lg ml-2" :disabled="$v.$invalid"
                        @click="UpdateProfile()">
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
    required,
    minLength,
    helpers
} from 'vuelidate/lib/validators';

const regexPhoneNumber = helpers.regex('regexPhoneNumber', /^08[0-9]*$/);

export default {
    layout: 'cms/default',
    mixins: [mixins],
    data() {
        return {
            module: 'Profile',
            Form: {
                id: null,
                name: null,
                phone: null,
                photo: null
            },
            Photo: {
                profile: []
            }
        }
    },
    validations: {
        Form: {
            name: {
                required
            },
            phone: {
                minLength: minLength(10),
                regexPhoneNumber,
                required
            }
        }
    },
    mounted() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Profile',
            menu: []
        }]);
        this.SetValue();
    },
    methods: {
        SetValue() {
            this.Request('GET', '/api/v3/user-profile', null, null, 'BEARER', (callback) => {
                if (callback.code === 200) {
                    this.Form.id = callback.content.id;
                    this.Form.name = callback.content.name;
                    this.Form.phone = callback.content.phone;
                    this.Form.photo = callback.content.photo;
                } else {
                    this.HelperErrorCode(callback);
                };
            });
        },
        ChangePhotoProfile(event) {
            this.Photo.profile = [];
            if (event.target.files[0] !== undefined) {
                this.Photo.profile.push({
                    id: event.target.files[0].id,
                    fileName: event.target.files[0].name,
                    fileSize: event.target.files[0].size,
                    file: event.target.files[0],
                    type: event.target.files[0].type,
                })
            };
            this.UpdatePhotoProfile();
        },
        UpdatePhotoProfile() {
            const formData = new FormData();
            for (let x of this.Photo.profile) {
                formData.append('request_id', x.id);
                formData.append('name', x.fileName);
                formData.append('imgFile', x.file);
                formData.append('type', x.type);
                formData.append('file_type', 'lampiran');
                formData.append('created_by', this.UserLogin().id);
            };
            this.Request('POST', '/api/v3/request-attachment/create', null, formData, 'BASIC', (
                callback) => {
                if (callback.code === 200) {
                    this.Form.photo = URL.createObjectURL(this.Photo.profile[0].file);

                    const body = {
                        id: this.Form.id,
                        name: this.Form.name,
                        phone: this.Form.phone,
                        photo: callback.content.data.path
                    };
                    this.Request('POST', '/api/v3/user-update-profile', null, body, 'BEARER', (
                        callback) => {
                        if (callback.code === 200) {
                            this.HelperSuccessCode(this.module, 'update').then((result) => {
                                if (result.isConfirmed) {
                                    this.SetValue();
                                }
                            });
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });

                } else {
                    this.HelperErrorCode(callback);
                };
            });
        },
        UpdateProfile() {
            this.HelperConfirm(this.module, 'update').then((result) => {
                if (result.isConfirmed) {
                    let body = {
                        name: this.Form.name,
                        phone: this.Form.phone,
                    };
                    this.Request('POST', '/api/v3/user-update-profile', null, body, 'BEARER', (
                        callback) => {
                        if (callback.code === 200) {
                            this.HelperSuccessCode(this.module, 'update').then((result) => {
                                if (result.isConfirmed) {
                                    this.SetValue();
                                }
                            });
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });
                };
            });
        },
    },
};

</script>
