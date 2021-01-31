<template>
    <div>
        <div id="myChart" :style="{ width: '400px', height: '300px' }"></div>
    </div>
</template>
   
<style>
body {
    background-color: #eff1f4;
}
</style>

<script>
import { getDashboard } from "@/api/api";

export default {
    name: "hello",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            adminNum: "",
			teacherNum: "",
			data:[]
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            getDashboard().then((res) => {
				console.log(res)
				this.data = Object.values(res.data.data)
                this.teacherNum = res.data.data.teacherNum;
                this.adminNum = res.data.data.adminNum;
                console.log(this.data);
                let myChart = this.$echarts.init(
                    document.getElementById("myChart")
				);
                myChart.setOption({
                    title: {
                        text: '占比例情况',
                        subtext: '管理员教师',
                        left: 'center'
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            name: "人数",
                            type: "pie", // 设置图表类型为饼图
                            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data: [
                                { value: this.teacherNum, name: '教师' },
                                { value: this.adminNum, name: '管理员' }
                            ],
                        },
                    ],
				});

            });
        },
    },
};
</script>
