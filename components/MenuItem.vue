<template>
  <div 
    @click="selectItem" 
    class="bg-background dark:bg-dark-background shadow-md rounded-lg overflow-hidden transform transition hover:scale-100 cursor-pointer scale-95 -my-2"
  >
    <img 
      :src="item.strMealThumb" 
      :alt="item.strMeal" 
      class="w-full h-40 object-cover" 
    />
    <div class="p-4 pr-3">
      <h3 class="text-lg font-semibold mb-2 flex justify-between">
        {{ item.strMeal }}
        <span class="text-sm font-normal text-primary dark:text-dark-accent whitespace-nowrap">
          <!-- {{ $t('global.price') }}: -->
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
  // Emit the 'select' event with the clicked item
  emits('select', props.item);
}

function getPrice(item) {
  return Number(item.price || 0).toFixed(2);
}

function formatPrice(amount) {
  return Number(amount).toLocaleString(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true, // Ensures comma separation for thousands
  });
}

</script>
