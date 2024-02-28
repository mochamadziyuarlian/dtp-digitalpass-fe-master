import Vue from "vue";
import VueGtag from "vue-gtag";

const app = require('~/app.json');
const config = app.config[process.env.ENV || 'development'];

Vue.use(VueGtag, {
  config: { 
    id: config.GA 
  }
});
