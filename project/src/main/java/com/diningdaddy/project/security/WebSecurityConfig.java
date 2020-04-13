package com.diningdaddy.project.security;

import com.diningdaddy.project.security.JwtFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
        authorizeRequests().antMatchers("/register").permitAll().and()
        .authorizeRequests().antMatchers("/login").permitAll().and()
        .httpBasic().and().csrf().disable()
        .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);
        // Add a filter to validate the tokens with every request
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring().antMatchers("/register")
                .and()
                .ignoring().antMatchers("/login");
    }
}