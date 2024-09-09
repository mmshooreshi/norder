<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'centercard',
})

useHead({
  title: `${t('global.about')} • Nightrunner`,
})
</script>

<template>
  <div class="text-center mb-5">
    <h1 class="title">
      {{ t('about.title') }}
    </h1>
  </div>

  <div>
    <p>
      {{ t('about.summary') }}
    </p>

    <div class="mt-5">
      <p>
        {{ t('about.features') }}
      </p>

      <ul list>
        <li>Nuxt 3</li>
        <li>Vue 3</li>
        <li>Vite</li>
        <li>Typescript</li>
        <li>ESLint</li>
        <li>UnoCSS</li>
        <li>Iconify</li>
        <li>Pinia</li>
        <li>Nuxt i18n</li>
      </ul>
    </div>

    <p class="mt-5">
      {{ t('about.config') }}
    </p>
  </div>
</template>
