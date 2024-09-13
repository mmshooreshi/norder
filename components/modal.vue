<template>
  <div ref="modalContent"
    class="modal-content bg-background dark:bg-dark-background p-6 rounded-lg w-full max-w-lg relative mt-2 mb-2 shadow-lg h-[95vh] overflow-auto">
    <button 
      class="close-button absolute top-2 right-2 text-red-500 text-sm rounded-lg p-1 transition-transform duration-300 ease-out hover:bg-primary/25 dark:hover:bg-dark-primary/25" 
      @click="closeModal">
      ✖
      <span class="hidden group-hover:block">{{ $t('global.close') }}</span>
    </button>

    <h2 class="text-2xl font-bold mb-2 mt-2">
      {{ item.strMeal }}
    </h2>

    <img :src="item.strMealThumb" alt="Meal Image" class="w-full h-40 object-cover mb-4 rounded-lg shadow-md" />

    <div
      class="animated-gradient text-white font-bold py-2 mb-4 px-4 mx-4 cursor-pointer max-w-full rounded-lg hover:bg-red/10 transform hover:scale-105">
      {{ formatPrice(item.price) }} {{ $t('global.price_unit') }}
    </div>
    
    <Tab :tabs="tabs">
      <template #Ingredients>
        <ul class="px-4 my-0 pt-2 pb-6 max-h-60 mx-0 overflow-auto">
          <li v-for="(ingredient, index) in ingredients" :key="index" 
              class="flex justify-between items-center p-2 mb-1 ml-1 mr-2 bg-background-color rounded-lg hover:bg-highlight-color transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-color roww">
            <span>{{ ingredient }}</span>
            <span class="ltr">
              <span class="text-blue-500">{{ getNumberPart(measures[index]) }}</span>
              <span class="text-gray-500 text-sm mx-1">{{ getUnitPart(measures[index]) }}</span>
            </span>
          </li>
        </ul>
      </template>

      <template #Instructions>
        <p class="mb-0 pt-4 text-sm max-h-60 ltr pr-4 pl-2 pb-4 text-justify overflow-auto rounded-lg">
          {{ item.strInstructions }}
        </p>
      </template>

      <template #Tags v-if="item.strTags">
        <div class="tiles">
          <div v-for="(tag, index) in item.strTags.split(',')" :key="index" class="tile">
            {{ tag.trim() }}
          </div>
        </div>
      </template>

      <template #Source>
        <div class="mt-4 mb-6 flex gap-4">
          <a v-if="item.strYoutube" :href="item.strYoutube" target="_blank" class="text-blue-500 underline">{{
            $t('global.watch') }}</a>
          <a v-if="item.strSource" :href="item.strSource" target="_blank" class="text-blue-500 underline">{{
            $t('global.source') }}</a>
        </div>
      </template>
    </Tab>

    <button
      class="animated-gradient2 sticky bottom-0 bg-accent dark:bg-dark-accent text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-accent-hover dark:hover:bg-dark-accent-hover"
      @click="orderItem(item)">
      {{ $t('global.order') }}
    </button>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { onClickOutside } from '@vueuse/core';
import { spring } from 'vue3-spring';
import Tab from './Tab.vue';

const props = defineProps({
  item: Object,
});

const emits = defineEmits(['close', 'order']);

const { locale, t } = useI18n();
const directionClass = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'));

const modalContent = ref(null);

const tabFields = ['Ingredients', 'Instructions', 'Tags', 'Source'];
const tabs = computed(() => tabFields.map(field => ({
  name: field,
  label: t(`global.${field.toLowerCase()}`)
})));

const item = ref(props.item);

watch(() => props.item, (newItem) => {
  item.value = newItem;
  console.log('Updated item:', newItem); // Debugging statement
});

function getNumberPart(measure) {
  const match = measure.match(/^\d*\.?\d+(?:(\/|:)\d*\.?\d+)?|^\d*\/\d*|^\d*\.?\d+|\d*\.?\d+\/\d*\.?\d+|[¼½¾⅓⅔⅛⅜⅝⅞]/);
  return match ? match[0] : '';
}

