<template>
    <div class="p-8">
      <!-- Header Section -->
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-center">{{ $t('global.menu') }}</h1>
      </header>
  
      <!-- Grouped Menu Items by Category -->
      <main>
        <div v-for="(items, category) in groupedMenuItems" :key="category" class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">{{ category }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="item in items"
              :key="item.idMeal"
              class="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
              @click="openItemDetails(item)"
            >
              <img :src="item.strMealThumb" :alt="item.strMeal" class="w-full h-40 object-cover" />
              <div class="p-4 pr-3">
                <h3 class="text-lg font-semibold mb-2 flex justify-between">
                  {{ item.strMeal }}
                  <span class="text-sm font-normal text-teal whitespace-nowrap">{{ $t('global.price') }}: ${{ getPrice(item) }}</span>
                </h3>
                <p class="text-sm text-gray-500">{{ item.strCategory }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Item Details Modal -->
      <div v-if="selectedItem" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
        <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg relative mt-12 shadow-lg max-h-80vh overflow-auto">
          <button class="absolute top-2 right-2 text-red-500" @click="selectedItem = null">✖ {{ $t('global.close') }}</button>
          <h2 class="text-2xl font-bold mb-2">{{ selectedItem.strMeal }}</h2>
          <img :src="selectedItem.strMealThumb" alt="Meal Image" class="w-full h-40 object-cover mb-4" />
  
          <!-- Price -->
          <h3 class="text-lg font-semibold mb-2 text-teal bg-gray-600 px-2 cursor-pointer hover:bg-gray-900 rounded-lg w-max">{{ $t('global.price') }}: ${{ getPrice(selectedItem) }}</h3>
  
          <!-- Ingredients and Measures -->
          <h3 class="text-xl font-semibold mb-2">{{ $t('global.ingredients') }}</h3>
          <ul class="mb-0 max-h-32 overflow-auto">
            <li v-for="(ingredient, index) in ingredients" :key="index" class="flex justify-between">
              <span>{{ ingredient }}</span>
              <span>{{ measures[index] }}</span>
            </li>
          </ul>
          <hr class="mt-0 mb-4 border-white/25"/>
  
          <!-- Instructions -->
          <h3 class="text-xl font-semibold mb-2">{{ $t('global.instructions') }}</h3>
          <p class="mb-0 text-sm max-h-32 overflow-auto rounded-lg">{{ selectedItem.strInstructions }}</p>
  
          <hr class="mt-0 mb-4 border-white/25"/>
  
          <!-- Tags -->
          <div v-if="selectedItem.strTags" class="mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ $t('global.tags') }}</h3>
            <p class="bg-gray-800 text-teal">{{ selectedItem.strTags.split(',').join(', ') }}</p>
          </div>
  
          <!-- Links -->
          <div class="mt-4 mb-6">
            <a v-if="selectedItem.strYoutube" :href="selectedItem.strYoutube" target="_blank" class="text-blue-500 underline mr-4">{{ $t('global.watch') }}</a>
            <a v-if="selectedItem.strSource" :href="selectedItem.strSource" target="_blank" class="text-blue-500 underline">{{ $t('global.source') }}</a>
          </div>
  
          <!-- Order Button -->
          <button class="bg-green-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-green-600" @click="orderItem(selectedItem)">
            {{ $t('global.order') }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  
  const menuItems = ref([])
  const selectedItem = ref(null)
  
  // Function to simulate getting a price for each item
  const getPrice = (item) => {
    const basePrice = 10;
    const randomFactor = Math.random() * 10;
    return (basePrice + randomFactor).toFixed(2);
  }
  
  const fetchMenuItems = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      const data = await response.json()
      menuItems.value = data.meals || []
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }
  
  const openItemDetails = (item) => {
    selectedItem.value = item
  }
  
  const orderItem = (item) => {
    alert(`${$t('order.confirm')} ${item.strMeal}! ${$t('global.price')}: $${getPrice(item)}`)
    selectedItem.value = null
  }
  
  const groupedMenuItems = computed(() => {
    return menuItems.value.reduce((groups, item) => {
      if (!groups[item.strCategory]) {
        groups[item.strCategory] = []
      }
      groups[item.strCategory].push(item)
      return groups
    }, {})
  })
  
  const ingredients = computed(() => {
    if (!selectedItem.value) return []
    return Array.from({ length: 20 }, (_, i) => selectedItem.value[`strIngredient${i + 1}`]).filter(Boolean)
  })
  
  const measures = computed(() => {
    if (!selectedItem.value) return []
    return Array.from({ length: 20 }, (_, i) => selectedItem.value[`strMeasure${i + 1}`]).filter(Boolean)
  })
  
  onMounted(fetchMenuItems)
  </script>
  
  <style scoped>
  /* Optional: Add any custom styles here */
  </style>
  