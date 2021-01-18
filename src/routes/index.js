import { Router } from "express";
import { getBlogPosts } from "../services/blogs";
import { getCategories } from "../services/categories";

const IndexRouter = Router();

IndexRouter.get("/", async (req, res) => {
  const blogs = await getBlogPosts();
  const categories = await getCategories();

  res.render("index", {
    latestBlogs: blogs.items,
    categories: categories.items,
  });
});

export default IndexRouter;
