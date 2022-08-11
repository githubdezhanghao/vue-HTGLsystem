<template>
  <div ref="echart"></div>
</template>

<script>
import * as echart from "echarts";
import func from "vue-editor-bridge";
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xDate: [],
          series,
        };
      },
    },
    data() {
      return {
        axisOption: {
          textStyle: {
            color: "#333",
          },
          grid: {
            left: "20%",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxos: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: [
            "#2e7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
          ],
          series: [],
        },
        normalOption: {
          tooltip: "item",
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
        },
        echart:null
      };
    },
    watch: {
      chartData: {
        handler: function () {
          this.initChart()
        },
        deep: true,
      },
    },
    methods: {
      initChart() {
        this.initChart()
        if(this.echart){
            this.echart.setOption(this.options)
        }else{
            this.echart = echarts.init(this.$ref.echart)
            this.echart.setOption(this.options)
        }
      },
      initChart(){
        if(this.isAxisChart){
            this.axisOption.xAxis.data = this.chartData.xDate
            this.axisOption.series = this.chartData.series
        }else{
            this.normalOption.series = this.chartData.series
        }
      }
    },
    computed: {
      options() {
        return this.isAxisChart ? this.axisOption : this.normalOption;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>