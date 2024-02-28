import $gtm from '@nuxtjs/gtm';

const app = require('~/app.json');
const config = app.config[process.env.ENV || 'development'];

export default function({ $gtm, route }) {
  $gtm.init(config.GTM)
}