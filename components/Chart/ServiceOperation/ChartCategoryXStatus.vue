<template>
  <ChartCategoryXStatusBase :chart-data="dataActivityGraph" />
</template>

<script>
  import ChartCategoryXStatusBase from '@/static/js/BaseChart/ServiceOperation/ChartCategoryXStatusBase';

  export default {
    components: {
      ChartCategoryXStatusBase
    },
    props: {
      dataActivityGraph: {}
    },
  };

</script>
