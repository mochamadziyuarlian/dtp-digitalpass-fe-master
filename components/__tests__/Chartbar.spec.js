import ChartBar from "../ChartBar.vue";

describe('ChartBar.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(ChartBar.props).toMatchObject({
            dataActivityGraph: {}
          });
    });
});
