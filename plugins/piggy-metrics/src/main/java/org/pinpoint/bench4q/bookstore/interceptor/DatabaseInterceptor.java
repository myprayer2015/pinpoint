package org.pinpoint.bench4q.bookstore.interceptor;

import java.security.ProtectionDomain;

import org.pinpoint.bench4q.sample.PiggyMetricsConstants;

import com.navercorp.pinpoint.bootstrap.instrument.InstrumentClass;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentException;
import com.navercorp.pinpoint.bootstrap.instrument.InstrumentMethod;
import com.navercorp.pinpoint.bootstrap.instrument.Instrumentor;
import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformCallback;

import static com.navercorp.pinpoint.common.util.VarArgs.va;

public class DatabaseInterceptor implements TransformCallback {

	@Override
	public byte[] doInTransform(Instrumentor instrumentor, ClassLoader classLoader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws InstrumentException {
		// 1. Get InstrumentClass of the target class
		InstrumentClass target = instrumentor.getInstrumentClass(classLoader, className, classfileBuffer);

		InstrumentMethod getConnection = target.getDeclaredMethod("getConnection");
		getConnection.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod closeConnection = target.getDeclaredMethod("closeConnection", "java.sql.Connection");
		closeConnection.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod closeStmt = target.getDeclaredMethod("closeStmt", "java.sql.PreparedStatement");
		closeStmt.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod closeStmtX = target.getDeclaredMethod("closeStmt", "java.sql.Statement");
		closeStmtX.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod closeResultSet = target.getDeclaredMethod("closeResultSet", "java.sql.ResultSet");
		closeResultSet.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getName = target.getDeclaredMethod("getName", "int");
		getName.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getBook = target.getDeclaredMethod("getBook", "int");
		getBook.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCustomer = target.getDeclaredMethod("getCustomer", "java.lang.String");
		getCustomer.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doSubjectSearch = target.getDeclaredMethod("doSubjectSearch", "java.lang.String");
		doSubjectSearch.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doTitleSearch = target.getDeclaredMethod("doTitleSearch", "java.lang.String");
		doTitleSearch.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doAuthorSearch = target.getDeclaredMethod("doAuthorSearch", "java.lang.String");
		doAuthorSearch.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getNewProducts = target.getDeclaredMethod("getNewProducts", "java.lang.String");
		getNewProducts.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getBestSellers = target.getDeclaredMethod("getBestSellers", "java.lang.String");
		getBestSellers.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getRelated = target.getDeclaredMethod("getRelated", "int", "java.util.Vector", "java.util.Vector");
		getRelated.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod adminUpdate = target.getDeclaredMethod("adminUpdate", "int", "double", "java.lang.String", "java.lang.String");
		adminUpdate.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod GetUserName = target.getDeclaredMethod("GetUserName", "int");
		GetUserName.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod GetPassword = target.getDeclaredMethod("GetPassword", "java.lang.String");
		GetPassword.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		
		//XX
		InstrumentMethod GetMostRecentOrder = target.getDeclaredMethod("GetMostRecentOrder", "java.lang.String", "java.util.Vector");
		GetMostRecentOrder.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod createEmptyCart = target.getDeclaredMethod("createEmptyCart");
		createEmptyCart.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doCart = target.getDeclaredMethod("doCart", "int", "java.lang.Integer", "java.util.Vector", "java.util.Vector");
		doCart.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod addItem = target.getDeclaredMethod("addItem", "java.sql.Connection", "int", "int");
		addItem.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		
		//XX
		InstrumentMethod refreshCart = target.getDeclaredMethod("refreshCart", "java.sql.Connection", "int", "java.util.Vector", "java.util.Vector");
		refreshCart.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod addRandomItemToCartIfNecessary = target.getDeclaredMethod("addRandomItemToCartIfNecessary", "java.sql.Connection", "int");
		addRandomItemToCartIfNecessary.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod resetCartTime = target.getDeclaredMethod("resetCartTime", "java.sql.Connection", "int");
		resetCartTime.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCartX = target.getDeclaredMethod("getCart", "int", "double");
		getCartX.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCart = target.getDeclaredMethod("getCart", "java.sql.Connection", "int", "double");
		getCart.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod refreshSession = target.getDeclaredMethod("refreshSession", "int");
		refreshSession.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod createNewCustomer = target.getDeclaredMethod("createNewCustomer", "org.bench4Q.servlet.Customer");
		createNewCustomer.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doBuyConfirm = target.getDeclaredMethod("doBuyConfirm", "int", "int", "java.lang.String", "long", "java.lang.String", "java.sql.Date", "java.lang.String");
		doBuyConfirm.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod doBuyConfirmX = target.getDeclaredMethod("doBuyConfirm", "int", "int", "java.lang.String", "long", "java.lang.String", "java.sql.Date", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String");
		doBuyConfirmX.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCDiscount = target.getDeclaredMethod("getCDiscount", "java.sql.Connection", "int");
		getCDiscount.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCAddrID = target.getDeclaredMethod("getCAddrID", "java.sql.Connection", "int");
		getCAddrID.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getCAddr = target.getDeclaredMethod("getCAddr", "java.sql.Connection", "int");
		getCAddr.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod enterCCXact = target.getDeclaredMethod("enterCCXact", "java.sql.Connection", "int", "java.lang.String", "long", "java.lang.String", "java.sql.Date", "double", "int");
		enterCCXact.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod clearCart = target.getDeclaredMethod("clearCart", "java.sql.Connection", "int");
		clearCart.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod enterAddress = target.getDeclaredMethod("enterAddress", "java.sql.Connection", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String");
		enterAddress.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod enterOrder = target.getDeclaredMethod("enterOrder", "java.sql.Connection", "int", "org.bench4Q.servlet.Cart", "int", "java.lang.String", "double");
		enterOrder.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod addOrderLine = target.getDeclaredMethod("addOrderLine", "java.sql.Connection", "int", "int", "int", "int", "double", "java.lang.String");
		addOrderLine.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod getStock = target.getDeclaredMethod("getStock", "java.sql.Connection", "int");
		getStock.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod setStock = target.getDeclaredMethod("setStock", "java.sql.Connection", "int", "int");
		setStock.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		InstrumentMethod verifyDBConsistency = target.getDeclaredMethod("verifyDBConsistency");
		verifyDBConsistency.addInterceptor("com.navercorp.pinpoint.bootstrap.interceptor.BasicMethodInterceptor", va(PiggyMetricsConstants.MY_SERVICE_TYPE));

		// 4. Return resulting byte code.
		return target.toBytecode();
	}

}
