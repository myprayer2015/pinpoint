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

import com.navercorp.pinpoint.web.dao.ItemDao;
import com.navercorp.pinpoint.web.vo.oncecloud.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author netspider
 * @author HyunGil Jeong
 */
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemDao itemDao;

    @Override
    public void add(Item item) {
        itemDao.add(item);
    }

    @Override
    public void update(Item item) {

    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<Item> getList(int host_id, int offset) {

        return itemDao.getList(host_id, offset);
    }

}
