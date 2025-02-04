<script lang="ts" setup>
import type { Schemas } from "#shopware";
const config = useRuntimeConfig();

const { apiClient } = useShopwareContext();
const sessionContextData = ref<Schemas["SalesChannelContext"]>();
const contextResponse = await apiClient.invoke("readContext get /context");
sessionContextData.value = contextResponse.data;

const headers = useRequestHeaders();

const localeFromHeader = headers?.["accept-language"]
  ?.split(",")
  ?.map(
    (languageConfig) => languageConfig.match(/^([a-z]{2}(?:-[A-Z]{2})?)/)?.[0]
  )
  .find(Boolean);

usePrice({
  currencyCode: sessionContextData.value?.currency?.isoCode || "",
  localeCode: localeFromHeader,
});

useSessionContext(sessionContextData.value);
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style></style>
