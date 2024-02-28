<template>
  <ChartPengajuanByLayananBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartPengajuanByLayananBase from "@/static/js/ChartPengajuanByLayananBase";

  export default {
    components: {
        ChartPengajuanByLayananBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
