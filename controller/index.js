// const pool = require("../db");
// const Queries = require("./queries");

// exports.getAlltrees = async (req, res) => {
//   try {
//     const response = await pool.query(Queries.getalltreesDataQuery);
//     if (Array.isArray(response.rows) && response.rows.length === 0) {
//       res
//         .status(200)
//         .json({ statusCode: 401, error: "DATA NOT Found", status: false });
//     } else {
//       res
//         .status(200)
//         .json({ statusCode: 200, Data: response.rows, status: true });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createNewTree = async (req, res) => {
//   const rawData = req.body; // No need to JSON.parse here

//   try {
//     for (const val of rawData) {
//       const { treename, subname, history, pros, cons, life, treeimage, color } = val;

//       await pool.query(Queries.createNewTreeData, [
//         treename,
//         subname,
//         history,
//         pros,
//         cons,
//         life,
//         treeimage,
//         color,
//       ]);
//     }

//     res.status(200).json({ message: "All herbs saved successfully" });
//   } catch (err) {
//     console.error("Error inserting herbs:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.getTreeDetailsById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const response = await pool.query(Queries.getTreeByIDQuery, [id]);
//     if (Array.isArray(response.rows) && response.rows.length === 0) {
//       res
//         .status(200)
//         .json({ statusCode: 401, error: "DATA NOT Found", status: false });
//     } else {
//       res
//         .status(200)
//         .json({ statusCode: 200, Data: response.rows[0], status: true });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getOnlyTreeNameandId = async (req, res) => {
//   try {
//     const response = await pool.query(Queries.getOnlyTreeNameandIdQuery);
//     if (Array.isArray(response.rows) && response.rows.length === 0) {
//       res
//         .status(200)
//         .json({ statusCode: 401, error: "DATA NOT Found",Data:[] ,status: false });
//     } else {
//       res
//         .status(200)
//         .json({ statusCode: 200, Data: response.rows, status: true });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getPageTreeData = async (req, res) => {
//   const { pageNo } = req.body;
//   const pageLimit = 5;
//   const offset = (parseInt(pageNo) - 1) * 5;

//   try {
//     const response = await pool.query(Queries.onlyGetPageTreeQuery, [
//       pageLimit,
//       offset,
//     ]);
//     const total = await pool.query(Queries.treeCountQuery);

//     if (Array.isArray(response.rows) && response.rows.length === 0) {
//       res
//         .status(200)
//         .json({ statusCode: 401, error: "DATA NOT Found",Data:[], status: false });
//     } else {
//       res
//         .status(200)
//         .json({
//           statusCode: 200,
//           total: total.rows[0].count,
//           Data: response.rows,
//           status: true,
//         });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // tree to herb
const Tree = require('./model');

// GET all trees
exports.getAlltrees = async (req, res) => {
  try {
    const trees = await Tree.find();
    if (!trees.length) {
      return res.status(200).json({ statusCode: 401, error: "DATA NOT Found", status: false });
    }
    res.status(200).json({ statusCode: 200, Data: trees, status: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new trees (bulk insert)
exports.createNewTree = async (req, res) => {
  const rawData = req.body;

  try {
    await Tree.insertMany(rawData);
    res.status(200).json({ message: "All herbs saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET tree by ID
exports.getTreeDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const tree = await Tree.findById(id);
    if (!tree) {
      return res.status(200).json({ statusCode: 401, error: "DATA NOT Found", status: false });
    }
    res.status(200).json({ statusCode: 200, Data: tree, status: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET only treename and id
exports.getOnlyTreeNameandId = async (req, res) => {
  try {
    const trees = await Tree.find({}, { treename: 1 }); // Only return name and _id
    if (!trees.length) {
      return res.status(200).json({ statusCode: 401, error: "DATA NOT Found", Data: [], status: false });
    }
    res.status(200).json({ statusCode: 200, Data: trees, status: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST paginated data
exports.getPageTreeData = async (req, res) => {
  const { pageNo } = req.body;
  const pageLimit = 5;
  const page = parseInt(pageNo) || 1;
  const skip = (page - 1) * pageLimit;

  try {
    const total = await Tree.countDocuments();
    const trees = await Tree.find().skip(skip).limit(pageLimit);

    if (!trees.length) {
      return res.status(200).json({ statusCode: 401, error: "DATA NOT Found", Data: [], status: false });
    }

    res.status(200).json({
      statusCode: 200,
      total,
      Data: trees,
      status: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
