// MAKES AN OBJECT OF OBJECTS
// This makes more sense because it can by easily traversed by mapping over the array of dates with O(1) lookup
// And that means the metric data does not have to be ordered
// Entering dates at the same time as metrics also ensures that we always know we have data for dates that are stored
const organizeDataByMetric = arrayOfDays => {
  // this step is creating a package for the frontend to easily digest
  let organizedData = { dates: [], metrics: {} };

  arrayOfDays.forEach(day => {
    // store the dates requested
    organizedData.dates.push(day['date']);

    // store the values for each metric by date
    for (let prop in day) {
      if (prop !== 'date') {
        if (!organizedData.metrics[prop]) organizedData.metrics[prop] = {};
        organizedData.metrics[prop][day['date']] = day[prop];
      }
    }
  });

  // Sort the dates, just in case. They need to be in order for transformations to occur in the SPA.
  organizedData.dates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return organizedData;
};

// TUPLES ARE USEFUL FOR ECHARTS HEATMAPS
const makeArraysOfTuplesForMetricDateAndValue = organizedData => {
  for (let m in organizedData.metrics) {
    let mapped = organizedData.dates.map(date => {
      return [date, organizedData.metrics[m][date]];
    });

    organizedData.metrics[m] = mapped;
  }

  return organizedData;
};

// SPITS OUT ARRAYS OF VALUES IN ORDER OF DATE FOR EACH METRIC
// -- USEFUL FOR LINE GRAPH
const makeArraysOfMetricValuesByDate = organizedData => {
  let valuesArrayByMetric = {};

  for (let met in organizedData.metrics) {
    valuesArrayByMetric[met] = organizedData.dates.map(
      dat => organizedData.metrics[met][dat]
    );
  }
  return valuesArrayByMetric;
};

module.exports = {
  organizeDataByMetric: organizeDataByMetric,
  makeTuples: makeArraysOfTuplesForMetricDateAndValue,
  makeArraysOfValues: makeArraysOfMetricValuesByDate
};
