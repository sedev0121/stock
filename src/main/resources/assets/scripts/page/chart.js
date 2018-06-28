var formatTime = function(unixTimestamp) {
  var dt = new Date(unixTimestamp);

  var year = dt.getFullYear();
  var month = dt.getMonth();
  var day = dt.getDate() + 1;
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();
  var millisecs = dt.getMilliseconds()

  // the above dt.get...() functions return a single digit
  // so I prepend the zero here when needed

  if (month < 10)
    month = '0' + month;

  if (day < 10)
    day = '0' + day;

  if (hours < 10)
    hours = '0' + hours;

  if (minutes < 10)
    minutes = '0' + minutes;

  if (seconds < 10)
    seconds = '0' + seconds;

  if (millisecs < 10)
    millisecs = '00' + millisecs;
  else if (millisecs < 100)
    millisecs = '0' + millisecs;

  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":"
      + seconds + "." + millisecs;
}

var formatValue = function(value) {

  if (value == undefined || isNaN(value))
    return '';
  
  if (value < 1)
    value = Number.parseFloat(value).toFixed(6);
  else if (value < 100)
    value = Number.parseFloat(value).toFixed(4);
  else
    value = Number.parseFloat(value).toFixed(2);
  return value;
}

function onChangeExchange(exchangeTarget, symbolTarget) {
  var exchange =$(exchangeTarget).val();
  $(symbolTarget).find('option').remove();
  var key_list=[], select = [];
  $.each(select_list, function(key, item){
    if (item.exchange == exchange && $.inArray(item.symbol, key_list) == -1) {
      key_list.push(item.symbol);
      $(symbolTarget).append($('<option>').text(item.symbol).attr('value', item.symbol));
    }
  })
}

