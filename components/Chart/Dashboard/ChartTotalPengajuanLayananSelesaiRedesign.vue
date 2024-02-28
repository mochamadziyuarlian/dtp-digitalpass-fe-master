<template>
  <BaseChartTotalPengajuanLayananSelesaiRedesign :chartData="Graph" />
</template>

<script>
  import BaseChartTotalPengajuanLayananSelesaiRedesign from '@/static/js/BaseChart/Dashboard/BaseChartTotalPengajuanLayananSelesaiRedesign';

  export default {
    components: {
      BaseChartTotalPengajuanLayananSelesaiRedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
