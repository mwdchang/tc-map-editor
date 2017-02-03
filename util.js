function bindCells(target, data, cfg) {
  canvas.selectAll('.cell').remove();
  canvas.selectAll('.cell')
    .data(data)
    .enter()
    .append('rect')
    .classed('cell', true)
    .attr('x', d => d.x*cfg.w)
    .attr('y', d => d.y*cfg.w)
    .attr('width', cfg.w)
    .attr('height', cfg.h)
    .style('fill', '#FFF')
    .style('stroke', 'none');

}

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

function YGrid(target, cfg) {
  for (let x=0; x <= cfg.gridSize; x++) {
      target.append('line')
        .attr('x1', x*cfg.w)
        .attr('y1', 0)
        .attr('x2', x*cfg.w)
        .attr('y2', 200)
        .style('pointer-events', 'none')
        .style('stroke', '#CCC')
        .style('stroke-width', 0.5);
  }
}

function XGrid(target, cfg) {
  for (let y=0; y <= cfg.gridSize; y++) {
      target.append('line')
        .attr('x1', 0)
        .attr('y1', y*cfg.h)
        .attr('x2', 200)
        .attr('y2', y*cfg.h)
        .style('pointer-events', 'none')
        .style('stroke', '#CCC')
        .style('stroke-width', 0.5);
  }
}

function exportData(data, size) {
  let buffer = '';
  let append = (str) => { buffer = buffer + str; buffer = buffer + '\n'};
  let appendCell = (cell) => {
    append(cell.x + ',' + cell.y + ',' + cell.h + ',' + cell.t);
  };
  append(size+','+size);
  data.forEach(appendCell);
  return buffer;
}


function importData(txt) {
  console.log(txt);
  let lines = txt.split(/\n/).map(d => d.trim());
  let size = +lines.shift().split(/,/)[0];
  let data = initData(size);
  lines.forEach(line => {
    if (line === '') return;
    let components = line.split(/,/);
    let x = +components[0];
    let y = +components[1];
    let h = components[2];
    let t = components[3];

    data[x*size + y].h = h;
    data[x*size + y].t = t;
  });

  return { gridSize: size, data: data };
}
