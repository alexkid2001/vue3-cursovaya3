import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
  state () {
    return {
      tasks: [],
      curTask: {}
    }
  },
  mutations: {
    saveTasks (state, payload) {
      state.tasks = Object.keys(payload).map(key => {
        return {
          id: key,
          ...payload[key]
        }
      })
    },
    saveTask (state, payload) {
      state.curTask = { ...payload }
    },
    saveStatus (state, payload) {
      state.curTask.status = payload.status
    }
  },
  actions: {
    getTasks (state, commit) {
      axios.get(`${process.env.VUE_APP_ROOT_API}tasks.json`)
        .then(resp => {
          if (resp.data) {
            store.commit('saveTasks', resp.data)
          }
        })
    },
    createTask (state, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_ROOT_API}tasks.json`, payload)
          .then(resp => {
            resolve()
          })
      })
    },
    getTask (state, payload) {
      axios.get(`${process.env.VUE_APP_ROOT_API}tasks/${payload}.json`)
        .then(resp => {
          store.commit('saveTask', {
            id: payload,
            ...resp.data
          })
        })
    },
    updateTask (state, payload) {
      axios.patch(`${process.env.VUE_APP_ROOT_API}tasks/${payload.id}.json`, {
        status: payload.status
      })
        .then(resp => {
          store.commit('saveStatus', {
            id: payload.id,
            ...resp.data
          })
        })
    }
  },
  getters: {
    tasks: state => state.tasks,
    task: state => state.curTask,
    activeTasksCnt: state => state.tasks.filter(task => task.status === 'active').length,
    isActualDate: state => {
      const now = Date.now()
      if (!state.curTask.date) return false

      const date = new Date(state.curTask.date)

      return date > now
    }
  },
  modules: {
  }
})
