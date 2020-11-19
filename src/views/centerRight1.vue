<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务完成排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:8.775rem;height:4.28rem"/>
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
    init: function () {
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
      setTimeout(()=> {
        this.socket.send('check')
      }, 1000);

    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function(msg) {
      let arr = new Array();
      JSON.parse(msg.data).forEach(item=> arr.push([item.eleno,item.floor,item.isOpen==1?'开门':'关门',item.speed,item.runMileage,item.openNum,item.direction==1?'上行':item.direction==0?'平层':'下行',item.floorsStopsDoor]))
      this.$set(this.config,"data",arr)
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
