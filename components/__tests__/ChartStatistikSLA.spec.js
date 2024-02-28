import ChartStatistikSLA from "../ChartStatistikSLA.vue";

describe('ChartStatistikSLA.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartStatistikSLA.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
