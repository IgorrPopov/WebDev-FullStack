<?php
    include_once '../app/JsonSongsCounter.php';

    $songsCounter = new JsonSongsCounter('../app/json/dio_top_songs.json');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Pie chart</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
      let songsObject = <?= json_encode($songsCounter->getRating()) ?>;
      let songsArray = [['Song', 'Rating']];
      for(let song in songsObject){
          songsArray.push([songsObject[song][1], songsObject[song][0]]);
      }

      function drawChart() {
          let data = google.visualization.arrayToDataTable(songsArray);

          let options = {
              fontName: 'seagram',
              legend: {
                  position: 'left',
                  textStyle: {
                      color: 'white'
                  }
              },
              titleTextStyle: {
                  fontName: 'london',
                  fontSize: 40,
                  color: 'white'
              },
              title: 'Ronnie James Dio songs rating',
              is3D: true,
              backgroundColor: "transparent",
          };

          let chart = new google.visualization.PieChart(
              document.getElementById('piechart_3d'));
          chart.draw(data, options);
      }

      google.charts.load('current', {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);
  </script>
</head>
<body>
  <div class="vote-page"></div>
  <div id="piechart_3d" style="width: 100%; height: 100%;"></div>
  <div>
    <i class="fas fa-arrow-circle-left button_arrow"
       onclick="window.location = 'index.php'"></i>
  </div>
</body>
</html>


