import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    users: [],
    categories: [],
    selectedProduct: [],
    categoriesSelected: new Set(),
    status: {
      signed: false,
      token: "",
      id: "",
      type: ""
    },
  },
  getters: {
    getCategories: state => {
      return state.categories;
    },
    getProducts: state => {
      return state.products;
    },
    getSelectedProduct: state => {
      return state.selectedProduct;
    },
  },
  mutations: {
    SIGNIN(state) {
      state.status.signed = true
    },
    SIGNOUT(state) {
      state.status.signed = false
    },
    SETTOKEN(state, payload) {
      state.status.token = payload
    },
    SETSTATUS(state, payload) {
      state.status.id = payload['id']
      state.status.token = payload['auth-token']
      state.status.type = payload['type']
    },
    SETUSERS(state, payload) {
      state.users = payload
    },
    SETPRODUCTS(state, payload) {
      state.products = payload
    },
    SETCATEGORIES(state, payload) {
      state.categories = payload
    },
    SETSELECTEDPRODUCT(state, payload) {
      state.selectedProduct = payload
    },
    SETCATEGORYFILTER(state, payload) {
      state.categoriesSelected.has(payload) ? state.categoriesSelected.delete(payload) : state.categoriesSelected.delete(payload)
    }
  },
  actions: {
    signIn() {
      this.commit('SIGNIN')
    },
    signOut() {
      this.commit('SIGNOUT')
    },
    setStatus(context, payload) {
      context.commit('SETSTATUS', payload)
    },
    setProducts(context, payload) {
      context.commit('SETPRODUCTS', payload)
    },

    setCategoryFilter(context, payload) {
      context.commit('SETCATEGORYFILTER', payload)
    },
    fetchProducts(context) {
      const url = `${process.env.VUE_APP_API}/products`;
      axios.get(url).then((response) => {
        context.commit('SETPRODUCTS', response.data.content)
      })
    },
    fetchCategories(context) {
      const url = `${process.env.VUE_APP_API}/categories`;
      axios.get(url).then((response) => {
        context.commit('SETCATEGORIES', response.data.content)
      })
    },
    fetchUsers(context) {
      const url = `${process.env.VUE_APP_API}/users`;
      axios.get(url).then((response) => {
        context.commit('SETUSERS', response.data.content)
      })
    },
    fetchSelectedProduct(context, payload) {
      const url = `${process.env.VUE_APP_API}${payload}`;
      return axios.get(url).then((response) => {
        context.commit('SETSELECTEDPRODUCT', response.data.content[0])
      });
    },
  },
  modules: {
  }
})
