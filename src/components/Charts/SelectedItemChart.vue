<template>
  <div class="selected-chart">
    <h3 class="selected-chart__title">{{ title }}</h3>
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

import { options } from './data'

const props = withDefaults(defineProps<{ itemData: any; itemKey: string; title: string }>(), {
  itemData: {},
  itemKey: '',
  title: 'Chart title'
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
  width: 500px;
  max-width: 100%;
  height: 300px;
  padding-bottom: var(--space-m);

  &__title {
    margin-bottom: var(--space-2xs);
  }
}
</style>