function createStockChart(tragetDivId) {
  var chart = AmCharts
      .makeChart(
          tragetDivId,
          {
            "type" : "stock",
            "theme" : "none",

            // "color": "#fff",
            "dataSets" : [ {
              "dataProvider" : [],
              "fieldMappings" : [ {
                "fromField" : "open",
                "toField" : "open"
              }, {
                "fromField" : "high",
                "toField" : "high"
              }, {
                "fromField" : "low",
                "toField" : "low"
              }, {
                "fromField" : "close",
                "toField" : "close"
              }, {
                "fromField" : "volume",
                "toField" : "volume"
              }, {
                "fromField" : "color",
                "toField" : "color"
              }, {
                "fromField" : "count",
                "toField" : "count"
              } ],
              "color" : "#777",
              "title" : "Stock",
              "compared" : false,
              "categoryField" : "date",
            } ],

            "panels" : [
                {
                  "showCategoryAxis" : false,
                  /*
                   * "valueAxis" : { "dashLength" : 5, "maxiumum" : 80 },
                   * "categoryAxis" : { "dashLength" : 1 },
                   */
                  "title" : "Value",
                  "percentHeight" : 70,
                  "stockGraphs" : [ {
                    "type" : "candlestick",
                    "id" : "g1",
                    "openField" : "open",
                    "closeField" : "close",
                    "highField" : "high",
                    "lowField" : "low",
                    "valueField" : "close",
                    "lineColor" : "#00ff00",
                    "fillColors" : "#00ff00",
                    "negativeLineColor" : "#e05f2f",
                    "negativeFillColors" : "#e05f2f",
                    "fillAlphas" : 1,
                    "comparedGraphLineThickness" : 2,
                    "columnWidth" : 0.7,
                    "useDataSetColors" : false,
                    "comparable" : true,
                    "compareField" : "close",
                    "showBalloon" : false,
                    "proCandlesticks" : true
                  } ],

                  "stockLegend" : {
                    "markerSize" : 0,
                    "labelText" : "",
                    "markerType" : "none",
                    "valueTextRegular" : "Open: [[open]] High: [[high]] Low: [[low]] Close: [[close]]",
                  // "periodValueTextComparing": "[[percents.value.close]]%"
                  }
                }, {
                  "title" : "Volume",
                  "percentHeight" : 40,
                  "marginTop" : 100,
                  "columnWidth" : 0.7,
                  "showCategoryAxis" : true,
                  "marginTop": 200,
                  "stockGraphs" : [ {
                    "valueField" : "volume",
                    "countField" : "count",
                    "fillColorsField" : "color",
                    "lineColorField" : "color",
                    "type" : "column",
                    "showBalloon" : false,
                    "showBalloonAt": "top",
                    "balloonText" : "#Results: <b>[[count]]</b>",
                    "fillAlphas" : 1,
                    "lineColor" : "#22272c",
                    "fillColors" : "#22272c",
                  } ],
                  "stockLegend" : {
                    "markerType" : "none",
                    "markerSize" : 0,
                    "labelText" : "",
                    "periodValueTextRegular" : "[[volume]]"
                  },
                  "valueAxes" : [ {
                    "usePrefixes" : true
                  } ]
                } ],

            "panelsSettings" : {
              "color" : "#080e15",
              "plotAreaFillColors" : "#080e15",
              "plotAreaFillAlphas" : 1,
              "marginLeft" : 60,
              "marginTop" : 5,
              "marginBottom" : 5
            },

            "chartScrollbarSettings" : {
              "graph" : "g1",
              "graphType" : "line",
              "usePeriod" : "DD",
              "backgroundColor" : "#080e15",
              "graphFillColor" : "#666",
              "graphFillAlpha" : 0.5,
              "gridColor" : "#fff",
              "gridAlpha" : 1,
              "selectedBackgroundColor" : "#444",
              "selectedGraphFillAlpha" : 1
            },

            "categoryAxesSettings" : {
              "equalSpacing" : false,
              "gridAlpha" : 0.5,
              "maxSeries" : 240000,
              "minPeriod" : "1DD",
              "gridColor" : "#ffffff",
              "dateFormats" : [ {
                period : 'fff',
                format : 'JJ:NN:SS.fff'
              }, {
                period : 'ss',
                format : 'JJ:NN:SS'
              }, {
                period : 'mm',
                format : 'JJ:NN'
              }, {
                period : 'hh',
                format : 'LA'
              }, {
                period : 'DD',
                format : 'MMM DD'
              }, {
                period : 'WW',
                format : 'MMM DD'
              }, {
                period : 'MM',
                format : 'MMM'
              }, {
                period : 'YYYY',
                format : 'YYYY'
              } ]
            },

            "valueAxesSettings" : {
              "gridColor" : "#ffffff",
              "gridAlpha" : 0.5,
              "inside" : false,
              "dateFormats" : [ {
                period : 'fff',
                format : 'JJ:NN:SS.fff'
              }, {
                period : 'ss',
                format : 'JJ:NN:SS'
              }, {
                period : 'mm',
                format : 'JJ:NN'
              }, {
                period : 'hh',
                format : 'LA'
              }, {
                period : 'DD',
                format : 'MMM DD'
              }, {
                period : 'WW',
                format : 'MMM DD'
              }, {
                period : 'MM',
                format : 'MMM'
              }, {
                period : 'YYYY',
                format : 'YYYY'
              } ]
            },

            "chartCursorSettings" : {
              "fullWidth" : true,
              "cursorColor" : '#e05f2f',
              "cursorAlpha" : 0.7,
              "pan" : true,
              "cursorPosition" : "middle",
              "valueLineEnabled" : true,
              "valueLineBalloonEnabled" : true,
              "categoryBalloonDateFormats" : [ {
                period : "YYYY",
                format : "YYYY"
              }, {
                period : "MM",
                format : "YYYY-MM"
              }, {
                period : "WW",
                format : "YYYY-MM-DD"
              }, {
                period : "DD",
                format : "YYYY-MM-DD"
              }, {
                period : "hh",
                format : "LA"
              }, {
                period : "mm",
                format : "JJ:NN"
              }, {
                period : "ss",
                format : "JJ:NN:SS"
              }, {
                period : "fff",
                format : "JJ:NN:SS.fff"
              } ]
            },

            "legendSettings" : {
            // "color": "#fff"
            },

            "stockEventsSettings" : {
              "showAt" : "high",
              "type" : "pin"
            },

            "balloon" : {
              "textAlign" : "left",
              "offsetY" : 10
            },

            "periodSelector" : {
              "hideOutOfScopePeriods" : true,
              "inputFieldsEnabled" : false,
              "position" : "bottom",
              "periods" : [ {
                "period" : "hh",
                "count" : 1,
                "label" : "1 Hour"
              }, {
                "period" : "DD",
                "count" : 1,
                "label" : "1 Day"
              }, {
                "period" : "DD",
                "count" : 15,
                "label" : "15 Days"
              }, {
                "period" : "MM",
                "count" : 1,
                "label" : "1 Month"
              }, {
                "period" : "MAX",
                "label" : "MAX"
              } ]
            },
            "listeners": [{
              "event": "dataUpdated",
              "method": function(e) {
                for (var x in e.chart.periodSelector.periods) {
                  var period = e.chart.periodSelector.periods[x];
                  if ('MAX' == period.period) {
                    period.selected = true;
                  } else {
                    period.selected = false;
                  }
                }

                e.chart.periodSelector.setDefaultPeriod();
              }
            }]
          });

  return chart;
}

