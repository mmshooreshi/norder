<template>
    <div ref="modalContent"
      class="bg-background dark:bg-dark-background p-6 rounded-lg w-full max-w-lg relative mt-6 mb-6 shadow-lg max-h-90vh overflow-auto modal-content">
      <!-- Close button that emits the 'close' event -->
      <button 
  class="close-button absolute top-2 right-2 text-red-500 text-sm rounded-lg p-1 transition-transform duration-300 ease-out hover:bg-primary/25 dark:hover:bg-dark-primary/25" 
  @click="closeModal">
  ✖
  <span class="hidden group-hover:block">{{ $t('global.close') }}</span>
</button>


      <h2 class="text-2xl font-bold mb-2 mt-2">
        {{ item.strMeal }}
      </h2>

      <img :src="item.strMealThumb" alt="Meal Image" class="w-full h-40 object-cover mb-4" />

      <div
        class="text-md font-semibold pb-1 mb-2 text-text dark:text-dark-text bg-primary/25 dark:bg-dark-primary/25 px-2 cursor-pointer hover:bg-primary/50 dark:hover:bg-dark-primary/50 rounded-lg w-max">
        <!-- {{ $t('global.price') }}:  -->
        {{ formatPrice(item.price) }} {{ $t('global.price_unit') }}
      </div>

      <h3 class="text-xl font-semibold mb-2">
        {{ $t('global.ingredients') }}
      </h3>
      <ul class="mb-0 max-h-36 overflow-auto">
        <li v-for="(ingredient, index) in ingredients" :key="index" class="flex justify-between">
          <span>{{ ingredient }}</span>
          <span>{{ measures[index] }}</span>
        </li>
      </ul>

      <hr class="mt-0 mb-4 border-white/25">

      <h3 class="text-xl font-semibold mb-2">
        {{ $t('global.instructions') }}
      </h3>
      <p class="mb-0 text-sm max-h-36 overflow-auto rounded-lg">
        {{ item.strInstructions }}
      </p>

      <hr class="mt-0 mb-4 border-white/25">

      <div v-if="item.strTags" class="mb-4">
        <h3 class="text-xl font-semibold mb-2">
          {{ $t('global.tags') }}
        </h3>
        <p class="bg-background dark:bg-dark-background text-primary dark:text-dark-primary">
          {{ item.strTags.split(',').join(', ') }}
        </p>
      </div>

      <div class="mt-4 mb-6 flex gap-4">
        <a v-if="item.strYoutube" :href="item.strYoutube" target="_blank" class="text-blue-500 underline">{{
          $t('global.watch') }}</a>
        <a v-if="item.strSource" :href="item.strSource" target="_blank" class="text-blue-500 underline">{{
          $t('global.source') }}</a>
      </div>

      <!-- Order button that also emits the 'close' event after ordering -->
      <button
        class="sticky bg-accent dark:bg-dark-accent text-white py-2  px-4 rounded-md w-min font-semibold hover:bg-accent-hover dark:hover:bg-dark-accent-hover"
        @click="orderItem(item)">
        {{ $t('global.order') }}
      </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  item: Object,
});

const emits = defineEmits(['close', 'order']);

const { locale, t } = useI18n();
const directionClass = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'));

const modalContent = ref(null); // Reference for the modal content

// Function to emit the 'close' event
function closeModal() {
  emits('close');
}

// Function to handle item ordering and close the modal after ordering
function orderItem(item) {
  alert(`${t('order.confirm')} ${item.strMeal}! ${t('global.price')}: ${formatPrice(item.price)} ${t('global.price_unit')}`);
  emits('close'); // Close the modal after the order
}

// Format price based on the current locale
// function formatPrice(amount) {
//   return Number(amount).toLocaleString(locale.value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// }
function formatPrice(amount) {
  return Number(amount).toLocaleString(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true, // Ensures comma separation for thousands
  });
}


// Extract ingredients dynamically
const ingredients = computed(() => {
  if (!props.item) return [];
  return Array.from({ length: 20 }, (_, i) => props.item[`strIngredient${i + 1}`]).filter(Boolean);
});

// Extract measures dynamically
const measures = computed(() => {
  if (!props.item) return [];
  return Array.from({ length: 20 }, (_, i) => props.item[`strMeasure${i + 1}`]).filter(Boolean);
});

// Add event listener for the 'Escape' key to close the modal
function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Use onMounted and onUnmounted to add and remove the event listener
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Use onClickOutside to close modal when clicking outside the modal content
onClickOutside(modalContent, () => {
  closeModal();
});
</script>
<style scoped>
/* Super bouncy effect for the close button */
.close-button {

  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

/* Hover effect: scale up with a bounce */
.close-button:hover {
  transform: scale(1.2); /* Slight upward bounce and scale up */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow for depth */
}

/* Active effect: bouncy downward */
.close-button:active {
  transform: scale(0.9) translateY(-2px); /* Slight downward bounce */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow change for pressed effect */
  background-color: rgba(0, 0, 0, 0);
}
</style>
