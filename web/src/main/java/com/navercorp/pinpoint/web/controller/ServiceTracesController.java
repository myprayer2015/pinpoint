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

package com.navercorp.pinpoint.web.controller;

import com.navercorp.pinpoint.web.service.ServiceTracesService;
import com.navercorp.pinpoint.web.vo.ServiceTraces;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author wziyong
 */
@Controller
@RequestMapping("/ServiceTraces")
public class ServiceTracesController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ServiceTracesService serviceTracesService;

    @RequestMapping(value = "/getTraceList")
    @ResponseBody
    public List<ServiceTraces> getTraceList(@RequestParam(value = "service", required = false) String service) {
        return this.serviceTracesService.getTraceList(service);
    }

}