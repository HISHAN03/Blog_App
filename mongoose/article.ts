import  mongoose from 'mongoose'


const articleSchema =new  mongoose.Schema({

    title:
    {
        type:String,
        require:true
    },
    description:    {
        type:String,
        require:true
    },
    markdown:    {
        type:String,
        require:true
    },

})

export const Article=mongoose.model('Article',articleSchema)