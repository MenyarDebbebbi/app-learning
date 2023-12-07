<template>
<div class="dashboard__main">
    <div class="dashboard__title">
        <span>Dashboard</span>
    </div>

    <AnalyticCards />


</div>
</template>

<script>
import AnalyticCards from './AnalyticCards.vue';

export default {
    components: {
        AnalyticCards,
    }
}
</script>

<style>
.dashboard__main {
    padding: 2rem;
}
.dashboard__title {
    width: 100%;
    padding: 2rem 1rem;
}
.dashboard__title span {
    font-weight: 500;
    font-size: 24px;
    color: #5c5c5c;
}
</style>