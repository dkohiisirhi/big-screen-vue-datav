<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  data () {
    return {
      cdata: {
        category: [

        ],
        lineData: [

        ],
        barData: [

        ],
        rateData: []
      }
    };
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
    // 根据自己的业务情况修改
    setData () {
      let all = this.cdata.lineData.reduce(function(previousValue, currentValue){
        return Number(previousValue) + Number(currentValue);
      });
      for (let i = 0; i < this.cdata.barData.length -1; i++) {
        let rate = this.cdata.barData[i] / all;
        this.cdata.rateData.push(rate.toFixed(2));
      }
    },
    //获取里程数
    init(){
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket("ws://www.cloudelevator.net:8085/websock/runMileage")
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
      this.socket.send("")
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function(msg) {
      let data = JSON.parse(msg.data)
      this.cdata.category = []
      this.cdata.lineData = []
      this.cdata.barData = []
      data.forEach(item=>{
        this.cdata.category.push(item.eleno);
        this.cdata.lineData.push(item.runMileage == "null"?"0":item.runMileage);
        this.cdata.barData.push(item.runMileage == "null"?"0":item.runMileage)
      })
      this.setData()
      setTimeout(()=> {
        this.socket.send("")
      }, 10000)
    },
    close: function () {
      console.log("socket已经关闭")
    }
  },
  created() {
    this.init()
  }

};
</script>

<style lang="scss" scoped>
</style>
