<template>
  <ChartDailySubcategoryBase :chart-data="dataActivityGraph" :displayBase="display"/>
</template>

<script>
  import ChartDailySubcategoryBase from '@/static/js/BaseChart/ServiceOperation/ChartDailySubcategoryBase';

  export default {
    components: {
      ChartDailySubcategoryBase
    },
    props: {
      dataActivityGraph: {},
      display: false
    },
  };

</script>
