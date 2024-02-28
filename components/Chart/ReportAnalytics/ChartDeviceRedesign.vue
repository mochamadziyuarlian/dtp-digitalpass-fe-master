<template>
  <BaseDeviceRedesign :chartData="Graph" />
</template>

<script>
  import BaseDeviceRedesign from '@/static/js/BaseChart/ReportAnalytics/BaseDeviceRedesign';

  export default {
    components: {
      BaseDeviceRedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
