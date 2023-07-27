<template>
  <li class="contents-list-item">
    <ul
      v-if="page?.children"
      class="contents-list"
    >
      <details
        class="details"
        @click.prevent="toggleDetails"
      >
        <summary class="summary">
          <button class="summary-marker">&#9654;</button>
          <PageLink
            :page="page"
            :active-page-key="activePageKey"
            @click.prevent="emitActivePage"
          />
        </summary>
        <ListItem
          v-for="child in page.children"
          :page="child"
          :key="child.key"
          :active-page-key="activePageKey"
          class="contents-list-item contents-list-item--inner"
          @click.prevent="emitActivePage"
        />
      </details>
    </ul>
    <PageLink
      v-else
      :page="page"
      :active-page-key="activePageKey"
      class="childless-link"
      @click.prevent="emitActivePage"
    />
  </li>
</template>

<script setup>
import PageLink from './PageLink.vue';

defineProps({
  page: {
    type: Object,
    required: true,
  },
  activePageKey: {
    type: String,
  },
});

const emit = defineEmits(['activePageUpdate']);
function emitActivePage(evt) {
  if (evt.target.dataset?.pageKey) {
    emit('activePageUpdate', evt.target.dataset.pageKey);
  }
}

function toggleDetails(evt) {
  if (evt.target.classList.contains('contents-link')) {
    evt.currentTarget.open = true;
  }

  if (evt.target.classList.contains('summary-marker')) {
    evt.stopPropagation();
    evt.currentTarget.open = !evt.currentTarget.open;
  }
}
</script>

<style scoped>
.contents-list-item {
  margin: 12px 0;
}

.contents-list-item--inner {
  margin-left: 16px;
}

.summary {
  display: flex;
  align-items: baseline;
}

.summary-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  padding: 0;
  height: 10px;
  margin-right: 6px;
  border: none;
  color: var(--link-color);
  background-color: transparent;
  transition: transform 0.3s;
}

.details[open] > .summary .summary-marker {
  transform: rotate(90deg);
}

.childless-link {
  display: block;
  margin-left: 16px;
}
</style>
