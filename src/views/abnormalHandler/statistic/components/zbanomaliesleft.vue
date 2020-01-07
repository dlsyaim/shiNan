<template>
  <div class="chart_page_wrap jcanomborder">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>指标异常</span>
      </div>
      <div class="chart_time calendar_time">
        <el-date-picker
          v-model="currentDate"
          class="month-picker"
          size="small"
          :editable="false"
          :clearable="false"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="datePickerHandleChange">
        </el-date-picker>
      </div>
    </div>   
    <div class="jcanom_charts">
    
      <div class="jcanom_Charts">
        <div class="echarts_wrap static_bottom active">
          <div class="zbanochartsleft">
              <!-- <LineCharts
            :id="'LightCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="GDYdefectOption"
            :parentId = '1'
          ></LineCharts> -->
           <div class="gdyleft" @click="toData(2)">
               <div class="zbanochartsleft_l">
                 <div class="gdyleft_top">
                   <img :src="GDYimg" />
                   <span>过电压</span> 
                </div> 
               </div>
               <div class="zbanochartsleft_r">
                  {{gdyNumber}}
                </div>
           </div>
          </div>
          <div class="zbanochartsright">
                  <div class="gdyleft" @click="toData(4)">
               <div class="zbanochartsleft_l">
                 <div class="gdyleft_top" >
                   <img :src="zyimg" />
                   <span>重载</span> 
                </div> 
               </div>
               <div class="zbanochartsleft_r">
                  {{zzNumber}}
                </div>
           </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template> 

<script>
import request from '@/utils/request'
import apiPath from '@/api/apiPath' 
import { getLightModuleDayData } from '@/api/api'
import { regionMonthStaticsForQZ } from '@/api/api'
import { getStatisticRateData,getZZTJRateData} from '@/api/api'
import LineCharts from "../../components/lineCharts";
import moment from "moment";
export default {
//  inject: ["setBreadcrumb"],
  components: {
    LineCharts: LineCharts
  },
  data(){
    return {
      gdyNumber:0,
      zzNumber:0,
      GDYimg: require("../../images/icon_GDY.png"),
      zyimg: require("../../images/icon_ZZ.png"),
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      // 当前时间
      currentDate: '',
      // 当日显示信息
      displayList: [],
      // 当月显示信息
      displayMonthList: [],
      // 当前显示信息
      currentDisplayList: [],
    };
  },
  mounted(){
     this.getTodayData();
  },
  methods:{
    // 日期选择
    datePickerHandleChange() {
      let postData={
        SSGS:'SP05',
        RQ:this.dataD(this.currentDate)
      };
      this.getData(postData);
    },
    toData(LX){
      window.location.href = 'tingdiandetail.html?' + "KSSJ=" + this.currentDate +"&" + "JSSJ=" + this.currentDate +"&" + "LX="+ LX +"&" + "TJTS=-1" + "&TYPE=G6";
    },
    dataR(time){
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      if(month.length<10)
      {
        month='0'+month;
      }
      let day = time.getDate()
      if(day.length<10)
      {
        day='0'+day;
      }
      return year+"-"+month+"-"+day;
    },
    dataD(time){
      return time.split('-').join('');
    },
    // 获取当前echarts数据
    getTodayData(){
      let postData={
        SSGS:'SP05',
        RQ:'1'
      };
      this.getData(postData);
    },
    getData(postData){
      getStatisticRateData(postData).then(res => {        
         let gdyNumber = 0; 
         let time=0;
          console.log('res1111111111111111111111111',res);
          res.data.forEach(item => {
            gdyNumber = gdyNumber*1 + Number(item.GDYS)
            time = moment(item.DATA_DATE,"YYYYMMDD").toDate()
          })
          this.gdyNumber = gdyNumber
          this.currentDate=this.dataR(time);
      })

     getZZTJRateData(postData).then(res => {        
         let zzNumber = 0; 
          console.log('res1111111111111111111111111',res);
          res.data.forEach(item => {
            zzNumber = zzNumber*1 + Number(item.ZZS)
          })
          this.zzNumber = zzNumber

      })
    },
  }
};
</script>
<style lang="scss" scoped>
   .zbanochartsleft_l{
     .gdyleft_top{
       img{
         display: inherit;
          margin: 0 auto;
       }
       span{
          display: block;
          text-align: center;
          line-height: 30px;
       }
     }
   }
</style>

