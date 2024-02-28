<template>
  <BaseJumlahPerTahapan :chartData="Graph" />
</template>

<script>
  import BaseJumlahPerTahapan from '@/static/v3/Portal/js/BaseChart/Dashboard/BaseJumlahPerTahapan';

  export default {
    components: {
      BaseJumlahPerTahapan
    },
    props: {
      Graph: {}
    },
  };

</script>
