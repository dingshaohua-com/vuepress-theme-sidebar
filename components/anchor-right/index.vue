<script setup>
import './global.scss'
import { ref } from "vue";
import SubMenu from "./sub-menu.vue";
import { usePageData } from "@vuepress/client";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const page = usePageData();
const headerClick = (item) => {
  router.push(`#${item.slug}`);
};
</script>
<template>
  <div class="anchor-right">
    <div class="anchor-right-content">
      <ul>
        <template v-for="(item, index) in page.headers" :key="index">
          <template v-if="item.children.length > 0">
            <sub-menu :key="item.key" :menu-info="item" />
          </template>
          <template v-else>
            <li @click="headerClick(item)" :class="['level', 'level-' + item.level, { active: route.hash === `#${item.slug}` }]">
              {{ item.title }}
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
</style>
