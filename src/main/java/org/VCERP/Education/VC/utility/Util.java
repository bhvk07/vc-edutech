package org.VCERP.Education.VC.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;


import com.mysql.jdbc.Statement;

public class Util {
	
	public static Connection getDBConnection() {
		 Connection conn = null;
		 try {
		
		 Class.forName("com.mysql.jdbc.Driver").newInstance();
		 conn = DriverManager.getConnection("jdbc:mysql://localhost:3308/vc_db?autoReconnect=true&useSSL=false","root","");
		 } catch (Exception ex) {
			 System.out.println(ex);
		 ex.printStackTrace();
		 }
		 return conn;
		 }
	
	public static void closeConnection(ResultSet rs,PreparedStatement st,Connection con)
	{
		try{
		if(rs!=null)
			rs.close();
		if(st!=null)
			st.close();
		if(con!=null)
			con.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static ResponseBuilder generateErrorResponse(Status status,String message)
	{
		ErrorMessage error=new ErrorMessage(status.getStatusCode(),message);
		return Response.status(status).entity(error).type(MediaType.APPLICATION_JSON);
	}
	public static ResponseBuilder generateResponse(Status status,String message)
	{
		ErrorMessage error=new ErrorMessage(status.getStatusCode(),message);
		return Response.status(status).entity(error).type(MediaType.APPLICATION_JSON);
	}
	
	public static String randomStringGenerator(int length)
	{
		String Char="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder sb=new StringBuilder();
		Random random=new Random();
		for(int i=0;i<length;i++)
		{
			sb.append(Char.charAt(random.nextInt(Char.length())));
		}
		return sb.toString();
		
	}
	
	public static String currentDate()
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		return dateFormat.format(date);
	}
	public static String currentTime()
	{
		DateFormat time = new SimpleDateFormat("HH:mm:ss");
		Date date = new Date();
		return time.format(date);
	}
	public static String[] symbolSeperatedString(String str)
	{
		String seperated[] = str.replaceAll("\\s+", "").split("[|]");
		return seperated;
	}
	public static String[] commaSeperatedString(String str)
	{
		String seperated[] = str.replaceAll("\\s+", "").split("[,]");
		return seperated;
	}

}
