const express = require('express')
const router  = express.Router()
const {mongodb,dbName,dbUrl}=require('../dbconfig/dbconfig')

let MongoClient= mongodb.MongoClient
let client = new MongoClient(dbUrl)


router.get('/',async(req,res)=>{
  await client.connect()

    try{
        let db = await client.db(dbName)
        let data = await db.collection('Students').find().toArray()
        res.status(200).send({
            message:"Data fetch Successfull",
            data
        })



}catch(error){

    res.status(500).send({
        message:"Internal server error ",
        
    })

}finally{
    client.close()

}


})

router.post('/',async(req,res)=>{
    await client.connect()
  
      try{
          let db = await client.db(dbName)
          let data = await db.collection('Students').insertOne(req.body)
          res.status(200).send({
              message:"Data Saved Successfull",
              data
          })
  
  
  
  }catch(error){
  
      res.status(500).send({
          message:"Internal server error ",
        
      })
  
  }finally{
      client.close()
  
  }
  
  
  })

  router.get('/:id',async(req,res)=>{
    await client.connect()
  
      try{
          let db = await client.db(dbName)
          let data = await db.collection('Students').findOne({_id: new mongodb.ObjectId(req.params.id)})
         if(data){
          res.status(200).send({
              message:"Data fetch Successfull",
              data
          })
        }
        else{
            res.status(400).send({
                message:"Invaild Data"


        })
  
    }
  }
  catch(error)
  {
  
      res.status(500).send({
          message:"Internal server error "
        
      })
  
  }finally{
      client.close()
  
  }
  
  
  })

  router.put('/:id',async(req,res)=>{
    await client.connect()
  
      try{
          let db = await client.db(dbName)
          let data = await db.collection('Students').updateOne({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body})
          res.status(200).send({
              message:"Data updated Successfull",
              data
        
      })
  }
  catch(error)
  {
  
      res.status(500).send({
          message:"Internal server error "
        
      })
  
  }finally{
      client.close()
  
  }
  
  
  })

  router.delete('/:id',async(req,res)=>{
    await client.connect()
  
      try{
          let db = await client.db(dbName)
          let data = await db.collection('Students').deleteOne({_id: new mongodb.ObjectId(req.params.id)})
          res.status(200).send({
              message:"Data Deleted Successfull",
            
        
      })
  }
  catch(error)
  {
  
      res.status(500).send({
          message:"Internal server error "
        
      })
  
  }finally{
      client.close()
  
  }
  
  
  })

  



module.exports=router