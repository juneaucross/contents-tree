<template>
  <a
    :href="page.link"
    :data-page-key="page.key"
    class="contents-link"
    :class="{ 'active-link': activePageKey === page.key }"
  >
    {{ page.name }}
  </a>
</template>

<script setup>
defineProps({
  page: {
    type: Object,
    required: true,
  },
  activePageKey: {
    type: String,
  },
});
</script>

<style scoped>
.contents-link {
  font-size: 14px;
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
}

.contents-link:hover {
  text-decoration: underline;
}
.active-link {
  color: var(--text-color);
  text-decoration: underline;
}
</style>
