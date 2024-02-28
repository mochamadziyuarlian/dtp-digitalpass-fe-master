<template>
  <ChartChannelBase :chartData="dataActivityGraph" :cutoutPercentageBase="cutoutPercentage"/>
</template>

<script>
  import ChartChannelBase from '@/static/js/BaseChart/ServiceOperation/ChartChannelBase';

  export default {
    components: {
      ChartChannelBase
    },
    props: {
      dataActivityGraph: {},
      cutoutPercentage: 0
    },
  };

</script>
