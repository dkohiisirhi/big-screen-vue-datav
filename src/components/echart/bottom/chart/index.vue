<template>
  <Echart :options="echarts1_option" id="charts" height="6rem" width="100%"></Echart>
</template>

<script>
import Echart from "@/common/echart/index";
export default {
  created() {
  },
  methods:{
  },
  components: {Echart},
  data() {
    return {
      echarts1_option: {

        title: {
          text: '楼盘统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#9ac6f1', '#1e90ff'],
        legend: [
          {
            data: ['在线', '离线'],
          }
        ],
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              interval:0,
              rotate:20
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '在线',
            type: 'bar',
            stack: '个人信息',
            data: [],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          },
          {
            name: '离线',
            type: 'bar',
            stack: '个人信息',
            data: [],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          }
        ]
      },
    }
  },
  mounted() {
      this.$axios({
        url: "http://www.cloudelevator.net:8085/elevator/projects",
        method: "get"
      }).then(res => {
        this.echarts1_option.xAxis[0].data=res.data.map(item=> item.projectName)
        this.echarts1_option.series[1].data= res.data.map(item=> item.all_number-item.run_number)
        this.echarts1_option.series[0].data= res.data.map(item=> item.run_number)
        console.log(this.echarts1_option.xAxis)
      })
    }
}
</script>

<style scoped>

</style>