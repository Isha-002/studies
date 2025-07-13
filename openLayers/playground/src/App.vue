<script setup lang="ts">
import './style.css';
import { h, onMounted, ref, watch } from 'vue';
import { useMap, type BaseLayerKey, type DrawType } from './composable/useMap';
import { Button, Drawer, Flex, Modal, Statistic } from 'ant-design-vue';
import {
  EditOutlined,
  GlobalOutlined,
  GoldOutlined,
  TableOutlined,
} from '@ant-design/icons-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Table from './components/Table.vue';
import type Draw from 'ol/interaction/Draw';
import { toLonLat } from 'ol/proj';
import BaseMaps from './components/BaseMaps.vue';

const isDark = ref(false);
const mapRef = ref(null);
const drawActive = ref(false);
let handleDraw: (type: DrawType) => void | null;
let draww: Draw | null;
const lnglat = ref(['0', '0']);
const zoom = ref('10');

onMounted(() => {
  if (mapRef.value) {
    const { draw, map, setBaseMap } = useMap(mapRef.value);

    handleDraw = (type: DrawType) => {
      drawActive.value = !drawActive.value;
      if (drawActive.value) {
        draww = draw(type);
      } else if (draww) {
        map.removeInteraction(draww);
        draww = null;
      }
    };
    ///////////////// mouse ////////////
    const center = map.getView().getCenter();
    if (center) {
      const [lng, lat] = toLonLat(center);
      lnglat.value = [lng.toFixed(2), lat.toFixed(2)];
    }
    map.on('pointermove', (event) => {
      const coordinate = event.coordinate;
      const [lng, lat] = toLonLat(coordinate);
      lnglat.value = [lng.toFixed(2), lat.toFixed(2)];
    });
    ///////////////// zoom ////////////
    zoom.value = map.getView().getZoom()?.toFixed(2) || '10.00';
    map.getView().on('change:resolution', () => {
      zoom.value = map.getView().getZoom()?.toFixed(2) || zoom.value;
    });
    ///////////////// change base ////////////
    setBaseMap(selectedMap.value as BaseLayerKey);

    watch(selectedMap, (newKey) => {
      setBaseMap(newKey as BaseLayerKey);
    });
    watch(isDark, (dark) => {
      selectedMap.value = dark ? 'dark' : 'osm';
    });

  }
});
</script>

<script lang="ts">
const isMobile = window.innerWidth < 600;
const selectedMap = ref('osm');
const openSideBar = ref(false);
const open = ref(false);

const handleModalOpen = () => {
  open.value = true;
};

const handleModalClose = () => {
  open.value = false;
};

const handleSidebarOpen = () => {
  openSideBar.value = true;
};
const handleSidebarClose = () => {
  openSideBar.value = false;
};

const handleSelectedMap = (node: BaseLayerKey) => {
  selectedMap.value = node;
};
</script>

<template>
  <div class="parent">
    <div
      ref="mapRef"
      class="w-full h-full"
    ></div>

    <div class="overlay">
      <Button
        type="text"
        shape="circle"
        size="small"
        :class="
          isDark
            ? '!bg-violet-900 w-max pointer-events-auto !m-2'
            : '!bg-white w-max pointer-events-auto !m-2'
        "
        @click="() => (isDark = !isDark)"
      >
        <FontAwesomeIcon
          :icon="isDark ? faMoon : faSun"
          style="vertical-align: middle"
          :class="isDark ? 'text-blue-50' : 'text-yellow-500'"
        />
      </Button>

      <!-- left -->
      <Flex
        class="row-span-2 row-start-5 pointer-events-none p-2 flex-col"
        justify="center"
        align="start"
        gap="6"
      >
        <Button
          :class="
            isDark
              ? drawActive
                ? 'pointer-events-auto !bg-blue-500 !text-white'
                : 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          :type="drawActive ? 'default' : 'primary'"
          shape="circle"
          size="small"
          @click="handleDraw('Polygon')"
        >
          <EditOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark ? 'pointer-events-auto !bg-violet-900' : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="small"
          @click="handleSidebarOpen"
        >
          <GlobalOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark ? 'pointer-events-auto !bg-violet-900' : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="small"
        >
          <GoldOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark ? 'pointer-events-auto !bg-violet-900' : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="small"
          @click="handleModalOpen"
        >
          <TableOutlined style="vertical-align: middle" />
        </Button>
      </Flex>

      <Modal
        :open="open"
        :closable="true"
        :maskClosable="true"
        @cancel="handleModalClose"
        @ok="handleModalClose"
        ok-text="ذخیره"
        centered
        :body-style="{ padding: '15px 0px' }"
      >
        <Table />
        <template #footer>
          <Button
            type="primary"
            @click="handleModalClose"
            >ذخیره</Button
          >
        </template>
      </Modal>

      <Drawer
        :open="openSideBar"
        :closable="true"
        @close="handleSidebarClose"
        :width="isMobile ? '100%' : '25%'"
        :headerStyle="{ backgroundColor: '#4d179a', color: 'white' }"
        :bodyStyle="{ backgroundColor: '#4d179a', color: 'white' }"
        :title="h('span', { style: 'color: white;' }, 'تغییر نقشه')"
        :closeIcon="h('span', { style: 'color: white; font-size: 20px;' }, '×')"
      >
        <BaseMaps @nodeSelected="handleSelectedMap" isDark/>
      </Drawer>

      <!-- right -->
      <Flex
        :class="[
          'flex-col row-span-4 col-span-2 col-start-7 row-start-5 pointer-events-none p-2 rounded ml-3 mt-[25%] h-max shadow',
          isDark ? '!bg-violet-900' : '!bg-white',
        ]"
      >
        <Flex
          justify="space-around"
          align="center"
          :class="[
            isDark ? '!bg-indigo-400' : '!bg-gray-100',
            'px-4 py-2 rounded-lg',
          ]"
        >
          <Statistic
            :value="lnglat[0]"
            class="text-center"
            :value-style="{
              fontSize: '12px',
              color: isDark ? 'white' : 'blue',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black' }">Lng</span>
            </template>
          </Statistic>

          <Statistic
            :value="lnglat[1]"
            class="text-center"
            :value-style="{
              fontSize: '12px',
              color: isDark ? 'white' : 'mediumseagreen',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black' }">Lat</span>
            </template>
          </Statistic>

          <Statistic
            :value="zoom"
            class="text-center"
            :value-style="{
              fontSize: '12px',
              color: isDark ? 'white' : 'crimson',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black' }">Zoom</span>
            </template>
          </Statistic>
        </Flex>
      </Flex>
    </div>
  </div>
</template>
