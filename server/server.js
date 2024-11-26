const express = require('express')
const app = express()
const mssql = require('mssql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const sqlConfig = {
    user: 'BUSMANAGEMNTAPP',
    password: 'aF3@sd3K',
    database: 'AdventureWorks2012',
    server: '176.0.52.194',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        encrypt: false
    }
}

app.get('/buses', (req, res) => {
    mssql.connect(sqlConfig, err => { 
        if(err){
            console.log(err);
        } else {
            var request = new mssql.Request();
            console.log("Working......")
            request.query('SELECT busstopid, lat, long from bus_stops', (err, result) => {          
                if(err) {
                    console.log("Not working........")
                    console.log(err);
                } else {
                    console.log("Working 2......")
                    console.log(result.recordset)
                    res.send(result.recordset);
                }
            });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running..');
});

// app.get('/buses', (req, res) => {
//     //res.send('Hello World')
//     db.query('Select * from bus_stops',
//         (err,result) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 res.send(result)
//             }
//         }
//     );
// });

// app.listen(3001, () => {
//     console.log("Server is running")
// });