function getUnitPart(measure) {
  const match = measure.match(/^\d*\.?\d+(?:(\/|:)\d*\.?\d+)?|^\d*\/\d*|^\d*\.?\d+|\d*\.?\d+\/\d*\.?\d+|[¼½¾⅓⅔⅛⅜⅝⅞]/);
  return match ? measure.replace(match[0], '').trim() : measure;
}

function closeModal() {
  emits('close');
}

function orderItem(item) {
  alert(`${t('order.confirm')} ${item.strMeal}! ${t('global.price')}: ${formatPrice(item.price)} ${t('global.price_unit')}`);
  emits('close');
}

function formatPrice(amount) {
  return Number(amount).toLocaleString(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });
}

const ingredients = computed(() => {
  if (!item.value) return [];
  return Array.from({ length: 20 }, (_, i) => item.value[`strIngredient${i + 1}`]).filter(Boolean);
});

const measures = computed(() => {
  if (!item.value) return [];
  return Array.from({ length: 20 }, (_, i) => item.value[`strMeasure${i + 1}`]).filter(Boolean);
});

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown);
  await nextTick();
  if (modalContent.value) {
    spring(100, { opacity: 1, transform: 'translateY(0)' }, { from: { opacity: 0, transform: 'translateY(-20px)' } });
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

onClickOutside(modalContent, () => {
  closeModal();
});
</script>

<style lang="scss" scoped>
$primary-color: #1e8fff;
$secondary-color: #33333325;
$background-color: #4a4a4a1b;
$highlight-color: #dadfcf5b;
$transition-time: 0.6s;
$bezier: cubic-bezier(0.68, -0.55, 0.27, 1.55);

.modal-content {
  text-align: justify;
}

.tiles {
  margin-top: 15px;
  margin-bottom: auto;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items:flex-start;
  // width: 100%;
}

.tile {
  --mask2: linear-gradient(to bottom,
      rgba(0,0,0, 0) -50%, rgba(0,0,0, 1) 20%,
      rgba(0,0,0, 1) 100%, rgba(0,0,0, 0) 11%
  ) 100% 50% / 100% 100% repeat-x;
  
  --mask3: linear-gradient(to bottom,
      rgba(0,0,0, 0) -500%, rgba(0,0,0, 1) 20%,
      rgba(0,0,0, 1) 100%, rgba(0,0,0, 0) 11%
  ) 100% 50% / 100% 100% repeat-x;

  -webkit-mask: var(--mask2); 
  mask: var(--mask2);

  animation: bounceIn 0.6s ease-in-out backwards;
  background: #cfcfdf18;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  color: #1de8b289;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier( 0.175, 0.885, 0.32, 1.275 ) , color 0.3s ease-in-out;

  &:hover {
    -webkit-mask: unset;
  mask: unset;

    transform: scale(1.1) rotate(5deg);
    color: #1de8b2;
    transition: transform 0.2s cubic-bezier( 0.23, 1, 0.32, 1 ), color 0.3s ease-in-out;
  }

  &:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    // width: 100%;
    height: 100%;
    transform: rotate(-45deg);
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.3s;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    // width: 100%;
    height: 100%;
    transform: rotate(0deg);
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.1s;
    }
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-1000px) rotateX(45deg) rotateY(45deg);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) translateY(30px) rotateX(0deg) rotateY(0deg);
  }
  80% {
    transform: scale(0.9) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

h2, img, .text-md,  .tab-content, button {
  animation: jelly 0.3s ease-in-out backwards;
}

h2 {
  animation-delay: 0.1s;
}

img {
  animation-delay: 0.1s;
}

.text-md {
  animation-delay: 0.2s;
}

.tab-content {
  animation-delay: 0.1s;
}

button {
  animation-delay: 0.1s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.jelly-enter-active, .jelly-leave-active {
  transition: transform $transition-time $bezier, height $transition-time ease;
}

.jelly-enter, .jelly-leave-to {
  transform: scale(0);
  height: 0;
}

@keyframes tab-highlight {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes jelly {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.modal-content {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.roww {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: $background-color;
  border-radius: 5px;
  transition: transform 0.3s $bezier, background-color 0.3s ease-in-out;
  animation: slideIn 0.5s $bezier both;

  &:hover {
    transform: scale(1.05) translateY(-5px);
    background-color: lighten($background-color, 90%);
    transition: transform 0.2s $bezier, background-color 0.2s ease-in-out;
  }

  &:active {
    transform: scale(0.97);
    background-color: darken($background-color, 10%);
    transition: transform 0.1s $bezier, background-color 0.1s ease-in-out;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.5);
    transition: box-shadow 0.3s ease-in-out;
  }

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.1s;
    }
  }
}


@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

h2{
  cursor: pointer;
  transition: transform 0.1s ease-in-out, padding 0.3s ease-in-out;
  padding: 0%;
max-width: fit-content;
  
}
h2:hover{
  transform: scale(1.3) translateY(12%) translateX(-13%);
  padding-top: -5%;
  
  transition: transform 0.2s ease-in-out, padding 0.3s ease-in-out;

}

img{
  background-color: $background-color;
  cursor: pointer;
  // height: 90%;
  filter: grayscale(100%);
  height: 30%;

  border-radius: 5px;
  margin-top: 0px;
  transition: transform 0.3s $bezier, background-color 0.3s ease-in-out, filter 0.5s ease, height 0.5s ease, margin 0.5s ease ;
  margin-top: 20px;

}
img:hover {
  filter: grayscale(0%);

    transform: scale(1.05) translateY(-5px);
    background-color: lighten($background-color, 90%);
    // height: 40%;
    
    // margin-bottom: 10px;

    transition: transform 0.3s $bezier, background-color 0.2s ease-in-out, filter 0.5s ease, height  0.5s ease, margin 0.5s ease;
  }

  img:active {
  filter: grayscale(0%);
  height: 100%;
  margin-top: 15%;
  z-index: 0;
  margin-bottom: 50%;


    transform: scale(1.05) translateY(-5px);
    background-color: lighten($background-color, 90%);
    transition: transform 0.3s $bezier, background-color 0.2s ease-in-out, filter 0.5s ease, height 0.5s ease, margin 0.5s ease;
  }

  .animated-gradient {
    background: linear-gradient(270deg, #ff000089,  #7700ff15);
    background-size: 160% 160%;
    -webkit-animation: backgroundAnimation 10s ease infinite;
    -moz-animation: backgroundAnimation 10s ease infinite;
    animation: backgroundAnimation 10s ease infinite;
    transition: all 1s ease;
}
.animated-gradient:hover{
  background-size: 30% 30%;
  transition: all 1s ease;


}

// .animated-gradient2 {
//   background: linear-gradient(270deg, rgba(255, 0, 0, 0.53), rgba(119, 0, 255, 0.08));
//   background-size: 160% 160%;
//   animation: backgroundAnimation 10s linear infinite;
//   transition: background-size 1s ease, backdrop-filter 1s ease;
// }

// .animated-gradient2:hover {
//   background-size:70% 10%;
//   // background-size:     contain;
//     // background-repeat:   no-repeat;
//     // background-position: top center;

// }

.animated-gradient2 {
  --c: #1095c1; /* the color */
  
  color: #0000;
  background: 
    linear-gradient(90deg,#fff 50%,var(--c) 0) calc(100% - var(--_p,0%))/200% 100%,
    linear-gradient(var(--c) 0 0) 0% 100%/var(--_p,0%) 100% no-repeat;
  -webkit-background-clip: text,padding-box;
          background-clip: text,padding-box;
  transition: 0.5s;
  // margin:1%;
  padding: -1%;
  
  border: 1px solid var(--c);
}
.animated-gradient2:hover {
  --_p: 100%
}


@-moz-keyframes backgroundAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes backgroundAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

</style>


