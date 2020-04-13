package com.diningdaddy.project.model;

import javax.persistence.*;
import com.diningdaddy.project.model.Geotag;
import org.springframework.lang.Nullable;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private float rating;
    private int num_of_ratings;
//    @Embedded
//    @Nullable
//    private Geotag location;*/

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rating = 0;
        this.num_of_ratings = 0;
    }

    protected User(){
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%d, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }

//    public Geotag getLocation() {
//        return location;
//    }
//
//    public void setLocation(Geotag location) {
//        this.location = location;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getLastName() {
        return lastName;
    }

    public int getNum_of_ratings() {
        return num_of_ratings;
    }

    public void setNum_of_ratings(int num_of_ratings) {
        this.num_of_ratings = num_of_ratings;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}