<script lang="ts" setup>
const { t } = useCustomI18n()
</script>

<template>
  <div class="mt-36">
    <h1 class="title my-8">
      {{ t('main.title') }}
    </h1>
    <span class="flex-center flex-row gap-5">
      <NuxtLinkLocale to="/about" class="btn">
        {{ t('global.about') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/sample" class="btn">
        {{ t('global.sample') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/menu" class="btn">
        {{ t('global.menu') }}
      </NuxtLinkLocale>

    </span>
  </div>
</template>
