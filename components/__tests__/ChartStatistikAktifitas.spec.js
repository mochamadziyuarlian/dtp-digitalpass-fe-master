import ChartStatistikAktifitas from "../ChartStatistikAktifitas.vue";

describe('ChartStatistikAktifitas.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartStatistikAktifitas.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
