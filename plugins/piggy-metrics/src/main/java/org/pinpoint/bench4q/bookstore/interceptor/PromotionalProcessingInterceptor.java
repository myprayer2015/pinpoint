package org.pinpoint.bench4q.bookstore.interceptor;

import java.security.ProtectionDomain;

import org.pinpoint.bench4q.sample.PiggyMetricsConstants;

import com.navercorp.pinpoint.bootstrap.instrument.InstrumentClass;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentException;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentMethod;
import com.navercorp.pinpoint.bootstrap.instrument.Instrumentor;
import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformCallback;

import static com.navercorp.pinpoint.common.util.VarArgs.va;

public class PromotionalProcessingInterceptor implements TransformCallback {

	@Override
	public byte[] doInTransform(Instrumentor instrumentor, ClassLoader classLoader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws InstrumentException {
		// 1. Get InstrumentClass of the target class
		InstrumentClass target = instrumentor.getInstrumentClass(classLoader, className, classfileBuffer);

		InstrumentMethod targetMethod = target.getDeclaredMethod("DisplayPromotions", "java.io.PrintWriter","javax.servlet.http.HttpServletRequest","javax.servlet.http.HttpServletResponse","int");
		targetMethod.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 4. Return resulting byte code.
		return target.toBytecode();
	}

}
