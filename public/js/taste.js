function drawChart() {

    var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

    var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
  }

  function getData() {

    // https://developers.google.com/chart/interactive/docs/spreadsheets#creating-a-chart-from-a-separate-spreadsheet

    // https://docs.google.com/spreadsheets/d/11nU_dN7HnBLuSZYbcWZA6Y27isZFhkvPYHdxZ0CLw3A/edit?usp=sharing

    var preURL = 'https://docs.google.com/spreadsheets/d/';
    var urlCode = '11nU_dN7HnBLuSZYbcWZA6Y27isZFhkvPYHdxZ0CLw3A';
    var postURL = '/gviz/tq?gid=0&headers=1&tq=';  // gid=0 indicates the sheet ID number 0 (alternately, 'sheet=sheet-name') 
                                                   // headers=0 rows to be excluded from the data and assigned as column labels in the data table

    // var queryString = encodeURIComponent('SELECT A, B, C, D, E, F, G, H');
    var queryString = encodeURIComponent('SELECT *');

    var query = new google.visualization.Query(preURL + urlCode + postURL + queryString);

    query.send(handleQueryResponse);

  }

  function handleQueryResponse(response) {

    if (response.isError()) {
      console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var options = {
        title: 'from g-sheet',
        pieHole: 0.4,
        legend: {
          position: ''
        },
        colors: [],
    };

    console.log("first pass: " + options.title);

    var data = response.getDataTable();

    //console.log(JSON.stringify(data));

    options.title = data.getValue(0,3);  // new chart title
    console.log(options.title);
    options.pieHole = data.getValue(1,3);
    console.log(options.pieHole);
    options.legend.position = data.getValue(2,3);
    console.log(options.legend.position);
    options.colors = [data.getValue(2,4), data.getValue(2,5), data.getValue(2,6), data.getValue(2,7)];

    var arrayE = data.getDistinctValues(4);
    
    console.log(arrayE);

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
