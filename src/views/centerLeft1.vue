<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务通过率</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CentreLeft1Chart />
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div class="item-box" v-for="(item,index) in numberData" :key="index">
          <div class="d-flex">
            <dv-digital-flop :config="item.number" style="width:2.5rem;height:.625rem;"/>
          </div>
          <p class="text" style="text-align: center;">
            {{item.text}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CentreLeft1Chart from "@/components/echart/centerLeft/centerLeft1Chart";
export default {
  data() {
    return {
      config: {
        lineWidth: 30,
        activeRadius: "80%",
        radius: "75%",
        activeTimeGap: 2000,
      },
      numberData:[]
    };
  },
  components: {
    CentreLeft1Chart
  },
  mounted() {
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.$axios({
        url: "http://www.cloudelevator.net:8085/elevator/isonline",
        method: "post"
      }).then(res => {
        this.$store.commit('size',res.data.size)
        this.$store.commit('online',res.data.online)
        this.$store.commit('notonline',res.data.notonline)
        let s=(res.data.notonline/res.data.size)*100
        this.$store.commit('notper',s)
        this.numberData =  [
          {
            number: {
              number: [res.data.online],
              toFixed: 0,
              content: "{nt}"
            },
            text: "电梯在线数量"
          },
          {
            number: {
              number: [res.data.size],
              toFixed: 0,
              content: "{nt}"
            },
            text: "总电梯数"
          },
          {
            number: {
              number: [res.data.notonline],
              toFixed: 0,
              content: "{nt}"
            },
            text: "电梯离线数"
          },
          {
            number: {
              number: [s],
              toFixed: 2,
              content: "{nt}"
            },
            text: "离线比例(%)"
          }
        ]
      })
    }
  }
};
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }

  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      // 金币
      .coin {
        position: absolute;
        left: 0.1rem;
        top: 0.2125rem;
        font-size: 0.25rem;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
    }
  }
}
</style>