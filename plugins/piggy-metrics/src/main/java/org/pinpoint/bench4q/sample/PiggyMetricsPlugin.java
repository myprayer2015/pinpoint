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
		transformTemplate.transform("com.piggymetrics.account.service.AccountServiceImpl", new org.pinpoint.bench4q.piggymetrics.accountservice.OtherInterceptor());
		transformTemplate.transform("com.piggymetrics.account.service.AccountServiceImpl", new org.pinpoint.bench4q.piggymetrics.accountservice.UserServiceImplInterceptor());
		transformTemplate.transform("com.piggymetrics.account.service.AccountServiceImpl", new org.pinpoint.bench4q.piggymetrics.accountservice.AuthServiceClientInterceptor());
	}

	@Override
	public void setTransformTemplate(TransformTemplate transformTemplate) {
		this.transformTemplate = transformTemplate;
	}
}
