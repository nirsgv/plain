import { ToastProgrammatic as Toast } from "buefy";

export default {
  namespaced: true,
  state: {
    authenticated: false,
  },
  getters: {},
  mutations: {
    ANNOUNCE: (state, { message, type, position, duration }) => {
      console.log({ message, type, position, duration });
      Toast.open({ message, type, position, duration });
    },
  },
  actions: {
    announce: async (
      { commit },
      {
        message = "Something happened correctly!",
        type = "is-success",
        position = "is-bottom-left",
        duration = 6000,
        delay = 0,
      }
    ) => {
      setTimeout(
        () => commit("ANNOUNCE", { message, type, position, duration, delay }),
        delay
      );
    },
    registerWelcome: ({ dispatch }) => {
      dispatch("announce", { message: "Your registration has succeeded.", delay: 1000 });
    },  
  },

};
