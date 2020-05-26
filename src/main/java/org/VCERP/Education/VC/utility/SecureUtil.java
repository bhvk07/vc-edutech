package org.VCERP.Education.VC.utility;

import java.security.PrivateKey;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class SecureUtil {
	public static String signingKey="";
	public String issueToken(User user, PrivateKey key, String session) {
		signingKey=Base64.getEncoder().encodeToString(key.getEncoded());
		Calendar tommorow=Calendar.getInstance();
		tommorow.add(Calendar.DATE, 1);
        String jwtToken = Jwts.builder()
                .setSubject(user.getBranch()).claim("Employee Id", user.getId())
                .claim("Employee Type", user.getEmp_type())
                .claim("Employee Name", user.getName())
                .claim("Employee Role", user.getRole())
                .claim("Emaployee Username", user.getUserid())
                .claim("Emaployee Created Date", user.getCreated_date())
                .claim("session", session)
                //.setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(tommorow.getTime())
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
        return jwtToken;
    }

}
