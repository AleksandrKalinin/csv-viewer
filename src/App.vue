<script setup lang="ts">
import Table from './components/Table.vue'
import Fileupload from './components/Fileupload.vue'
import UsersChart from './components/UsersChart.vue'
import SubjectsChart from './components/SubjectsChart.vue'
import SelectedItemChart from './components/SelectedItemChart.vue'
import Modal from './components/Modal.vue'
import { ref } from 'vue'

const modal = ref<InstanceType<typeof Modal> | null>(null)

const selectedItemData = ref(null)
const selectedItemKey = ref('')

const selectItem = (data: any, key: string) => {
  selectedItemData.value = data
  selectedItemKey.value = key
  modal.value?.toggleModalStatus()
}
</script>

<template>
  <main>
    <div class="chart-wrapper">
      <UsersChart @selectItem="selectItem" />
    </div>
    <div class="chart-wrapper">
      <SubjectsChart @selectItem="selectItem" />
    </div>

    <Table />
    <!-- <Fileupload /> -->
    <Modal ref="modal">
      <template #modal="{ close }">
        <SelectedItemChart :itemData="selectedItemData" :itemKey="selectedItemKey" />
      </template>
    </Modal>
  </main>
</template>

<style scoped lang="scss">
.chart-wrapper {
  height: 300px;
  width: 600px;
}
</style>
