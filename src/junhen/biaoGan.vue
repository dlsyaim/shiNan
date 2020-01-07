
<template>
  <div class="echarts">
    <div id="cxCharts" ref="cxCharts" style="width:500px;height: 290px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons.js'

export default {
  name: 'slxp-imWatch',
    props: {
        totleData: {
        type: Object
        },
        firstName:{
         type: String,
         default: "连续15超标"
        },
         secondName:{
         type: String,
         default: "累计10天超标"
        },
        width: {
        type: String,
        default: "100%"
        },
        height: {
        type: String,
        default: "302"
        }
  },
  data () {
    return {
        
  
    }
  },
 
  created () {
  },
  mounted () {
    this.drawLine2();
  },
  methods: {
       drawLine2() {
   
        let cxCharts = echarts.init(this.$refs.cxCharts);
        var colorList =["#005E67","#20b2aa"];
      
        let option = {
                tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}台 ({d}%)"
    },
    legend: {
        
        textStyle:{
            color:'black',
            fontSize: 16,
        },
        left:'0%',
        top:'0%',
        data:['杆变','配变',]
    },
    series: [
        {
            type:'pie',
            radius: ['55%', '70%'],
            clockwise :false,
            z:10,
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        return colorList[params.dataIndex]
                    },
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            },
            label: {
                normal: {
                     formatter: '{d|{c}(台)}\n{hr|}\n{d|({d}%)}',
                    // formatter: '{b|{b}}\n{hr|}\n{d|{c}  ({d}%)}',
                    rich: {
                        
                        hr: {
                            borderColor: '#12EABE',
                            width: '100%',
                            borderWidth: 2,
                            height: 0
                        },
                        d: {
                            fontSize: 16,
                            color: 'black',
                            align: 'left',
                            padding: 4
                        },
                        c: {
                            fontSize: 16,
                            color: '#fff',
                            align: 'center',
                            padding: 4
                        }
                    }
                }
            },
          /*  label: {
                normal: {
                    formatter: function(params){
                         return params.name+':'+params.value+'件';
                    },
                    // backgroundColor: '#eee',
                }
            },*/
            
            labelLine: {
                normal: {
                    length: 50,
                    length2: 0,
                    lineStyle:{
                        width:2
                    }
                }
            },
            data:[
                {value:13, name:'杆变'},
                {value:7, name:'配变'},

                
            ]
        }
    ]
      
                        
            };
      cxCharts.setOption(option);
    },
  }
}
</script>

<style>

</style>
