<template>
  <div class="card" v-if="task.status">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date().toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')" :disabled="!isActualDate">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { AppStatus },
  props: ['id'],
  setup (props) {
    const store = useStore()
    const { id } = toRefs(props)

    store.dispatch('getTask', id.value)

    function changeStatus (status) {
      const data = {
        id: id.value,
        status
      }
      store.dispatch('updateTask', data)
    }

    return {
      task: computed(() => store.state.curTask),
      isActualDate: computed(() => store.getters.isActualDate),
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>
