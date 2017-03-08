package org.pinpoint.bench4q.sample;

import com.navercorp.pinpoint.common.trace.AnnotationKey;
import com.navercorp.pinpoint.common.trace.AnnotationKeyFactory;
import com.navercorp.pinpoint.common.trace.ServiceType;
import com.navercorp.pinpoint.common.trace.ServiceTypeFactory;

public class PiggyMetricsConstants {
	public static final ServiceType MY_SERVICE_TYPE = ServiceTypeFactory.of(7500, "PiggyMetricsPlugin");
	public static final AnnotationKey ANNOTATION_KEY_MY_VALUE = AnnotationKeyFactory.of(998, "PiggyMetricsValue");

}
