<template>
  <h2 class="chart-title">Subjects data</h2>
  <Bar @click="onClick" ref="chartRef" :data="chartData" :options="options" />
</template>

<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type InteractionItem
} from 'chart.js'

import { ref } from 'vue'
import { Bar, getElementAtEvent, type ChartComponentRef } from 'vue-chartjs'
import { options, data } from './data'
import { computed } from 'vue'

const emit = defineEmits<(e: 'selectItem', value: any, key: string, title: string) => void>()

const chartRef = ref<ChartComponentRef | null>(null)

const subjectsAverage = computed(() => {
  const dataset = {} as { [key: string]: number }
  for (const item in data) {
    const studentData: { [key: string]: number | string } = data[item as keyof typeof data]
    for (const subject in studentData) {
      if (Object.prototype.hasOwnProperty.call(dataset, subject)) {
        dataset[subject] += parseInt(studentData[subject] as string) || 0
      } else {
        dataset[subject] = parseInt(studentData[subject] as string) || 0
      }
    }
  }

  const avg = Object.fromEntries(
    Object.entries(dataset).map(([key, value]) => [
      key,
      Math.round(value / Object.values(data).length)
    ])
  )
  return avg
})

const subjectsMedian = computed(() => {
  const dataset = {} as { [key: string]: [number] }
  for (const item in data) {
    const studentData: { [key: string]: number | string } = data[item as keyof typeof data]
    for (const subject in studentData) {
      if (Object.prototype.hasOwnProperty.call(dataset, subject)) {
        dataset[subject].push(parseInt(studentData[subject] as string) || 0)
      } else {
        dataset[subject] = [parseInt(studentData[subject] as string) || 0]
      }
    }
  }

  const median = Object.fromEntries(
    Object.entries(dataset).map(([key, value]) => [key, findMedianValue(value)])
  )

  return median
})

const findMedianValue = (arr: number[]): number => {
  const mid = Math.floor(arr.length / 2)
  const sortedArr = arr.sort((a, b) => a - b)

  if (arr.length % 2 === 0) {
    return (sortedArr[mid - 1] + sortedArr[mid]) / 2
  } else {
    return sortedArr[mid]
  }
}

const elementAtEvent = (element: InteractionItem[]) => {
  if (!element.length) return

  emit(
    'selectItem',
    subjectsAverage.value,
    'Average value for each subject',
    'Detailed view for subject'
  )
}

const onClick = (event: MouseEvent) => {
  const {
    value: { chart }
  } = chartRef

  if (!chart) {
    return
  }

  elementAtEvent(getElementAtEvent(chart, event))
}

const chartData = computed(() => {
  return {
    datasets: [
      {
        label: 'Average value',
        backgroundColor: '#1666ba',
        data: subjectsAverage.value
      },
      {
        label: 'Median value',
        backgroundColor: '#368ce7',
        data: subjectsMedian.value
      }
    ]
  }
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>
<style scoped lang="scss">
.chart-title {
  text-align: center;
}
</style>
