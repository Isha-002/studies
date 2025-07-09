<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue'])
const update_input = (e) => {
  emit("update:modelValue", e.target.value)
} 

</script>

<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="update_input"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
    />
  </div>
</template>


