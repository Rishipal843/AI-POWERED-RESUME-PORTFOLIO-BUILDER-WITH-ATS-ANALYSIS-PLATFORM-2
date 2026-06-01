const {Schema,model}= require("mongoose")

const data = Schema({
    Email:{
        type:String
    },
    template:{
        type:String
    },

    slug:{
        type:String
    },

    navbar:{
        logo:{
            type:String
        }
    },

    hero:{
        name:{type:String},
        headline:{type:String},
        subheadline:{type:String},
        status:{type:String}
    },

    bgImages:[{
   url:{type:String}
    }],

    about:{
        description:{type:String},
        profilePic:{type:String}
    },

    stats:[{
    label:{type:String},
    value:{type:String}
    }],

    techStack:[{
    name:{type:String},
    level:{type:String}
    }],

    journey:[{
    duration:{type:String},
    title:{type:String},
    institution:{type:String},
    }],

    projects:[{
        title:{type:String},
        tech:{type:String},
        desc:{type:String},
        image:{type:String}
    }],
    contact:[{
        platform:{type:String},
        value:{type:String}
    }],

    datee:{
        type:String
    }
 
})

const portfoliomodel= model("portfoliodata",data)
module.exports= portfoliomodel