<template>
  <div class="Gcharts" :id="id">
    <div class='tuli' :style="getTuli()"></div>
  </div>
</template>
<script>
import Hierarchy from "@antv/hierarchy";
import G6 from "@antv/g6";
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
      type: String,
      default: "100%"
    },
    option: {
      type: Object
    },
    data: {
      type: Object,
      default: ""
    },
    getOverData:{

    },
    tuli:{

    },
  },
  data() {
    return {
      MyEcharts: "",
    };
  },
  computed: {
  },
  watch: {
    'data.id': {
      handler(ne,old) {
        if(ne!=old)
        {
          this.InitCharts();
        }
      },
      deep: true //对象内部属性的监听，关键。
    },
    option:{
      handler() {
        this.InitCharts();
      },
      deep: true
    }
  },
  mounted() {
    this.InitCharts();
  },
  methods: {
    getTuli(){
      return {
        "background-image":"url("+this.tuli+")"
      }
    },
    InitCharts(){
      this.option.width=document.getElementById(this.id).parentElement.offsetWidth;
      this.option.height=document.getElementById(this.id).parentElement.offsetHeight;
      this.option.container=this.id;
      this.option.layout={
        type: 'compactBox',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 60,
        rankSep: 200,
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 32;
        },
        getWidth: function getWidth() {
          return 32;
        },
        getVGap: function getVGap() {
          return 20;
        },
        getHGap: function getHGap() {
          return 150;
        }
      }
      if(this.MyEcharts==='')
      {
        this.MyEcharts =new G6.TreeGraph(this.option);
      }
      this.MyEcharts.node(function(node) {
        let position
        let txt
        if(node.top)
        {
          position='left';
        }else
        {
          position='right';
        }
        if(node.events)
        {
          for(let i=0;i<node.events.length;i++)
          {
            txt=node.label+'\n'+node.events[i].measTypeStr+'\n'+node.events[i].dataTime
          }
        }else
        {
          txt=node.label;
        }
        return {
          id:node.id,
          size: node.size,
          label:txt,
          labelCfg: {
            style: node.style,
            position: position
          }
        };
      });
      this.MyEcharts.edge(function(node) {
        return {
          style: {
            lineWidth:4,
            stroke:'#aaa'
          },
        };
      });
      debugger;
      this.MyEcharts.data(this.data);
      this.MyEcharts.render();
      this.MyEcharts.fitView();
    },
  }
};
</script>
<style lang="scss" scoped>
.Gcharts
{
  width:100%;
  height:100%;
  position:relative;
}
.tuli
{
  position:absolute;
  left:0;
  bottom:0;
  z-index:9;
  pointer-events: none;
  background-size: cover;
  width:136px;
  height:194px;
}
</style>
