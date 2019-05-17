package qcemail;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

public class WhoAmIHandler extends AbstractHandler {

/*
 {
 	"userId": 1,
 	"type": "admin",
 	"displayName": "Vball Demigod",
 	"mailbox": "vballdemigod@example.com"
 }
 */

	String resp = " {\n" +
			" 	\"userId\": 1,\n" +
			" 	\"type\": \"admin\",\n" +
			" 	\"displayName\": \"Vball Demigod\",\n" +
			" 	\"mailbox\": \"vballdemigod@example.com\"\n" +
			" }\n" +
			"";

	@Override
	public void handle(String target, Request baseReq, HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
        // Declare response encoding and types
        response.setContentType("application/json");

        // Declare response status code
        response.setStatus(HttpServletResponse.SC_OK);

        // Write back response
        response.getWriter().println(resp);

        // Inform jetty that this request has now been handled
        baseReq.setHandled(true);
	}

}
