const { SiYourtraveldottv } = require('react-icons/si');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');

const iconElement = React.createElement(SiYourtraveldottv);
const svgString = ReactDOMServer.renderToStaticMarkup(iconElement);
fs.writeFileSync('icon-svg.txt', svgString, 'utf8');
console.log('SVG written to icon-svg.txt');

