<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" >
        <el-card shadow="hover">
          <div class="user" style="height: 150px">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2021-7-19</span></p>
            <p>上次登录地点:<span>太原</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 15px; height: 340px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(value, index) in tableLabel"
              :key="index"
              :prop="index"
              :label="value"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col  :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 210px">
          <div style="height: 200px " ref="echarts" ></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 180px">
            <div style="height: 160px" ref="userEcharts"></div>
          </el-card>
          <el-card style="height: 180px">
            <div style="height: 160px" ref="videoEcharts"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  gettableData,
  getvideoData,
  getuserData,
  getorderData,
  // getData,
} from "../../api/data";
import * as echarts from "echarts";
export default {
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
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
      ],
    };
  },
  mounted() {
    gettableData().then((res) => {
      // console.log(res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = res.data;
      }
    });
    getuserData().then((res) => {
      // console.log(res);
      const { status, data } = res;
      if (status === 200) {
        const userData = res.data;
        // console.log(userData);

        const userOption = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: userData.map((item) => item.date),
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
              axisLin: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);
      }
    });
    getorderData().then((res) => {
      // console.log(res);
      const { status, data } = res;
      if (status === 200) {
        const orderData = res.data.data;
        const xData = res.data.date;
        // console.log(orderData);
        const keyArray = Object.keys(orderData[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: orderData.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);
      }
    });
    getvideoData().then((res) => {
      // console.log(res);
      const { status, data } = res;
      if (status === 200) {
        const videoData = res.data;
        // console.log(videoData);

        const videOption = {
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
              data:videoData,
              type:'pie'
            }
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videOption);
      }
    });
  },
};
</script>

<style lang="less" scoped>

</style>