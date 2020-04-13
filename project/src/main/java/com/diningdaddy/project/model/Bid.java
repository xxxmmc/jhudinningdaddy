package com.diningdaddy.project.model;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Bid {
    public enum BidStatus {
        ACTIVE,
        CLOSED,
        CANCELED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private Long postingId;
    private int diningPrice;
    private float exchangeRate;
    private BidStatus status;
    private String comment;

    protected Bid() {}

    public Bid(Long userId, Long postingId, int diningPrice, float exchangeRate, BidStatus status, String comment) {
        this.userId = userId;
        this.postingId = postingId;
        this.diningPrice = diningPrice;
        this.exchangeRate = exchangeRate;
        this.status = status;
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostingId() {
        return postingId;
    }

    public void setPostingId(Long postingId) {
        this.postingId = postingId;
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

    public BidStatus getStatus() {
        return status;
    }

    public void setStatus(BidStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}