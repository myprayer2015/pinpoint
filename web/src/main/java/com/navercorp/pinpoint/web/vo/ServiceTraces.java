package com.navercorp.pinpoint.web.vo;

public class ServiceTraces {

    private int id;
    private String path;
    private String method;
    private int tracesNum;
    private String service;
    private String description;

    public ServiceTraces() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public int getTracesNum() {
        return tracesNum;
    }

    public void setTracesNum(int tracesNum) {
        this.tracesNum = tracesNum;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
