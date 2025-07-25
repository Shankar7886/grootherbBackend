const express = require('express');
const router = express.Router();
const allcontroll = require('../controller/index');

// Routes
router.get('/tree', allcontroll.getAlltrees);
router.post('/tree', allcontroll.createNewTree);
router.get('/tree/:id', allcontroll.getTreeDetailsById);
router.get('/treeInfo', allcontroll.getOnlyTreeNameandId);
router.post('/treeInfo', allcontroll.getPageTreeData);

module.exports = router;

const Tree = require('../controller/model');

router.get('/test-herbs', async (req, res) => {
  try {
    const herbs = await Tree.find();
    res.json(herbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
