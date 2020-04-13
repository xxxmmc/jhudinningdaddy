package com.diningdaddy.project.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Comparator;

@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int time;
    private boolean buyerOrSeller;
    private String content;

    public ChatMessage(int time, boolean buyerOrSeller, String content) {
        this.time = time;
        this.buyerOrSeller = buyerOrSeller;
        this.content = content;
    }

    protected ChatMessage() {
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public boolean isBuyerOrSeller() {
        return buyerOrSeller;
    }

    public void setBuyerOrSeller(boolean buyerOrSeller) {
        this.buyerOrSeller = buyerOrSeller;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}