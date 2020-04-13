package com.diningdaddy.project.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JwtFilter implements Filter {
    @Autowired
    private JwtUtil jwtUtil = new JwtUtil();

    private static ObjectMapper mapper = new ObjectMapper();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {

        System.out.println("CHECK");
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String authentication_header = null;

        if ((authentication_header = request.getHeader("Authorization")) == null) {
            Map<String, String> message = new java.util.HashMap<>();
            message.put("message", "Missing Authorization header");
            response.getWriter().write(mapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(message));
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return;
        }

        if (!authentication_header.startsWith("Bearer ")) {
            Map<String, String> message = new java.util.HashMap<>();
            message.put("message", "Need bearer mode for Authorization");
            response.getWriter().write(mapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(message));
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return;
        }
        String jwt;
        try {
            jwt = jwtUtil.validateAndRefreshJWT(authentication_header.substring(7));
        } catch (Exception E) {
            jwt = "false";
        }
        switch (jwt) {
            case "true":
                chain.doFilter(request, response);
                break;
            case "false":
                Map<String, String> message = new java.util.HashMap<>();
                message.put("message", "invalid or expired jwt token");
                response.getWriter().write(
                        mapper.writerWithDefaultPrettyPrinter().writeValueAsString(message));
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            default:
                response.setHeader("Authorization", "Bearer " + jwt);
                chain.doFilter(request, response);
                break;
        }
    }

}
