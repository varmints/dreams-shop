<script setup lang="ts">
import gsap from "gsap";

const { getFormattedPrice } = usePrice();
const { pushSuccess, pushError } = useNotifications();
const { getErrorsCodes } = useCartNotification();
const { resolveCartError } = useCartErrorParamsResolver();

const { search } = useProductSearch();

const productId = useRoute().params.uid;

if (productId === undefined || Array.isArray(productId)) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { product } = await search(productId);

const { unitPrice, price, tierPrices, isListPrice } = useProductPrice(
  ref(product)
);

const { addToCart, quantity } = useAddToCart(ref(product));

const addToCartProxy = async () => {
  await addToCart();

  setTimeout(() => {
    navigateTo("/checkout");
  }, 600);
};

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(".case-study__image", { opacity: 1 });
    return;
  }

  gsap.fromTo(
    ".case-study__image",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.inOut",
    }
  );
});
</script>

<template>
  <main>
    <Bounded>
      <header class="relative grid w-full place-items-center text-center">
        <DreamsGrid />
        <h1 class="text-5xl font-medium md:text-7xl">
          {{ product?.name }}
          <RichTextDreamsText class="block text-lg"
            >Marzenie</RichTextDreamsText
          >
        </h1>
        <p
          class="mb-4 mt-8 max-w-xl text-lg text-slate-300"
          v-html="product?.description"
        />
        <div class="text-4xl font-bold mb-1 mt-1">
          {{ getFormattedPrice(unitPrice) }}
        </div>
        <div v-if="isListPrice">
          <small
            class="text-base bg-gradient-to-b from-teal-400 to-sky-400 bg-clip-text not-italic text-transparent"
          >
            <del>
              {{ getFormattedPrice(price?.listPrice?.price) }}
            </del>
            (-{{ price?.listPrice?.percentage }}%)
          </small>
        </div>
        <div>
          <button
            class="buttonLink my-6 cursor-pointer"
            @click="addToCartProxy"
          >
            Kup teraz
          </button>
        </div>
        <NuxtImg
          :src="product?.cover?.media.url"
          class="case-study__image rounded-lg opacity-0 max-w-4xl w-full"
        />
      </header>
    </Bounded>
  </main>
</template>
