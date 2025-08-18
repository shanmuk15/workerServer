var express = require('express')
var router = express.Router()


router.get('/get_student',(req,res)=>{

  const name = "shanmukha";
  res.send('hii'+" "+name)
})


module.exports = router;