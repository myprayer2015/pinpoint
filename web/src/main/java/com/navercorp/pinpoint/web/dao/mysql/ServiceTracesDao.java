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

import com.navercorp.pinpoint.web.alarm.vo.CheckerResult;
import com.navercorp.pinpoint.web.alarm.vo.Rule;
import com.navercorp.pinpoint.web.dao.AlarmDao;
import com.navercorp.pinpoint.web.vo.ServiceTraces;
import com.navercorp.pinpoint.web.vo.UserGroup;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wzy
 */
@Repository
public class ServiceTracesDao implements com.navercorp.pinpoint.web.dao.ServiceTracesDao {

    private static final String NAMESPACE = com.navercorp.pinpoint.web.dao.ServiceTracesDao.class.getPackage().getName() + "." + com.navercorp.pinpoint.web.dao.ServiceTracesDao.class.getSimpleName() + ".";

    @Autowired
    @Qualifier("sqlSessionTemplate")
    private SqlSessionTemplate sqlSessionTemplate;
    
    @Override
    public List<ServiceTraces> getTraceList(String service) {
        return sqlSessionTemplate.selectList(NAMESPACE + "getTraceList", service);
    }

}
