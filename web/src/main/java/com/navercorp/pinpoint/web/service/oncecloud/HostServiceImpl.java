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

package com.navercorp.pinpoint.web.service.oncecloud;

import com.navercorp.pinpoint.web.dao.HostDao;
import com.navercorp.pinpoint.web.vo.oncecloud.Host;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author netspider
 * @author HyunGil Jeong
 */
@Service
public class HostServiceImpl implements HostService {

    @Autowired
    private HostDao hostDao;

    @Override
    public void add(Host host) {
        hostDao.add(host);
    }

    @Override
    public void update(Host host) {

    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<Host> getList(String name, String cluster_id, int offset) {

        return hostDao.getList(name, cluster_id, offset);
    }

}
