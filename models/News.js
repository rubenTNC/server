import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    dateInfo:{
        type: String
    },
    text: [],
    tags: [],
    url: {
        type: String
    },
    coments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coment"
      }
    ]
  },
  { timestamps: true }
);


export default mongoose.model("News", NewsSchema)