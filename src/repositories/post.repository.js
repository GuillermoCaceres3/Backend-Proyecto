import Post from '../models/post.model.js';

export const createPost = async (postData) => {
  const post = new Post(postData);
  return (await post.save()).populate('author', 'username email photo');
};

export const findAllPosts = async () => {
  return await Post.find().populate('author', 'username email photo');
};

export const findPostsByUserId = async (userId) => {
  return await Post.find({ author: userId });
};

export const deletePostByid = async (postId) => {
  return await Post.findByIdAndDelete(postId);
}