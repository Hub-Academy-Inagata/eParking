var chartLabels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

var ctx = document.getElementById("myLineChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartLabels,
    datasets: [{ 
      label: "penggunaan",
      lineTension: 0.3, 
      backgroundColor: "rgba(38, 149, 68, 0.05)", 
      borderColor: "#269544", 
      pointRadius: 0,
      data: [0, 1000000, 1000000, 2000000, 4500000, 3500000, 1800000, 4200000, 400000, 500000, 500000, 0],
    }],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false, 
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 12,
          callback: function(value, index, values) {
            return value.substring(0, 3);
          }
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          suggestedMax: 6000000,
          suggestedMin: 0,
          stepSize: 1000000,
          callback: function(value, index, values) {
            return 'Rp' + value.toLocaleString();
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],      
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)", 
      bodyFontColor: "#121212",
      titleMarginBottom: 5, 
      titleFontColor: '#121212', 
      titleFontSize: 15,
      borderColor: '#dddfeb',
      borderWidth: 1, 
      xPadding: 20, 
      yPadding: 15, 
      displayColors: false,
      intersect: false, 
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          return 'Rp' + tooltipItem.yLabel.toLocaleString(); 
        },
        afterLabel: function(tooltipItem, chart) {
          if (chart.data && chart.data.labels && chart.data.labels.length > tooltipItem.index) {
            var month = chart.data.labels[tooltipItem.index];
            return '2023 ' + month; // Format untuk menampilkan bulan pada tooltip
          }
          return '';
        }
      }
    }
  }
});
