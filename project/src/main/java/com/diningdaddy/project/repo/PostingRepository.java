package com.diningdaddy.project.repo;

import com.diningdaddy.project.model.Posting;
import com.diningdaddy.project.model.Posting.PostingStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

// Auto-implemented by Spring

public interface PostingRepository extends CrudRepository<Posting, Long> {

    public Optional<Posting> findById(Long id);
    public List<Posting> findByUserId(Long userId);
    public List<Posting> findByStatus(PostingStatus status);
    public List<Posting> findByUserIdAndStatus(Long userId, PostingStatus status);
}
