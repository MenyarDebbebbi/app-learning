<template>
  <div class="d-flex w-100 cards_wrapper">
    <AnalyticCard
    title="Professors"
    value="+85"
    icon="mdi-account"
    color="purple-darken-2"
    />

    <AnalyticCard
    title="Students"
    value="+442"
    icon="mdi-account-school"
    color="red-darken-2"
    />

    <AnalyticCard
    title="Courses"
    value="+755"
    icon="mdi-book-open-blank-variant"
    color="brown-darken-2"
    />

    <AnalyticCard
    title="Visitors"
    value="+12200"
    icon="mdi-account-group"
    color="light-green-darken-2"
    />

    <div class="notifications_card">
        <div class="notifications_card--title">
            <v-icon icon="mdi-bell" size="24"></v-icon>
            Notifications
        </div>
        <div class="notifications_card--list">
            <div><span class="message">{user} has purchased {course_title}</span> <span>8 seconds ago</span></div>
            <div><span class="message">{user} has purchased {course_title}</span> <span>8 seconds ago</span></div>
            <div><span class="message">{user} has purchased {course_title}</span> <span>8 seconds ago</span></div>
            <div><span class="message">{user} has purchased {course_title_course_title_course_title}</span> <span>8 seconds ago</span></div>
        </div>
    </div>
</div>
</template>

<script>
import AnalyticCard from './analyticCard.vue';
export default {
    name:'AnalyticsCards',
    components: {
        AnalyticCard,
    }
}
</script>

<style>
.cards_wrapper {
    justify-content: flex-start ;
    gap: 4rem;
}
.notifications_card {
    width: 36rem;
    border: 1px solid #c3c3c3;
    border-radius: 10px;
    height: 16rem;
}
.notifications_card--title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #c3c3c3;
}
.notifications_card--list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
.notifications_card--list div {
    display: flex;
    justify-content: space-between;
}
.notifications_card--list .message {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>