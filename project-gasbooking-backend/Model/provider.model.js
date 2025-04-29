const mongoose= require("mongoose");

const providerSchema= mongoose.Schema({
    name:{type:String,require:true},
    address:{type:String,require:true},
    rating:{type:Number,require:true},
    price:{type:Number,require:true},
    available:{type:String,required:true},
    state:{type:String,required:true},
    typeofgas:[String]
},{
    versionKey:false,
})

const ProviderModel= mongoose.model("provider",providerSchema);

module.exports={ProviderModel}