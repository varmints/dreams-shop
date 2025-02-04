<script setup lang="ts">
import type { Content } from "@prismicio/client";
import {
  buildUrlPrefix,
  getProductFromPrice,
  getProductName,
  getProductRoute,
  getSmallestThumbnailUrl,
} from "@shopware/helpers";

const prismic = usePrismic();
// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.CaseStudiesSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { search, getElements } = useListing({
  listingType: "categoryListing",
  categoryId: "0194bc181b647d1d91cf09be701845f6",
  defaultSearchCriteria: {
    search: "",
    limit: 3,
    p: 1,
  },
});

search({
  includes: {
    product: [
      "id",
      "name",
      "cover",
      "description",
      "calculatedPrice",
      "translated",
    ],
    product_media: ["media"],
    media: ["url", "thumbnails"],
  },
});

const { getUrlPrefix } = useUrlResolver();

const { loadNavigationElements, navigationElements } = useNavigation();
</script>

<template>
  <Bounded
    id="shop"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicText
      class="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl"
      :field="slice.primary.heading"
      wrapper="h2"
    />
    <PrismicRichText
      class="mx-auto mt-6 max-w-md text-balance text-center text-gray-300"
      :field="slice.primary.body"
      wrapper="div"
    />
    <div class="mt-20 grid gap-16">
      <div
        v-for="(product, index) in getElements"
        :key="product.id"
        class="group relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
      >
        <div class="col-span-1 flex flex-col justify-center gap-4">
          <h3 class="text-4xl">
            {{ product.name }}
          </h3>
          <div class="max-w-md" v-html="product.description" />

          <NuxtLink
            :to="buildUrlPrefix(getProductRoute(product), getUrlPrefix())"
            class="z-10 after:absolute after:inset-0 hover:underline"
          >
            Zobacz szczegóły
          </NuxtLink>
        </div>

        <div class="relative lg:col-span-2" :class="index % 2 && 'md:-order-1'">
          <div class="image-glow -bottom-8 -left-4 bg-sky-500" />
          <div class="image-glow -right-4 -top-8 bg-teal-500" />
          <NuxtImg
            :src="product.cover?.media.url"
            class="z-20 scale-[.98] rounded-xl transition-transform duration-300 group-hover:scale-100"
          />
        </div>
      </div>
    </div>
  </Bounded>
</template>

<style scoped>
.image-glow {
  @apply absolute h-1/2 w-1/2 rounded-full opacity-0 mix-blend-screen blur-3xl transition-opacity duration-500 group-hover:opacity-30;
}
</style>
