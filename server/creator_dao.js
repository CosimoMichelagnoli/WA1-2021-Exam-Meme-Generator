'use strict';
 
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');
 
// open the database
const db = new sqlite.Database('meme.db', (err) => {
    if (err) throw err;
  });
 
// DAO operations for validating users
 
exports.getUser = (username, password) => {
 
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM creators WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err){
                reject(err);
                return ;
             }
              // DB error
            else if (row == undefined){
                resolve(false); // user not found
 
            }
            else {
              console.log("password: "+password+" username: "+username+" row password: "+row.password);
                bcrypt.compare(password, row.password).then(result => {
                    if (result) // password matches
                        {resolve({id: row.creatorID, username: row.username});}
                    else
                        resolve(false); // password not matching
                }).catch(err=>console.log(err));
            }
        });
    });
};
 
exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM creators WHERE creatorID = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
            const user = {id: row.creatorID, username: row.username}
            resolve(user);
          }
      });
    });
  };