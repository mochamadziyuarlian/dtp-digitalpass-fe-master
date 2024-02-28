<template>
    <div>
        <div class="main-x pb-5">
            <div class="row pb-3">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="text-gray-dark-2 font-size-24 mb-0">Identitas Pribadi</label>
                </div>
            </div>
            <div class="border"></div>
            <div class="row pt-4">
                <div class="col-auto">
                    <b-avatar :src="Photo" size="7rem"></b-avatar>
                    <input type="file" name="photo" id="change-photo" class="d-none" @change="fileChanges($event)"
                        accept="image/x-png,image/jpeg" />
                </div>
                <div class="col-6 align-self-center">
                    <button class="btn btn-light mr-3" onclick="$('#change-photo').click();">
                        Ganti
                    </button>
                    <a :class="Photo === null || Photo === '' ? 'd-none' : ''" @click="hapus()">
                        Hapus
                    </a>
                </div>
            </div>
            <form class="pt-5">
                <div class="row">
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label class="form-control-label font-weight-bold"
                                :class="{ 'text-red-main': $v.form.NamaLengkap.$error }">Nama Lengkap</label>
                            <input type="text" class="form-control" placeholder="Nama Lengkap"
                                v-model.trim="$v.form.NamaLengkap.$model"
                                :class="{ 'is-invalid': $v.form.NamaLengkap.$error }">
                            <span class="invalid-feedback">
                                <span v-if="!$v.form.NamaLengkap.required">Masukkan nama.</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="loginMethod === 'sso'">
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label class="form-control-label font-weight-bold">NIK</label>
                            <input type="number" class="form-control" v-model="Nik" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label class="form-control-label font-weight-bold">Nomor Telepon</label>
                            <input type="number" class="form-control" placeholder="Nomor Telepon"
                                v-model="form.NomorTelepon">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label class="form-control-label font-weight-bold">Email</label>
                            <input type="text" class="form-control" v-model="form.Email" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12 d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-red btn-sm mx-1" :disabled="!IsChanged"
                            @click="batal()">Batal</button>
                        <button type="button" class="btn btn-red btn-sm mx-1" :disabled="!IsChanged"
                            @click="submit()">Simpan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import Cookies from 'js-cookie';
    import _ from 'lodash';
    import {
        required,
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [mixins],
        layout: 'portal/profile',
        data() {
            return {
                form: {
                    NamaLengkap: '',
                    NomorTelepon: '',
                    Email: '',
                },
                Nik: '',
                Photo: '',
                fileUpload: [],
                loginMethod: false,
                isRemove: false,
                checkPhoto: null,
                IsChanged: false,
                Login: false
            }
        },
        validations: {
            form: {
                NamaLengkap: {
                    required
                }
            }
        },
        computed: {
            originalForm() {
                return this.$store.state.IsChangeForm
            }
        },
        watch: {
            originalForm() {
                this.form = _.cloneDeep(this.originalForm)
            },
            form: {
                handler() {
                    this.IsChanged = !_.isEqual(this.form, this.originalForm)
                },
                deep: true,
            },
        },
        mounted() {
            this.Login = this.IsLogin();
            if (this.Login) {
                this.getProfile();
            }
        },
        methods: {
            batal() {
                this.checkPhoto = null;
                this.getProfile();
            },
            checkIsEmail() {
                if (Cookies.get('user.loginMethod') === 'email') {
                    this.loginMethod = 'email';
                } else {
                    this.loginMethod = 'sso';
                }
            },
            getProfile() {
                this.GET(`/api/v3/user/profile`, 'BEARER', (data) => {
                    this.form.NamaLengkap = data.content.name;
                    this.form.NomorTelepon = data.content.phone;
                    this.form.Email = data.content.email;
                    this.Photo = data.content.photo;
                    const obj = {
                        NamaLengkap: data.content.name,
                        NomorTelepon: data.content.phone,
                        Email: data.content.email,
                    };
                    this.$store.commit('setIsChangeForm', obj);
                    this.SetUser(data.content);
                });
            },
            fileChanges(event) {
                this.fileUpload = [];
                if (event.target.files[0] !== undefined) {
                    this.fileUpload.push({
                        fileName: event.target.files[0].name,
                        fileSize: event.target.files[0].size,
                        file: event.target.files[0],
                        type: event.target.files[0].type
                    })
                }
                this.updateProfileWithPhoto();
                this.checkPhoto = event;
            },
            hapus() {
                this.swal('confirm-remove', 'Data anda akan dihapus').then((result) => {
                    if (result.isConfirmed) {
                        this.POST(`/api/v2/user/remove-profile-picture`, {}, 'BEARER', (data) => {
                            if (data.code === 200) {
                                this.getProfile();
                                this.SwalSuccess('Berhasil menghapus gambar identitas pribadi.', '');
                                this.checkPhoto = null;
                            } else {
                                this.ErrorCode(data.code, data.message);
                            }
                        });
                    }
                });
            },
            async updateProfileWithPhoto() {
                const fd = new FormData();
                for (let x of this.fileUpload) {
                    fd.append('name', x.fileName);
                    fd.append('imgFile', x.file);
                    fd.append('type', x.type);
                    fd.append('file_type', 'lampiran');
                }
                this.POST(`/api/v2/request-attachment/create`, fd, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Photo = URL.createObjectURL(this.fileUpload[0].file);
                        const obj = {
                            name: this.form.NamaLengkap,
                            phone: this.form.NomorTelepon,
                            photo: data.content.data.path
                        }
                        this.POST(`/api/v2/user/update-profile`, obj, 'BEARER', (data) => {
                            if (data.code === 200) {
                                // this.SwalSuccess('Berhasil mengubah foto profil.', '');
                                this.getProfile();
                                this.isEdit = false;
                                this.$root.$emit('UpdateProfile', obj.name);
                                this.GET(`/api/v3/user/profile`, 'BEARER', (data) => {
                                    this.$root.$emit('UpdateFotoProfile', data.content.photo);
                                });
                            } else {
                                this.ErrorCode(data.code, data.message);
                            }
                        });
                    }
                });
            },
            updateProfileWithoutPhoto() {
                const obj = {
                    name: this.form.NamaLengkap,
                    phone: this.form.NomorTelepon,
                }
                this.POST(`/api/v2/user/update-profile`, obj, 'BEARER', (data) => {
                    if (data.code === 200) {
                        // this.SwalSuccess('Berhasil mengubah data identitas pribadi.', '');
                        this.getProfile();
                        this.$root.$emit('UpdateProfile', obj.name);
                    } else {
                        this.ErrorCode('Gagal mengubah data identitas pribadi, silahkan diulangi kembali', '');
                    }
                });
            },
            submit() {
                let getUserLogin = JSON.parse(Cookies.get('UserLogin'));
                getUserLogin.name = this.form.NamaLengkap
                this.CookiesLogin(getUserLogin);
                if (!this.checkPhoto) {
                    this.updateProfileWithoutPhoto();
                } else {
                    this.updateProfileWithPhoto();
                }
            }
        }
    }

</script>

<style scoped>
    .img-profile {
        width: 110px;
        height: 110px;
        border-radius: 50%;
    }

    .edit-profile {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 20px;
        right: 10px;
    }

</style>
