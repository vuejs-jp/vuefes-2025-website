<script setup lang="ts">
import type { FormFieldState } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import FileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import { shallowRef, toRaw, useId } from "#imports";

export interface VFFile {
  name: string;
  objectURL: string;
  type: string;
}

defineProps<{
  formState?: FormFieldState;
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
}>();

const id = useId();
const descriptionId = useId();

const file = shallowRef<VFFile | null>(null);

function handleFileSelect(ev: FileUploadSelectEvent, formState: FormFieldState) {
  file.value = {
    name: ev.files[0].name,
    objectURL: ev.files[0].objectURL,
    type: ev.files[0].type,
  };
  if (formState) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (formState as any).onInput({ value: toRaw(file.value) });
  }
}
</script>

<template>
  <FormField v-slot="$field" class="vf-file-input" :name="name" initial-value="">
    <label v-if="label" :for="id">{{ label }}</label>

    <div class="file-upload-wrapper">
      <div class="image-preview">
        <img v-if="file" :src="file.objectURL" alt="Image" />
        <div v-else class="image-placeholder">
          <img src="/images/image-preview-placeholder.svg" alt="" />
        </div>
      </div>

      <FileUpload
        v-bind="$attrs"
        :id="id"
        :aria-describedby="descriptionId"
        mode="basic"
        custom-upload
        auto
        severity="secondary"
        class="p-button-outlined"
        @select="handleFileSelect($event, $field)"
      >
        <template #chooseicon>
          <div class="input-box" tabindex="0">
            <span v-if="file">{{ file.name }}</span>
            <span v-else>{{ placeholder }}</span>
          </div>
        </template>
      </FileUpload>
    </div>
    <p v-if="description" class="description text-caption">
      {{ description }}
    </p>
    <p
      v-if="formState?.invalid"
      :id="descriptionId"
      class="error-message text-caption"
      :aria-hidden="formState.valid"
    >
      <span>
        <span v-if="formState?.invalid">
          {{ formState.error.message }}
        </span>
      </span>
    </p>
  </FormField>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.vf-file-input {
  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    font-weight: bold;
  }

  .file-upload-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;

    .image-preview {
      width: 64px;
      height: 64px;
      border-radius: 0.5rem;
      border: 1px solid var(--color-divider);
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .image-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 13.3px 8.67px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    :deep(.p-button-label) {
      display: none;
    }

    img {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .input-box {
      width: 352px;
      padding: 1rem 0.5rem;
      border: 1px solid var(--color-divider);
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: var(--color-background-secondary);
      text-align: start;

      &:focus,
      &:hover {
        border-color: var(--color-primary);
      }
    }
  }

  .description {
    margin-top: 0.5rem;
    margin-bottom: 0rem;
  }

  .error-message {
    color: var(--color-alert);
    margin: 0.5rem 0;

    /* align to text-caption line-height */
    min-height: 19px;
    @media (--mobile) {
      line-height: 17px;
    }
  }
}
</style>
