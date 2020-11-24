<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        xData: ["在线","离线", ],
        seriesData: [
          { value: this.$store.state.notonline, name: "离线" },
          { value: this.$store.state.online, name: "在线" }
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  },
  watch: {
    '$store.state.notonline': function () {
      //你需要执行的代码
      this.cdata.seriesData[0].value = this.$store.state.notonline
    },
    '$store.state.online': function () {
      //你需要执行的代码
      this.cdata.seriesData[1].value = this.$store.state.online   }
  }
}
</script>

<style lang="scss" scoped>
</style>