<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="2.75rem"
      width="3.25rem"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data () {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    cdata: {
      handler (newData) {
        this.options = {
          color: [
            "#ff0000",
            "#37a2da"
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: "horizontal",
            icon: "circle",
            bottom: 0,
            x: "center",
            data: newData.xData,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "电梯状态统计",
              type: "pie",
              radius: [10, 60],
              center: ["50%", "40%"],
              data: newData.seriesData
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>