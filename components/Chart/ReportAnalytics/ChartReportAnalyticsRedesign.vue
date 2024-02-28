<template>
  <BaseReportAnalyticsRedesign :chartData="Graph" />
</template>

<script>
  import BaseReportAnalyticsRedesign from '@/static/js/BaseChart/ReportAnalytics/BaseReportAnalyticsRedesign';

  export default {
    components: {
      BaseReportAnalyticsRedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
