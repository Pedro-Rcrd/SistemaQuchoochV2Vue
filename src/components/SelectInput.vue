<script setup>
import { onMounted, ref } from 'vue';

defineProps(['modelValue', 'options']);

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
defineExpose({ focus: () => input.value.focus() });
console.log("++++++++++++++++++")
console.log(options.value);
</script>
<template>
    <select class="form-select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" ref="input">
        <option v-for="op in options" :key="op.codigoNivelAcademico" :value="op.codigoNivelAcademico">
            {{ op.nombreNivelAcademico }}
        </option>
    </select>
</template>