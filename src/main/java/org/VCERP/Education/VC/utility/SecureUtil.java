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
	public String issueToken(Employee emp, PrivateKey key, String session) {
		signingKey=Base64.getEncoder().encodeToString(key.getEncoded());
		Calendar tommorow=Calendar.getInstance();
		tommorow.add(Calendar.DATE, 1);
        String jwtToken = Jwts.builder()
                .setSubject(emp.getBranch()).claim("Employee Type", emp.getEmp_type())
                .claim("Employee Name", emp.getEmp_name())
                .claim("Employee Code", emp.getEmp_unq_code())
                .claim("Employee Email", emp.getEmail())
                .claim("Employee Contact", emp.getContact())
                .claim("Employee Join Date", emp.getJoin_date())
                .claim("Employee Role", emp.getRole())
                .claim("Emaployee Username", emp.getUserid())
                .claim("Employee Designation", emp.getDesign())
                .claim("session", session)
                //.setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(tommorow.getTime())
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
        return jwtToken;
    }

}
