<template>
    
    <form class="mb-4 last:mb-0 grid gap-4" @submit.prevent="() => $emit('submit')" autocomplete="on">
        <slot></slot>
    </form>
    
</template>
