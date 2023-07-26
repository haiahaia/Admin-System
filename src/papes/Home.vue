<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
          <el-card>
            <div class="user">
              <img src="../images/user.png" alt="">
              <div class="userinfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登陆的时间：<span>2023-7-22</span></p>
              <p>上次登陆的地点：<span>武汉</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 20px; height: 460px;">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="课程"
                width="80">
              </el-table-column>
              <el-table-column
                prop="todayBuy"
                label="今日购买"
                width="80">
              </el-table-column>              
              <el-table-column
                prop="monthBuy"
                label="本月购买"
                width="80">
              </el-table-column>
              <el-table-column
                prop="totalBuy"
                label="总购买"
                width="80">
              </el-table-column>
            </el-table>

          </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name"  :body-style	= "{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px;">
          <!-- 折线图 -->
          <div ref="echarts1" :style="{height: '280px'}"></div>
        </el-card>
        <div class="graph">
          <el-card>
            <div ref="echarts2" :style="{height:'280px'}"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" :style="{height:'220px'}"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<el-card class="box-card">

</el-card>

<script>
import {getData} from "../api/index"
import * as echarts from "echarts"
import axios from 'axios'
export default {
    name:'Home',
    data(){
      return {
        tableData: [],
        countData: [
              {
              name: "今日支付订单",
              value: 1234,
              icon: "success",
              color: "#2ec7c9",
              },
              {
              name: "今日收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980",
              },
              {
              name: "今日未支付订单",
              value: 1234,
              icon: "s-goods",
              color: "#5ab1ef",
              },
              {
              name: "本月支付订单",
              value: 1234,
              icon: "success",
              color: "#2ec7c9",
              },
              {
              name: "本月收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980",
              },
              {
              name: "本月未支付订单",
              value: 1234,
              icon: "s-goods",
              color: "#5ab1ef",
              },
          ]
      }
    },
    mounted() {
      getData().then(({data}) => {
        // console.log(data)
        const {tableData,orderData,videoData,userData} = data.data
        // console.log(tableData)
        this.tableData = tableData
        const mychart1 = echarts.init(this.$refs.echarts1)
        const mychart2 = echarts.init(this.$refs.echarts2)
        const mychart3 = echarts.init(this.$refs.echarts3)
        const xAxis = Object.keys(orderData.data[0])
        // console.log(xAxis)
        const series = []
        xAxis.forEach(key => {
            series.push({
            name:key,
            data:orderData.data.map(item => item[key]),
            type:'line'
          })
        })
        mychart1.setOption({
          xAxis : {
            data: orderData.date
          },
          yAxis:{},
          series: series,
          legend: {
            xAxis
          },
        })
        const eachrts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                    color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                    axisLabel: {
                    interval: 0,
                    color: "#333",
                    },
                },
                yAxis: [
                    {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
        mychart2.setOption(eachrts2Option)

        const eachrts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
         mychart3.setOption(eachrts3Option)
        // const date = []
        // const series1 = []
        // const series2 = []
        // userData.forEach(item => {
        //   date.push(item.date)
        //   series2.push(item.new)
        //   series1.push(item.active)
        // })
        // console.log(series1)
        // console.log(series2)
        // mychart2.setOption({
        //   xAxis:{
        //     data:date
        //   },
        //   yAxis:{},
        //   series:[
        //     {
        //       name:'新增用户',
        //       data: series2,
        //       type: 'bar'
        //     },
        //     {
        //       name:'活跃用户',
        //       data: series1,
        //       type:'bar'
        //     }
        //   ]
        // })
      })
    },
  }
</script>

<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }
}
.login-info{
  p{
    line-height: 20px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 30px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    height: 80px;
    width: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price{
      font-size: 30px;
      line-height: 30px;
      height: 30px;
      margin-bottom: 10px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }

  }
  .el-card{
    width: 32%;
    margin-bottom: 15px;
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
    height: 260px;
  }
}

</style>