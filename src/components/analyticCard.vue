<template>
    <div :class="`card__main border bg-${color}`">
        <v-icon :icon="icon" size="80" class="text-white md:h-20 lg:w-100"></v-icon>
        <span class="card__title text-white">{{ title }}</span>
        <span class="card__value">{{ value  }}</span>
    </div>
</template>

<script>
export default {
    name: 'AnalyticCard',
    props: {
        color: {
            required: false,
            default: 'grey',
        },
        icon: {
            required: true,
        },
        title: {
            required: true,
        },
        value: {
            required: true,
        }
    }
}
</script>

<style>
.card__main {
    width: 12rem;
    height: 16rem;
    border-radius: 10px;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}
.card__title {
    font-weight: 700;
    font-size: 20px;
}
.card__value {
    font-size: 18px;
    font-weight: 600;
    color: white;
}
</style>