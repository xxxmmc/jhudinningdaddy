package com.diningdaddy.project.repo;

import com.diningdaddy.project.model.Transaction;
import com.diningdaddy.project.model.Transaction.TransactionStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

// Auto-implemented by Spring

public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    public Optional<Transaction> findById(Long id);
    public List<Transaction> findByBuyerId(Long buyerId);
    public List<Transaction> findBySellerId(Long sellerId);
    public List<Transaction> findByStatus(TransactionStatus status);
    public List<Transaction> findByPostingId(Long postingId);
    public List<Transaction> findByBidId(Long bidId);

    public List<Transaction> findByBuyerIdAndStatus(Long buyerId, TransactionStatus status);
    public List<Transaction> findBySellerIdAndStatus(Long sellerId, TransactionStatus status);
    public List<Transaction> findByPostingIdAndStatus(Long postingId, TransactionStatus status);
    public List<Transaction> findByBidIdAndStatus(Long bidId, TransactionStatus status);
}
