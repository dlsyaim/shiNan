<template>
  <div class="Gcharts" :id="id"></div>
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
    getUrl:{

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
    data: {
      handler() {
        this.InitCharts();
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
    InitCharts(){
       
      this.option.width=document.getElementById(this.id).parentElement.offsetWidth;
      this.option.height=document.getElementById(this.id).parentElement.offsetHeight;
      this.option.container=this.id;
      this.option.layout={
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 60,
        rankSep: 200
      }
      this.MyEcharts =new G6.TreeGraph(this.option);
      this.MyEcharts.node(function(node) {
        return {
          size: 26,
          style: {
            fill: '#40a9ff',
            stroke: '#096dd9'
          },
          label: node.id,
          labelCfg: {
            position: node.children && node.children.length > 0 ? 'left' : 'right'
          }
        };
      });
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
}
</style>
