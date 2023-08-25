const { User, Book } = require("../models/users.model.js");
const mongoose = require("mongoose");

const getAllBooks = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id); // Get current user's information
    const books = await Book.find().populate("createdBy", "name email");

    const booksWithFlags = books.map((book) => {
      const isFollowing = currentUser.following.some(
        (followingUserId) =>
          followingUserId.toString() === book.createdBy._id.toString()
      );
      const isLiked = currentUser.likes.some(
        (likedBookId) => likedBookId.toString() === book._id.toString()
      );

      return {
        ...book.toObject(),
        is_following: isFollowing,
        is_liked: isLiked,
      };
    });

    res.status(200).json(booksWithFlags);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    const currentUserId = req.user._id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);
    if (!targetUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const isFollowing = currentUser?.following.find((e) =>
      e._id.equals(targetUser._id)
    );

    let status;

    const { following } = currentUser;
    if (isFollowing) {
      const filtered = following.filter((e) => !e.equals(targetUser._id));
      currentUser.following = filtered;

      status = `UnFollowed ${targetUser.name}`;
    } else {
      currentUser.following = [...following, targetUser._id];
      status = `Followed ${targetUser.name}`;
    }
    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const likeBook = async (req, res) => {
  try {
    const targetBookId = req.params.bookId;
    const currentUserId = req.user._id;

    const targetBook = await Book.findById(targetBookId);
    const currentUser = await User.findById(currentUserId);
    if (!targetBook) {
      return res.status(404).send({ error: "Book not found" });
    }

    const isLiked = currentUser?.likes.find((e) =>
      e._id.equals(targetBook._id)
    );

    let status;
    const { likes } = currentUser;
    if (isLiked) {
      const filtered = likes.filter((e) => !e.equals(targetBook._id));
      currentUser.likes = filtered;

      status = `unliked ${targetBook.title}`;
    } else {
      currentUser.likes = [...likes, targetBook._id];
      status = `liked ${targetBook.title}`;
    }

    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const postBook = async (req, res) => {
  try {
    const { title, author, image, genre, review } = req.body;

    if (!title || !author || !image || !genre || !review) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const { user } = req;

    const newBook = new Book({
      title,
      author,
      image,
      genre,
      review,
      createdBy: new mongoose.Types.ObjectId(user._id),
    });

    newBook.save();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { books: newBook._id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400);
    }
    const book = await Book.findById(newBook._id).populate(
      "createdBy",
      "name email"
    );
    console.log(newBook, book);

    return res.status(201).send({
      book: book,
      isFollowing: false,
      isLiked: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllFollowed = async (req, res) => {
  try {
    const user = req.user;
    const currentUser = await User.findById(user._id);
    const response = [];

    const { following } = currentUser;

    const books = await Book.find({ createdBy: { $in: following } }).populate(
      "createdBy",
      "name email"
    );

    books.forEach((book) => {
      const isLiked = currentUser.likes.find(
        (e) => e.toString() === book._id.toString()
      );
      const isFollowing = currentUser.following.find(
        (e) => e.toString() === book.createdBy._id.toString()
      );
      response.push({
        book,
        isFollowing: isFollowing ? true : false,
        isLiked: isLiked ? true : false,
      });
    });
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

const discoverBooks = async (req, res) => {
  try {
    const currentUser = req.user;
    const followingUsers = currentUser.following;

    const recommendedBooks = await Book.find({
      createdBy: { $in: followingUsers },
    });

    return res.status(200).send({ recommendedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const search = async (req, res) => {
  try {
    const { genre, author, keywords } = req.query;
    const user = req.user;
    console.log(keywords);
    const currentUser = await User.findById(user._id);

    const query = {};

    if (genre) {
      query.genres = { $regex: genre, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }
    if (keywords) {
      query.$or = [
        { title: { $regex: keywords, $options: "i" } },
        { review: { $regex: keywords, $options: "i" } },
      ];
    }

    const searchResults = await Book.find(query).populate(
      "createdBy",
      "name email"
    );

    let response = [];
    searchResults.forEach((book) => {
      const isLiked = currentUser.likes.find(
        (e) => e.toString() === book._id.toString()
      );
      const isFollowing = currentUser.following.find(
        (e) => e.toString() === book.createdBy._id.toString()
      );
      response.push({
        book,
        isFollowing: isFollowing ? true : false,
        isLiked: isLiked ? true : false,
      });
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const user = req.user;
    const currentUser = await User.findById(user._id);
    const { following } = currentUser;

    const bookInfo = await Book.findById(bookId).populate(
      "createdBy",
      "name email"
    );

    if (!bookInfo) {
      return res.status(404).json({ message: "Book not found" });
    }
    const isLiked = currentUser.likes.some(
      (e) => e.toString() === bookInfo._id.toString()
    );
    const isFollowing = currentUser.following.some(
      (e) => e.toString() === bookInfo.createdBy._id.toString()
    );
    const response = {
      bookInfo,
      isFollowing,
      isLiked,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getBookById,
};

module.exports = {
  followUser,
  postBook,
  likeBook,
  getAllFollowed,
  discoverBooks,
  search,
  getAllBooks,
  getBookById,
};
