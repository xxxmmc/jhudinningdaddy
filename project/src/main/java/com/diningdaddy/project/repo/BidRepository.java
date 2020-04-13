package com.diningdaddy.project.repo;

import com.diningdaddy.project.model.Bid;
import com.diningdaddy.project.model.Bid.BidStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

// Auto-implemented by Spring

public interface BidRepository extends CrudRepository<Bid, Long> {

    public Optional<Bid> findById(Long id);
    public List<Bid> findByUserId(Long userId);
    public List<Bid> findByStatus(BidStatus status);
    public List<Bid> findByPostingId(Long postingId);
    public List<Bid> findByUserIdAndStatus(Long userId, BidStatus status);
    public List<Bid> findByPostingIdAndStatus(Long postingId, BidStatus status);
}
