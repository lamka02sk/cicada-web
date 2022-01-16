<template>
    <component :is="tag" :class="classes[tag]">
        <slot></slot>
    </component>
</template>

<script lang="ts">

    export default {
        props: ['tag'],
        setup() {
            return {
                classes: {
                    h2: 'text-gray-700 text-2xl',
                    h3: 'text-gray-700 text-xl'
                }
            }
        }
    }

</script>