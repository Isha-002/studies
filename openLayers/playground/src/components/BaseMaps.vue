<script setup lang="ts">
import { h, ref } from 'vue'
import { Tree } from 'ant-design-vue'
import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons-vue'
import type { TreeProps } from 'ant-design-vue'
import { faMap } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  isDark: {
    type: Boolean,
  }
})


const emit = defineEmits(['nodeSelected'])



const expandedKeys = ref<string[]>([])

const onExpand: TreeProps['onExpand'] = (keys) => {
  expandedKeys.value = keys as string[]
}

const treeData = ref([
  {
    title: 'نقشه های پایه',
    key: 'maps',
    icon: () =>
      expandedKeys.value.includes('map')
        ? h(FolderOpenOutlined)
        : h(FolderOutlined),
    children: [
      {
        title: 'osm',
        key: 'osm',
        icon: () => h(FontAwesomeIcon, { icon: faMap }),
      },
      {
        title: 'mapTiler',
        key: 'mapTiler',
        icon: () => h(FontAwesomeIcon, { icon: faMap }),
      },
      {
        title: 'carto',
        key: 'carto',
        icon: () => h(FontAwesomeIcon, { icon: faMap }),
      },
      {
        title: 'topo map',
        key: 'topo',
        icon: () => h(FontAwesomeIcon, { icon: faMap }),
      },
      {
        title: 'wikimedia',
        key: 'wikimedia',
        icon: () => h(FontAwesomeIcon, { icon: faMap }),
      },
    ],
  },
])



const handleSelect = (_: any, info: any) => {
  const node = info.node.key
  emit('nodeSelected', node)
}



console.log(props.isDark)
</script>

<template>
  <Tree
    :tree-data="treeData"
    :expanded-keys="expandedKeys"
    @expand="onExpand"
    show-icon
    :show-line="{ showLeafIcon: false }"
    @select="handleSelect"
    :class="isDark ? '!bg-indigo-400 !text-white' : '!bg-white !text-black'"
  />
</template>
