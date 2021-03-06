var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');

var cx = width / 2,
  cy = height / 2;

var dist = 35;
var pointNumber = 20;
var circleRadius = circleRadius(pointNumber, dist);

var points = [];
var theta = 360 / pointNumber;
var currAngle = 0;

var lineAnimTime = 500;

var lineNum = 0;
for (i = 0; i < pointNumber; i++) {
  for (j = i; j < pointNumber; j++) {
    lineNum++;
  }
}
var normalize = d3.scaleLinear().domain([0, lineNum]).range([0, 1]);

svg.append('g')
  .attr('class', 'circle')
  .append('circle')
  .attr('r', circleRadius)
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('fill', 'none')
  .attr('stroke', 'black');

svg.append('g')
  .attr('class', 'points');

svg.append('g')
  .attr('class', 'lines');

for (i = 0; i <= pointNumber; i++) {
  p = {};
  p.x = cx + circleRadius * Math.cos(currAngle * (Math.PI / 180));
  p.y = cy + circleRadius * Math.sin(currAngle * (Math.PI / 180));
  p.index = i;
  p.angle = currAngle;
  currAngle += theta;
  points.push(p);
}

svg.select('g.points')
  .selectAll('circle')
  .data(points)
  .enter()
  .append('circle')
  .attr('r', 2)
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('fill', 'white')
  .attr('stroke', 'black');

var delay = 0;
var index = 0;
var data = [];

//building data for lines (index and coords)
for (i = 0; i < points.length; i++) {
  for (j = i + 1; j < points.length - 1; j++) {
    l = {};
    l.x1 = points[i].x;
    l.y1 = points[i].y;
    l.x2 = points[j].x;
    l.y2 = points[j].y;
    l.index = index++;
    l.inNodeIndex = i;
    l.outNodeIndex = j;

    data.push(l);
  }
}

svg.select('g.lines')
  .selectAll('lines')
  .data(data)
  .enter()
  .append('line')
  .attr('x1', function(d) {
    return d.x1;
  })
  .attr('x2', function(d) {
    return d.x1;
  })
  .attr('y1', function(d) {
    return d.y1;
  })
  .attr('y2', function(d) {
    return d.y1;
  })
  .attr('stroke', 'black')
  .attr('stroke', function(d) {
    return d3.interpolateRainbow(normalize(d.index));
  })
  .transition().duration(lineAnimTime).delay(function(d) {
    return d.index * lineAnimTime;
  })
  .attr('x2', function(d) {
    return d.x2;
  })
  .attr('y2', function(d) {
    return d.y2;
  });


function circleRadius(numberOfNodes, distance) {

  var circleRad = 0,
    theta = 360 / numberOfNodes,
    sigma = (180 - theta) / 2,
    gama = 180 - (90 + sigma);
  return (distance) / Math.tan(gama * (Math.PI / 180));
}
