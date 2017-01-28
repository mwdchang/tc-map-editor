function initData(size) {
  let data = [];
  for (let i=0; i < size; i++) {
    for (let j=0; j < size; j++) {
      data.push({
        x: i, y: j, h: 0, t: 0
      })
    }
  }
  return data;
}

function YGrid(target, gridSize, width) {
  for (let x=0; x <= gridSize; x++) {
      target.append('line')
        .attr('x1', x*width)
        .attr('y1', 0)
        .attr('x2', x*width)
        .attr('y2', 200)
        .style('pointer-events', 'none')
        .style('stroke', '#CCC')
        .style('stroke-width', 0.5);
  }
}

function XGrid(target, gridSize, height) {
  for (let y=0; y <= gridSize; y++) {
      target.append('line')
        .attr('x1', 0)
        .attr('y1', y*height)
        .attr('x2', 200)
        .attr('y2', y*height)
        .style('pointer-events', 'none')
        .style('stroke', '#CCC')
        .style('stroke-width', 0.5);
  }
}

function exportData(data, size) {
  let buffer = '';
  let append = (str) => { buffer = buffer + str; buffer = buffer + '\n'};
  let appendCell = (cell) => {
    append(cell.x + ',' + cell.y + ',' + cell.h);
  };
  append(size+','+size);
  data.forEach(appendCell);
  return buffer;
}
