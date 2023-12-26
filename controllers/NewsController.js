import News from "../models/News.js"

export const getAll = async (req, res) => {
    const news = await News.find().limit(5).sort("-createdAt")
    res.json(news)
}