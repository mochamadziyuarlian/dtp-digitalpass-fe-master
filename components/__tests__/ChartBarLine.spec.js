import ChartBarLine from "../ChartBarLine.vue";

describe('ChartBarLine.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartBarLine.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
