package org.pinpoint.bench4q.piggymetrics.accountservice;

import com.navercorp.pinpoint.bootstrap.instrument.InstrumentClass;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentException;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentMethod;
import com.navercorp.pinpoint.bootstrap.instrument.Instrumentor;
import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformCallback;
import org.pinpoint.bench4q.sample.PiggyMetricsConstants;

import java.security.ProtectionDomain;

import static com.navercorp.pinpoint.common.util.VarArgs.va;

public class AssertInterceptor implements TransformCallback {

	@Override
	public byte[] doInTransform(Instrumentor instrumentor, ClassLoader classLoader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws InstrumentException {
		// 1. Get InstrumentClass of the target class
		InstrumentClass target = instrumentor.getInstrumentClass(classLoader, className, classfileBuffer);

		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethod = target.getDeclaredMethod("hasLength", "java.lang.String");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethod.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethodx = target.getDeclaredMethod("isNull", "java.lang.Object");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethodx.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));


		// 4. Return resulting byte code.
		return target.toBytecode();
	}

}
