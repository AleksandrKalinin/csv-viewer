<template>
  <div class="imageupload__wrapper">
    <h2 class="imageupload__title">Upload file</h2>
    <input
      id="imageupload"
      ref="fileupload"
      accept=".xlsx, .xls, .csv"
      type="file"
      placeholder="Upload file"
      class="imageupload__file"
      @change="onFileUpload($event)"
    />
    <label
      id="drop_zone"
      for="imageupload"
      class="imageupload__label"
      @drop="dropHandler($event)"
      @dragover="dragOverHandler($event)"
    >
      <UploadIcon />
      <span class="imageupload__placeholder">
        Drag-and-drop csv file, or click to select file to upload.
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import UploadIcon from '@/assets/icons/UploadIcon.vue'

import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const emit = defineEmits<{
  (e: 'handleFileUpload', value: File): void
}>()

const fileupload = ref<HTMLInputElement | null>(null)
const encodedFile = ref<string>('')

const onFileUpload = async ($event: Event): Promise<void> => {
  const target = $event.target as HTMLInputElement
  console.log(target)
  if (target && target.files) {
    encodedFile.value = (await toBase64(target.files[0])) as string
    emit('handleFileUpload', encodedFile.value)
  }
}

const toBase64 = (fileInput: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileInput)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const dropHandler = (ev: DragEvent): void => {
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    ;[...ev.dataTransfer.items].forEach(async (item) => {
      console.log(item.type)
      if (item.kind === 'file' && item.type === 'text/csv') {
        const file = item.getAsFile() as File
        encodedFile.value = (await toBase64(file)) as string
      } else if (item.kind === 'file' && item.type !== 'text/csv') {
        toast('Incorrect file type!')
      }
    })
  }
}

const dragOverHandler = (ev: DragEvent): void => {
  ev.preventDefault()
}
</script>

<style scoped lang="scss">
.imageupload {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  &__delete {
    position: absolute;
    top: calc(var(--space-s) * -1);
    right: calc(var(--space-s) * -1);
    padding: var(--space-xs);
    border-radius: 50%;
    background: var(--color-blue-darkest);
    cursor: pointer;
    z-index: 2;
  }

  &__icon {
    width: var(--space-s);
    height: var(--space-s);

    :deep(path) {
      fill: var(--color-font-third);
    }
  }

  &__file {
    display: none;
  }

  &__input {
    width: 100%;
    margin-bottom: var(--space-s);
  }

  &__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-width: 300px;
    max-height: 300px;
    padding: var(--space-xl);
    border: 1px dashed var(--color-blue-regular);
    text-align: center;
    font-size: var(--font-size-s);
    color: var(--color-font-secondary);
    margin-bottom: var(--space-xs);
    overflow: hidden;
    cursor: pointer;
    background: var(--color-blue-lightest);
  }

  &__placeholder {
    display: flex;
    line-height: 1.5;
  }

  &__title {
    margin-bottom: var(--space-s);
    color: var(--color-font-primary);
    font-weight: 600;
  }

  &__submit {
    margin-top: var(--space-s);
  }
}
</style>
