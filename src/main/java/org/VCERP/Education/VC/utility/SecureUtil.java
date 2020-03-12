package org.VCERP.Education.VC.utility;

import java.util.Calendar;
import java.util.Date;

import org.VCERP.Education.VC.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class SecureUtil {
	 
	public String issueToken(User login) {
		Calendar tommorow=Calendar.getInstance();
		tommorow.add(Calendar.DATE, 1);
        String key=Util.randomStringGenerator(15);
        String jwtToken = Jwts.builder()
                .setSubject("Auth").claim("name", login.getName())
                .claim("contact number", login.getCont_no())
                .claim("Email", login.getEmail())
                .claim("role", login.getRole())
                //.setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(tommorow.getTime())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
        return jwtToken;
    }

}