var histo, detail, compare1, compare2, strategy_result;
var hightlight_bar_color = '#f3c200';
var normal_bar_color = '#777777';
  
jQuery(document).ready(
    function() {
      

      var key_list=[], select = [];
      $.each(select_list, function(key, item){
        if ($.inArray(item.exchange, key_list) == -1) {
          key_list.push(item.exchange);          
          $('#history_exchange').append($('<option>').text(item.exchange).attr('value', item.exchange));
          $('#compare1_exchange').append($('<option>').text(item.exchange).attr('value', item.exchange));
          $('#compare2_exchange').append($('<option>').text(item.exchange).attr('value', item.exchange));
        }
      })
      
      $.each(strategy_list, function(key, item){
        $('#analytics_strategy').append($('<option>').text(item).attr('value', item));
      })
      

      onChangeExchange('#history_exchange', '#history_trading_pair');
      onChangeExchange('#compare1_exchange', '#compare1_trading_pair');
      onChangeExchange('#compare2_exchange', '#compare2_trading_pair');
      
      var today = new Date();
      $('#history_to').datepicker("setDate", today);
      $('#history_from').datepicker("setDate",
          new Date(today.setMonth(today.getMonth() - 3)));
      $('#history_from, #history_to').change(function() {
        refresh_history_chart();
      });            


      var oTable = $('#strategy_result').DataTable({
        processing : true,
        serverSide : true,
        searching : false,
        ordering : true,
        scrollY: "200px",
        scrollCollapse: true,
        paging: false,
        ajax : {
          url : strategy_page_url,
          type : "POST",
          data : function(data) {
            var filter = {
              order: data.columns[data.order[0].column].data,
              dir:data.order[0].dir,
              strategy : $('#analytics_strategy').val(),
              exchange : $('#history_exchange').val(),
              symbol : $('#history_trading_pair').val(),
              threshold : $('#analytics_threshold').val(),
              granularityInMs : $('#analytics_group_size').val(),
              start_date : $('#history_from').val(),
              end_date : $('#history_to').val()
            }
            return filter;
          },
          dataSrc : function(json) {
            json.recordsTotal = json.totalElements;
            json.recordsFiltered = json.totalElements;
            return json.content;
          },
        },
        select : true,
        columns : [ {
          data : 'startMs',
          render : function(data, display, record) {
            return formatTime(data);
          },
          title : 'Time'
        }, {
          data : 'importance',          
          title : '%'
        }, {
          data : 'volume',
          render : formatValue,
          title : 'Trading Volume'
        }, {
          data : 'count',
          title : 'Count'            
        }, {
          data : 'high',
          title : 'High Price'
        }, {
          data : 'low',
          title : 'Low Price'
        } ],
        columnDefs: [
          { className: "dt-right", "targets": [1, 2, 3, 4, 5] }
        ],
        order: [  [ 0, "desc" ] ],
        fnDrawCallback : function(oSettings, b, c) {
          $('#strategy_result').DataTable().row(':eq(0)', {
            page : 'current'
          }).select();
        }
      }).on('select', function(e, dt, type, indexes) {
        refresh_detail_chart();
      });

      AmCharts.ready(function() {
        histo = createStockChart('history_chart');

        refresh_history_chart();
      });

      function blockUI(targetId) {
        App.blockUI({
            target: targetId,
            overlayColor: '#ffffff',
            animate: true
        });
      }
      
      function unblockUI(targetId) {
        App.unblockUI(targetId);
      }
      
      function refresh_history_chart() {
        
        $('#display_on_chart').prop('checked', false);
        $.ajax({
          beforeSend: function(){
            blockUI('#history_chart');
          },
          complete: function(){
            unblockUI('#history_chart');
          },
          type : "POST",
          url : history_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            group_size: $('#analytics_group_size').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            granularityInMs : $('#history_granularity').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            
            if (data.length == 0) {
              toastr.warning("There are no data to draw history chart", "Sorry!");
              data = {
                dummyValue: 0
              };
            }
            
            $.each(data, function(key, item) {
              item.count = 0;
              item.color = normal_bar_color;
            })

            switch ($('#history_granularity').val()) {
              case "1440":
                histo.categoryAxesSettings.minPeriod = "DD";
                histo.chartScrollbarSettings.usePeriod = "DD";
                break;
              case "360":
                histo.categoryAxesSettings.minPeriod = "6hh";
                histo.chartScrollbarSettings.usePeriod = "6hh";
                break;
              case "60":
                histo.categoryAxesSettings.minPeriod = "1hh";
                histo.chartScrollbarSettings.usePeriod = "1hh";
                break;
              case "15":
                histo.categoryAxesSettings.minPeriod = "15mm";
                histo.chartScrollbarSettings.usePeriod = "15mm";
                break;
            }

            histo.dataSets[0].dataProvider = data;
            
            histo.validateNow();

          },
        });

      }

      function refresh_detail_chart() {

        if (detail == undefined)
          return;
        
        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          beforeSend: function(){
            blockUI('#detail_chart');
          },
          complete: function(){
            unblockUI('#detail_chart');
          },
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            group_size: $('#analytics_group_size').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            granularityInMs : $('#time_range_select').val(),
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw detail chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              item.count = 0;
              item.color = normal_bar_color;
            })

            switch ($('#time_range_select').val()) {
              case "100":
                detail.categoryAxesSettings.minPeriod = "100fff";
                detail.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                detail.categoryAxesSettings.minPeriod = "1ss";
                detail.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                detail.categoryAxesSettings.minPeriod = "3ss";
                detail.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                detail.categoryAxesSettings.minPeriod = "6ss";
                detail.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            detail.dataSets[0].dataProvider = data;
            detail.validateNow();

          },
        });
        
        $('#compare1_trading_pair').trigger('change');
        $('#compare2_trading_pair').trigger('change');

      }

      function get_strategy_result() {

        $.ajax({
          beforeSend: function(){
            blockUI();
          },
          complete: function(){
            unblockUI();
          },
          type : "POST",
          url : strategy_run_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            threshold : $('#analytics_threshold').val(),
            granularityInMs : $('#analytics_group_size').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            if (data.total == 0) {
              toastr.warning("There are no strategy result", "Sorry!");
              data.percent = 0;
              data.volume = 0;
            }
            
            $('#result_total').html(data.total);
            $('#result_average_percent').html(data.percent);
            $('#result_average_volume').html(formatValue(data.volume));
          },
        });

      }

      function refresh_compare1_chart() {

        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          beforeSend: function(){
            blockUI('#compare_chart_1');
          },
          complete: function(){
            unblockUI('#compare_chart_1');
          },
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            group_size: $('#analytics_group_size').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#compare1_exchange').val(),
            symbol : $('#compare1_trading_pair').val(),
            granularityInMs : granularityInMs,
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw first compare chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              item.count = 0;
              item.color = normal_bar_color;
            })
            
            switch ($('#time_range_select').val()) {
              case "100":
                compare1.categoryAxesSettings.minPeriod = "100fff";
                compare1.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                compare1.categoryAxesSettings.minPeriod = "1ss";
                compare1.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                compare1.categoryAxesSettings.minPeriod = "3ss";
                compare1.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                compare1.categoryAxesSettings.minPeriod = "6ss";
                compare1.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            compare1.dataSets[0].dataProvider = data;
            compare1.validateNow();
          },
        });

      }

      function refresh_compare2_chart() {

        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          beforeSend: function(){
            blockUI('#compare_chart_2');
          },
          complete: function(){
            unblockUI('#compare_chart_2');
          },          
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            group_size: $('#analytics_group_size').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#compare2_exchange').val(),
            symbol : $('#compare2_trading_pair').val(),
            granularityInMs : granularityInMs,
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw second compare chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              item.count = 0;
              item.color = normal_bar_color;
            })

            switch ($('#time_range_select').val()) {
              case "100":
                compare2.categoryAxesSettings.minPeriod = "100fff";
                compare2.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                compare2.categoryAxesSettings.minPeriod = "1ss";
                compare2.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                compare2.categoryAxesSettings.minPeriod = "3ss";
                compare2.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                compare2.categoryAxesSettings.minPeriod = "6ss";
                compare2.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            compare2.dataSets[0].dataProvider = data;
            compare2.validateNow();

          },
        });

      }

      function update_strategy_all_result() {
        $.ajax({
          type : "POST",
          url : strategy_all_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            threshold : $('#analytics_threshold').val(),
            granularityInMs : $('#analytics_group_size').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            strategy_result = data;
          }
        });
      }
      
      $('#run_strategy').click(function() {
        $('#strategy_body').removeClass('hidden');
        if (detail == undefined)
          detail = createStockChart('detail_chart');

        get_strategy_result();
        update_strategy_all_result();
        
        oTable.draw();
      })

      $('#history_exchange, #history_trading_pair, #history_granularity')
          .change(function() {
            
            if ($(this).attr("id") == 'history_exchange') {
              onChangeExchange('#history_exchange', '#history_trading_pair');
            }              

            refresh_history_chart();
          })

      $('#compare1_exchange, #compare1_trading_pair').change(function() {
        
        if ($(this).attr("id") == 'compare1_exchange') {
          onChangeExchange('#compare1_exchange', '#compare1_trading_pair');
        }
        
        if ($('#compare1_exchange').val() != 0
            && $('#compare1_trading_pair').val() != 0) {
          $('#compare_chart_1').removeClass('hidden');
          if (compare1 == undefined)
            compare1 = createStockChart('compare_chart_1');
          refresh_compare1_chart();
        } else {
          $('#compare_chart_1').addClass('hidden');
        }
      })

      $('#compare2_exchange, #compare2_trading_pair').change(function() {
        
        if ($(this).attr("id") == 'compare2_exchange') {
          onChangeExchange('#compare2_exchange', '#compare2_trading_pair');
        }
        
        if ($('#compare2_exchange').val() != 0
            && $('#compare2_trading_pair').val() != 0) {
          $('#compare_chart_2').removeClass('hidden');
          if (compare2 == undefined)
            compare2 = createStockChart('compare_chart_2');
          refresh_compare2_chart();
        } else {
          $('#compare_chart_2').addClass('hidden');
        }
      })

      function display_on_chart() {
        
        if ($('#display_on_chart').is(':checked')) {
          var dt = $('#history_granularity').val() * 60000;
          $.each(histo.dataSets[0].dataProvider, function(key, hist_value) {
            var group_cnt = 0;
            $.each(strategy_result, function(key, stg_value) {
              if (hist_value.date <= stg_value && stg_value < hist_value.date + dt) {
                group_cnt++;
              }
            })
            
            hist_value.count = group_cnt;
            
            if (hist_value.count>0) {
              hist_value.color = hightlight_bar_color;
            } else {
              hist_value.color = normal_bar_color;
            }

          });
          histo.panels[1].stockGraphs[0].showBalloon = true;
          
        }else{
          $.each(histo.dataSets[0].dataProvider, function(key, hist_value) {
            hist_value.color = normal_bar_color;
            histo.panels[1].stockGraphs[0].showBalloon = false;
          });
        }
        
        histo.validateNow();
              
      }
      
      $('#display_on_chart').change(function(a, b, c) {
        blockUI('#history_chart');
        display_on_chart();
        unblockUI('#history_chart');
      })

      $('#time_range_select').change(function() {
        refresh_detail_chart();
      })
      
      
    })