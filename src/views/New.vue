<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="task.title" :class="{invalid: errors.title}">
      <small v-if="errors.title">{{ errors.title }}</small>
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="task.date">
      <small v-if="errors.date">{{ errors.date }}</small>
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="task.description"></textarea>
      <small v-if="errors.description">{{ errors.description }}</small>
    </div>

    <button class="btn primary" :disabled="!formIsValid">Создать</button>
  </form>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const task = reactive({
      title: null,
      date: null,
      description: null,
      status: 'active'
    })
    const errors = reactive({
      title: null,
      date: null,
      description: null
    })

    const createTask = () => {
      if (formIsValid.value) {
        const now = Date.now()
        const deadLine = new Date(task.date)
        if (deadLine < now) task.status = 'cancelled'
        store.dispatch('createTask', task).then(() => {
          router.push('/')
        })
      }
    }

    const formIsValid = computed(() => {
      let isValid = true

      if (!task.title) {
        isValid = false
      }
      if (!task.date) {
        isValid = false
      }
      if (!task.description) {
        isValid = false
      }
      return isValid
    })

    return {
      task,
      createTask,
      errors,
      formIsValid
    }
  }
}
</script>
