package com.navercorp.pinpoint.web.vo.oncecloud;

public class Host {

    private int id;
    private String name;
    private int application_num;
    private int item_num;
    private String interface_addr;
    private int status;
    private String description;
    private int cluster_id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getApplication_num() {
        return application_num;
    }

    public void setApplication_num(int application_num) {
        this.application_num = application_num;
    }

    public int getItem_num() {
        return item_num;
    }

    public void setItem_num(int item_num) {
        this.item_num = item_num;
    }

    public String getInterface_addr() {
        return interface_addr;
    }

    public void setInterface_addr(String interface_addr) {
        this.interface_addr = interface_addr;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCluster_id() {
        return cluster_id;
    }

    public void setCluster_id(int cluster_id) {
        this.cluster_id = cluster_id;
    }
}
