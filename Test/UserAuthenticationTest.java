
import static org.junit.Assert.assertEquals;

import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.configuration.JavaConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import io.restassured.RestAssured;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = JavaConfiguration.class, loader = AnnotationConfigContextLoader.class)
//@EnableConfigurationProperties(PropertiesCache.class)
public class UserAuthenticationTest {
/*	@Before
	public void setup() {
		RestAssured.baseURI = "http://localhost:8080/VC/webapi";
	}*/

	@Test 
	public void authenticateUser_When_userNotNull_Expect_Accepted() {
		  String url = "http://localhost:8080/VC/webapi/user/login"; 
		  String userid=null;
		  io.restassured.response.Response response =RestAssured.given().header("Content-Type",
					  "application/x-www-form-urlencoded").formParam("userid",
		  userid).formParam("password", "abc").request().post(url);
		  System.out.println(response.getStatusCode());
		  response.getBody().prettyPrint();
		  assertEquals(Status.ACCEPTED.getStatusCode(), response.getStatusCode());
		  
		  }
}
