<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'centercard',
})

useHead({
  title: `${t('global.sample')} • Norder`,
})
</script>

<template>
  <SampleComponent />
</template>
