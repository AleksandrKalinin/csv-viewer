<template>
  <main class="main">
    <FileUpload @handleFileUpload="uploadFile" />
    <div class="charts">
      <div class="charts__item">
        <UsersChart @selectItem="selectItem" />
      </div>
      <div class="charts__item">
        <SubjectsChart @selectItem="selectItem" />
      </div>
    </div>
    <Modal ref="modal">
      <template #modal>
        <SelectedItemChart
          :itemData="selectedItemData"
          :itemKey="selectedItemKey"
          :title="selectedItemTitle"
        />
      </template>
    </Modal>
  </main>
</template>
<script setup lang="ts">
import FileUpload from './components/FileUpload.vue'
import UsersChart from './components/Charts/UsersChart.vue'
import SubjectsChart from './components/Charts/SubjectsChart.vue'
import SelectedItemChart from './components/Charts/SelectedItemChart.vue'
import Modal from './components/Modal.vue'
import { ref } from 'vue'

import { useFilesStore } from './stores/filesStore'

const { uploadFile } = useFilesStore()

const modal = ref<InstanceType<typeof Modal> | null>(null)

const selectedItemData = ref(null)
const selectedItemKey = ref('')
const selectedItemTitle = ref('')

const selectItem = (data: any, key: string, title: string) => {
  selectedItemData.value = data
  selectedItemKey.value = key
  selectedItemTitle.value = title
  modal.value?.toggleModalStatus()
}
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: wrap;
  padding: var(--space-2xl);
  background: var(--color-background-primary);
}
.charts {
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: var(--space-xl);
  padding: 0 var(--space-xl);

  &__item {
    height: 300px;
    max-height: 100%;
    width: 100%;
    max-width: calc(100% - 1px);
    background-color: var(--color-background-white);
    padding: var(--space-l) var(--space-l) var(--space-2xl);
    box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
  }
}
</style>
