package com.navercorp.pinpoint.web.util;

import java.util.List;

/**
 * Created by wziyong on 2017/3/8.
 */
public class MyResult {

    boolean isSuccess = false;

    int total = 0;

    List<Object> list = null;

    public MyResult(boolean isSuccess, int total, List<Object> list) {
        this.isSuccess = isSuccess;
        this.total = total;
        this.list = list;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Object> getList() {
        return list;
    }

    public void setList(List<Object> list) {
        this.list = list;
    }
}
