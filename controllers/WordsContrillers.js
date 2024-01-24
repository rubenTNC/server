import Word from "../models/Word.js";
import User from "../models/User.js";

export const addWord = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { word, language, translation } = req.body;

    const isWord = await Word.findOne({ word });

    const newWord = new Word({
      word,
      translation,
      language,
    });

    if (!isWord) {
      await newWord.save();
    }

    const isWordsUser = user.words.find((item) => item.word === word);

    if (isWordsUser) {
      res.json({
        status: "error",
        message: "Это слово уже есть у вас в словаре",
      });
      return "";
    }

    user.words = [...user.words, newWord];
    await user.save();
    res.json({
      status: false,
      message: "Слово успешно добавлено",
    });
  } catch (error) {}
};

export const myWords = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const words = user.words;
    res.json({
        words: words
    })
  } catch (error) {}
};
