<template>
  <div class="tabs w-full">
    <div class="tab-buttons w-full">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { 'active': activeTab === index }]"
        @click="setActiveTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <transition
      name="jelly"
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div class="tab-content min-h-60 max-h-60" :key="activeTab">
        <slot :name="tabs[activeTab].name"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const props = defineProps({
  tabs: Array,
});

const activeTab = ref(0);

function setActiveTab(index) {
  activeTab.value = index;
  console.log('Active tab set to:', index); // Debugging statement
}

function beforeEnter(el) {
  el.style.transform = 'scale(0)';
  el.style.height = '0';
}

function enter(el, done) {
  nextTick(() => {
    el.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), height 0.6s ease';
    el.style.transform = 'scale(1)';
    el.style.height = el.scrollHeight + 'px';
    done();
  });
}

function leave(el, done) {
  nextTick(() => {
    el.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), height 0.6s ease';
    el.style.transform = 'scale(0)';
    el.style.height = '0';
    done();
  });
}
</script>

<style lang="scss" scoped>
$primary-color: #1e8fff;
$secondary-color: #33333325;
$background-color: #4a4a4a1b;
$highlight-color: #dadfcf5b;
$transition-time: 0.6s;
$bezier: cubic-bezier(0.68, -0.55, 0.27, 1.55);

.tabs {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 600px;
}

.tab-buttons {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  font-size: smaller;
  text-wrap: nowrap;
}

.tab-button {
  padding: 3px;
  cursor: pointer;
  border: none;
  background-color: $secondary-color;
  color: white;
  border-radius: 10px;
  animation: jelly 0.5s ease-in-out both;

  // transition: transform 0.3s ease, background-color 0.3s ease;
  border: 3px solid transparent;

  &.active {
    background-color: $primary-color;
    color: white;
    transform: scale(1.1) !important;

    &::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      transition: width 1s cubic-bezier(0.23, 1, 0.320, 1);
    }

    &:hover::after {
      width: 100%;
    }
  }

  &:hover {
    transform: scale(1.1);
    background-color: $highlight-color;
  }

  &:focus {
    outline: none;
    transform: scale(1);
    border: 3px solid $primary-color;
    
  }
}

.tab-content {
  // box-shadow: 0px 0px 20px 5px rgb(204, 1, 1) inset;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  animation: jelly $transition-time ease-in-out;
  // padding: 20px; // Add padding to ensure content is not right at the edge
  --mask: linear-gradient(to bottom, 
      rgba(0,0,0, 0) 0%,   rgba(0,0,0, 1) 10%, 
      rgba(0,0,0, 1) 90%, rgba(0,0,0, 0) 10%
  ) 100% 50% / 100% 100% repeat-x;
  
  -webkit-mask: var(--mask); 
  mask: var(--mask);
  

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 5px;
    background: $primary-color;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    animation: tab-highlight 1s ease forwards;
  }
}

.instructions, .ingredients {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: -10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: $primary-color;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin: 5px 0;
      padding: 5px;
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      opacity: 0;
      transform: translateY(20px);
      animation: jelly-row 0.6s $bezier forwards;
    }

    li:nth-child(1) {
      animation-delay: 0.1s;
    }
    li:nth-child(2) {
      animation-delay: 0.2s;
    }
    li:nth-child(3) {
      animation-delay: 0.3s;
    }
    li:nth-child(4) {
      animation-delay: 0.4s;
    }
    li:nth-child(5) {
      animation-delay: 0.5s;
    }
    // Add more nth-child selectors as needed for more list items
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

@keyframes jelly-row {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes springy {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.25);
  }
  60% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}
</style>

