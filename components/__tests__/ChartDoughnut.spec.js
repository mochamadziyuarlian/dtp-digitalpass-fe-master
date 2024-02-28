import ChartDoughnut from "../ChartDoughnut.vue";

describe('ChartDoughnut.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartDoughnut.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
