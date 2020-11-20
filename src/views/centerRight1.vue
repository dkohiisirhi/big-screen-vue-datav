<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">电梯列表</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:8.775rem;height:4.28rem" @click="row"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      config: {
        header: ["电梯编号", "楼层", "是否开门","运行速度","运行里程","开门次数","状态","层/站"],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        columnWidth: [120,70,90,90,90,90,70,70],
        align: ["center"],
      },
      path:"ws://www.cloudelevator.net:8085/websock/test",
      socket:""
    };
  },
  components: {},
  created() {
    this.init()
  },
  methods: {
    row: function (row) {
      console.log("点击")
      this.$store.commit('eleno',row.row[0])
      this.$store.commit('floor',row.row[1])
      this.$store.commit('isOpen',row.row[2])
      this.$store.commit('runMileage',row.row[4])
      this.$store.commit('direction',row.row[6])
      console.log(this.$store.state.eleno)
    },
    init: function () {
      this.$axios({
        url: "http://localhost/elevators",
        method: "get"
      }).then(res => {
        console.log(res)
        let arr = new Array();
        JSON.parse(res.data).forEach(item=> arr.push([item.eleno,item.floor,item.isOpen,item.speed,item.runMileage,item.openNum,item.direction,item.floorsStopsDoor]))
        this.$delete(this.config,"data")
        this.$set(this.config,"data",arr)
        this.$store.commit('eleno',res.data[0].eleno)
        this.$store.commit('floor',res.data[0].floor)
        this.$store.commit('isOpen',res.data[0].isOpen)
        this.$store.commit('runMileage',res.data[0].runMileage)
        this.$store.commit('direction',res.data[0].direction)
      })
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log("success")
      this.socket.send('check')
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function(msg) {
      this.$store.commit('floor',msg.data.floor)
      this.$store.commit('isOpen',msg.data.isOpen)
      this.$store.commit('runMileage',msg.data.runMileage)
      this.$store.commit('direction',msg.data.direction)
      setTimeout(()=> {
        this.socket.send(this.$store.state.eleno)
      }, 1000)
    },
    close: function () {
      console.log("socket已经关闭")
    }
  }
};
</script>

<style lang="scss">
#centreRight1 {
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
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>
