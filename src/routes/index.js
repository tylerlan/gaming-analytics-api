const express = require('express');
const { getDataFromRange } = require('../services/getDataFromRange');
const { asyncMiddleware } = require('../middleware');
const router = express.Router();

// Expecting endpoint like: /per-unit-per-day?from=2017/11/04&to=2017/12/04
router.get(
  '/per-unit-per-day',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;
    const rawData = await getDataFromRange('pupd', from, to);
    res.json(rawData);
  })
);

// Expecting endpoint like: /agg-per-day?from=2017/11/04&to=2017/12/04
router.get(
  '/agg-per-day',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;
    const rawData = await getDataFromRange('aggr', from, to);
    res.json(rawData);
  })
);

// Expecting endpoint like: /manufact?from=2017/11/04&to=2017/12/04
router.get(
  '/manufacture',
  asyncMiddleware(async (req, res, next) => {
    const { from, to } = req.query;
    const data = await getDataFromRange('mfgmix', from, to);
    res.json(data);
  })
);

module.exports = router;
