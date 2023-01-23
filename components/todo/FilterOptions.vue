<template>
  <div>
    <button class="filter-btn">{{ $t('all') }}</button>
    <button class="filter-btn">{{ $t('incomplete') }}</button>
    <button class="filter-btn">{{ $t('complete') }}</button>
  </div>
</template>
<script>
export default {
  name: 'FilterOptions',
  data() {
    return {}
  },
}
</script>
