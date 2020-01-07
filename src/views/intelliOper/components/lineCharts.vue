<template>
  <div class="echartsLine" :parentT="parentT" :parentId="parentId" :id="id" :getOverData="getOverData" :style="style" :loading="loading"></div>
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
    },
    parentT:{
      type: Number
    },
    getOverData:{

    },
    getUrl:{

    },
  },
  data() {
    return {
      MyEcharts: "", //echarts实例,
      loading:false
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
        if (this.MyEcharts) {
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
    },
    getOverData: {
      handler() {
        this.InitCharts();
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.InitCharts();
    console.log(this.getOverData);
  },
  methods: {

    getParentInfo(){
      return this.parentId,this.parentT
    },

    InitCharts() {
      this.MyEcharts = this.$echarts.init(document.getElementById(this.id));
      this.MyEcharts.clear();
      //this.MyEcharts.getOverData=this.getOverData;
      this.MyEcharts.setOption(this.option, true); //设置为true可以是图表切换数据时重新渲染
      let _this = this;
      
      window.addEventListener("resize", function() {
        _this.MyEcharts.resize();
      });
      this.MyEcharts.off("click");
       this.MyEcharts.on("click", (params) => {
        let RTU_WHBZ;
        let index;
        // console.log(this.getOverData);
        // console.log('params12234555',params);
        _this.loading=true;
        console.log(params,"params");
        // alert(params)
        if(params.componentSubType=="line"){
          return
        }
        for(let i=0;i<this.getOverData.data.length;i++)
        {
          if(this.getOverData.data[i].RTU_DEPT===params.name)
          {
            RTU_WHBZ=this.getOverData.data[i].RTU_WHBZ;
            index=i;
            break;
          }
        }
        let parentId = this.parentId
        let parentT = this.parentT 
       
        if(this.getOverData.type!='Month')
        {
          if(params.seriesName == '严重轻载' || params.seriesName == '严重过载' || params.seriesName == '严重过电压' || params.seriesName == '严重低电压' || params.seriesName == '严重三相不平衡' || params.seriesName == '功率因素严重过低') {
            if(this.getUrl)
            {
              window.location.href = this.getUrl+"?" + "type=" + this.getOverData.type  +"&" + "SSGS=" + this.getOverData.data[index].COMPANY +"&" + "KSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "JSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "WHBZ=" + RTU_WHBZ+"&" + "LX="+ parentT +"&" + "TJTS=-1";
            }
          }else {
          if(this.getUrl)
            {
              window.location.href = this.getUrl+"?" + "type=" + this.getOverData.type  +"&" + "SSGS=" + this.getOverData.data[index].COMPANY +"&" + "KSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "JSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "WHBZ=" + RTU_WHBZ+"&" + "LX="+ parentId +"&" + "TJTS=-1";
            }
          }  
        }else if(parentId == '10') {
          window.location.href = this.getUrl
        }
        else {
          if(params.seriesName == '严重轻载' || params.seriesName == '严重过载' || params.seriesName == '严重过电压' || params.seriesName == '严重低电压' || params.seriesName == '严重三相不平衡' || params.seriesName == '功率因素严重过低') {
            window.location.href = this.getUrl+"?" + "type=" + this.getOverData.type  +"&" + "SSGS="  + "KSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "JSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "LX="+ parentT +"&" + "TJTS=-1";
          }else
          {
            window.location.href = this.getUrl+"?" + "type=" + this.getOverData.type  +"&" + "SSGS="  + "KSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "JSSJ=" + this.getOverData.data[index].DATA_DATE +"&" + "LX="+ parentId +"&" + "TJTS=-1";
          }
        } 
      });
    }
  }
};
</script>
