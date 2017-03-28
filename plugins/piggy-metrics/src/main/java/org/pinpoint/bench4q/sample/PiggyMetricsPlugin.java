package org.pinpoint.bench4q.sample;

import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformTemplate;
import com.navercorp.pinpoint.bootstrap.instrument.transformer.TransformTemplateAware;
import com.navercorp.pinpoint.bootstrap.plugin.ProfilerPlugin;
import com.navercorp.pinpoint.bootstrap.plugin.ProfilerPluginSetupContext;

/**
 * 
 * @author Jongho Moon
 *
 */
public class PiggyMetricsPlugin implements ProfilerPlugin, TransformTemplateAware {

	private TransformTemplate transformTemplate;

	@Override
	public void setup(ProfilerPluginSetupContext context) {
//		transformTemplate.transform("org.bench4Q.servlet.execute_search_servlet", new org.pinpoint.bench4q.bookstore.interceptor.Execute_search_servlet_Interceptor());
//		transformTemplate.transform("org.bench4Q.servlet.new_products_servlet", new org.pinpoint.bench4q.bookstore.interceptor.New_products_servlet_Interceptor());
//		transformTemplate.transform("org.bench4Q.servlet.product_detail_servlet", new org.pinpoint.bench4q.bookstore.interceptor.Product_detail_servlet_Interceptor());
//		transformTemplate.transform("org.bench4Q.servlet.buy_request_servlet", new org.pinpoint.bench4q.bookstore.interceptor.AccountControllerInterceptor());
//		transformTemplate.transform("org.bench4Q.servlet.buy_confirm_servlet", new org.pinpoint.bench4q.bookstore.interceptor.Buy_confirm_servlet_Interceptor());
//		transformTemplate.transform("org.bench4Q.servlet.order_display_servlet", new org.pinpoint.bench4q.bookstore.interceptor.Order_display_servlet_Interceptor());
//
//		transformTemplate.transform("org.bench4Q.servlet.Database", new org.pinpoint.bench4q.bookstore.interceptor.DatabaseInterceptor());
//		transformTemplate.transform("org.bench4Q.servlet.promotional_processing", new org.pinpoint.bench4q.bookstore.interceptor.PromotionalProcessingInterceptor());
		transformTemplate.transform("com.piggymetrics.account.controller.AccountController", new org.pinpoint.bench4q.piggymetrics.accountservice.AccountControllerInterceptor());
		transformTemplate.transform("com.piggymetrics.account.service.AccountServiceImpl", new org.pinpoint.bench4q.piggymetrics.accountservice.AccountServiceImplInterceptor());

//		//不管用
//		transformTemplate.transform("org.springframework.data.mongodb.core.MongoDbUtils", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoDBUtilsInterceptor());
//		transformTemplate.transform("com.mongodb.DBApiLayer", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoAPIlayerInterceptor());
//		///
//		transformTemplate.transform("org.springframework.data.mongodb.core.MongoClientFactoryBean", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoClientFactaryBeanInterceptor());
//		transformTemplate.transform("org.springframework.data.mongodb.core.MongoClientOptionsFactoryBean", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoClientFactaryXXBeanInterceptor());
		transformTemplate.transform("org.springframework.boot.autoconfigure.mongo.MongoProperties", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoPropertiesInterceptor());
		transformTemplate.transform("org.springframework.data.mongodb.core.MongoTemplate", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoTemplateInterceptor());
		transformTemplate.transform("org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration", new org.pinpoint.bench4q.piggymetrics.accountservice.MongoDataAutoConfigurationInterceptor());


//		transformTemplate.transform("com.piggymetrics.account.repository.AccountRepository", new org.pinpoint.bench4q.piggymetrics.accountservice.AccountRepositoryInterceptor());

		//接口不行，忽略了
		transformTemplate.transform("org.springframework.util.Assert", new org.pinpoint.bench4q.piggymetrics.accountservice.AssertInterceptor());



		//auth service
		transformTemplate.transform("com.piggymetrics.auth.controller.UserController", new org.pinpoint.bench4q.piggymetrics.accountservice.UserControllerInterceptor());
		transformTemplate.transform("com.piggymetrics.auth.service.UserServiceImpl", new org.pinpoint.bench4q.piggymetrics.accountservice.UserServiceImplInterceptor());





	}

	@Override
	public void setTransformTemplate(TransformTemplate transformTemplate) {
		this.transformTemplate = transformTemplate;
	}
}
