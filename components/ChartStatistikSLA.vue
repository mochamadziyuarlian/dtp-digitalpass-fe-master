<template>
  <ChartStatistikSLABase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartStatistikSLABase from "@/static/js/ChartStatistikSLABase";

  export default {
    components: {
      ChartStatistikSLABase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
