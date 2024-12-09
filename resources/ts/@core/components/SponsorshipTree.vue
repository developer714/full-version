<template>
  <div ref="treeContainer" class="tree-container"></div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted, ref } from 'vue';

const treeContainer = ref<HTMLElement | null>(null)

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const data: TreeNode = {
  name: 'Root',
  children: [
    {
      name: 'Child 1',
      children: [
        { name: 'Grandchild 1' },
        { name: 'Grandchild 2' },
      ],
    },
    {
      name: 'Child 2',
      children: [
        { name: 'Grandchild 3', children: [
          { name: 'Great Grandchild 1' },
          { name: 'Great Grandchild 2' },
        ] },
        { name: 'Grandchild 4' },
      ],
    },
  ],
}

onMounted(() => {
  const width = window.innerWidth * 0.7
  const height = window.innerHeight * 0.7

  const svg = d3.select(treeContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#ffffff') // White background for a clean look
    .style('border-radius', '12px') // Slightly reduced border-radius for a sharper look
    .style('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.15)') // More pronounced shadow

  const root = d3.hierarchy<TreeNode>(data)
  const treeLayout = d3.tree<TreeNode>().size([width - 200, height - 200])
  treeLayout(root)

  svg.selectAll('line')
    .data(root.links())
    .enter()
    .append('line')
    .attr('x1', d => d.source.x !== undefined ? d.source.x + 150 : 0)
    .attr('y1', d => d.source.y !== undefined ? d.source.y + 100 : 0)
    .attr('x2', d => d.target.x !== undefined ? d.target.x + 150 : 0)
    .attr('y2', d => d.target.y !== undefined ? d.target.y + 100 : 0)
    .attr('stroke', '#90a4ae') // Slightly darker line color for contrast
    .attr('stroke-width', 1.5) // Thinner lines for a sleeker look

  svg.selectAll('rect')
    .data(root.descendants())
    .enter()
    .append('rect')
    .attr('x', d => d.x !== undefined ? d.x + 75 : 0)
    .attr('y', d => d.y !== undefined ? d.y + 100 : 0)
    .attr('width', 150)
    .attr('height', 50)
    .attr('fill', '#e3f2fd') // Light blue fill for a modern touch
    .attr('stroke', '#42a5f5') // Blue stroke for a modern accent
    .attr('stroke-width', 1) // Thinner stroke for a cleaner look
    .attr('rx', 12) // Reduced border-radius for a modern look

  svg.selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('x', d => d.x !== undefined ? d.x + 150 : 0)
    .attr('y', d => d.y !== undefined ? d.y + 125 : 0)
    .attr('dy', 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px') // Smaller font size for a modern aesthetic
    .attr('font-weight', '400') // Regular font weight for a clean look
    .attr('fill', '#263238') // Darker text color for better readability
    .text(d => d.data.name)
})
</script>

<style scoped>
.tree-container {
  overflow: auto;
  padding: 20px;
  margin-block-start: 20px;
}
</style>
