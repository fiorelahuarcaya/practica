const express = require('express')
const app = express()
const port = 80
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/api', (req, res) => {
  //res.json({ username: 'Flavio' })
  res.send({ username: 'Fio Conera' })
})

//add the router
app.use('/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})