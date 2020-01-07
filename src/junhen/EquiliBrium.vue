<template>  
    <div class="watch-equip">
        <el-row class="Box">
            <div class="titleClass">
                <div class="titleLeft">
                     <img src="../assets/ic_title.png" alt="">
                     三相不均衡
                    </div>
                <div class="titleRight">
                    <div @click="isChange(index)" v-for="(item,index) in ['昨日','本周','当月']" :key="index" :class="{isClick:isClick===index}">{{item}}</div>
                </div>
                
            </div>
            <div style="display:flex;">
            <div class="contentClass">
                <div class="contentTit"><span>三相不均衡:</span><span class="sl">108</span><span>台</span><span style="margin-left:30px">严重三相不均衡:</span><span class="sl">43</span><span>台</span></div>
                <bar-line :chart-data="chartData"></bar-line>
                
            </div>
            
            <div class="rightClass">
                <div class="tit">杆配比例</div>
                <biao-gan></biao-gan>
            </div>

            </div>
        </el-row>
         <el-row class="Box">
            <div class="titleClass">
                <div class="titleLeft">
                    <img src="../assets/ic_title.png" alt="">
                    重点监控
                    </div>
                <div class="titleRight">
                <div @click="isChangeRight(index)" v-for="(item,index) in ['昨日','本周','当月']" :key="index" :class="{isClickRight:isClickRight===index}">{{item}}</div>
                </div>
            </div>
            <div style="display:flex;margin-left:-39px;" >
            <div class="rightClass" v-for="(item,index) in arr" :key="index">
                <div class="tit">{{item.name}}</div>
                <im-watch  :firstName="item.firstName" :secondName="item.secondName" :firstData="item.firstData" :leftColor="item.leftColor" :rightColor='item.rightColor' :secondData="item.secondData" ></im-watch>
            </div>
            
            </div>
            
        </el-row>
    </div>
</template>

<script>
import barLine from '@/junhen/barLine'
import biaoGan from '@/junhen/biaoGan'
import imWatch from '@/junhen/imWatch'
export default {
    inject: ["setBreadcrumb"],
    components: {
        barLine,
        biaoGan,
        imWatch,
    },
    data() {
        return {
             elcShow:false,
             isClick:0,
             isClickRight:0,
             arr:[
                {
                 name:'严重超标台区',
                 firstName:'连续15超标',
                 secondName:'累计10天超标',
                 leftColor:"orange",
                 rightColor:"#FFFF66",
                 firstData:[2.2,1.5,1.2,1.2,1.5],
                 secondData:[1.5,0.5,1,0.8,0.7],
                },
                {
                 name:'一般超标台区',
                 firstName:'连续10超标',
                 secondName:'累计15天超标',
                 leftColor:"#FF9966",
                 rightColor:"yellow",
                 firstData:[2.2,1.6,1.1,1.2,1.8],
                 secondData:[1.3,0.7,1,0.9,0.8],
                },
                {
                 name:'连续超标台区',
                 firstName:'',
                 secondName:'连续超标',
                 leftColor:"",
                 rightColor:"#FFCC00",
                 firstData:[],
                 secondData:[1.5,0.5,1,0.8,0.8],
                },
            ],

            chartData: {
                    color: ["#20b2aa", "#3296FA", "red"],
                    xData: [
                    "线路运检一组",
                    "线路运检二组",
                    "配电运检一组",
                    "配电运维三组",
                    "线路运检一组",
                    ],
                    barData: [{
                        name: "三相不平铺",
                        data: [
                        "70",
                        "60",
                        "40",
                        "55",
                        "63",
                        ]
                    },
                    {
                        name: "严重三相不均衡",
                        data: [
                        "50",
                        "30",
                        "20",
                        "30",
                        "30",
                        ]
                    }
                    ],
                    lineData: [{
                    name: "不平衡率(%)",
                    symbol: 'emptyCircle',
                    symbolSize: 11,
                    data: [
                        "3",
                        "3",
                        "2",
                        "3.5",
                        "2.5",
                    ],
                    smooth: false
                    }]

                },
        }
    },
    created () {
    },
    mounted () {
         this.$nextTick(() => {
      // 设置面包屑
      this.setBreadcrumb([
        {
          name: "供电服务保障",
          path: "/equip",
          icon: "el-icon-s-home"
        },
        {
          name: "智能运维"
        },
        {
          name: "三相均衡"
        }
      ]);
    });
    },
    methods: {
        elcId(){
          this.elcShow =false;
        },
        isChange(index){
         this.isClick=index;
        },
        isChangeRight(index){
         this.isClickRight=index;
        },
        

       onSubmit() {
        console.log('submit!');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="scss" scoped>
.watch-equip{
    margin:-15px 0 0 10px ;
    width:99%;
}
.Box{
    width: 100%;
    height:400px;
    border: 1px solid gainsboro;
    margin-top:25px;
}
   .titleClass{
    width: 100%;
    height:30px;
    line-height: 30px;
    color: white;
    background:#0b9baf9e;
    display: flex;
    justify-content: space-between;
    .titleLeft{
     margin-left:20px;
     img{
         margin:8px 5px 0 0px;
     }
    }
    .titleRight{
        width:190px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
            width:160px;
            height:30px;
            margin-right: 15px;
            color: white;
            line-height: 30px;
            
        }
    }
   
   }
.contentClass{
    width:60%;
    height:500px;
    padding: 15px;
    .contentTit{
    text-align: left;
    .sl{
        color:#0b9baf9e;
        margin-left: 10px;
        margin-right:3px;
    }
    
    }
}
.rightClass{
    width:30%;
    height:400px;
    margin-left:60px;
    .tit{
        height:20px;
        line-height: 20px;
        margin-bottom: 30px;padding-left: 5px;
        text-align: left;
        border-left:3px solid #0b9baf9e;
        margin-top: 20px;
    }
}

.el-form-item__content {
   
    margin-right: 30px !important;
}

.conBox1{
    width:55%;
    background:white;
    position:relative;
    top:105px;
    left:350px;
    z-index:1000;
}
.elcBox{
 width:8%;
 height:20px;
 color: white;
 line-height: 36px;
}


// .el-table thead {
//     color: black;
//     font-weight: 500;
// }
// .el-table td, .el-table th.is-leaf {
//     text-align: center;
// }
.isClick,.isClickRight{
    background: #47477d;
}

</style>
