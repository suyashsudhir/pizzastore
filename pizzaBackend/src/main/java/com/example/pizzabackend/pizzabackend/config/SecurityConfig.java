package com.example.pizzabackend.pizzabackend.config;

import com.example.pizzabackend.pizzabackend.jwt.JWTAuthenticationEntryPont;
import com.example.pizzabackend.pizzabackend.jwt.JWTRequestFilter;
import com.example.pizzabackend.pizzabackend.service.JWTUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationEntryPont entryPont;

    @Autowired
    JWTUserDetailsService userDetailsService;

    @Autowired
    JWTRequestFilter requestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());

    }
    @Bean
    public AuthenticationManager customAuthManager() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder(12);

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*")
                .allowedMethods("HEAD", "GET", "PUT", "POST",
                        "DELETE", "PATCH").allowedHeaders("*");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and()
        .csrf().disable().
                headers().
                frameOptions().deny().and().authorizeRequests()
                .antMatchers("/login","/userSignup","/common/test","/logout","/common/neworder")
                .permitAll()
                .anyRequest().authenticated().and().logout().logoutUrl("/logout").logoutSuccessUrl("/common/test").invalidateHttpSession(true);

        http.addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
