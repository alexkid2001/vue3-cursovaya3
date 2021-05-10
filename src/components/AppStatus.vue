<template>
  <span
    class="badge"
    :class="{ primary: type === 'active' || type === 'done',
      danger: type === 'cancelled',
      warning: type === 'pending'}
    ">{{ title[type] }}</span>
</template>
<script>

export default {
  props: ['type'],
  setup () {
    const title = {
      active: 'Активен',
      done: 'Выполнен',
      cancelled: 'Отменен',
      pending: 'Выполняется'
    }
    return {
      title
    }
  }
}
</script>
