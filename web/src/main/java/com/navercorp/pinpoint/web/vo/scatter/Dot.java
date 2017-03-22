/*
 * Copyright 2014 NAVER Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.navercorp.pinpoint.web.vo.scatter;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.navercorp.pinpoint.common.util.TransactionId;
import com.navercorp.pinpoint.common.util.TransactionIdUtils;
import com.navercorp.pinpoint.web.view.DotSerializer;


@JsonSerialize(using = DotSerializer.class)
public class Dot {
    public static final int EXCEPTION_NONE = 0;

    public static final int SUCCESS_STATE = 1;
    public static final int FAILED_STATE = 0;

    private final TransactionId transactionId;
    private final long acceptedTime;
    private final int elapsedTime;
    private final int exceptionCode;
    private final String agentId;

    private long startTime = 0;

    //异常服务组件
    private String applicationName;

    //异常方法
    private String exceptionMethod;

    //参数
    private String arguments;

    //类名
    private String className;

    //异常程度
    private double ad = 0.0;

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getExceptionMethod() {
        return exceptionMethod;
    }

    public void setExceptionMethod(String exceptionMethod) {
        this.exceptionMethod = exceptionMethod;
    }

    public String getArguments() {
        return arguments;
    }

    public void setArguments(String arguments) {
        this.arguments = arguments;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }




    public double getAd() {
        return ad;
    }

    public void setAd(double ad) {
        this.ad = ad;
    }

    /**
     * 
     * @param transactionId
     * @param acceptedTime
     * @param elapsedTime
     * @param exceptionCode 0 : success, 1 : error
     */

    public Dot(TransactionId transactionId, long acceptedTime, int elapsedTime, int exceptionCode, String agentId) {
        if (transactionId == null) {
            throw new NullPointerException("transactionId must not be null");
        }
        if (agentId == null) {
            throw new NullPointerException("agentId must not be null");
        }
        this.transactionId = transactionId;
        this.acceptedTime = acceptedTime;
        this.elapsedTime = elapsedTime;
        this.exceptionCode = exceptionCode;
        this.agentId = agentId;
    }

    public TransactionId getTransactionId() {
        return transactionId;
    }

    public String getTransactionIdAsString() {
        return TransactionIdUtils.formatString(transactionId);
    }

    public int getExceptionCode() {
        return exceptionCode;
    }

    /**
     * Simple stateCode used in the UI. May need to be fleshed out with state transitions in the future. 
     * 
     * @return
     */
    public int getSimpleExceptionCode() {
        if (getExceptionCode() == Dot.EXCEPTION_NONE) {
            // feels like a failure should be a value greater 1
            return Dot.SUCCESS_STATE;
        } else {
            return Dot.FAILED_STATE;
        }
    }

    public int getElapsedTime() {
        return elapsedTime;
    }

    public long getAcceptedTime() {
        return acceptedTime;
    }

    public String getAgentId() {
        return agentId;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder(64);
        sb.append("Dot{");
        sb.append("transactionId=").append(getTransactionIdAsString());
        sb.append(", acceptedTime=").append(acceptedTime);
        sb.append(", elapsedTime=").append(elapsedTime);
        sb.append(", exceptionCode=").append(exceptionCode);
        sb.append(", agentId='").append(agentId).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
