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
public class Posting {
    public enum PostingStatus {
        OPEN,
        CLOSED,
        CANCELED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private int minDiningPrice;
    private int maxDiningPrice;
    private float exchangeRate;
    private int postTime;
    private int expireTime;
    private PostingStatus status;
    private String comment;

    protected Posting() {
    }

    public Posting(Long userId, int minDiningPrice, int maxDiningPrice,
                   float exchangeRate, int postTime, int expireTime, String comment, PostingStatus status) {
        this.userId = userId;
        this.minDiningPrice = minDiningPrice;
        this.maxDiningPrice = maxDiningPrice;
        this.exchangeRate = exchangeRate;
        this.postTime = postTime;
        this.expireTime = expireTime;
        this.comment = comment;
        this.status = status;
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

    public int getMinDiningPrice() {
        return minDiningPrice;
    }

    public void setMinDiningPrice(int minDiningPrice) {
        this.minDiningPrice = minDiningPrice;
    }

    public int getMaxDiningPrice() {
        return maxDiningPrice;
    }

    public void setMaxDiningPrice(int maxDiningPrice) {
        this.maxDiningPrice = maxDiningPrice;
    }

    public float getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(float exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public int getPostTime() {
        return postTime;
    }

    public void setPostTime(int postTime) {
        this.postTime = postTime;
    }

    public int getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(int expireTime) {
        this.expireTime = expireTime;
    }

    public PostingStatus getStatus() {
        return status;
    }

    public void setStatus(PostingStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
