import { Router } from "express";
import { getBlogPost } from "../services/blogs";
import marked from "marked";

const BlogRouter = Router();

BlogRouter.get("/:id", async (req, res) => {
  const blog = await getBlogPost(req.params.id);

  res.render("blog", {
    blog: marked(blog.items[0].fields.post),
  });
});

export default BlogRouter;
