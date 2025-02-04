<script setup lang="ts">
const { refreshCart, removeItem } = useCart();
const { getFormattedPrice } = usePrice();
const { cartItems, totalPrice, count } = useCart();

onMounted(async () => {
  refreshCart();
});
</script>
<template>
  <Bounded>
    <div class="text-4xl font-bold">
      Masz
      <em class="highlightedText">
        {{ count }}
      </em>
      {{ declimationDreams(count) }}<span v-if="count"> w koszyku:</span>
      <span v-else>.</span>
    </div>

    <div
      class="mb-12 md:mb-0 mt-16 grid max-w-4xl grid-rows-[auto_auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10"
    >
      <article
        v-for="cartItem in cartItems"
        :id="cartItem.id"
        :key="cartItem.id"
        class="glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gray-950/60 p-4 before:bg-gray-100/10"
      >
        <h3 class="text-2xl">{{ cartItem.label }}</h3>
        {{ getFormattedPrice(cartItem?.price?.totalPrice) }}
        <button @click="removeItem(cartItem)" class="buttonLinkDanger ml-auto">
          Usuń marzenie
        </button>
      </article>
    </div>

    <div v-if="count > 0" class="text-2xl font-bold">
      Całkowita cena to:
      <em class="highlightedText font-black">{{
        getFormattedPrice(totalPrice)
      }}</em>
    </div>
    <div v-else>
      <NuxtLink to="/#shop" class="buttonLink">
        Kliknij, aby zobaczyć więcej marzeń
      </NuxtLink>
    </div>
  </Bounded>
</template>

<style scoped>
.highlightedText {
  @apply bg-gradient-to-b from-teal-400 to-sky-400 bg-clip-text not-italic text-transparent;
}
</style>
