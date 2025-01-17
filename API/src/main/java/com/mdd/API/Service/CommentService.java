package com.mdd.API.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdd.API.Repository.CommentRepository;
import com.mdd.API.model.Comment;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> findByArticleId(Long articleId) {
        return commentRepository.findCommentsByArticleId(articleId);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
