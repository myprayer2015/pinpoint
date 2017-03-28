package org.pinpoint.bench4q.piggymetrics.accountservice;

import com.navercorp.pinpoint.bootstrap.instrument.InstrumentClass;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentException;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentMethod;
import com.navercorp.pinpoint.bootstrap.instrument.Instrumentor;
import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformCallback;
import org.pinpoint.bench4q.sample.PiggyMetricsConstants;

import java.security.ProtectionDomain;

import static com.navercorp.pinpoint.common.util.VarArgs.va;

public class MongoTemplateInterceptor implements TransformCallback {

	@Override
	public byte[] doInTransform(Instrumentor instrumentor, ClassLoader classLoader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws InstrumentException {
		// 1. Get InstrumentClass of the target class
		InstrumentClass target = instrumentor.getInstrumentClass(classLoader, className, classfileBuffer);

		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethod = target.getDeclaredMethod("getDB");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethod.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethodx = target.getDeclaredMethod("executeCommand", "com.mongodb.DBObject");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethodx.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));


		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethodxx = target.getDeclaredMethod("save", "java.lang.Object", "java.lang.String");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethodxx.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 2. Get InstrumentMethod of the target method.
		InstrumentMethod targetMethodxxx = target.getDeclaredMethod("save", "java.lang.Object");

		// 3. Add interceptor. The first argument is FQN of the interceptor
		// class, followed by arguments for the interceptor's constructor.
		targetMethodxxx.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 4. Return resulting byte code.
		return target.toBytecode();
	}

}
