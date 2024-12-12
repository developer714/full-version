<template>
  <div ref="treeContainer" class="tree-container"></div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted, ref } from 'vue';

const treeContainer = ref<HTMLElement | null>(null)

interface MemberData {
  name: string
  member_id: string
  concierge: string
  rank: string
  registration_date: string | null
  cumulative_pv: number
  // ... other fields can be added as needed
}

interface TreeNode {
  name: string
  id: string
  memberType: string
  date: string | null
  amount: number
  isEngaged?: boolean
  children?: TreeNode[]
}

// Updated buildTree function
function buildTree(members: MemberData[], rootId: string = 'E770'): TreeNode | null {
  // Find the root member
  const rootMember = members.find(m => m.member_id === rootId)
  if (!rootMember) return null

  function createNode(member: MemberData): TreeNode {
    // Find children by matching concierge with current member's ID
    const children = members
      .filter(m => m.concierge.includes(member.member_id))
      .map(m => createNode(m))

    return {
      name: member.name,
      id: member.member_id,
      memberType: member.rank,
      date: member.registration_date,
      amount: member.cumulative_pv,
      ...(children.length > 0 && { children })
    }
  }

  return createNode(rootMember)
}

// In your component setup
const treeData = ref<TreeNode | null>(null)

// Add this ref to store the original data
const membersData = ref<MemberData[]>([])

// Add this function before onMounted
const renderTree = () => {
  if (!treeData.value || !treeContainer.value) return

  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.8

  const svg = d3.select(treeContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Create a group element for zoom functionality
  const g = svg.append('g')

  // Add zoom behavior
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  
  svg.call(zoom as any)

  const root = d3.hierarchy(treeData.value)
  const treeLayout = d3.tree<TreeNode>().size([width - 100, height - 100])
  treeLayout(root)

  // Draw links with dotted lines
  g.selectAll('path')
    .data(root.links())
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#999')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '4,4')
    .attr('d', d3.linkVertical<any, any>()
      .x((d: any) => d.x)
      .y((d: any) => d.y))

  // Create node groups
  const nodes = g.selectAll('g.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d: any) => `translate(${d.x - 75},${d.y - 25})`)
    .on('click', (event, d) => {
      // Reset all nodes
      root.descendants().forEach(node => node.data.isEngaged = false);
      // Set clicked node as engaged
      d.data.isEngaged = true;
      // Update all rectangles
      g.selectAll('rect')
        .attr('fill', (d: any) => d.data.isEngaged ? '#ffebee' : '#e3f2fd')
        .attr('stroke', (d: any) => d.data.isEngaged ? '#ffcdd2' : '#90caf9');
    })
    .on('dblclick', async (event, d) => {
      d3.select(treeContainer.value).selectAll('*').remove()
      treeData.value = buildTree(membersData.value, d.data.id)
      renderTree()
    });

  // Add rectangles for nodes
  nodes.append('rect')
    .attr('width', 150)
    .attr('height', 80)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', d => d.data.isEngaged ? '#ffebee' : '#e3f2fd')
    .attr('stroke', d => d.data.isEngaged ? '#ffcdd2' : '#90caf9')

  // Update text formatting to match your design
  const addText = (y: number, text: (d: any) => string, fontSize = '11px') => {
    nodes.append('text')
      .attr('x', 75)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize)
      .text(text)
  }

  addText(20, d => d.data.name, '12px')
  addText(35, d => d.data.id)
  addText(50, d => d.data.memberType)
  addText(65, d => `${d.data.amount}pv`)
}

onMounted(async () => {
  try {
    const { data } = await useApi<MemberData[]>("http://18.119.72.52/api/v1/auth/members")
    if (data.value) {
      membersData.value = data.value // Store the original data
      treeData.value = buildTree(data.value)
      renderTree()
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error)
  }
})
</script>

<style scoped>
.tree-container {
  overflow: hidden;
  block-size: 100vh;
  inline-size: 100%;
}
</style>
