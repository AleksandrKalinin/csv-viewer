<template>
  <main class="main">
    <FileUpload @handleFileUpload="uploadCsvFile" />
    <div class="info">
      <!-- <div class="info__block">
        <div class="info__chart">
          <UsersChart @selectItem="selectItem" />
        </div>
        <Table :labels="labels" />
      </div>
      <div class="info__block">
        <div class="info__chart">
          <SubjectsChart @selectItem="selectItem" />
        </div>
        <Table :labels="labels" />
      </div> -->
      <div class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="selectItem"
            :chartData="subjectsChartData"
            chartTitle="Subjects statistics"
          />
        </div>
        <DataTable :labels="subjectsLabels" />
      </div>
      <div class="info__block">
        <div class="info__chart">
          <BarChart
            @selectItem="selectItem"
            :chartData="studentsChartData"
            chartTitle="Students statistics"
          />
        </div>
        <DataTable :labels="studentsLabels" />
      </div>
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
import FileUpload from './components/FileUpload.vue'
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

const studentsLabels = ['John', 'Jack', 'Jenny']
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
        data: [34, 78, 15]
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

  align-items: center;
  gap: var(--space-xl);
  padding: 0 var(--space-xl);

  &__block {
    display: flex;
    flex-direction: column;
    gap: var(--space-6xl);
    max-height: 100%;
    width: 100%;
    max-width: calc(100% - 100px);
    background-color: var(--color-background-white);
    padding: var(--space-l) var(--space-l) var(--space-2xl);
    box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
  }

  &__chart {
    height: 300px;
  }
}

.selected-chart {
  background: #ffffff;
  width: 500px;
  max-width: 100%;
  height: 300px;
  padding-bottom: var(--space-m);

  &__title {
    margin-bottom: var(--space-2xs);
  }
}

@media only screen and (max-width: 768px) {
  main {
    flex-direction: column;
  }

  .info {
    padding: 0 var(--space-s);

    &__block {
      max-width: 100%;
    }
  }
}
</style>
