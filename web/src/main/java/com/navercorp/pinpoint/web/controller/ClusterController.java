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

import com.navercorp.pinpoint.web.service.oncecloud.ClusterService;
import com.navercorp.pinpoint.web.util.MyResult;
import com.navercorp.pinpoint.web.vo.oncecloud.Cluster;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author wziyong
 */
@Controller
@RequestMapping("/Cluster")
public class ClusterController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ClusterService clusterService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public MyResult add(@RequestParam(value = "name", required = true) String name, @RequestParam(value = "description", required = false) String desc) {
        Cluster cluster = new Cluster();
        cluster.setName(name);
        cluster.setDescription(desc);
        this.clusterService.add(cluster);
        return new MyResult(true, 0, null);
    }

    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    @ResponseBody
    public List<Cluster> getGroupList(@RequestParam(value = "name", required = true) String name, @RequestParam(value = "offset", required = true) int offset) {
        return this.clusterService.getList(name, offset);
    }

}