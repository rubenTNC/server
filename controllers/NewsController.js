import News from "../models/News.js"

export const getAll = async (req, res) => {
    const news = await News.find().limit(5).sort("-createdAt")
    res.json(news)
}

export const fullNews = async (req, res) => {
    const id = req.params.id
    const news = await News.findById({_id: id})
    res.json(news)
}