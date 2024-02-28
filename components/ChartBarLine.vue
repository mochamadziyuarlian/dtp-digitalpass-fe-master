<template>
  <ChartBarLineBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartBarLineBase from "@/static/js/ChartBarLineBase";

  export default {
    components: {
      ChartBarLineBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
