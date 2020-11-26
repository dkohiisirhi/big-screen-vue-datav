<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="ranking">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
          <span class="fs-xl text mx-2 mb-1">电梯品牌销量排行</span>
          <dv-scroll-ranking-board :config="ranking" style="height:4.5rem;width: 4rem"/>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ranking: {
        carousel: "single",
        unit: "台",
        rowNum:7,
      }
    };
  },
  components: {},
  mounted() {
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$axios({
        url: "http://www.cloudelevator.net:8085/elevator/brands",
        method: "get"
      }).then(res => {
        let arr = new Array()
        res.data.forEach((item, index) => {
          arr.push({
            name: item.brand,
            value: item.con
          })
        })
         this.$set(this.ranking, "data", arr);
      })
    }
  }
};
</script>

<style lang="scss">
#centreRight2 {
  padding: 0.0625rem;
  height: 5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;

  .bg-color-black {
    padding: 0.0625rem;
    //height: 5rem;
    border-radius: 0.125rem;
  }

  .text {
    color: #c3cbde;
  }

  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>