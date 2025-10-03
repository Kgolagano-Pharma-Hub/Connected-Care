package com.onelogin.saml2;

import jakarta.servlet.http.HttpServletRequest;

public class Auth {
    public Auth(Object settings, HttpServletRequest request, Object response) {}
    public void login(String redirect) {}
    public void processResponse() {}
    public void processSLO() {}
    public java.util.List<String> getErrors() { return java.util.Collections.emptyList(); }
    public String getNameId() { return "stub"; }
    public String getSessionIndex() { return "stub"; }
    public String getLastRequestXML() { return ""; }
    public String getLastResponseXML() { return ""; }
    public String logout(Object arg1, Object arg2, boolean arg3) { return "/logout"; }
}
