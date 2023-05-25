<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps({
  menuInfo: {
    type: Object,
    default: true,
  }
});


const headerClick = (item) => {
  router.push(`#${item.slug}`);
};
</script>
<template>
  <li
    @click.prevent="headerClick(props.menuInfo)"
    :class="[
      'level',
      'level-'+props.menuInfo.level,
    ]"
  >
    <div :class="{ active: route.hash === `#${props.menuInfo.slug}` }">
      {{ props.menuInfo.title }}
    </div>
    <ul class="menu">
      <template v-for="(item, index) in props.menuInfo.children" :key="index">
        <sub-menu
          :key="item.key"
          :menu-info="item"
          :route="route"
          :router="router"
          v-if="item.children.length > 0 && item.level!== 3"
        />

        <li
          v-else
          @click.stop="headerClick(item)"
          :class="['level', 'level-'+item.level,  { active: route.hash === `#${item.slug}` }]"
        >
          {{ item.title }}
        </li>
      </template>
    </ul>
  </li>
</template>