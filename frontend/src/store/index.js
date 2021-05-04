import Vue from "vue";
import Vuex from "vuex";

import page from "./module-example/cart-page";

import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = "http://e-commerce-mra.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      page
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
