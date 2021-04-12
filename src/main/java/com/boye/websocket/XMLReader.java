package com.boye.websocket;

import java.io.File;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import java.nio.file.Paths;

public class XMLReader {
	public static String returnUser(String username) {
		String toReturn = "404:01!";
		String password = username.split(", ")[1];
		username = username.split(", ")[0];
		try {
			String KEYSTORE = Paths.get("src", "main", "webapp", "WEB-INF", "users.xml").toString();
			System.out.println(KEYSTORE);
			File fXmlFile = new File("src/main/webapp/WEB-INF/users.xml");
			System.out.println(fXmlFile);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(fXmlFile);
			doc.getDocumentElement().normalize();
			NodeList nList = doc.getElementsByTagName("user");
			for (int temp = 0; temp < nList.getLength(); temp++) {
				Node nNode = nList.item(temp);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					String id = eElement.getAttribute("id");
					String xmlUsername = eElement.getElementsByTagName("username").item(0).getTextContent();
					String xmlIdentification = eElement.getElementsByTagName("identification").item(0).getTextContent();
					String xmlPassword = eElement.getElementsByTagName("password").item(0).getTextContent();
					String xmlPrivileges = eElement.getElementsByTagName("privileges").item(0).getTextContent();
					if (username.contains(xmlUsername) && password.contains(xmlPassword)) {
						toReturn = id + ", " + xmlUsername + ", " + xmlIdentification + ", " + xmlPassword + ", "
								+ xmlPrivileges;
						break;
					}
					if(username.contains(xmlUsername) && !password.contains(xmlPassword)) {
						toReturn = "404:02!";
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return toReturn;
	}
}
