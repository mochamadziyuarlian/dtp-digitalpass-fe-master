import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ['chartData'],
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
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': ' + tooltipItem.yLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            fontStyle: '600',
                            fontColor: '#7F8C93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            color: 'rgb(234, 236, 244)',
                            zeroLineColor: 'rgb(234, 236, 244)',
                            drawBorder: false,
                        },
                        ticks: {
                            fontStyle: '400',
                            fontColor: '#7F8C93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 10
                        }
                    }],
                },
                maintainAspectRatio: false,
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};