'use strict';
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require('sqlite3');





// open the database
const db = new sqlite.Database('meme.db', (err) => {
  if (err) throw err;
});



exports.filterMemesCreators = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM MEME ';
    db.all(sql, (err, rows) => {
      if (err) {
        console.log("errore");
        reject(err);
        return;
      } else {

        let memes = [];
        memes= rows.map((m)=>({memeID: m.memeID, title: m.title, imageID: m.imageID, color: m.color, font: m.font, ntext: m.ntext, text1: m.text1, text2: m.text2, text3: m.text3, protect: (m.protected===1?true:false), creator: m.creator }));
        
        resolve(memes);
      }


    });
  });
}
exports.filterMemes = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM MEME WHERE protected = 0';
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        } else {
  
          let memes = [];
          memes= rows.map((m)=>({memeID: m.memeID, title: m.title, imageID: m.imageID, color: m.color, font: m.font, ntext: m.ntext, text1: m.text1, text2: m.text2, text3: m.text3, protect: false, creator: m.creator }));
          
          resolve(memes);
        } 
  
      });
    });
  }


exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM IMAGES WHERE imageID=? ';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      } else {
        if (row == undefined) {
          reject({ error: 'Course not found.' });
        } else {
          let image = { imageID: row.imageID, name: row.name, ntext: row.ntext, position1: row.position1, position2: row.position2, position3: row.position3 };
          resolve(image);
        }
      }
    });

  });
}


exports.getImages = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM IMAGES ';
    db.all(sql, (err, rows) => {
      if (err) {
        console.log("errore");
        reject(err);
        return;
      } else {

        let images = [];
        images= rows.map((row)=>({imageID: row.imageID, name: row.name, ntext: row.ntext, position1: row.position1, position2: row.position2, position3: row.position3 }));
        
        resolve(images);
      }


    });
  });
}

exports.createMeme = (meme) => {
  return new Promise(async (resolve, reject) => {
    let lastId = await getLastId();
    lastId++;
    
    const sql = 'INSERT INTO MEME(memeID, title, imageID, color, font, ntext, text1, text2, text3, protected, creator) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql, [lastId, meme.title, parseInt(meme.imageID),meme.color, meme.font, parseInt(meme.ntext), meme.text1, meme.text2, meme.text3, parseInt(meme.protect ? 1 : 0), meme.creator], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.deleteMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM MEME WHERE memeID=? ';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

async function getLastId() {
  const sql1 = 'SELECT MAX(memeID) FROM MEME';
  return new Promise((resolve, reject) => {
    db.get(sql1, [], (err, row) => {
      if (err) {
        reject(err);
        return;
      } else {


        resolve(row["MAX(memeID)"]);
      }
    });
  });
}
