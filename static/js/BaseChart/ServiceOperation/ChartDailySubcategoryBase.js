import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: HorizontalBar,
    mixins: [reactiveProp],
    props: {
        chartData: null,
        displayBase: false
    },
    data() {
        return {
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: 'rgb(255,255,255)',
                    bodyFontColor: '#858796',
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: true,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function(tooltipItem, chart) {
                            return tooltipItem.xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            color: '#F4F4F4',
                            zeroLineColor: '#F4F4F4',
                        },
                        ticks: {
                            padding: 40,
                            fontStyle: '600',
                            fontColor: '#7F8C93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 14
                        }
                    }],
                    yAxes: [{
                        display: this.displayBase,
                        barPercentage: 0.5,
                        stacked: true,
                        gridLines: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            padding: 40,
                            fontStyle: '400',
                            fontColor: '#7F8C93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 14
                        }
                    }],
                },
                maintainAspectRatio: false,
                cornerRadius: 20
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};