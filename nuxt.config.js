const app = require('./app.json');
const config = app.config[process.env.ENV || 'development'];

export default {
  head: {
    title: 'DigitalPass',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css' }
    ],
    script: [
      { src: '/vendor/jquery/jquery.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/chart.js' },
      { src: '/js/BaseChart/Chart.roundedBarCharts.min.js' },
      { src: '/js/script.js' },
      { src: '/vendor/bootstrap/js/bootstrap.min.js' },
      { src: '/vendor/jquery-easing/jquery.easing.min.js' },
      { src: '/js/sb-admin-2.js' }
    ]
  },

  css: [
    '@/assets/css/sb-admin-2.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/css/responsive.css',
    '@/assets/css/portal.css',
    '@/assets/css/bootstrap-steps.min',
    '@/assets/css/step.css',
    '@/assets/css/style.css',

    
    '~/static/css/main.css',
    '~/static/css/badge.css',
    '~/static/css/base-component.css',
    '~/static/css/border.css',
    '~/static/css/button.css',
    '~/static/css/form.css',
    '~/static/css/table.css',
    '~/static/css/text.css',


    '~/static/v3/Portal/assets/css/style.css',
    '~/static/v3/Portal/assets/css/form.css',
    '~/static/v3/Portal/assets/css/table.css',
    '~/static/v3/Portal/assets/css/button.css',
    '~/static/v3/Portal/assets/css/modal.css',
    '~/static/v3/Portal/assets/css/steper.css',
    '~/static/v3/Portal/assets/css/document-file.css',
  ],

  plugins: [
    '~/plugins/axios',
    '~/plugins/swal',
    '~/plugins/vuelidate',
    { src: '~/plugins/vue-calendar', ssr: false },
    { src: '~/plugins/vue2-editor', ssr: false },
    { src: '~/plugins/owl.js', ssr: false },
    { src: '~/plugins/vue-grid.js', ssr: false },
    { src: '~/plugins/vue-treeselect.js', ssr: false },
    { src: '~/plugins/vue-multiselect.js', ssr: false },
    { src: '~/plugins/gtag.js', ssr: false },
    { src: '~/plugins/gtm.js', ssr: false },
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/json-viewer.js', ssr: false },

    { src: '~/plugins/Calendar/index.js', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/dotenv'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/gtm',
    { src: 'bootstrap-vue/nuxt', mode: 'client' },
    'vue-sweetalert2/nuxt'
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: true
  },

  router: {
  },

  axios: {
    baseURL: config.base_url,
  },

  moment: {
    locales: ['id']
  },

  build: {
  },

  loading: {
    color: '#ED2B24',
    height: '5px'
  }
}
