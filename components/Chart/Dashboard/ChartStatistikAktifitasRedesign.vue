<template>
  <BaseStatistikAktifitasRedesign :chartData="Graph" />
</template>

<script>
  import BaseStatistikAktifitasRedesign from '@/static/js/BaseChart/Dashboard/BaseStatistikAktifitasRedesign';

  export default {
    components: {
      BaseStatistikAktifitasRedesign
    },
    props: {
      Graph: {}
    },
  };

</script>
