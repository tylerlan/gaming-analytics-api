const express = require('express');
const { getDataFromRange } = require('../services/getDataFromRange');
const { asyncMiddleware } = require('../middleware');
const {
  organizeDataByMetric,
  makeTuples,
  makeArraysOfValues
} = require('../helpers');
const boom = require('boom');
const router = express.Router();

// Expecting endpoint like: /per-unit-per-day?from=2017/11/04&to=2017/12/04
router.get(
  '/per-unit-per-day',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;

    if (!from || !to) {
      throw boom.badRequest('must enter valid date range');
    }

    const rawData = await getDataFromRange('pupd', from, to);

    if (rawData.result.length <= 0) {
      throw boom.notFound(`no data available for the range: ${from} - ${to}`);
    } else {
      const organizedData = await organizeDataByMetric(rawData.result);
      res.json(organizedData);
    }
  })
);

// Expecting endpoint like: /agg-per-day?from=2017/11/04&to=2017/12/04
router.get(
  '/aggr-per-day',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;

    if (!from || !to) {
      throw boom.badRequest('must enter valid date range');
    }

    const rawData = await getDataFromRange('aggr', from, to);

    if (rawData.result.length <= 0) {
      throw boom.notFound(`no data available for the range: ${from}-${to}`);
    } else {
      const organizedData = await organizeDataByMetric(rawData.result);
      res.json(organizedData);
    }
  })
);

// Expecting endpoint like: /manufacture?from=2017/11/04&to=2017/12/04
router.get(
  '/manufacture',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;

    if (!from || !to) {
      throw boom.badRequest('must enter valid date range');
    }

    const rawData = await getDataFromRange('mfgmix', from, to);

    if (rawData.result.length <= 0) {
      throw boom.notFound(`no data available for the range: ${from} - ${to}`);
    } else {
      res.json({ dateRange: { from, to }, records: rawData['result'] });
    }
  })
);

module.exports = router;
