import ChartPengajuanByLayanan from "../ChartPengajuanByLayanan.vue";

describe('ChartPengajuanByLayanan.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartPengajuanByLayanan.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
