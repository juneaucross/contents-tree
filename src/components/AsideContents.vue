<template>
  <aside class="contents-tree">
    <ul class="contents-list">
      <ListItem
        v-for="page in contentsTree"
        :page="page"
        :key="page.key"
        :active-page-key="activePageKey"
        @active-page-update="activePageKey = $event"
      />
    </ul>
  </aside>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useBuildTree } from '../composables/buildTree.js';
import { useGetData } from '../composables/getData.js';
import ListItem from './ListItem.vue';

const contentsTree = ref();
const activePageKey = ref('');
const API_URL = 'https://prolegomenon.s3.amazonaws.com/contents.json';

onBeforeMount(async () => {
  const { rootLevelKeys, pages } = await useGetData(API_URL);
  contentsTree.value = useBuildTree(pages, rootLevelKeys);
});
</script>

<style scoped>
.contents-tree {
  height: 100%;
  width: 300px;
  padding: 10px 0;
}
</style>
