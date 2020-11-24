<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2">各品牌电梯销量图</span>
      </div>
      <div class="d-flex jc-center body-box" style="margin-top: 0">
        <dv-capsule-chart :config="config" style="width: 100%;max-height:4.6rem"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        unit:"台"
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
        this.$set(this.config, "data", arr);
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
    height: 5.0625rem;
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