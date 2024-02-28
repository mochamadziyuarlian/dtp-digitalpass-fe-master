<template>
  <ChartDoughnutBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartDoughnutBase from "@/static/js/ChartDoughnutBase";

  export default {
    components: {
      ChartDoughnutBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
