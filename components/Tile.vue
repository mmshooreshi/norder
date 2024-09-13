<template>
    <div class="tiles">
      <div v-for="(tile, index) in tiles" :key="index" class="tile">
        <div class="card front"></div>
        <div class="card back"></div>
      </div>
      <a href="javascript:void(0);" class="reload" @click="reloadTiles">Reload</a>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tiles = ref(getNewTiles());
  
  function getNewTiles() {
    return Array.from({ length: 12 }, () => ({}));
  }
  
  function reloadTiles() {
    tiles.value = getNewTiles();
  }
  </script>
  
  <style scoped>
  $tile-bg: #cfcfdf;
  
  .tiles {
    left: 50%;
    perspective: 400px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 330px;
  }
  
  .tile {
    animation: .6s cubic-bezier(.25, .25, .25, 1.15) both fade-in;
    background: $tile-bg;
    border-radius: 4px;
    float: left;
    height: 75px;
    margin: 5px;
    width: 100px;
    
    .card {
      backface-visibility: hidden;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      
      &.front {
      }
      
      &.back {
        transform: rotateY(180deg);
      }
    }
  }
  
  @for $i from 1 through 12 {
    .tile {
      &:nth-child(#{$i}) {
        animation-delay: $i * (.04s);
      }
    }
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: rotateY(180deg);
    }
    
    100% {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
  
  .reload {
    background: #e2751c;
    background: linear-gradient(45deg, rgba(#e21c1c,1) 0%, rgba(#e2751c,1) 100%);
    border-radius: 50px;
    bottom: 20px;
    box-shadow: 0 5px 20px rgba(#000, .2);
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    left: 50%;
    letter-spacing: .075em;
    padding: 10px 15px;
    position: absolute;
    text-decoration: none;
    text-transform: uppercase;
    transform: translateX(-50%);
  }
  
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    text-align: center;
    font-family: helvetica, arial, sans-serif;
  }
  </style>
  