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

package com.navercorp.pinpoint.web.view;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.navercorp.pinpoint.web.vo.scatter.Dot;

import java.io.IOException;

/**
 * @author emeroad
 */
public class DotSerializer extends JsonSerializer<Dot> {
    @Override
    public void serialize(Dot dot, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
        jgen.writeStartArray();
        jgen.writeNumber(dot.getStartTime());//0
        jgen.writeNumber(dot.getAd());//1

        jgen.writeString(dot.getApplicationName());//2
        jgen.writeString(dot.getExceptionMethod());//3
        jgen.writeString(dot.getArguments());//4
        jgen.writeString(dot.getClassName());//5

        jgen.writeNumber(dot.getAcceptedTime());//6
        jgen.writeNumber(dot.getElapsedTime());//7
        jgen.writeString(dot.getTransactionIdAsString());//8
        jgen.writeNumber(dot.getSimpleExceptionCode());//9
        jgen.writeString(dot.getApplicationId());//10
        jgen.writeEndArray();
    }
}
