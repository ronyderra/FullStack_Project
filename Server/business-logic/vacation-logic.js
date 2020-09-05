const dal = require("../data-acces-layer/dal");
const { all } = require("../controllers/vacation-controller");

//get all vacations
async function getAllVacations() {
    const sql = `SELECT * FROM vacationstable  `;
    const response = await dal.executeAsync(sql);
    return response;

};

//add follow to vacation is avialable only for users
async function addFollowToVacation(id, bool) {
    let sql;
    if (bool === true) {
        sql = `UPDATE vacationstable SET followers = followers + 1 WHERE id = ${id}`;
    }
    else {
        sql = `UPDATE vacationstable SET followers = followers - 1 WHERE id = ${id}`;
    }

    await dal.executeAsync(sql);
    const updateSql = `select followers from vacationstable where id = ${id}`;
    let currentFollowers = await dal.executeAsync(updateSql);
    return currentFollowers;
};

//add vacation only for admin
async function addVacation(value) {
    const sql = `insert into vacationstable(description, destination, dates, price , toDate)
    Values('${ value.description}', ' ${value.destination}','${value.dates}', ${value.price}, '${value.toDate}')`;
    const infoResponse = await dal.executeAsync(sql);
    value.id = infoResponse.insertId;
    return value;
};

//add vacation only for admin
async function updateVacation(update, id) {

    let updateSql = '';
    const allKeys =  Object.keys(update)//got all keys inorder to update
    const isLast = allKeys.length - 1;

    allKeys.forEach((key, i) => {
        let prefix = i == isLast ? "" : ",";
        const value = update[key];
        updateSql += ` ${key} = '${value}'${ prefix }`;
    })
    
    const sql = `
        UPDATE vacationstable
        SET ${updateSql}
        WHERE  id = ${ id };
        `;
    const infoResponse = await dal.executeAsync(sql);
    return infoResponse;
};

// Delete existing vacation only for admin
async function deleteVacation(id) {
    const sql = `DELETE FROM vacationstable WHERE id = ${ id } `;
    await dal.executeAsync(sql);
};

module.exports = {
    getAllVacations,
    addFollowToVacation,
    addVacation,
    updateVacation,
    deleteVacation,
};

