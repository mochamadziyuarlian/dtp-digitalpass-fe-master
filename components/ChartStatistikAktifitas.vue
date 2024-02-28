<template>
  <ChartStatistikAktifitasBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartStatistikAktifitasBase from "@/static/js/ChartStatistikAktifitasBase";

  export default {
    components: {
      ChartStatistikAktifitasBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
