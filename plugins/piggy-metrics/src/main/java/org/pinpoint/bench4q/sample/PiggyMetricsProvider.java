package org.pinpoint.bench4q.sample;

import com.navercorp.pinpoint.common.trace.AnnotationKeyMatchers;
import com.navercorp.pinpoint.common.trace.TraceMetadataProvider;
import com.navercorp.pinpoint.common.trace.TraceMetadataSetupContext;

public class PiggyMetricsProvider implements TraceMetadataProvider {

	@Override
	public void setup(TraceMetadataSetupContext context) {
		context.addServiceType(PiggyMetricsConstants.MY_SERVICE_TYPE, AnnotationKeyMatchers.exact(PiggyMetricsConstants.ANNOTATION_KEY_MY_VALUE));
	}

}
