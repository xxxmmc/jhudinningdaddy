package com.diningdaddy.project.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.diningdaddy.project.repo.BidRepository;
import com.diningdaddy.project.model.Bid;
import com.diningdaddy.project.model.Bid.BidStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
class BidController {

    private final BidRepository bidRepository;

    BidController(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    // Upon successful post, return the id.
    @PostMapping("/bids")
    public Long newBid(@RequestBody Bid newBid) {
        Bid post = bidRepository.save(newBid);
        return post.getId();
    }

    @PutMapping("/bids/{id}")
    public ResponseEntity<String> updateBid(@RequestBody Bid newBid, @PathVariable Long id) {
        Optional<Bid> bid_opt = bidRepository.findById(id);
        if (!bid_opt.isPresent()) {
            return new ResponseEntity("Error: BidId not found.", HttpStatus.NOT_FOUND);
        }
        if (bid_opt.get().getUserId() != newBid.getUserId()) {
            return new ResponseEntity("Error: UserId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        if (bid_opt.get().getPostingId() != newBid.getPostingId()) {
            return new ResponseEntity("Error: PostingId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        newBid.setId(id);
        bidRepository.save(newBid);
        return new ResponseEntity("Bid update success.", HttpStatus.OK);
    }

    @GetMapping("/bids")
    public @ResponseBody
    List<Bid> all() {
        List<Bid> result = new ArrayList<Bid>();
        for(Bid bid: bidRepository.findAll()){
            result.add(bid);
        }
        return result;
    }

    @GetMapping("/bids/active")
    public @ResponseBody
    List<Bid> allOpen() {
        List<Bid> result = bidRepository.findByStatus(BidStatus.ACTIVE);
        return result;
    }

    @GetMapping("/bids/closed")
    public @ResponseBody
    List<Bid> allClosed() {
        List<Bid> result = bidRepository.findByStatus(BidStatus.CLOSED);
        return result;
    }

    @GetMapping("/bids/cancelled")
    public @ResponseBody
    List<Bid> allCancelled() {
        List<Bid> result = bidRepository.findByStatus(BidStatus.CANCELED);
        return result;
    }

    @GetMapping("/bids/{id}")
    public @ResponseBody
    ResponseEntity<Bid> getBidById(@PathVariable Long id) {
        Optional<Bid> bid_opt = bidRepository.findById(id);
        if (!bid_opt.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(bid_opt.get(), HttpStatus.OK);
    }

    @GetMapping("/bids/userId/{userId}")
    public @ResponseBody
    ResponseEntity<List<Bid>> findByUserId(@PathVariable Long userId) {
        List<Bid> result = bidRepository.findByUserId(userId);
        if (result == null) {
            return new ResponseEntity<List<Bid>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Bid>>(result, HttpStatus.OK);
    }

    @GetMapping("/bids/postingId/{postingId}")
    public @ResponseBody
    ResponseEntity<List<Bid>> findByPostingId(@PathVariable Long postingId) {
        List<Bid> result = bidRepository.findByPostingId(postingId);
        if (result == null) {
            return new ResponseEntity<List<Bid>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Bid>>(result, HttpStatus.OK);
    }

    @GetMapping("/bids/userId/{userId}/open")
    public @ResponseBody
    ResponseEntity<List<Bid>> findOpenByUserId(@PathVariable Long userId) {
        List<Bid> result = bidRepository.findByUserIdAndStatus(userId, BidStatus.ACTIVE);
        if (result == null) {
            return new ResponseEntity<List<Bid>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Bid>>(result, HttpStatus.OK);
    }

    @GetMapping("/bids/postingId/{postingId}/open")
    public @ResponseBody
    ResponseEntity<List<Bid>> findOpenByPostingId(@PathVariable Long postingId) {
        List<Bid> result = bidRepository.findByPostingIdAndStatus(postingId, BidStatus.ACTIVE);
        if (result == null) {
            return new ResponseEntity<List<Bid>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Bid>>(result, HttpStatus.OK);
    }
}