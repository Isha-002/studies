<script setup lang="ts">
import './style.css';
import { h, onMounted, ref, watch } from 'vue';
import { useMap, type BaseLayerKey, type DrawType } from './composable/useMap';
import { Button, Drawer, Flex, Modal, Statistic } from 'ant-design-vue';
import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  GoldOutlined,
  SaveOutlined,
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


let handleDraw: (type: DrawType) => void | null;
let draww: Draw | null;
let deleteSelected: () => void;

const lnglat = ref(['0', '0']);
const zoom = ref('10');

onMounted(() => {
  if (mapRef.value) {
    const { draw, map, setBaseMap, editMode, deleteSelected: del } = useMap(mapRef.value);
    ///////////////// draw ////////////
    handleDraw = (type: DrawType) => {
      editDraw.value = !editDraw.value;
      if (editDraw.value) {
        draww = draw(type);
      } else if (draww) {
        map.removeInteraction(draww);
        draww = null;
      }
    };
    ///////////////// modify ////////////
    watch(editDraw, (active) => {
      editMode(active);
    });
    deleteSelected = del;
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
const editDraw = ref(false)
const drawMode = ref(false);

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

const handleDrawMode = () => {
  drawMode.value = !drawMode.value;
  editDraw.value = !drawMode.value;
};
</script>

<template>
  <div class="parent">
    <div
      ref="mapRef"
      class="w-full h-full"
    ></div>

    <div class="overlay">
      <!-- dark mode button -->
      <Button
        type="primary"
        shape="circle"
        size="middle"
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

      <!-- edit draw buttons -->
      <Flex
        justify="center"
        :class="[
          'pointer-events-auto col-span-2 col-start-4 gap-2 h-min w-min place-self-center mb-[10%] px-3 py-1 rounded-full hidden',
          isDark ? 'bg-indigo-400 border-4 border-violet-900' : 'bg-gray-100 border-4 border-white',
          drawMode ? '' : '!hidden'
        ]"
      >
        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto !bg-[#06923E]'
          "
          type="primary"
          shape="circle"
          size="middle"
          @click=""
        >
          <SaveOutlined style="vertical-align: middle" />
        </Button>
        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="middle"
          @click="handleDraw('Polygon')"
        >
          <EditOutlined style="vertical-align: middle" />
        </Button>
        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto !bg-red-500'
          "
          type="primary"
          shape="circle"
          size="middle"
          @click="deleteSelected"
        >
          <DeleteOutlined style="vertical-align: middle" />
        </Button>
      </Flex>

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
              ? editDraw
                ? 'pointer-events-auto !bg-blue-500 !text-white'
                : 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          :type="editDraw ? 'default' : 'primary'"
          shape="circle"
          size="middle"
          @click="handleDrawMode"
        >
          <EditOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="middle"
          @click="handleSidebarOpen"
        >
          <GlobalOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="middle"
        >
          <GoldOutlined style="vertical-align: middle" />
        </Button>

        <Button
          :class="
            isDark
              ? 'pointer-events-auto !bg-violet-900'
              : 'pointer-events-auto'
          "
          type="primary"
          shape="circle"
          size="middle"
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
        :headerStyle="{
          backgroundColor: isDark ? '#4d179a' : 'white',
          color: isDark ? 'white' : 'black',
        }"
        :bodyStyle="{
          backgroundColor: isDark ? '#4d179a' : 'white',
          color: isDark ? 'white' : 'black',
        }"
        :title="
          h(
            'span',
            { style: isDark ? 'color: white;' : 'color: black;' },
            'تغییر نقشه'
          )
        "
        :closeIcon="
          h('span', { style: isDark ? 'color: white;' : 'color: black;' }, '×')
        "
      >
        <BaseMaps
          @nodeSelected="handleSelectedMap"
          :isDark="isDark"
        />
      </Drawer>

      <!-- right -->
      <Flex
        :class="[
          'flex-col row-span-4 col-span-2 col-start-7 row-start-5 pointer-events-none p-2 rounded ml-3 mt-[30%] h-max shadow',
          isDark ? '!bg-violet-900' : '!bg-white',
        ]"
      >
        <Flex
          justify="space-around"
          align="center"
          :class="[
            isDark ? '!bg-indigo-400' : '!bg-gray-100',
            'px-4 py-3 rounded-lg',
          ]"
        >
          <Statistic
            :value="lnglat[0]"
            class="text-center"
            :value-style="{
              fontSize: '18px',
              color: isDark ? 'white' : 'blue',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black', fontSize: '18px' }">Lng</span>
            </template>
          </Statistic>

          <Statistic
            :value="lnglat[1]"
            class="text-center"
            :value-style="{
              fontSize: '18px',
              color: isDark ? 'white' : 'mediumseagreen',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black', fontSize: '18px' }">Lat</span>
            </template>
          </Statistic>

          <Statistic
            :value="zoom"
            class="text-center"
            :value-style="{
              fontSize: '18px',
              color: isDark ? 'white' : 'crimson',
            }"
          >
            <template #title>
              <span :style="{ color: isDark ? 'white' : 'black', fontSize: '18px' }">Zoom</span>
            </template>
          </Statistic>
        </Flex>
      </Flex>
    </div>
  </div>
</template>
