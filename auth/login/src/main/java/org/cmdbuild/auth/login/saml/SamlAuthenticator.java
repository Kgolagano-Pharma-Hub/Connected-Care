package org.cmdbuild.auth.login.saml;

import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import org.cmdbuild.auth.login.AuthRequestInfo;
import org.cmdbuild.auth.login.RequestAuthenticatorResponse;
import org.cmdbuild.auth.login.RequestAuthenticatorResponseImpl;
import org.cmdbuild.auth.login.LoginUserIdentity;

import static org.cmdbuild.auth.login.RequestAuthenticatorResponseImpl.login;
import static org.cmdbuild.auth.login.RequestAuthenticatorResponseImpl.redirect;

public class SamlAuthenticator {

    public SamlAuthenticator() {
        // Constructor stub
    }

    public String getType() {
        return "SAML";
    }

    @Nullable
    public RequestAuthenticatorResponse handleAuthRequest(AuthRequestInfo request, Object config) {
        // Stub: always return redirect to login page
        return redirect("/login");
    }

    @Nullable
    public RequestAuthenticatorResponse handleAuthResponse(AuthRequestInfo request, Object config) {
        // Stub: return a dummy user identity
        LoginUserIdentity user = LoginUserIdentity.build("stub-user");
        return login(user);
    }

    @Nullable
    public RequestAuthenticatorResponse logout(Object request, Object config) {
        // Stub logout
        return redirect("/logout");
    }

    /** Needed so casting in getLoginFromScript works */
    public interface AuthResponse {
        @Nullable
        String getAttribute(String name);

        @Nullable
        String getNameId();
    }

    /** Optional helper: provide a dummy AuthResponse for stubs */
    public static class DummyAuthResponse implements AuthResponse {
        @Override
        public String getAttribute(String name) {
            return "stub-attr";
        }

        @Override
        public String getNameId() {
            return "stub-user";
        }
    }
}
