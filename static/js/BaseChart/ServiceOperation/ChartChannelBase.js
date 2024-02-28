import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: {
        chartData: null,
        cutoutPercentageBase: 0
    },
    data() {
        return {
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                maintainAspectRatio: false,
                cutoutPercentage: this.cutoutPercentageBase,
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
