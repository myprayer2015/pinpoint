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
package com.navercorp.pinpoint.web.dao.mysql;

import com.navercorp.pinpoint.web.vo.oncecloud.Host;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wzy
 */
@Repository
public class HostDao implements com.navercorp.pinpoint.web.dao.HostDao {

    private static final String NAMESPACE = com.navercorp.pinpoint.web.dao.HostDao.class.getPackage().getName() + "." + com.navercorp.pinpoint.web.dao.HostDao.class.getSimpleName() + ".";

    @Autowired
    @Qualifier("sqlSessionTemplate")
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public void add(Host host) {
        sqlSessionTemplate.insert(NAMESPACE + "add", host);
        //selectList(NAMESPACE + "getTraceList", service);
    }

    @Override
    public void update(Host host) {

    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<Host> getList(String name, int cluster_id, int offset) {
        Map<String, Object> parameter = new HashMap<String, Object>();
        parameter.put("name", name);
        parameter.put("cluster_id", cluster_id);
        parameter.put("offset", offset);
        return sqlSessionTemplate.selectList(NAMESPACE + "getList", parameter);
    }

}









