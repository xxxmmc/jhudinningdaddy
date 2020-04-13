package com.diningdaddy.project.controllers;

import com.diningdaddy.project.model.ChatMessage;
import com.diningdaddy.project.model.Transaction;
import com.diningdaddy.project.model.Transaction.TransactionStatus;
import com.diningdaddy.project.model.User;
import com.diningdaddy.project.repo.TransactionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
class ChatController {

    private final TransactionRepository transactionRepository;

    ChatController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/chat/{transactionId}")
    public @ResponseBody
    ResponseEntity<List<ChatMessage>> findChatByTransactionId(@PathVariable Long transactionId) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(transactionId);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        List<ChatMessage> list = transaction_opt.get().getMessages();
        Collections.sort(list, new Comparator<ChatMessage>() {
            @Override
            public int compare(ChatMessage o1, ChatMessage o2) {
                return o1.getTime()-o2.getTime();
            }
        });
        return new ResponseEntity<List<ChatMessage>>(list, HttpStatus.OK);
    }

    @PostMapping("/chat/{transactionId}")
    public ResponseEntity postNewMessage(@RequestBody ChatMessage newMessage, @PathVariable Long transactionId) {
        Optional<Transaction> transaction_opt = transactionRepository.findById(transactionId);
        if (!transaction_opt.isPresent()) {
            return new ResponseEntity("Error: TransactionId not found.", HttpStatus.NOT_FOUND);
        }
        List<ChatMessage> list = transaction_opt.get().getMessages();
        list.add(newMessage);
        Transaction t = transaction_opt.get();
        t.setMessages(list);
        transactionRepository.save(t);
        return new ResponseEntity(HttpStatus.OK);
    }
}