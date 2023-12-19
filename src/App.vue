<template>
  <main class="main">
    <FileUploader @handleFileUpload="uploadCsvFile" />
    <div class="info">
      <section class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="selectItem"
            :chartData="subjectsChartData"
            chartTitle="Subjects statistics"
          />
        </div>
        <DataTable :labels="subjectsLabels" />
      </section>
      <section class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="selectItem"
            :chartData="studentsChartData"
            chartTitle="Students statistics"
          />
        </div>
        <DataTable :labels="studentsLabels" />
      </section>
    </div>
    <Modal ref="modal">
      <template #modal>
        <div class="selected-chart">
          <h3 class="selected-chart__title">{{ selectedItemTitle }}</h3>
          <BarChart :chartData="selectedItemData" />
        </div>
      </template>
    </Modal>
  </main>
</template>
<script setup lang="ts">
import FileUploader from './components/FileUploader.vue'
import BarChart from './components/BarChart.vue'
import DataTable from './components/DataTable.vue'
import Modal from './components/Modal.vue'
import { computed, ref } from 'vue'

import { useFilesStore } from './stores/filesStore'

const { uploadFile } = useFilesStore()

const modal = ref<InstanceType<typeof Modal> | null>(null)

const selectedItemData = ref(null)
const selectedItemTitle = ref('')

const selectItem = (data: any, key: string, title: string) => {
  selectedItemData.value = selectedChartData.value
  selectedItemTitle.value = title
  modal.value?.toggleModalStatus()
}

const selectedChartData = computed(() => {
  return {
    labels: studentsLabels,
    datasets: [
      {
        label: 'Average grade by student',
        backgroundColor: '#7ab3ef',
        data: [34, 78, 15]
      }
    ]
  }
})

const uploadCsvFile = (file: File) => {
  const formdata = new FormData()
  formdata.append('file', file)
  uploadFile(formdata)
}

const studentsLabels = [
  'John',
  'Jack',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny',
  'Jenny',
  'John',
  'Jack',
  'Jenny'
]
const subjectsLabels = ['history', 'math', 'literature']

const subjectsChartData = computed(() => {
  return {
    labels: subjectsLabels,
    datasets: [
      {
        label: 'Average value',
        backgroundColor: '#1666ba',
        data: [45, 56, 78]
      },
      {
        label: 'Median value',
        backgroundColor: '#368ce7',
        data: [44, 45, 66]
      }
    ]
  }
})

const studentsChartData = computed(() => {
  return {
    labels: studentsLabels,
    datasets: [
      {
        label: 'Average grade by student',
        backgroundColor: '#7ab3ef',
        data: [
          34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34,
          78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78,
          15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15,
          34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34,
          78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78, 15, 34, 78,
          15, 34, 78, 15
        ]
      }
    ]
  }
})
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: wrap;
  padding: var(--space-2xl);
  background: var(--color-background-primary);
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  gap: var(--space-xl);
  padding: 0 var(--space-xl);

  &__block {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: var(--space-6xl);
    max-height: 100%;
    width: 100%;
    background-color: var(--color-background-white);
    padding: var(--space-l) var(--space-l) var(--space-2xl);
    box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
    position: relative;
  }

  &__chart {
    height: 300px;
  }
}

.selected-chart {
  background: var(--color-background-white);
  width: 500px;
  max-width: 100%;
  height: 300px;
  padding-bottom: var(--space-m);

  &__title {
    margin-bottom: var(--space-2xs);
  }
}

@media only screen and (max-width: 992px) {
  main {
    flex-direction: column;
  }

  .info {
    padding: 0;

    &__block {
      max-width: 100%;
    }
  }
}
</style>
