

app.post('/chemicals',(req,res)=>{
    ChemicalsModel.create(req,body)
    .then(chemicals=>res.json(chemicals))
    .catch(err=>res.json(err))
})