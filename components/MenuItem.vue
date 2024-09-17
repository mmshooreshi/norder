<!-- /Users/mamthenebo/me/Help/mamad/norder/components/MenuItem.vue -->
<template>
  <div 
    @click="selectItem" 
    class="menu-item bg-background dark:bg-dark-background shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
  >
    <img 
      :src="item.strMealThumb" 
      :alt="item.strMeal" 
      class="item-image w-full h-40 object-cover" 
    />
    <div class="p-4 pr-3">
      <h3 class="text-lg font-semibold mb-2 flex justify-between">
        {{ item.strMeal }}
        <span class="text-sm font-normal text-primary dark:text-dark-accent whitespace-nowrap">
          {{ formatPrice(getPrice(item)) }} {{ $t('global.price_unit') }}
        </span>
      </h3>
      <p class="text-sm text-secondary dark:text-dark-secondary">
        {{ item.strCategory }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
const { locale, t } = useI18n();

const emits = defineEmits(['select']);

function selectItem() {
  emits('select', props.item);
}

function getPrice(item) {
  return Number(item.price || 0).toFixed(2);
}

function formatPrice(amount) {
  return Number(amount).toLocaleString(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });
}
</script>

<style scoped>
.menu-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.item-image {
  transition: filter 0.3s ease;
}

.menu-item:hover .item-image {
  filter: brightness(0.9);
}
</style>
