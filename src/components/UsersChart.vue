<template>
  <Bar
    @click="onClick"
    ref="chartRef"
    :selectedItem="selectedItem"
    :data="chartData"
    :options="options"
  />
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
import type { IStudentGrades } from '../types'
import { options, data } from '../data'
import { computed } from 'vue'

const emit = defineEmits<(e: 'selectItem', value: any, key: string) => void>()

const chartRef = ref<ChartComponentRef | null>(null)

const selectedItem = ref(null)

const elementAtEvent = (element: InteractionItem[]) => {
  if (!element.length) return

  const { index } = element[0]

  const selected = Object.keys(formatted.value)[index]

  console.log(data[selected as keyof typeof data])
  emit('selectItem', data[selected as keyof typeof data], Object.keys(data)[index])
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

const labels = computed(() => {
  return Object.keys(data)
})

const formatted = computed<IStudentGrades>(() => {
  const grades = {} as IStudentGrades
  for (let item in data) {
    const obj = data[item as keyof typeof data]
    const values = Object.values(obj)
    const average = Math.round(
      values.map((grade) => parseInt(grade as string) || 0).reduce((a, b) => a + b) / values.length
    )

    grades[item as keyof typeof grades] = average
  }
  return grades
})

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: 'Average',
        backgroundColor: '#7ab3ef',
        data: formatted.value
      }
    ]
  }
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>
