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
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, chart) {
                            return tooltipItem.yLabel + ' Pengajuan';
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
                            fontColor: '#8C8F93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 14
                        },
                        maxBarThickness: 50,
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
                            fontColor: '#8C8F93',
                            fontFamily: 'Nunito Sans',
                            fontSize: 14,
                            beginAtZero: true,
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
