import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';

// 定义奖品类型
interface Prize {
  name: string;
  probability: number;
  color: string; // 添加颜色字段
}

// 奖品数据
const prizes: Prize[] = [
  { name: '$30', probability: 0.01, color: '#FF6B6B' },
  { name: '$25', probability: 0.05, color: '#4ECDC4' },
  { name: '$20', probability: 0.1, color: '#45B7D1' },
  { name: '$15', probability: 0.14, color: '#FFD700' },
  { name: '$10', probability: 0.2, color: '#FF8C00' },
  { name: '$5', probability: 0.2, color: '#ADFF2F' },
  { name: '$4', probability: 0.1, color: '#00CED1' },
  { name: '$3', probability: 0.1, color: '#FF69B4' },
  { name: '$2', probability: 0.05, color: '#BA55D3' },
  { name: '$1', probability: 0.05, color: '#96CEB4' },
];

const SpinWheel: React.FC = () => {
  const [result, setResult] = useState<number>(0); // 抽中的奖品index
  const spinValue = useRef(new Animated.Value(0)).current; // 旋转角度

  // 根据概率随机选择奖品
  const getPrizeIndex = (): number => {
    const rand = Math.random();
    let cumulative = 0;
    for (let idx = 0; idx < prizes.length; idx++) {
      let prize = prizes[idx];
      cumulative += prize.probability;
      if (rand <= cumulative) return idx;

    }
    return prizes.length - 1; // 兜底
  };

  // 开始旋转
  const spin = (): void => {
    setResult(0); // 清空上一次结果
    spinValue.setValue(0); // 重置角度

    const totalDegrees = 360 * 5; // 旋转5圈
    const sectionDegrees = 360 / prizes.length; // 每个奖品的扇形角度
    const prizeIndex = getPrizeIndex();
    const targetDegrees = totalDegrees + (prizeIndex * sectionDegrees);

    Animated.timing(spinValue, {
      toValue: targetDegrees,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setResult(prizeIndex);
    });
  };

  // 转盘旋转动画
  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'],
  });

  // 计算扇形路径
  const getSectorPath = (index: number, total: number, radius: number): string => {
    const angle = 360 / total;
    const startAngle = angle * index - angle / 2 - 90;
    const endAngle = startAngle + angle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  const getTextPosition = (index: number, total: number, radius: number) => {
    const anglePerSection = 360 / total;
    const startAngle = anglePerSection * index - 90 - anglePerSection / 2;
    const midAngle = startAngle + anglePerSection / 2; // 扇形中间角度
    const midRad = (midAngle * Math.PI) / 180;

    // 使用半径的中间位置（0.5 * radius）确保文字在扇形中心
    const textRadius = radius * 0.6; // 调整为 60% 半径，更靠近中心
    const textX = radius + textRadius * Math.cos(midRad);
    const textY = radius + textRadius * Math.sin(midRad);

    return { x: textX, y: textY, angle: midAngle };
  };

  return (
    <View style={styles.container}>
      {/* 转盘 */}
      <View style={styles.wheelContainer}>
        <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
          <Svg width={300} height={300}>
            <G>
              {prizes.map((prize, index) => (
                <Path
                  key={index}
                  d={getSectorPath(index, prizes.length, 150)}
                  fill={prize.color}
                  stroke="#FFF"
                  strokeWidth={2}
                />
              ))}
            </G>
            <G>
              {prizes.map((prize, index) => {
                const { x, y, angle } = getTextPosition(index, prizes.length, 150);
                return (
                  <SvgText
                    key={index}
                    x={x}
                    y={y}
                    fontSize="16"
                    fontWeight="bold"
                    fill="#FFF"
                    textAnchor="middle" // 水平居中
                    alignmentBaseline="middle" // 垂直居中
                    transform={`rotate(${angle + 90} ${x} ${y})`} // 修正 transform 语法
                  >
                    {prize.name}
                  </SvgText>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
        {/* SVG 箭头 */}
        <Svg width={40} height={60} style={styles.arrow}>
          <Path
            d="M20 60 L10 0 H30 L20 60 Z"
            fill="#FFD700"
            stroke="#000"
            strokeWidth={1}
          />
        </Svg>
      </View>

      {/* 开始按钮 */}
      <TouchableOpacity style={styles.button} onPress={spin}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <Text style={styles.result}>{result ? `You win: ${prizes[result].name}` : "Spin to win"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  wheelContainer: {
    position: 'relative',
    width: 300,
    height: 300,
  },
  prizeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: [{ translateX: -20 }],
  },
  button: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    color: '#333',
  },
});

export default SpinWheel;
