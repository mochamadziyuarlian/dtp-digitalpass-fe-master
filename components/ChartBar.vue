<template>
  <ChartBarBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartBarBase from "@/static/js/ChartBarBase";

  export default {
    components: {
      ChartBarBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
