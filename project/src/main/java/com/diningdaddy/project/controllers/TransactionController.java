package com.diningdaddy.project.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.diningdaddy.project.repo.TransactionRepository;
import com.diningdaddy.project.model.Transaction;
import com.diningdaddy.project.model.Transaction.TransactionStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
class TransactionController {

    private final TransactionRepository transactionRepository;

    TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Upon successful post, return the id.
    @PostMapping("/transactions")
    public Long newTransaction(@RequestBody Transaction newTransaction) {
        Transaction post = transactionRepository.save(newTransaction);
        return post.getId();
    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<String> updateTransaction(@RequestBody Transaction newTransaction, @PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        if (transaction_opt.get().getSellerId() != newTransaction.getSellerId()) {
            return new ResponseEntity("Error: UserId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        if (transaction_opt.get().getBuyerId() != newTransaction.getBuyerId()) {
            return new ResponseEntity("Error: PostingId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        if (transaction_opt.get().getPostingId() != newTransaction.getPostingId()) {
            return new ResponseEntity("Error: PostingId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        if (transaction_opt.get().getBidId() != newTransaction.getBidId()) {
            return new ResponseEntity("Error: PostingId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        newTransaction.setId(id);
        transactionRepository.save(newTransaction);
        return new ResponseEntity("Transaction update success.", HttpStatus.OK);
    }

    @PutMapping("/transactions/{id}/confirm")
    public ResponseEntity<String> confirmTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        if (transaction_opt.get().getStatus() != TransactionStatus.OFFER) {
            return new ResponseEntity("Error: Transaction status not OFFER.", HttpStatus.EXPECTATION_FAILED);
        }
        transaction_opt.get().setStatus(TransactionStatus.CONFIRMED);
        transactionRepository.save(transaction_opt.get());
        return new ResponseEntity("Transaction status update success.", HttpStatus.OK);
    }

    @PutMapping("/transactions/{id}/success")
    public ResponseEntity<String> successTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        if (transaction_opt.get().getStatus() != TransactionStatus.CONFIRMED) {
            return new ResponseEntity("Error: Transaction status not CONFIRMED.", HttpStatus.EXPECTATION_FAILED);
        }
        transaction_opt.get().setStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction_opt.get());
        return new ResponseEntity("Transaction status update success.", HttpStatus.OK);
    }

    @PutMapping("/transactions/{id}/failure")
    public ResponseEntity<String> failedTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        if (transaction_opt.get().getStatus() != TransactionStatus.CONFIRMED) {
            return new ResponseEntity("Error: Transaction status not CONFIRMED.", HttpStatus.EXPECTATION_FAILED);
        }
        transaction_opt.get().setStatus(TransactionStatus.FAILED);
        transactionRepository.save(transaction_opt.get());
        return new ResponseEntity("Transaction status update success.", HttpStatus.OK);
    }

    @PutMapping("/transactions/{id}/cancel")
    public ResponseEntity<String> canceledTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        if (transaction_opt.get().getStatus() != TransactionStatus.CONFIRMED && transaction_opt.get().getStatus() != TransactionStatus.OFFER) {
            return new ResponseEntity("Error: Transaction status not OFFER or CONFIRMED.", HttpStatus.EXPECTATION_FAILED);
        }
        transaction_opt.get().setStatus(TransactionStatus.CANCELED);
        transactionRepository.save(transaction_opt.get());
        return new ResponseEntity("Transaction status update success.", HttpStatus.OK);
    }

    @GetMapping("/transactions")
    public @ResponseBody
    List<Transaction> all() {
        List<Transaction> result = new ArrayList<Transaction>();
        for(Transaction transaction: transactionRepository.findAll()){
            result.add(transaction);
        }
        return result;
    }

    @GetMapping("/transactions/offer")
    public @ResponseBody
    List<Transaction> allOffer() {
        List<Transaction> result = transactionRepository.findByStatus(TransactionStatus.OFFER);
        return result;
    }

    @GetMapping("/transactions/confirmed")
    public @ResponseBody
    List<Transaction> allConfirmed() {
        List<Transaction> result = transactionRepository.findByStatus(TransactionStatus.CONFIRMED);
        return result;
    }

    @GetMapping("/transactions/success")
    public @ResponseBody
    List<Transaction> allSuccess() {
        List<Transaction> result = transactionRepository.findByStatus(TransactionStatus.SUCCESS);
        return result;
    }

    @GetMapping("/transactions/failed")
    public @ResponseBody
    List<Transaction> allFailed() {
        List<Transaction> result = transactionRepository.findByStatus(TransactionStatus.FAILED);
        return result;
    }

    @GetMapping("/transactions/cancelled")
    public @ResponseBody
    List<Transaction> allCancelled() {
        List<Transaction> result = transactionRepository.findByStatus(TransactionStatus.CANCELED);
        return result;
    }

    @GetMapping("/transactions/{id}")
    public @ResponseBody
    ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(id);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(transaction_opt.get(), HttpStatus.OK);
    }

    @GetMapping("/transactions/sellerId/{sellerId}")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findBySellerId(@PathVariable Long sellerId) {
        List<Transaction> result = transactionRepository.findBySellerId(sellerId);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }

    @GetMapping("/transactions/postingId/{postingId}")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findByPostingId(@PathVariable Long postingId) {
        List<Transaction> result = transactionRepository.findByPostingId(postingId);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }

    @GetMapping("/transactions/buyerId/{buyerId}")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findByBuyerId(@PathVariable Long buyerId) {
        List<Transaction> result = transactionRepository.findByBuyerId(buyerId);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }

    @GetMapping("/transactions/bidId/{bidId}")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findByBidId(@PathVariable Long bidId) {
        List<Transaction> result = transactionRepository.findByBidId(bidId);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }

    /*
    @GetMapping("/transactions/buyerId/{buyerId}/active")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findOpenByBuyerId(@PathVariable Long buyerId) {
        List<Transaction> result = transactionRepository.findByUserIdAndStatus(userId, TransactionStatus.OPEN);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }

    @GetMapping("/transactions/postingId/{postingId}/active")
    public @ResponseBody
    ResponseEntity<List<Transaction>> findOpenByPostingId(@PathVariable Long postingId) {
        List<Transaction> result = transactionRepository.findByPostingIdAndStatus(postingId, TransactionStatus.OPEN);
        if (result == null) {
            return new ResponseEntity<List<Transaction>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Transaction>>(result, HttpStatus.OK);
    }
    */


}