package com.fqms.fuelquotamanagementsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.fqms.fuelquotamanagementsystem.repository.mock",
        entityManagerFactoryRef = "mockEntityManagerFactory",
        transactionManagerRef = "mockTransactionManager"
)
public class MockDBConfig {

    @Autowired
    private Environment env;

    @Bean(name = "mockDataSource")
    public DataSource mockDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(env.getProperty("spring.datasource.mock.url"));
        dataSource.setUsername(env.getProperty("spring.datasource.mock.username"));
        dataSource.setPassword(env.getProperty("spring.datasource.mock.password"));
        dataSource.setDriverClassName(Objects.requireNonNull(env.getProperty("spring.datasource.mock.driver-class-name")));
        return dataSource;
    }

    @Bean(name = "mockEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean mockEntityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(mockDataSource());
        em.setPackagesToScan("com.fqms.fuelquotamanagementsystem.models.mock");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.mock.hibernate.ddl-auto", "none"));
        properties.put("hibernate.show-sql", env.getProperty("spring.jpa.mock.show-sql", "true"));
        properties.put("hibernate.format_sql", env.getProperty("spring.jpa.mock.properties.hibernate.format_sql", "true"));
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean(name = "mockTransactionManager")
    public PlatformTransactionManager mockTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(mockEntityManagerFactory().getObject());
        return transactionManager;
    }
}