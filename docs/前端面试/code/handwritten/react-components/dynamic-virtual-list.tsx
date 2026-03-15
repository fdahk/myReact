/*
 * 实现目标：
 * - 为动态高度虚拟列表准备基础元数据：每一项的累计偏移量和总高度。
 * - 重点不是完整渲染组件，而是抽出动态虚拟化最关键的一层“高度前缀和”计算逻辑。
 *
 * 核心思路：
 * - 先根据每个元素的真实高度构造 offsets 数组，其中 `offsets[i]` 表示第 `i` 项顶部的累计偏移。
 * - 再基于该数组快速得到列表总高度，并供后续窗口查找、滚动定位、二分命中等逻辑复用。
 * - 用 `useMemo` 保证只有高度数组变化时才重新计算。
 *
 * 复杂度 / 运行特征：
 * - 构建 offsets 需要线性遍历一次高度数组，时间复杂度 O(n)，空间复杂度 O(n)。
 * - 该结构通常会作为动态虚拟列表的基础缓存，被窗口计算和定位逻辑频繁读取。
 *
 * 易错点：
 * - 高度测量不稳定时，缓存会失效并导致滚动抖动或错位。
 * - offsets 的长度通常比数据长度多 1，方便表达“第 0 项顶部”和“总高度”。
 * - 真正生产实现里往往还会配合二分查找、测量回填和局部重算。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲固定高度虚拟列表如何升级到动态高度版本。
 * - 面试中可以强调：难点不在“少渲染”，而在“如何维护准确的高度与偏移缓存”。
 */

import { useMemo } from 'react';

export function buildDynamicOffsets(heights: number[]) {
  const offsets = [0];
  for (let i = 0; i < heights.length; i += 1) {
    // 前缀和数组让每一项的顶部偏移可被 O(1) 读取。
    offsets[i + 1] = offsets[i] + heights[i];
  }
  return offsets;
}

export function useDynamicVirtualMeta(heights: number[]) {
  return useMemo(() => {
    const offsets = buildDynamicOffsets(heights);
    return {
      offsets,
      // 最后一个前缀和值就是完整列表需要占位的总高度。
      totalHeight: offsets[offsets.length - 1] ?? 0,
    };
  }, [heights]);
}
