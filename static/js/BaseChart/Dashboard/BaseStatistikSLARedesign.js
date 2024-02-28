import { Bar, mixins } from 'vue-chartjs';
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
                    titleMarginBottom: 10,
                    titleFontColor: '#FFFFFF',
                    titleFontSize: 10,
                    backgroundColor: '#3B3D39',
                    bodyFontColor: '#FFFFFF',
                    borderColor: '#3B3D39',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: true,
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': ' + tooltipItem.yLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontStyle: 'normal',
                            fontColor: '#7F8C93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#F4F4F4',
                            zeroLineColor: '#F4F4F4',
                            drawBorder: false,
                            tickBorderDash: [5],
                            zeroLineBorderDash: [5],
                            borderDash: [5]
                        },
                        ticks: {
                            fontStyle: 'normal',
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
        this.renderChart(this.BaseGraph, this.options);
    }
};
