package com.navercorp.pinpoint.web.vo.oncecloud;

public class Host {

    private int id;
    private String name;
    private int applicationNum;
    private int itemNum;
    private String interfaceAddr;
    private int status;
    private String description;
    private int clusterId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getApplicationNum() {
        return applicationNum;
    }

    public void setApplicationNum(int applicationNum) {
        this.applicationNum = applicationNum;
    }

    public int getItemNum() {
        return itemNum;
    }

    public void setItemNum(int itemNum) {
        this.itemNum = itemNum;
    }

    public String getInterfaceAddr() {
        return interfaceAddr;
    }

    public void setInterfaceAddr(String interfaceAddr) {
        this.interfaceAddr = interfaceAddr;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getClusterId() {
        return clusterId;
    }

    public void setClusterId(int clusterId) {
        this.clusterId = clusterId;
    }
}
