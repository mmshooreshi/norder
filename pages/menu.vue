<template>
  <!-- <Diana></Diana> -->
  <div :class="directionClass" class="scroll-smooth max-w-screen m-8 p-4 max-h-screen" @scroll="handleScroll">
    <header class="mb-6 pt-4">
      <h1 class="text-3xl font-bold text-center">
        {{ $t('global.menu') }}
      </h1>
    </header>

    <div ref="categoryPane" class="sticky top-0 z-1 mt-4 p-2 px-0 bg-accent/25 dark:bg-dark-accent/25 rounded-lg mb-0">
      <div class="flex gap-2 overflow-x-auto items-center px-2">
        <button
          v-for="(items, category) in groupedMenuItems"
          :key="category"
          :data-category="category"
          class="rounded-md bg-primary/50 text-text dark:text-dark-text px-4 py-1 transition-colors duration-200 cursor-pointer"
          :class="category === currentCategory ? 'bg-accent/50' : 'bg-transparent text-primary dark:text-dark-primary'"
          @click="scrollToCategory(category)"
        >
        
          {{ category }}
        </button>
      </div>
    </div>

    <main id="menu-container" class="overflow-auto max-h-[calc(100vh-200px)]" @scroll="handleScroll">
      <div v-for="(items, category) in groupedMenuItems" :key="category" :ref="setCategoryRef(category)" class="mb-8 mt-2">
        <h2 class="text-2xl font-semibold mb-4 mx-2">
          {{ category }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MenuItem v-for="item in items" :key="item.idMeal" :item="item" @select="openItemDetails" />
        </div>
      </div>
    </main>

    <div v-if="selectedItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-2">
      <transition name="modal" appear>
        <Modal
          v-show="selectedItem"
          :item="selectedItem"
          @close="closeItemDetails"
          @order="orderItem"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { fetchMenuItems } from '@/utils/menuService';
import MenuItem from '@/components/MenuItem.vue';
import Modal from '@/components/modal.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const menuItems = ref([]);
const selectedItem = ref(null);
const currentCategory = ref('');
const categoryRefs = ref({});
const categoryPane = ref(null); // Ref for the category pane

onMounted(async () => {
  menuItems.value = await fetchMenuItems();
  await nextTick();
  updateCurrentCategory();
});

const groupedMenuItems = computed(() => {
  return menuItems.value.reduce((groups, item) => {
    if (!groups[item.strCategory]) {
      groups[item.strCategory] = [];
    }
    groups[item.strCategory].push(item);
    return groups;
  }, {});
});

function openItemDetails(item) {
  selectedItem.value = item; // Set the selected item to show its details
}

function closeItemDetails() {
  selectedItem.value = null; // Clear the selected item to close the modal
}

function orderItem(item) {
  alert(`${$t('order.confirm')} ${item.strMeal}! ${$t('global.price')}: ${item.price}`);
  selectedItem.value = null; // Clear the selected item after ordering
}

const directionClass = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'));

// Function to set refs for each category
function setCategoryRef(category) {
  return (el) => {
    if (el) {
      categoryRefs.value[category] = el;
    }
  };
}

// Scroll to a specific category when a button is clicked
function scrollToCategory(category) {
  const element = categoryRefs.value[category];
  const menuContainer = document.getElementById('menu-container'); // Use the correct scrolling element
  if (element && menuContainer) {
    // Get the offset position of the element relative to the menu container
    const offsetTop = element.offsetTop - menuContainer.offsetTop;

    // Get the height of the sticky header dynamically
    const headerHeight = document.querySelector('.sticky').offsetHeight || 60; // Adjust height dynamically

    // Scroll the menu container to the target element considering the header height
    menuContainer.scrollTo({
      top: offsetTop - headerHeight + 40, // Adjust 20 pixels more for some spacing
      behavior: 'smooth',
    });
  }
}

// Update current category based on scroll position
function handleScroll() {
  updateCurrentCategory();
}

function updateCurrentCategory() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) {
    console.error('Menu container not found.');
    return;
  }

  const scrollPosition = menuContainer.scrollTop; // Use scrollTop of the specific container
  console.log('Scroll position in container:', scrollPosition);

  let foundCategory = false;

  for (const [category, element] of Object.entries(categoryRefs.value)) {
    if (!element) {
      console.warn(`Element not found for category: ${category}`);
      continue;
    }

    const { offsetTop, offsetHeight } = element;
    const relativeOffsetTop = offsetTop - menuContainer.offsetTop; // Calculate offset relative to container
    console.log(`Category: ${category}, Offset Top: ${relativeOffsetTop}, Offset Height: ${offsetHeight}`);

    // Check if the scroll position is within the element's range
    if (scrollPosition >= relativeOffsetTop - 100 && scrollPosition < relativeOffsetTop + offsetHeight - 100) {
      console.log(`Current category set to: ${category}`);
      currentCategory.value = category;
      foundCategory = true;
      break;
    }
  }

  if (!foundCategory) {
    console.warn('No matching category found for the current scroll position.');
  }
}
watch(currentCategory, (newCategory) => {
  const categoryPaneElement = document.querySelector('.flex.gap-2.overflow-x-auto.items-center');
  if (categoryPaneElement) {
    const activeButton = categoryPaneElement.querySelector(`button[data-category="${newCategory}"]`);
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      const { clientWidth } = categoryPaneElement;

      const targetScrollLeft = offsetLeft - clientWidth / 2 + offsetWidth / 2;

      categoryPaneElement.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }
});



</script>




<style scoped>

/* Updated animation classes for smoother and springy effect */
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.4s cubic-bezier(0.22, 1.61, 0.36, 1); /* Springy effect with smoother transition */
}

.modal-enter-from,
.modal-leave-to {
  transform: scale(0.8); /* Smaller scale at the start and end */
}

.modal-enter-to,
.modal-leave-from {
  transform: scale(1); /* Full size when visible */
}

/* Styles for the fixed horizontal pane */
.fixed-pane {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  
  /* background: white; */
  padding: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  display: flex;
  gap: 8px;
  overflow-x: auto;
}


/* Hide scrollbar for Chrome, Safari and Opera */
.flex.gap-2.overflow-x-auto.items-center::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.flex.gap-2.overflow-x-auto.items-center {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
