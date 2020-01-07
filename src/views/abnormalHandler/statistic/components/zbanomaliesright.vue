<template>
  <div class="chart_page_wrap jcanomborder">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>HPLC采集终端异常事件</span>
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
      <div class="topboeder">
        <div class="echarts_wrap static_bottom" :class="{active: showTodayCharts}">
          <div class="zbanochartsleft">
              <div class="gdyleft"  @click="toData()">
               <div class="zbanochartsleft_l">
                 <div class="gdyleft_top">
                   <img :src="TDZDimg" />
                   <span>停电主动上报</span> 
                </div> 
               </div>
               <div class="zbanochartsleft_r">
                  {{tdNumber}}
                </div>
           </div>
          </div>
          <div class="zbanochartsright">
           <div class="gdyleft">
               <div class="zbanochartsleft_l">
                 <div class="gdyleft_top">
                   <img :src="HBGXimg" />
                   <span>户变关系变动</span> 
                </div> 
               </div>
               <div class="zbanochartsleft_r">
                  {{hbNumber}}
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
import {getHPLCData} from '@/api/api';
import LineCharts from "../../components/lineCharts";
export default {
//  inject: ["setBreadcrumb"],
  components: {
    LineCharts: LineCharts
  },
  data(){
    return {
      TDZDimg: require("../../images/icon_TD.png"),
      HBGXimg: require("../../images/icon_HB.png"),
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      tdNumber:'0',
      hbNumber:'0',
      // 当前时间
      currentDate:this.getPerData(0),
      //当前时间下一天
      nextDay: this.getPerData(1),
      // 当日显示信息
      displayList: [],
      // 当月显示信息
      displayMonthList: [],
      // 当前显示信息
      currentDisplayList: [],
      // 当日与本月选项
      checkedValue: '当日',
   
      loadValue: {
        thisDay: '23.36%',
        thisMonth: '46.36%',
      },
      // 当日echarts数据
      todayData: [],
      // 当月echarts数据
      monthData: [],
      // 当前echarts数据
      currentChartsData: [],
    
      showTodayCharts: true,
      data_end_date:null,
    };
  },
  mounted(){
    this.getHPLC();
    this.data_end_date = this.getPerData(1);
  },
  methods:{
     getPerData(add){
        let date = new Date();
        date.setDate(date.getDate()-1+add);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month<10){
          month = "0"+month;
        }
        if(day<10){
          day="0"+day
        }
        let preDate = year+"-"+month+"-"+day;
        return preDate;
     },
     getHPLC(){
        let postData= {
          org_no: "3140201", 
          data_beg_date: this.currentDate,
          data_end_date: this.nextDay
        }
        getHPLCData(postData).then(res => {
            if(res.data.length){
              this.tdNumber =  res.data[0].EVENTNUM1
              this.hbNumber =  res.data[0].EVENTNUM
            }
        })
     },

    toData(){
      window.location.href = 'statisticdetail.html?' + "org_no=" + '3140201' +"&" + "data_beg_date=" + this.currentDate +"&" + "data_end_date="+  this.data_end_date ; 
    
    },


    // 日期选择
    datePickerHandleChange(val) {
      this.currentDate = val;
      let currenttime = val;
      // console.log(currenttime);
       let endtime = new Date(new Date(currenttime).getTime() + 24*60*60*1000);
       console.log(endtime);     

      let params2={
        org_no:'3140201',
        data_beg_date:this.dataD(this.currentDate),
        data_end_date:this.dataR(endtime)     
      };
      this.data_end_date = this.dataR(endtime)
      this.getHPLC(postData)     
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

