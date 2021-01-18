import { Router } from "express";
import {
  getBlogPostByBookType,
  getBlogPostsByBookTypeAndCategory,
} from "../services/blogs";
import { getCategories } from "../services/categories";

const reviewOptionsRouter = Router();

reviewOptionsRouter.get("/", async (req, res) => {
  res.render("reviews");
});

reviewOptionsRouter.get("/:type", async (req, res) => {
  try {
    const { items } = await getBlogPostByBookType(req.params.type);
    const categories = await getCategories();
    res.render("bloglist", {
      list: items,
      categories: categories.items,
      type: req.params.type,
    });
  } catch (err) {
    console.error(err);
    res.render("error", {
      message: "Something Went Wrong",
      error: { status: "Internal Error", stack: "" },
    });
  }
});

reviewOptionsRouter.get("/:type/:category", async (req, res) => {
  try {
    const { items } = await getBlogPostsByBookTypeAndCategory(
      req.params.type,
      req.params.category,
      { order: "sys.createdAt" }
    );
    const categories = await getCategories();

    res.render("list", {
      list: items,
      categories: categories.items,
      type: req.params.type,
    });
  } catch (err) {
    console.error(err);
    res.render("error", {
      message: "Something Went Wrong",
      error: { status: "Internal Error", stack: "" },
    });
  }
});

export default reviewOptionsRouter;
