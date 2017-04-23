var GraphBox = require("./GraphBox"),
    ClickMetrics = require("../API/Applications/Click/ClickMetrics");

function ClickGraphBox() {
  GraphBox.call(this, arguments)
}

ClickGraphBox.prototype = Object.create(GraphBox.prototype);

ClickGraphBox.prototype.title = "Statistics";

ClickGraphBox.prototype.extraSettings = function() {
  return {
    grid: {
        drawGridLines: true,        // wether to draw lines across the grid or not.
        gridLineColor: '#CCCCCC',    // *Color of the grid lines.
        background: '#FDFDFD',      // CSS color spec for background color of grid.
        borderColor: '#CCCCCC',     // CSS color spec for border around grid.
        borderWidth: 0.1,           // pixel width of border around grid.
        shadow: false,               // draw a shadow for grid.
        renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
        rendererOptions: {}         // options to pass to the renderer.  Note, the default
                                    // CanvasGridRenderer takes no additional options.
    },
    axes: {
      xaxis: {
        renderer: $.jqplot.DateAxisRenderer,
        tickOptions: {
          formatString: "%H:%M:%S"
        }
      },
      yaxis: {
        min: 0,
        max: 100
      }
    },
    series: [
      {
        label: "CPU Usage %",
      },

      {
        label: "Disk Usage %"
      },

      {
        label: "Memory Usage %"
      },
      {
        label: "Net TX %"
      },
      {
        label: "Net RX %"
      }
    ],
  }
};

ClickGraphBox.prototype.fetchData = function() {
  var data = ClickMetrics.getData();
  return $.Deferred().resolve(data);
    
};

module.exports = ClickGraphBox;
