import { createStore } from 'vuex'

export default createStore({
  state: {
    status:{
      signed:false,
      token:""
    },
  },
  getters:{
    getStatus: state=>{
      return state.status;
    }
  },
  mutations: {
    SIGNIN(state){
      state.status.signed = true
    },
    SIGNOUT(state){
      state.status.signed = false
    }
  },
  actions: {
    signIn(){
      this.commit('SIGNIN')
    },
    signOut(){
      this.commit('SIGNOUT')
    }
  },
  modules: {
  }
})
