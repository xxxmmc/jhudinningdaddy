package com.diningdaddy.project.model;

import javax.persistence.Embeddable;

@Embeddable
public class Geotag {

    private double lat;
    private double lon;

    protected Geotag() {
    }

    public Geotag(double lat, double lon) {
        super();
        this.lat = lat;
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }
}
