<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksCnt }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date().toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="openTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'

export default {
  components: { AppStatus },
  setup () {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      store.dispatch('getTasks')
    })

    const openTask = (id) => {
      // store.dispatch('getTask', id)
      router.push(`/task/${id}`)
    }

    return {
      tasks: computed(() => store.getters.tasks),
      activeTasksCnt: computed(() => store.getters.activeTasksCnt),
      openTask
    }
  }
}
</script>
