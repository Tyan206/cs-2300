const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cs_2300_db',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function queryFilter(filter, search){
    let sqlquery= "Select * FROM cs_2300_db.title;";
    if(filter == 'title'){
        sqlquery = `Select * FROM cs_2300_db.title where T_name like '%${search}%';`;
    }else if(filter == 'genre'){
        sqlquery = `select T.*  from cs_2300_db.title as T, cs_2300_db.genre_of as G where T.T_id = G.T_id and G_name like'%${search}%';`
    }else if(filter == 'name'){
        sqlquery = `select T.*  from cs_2300_db.title as T where T.T_id in(select A.T_id from cs_2300_db.acted_by as A, cs_2300_db.person as P  where P.name like '%${search}%' and A.A_id = P.id)or
        T.T_id in(select D.T_id from cs_2300_db.directed_by as D, cs_2300_db.person as P  where P.name like '%${search}%' and D.D_id = P.id) or
        T.T_id in(select W.T_id from cs_2300_db.written_by as W, cs_2300_db.person as P  where P.name like '%${search}%' and W.W_id = P.id);`
    }else if(filter == 'service'){
        sqlquery = `select T.*  from cs_2300_db.title as T where T.T_id in(select O.T_id from cs_2300_db.streaming_on as O, cs_2300_db.streaming_service as S where S.S_name like '%${search}%' and S.S_id = O.S_id);`
    }else if(filter == 'id'){
        temp = search.toLowerCase();
        sqlquery = `select * from cs_2300_db.title where T_id = '${temp}';`
    }else if(filter == 'genreid'){
        temp = search.toLowerCase();
        sqlquery = `select * from cs_2300_db.genre_of where T_id = '${temp}';`
    }else if(filter == 'actor'){
        temp = search.toLowerCase();
        sqlquery = `Select P.id, P.name, A.A_role FROM cs_2300_db.person as P, cs_2300_db.acted_by as A where id=A_id and id in (select A_id from cs_2300_db.acted_by where T_id = '${temp}');`
    }else if(filter == 'director'){
        temp = search.toLowerCase();
        sqlquery = `Select P.id, P.name FROM cs_2300_db.person as P, cs_2300_db.directed_by as D where id=D_id and id in (select D_id from cs_2300_db.directed_by where T_id = '${temp}');`
    }else if(filter == 'writer'){
        temp = search.toLowerCase();
        sqlquery = `Select P.id, P.name FROM cs_2300_db.person as P, cs_2300_db.written_by as W where id=W_id and id in (select W_id from cs_2300_db.written_by where T_id = '${temp}');`
    }else if(filter == 'serviceid'){
        temp = search.toLowerCase();
        sqlquery = `Select S.* FROM cs_2300_db.streaming_service as S where S.S_id in (select S_id from cs_2300_db.streaming_on where T_id = '${temp}');`
    }else if(filter == 'release'){
        sqlquery = `Select * FROM cs_2300_db.title where T_release like '202%';`
    }else if(filter == 'streaming'){
        sqlquery = `Select T.* FROM cs_2300_db.title as T, cs_2300_db.streaming_on as S where T.T_id = S.T_id and S.S_id in (Select S_id from cs_2300_db.streaming_service where S_name = 'Prime Video');`
    }
    return sqlquery;
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

app.get("/api/get", (req, res)=>{
    let filter = req.query.Filter
    let lc_search = req.query.Search
    
    if(filter == ''){
        filter = 'title'
    }
  
    const search = lc_search?.split(' ').map(capitalize).join(' ');
    console.log(filter)
    console.log(search)
    
    const sqlSelect = queryFilter(filter,search);
    db.query(sqlSelect, (err,result) =>{
        res.send(result);
    })
    console.log(sqlSelect)
    
})
app.listen(3001, () => {
    console.log("running on port 3001");
});