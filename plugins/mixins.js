import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import $axios from 'axios';
import {
    db
} from '@/plugins/firebase.js';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    Timestamp,
    orderBy
} from "firebase/firestore";
import {
    USER_ACCESS
} from '@/config/constant.js';

const app = require('~/app.json');
const config = app.config[process.env.ENV || 'development'];

const BASE_URL = config.base_url;
const BASE_URL_SF = config.base_url_sf;
const BASE_URL_IDO = config.base_url_ido;

const HEADERS_BASIC = {
    headers: {
        'Authorization': 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};

const HEADERS_BEARER = {
    headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};


const HEADERS_BASIC_SF = {
    headers: {
        'Authorization': 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};


const MiniSurvey = {};

export default {
    methods: {
        async POST(url, param, headers, callback) {
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            await this.$axios.post(`${BASE_URL}${url}`, param, options).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    return callback(error.response.data);
                });
        },
        async GET(url, headers, callback) {
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            await this.$axios.get(`${BASE_URL}${url}`, options).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    return callback(error.response.data);
                });
        },
        async PUT(url, param, headers, callback) {
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            await this.$axios.put(`${BASE_URL}${url}`, param, options).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    return callback(error.response.data);
                });
        },
        async DELETE(url, param, headers, callback) {
            const BASIC = {
                'Authorization': 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
                'Content-Type': 'application/json',
            };
            const BEARER = {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json',
            };
            const options = headers === 'BASIC' ? BASIC : BEARER;
            var axios = require('axios');
            var config = {
                method: 'delete',
                url: `${BASE_URL}${url}`,
                headers: options,
                data: param
            };

            axios(config)
                .then(function (response) {
                    return callback(response.data);
                })
                .catch(function (error) {
                    return callback(error.response.data);
                });
        },
        async HelperGetNotification(callback) {
            await $axios.get(`${BASE_URL}/api/v3/notification`, HEADERS_BEARER).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    const code = parseInt(error.response && error.response.status)
                    if (code === 401) {
                        this.CookiesLogout();
                    }
                });
        },
        async HelperReadAllNotification(param, callback) {
            await $axios.put(`${BASE_URL}/api/v3/notification/setAsRead`, param, HEADERS_BEARER).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    const code = parseInt(error.response && error.response.status)
                    if (code === 401) {
                        this.CookiesLogout();
                    }
                });
        },
        async HelperDetailNotification(param, callback) {
            await $axios.put(`${BASE_URL}/api/v3/notification/setAsRead`, param, HEADERS_BEARER).then(response => {
                    return callback(response.data);
                })
                .catch(error => {
                    const code = parseInt(error.response && error.response.status)
                    if (code === 401) {
                        this.CookiesLogout();
                    }
                });
        },
        async ChangePassword(param, callback) {
            const options = {
                'Authorization': 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
                'Content-Type': 'application/json',
            };
            var axios = require('axios');
            var config = {
                method: 'POST',
                url: `${BASE_URL}/api/auth/change-password`,
                headers: options,
                data: param
            };
            axios(config)
                .then(function (response) {
                    return callback(response.data);
                })
                .catch(function (error) {
                    return callback(error.response.data);
                });
        },
        async HelperSalesforceGetTotalData(url, data, callback) {
            const options = {
                'Authorization': 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            };
            var axios = require('axios');
            var config = {
                method: 'POST',
                url: `${BASE_URL}${url}`,
                headers: options,
                data: data
            };
            axios(config)
                .then(function (response) {
                    return callback(response.data);
                })
                .catch(function (error) {
                    return callback(error.response.data);
                });

        },
        async HelperExternalAPI(method, url, param, data, callback) {
            const options = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            };
            var axios = require('axios');
            var config = {
                method: method,
                url: `${url}`,
                headers: options,
                params: param,
                data: data
            };
            axios(config)
                .then(function (response) {
                    return callback(response.data);
                })
                .catch(function (error) {
                    return callback(error.response.data);
                });

        },
        HelperCheckHasAccessServiceOperation(email, callback) {
            // ini harus dihapus ingetin siapapun, soalnya ini untuk bypass akun saja
            if (email === 'telkom-bypass@telkom.co.id' && BASE_URL === 'http://dtp-dsa-backend-dev.vsan-apps.playcourt.id') {
                let obj = {
                    data: {
                        product: ["Lainnya", "Bima", "Bonum", "gameQoo", "IndiBox", "IndiHome Smart", "Mypertamina", "PeduliLindungi", "Pijar Mahir", "Playcourt", "Qren", "Sakoo", "SIIS", "T-Money", "Umeetme", "BTPKLW", "MPS", "Sertifikat PL", "Pijar Sekolah", "LoRaWan", "DigitalPass", "Non Produk"]
                    },
                    isAccess: true
                };
                return callback(obj);
            } else {
                const options = {
                    'Authorization': 'Bearer ' + Cookies.get('token'),
                    'Content-Type': 'application/json',
                };
                var axios = require('axios');
                var config = {
                    method: 'GET',
                    url: `${BASE_URL}/api/v3/pageAuthorization/${email}`,
                    headers: options,
                };
                axios(config)
                    .then(function (response) {

                        let data = response.data;
                        if (data.content.length !== 0) {
                            let obj = {
                                data: {
                                    product: data.content[0].product
                                },
                                isAccess: true
                            };
                            return callback(obj);
                        } else {
                            let obj = {
                                data: {
                                    product: []
                                },
                                isAccess: false
                            };
                            return callback(obj);
                        }

                        // let userAccess = response.data.content;
                        // let x = userAccess.some(x => {
                        //     return x.email === email;
                        // });
                        // let product = userAccess.find(x => {
                        //     return x.email === email;
                        // });
                        // let obj = {
                        //     data: product,
                        //     isAccess: product.product !== null ? x : false
                        // };
                        // return callback(obj);
                    });
            }

        },
        async HeplerGetPageAuthorization(url, params, callback) {
            const options = {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            };
            var axios = require('axios');
            var config = {
                method: 'GET',
                url: `${BASE_URL}${url}`,
                headers: options,
                params: params
            };
            axios(config)
                .then(function (response) {
                    return callback(response.data);
                })
                .catch(function (error) {
                    return callback(error.response.data);
                });
        },
        KFormater(num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(
                num) * Math.abs(num)
        },
        SUM(obj) {
            var sum = 0;
            for (var el in obj) {
                if (obj.hasOwnProperty(el)) {
                    sum += parseFloat(obj[el]);
                }
            }
            return sum;
        },
        SwalSuccess(title, text) {
            const swal = Swal.fire({
                icon: 'success',
                title: title,
                text: text,
            });
            return swal;
        },
        SwalError(title, text) {
            const swal = Swal.fire({
                icon: 'error',
                title: title,
                text: text,
            });
            return swal;
        },
        SwalInfo(title, text) {
            const swal = Swal.fire({
                icon: 'info',
                title: title,
                text: text,
            });
            return swal;
        },
        Swal(type, title, text) {
            const swal = Swal.fire({
                icon: type,
                title: title,
                text: text,
                showConfirmButton: false,
                timer: 10000
            });
            return swal;
        },
        SwalApprovelUser(title, text, buttonText) {
            const swal = Swal.fire({
                icon: 'question',
                title: title,
                text: text,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: buttonText,
                cancelButtonText: 'Batal',
                timer: 10000
            });
            return swal;
        },
        SwalConfirm(type, title, text, confirmButton, cancelButton) {
            const swal = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-outline-danger'
                },
                buttonsStyling: false
            });

            if (cancelButton === null) {
                swal.fire({
                    icon: type,
                    title: title,
                    text: text,
                    showCancelButton: false,
                    confirmButtonText: confirmButton,
                });
            } else {
                swal.fire({
                    icon: type,
                    title: title,
                    text: text,
                    showCancelButton: true,
                    confirmButtonText: confirmButton,
                    cancelButtonText: cancelButton,
                });
            }
            return swal;
        },
        ErrorCode(code, message) {
            let swal = null;
            switch (code) {
                case 409:
                    for (let x of message.details) {
                        this.SwalError(message.name, x.message);
                    }
                    break;
                case 404:
                    swal = this.SwalError(message, '');
                    break;
                case 500:
                    swal = this.SwalError('', message);
                    break;
                case 401:
                    swal = this.SwalError('', message);
                    break;
            }
            return swal;
        },
        LoginStrategies(content) {
            if (content.role.role_name === 'User') {
                if (this.$store.state.HistoryUrl !== null) {
                    window.location.href = `${window.location.origin}${this.$store.state.HistoryUrl}`;
                } else {
                    window.location.href = `${window.location.origin}/user/dashboard`;
                }
            } else {
                window.location.href = `${window.location.origin}/manage/dashboard`;
            }
        },
        UserLogin() {
            if (Cookies.get('UserLogin') === null || Cookies.get('UserLogin') === undefined || Cookies.get('UserLogin') === {}) {
                return {};
            } else {
                return Cookies.getJSON('UserLogin');
            }
        },
        IsLogin() {
            return Cookies.get('IsLogin');
        },
        IsRole() {
            return Cookies.get('IsRole');
        },
        SetStore(data) {
            this.$store.commit('setIsLogin', true);
            this.$store.commit('setIsRole', Cookies.get('IsRole'));
            this.$store.commit('setUserLogin', data);
        },
        RemoveStore() {
            this.$store.commit('setIsLogin', false);
            this.$store.commit('setIsRole', null);
            this.$store.commit('setUserLogin', null);
        },
        CookiesLogin(data, day) {
            let expiredDay = {
                expires: day
            };
            Cookies.set('token', data.token, expiredDay);
            Cookies.set('IsLogin', true, expiredDay);
            Cookies.set('IsRole', data.role.role_name, expiredDay);
            // Cookies.set('permission', data.role.permission, expiredDay);

            let UserLogin = data;
            delete UserLogin.role.permission;
            delete UserLogin.token;

            delete UserLogin.photo;
            delete UserLogin.password;
            delete UserLogin.phone;
            delete UserLogin.telegram_chat_id;
            delete UserLogin.expired_token;
            delete UserLogin.updated_at;

            Cookies.set('UserLogin', UserLogin, expiredDay);
            this.SetStore(data);
        },
        CookiesLogout() {
            Cookies.remove('token');
            Cookies.remove('IsLogin');
            Cookies.remove('IsRole');
            Cookies.remove('UserLogin');
            window.location.href = `${window.location.origin}/login`;
            // this.RemoveStore();
        },
        ErrorLogin(data) {
            let split = data.message.split(',');
            let message1 = split[0];
            let message2 = split[1];
            if (data.content !== null) {
                this.Swal('error', 'Gagal', message2 + '. silahkan buka email untuk me reset password anda.');
            } else {
                this.Swal('error', message1, message2);
            }

            // if (data.code === 404 || data.code === 409) {
            //     this.Swal('error', 'Data tidak ditemukan', 'harap masukan data yang benar');
            // } else if (data.code === 409) {
            //     this.Swal('error', 'Data tidak ditemukan', data.message.details[0].path[0] +
            //         ' tidak boleh kosong');
            // } else if (data.code === 500) {
            //     this.Swal('error', 'Sedang ada gangguan pada LDAP', 'silahkan coba login kembali');
            //     this.Swal('error', data.message, '');
            // } else if (data.code === 429) {
            //     this.Swal('error', data.message, 'silahkan buka email untuk me reset password anda.');
            // } else {
            //     this.Swal('error', 'Sedang ada gangguan', 'silahkan coba lagi nanti');
            // }
        },
        AjukanLayanan(product_id, product_type_slug, product_test_type) {
            if (this.IsLogin()) {
                this.$store.commit('setProductId', product_id);
                this.$store.commit('setProductTypeSlug', product_type_slug);
                this.$store.commit('setProductTestType', product_test_type);
                this.$router.push('/layanan/tahapan-pengajuan');
            } else {
                this.$store.commit('setHistoryUrl', this.$route.fullPath);
                this.$router.push('/login');
            }
        },
        bannerNARU() {
            window.open('https://naru-dev.digitalpass.id', '_blank');
        },

        async HelperServiceOperation(method, url, params, data, headers, callback) {
            const options = HEADERS_BASIC_SF;
            const config = {
                method: method,
                url: `${BASE_URL_SF}${url}`,
                params: params,
                data: data,
                headers: options.headers
            };
            let axios = require('axios');
            await axios(config).then(response => {
                return callback(response.data);
            }).catch(error => {
                return callback(error.response.data);
            });
        },

        HelperAccessPermissions(callback) {
            let User = this.UserLogin();
            let IdUser = User.id;
            this.GET(`/api/v3/permission-byUser/${IdUser}`, 'BEARER', (data) => {
                if (data.code === 200) {
                    // let ALL_PERMISSION = ["Create FAQ", "Edit FAQ", "Delete FAQ", "Create Laporan", "Create S&K", "Edit S&K", "Delete S&K", "Create Layanan", "Edit Layanan", "Delete Layanan", "Edit Kegiatan", "Delete Kegiatan", "Edit Laporan", "Delete Laporan", "Kelola Pengguna", "Kelola FAQ", "Edit Pengguna", "Delete Pengguna", "Create Kegiatan", "Create Pengguna", "Create Page Authorization", "Edit Page Authorization", "Kelola Laporan", "View Kegiatan", "View FAQ", "View Pengguna", "View S&K", "View Layanan", "View Laporan", "Delete Page Authorization", "Kelola Peran", "Create Peran", "Edit Peran", "Delete Peran", "Kelola S&K", "Kelola Layanan", "Dashboard", "Data Pengajuan", "Audit Trail", "Report Analytics", "Profile", "Data Rating", "Page Authorization", "Kelola Kegiatan", "Daftar Pengajuan", "Verifikasi Daftar Pengajuan", "Jadwal Agenda", "Arsip Lampiran", "Verifikasi Pengguna", "Unduh Data Pengguna", "Kelola Feedback", "View Page Authorization", "View Peran", "Create Feedback", "View Feedback", "View SLA", "Edit SLA", "Create SLA Request History", "View SLA Request History", "View Mini Survey", "Create Mini Survey", "Delete Mini Survey", "Edit Mini Survey", "Kelola SLA"];
                    // let userPermissions = ALL_PERMISSION;
                    let userPermissions = [];
                    userPermissions = data.content[0].permission !== null ? data.content[0].permission : [];
                    let haveAccess = {

                        // Dashboard
                        Dashboard: userPermissions.some(x => {
                            return x === 'Dashboard'
                        }),

                        // Data Pengajuan
                        DataPengajuan: userPermissions.some(x => {
                            return x === 'Data Pengajuan' || x === 'Daftar Pengajuan' || x === 'Jadwal Agenda' || x === 'Arsip Lampiran' || x === 'Verifikasi Daftar Pengajuan'
                        }),
                        DaftarPengajuan: userPermissions.some(x => {
                            return x === 'Daftar Pengajuan' || x === 'Data Pengajuan'
                        }),
                        ApprovalDataPengajuan: userPermissions.some(x => {
                            return x === 'Verifikasi Daftar Pengajuan' || x === 'Data Pengajuan'
                        }),

                        // Jadwal Agenda
                        JadwalAgenda: userPermissions.some(x => {
                            return x === 'Jadwal Agenda' || x === 'Data Pengajuan'
                        }),

                        // Arsip Lampiran
                        ArsipLampiran: userPermissions.some(x => {
                            return x === 'Arsip Lampiran' || x === 'Data Pengajuan'
                        }),

                        // Kelola FAQ
                        KelolaFAQ: userPermissions.some(x => {
                            return x === 'Kelola FAQ' || x === 'List FAQ' || x === 'Create FAQ' || x === 'Edit FAQ' || x === 'Delete FAQ' || x === 'Detail FAQ'
                        }),
                        ListFAQ: userPermissions.some(x => {
                            return x === 'List FAQ' || x === 'Kelola FAQ'
                        }),
                        CreateFAQ: userPermissions.some(x => {
                            return x === 'Create FAQ' || x === 'Kelola FAQ'
                        }),
                        EditFAQ: userPermissions.some(x => {
                            return x === 'Edit FAQ' || x === 'Kelola FAQ'
                        }),
                        DeleteFAQ: userPermissions.some(x => {
                            return x === 'Delete FAQ' || x === 'Kelola FAQ'
                        }),
                        DetailFAQ: userPermissions.some(x => {
                            return x === 'Detail FAQ' || x === 'Kelola FAQ'
                        }),

                        // Kelola S&K
                        KelolaSK: userPermissions.some(x => {
                            return x === 'Kelola S&K' || x === 'List S&K' || x === 'Create S&K' || x === 'Edit S&K' || x === 'Delete S&K' || x === 'Detail S&K'
                        }),
                        ListSK: userPermissions.some(x => {
                            return x === 'List S&K' || x === 'Kelola S&K'
                        }),
                        CreateSK: userPermissions.some(x => {
                            return x === 'Create S&K' || x === 'Kelola S&K'
                        }),
                        EditSK: userPermissions.some(x => {
                            return x === 'Edit S&K' || x === 'Kelola S&K'
                        }),
                        DeleteSK: userPermissions.some(x => {
                            return x === 'Delete S&K' || x === 'Kelola S&K'
                        }),
                        DetailSK: userPermissions.some(x => {
                            return x === 'Detail S&K' || x === 'Kelola S&K'
                        }),

                        // Kelola Layanan
                        KelolaLayanan: userPermissions.some(x => {
                            return x === 'Kelola Layanan' || x === 'List Layanan' || x === 'Create Layanan' || x === 'Edit Layanan' || x === 'Delete Layanan' || x === 'Detail Layanan'
                        }),
                        ListLayanan: userPermissions.some(x => {
                            return x === 'List Layanan' || x === 'Kelola Layanan'
                        }),
                        CreateLayanan: userPermissions.some(x => {
                            return x === 'Create Layanan' || x === 'Kelola Layanan'
                        }),
                        EditLayanan: userPermissions.some(x => {
                            return x === 'Edit Layanan' || x === 'Kelola Layanan'
                        }),
                        DeleteLayanan: userPermissions.some(x => {
                            return x === 'Delete Layanan' || x === 'Kelola Layanan'
                        }),
                        DetailLayanan: userPermissions.some(x => {
                            return x === 'Detail Layanan' || x === 'Kelola Layanan'
                        }),

                        // Drive Dokumen
                        DriveDokumen: userPermissions.some(x => {
                            return x === 'Kelola Dokumen' || x === 'List Dokumen' || x === 'Create Dokumen' || x === 'Edit Dokumen' || x === 'Delete Dokumen' || x === 'Detail Dokumen'
                        }),
                        ListDriveDokumen: userPermissions.some(x => {
                            return x === 'List Dokumen' || x === 'Kelola Dokumen'
                        }),
                        CreateDriveDokumen: userPermissions.some(x => {
                            return x === 'Create Dokumen' || x === 'Kelola Dokumen'
                        }),
                        EditDriveDokumen: userPermissions.some(x => {
                            return x === 'Edit Dokumen' || x === 'Kelola Dokumen'
                        }),
                        DeleteDriveDokumen: userPermissions.some(x => {
                            return x === 'Delete Dokumen' || x === 'Kelola Dokumen'
                        }),
                        DetailDriveDokumen: userPermissions.some(x => {
                            return x === 'Detail Dokumen' || x === 'Kelola Dokumen'
                        }),


                        // Kelola Kegiatan
                        KelolaKegiatan: userPermissions.some(x => {
                            return x === 'Kelola Kegiatan' || x === 'List Kegiatan' || x === 'Create Kegiatan' || x === 'Edit Kegiatan' || x === 'Delete Kegiatan' || x === 'Detail Kegiatan'
                        }),
                        ListKegiatan: userPermissions.some(x => {
                            return x === 'List Kegiatan' || x === 'Kelola Kegiatan'
                        }),
                        CreateKegiatan: userPermissions.some(x => {
                            return x === 'Create Kegiatan' || x === 'Kelola Kegiatan'
                        }),
                        EditKegiatan: userPermissions.some(x => {
                            return x === 'Edit Kegiatan' || x === 'Kelola Kegiatan'
                        }),
                        DeleteKegiatan: userPermissions.some(x => {
                            return x === 'Delete Kegiatan' || x === 'Kelola Kegiatan'
                        }),
                        DetailKegiatan: userPermissions.some(x => {
                            return x === 'Detail Kegiatan' || x === 'Kelola Kegiatan'
                        }),

                        // Kelola Laporan
                        KelolaLaporan: userPermissions.some(x => {
                            return x === 'Kelola Laporan' || x === 'List Laporan' || x === 'Create Laporan' || x === 'Edit Laporan' || x === 'Delete Laporan' || x === 'Detail Laporan'
                        }),
                        ListLaporan: userPermissions.some(x => {
                            return x === 'List Laporan' || x === 'Kelola Laporan'
                        }),
                        CreateLaporan: userPermissions.some(x => {
                            return x === 'Create Laporan' || x === 'Kelola Laporan'
                        }),
                        EditLaporan: userPermissions.some(x => {
                            return x === 'Edit Laporan' || x === 'Kelola Laporan'
                        }),
                        DeleteLaporan: userPermissions.some(x => {
                            return x === 'Delete Laporan' || x === 'Kelola Laporan'
                        }),
                        DetailLaporan: userPermissions.some(x => {
                            return x === 'Detail Laporan' || x === 'Kelola Laporan'
                        }),

                        // Audit Trail
                        AuditTrail: userPermissions.some(x => {
                            return x === 'Audit Trail'
                        }),

                        // Kelola Pengguna
                        KelolaPengguna: userPermissions.some(x => {
                            return x === 'Kelola Pengguna' || x === 'List Pengguna' || x === 'Create Pengguna' || x === 'Edit Pengguna' || x === 'Delete Pengguna' || x === 'Detail Pengguna' || x === 'Verifikasi Pengguna'
                        }),
                        ListPengguna: userPermissions.some(x => {
                            return x === 'List Pengguna' || x === 'Kelola Pengguna' || x === 'Create Pengguna' || x === 'Edit Pengguna' || x === 'Delete Pengguna' || x === 'Detail Pengguna'
                        }),
                        CreatePengguna: userPermissions.some(x => {
                            return x === 'Create Pengguna' || x === 'Kelola Pengguna'
                        }),
                        EditPengguna: userPermissions.some(x => {
                            return x === 'Edit Pengguna' || x === 'Kelola Pengguna'
                        }),
                        DeletePengguna: userPermissions.some(x => {
                            return x === 'Delete Pengguna' || x === 'Kelola Pengguna'
                        }),
                        DetailPengguna: userPermissions.some(x => {
                            return x === 'Detail Pengguna' || x === 'Kelola Pengguna'
                        }),
                        VerifikasiPengguna: userPermissions.some(x => {
                            return x === 'Verifikasi Pengguna' || x === 'Kelola Pengguna'
                        }),

                        // Data Rating
                        DataRating: userPermissions.some(x => {
                            return x === 'Data Rating'
                        }),

                        // Page Authorization
                        KelolaPageAuthorization: userPermissions.some(x => {
                            return x === 'Page Authorization' || x === 'List Page Authorization' || x === 'Create Page Authorization' || x === 'Edit Page Authorization' || x === 'Delete Page Authorization' || x === 'Detail Page Authorization'
                        }),
                        ListPageAuthorization: userPermissions.some(x => {
                            return x === 'List Page Authorization' || x === 'Page Authorization'
                        }),
                        CreatePageAuthorization: userPermissions.some(x => {
                            return x === 'Create Page Authorization' || x === 'Page Authorization'
                        }),
                        EditPageAuthorization: userPermissions.some(x => {
                            return x === 'Edit Page Authorization' || x === 'Page Authorization'
                        }),
                        DeletePageAuthorization: userPermissions.some(x => {
                            return x === 'Delete Page Authorization' || x === 'Page Authorization'
                        }),
                        DetailPageAuthorization: userPermissions.some(x => {
                            return x === 'Detail Page Authorization' || x === 'Page Authorization'
                        }),

                        // Kelola Peran
                        KelolaPeran: userPermissions.some(x => {
                            return x === 'Kelola Peran' || x === 'List Peran' || x === 'Create Peran' || x === 'Edit Peran' || x === 'Delete Peran' || x === 'Detail Peran'
                        }),
                        ListPeran: userPermissions.some(x => {
                            return x === 'List Peran' || x === 'Kelola Peran'
                        }),
                        CreatePeran: userPermissions.some(x => {
                            return x === 'Create Peran' || x === 'Kelola Peran'
                        }),
                        EditPeran: userPermissions.some(x => {
                            return x === 'Edit Peran' || x === 'Kelola Peran'
                        }),
                        DeletePeran: userPermissions.some(x => {
                            return x === 'Delete Peran' || x === 'Kelola Peran'
                        }),
                        DetailPeran: userPermissions.some(x => {
                            return x === 'Detail Peran' || x === 'Kelola Peran'
                        }),

                        // Kelola SLA
                        KelolaSLA: userPermissions.some(x => {
                            return x === 'Kelola SLA' || x === 'View SLA' || x === 'Edit SLA' || x === 'View SLA Request History' || x === 'Create SLA Request History' || x === 'View Mini Survey' || x === 'Create Mini Survey' || x === 'Edit Mini Survey' || x === 'Delete Mini Survey'
                        }),
                        ListSLA: userPermissions.some(x => {
                            return x === 'View SLA' || x === 'Kelola SLA' || x === 'Edit SLA'
                        }),
                        EditSLA: userPermissions.some(x => {
                            return x === 'Edit SLA' || x === 'Kelola SLA'
                        }),
                        ListSLARequestHistory: userPermissions.some(x => {
                            return x === 'View SLA Request History' || x === 'Kelola SLA' || x === 'Create SLA Request History'
                        }),
                        CreateSLARequestHistory: userPermissions.some(x => {
                            return x === 'Create SLA Request History' || x === 'Kelola SLA'
                        }),
                        ListMiniSurvey: userPermissions.some(x => {
                            return x === 'View Mini Survey' || x === 'Kelola SLA' || x === 'Create Mini Survey' || x === 'Edit Mini Survey' || x === 'Delete Mini Survey'
                        }),
                        CreateMiniSurvey: userPermissions.some(x => {
                            return x === 'Create Mini Survey' || x === 'Kelola SLA'
                        }),
                        EditMiniSurvey: userPermissions.some(x => {
                            return x === 'Edit Mini Survey' || x === 'Kelola SLA'
                        }),
                        DeleteMiniSurvey: userPermissions.some(x => {
                            return x === 'Delete Mini Survey' || x === 'Kelola SLA'
                        }),


                        // Report Analytics
                        ReportAnalytics: userPermissions.some(x => {
                            return x === 'Report Analytics'
                        }),

                        // Profile
                        Profile: userPermissions.some(x => {
                            return x === 'Profile'
                        }),
                    }
                    return callback(haveAccess);
                }
            });
        },




        // New Funtion
        HelperConfirm(type, title, text, method, url, params, data, headers) {
            let swal = Swal.fire({
                icon: type,
                title: title,
                text: text,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });

            let requestData = swal;

            swal.then((result) => {
                if (result.isConfirmed) {
                    requestData = this.Request(method, url, params, data, headers, (callback) => {
                        if (callback.code == 200) {
                            alert('Success');
                        } else {
                            alert('Gagal');
                        }
                    });
                };
            });
            return requestData;
        },
        HelperSweetAlert(icon, title, text, showConfirmButton, showCancelButton, confirmButtonText, cancelButtonText) {
            let swal = Swal.fire({
                icon: icon,
                title: title,
                text: text,
                showConfirmButton: showConfirmButton,
                showCancelButton: showCancelButton,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            });
            return swal;
        },
        HelperConvertMessage(action) {
            let message = null;
            if (action === 'create') {
                message = 'tambah';
            } else if (action === 'update') {
                message = 'ubah';
            } else if (action === 'delete') {
                message = 'hapus';
            } else {
                message = action;
            };
            return message;
        },
        HelperConfirm(module, action) {
            let message = this.HelperConvertMessage(action);
            let swal = Swal.fire({
                icon: 'question',
                title: 'Apakah anda yakin',
                text: 'Data ' + module + ' akan di ' + message,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });
            return swal;
        },
        HelperSuccessCode(module, action) {
            let message = this.HelperConvertMessage(action);
            let swal = Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Data ' + module + ' telah Anda berhasil di ' + message,
                confirmButtonText: 'Lihat data ' + module,
                allowOutsideClick: false
            });
            return swal;
        },
        HelperErrorCode(data) {
            // Error bad request (kesalahan parameter)
            if (data.code === 400) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false);
            };

            // Forbidden
            if (data.code === 403) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false);
            };

            // Error tidak ditemukan
            if (data.code === 404) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false);
            };

            // Error validasi (kesalahan validasi)
            if (data.code === 409) {
                // Code ini untuk semua error validasi dikeluarin dari respon API
                this.HelperSweetAlert('error', 'Gagal !', data.message.details[0].message, false, false, false, false);

                // Code ini untuk costum kalo misal text nya kosong atau text nya kurang (max length, min length)
                // this.HelperSweetAlert('error', 'Gagal!', data.message.details[0].path[0] + ' tidak boleh kosong', false, false, false, false);
            };

            if (data.code === 429) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false);
            };

            // Error backend (kesalahan dari be)
            if (data.code === 500) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false);
            };

            if (data.code === 500 && data.message === 'This account is not have an access to this Feature!!!') {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false).then((result) => {
                    Cookies.remove('UserLogin');
                    Cookies.remove('token');
                    Cookies.remove('IsLogin');
                    Cookies.remove('IsRole');
                    window.location.href = `${window.location.origin}/login`;
                });
            };

            if (data.code === 401) {
                this.HelperSweetAlert('error', 'Gagal !', data.message, false, false, false, false).then((result) => {
                    window.location.href = `${window.location.origin}/login`;
                });
            }

        },
        HelperErrorUploadFile(size) {
            this.HelperSweetAlert('error', 'Gagal upload file', `Ukuran file maksimal : ${size} MB`,
                false, false, false, false);
        },
        async Request(method, url, params, data, headers, callback) {
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            const config = {
                method: method,
                url: `${BASE_URL}${url}`,
                params: params,
                data: data,
                headers: options.headers
            };
            let axios = require('axios');
            await axios(config).then(response => {
                return callback(response.data);
            }).catch(error => {
                return callback(error.response.data);
            });
        },
        async RequestIDO(method, url, params, data, headers, callback) {
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            const config = {
                method: method,
                url: `${BASE_URL_IDO}${url}`,
                params: params,
                data: data,
                headers: options.headers
            };
            let axios = require('axios');
            await axios(config).then(response => {
                return callback(response.data);
            }).catch(error => {
                return callback(error.response.data);
            });
        },



        HelperConfirmVerification(text) {
            let swal = Swal.fire({
                icon: 'question',
                title: 'Apakah anda yakin',
                text: text,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });
            return swal;
        },

        HelperSLARequestHistory(body) {
            this.Request('POST', '/api/v3/sla-request2/create', null, body, 'BEARER', (callback) => {
                if (callback.code === 200) {} else {
                    this.HelperErrorCode(callback);
                };
            });
        },

        HelperDataPengajuan(messageConfirm, body, APIDataPengajuan, bodyReason, messageSuccess, callbackAfterSuccess) {
            this.HelperConfirmVerification(messageConfirm).then((result) => {
                if (result.isConfirmed) {
                    this.Request('POST', APIDataPengajuan, null, body, 'BASIC', (
                        callback) => {
                        if (callback.code === 200) {
                            this.HelperSLARequestHistory(bodyReason);
                            this.HelperSuccessCode('', messageSuccess).then((result) => {
                                return callbackAfterSuccess(result);
                            });
                        } else {
                            this.HelperErrorCode(callback);
                        };
                    });
                };
            });
        },

        HelperGetCollectionFirebase(dbName, callback) {
            // Without Condition
            // const getCollection = getDocs(collection(db, dbName));
            // getCollection.then((doc) => {
            //     doc.forEach((x) => {
            //         return callback(x.data());
            //     });
            // });

            const q = query(collection(db, dbName), orderBy('DATE', 'desc'));
            const getCollection = getDocs(q);
            getCollection.then((doc) => {
                doc.forEach((x) => {
                    return callback(x.data());
                });
            });
        },

        HelperQueryGetCollectionFirebase(dbName, condition, callback) {
            // Sample
            // const q = query(collection(db, dbName), where('EVENT', '==', 'DigitalPass_LoginEmail'));
            const q = query(collection(db, dbName), where(condition.field, '==', condition.value));
            const getCollection = getDocs(q);
            getCollection.then((doc) => {
                doc.forEach((x) => {
                    return callback(x.data());
                });
            });
        },

        HelperDateTimeFirebase(date) {
            if (date !== null) {
                return date.toDate();
            };
        },


        async HelperAddCollectionFirebase(dbName, body, callback) {
            await addDoc(collection(db, dbName), body).then(response => {
                return callback(response);
            }).catch(error => {
                return callback(error);
            });
        },

        HelperGetCurrentCity(callback) {
            fetch('https://extreme-ip-lookup.com/json/')
                .then(res => res.json())
                .then(response => {
                    return callback(response);
                })
        },

        HelperSUM(obj) {
            var sum = 0;
            for (var el in obj) {
                if (obj.hasOwnProperty(el)) {
                    sum += parseFloat(obj[el]);
                }
            }
            return sum;
        },
        HelperKFormater(num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(
                num) * Math.abs(num)
        },

        async RequestUploadFile(method, url, params, data, headers, progress, callback) {
            let axios = require('axios');
            const options = headers === 'BASIC' ? HEADERS_BASIC : HEADERS_BEARER;
            const config = {
                method: method,
                url: `${BASE_URL}${url}`,
                params: params,
                data: data,
                headers: options.headers,
                onUploadProgress: function( progressEvent ) {
                    progress(parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) ))
                }.bind(this)
            };
            await axios(config).then(response => {
                return callback(response.data);
            }).catch(error => {
                if(error.response) {
                    return callback(error.response.data);
                } else {
                    return callback(error);
                }
            });
        },
    }
}
