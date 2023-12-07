<!-- Banner.vue -->
<template>
    <v-card
      class="banner-card"
      :style="{ backgroundImage: `url('${bannerData.image}')` }"
      color="transparent"
      dark
    >
      <div class="overlay"></div> <!-- Overlay div -->
  
      <v-card-title></v-card-title> <!-- Empty title to preserve space for the overlay -->
  
      <v-card-subtitle></v-card-subtitle> <!-- Empty subtitle to preserve space for the overlay -->
  
      <!-- Overlay content -->
      <div class="overlay-content">
        <v-container class="text-center">
          <v-row>
            <v-col>
              <v-card-title class="white--text">{{ bannerData.title }}</v-card-title>
              <v-card-subtitle class="white--text">{{ bannerData.subtitle }}</v-card-subtitle>
              <v-btn color="primary" class="mt-8 rounded-xl" @click="bannerData.action.handler">
                {{ bannerData.action.text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-chip class="discount-chip flashy" v-if="bannerData.discount">
              {{ bannerData.discount }}% OFF
            </v-chip>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      bannerData: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .banner-card {
    height: 400px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  /* Overlay styling */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.26);
  }
  
  .overlay-content {
    position: absolute;
    color: white;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .discount-chip {
    position: absolute;
    color: white;
    border: 1px solid #b9b9b9;
    left: 1rem;
    top: 1rem;
    transition: all 100ms ;
}
.flashy {
  animation: flash 4s infinite;
}

@keyframes flash {
  0%, 50%, 100% {
    background-color: rgb(88, 68, 145);

  }
  25%, 75% {
    background-color: #7b4cb9; /* Alternate flashy color */
  }
}
.discount-chip:hover {
  transform: rotate(-20deg); /* Tilt the card slightly on hover */
}
  </style>
  