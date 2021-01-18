import { client } from "./contentfulClient";

// Type -> Paperback | Ebook
// Category -> Mafia | Warewolf | Romance etc.
// BlogPost -> A particular single blog post
// Title -> Referred as name or title of the field. e.g. category.title = mafia **is correct** category = mafia **is wrong**

function getBlogPost(id, query) {
  // little trick to get an entry with include
  // this way all linked items will be resolved for us
  query = query || {};
  query["content_type"] = "blogPost";
  query["sys.id"] = id;
  return client.getEntries(query);
}

function getBlogPosts(query) {
  query = query || {};
  query.content_type = "blogPost";
  return client.getEntries(query);
}

function getBlogPostInCategory(category, query = {}) {
  return getBlogPosts({
    ...query,
    "fields.category.sys.contentType.sys.id": "categories",
    "fields.category.fields.title[all]": category,
  });
}

function getBlogPostByBookType(type, query = {}) {
  return getBlogPosts({
    ...query,
    "fields.bookType.sys.contentType.sys.id": "bookType",
    "fields.bookType.fields.title[all]": type,
  });
}

function getBlogPostsByBookTypeAndCategory(type, category, query = {}) {
  return getBlogPosts({
    ...query,
    "fields.bookType.sys.contentType.sys.id": "bookType",
    "fields.bookType.fields.title": type,
    "fields.category.sys.contentType.sys.id": "categories",
    "fields.category.fields.title": category,
  });
}

export {
  getBlogPost,
  getBlogPosts,
  getBlogPostInCategory,
  getBlogPostByBookType,
  getBlogPostsByBookTypeAndCategory,
};
