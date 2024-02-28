<template>
  <BaseChartTotalPengajuanLayananBerlangsungRedesign :chartData="Graph" />
</template>

<script>
  import BaseChartTotalPengajuanLayananBerlangsungRedesign from '@/static/js/BaseChart/Dashboard/BaseChartTotalPengajuanLayananBerlangsungRedesign';

  export default {
    components: {
      BaseChartTotalPengajuanLayananBerlangsungRedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
