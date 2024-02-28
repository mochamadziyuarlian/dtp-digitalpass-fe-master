<template>
  <BaseStatistikSLARedesign :chartData="Graph" />
</template>

<script>
  import BaseStatistikSLARedesign from '@/static/js/BaseChart/Dashboard/BaseStatistikSLARedesign';

  export default {
    components: {
      BaseStatistikSLARedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
