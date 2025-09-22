import Waterfall from './waterfall';

// 生成模拟数据
const generateMockData = (count: number) => {
return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        title: `Item ${index + 1}`,
        image: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 200)}?random=${index}`,
        height: 200 + Math.floor(Math.random() * 200),
        content: `这是第${index + 1}个项目的内容描述...`
    }));
};

export default function Index() {

  return <Waterfall items={generateMockData(100)}/>;
}
