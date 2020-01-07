<template>
  <div class="echartsLine" :parentId="parentId" :id="id" :style="style"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String
    },
    option: {
      type: Object
    },
    parentId:{
      type: Number
    }
  },
  data() {
    return {
      MyEcharts: "" //echarts实例
    };
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  watch: {
    //要监听的对象 option
    //由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    option: {
      handler(newVal, oldVal) {
        if (this.MyEcharts && this.MyEcharts.setOption) {
          if (newVal) {
            // console.log(newVal);

            this.MyEcharts.setOption(newVal, true);
          } else {
            this.MyEcharts.setOption(oldVal, true);
          }
        } else {
          this.InitCharts();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.InitCharts();
  },
  methods: {
    InitCharts() {
      const idElement = document.getElementById(this.id);
      if(idElement) {
        this.MyEcharts = this.$echarts.init(idElement);
        if(this.MyEcharts){
          this.MyEcharts.clear();
          this.MyEcharts.setOption(this.option, true); //设置为true可以是图表切换数据时重新渲染

          let _this = this;
          window.addEventListener("resize", function () {
            _this.MyEcharts.resize();
          });
          this.MyEcharts.on("click", (params) => {
            // let parentInfo = this.getParentInfo();
            // alert(this.parentId)
            let parentId = this.parentId
            if(parentId === 1){
          window.location.href = "loaddetail.html"
          //this.$router.push({
              //path: "/courtsManage/intelliOper/load/Loaddetailpage"
            //});
        } else if(parentId === 2){
           window.location.href = "voltagedetail.html"
          this.$router.push({
              path: "/courtsManage/intelliOper/voltage/voltagedetailpage"
            });
        } else if(parentId === 3){
           window.location.href = "phasedetail.html"
          this.$router.push({
              path: "/courtsManage/intelliOper/phase/phasedetails"
            });
        } else if(parentId === 4){
           window.location.href = "powerdetail.html"
          this.$router.push({
              path: "/courtsManage/intelliOper/power/powerdetailpage"
            });
        }

          });
        }
      }
    }
  }
};
</script>
