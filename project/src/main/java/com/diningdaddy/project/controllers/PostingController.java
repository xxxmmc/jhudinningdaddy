package com.diningdaddy.project.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.diningdaddy.project.repo.PostingRepository;
import com.diningdaddy.project.model.Posting;
import com.diningdaddy.project.model.Posting.PostingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
class PostingController {

    private final PostingRepository postingRepository;

    PostingController(PostingRepository postingRepository) {
        this.postingRepository = postingRepository;
    }

    // Upon successful post, return the id.
    @PostMapping("/postings")
    public Long newPosting(@RequestBody Posting newPosting) {
        Posting post = postingRepository.save(newPosting);
        return post.getId();
    }

    @PutMapping("/postings/{id}")
    public ResponseEntity<String> updatePosting(@RequestBody Posting newPosting, @PathVariable Long id) {
        Optional<Posting> posting_opt = postingRepository.findById(id);
        if (!posting_opt.isPresent()) {
            return new ResponseEntity("Error: PostingId not found.", HttpStatus.NOT_FOUND);
        }
        if (posting_opt.get().getUserId() != newPosting.getUserId()) {
            return new ResponseEntity("Error: UserId does not match.", HttpStatus.EXPECTATION_FAILED);
        }
        newPosting.setId(id);
        postingRepository.save(newPosting);
        return new ResponseEntity("Posting update success.", HttpStatus.OK);
    }

    @GetMapping("/postings")
    public @ResponseBody
    List<Posting> all() {
        List<Posting> result = new ArrayList<Posting>();
        for(Posting posting: postingRepository.findAll()){
            result.add(posting);
        }
        return result;
    }

    @GetMapping("/postings/active")
    public @ResponseBody
    List<Posting> allOpen() {
        List<Posting> result = postingRepository.findByStatus(PostingStatus.OPEN);
        return result;
    }

    @GetMapping("/postings/closed")
    public @ResponseBody
    List<Posting> allClosed() {
        List<Posting> result = postingRepository.findByStatus(PostingStatus.CLOSED);
        return result;
    }

    @GetMapping("/postings/cancelled")
    public @ResponseBody
    List<Posting> allCancelled() {
        List<Posting> result = postingRepository.findByStatus(PostingStatus.CANCELED);
        return result;
    }

    @GetMapping("/postings/{id}")
    public @ResponseBody ResponseEntity<Posting> getPostingById(@PathVariable Long id) {
        Optional<Posting> posting_opt = postingRepository.findById(id);
        if (!posting_opt.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(posting_opt.get(), HttpStatus.OK);
    }

    @GetMapping("/postings/userId/{userId}")
    public @ResponseBody ResponseEntity<List<Posting>> findByUserId(@PathVariable Long userId) {
        List<Posting> result = postingRepository.findByUserId(userId);
        if (result == null) {
            return new ResponseEntity<List<Posting>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Posting>>(result, HttpStatus.OK);
    }
  
    @GetMapping("/postings/userId/{userId}/open")
    public @ResponseBody ResponseEntity<List<Posting>> findOpenByUserId(@PathVariable Long userId) {
        List<Posting> result = postingRepository.findByUserIdAndStatus(userId, PostingStatus.OPEN);
        if (result == null) {
            return new ResponseEntity<List<Posting>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Posting>>(result, HttpStatus.OK);
    }

    @GetMapping("/postings/match")
    public @ResponseBody ResponseEntity<Posting> matchPostings(int diningPrice, float exchangeRate) {
        List<Posting> result = postingRepository.findByStatus(PostingStatus.OPEN);
        if (result == null) {
            return new ResponseEntity<List<Posting>>(HttpStatus.NOT_FOUND);
        }
        List<Posting> toBeRemoved = new ArrayList<Posting>();
        for (Posting posting : results) {
            if (posting.getMinDiningPrice() > diningPrice || posting.getMaxDiningPrice() < diningPrice) {
                toBeRemoved.add(posting);
            }
        }
        results.removeAll(toBeRemoved);
        if (!results.size()) {
            return new ResponseEntity<List<Posting>>(HttpStatus.NOT_FOUND);
        }
        Posting selected = results.get(0);
        for (Posting posting: results) {
            if (Math.abs(posting.getExchangeRate() - exchangeRate) < Math.abs(selected.getExchangeRate() - exchangeRate)) {
                selected = posting;
            }
        }
        return selected;
    }
}