import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUsed = await User.findOne({ username });
    const isMail = await User.findOne({ email })

    if (isUsed) {
      return res.json({
        message: "Данный логин занят",
      });
    }
    if(isMail) {
      return res.json({
        message: "Данный email занят",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();
    res.json({
      newUser,
      token,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.json({
      message: "Ощибка при создании пользователя",
    });
    console.log(error)
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "Пользователь не найден",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: "Не правильные данные",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({
        token,
        user,
        message: "вы вошли в систему"
    })
  } catch (error) {
    res.json({
      message: "Проверьти правильность ввода",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
        return res.json({
          message: "Пользователь не найден",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.json({
        user,
        token
      })

  } catch (error) {
    res.json({
        message: "Нет доступа",
      });
  }
};
