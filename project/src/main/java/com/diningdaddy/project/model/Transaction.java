package com.diningdaddy.project.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.diningdaddy.project.model.ChatMessage;

@Entity
public class Transaction {
    public enum TransactionStatus {
        OFFER,
        CONFIRMED,
        SUCCESS,
        FAILED,
        CANCELED
    }
    protected Transaction() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long sellerId;
    private Long buyerId;
    private Long postingId;
    private Long bidId;
    private int diningPrice;
    private float exchangeRate;
    private TransactionStatus status;
    private String comment;
    @OneToMany(cascade = {CascadeType.ALL})
    private List<ChatMessage> messages;

    public Transaction(Long sellerId, Long buyerId, Long postingId, Long bidId, int diningPrice, float exchangeRate,
                       TransactionStatus status, String comment) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.postingId = postingId;
        this.bidId = bidId;
        this.diningPrice = diningPrice;
        this.exchangeRate = exchangeRate;
        this.status = status;
        this.comment = comment;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public Long getPostingId() {
        return postingId;
    }

    public void setPostingId(Long postingId) {
        this.postingId = postingId;
    }

    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public int getDiningPrice() {
        return diningPrice;
    }

    public void setDiningPrice(int diningPrice) {
        this.diningPrice = diningPrice;
    }

    public float getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(float exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }
}