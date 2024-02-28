import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import $axios from 'axios';

const app = require('~/app.json');
const config = app.config[process.env.ENV || 'development'];
console.log('CONFIG', config);
console.log('ENV', process.env || 'NOT FOUND');
const BASE_URL = config.base_url;

export default function ({ $axios, redirect }) {
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            Cookies.remove('UserLogin');
            Cookies.remove('token');
            Cookies.remove('IsLogin');
            Cookies.remove('IsRole');
            // window.location.href = `${window.location.origin}/login`;
        }

        if (code === 403) {

        }
    })
}
