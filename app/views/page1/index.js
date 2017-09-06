import './index.less';

let geoCoordMap = {
    '北京': [116.4, 39.9],
    '天津': [117.2, 39.12],
    '上海': [121.47, 31.23],
    '重庆': [106.55, 29.57],
    '哈尔滨': [126.53, 45.8],
    '长春': [125.32, 43.9],
    '沈阳': [123.43, 41.8],
    '呼和浩特': [111.73, 40.83],
    '杭州': [120.15, 30.28],
    '石家庄': [114.52, 38.05],
    '乌鲁木齐': [87.62, 43.82],
    '兰州': [103.82, 36.07],
    '西宁': [101.78, 36.62],
    '西安': [108.93, 34.27],
    '银川': [106.28, 38.47],
    '郑州': [113.62, 34.75],
    '济南': [116.98, 36.67],
    '太原': [112.55, 37.87],
    '合肥': [117.25, 31.83],
    '长沙': [112.93, 28.23],
    '武汉': [114.3, 30.6],
    '南京': [118.78, 32.07],
    '成都': [104.07, 30.67],
    '贵阳': [106.63, 26.65],
    '昆明': [102.72, 25.05],
    '南宁': [108.37, 22.82],
    '拉萨': [91.13, 29.65],
    '南昌': [115.85, 28.68],
    '广州': [113.5107, 23.2196],
    '福州': [119.3, 26.08],
    '台北': [121.5, 25.03],
    '海口': [110.32, 20.03],
    '香港': [114.08, 22.2],
    '澳门': [113.33, 22.13]
};


let HZData = [
    [{name:'杭州'},{name:'北京',value:40}],
    [{name:'杭州'},{name:'天津',value:40}],
    [{name:'杭州'},{name:'上海',value:40}],
    [{name:'杭州'},{name:'重庆',value:40}],
    [{name:'杭州'},{name:'哈尔滨',value:40}],
    [{name:'杭州'},{name:'长春',value:40}],
    [{name:'杭州'},{name:'沈阳',value:40}],
    [{name:'杭州'},{name:'呼和浩特',value:40}],
    [{name:'杭州'},{name:'石家庄',value:40}],
    [{name:'杭州'},{name:'乌鲁木齐',value:40}],
    [{name:'杭州'},{name:'兰州',value:40}],
    [{name:'杭州'},{name:'西宁',value:40}],
    [{name:'杭州'},{name:'西安',value:40}],
    [{name:'杭州'},{name:'银川',value:40}],
    [{name:'杭州'},{name:'郑州',value:40}],
    [{name:'杭州'},{name:'济南',value:40}],
    [{name:'杭州'},{name:'太原',value:40}],
    [{name:'杭州'},{name:'合肥',value:40}],
    [{name:'杭州'},{name:'长沙',value:40}],
    [{name:'杭州'},{name:'武汉',value:40}],
    [{name:'杭州'},{name:'南京',value:40}],
    [{name:'杭州'},{name:'成都',value:40}],
    [{name:'杭州'},{name:'贵阳',value:40}],
    [{name:'杭州'},{name:'昆明',value:40}],
    [{name:'杭州'},{name:'南宁',value:40}],
    [{name:'杭州'},{name:'拉萨',value:40}],
    [{name:'杭州'},{name:'南昌',value:40}],
    [{name:'杭州'},{name:'广州',value:40}],
    [{name:'杭州'},{name:'福州',value:40}],
    [{name:'杭州'},{name:'台北',value:40}],
    [{name:'杭州'},{name:'海口',value:40}],
    [{name:'杭州'},{name:'香港',value:40}],
    [{name:'杭州'},{name:'澳门',value:40}]
];

let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

// var color = ['#a6c84c', '#ffa022', '#46bee9'];
var color = ['#46bee9'];
var series = [];
[['杭州', HZData]].forEach(function (item, i) {
    series.push({
            name: '',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
        {
            name: '',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
});

var mapOption = {
    backgroundColor: '#404a59',
    title : {
        text: '',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:[''],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: series
};

let mapEchartWrap = document.querySelector('#J_map-wrap');
let mapHeight = window.innerHeight - $('#J_navbar-wrap').height();

let mapChart = echarts.init(mapEchartWrap, '', {
    height: mapHeight
});

mapChart.setOption(mapOption);