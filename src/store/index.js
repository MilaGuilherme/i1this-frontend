import { createStore } from 'vuex'

export default createStore({
  state: {
    hotProducts:[],
    products:[],
    status:{
      signed:false,
      token:""
    },
  },
  getters:{
    getStatus: state=>{
      return state.status;
    },
    getHotProducts: state=>{
      return state.hotProducts;
    },
  },
  mutations: {
    SIGNIN(state){
      state.status.signed = true
    },
    SIGNOUT(state){
      state.status.signed = false
    },
    SETTOKEN(state,payload){
      state.status.token = payload
    },
    HOTPRODUCTS(state,payload){
      state.hotProducts = payload
    }
  },
  actions: {
    signIn(){
      this.commit('SIGNIN')
    },
    signOut(){
      this.commit('SIGNOUT')
    },
    setToken(context,payload){
      context.commit('SETTOKEN', payload)
    },
    hotProducts(context,payload){
      context.commit('HOTPRODUCTS',payload)
    }
  },
  modules: {
  }
})
