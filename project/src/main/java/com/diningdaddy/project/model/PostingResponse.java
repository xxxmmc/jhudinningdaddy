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
public class PostingResponse {
    enum Status {
        OPEN,
        CLOSED,
        CANCELED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private Long counterId;
    private Long postingId;
    private int post_time;
    private int status;

    protected PostingResponse() {
    }

    public PostingResponse(Long userId, Long counterId, Long postingId, int status) {
        this.userId = userId;
        this.counterId = counterId;
        this.postingId = postingId;
        this.status = status;
        this.post_time = post_time;
    }
}