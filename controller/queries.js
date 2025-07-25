const getalltreesDataQuery = "select * from treedetails";
const createNewTreeData = 'INSERT INTO treedetails (treename,subname,history,pros,cons,life,treeimage,color) VALUES($1,$2,$3,$4,$5,$6,$7,$8)';
const getTreeByIDQuery = 'SELECT * FROM treedetails WHERE id = $1';
const getOnlyTreeNameandIdQuery = 'SELECT treename , id FROM treedetails';
const onlyGetPageTreeQuery = 'SELECT * FROM treedetails ORDER BY id LIMIT $1 OFFSET $2';
const treeCountQuery = 'SELECT COUNT(*) FROM treedetails';

module.exports = {
  getalltreesDataQuery,
  createNewTreeData,
  getTreeByIDQuery,
  getOnlyTreeNameandIdQuery,
  onlyGetPageTreeQuery,
  treeCountQuery
};
