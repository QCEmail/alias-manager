package qcemail;

import org.eclipse.jetty.server.handler.ContextHandler;

public class ServiceMain
{
    public static void main( String[] args ) throws Exception
    {
        Server server = new Server(8888);
        ContextHandler whoAmICtx = new ContextHandler( "/whoami" );
        whoAmICtx.setHandler(new WhoAmIHandler());

        server.setHandler(whoAmICtx);

        server.start();
        server.join();
    }
}