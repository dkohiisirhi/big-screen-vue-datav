<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="colorBlue fw-b" style="text-align: center">{{ item.title }}</p>
        <div>
          <p class="colorBlue fw-b" style="font-size:.225rem;text-align: center">{{ item.number }}</p>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">电梯运行状态</span>
        <dv-scroll-ranking-board :config="ranking" style="height:2.75rem"/>
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>正常</span>
          <CenterChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData"/>
        </div>
        <div class="item bg-color-black">
          <span>离线</span>
          <CenterChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData"/>
        </div>
        <div class="water">
          <dv-water-level-pond :config="water" style="height: 1.5rem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from "@/components/echart/center/centerChartRate";

export default {
  data() {
    return {
      titleItem: [
        {
          title: "电梯编号",
            number: [this.$store.state.eleno],
        },
        {
          title: "电梯所在楼层",
            number: [this.$store.state.floor],
        },
        {
          title: "开关门状态",
            number: [this.$store.state.isOpen],
        },
        {
          title: "运行状态",
            number: [this.$store.state.runMileage],
        },
        {
          title: "运行里程",
            number: [this.$store.state.direction],
        },
        {
          title: "是否检修",
            number: ["已检修"],
        }
      ],
      ranking: {
        data: [
          {
            name: "周口",
            value: 55
          },
          {
            name: "南阳",
            value: 120
          },
          {
            name: "西峡",
            value: 78
          },
          {
            name: "驻马店",
            value: 66
          },
          {
            name: "新乡",
            value: 80
          },
          {
            name: "新乡2",
            value: 80
          },
          {
            name: "新乡3",
            value: 80
          },
          {
            name: "新乡4",
            value: 80
          },
          {
            name: "新乡5",
            value: 80
          },
          {
            name: "新乡6",
            value: 80
          },
        ],
        carousel: "single",
        unit: "人"
      },
      water: {
        data: [24, 45],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: "centerRate1",
          tips: 100,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5"
              }
            }
          }
        },
        {
          id: "centerRate2",
          tips: 0,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad"
              }
            }
          }
        }
      ]
    };
  },
  components: {
    CenterChart
    // centerChart1,
    // centerChart2
  },
  watch: {
    '$store.state.eleno': function () {
      this.titleItem[0].number = this.$store.state.eleno
  },
  '$store.state.floor': function () {
    //你需要执行的代码
    this.titleItem[1].number = this.$store.state.floor
  },
  '$store.state.isOpen': function () {
    //你需要执行的代码
    this.titleItem[2].number= this.$store.state.isOpen
  },
  '$store.state.runMileage': function () {
    //你需要执行的代码
    this.titleItem[3].number= this.$store.state.runMileage
  },
  '$store.state.direction': function () {
    //你需要执行的代码
    this.titleItem[4].number= this.$store.state.direction
  }
}
}
;
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;

  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      border-radius: 0.0625rem;
      padding-top: 0.2rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.875rem;
    }
  }

  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 3.1875rem;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 0.0625rem;
    }

    .ranking {
      padding: 0.125rem;
      width: 59%;
    }

    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 1.5rem;

        span {
          margin-top: 0.0875rem;
          display: flex;
          justify-content: center;
        }
      }

      .water {
        width: 100%;
      }
    }
  }
}
</style>