<template>
  <div class="selected-chart">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'

import { Bar } from 'vue-chartjs'

import { options } from '../data'

const props = withDefaults(defineProps<{ itemData: any; itemKey: string }>(), {
  itemData: {},
  itemKey: ''
})

const labels = computed(() => Object.keys(props.itemData))

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: props.itemKey,
        backgroundColor: '#7ab3ef',
        data: props.itemData
      }
    ]
  }
})
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>

<style scoped lang="scss">
.selected-chart {
  background: #ffffff;
  width: 600px;
  height: 300px;
}
</style>
